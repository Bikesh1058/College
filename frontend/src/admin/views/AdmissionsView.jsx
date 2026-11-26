import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useAlert } from '../../context/useAlert';
import { generateAdmissionPDF, getAdmissionPDFBlobUrl } from '../../utils/admissionPdfGenerator';
import { Search, RefreshCw, FileText, Download, Mail, Eye, X, CheckCircle2, User, Phone, MapPin, GraduationCap } from 'lucide-react';

export default function AdmissionsView() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedStream, setSelectedStream] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedApp, setSelectedApp] = useState(null);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [emailForm, setEmailForm] = useState({ subject: '', message: '' });
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [previewPdfUri, setPreviewPdfUri] = useState(null);
  const [previewingApp, setPreviewingApp] = useState(null);

  const { alert, showToast } = useAlert();

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await api.getAdmissions();
      setApplications(res.data || []);
    } catch (err) {
      alert({
        title: 'Failed to Load Admissions',
        message: err.response?.data?.message || err.message,
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const filtered = applications.filter((app) => {
    const matchesStream =
      selectedStream === 'All' ||
      app.stream?.toLowerCase() === selectedStream.toLowerCase() ||
      (selectedStream === 'sci-bio' && (app.stream?.includes('bio') || app.streamName?.toLowerCase().includes('bio'))) ||
      (selectedStream === 'sci-cs' && (app.stream?.includes('comp') || app.streamName?.toLowerCase().includes('comp'))) ||
      (selectedStream === 'mgmt' && (app.stream?.includes('mgmt') || app.streamName?.toLowerCase().includes('manage'))) ||
      (selectedStream === 'humanities' && (app.stream?.includes('hum') || app.streamName?.toLowerCase().includes('humanities') || app.streamName?.toLowerCase().includes('law')));

    const matchesStatus =
      selectedStatus === 'All' ||
      app.status?.toLowerCase() === selectedStatus.toLowerCase();

    const matchesSearch =
      app.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      app.applicationId?.toLowerCase().includes(search.toLowerCase()) ||
      app.email?.toLowerCase().includes(search.toLowerCase()) ||
      app.seeSymbolNo?.toLowerCase().includes(search.toLowerCase()) ||
      app.mobile?.includes(search);

    return matchesStream && matchesStatus && matchesSearch;
  });

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
      <div className="rounded-2xl border border-[#E3DCCB] bg-white p-6 sm:p-7 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-sans text-xl sm:text-2xl font-bold text-[#101B2D] tracking-tight">Class 11 (+2) Admission Applications</h3>
          <p className="text-xs text-slate-500 mt-1">Review applicant profiles, entrance eligibility, and dispatch decision letters</p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchApplications}
            disabled={loading}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-xs sm:text-sm font-bold text-[#101B2D] hover:bg-white hover:border-[#C5A15B] transition shadow-xs cursor-pointer"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin text-[#A68238]' : 'text-slate-500'}`} />
            <span>Refresh Data</span>
          </button>
        </div>
      </div>

      {/* Structured Intake Ledger Strip */}
      <div className="rounded-2xl border border-[#E3DCCB] bg-white p-5 shadow-xs">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#EFECE3] -my-1 md:my-0">
          <div className="px-4 py-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Applicants</span>
            <p className="font-sans text-2xl font-bold text-[#101B2D] mt-1">{applications.length}</p>
          </div>
          <div className="px-4 py-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">Awaiting Review</span>
            <p className="font-sans text-2xl font-bold text-[#101B2D] mt-1">
              {applications.filter(a => a.status === 'Submitted' || a.status === 'Under Review').length}
            </p>
          </div>
          <div className="px-4 py-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700">Entrance Eligible</span>
            <p className="font-sans text-2xl font-bold text-[#101B2D] mt-1">
              {applications.filter(a => a.status === 'Verified' || a.status === 'Entrance Eligible').length}
            </p>
          </div>
          <div className="px-4 py-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">Enrolled / Accepted</span>
            <p className="font-sans text-2xl font-bold text-[#101B2D] mt-1">
              {applications.filter(a => a.status === 'Accepted').length}
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl border border-[#E3DCCB] bg-white shadow-xs">
        <div className="w-full sm:w-96 relative">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, Application ID, Gmail, or SEE symbol..."
            className="w-full pl-10 pr-3.5 py-2 text-xs sm:text-sm rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-[#101B2D] outline-none focus:border-[#C5A15B] focus:bg-white transition"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <select
            value={selectedStream}
            onChange={(e) => setSelectedStream(e.target.value)}
            className="px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-[#101B2D] font-medium outline-none focus:border-[#C5A15B]"
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
            className="px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-[#101B2D] font-medium outline-none focus:border-[#C5A15B]"
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
                <td colSpan={7} className="py-12 text-center text-slate-400 text-sm">
                  <RefreshCw className="h-6 w-6 animate-spin mx-auto text-[#A68238] mb-2" />
                  Loading candidate applications...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-10 text-center text-slate-500 text-sm">
                  <div className="max-w-xs mx-auto py-2">
                    <p className="font-semibold text-[#101B2D]">No applications match current filters</p>
                    <p className="text-xs text-slate-400 mt-1">Adjust stream or status selection to view candidates.</p>
                  </div>
                </td>
              </tr>
            ) : (
              filtered.map((app) => (
                <tr key={app._id} className="hover:bg-[#FAF8F5] transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#A68238] text-xs sm:text-sm">
                    {app.applicationId}
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-[#101B2D]">{app.fullName}</p>
                    <p className="text-xs text-slate-500 mt-0.5">Mobile: {app.mobile}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-slate-800 block text-xs sm:text-sm">
                      {app.streamName || app.stream}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-block px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                      {app.seeGpa} GPA
                    </span>
                    <p className="text-xs text-slate-500 truncate max-w-[160px] mt-1">{app.seeSchool}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-[#101B2D] font-mono text-xs">{app.email}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <select
                      value={app.status}
                      onChange={(e) => handleStatusChange(app._id, e.target.value)}
                      className="text-xs font-bold px-2.5 py-1.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-[#101B2D] outline-none focus:border-[#C5A15B] transition shadow-2xs"
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
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setSelectedApp(app)}
                        className="px-2.5 py-1.5 rounded-lg border border-[#E3DCCB] bg-white text-[#101B2D] hover:bg-[#FAF8F5] hover:border-[#C5A15B] text-xs font-bold transition shadow-xs"
                        title="Inspect Form Details"
                      >
                        Details
                      </button>

                      <button
                        onClick={() => handleOpenPdfPreview(app)}
                        className="px-2.5 py-1.5 rounded-lg bg-[#101B2D] text-[#C5A15B] hover:bg-[#1B293E] text-xs font-bold transition shadow-xs"
                        title="View PDF Online"
                      >
                        PDF
                      </button>

                      <button
                        onClick={() => generateAdmissionPDF(app)}
                        className="p-1.5 rounded-lg border border-[#E3DCCB] bg-[#FAF8F5] text-[#101B2D] hover:bg-white text-xs font-bold transition shadow-xs"
                        title="Download PDF file"
                      >
                        <Download className="h-3.5 w-3.5" />
                      </button>

                      <button
                        onClick={() => openEmailModal(app)}
                        className="px-2.5 py-1.5 rounded-lg bg-[#C5A15B]/15 text-[#A68238] border border-[#E3DCCB] hover:bg-[#101B2D] hover:text-[#C5A15B] text-xs font-bold transition shadow-xs"
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
                <h4 className="font-sans font-bold text-lg sm:text-xl text-[#101B2D] mt-0.5">
                  {selectedApp.fullName} — Form Details
                </h4>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 font-bold"
              >
                <X className="h-4 w-4" />
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

              {/* Uploaded Documents preview */}
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
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-[#101B2D]">SEE Marksheet Scan</p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {selectedApp.marksheetUrl ? "Attached on File" : "Verified with Symbol"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#EFECE3] flex items-center justify-between">
              <button
                onClick={() => generateAdmissionPDF(selectedApp)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#101B2D] text-[#101B2D] font-bold text-xs sm:text-sm hover:bg-[#FAF8F5]"
              >
                <Download className="h-4 w-4" />
                <span>Download Form PDF</span>
              </button>

              <button
                onClick={() => setSelectedApp(null)}
                className="px-5 py-2 rounded-xl bg-[#101B2D] text-[#C5A15B] font-bold text-xs sm:text-sm hover:bg-[#1B293E]"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PDF View Modal */}
      {previewPdfUri && previewingApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="w-full max-w-4xl h-[90vh] rounded-2xl border border-[#C5A15B] bg-white flex flex-col shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-[#EFECE3] flex items-center justify-between bg-[#101B2D] text-white">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-[#C5A15B]" />
                <div>
                  <h4 className="font-sans font-bold text-base sm:text-lg text-white">
                    Official Admission Form Preview
                  </h4>
                  <p className="text-xs text-[#C5A15B]">
                    {previewingApp.fullName} ({previewingApp.applicationId})
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  try { URL.revokeObjectURL(previewPdfUri); } catch { /* ignore */ }
                  setPreviewPdfUri(null);
                  setPreviewingApp(null);
                }}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 bg-slate-100 p-2 overflow-hidden">
              <iframe
                src={previewPdfUri}
                title="Khwopa Admission PDF Preview"
                className="w-full h-full rounded-xl border border-slate-300"
              />
            </div>
          </div>
        </div>
      )}

      {/* Email Candidate Modal */}
      {isEmailModalOpen && selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-2xl border border-[#E3DCCB] bg-white p-6 sm:p-7 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#EFECE3] pb-3.5">
              <div>
                <h4 className="font-sans font-bold text-lg text-[#101B2D]">Dispatch Official Admission Circular</h4>
                <p className="text-xs text-slate-500 mt-0.5">Direct dispatch to candidate's registered address ({selectedApp.email})</p>
              </div>
              <button
                onClick={() => setIsEmailModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSendEmailSubmit} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Email Subject</label>
                <input
                  type="text"
                  required
                  value={emailForm.subject}
                  onChange={(e) => setEmailForm({ ...emailForm, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D] outline-none focus:border-[#C5A15B] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Circular Body</label>
                <textarea
                  rows={6}
                  required
                  value={emailForm.message}
                  onChange={(e) => setEmailForm({ ...emailForm, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D] leading-relaxed outline-none focus:border-[#C5A15B] focus:bg-white font-sans"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#EFECE3]">
                <button
                  type="button"
                  onClick={() => setIsEmailModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-slate-700 text-xs sm:text-sm font-bold hover:bg-[#FAF8F5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSendingEmail}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#101B2D] text-[#C5A15B] text-xs sm:text-sm font-bold hover:bg-[#1B293E] disabled:opacity-50 shadow-xs"
                >
                  <Mail className="h-4 w-4" />
                  <span>{isSendingEmail ? 'Dispatching...' : 'Dispatch Email'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
