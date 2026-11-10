import { useState, useEffect, useMemo, useCallback } from 'react';
import { api } from '../../services/api';
import { socket } from '../../services/socket';
import { generateAdmissionPDF, getAdmissionPDFBlobUrl } from '../../utils/admissionPdfGenerator';
import { useAdminData } from '../context/useAdminData';
import { useAlert } from '../../context/useAlert';

export default function AdmissionsView() {
  const { showToast } = useAdminData();
  const { alert } = useAlert();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedStream, setSelectedStream] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Modal / Inspection states
  const [selectedApp, setSelectedApp] = useState(null);
  const [previewPdfUri, setPreviewPdfUri] = useState(null);
  const [previewingApp, setPreviewingApp] = useState(null);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [emailForm, setEmailForm] = useState({
    subject: '',
    message: ''
  });
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  // Fetch applications from backend
  const fetchApplications = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.getAdmissionApplications();
      if (res.data) {
        setApplications(res.data);
      }
    } catch (err) {
      console.error('Error fetching applications:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchApplications();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchApplications]);

  // Listen for live student admission submissions via Socket.IO
  useEffect(() => {
    const handleLiveAdmission = (payload) => {
      if (payload?.url?.includes('/admissions')) {
        fetchApplications();
        if (payload.method === 'POST' && payload.url.includes('/apply')) {
          showToast('New student admission application received live!');
        }
      }
    };
    socket.on('cms:update', handleLiveAdmission);
    return () => socket.off('cms:update', handleLiveAdmission);
  }, [fetchApplications, showToast]);

  const filtered = useMemo(() => {
    return applications.filter((app) => {
      const matchesStream = selectedStream === 'All' || app.stream === selectedStream || app.streamName?.includes(selectedStream);
      const matchesStatus = selectedStatus === 'All' || app.status === selectedStatus;
      const q = search.toLowerCase();
      const matchesSearch =
        !search ||
        (app.fullName && app.fullName.toLowerCase().includes(q)) ||
        (app.applicationId && app.applicationId.toLowerCase().includes(q)) ||
        (app.email && app.email.toLowerCase().includes(q)) ||
        (app.seeSymbolNo && app.seeSymbolNo.toLowerCase().includes(q));

      return matchesStream && matchesStatus && matchesSearch;
    });
  }, [applications, selectedStream, selectedStatus, search]);

  const handleStatusChange = async (appId, newStatus) => {
    try {
      await api.updateAdmissionStatus(appId, { status: newStatus });
      showToast(`Candidate status updated to ${newStatus}`);
      fetchApplications();
      if (selectedApp && selectedApp._id === appId) {
        setSelectedApp(prev => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      alert({
        title: 'Status Update Error',
        message: err.message,
        type: 'error'
      });
    }
  };

  const handleSendEmailSubmit = async (e) => {
    e.preventDefault();
    if (!selectedApp || !emailForm.subject || !emailForm.message) return;
    setIsSendingEmail(true);
    try {
      const res = await api.sendApplicantEmail(selectedApp._id, emailForm);
      showToast(res.message || `Email sent successfully to ${selectedApp.email}!`);
      setIsEmailModalOpen(false);
      setEmailForm({ subject: '', message: '' });
      fetchApplications();
    } catch (err) {
      alert({
        title: 'Email Delivery Failed',
        message: err.response?.data?.message || err.message,
        type: 'error'
      });
    } finally {
      setIsSendingEmail(false);
    }
  };

  const openEmailModal = (app) => {
    setSelectedApp(app);
    setEmailForm({
      subject: `Update regarding your Admission Application (${app.applicationId}) - Khwopa College`,
      message: `Dear ${app.fullName},\n\nWe have reviewed your application for ${app.streamName || app.stream}.\n\nPlease note the following update:\n- Entrance Exam Date: Jestha 05, 2083 (8:00 AM)\n- Venue: Dekocha Campus, Exam Hall A\n\nPlease bring your printed Admission Form PDF and SEE marksheet copy.\n\nBest regards,\nAdmissions Office\nKhwopa Secondary School`
    });
    setIsEmailModalOpen(true);
  };

  const handleOpenPdfPreview = (app) => {
    if (previewPdfUri) {
      try { URL.revokeObjectURL(previewPdfUri); } catch { /* ignore */ }
    }
    setPreviewingApp(app);
    const uri = getAdmissionPDFBlobUrl(app);
    setPreviewPdfUri(uri);
  };

  return (
    <div className="space-y-6">
      {/* Header & Counter */}
      <div className="rounded-2xl border border-[#E3DCCB] bg-white p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#A68238] mb-1">
            Online Intake & Candidate Verification
          </p>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#101B2D] tracking-tight">Class 11 (+2) Admission Applications</h3>
          <p className="text-sm text-slate-600 mt-1">
            Real-time candidate registrations, instant PDF form inspection without download, and direct applicant Gmail correspondence
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="text-xs sm:text-sm font-bold text-[#A68238] bg-[#C5A15B]/15 px-3.5 py-2 rounded-xl">
            {applications.length} Candidates Registered
          </span>
          <button
            onClick={fetchApplications}
            className="px-4 py-2 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-xs sm:text-sm font-bold text-[#101B2D] hover:bg-white"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl border border-[#E3DCCB] bg-white shadow-xs">
        <div className="w-full sm:w-96">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, Application ID, Gmail, or SEE symbol..."
            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-[#101B2D] outline-none focus:border-[#C5A15B]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <select
            value={selectedStream}
            onChange={(e) => setSelectedStream(e.target.value)}
            className="px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-[#101B2D] font-medium"
          >
            <option value="All">All Streams</option>
            <option value="sci-bio">Science (Biology)</option>
            <option value="sci-cs">Science (Computer)</option>
            <option value="mgmt">Management</option>
            <option value="humanities">Humanities & Law</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-[#101B2D] font-medium"
          >
            <option value="All">All Statuses</option>
            <option value="Submitted">Submitted</option>
            <option value="Under Review">Under Review</option>
            <option value="Verified">Verified</option>
            <option value="Entrance Eligible">Entrance Eligible</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Applications Table */}
      <div className="rounded-2xl border border-[#E3DCCB] bg-white p-6 shadow-xs overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-[#EFECE3] text-xs font-bold uppercase tracking-wider text-slate-500">
            <tr>
              <th className="py-3 px-4">App ID</th>
              <th className="py-3 px-4">Candidate</th>
              <th className="py-3 px-4">Stream Applied</th>
              <th className="py-3 px-4">SEE School & GPA</th>
              <th className="py-3 px-4">Applicant Gmail</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EFECE3]">
            {loading ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-400 text-sm">
                  Loading applications from MongoDB Atlas...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-400 text-sm">
                  No applications found matching your criteria.
                </td>
              </tr>
            ) : (
              filtered.map((app) => (
                <tr key={app._id} className="hover:bg-[#FAF8F5]">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#A68238] text-xs sm:text-sm">
                    {app.applicationId}
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-[#101B2D]">{app.fullName}</p>
                    <p className="text-xs text-slate-500 mt-0.5">Mobile: {app.mobile}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-slate-800 block">
                      {app.streamName || app.stream}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-slate-800">{app.seeGpa} GPA</p>
                    <p className="text-xs text-slate-500 truncate max-w-[160px] mt-0.5">{app.seeSchool}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-[#101B2D] font-mono text-xs">{app.email}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <select
                      value={app.status}
                      onChange={(e) => handleStatusChange(app._id, e.target.value)}
                      className="text-xs font-bold px-2.5 py-1.5 rounded-lg border border-[#E3DCCB] bg-[#FAF8F5] text-[#101B2D] outline-none focus:border-[#C5A15B]"
                    >
                      <option value="Submitted">Submitted</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Verified">Verified</option>
                      <option value="Entrance Eligible">Entrance Eligible</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {/* Inspect Form Details Button */}
                      <button
                        onClick={() => setSelectedApp(app)}
                        className="px-3 py-1.5 rounded-lg border border-[#E3DCCB] bg-white text-[#101B2D] hover:bg-[#FAF8F5] text-xs font-bold"
                        title="Inspect Form Details"
                      >
                        Details
                      </button>

                      {/* View PDF Online without downloading */}
                      <button
                        onClick={() => handleOpenPdfPreview(app)}
                        className="px-3 py-1.5 rounded-lg bg-[#101B2D] text-[#C5A15B] hover:bg-[#1B293E] text-xs font-bold shadow-xs"
                        title="View PDF Online without downloading"
                      >
                        View PDF
                      </button>

                      {/* Download PDF Button */}
                      <button
                        onClick={() => generateAdmissionPDF(app)}
                        className="px-3 py-1.5 rounded-lg border border-[#E3DCCB] bg-[#FAF8F5] text-[#101B2D] hover:bg-white text-xs font-bold"
                        title="Download PDF file"
                      >
                        Download
                      </button>

                      {/* Send Gmail Button */}
                      <button
                        onClick={() => openEmailModal(app)}
                        className="px-3 py-1.5 rounded-lg bg-[#C5A15B]/15 text-[#A68238] border border-[#E3DCCB] hover:bg-[#101B2D] hover:text-[#C5A15B] text-xs font-bold transition"
                        title="Send Message to Student's Gmail"
                      >
                        Gmail
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Inspect Form Modal */}
      {selectedApp && !isEmailModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[#E3DCCB] bg-white p-6 sm:p-7 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-[#EFECE3] pb-3.5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#A68238]">
                  Application ID: {selectedApp.applicationId}
                </span>
                <h4 className="font-serif font-bold text-lg sm:text-xl text-[#101B2D] mt-0.5">
                  {selectedApp.fullName} — Form Details
                </h4>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 font-bold text-base"
              >
                ✕
              </button>
            </div>

            {/* Profile Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 text-sm">
              <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E3DCCB]">
                <p className="text-xs uppercase font-bold text-slate-500">Stream Applied</p>
                <p className="font-bold text-[#101B2D] mt-1">{selectedApp.streamName || selectedApp.stream}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E3DCCB]">
                <p className="text-xs uppercase font-bold text-slate-500">SEE GPA</p>
                <p className="font-bold text-emerald-800 mt-1">{selectedApp.seeGpa} GPA</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E3DCCB]">
                <p className="text-xs uppercase font-bold text-slate-500">SEE Symbol No</p>
                <p className="font-bold font-mono text-[#101B2D] mt-1">{selectedApp.seeSymbolNo}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E3DCCB]">
                <p className="text-xs uppercase font-bold text-slate-500">Candidate Gmail</p>
                <p className="font-mono text-xs sm:text-sm text-[#101B2D] mt-1 truncate">{selectedApp.email}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E3DCCB]">
                <p className="text-xs uppercase font-bold text-slate-500">Mobile Number</p>
                <p className="font-bold text-[#101B2D] mt-1">{selectedApp.mobile}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E3DCCB]">
                <p className="text-xs uppercase font-bold text-slate-500">Gender / Blood</p>
                <p className="font-bold text-[#101B2D] mt-1">{selectedApp.gender} / {selectedApp.bloodGroup || 'N/A'}</p>
              </div>
            </div>

            {/* Previous School & Guardian */}
            <div className="space-y-3.5 text-sm pt-2">
              <div className="p-4 rounded-xl border border-[#E3DCCB]">
                <p className="font-bold text-[#101B2D] mb-1">Previous School Attended</p>
                <p className="text-slate-600">{selectedApp.seeSchool} ({selectedApp.seeSchoolType})</p>
              </div>

              <div className="p-4 rounded-xl border border-[#E3DCCB]">
                <p className="font-bold text-[#101B2D] mb-1">Parent & Guardian Information</p>
                <p className="text-slate-600">Father: {selectedApp.fatherName} (Mob: {selectedApp.fatherMobile || '—'})</p>
                <p className="text-slate-600 mt-0.5">Mother: {selectedApp.motherName || '—'} (Mob: {selectedApp.motherMobile || '—'})</p>
              </div>

              <div className="p-4 rounded-xl border border-[#E3DCCB]">
                <p className="font-bold text-[#101B2D] mb-1">Permanent Address</p>
                <p className="text-slate-600">{selectedApp.municipality}, Ward No. {selectedApp.wardNo}, {selectedApp.district}, {selectedApp.province}</p>
              </div>

              {/* Uploaded Documents preview (Photo & Marksheet) */}
              <div className="p-4 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5]">
                <p className="font-bold text-[#101B2D] mb-2.5">Candidate Uploaded Documents</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="rounded-xl border border-[#E3DCCB] bg-white p-3 flex items-center gap-3">
                    {selectedApp.photoUrl ? (
                      <img
                        src={selectedApp.photoUrl}
                        alt={selectedApp.fullName}
                        className="h-12 w-12 rounded-lg object-cover border border-[#E3DCCB]"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-lg bg-slate-100 flex items-center justify-center text-xs text-slate-400 font-bold">
                        No Photo
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-[#101B2D]">Passport Photo</p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {selectedApp.photoUrl ? "Embedded in PDF" : "Pending Upload"}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#E3DCCB] bg-white p-3 flex items-center gap-3">
                    <div className="h-12 w-12 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 font-bold text-xs shrink-0">
                      DOC
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-[#101B2D] truncate">
                        {selectedApp.marksheetFileName || "SEE Marksheet"}
                      </p>
                      {selectedApp.marksheetUrl ? (
                        <a
                          href={selectedApp.marksheetUrl}
                          download={selectedApp.marksheetFileName || "SEE-Marksheet"}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-amber-700 font-bold underline hover:text-amber-900 mt-0.5 inline-block"
                        >
                          View / Download Marksheet
                        </a>
                      ) : (
                        <p className="text-xs text-slate-400 mt-0.5">Attached on file</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Communications History */}
            {selectedApp.emailLogs && selectedApp.emailLogs.length > 0 && (
              <div className="space-y-2.5 pt-3 border-t border-[#EFECE3]">
                <p className="font-bold text-sm text-[#101B2D]">Dispatched Gmail Correspondence ({selectedApp.emailLogs.length})</p>
                <div className="space-y-2 max-h-36 overflow-y-auto">
                  {selectedApp.emailLogs.map((log, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E3DCCB] text-xs">
                      <p className="font-bold text-[#101B2D] text-sm">{log.subject}</p>
                      <p className="text-slate-600 line-clamp-1 mt-0.5">{log.message}</p>
                      <p className="text-xs text-slate-400 mt-1">Sent by {log.sentBy} on {new Date(log.sentAt).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-3.5 border-t border-[#EFECE3]">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenPdfPreview(selectedApp)}
                  className="px-4 py-2 rounded-xl bg-[#101B2D] text-[#C5A15B] font-bold text-xs sm:text-sm hover:bg-[#1B293E]"
                >
                  View PDF Online
                </button>
                <button
                  type="button"
                  onClick={() => generateAdmissionPDF(selectedApp)}
                  className="px-4 py-2 rounded-xl border border-[#E3DCCB] bg-white text-[#101B2D] font-bold text-xs sm:text-sm hover:bg-[#FAF8F5]"
                >
                  Download PDF
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => openEmailModal(selectedApp)}
                  className="px-4 py-2 rounded-xl bg-sky-50 text-sky-700 border border-sky-300 font-bold text-xs sm:text-sm hover:bg-sky-100"
                >
                  Send Gmail Message
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedApp(null)}
                  className="px-4 py-2 rounded-xl border border-[#E3DCCB] bg-white text-slate-600 font-bold text-xs sm:text-sm hover:bg-[#FAF8F5]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Direct Online PDF Inspection Modal without downloading */}
      {previewPdfUri && previewingApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4">
          <div className="w-full max-w-4xl h-[90vh] flex flex-col rounded-2xl bg-white border border-[#E3DCCB] shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-[#E3DCCB] flex items-center justify-between bg-[#101B2D] text-white">
              <div>
                <span className="text-xs font-mono text-[#C5A15B] tracking-wider uppercase">
                  Application ID: {previewingApp.applicationId}
                </span>
                <h4 className="font-serif font-bold text-base text-white mt-0.5">
                  Inspect Admission Form PDF: {previewingApp.fullName}
                </h4>
              </div>
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => generateAdmissionPDF(previewingApp)}
                  className="px-4 py-2 rounded-lg bg-[#C5A15B] text-[#101B2D] text-xs sm:text-sm font-bold hover:bg-[#b08e4d]"
                >
                  Download PDF
                </button>
                <button
                  onClick={() => {
                    if (previewPdfUri) {
                      try { URL.revokeObjectURL(previewPdfUri); } catch { /* ignore */ }
                    }
                    setPreviewPdfUri(null);
                    setPreviewingApp(null);
                  }}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white font-bold text-base"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="flex-1 bg-slate-200 p-2">
              <iframe
                src={previewPdfUri}
                title="Application Form Inspection"
                className="w-full h-full rounded-lg border-0 shadow-inner"
              />
            </div>
          </div>
        </div>
      )}

      {/* Direct Gmail Correspondence Modal */}
      {isEmailModalOpen && selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-2xl border border-[#E3DCCB] bg-white p-6 sm:p-7 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#EFECE3] pb-3.5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#A68238]">
                  Direct Gmail Notification
                </span>
                <h4 className="font-serif font-bold text-lg text-[#101B2D] mt-0.5">
                  Compose Email to {selectedApp.fullName}
                </h4>
              </div>
              <button
                onClick={() => setIsEmailModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSendEmailSubmit} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Applicant Email Address</label>
                <input
                  type="email"
                  disabled
                  value={selectedApp.email}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-slate-100 text-slate-600 font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Subject</label>
                <input
                  type="text"
                  required
                  value={emailForm.subject}
                  onChange={(e) => setEmailForm({ ...emailForm, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Email Message</label>
                <textarea
                  rows={6}
                  required
                  value={emailForm.message}
                  onChange={(e) => setEmailForm({ ...emailForm, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D] font-sans leading-relaxed"
                />
              </div>

              <div className="pt-3.5 flex items-center justify-end gap-2.5 border-t border-[#EFECE3]">
                <button
                  type="button"
                  onClick={() => setIsEmailModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#E3DCCB] bg-white text-slate-600 text-xs sm:text-sm font-bold hover:bg-[#FAF8F5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSendingEmail}
                  className="px-5 py-2 rounded-xl bg-[#101B2D] text-[#C5A15B] text-xs sm:text-sm font-bold hover:bg-[#1B293E] disabled:opacity-50"
                >
                  {isSendingEmail ? 'Sending via Gmail...' : 'Dispatch Email Now'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
