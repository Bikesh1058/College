import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

// Context
import { AdminDataProvider } from './context/AdminDataContext';
import { useAdminData } from './context/useAdminData';
import { useAlert } from '../context/useAlert';

// Components
import AdminSidebar from './components/AdminSidebar';
import AdminHeader from './components/AdminHeader';
import ImageUploadInput from './components/ImageUploadInput';

// Views
import OverviewView from './views/OverviewView';
import NoticesView from './views/NoticesView';
import FacultyView from './views/FacultyView';
import SettingsView from './views/SettingsView';
import PageBuilderView from './views/PageBuilderView';
import AdmissionsView from './views/AdmissionsView';
import ContactInquiriesView from './views/ContactInquiriesView';

function AdminDashboardContent() {
  const [activeTab, setActiveTab] = useState('overview');
  const [globalSearch, setGlobalSearch] = useState('');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Interactive Form States for Dynamic Tabs
  const [showAddStream, setShowAddStream] = useState(false);
  const [newStream, setNewStream] = useState({ title: '', code: '', facultyStream: 'Science', overview: '', image: '' });
  const [editingStream, setEditingStream] = useState(null);

  const [showAddExam, setShowAddExam] = useState(false);
  const [newExam, setNewExam] = useState({ title: '', examDate: '', status: 'Routine Published', center: 'Center 104 (Khwopa)', gradeLevel: 'Grade 12', routineImage: '' });
  const [editingExam, setEditingExam] = useState(null);

  const [showAddClub, setShowAddClub] = useState(false);
  const [newClub, setNewClub] = useState({ name: '', lead: '', members: '50 Members', description: '', category: 'Student Society', image: '' });
  const [editingClub, setEditingClub] = useState(null);

  const [showAddResearch, setShowAddResearch] = useState(false);
  const [newResearch, setNewResearch] = useState({ title: '', author: '', year: '2082/2083', category: 'Peer Reviewed', abstract: '', pdfUrl: '' });
  const [editingResearch, setEditingResearch] = useState(null);

  const [showAddDoc, setShowAddDoc] = useState(false);
  const [newDoc, setNewDoc] = useState({ title: '', category: 'Syllabus', fileSize: '1.2 MB PDF', fileUrl: '/resources/downloads', academicYear: '2082/2083', description: '' });
  const [editingDoc, setEditingDoc] = useState(null);

  const [showAddMedia, setShowAddMedia] = useState(false);
  const [newMedia, setNewMedia] = useState({ number: '01', title: '', category: 'Academic', image: '', description: '' });
  const [editingMedia, setEditingMedia] = useState(null);

  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'News Editor', department: 'Administration', avatar: '' });

  const { alert } = useAlert();

  const {
    toast,
    setToast,
    showToast,
    settings,
    updateSettings,
    programmes,
    createProgramme,
    updateProgramme,
    deleteProgramme,
    examinations,
    createExamination,
    updateExamination,
    deleteExamination,
    clubs,
    createClub,
    updateClub,
    deleteClub,
    research,
    createResearch,
    updateResearch,
    deleteResearch,
    documents,
    createDocument,
    updateDocument,
    deleteDocument,
    facilities,
    createFacility,
    updateFacility,
    deleteFacility,
    users,
    createUser,
    deleteUser,
    faculty,
    notices
  } = useAdminData();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('khwopa_user') || '{}');

  useEffect(() => {
    const token = localStorage.getItem('khwopa_token');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('khwopa_token');
    localStorage.removeItem('khwopa_user');
    navigate('/admin/login');
  };

  return (
    <div className="fixed inset-0 z-50 flex bg-[#F5F2EA] font-sans text-[#101B2D] selection:bg-[#C5A15B] selection:text-[#101B2D] overflow-hidden">
      {/* 1. Modular Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        user={user}
        onLogout={handleLogout}
      />

      {/* 2. Main Workspace Layout */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#F5F2EA]">
        {/* Top Header */}
        <AdminHeader
          globalSearch={globalSearch}
          setGlobalSearch={setGlobalSearch}
          onOpenMobileMenu={() => setIsMobileOpen(true)}
          onQuickAction={() => setActiveTab('notices')}
        />

        {/* Global Toast Notification */}
        {toast && (
          <div className="mx-6 mt-4 p-4 bg-[#101B2D] text-white rounded-xl shadow-xl flex items-center justify-between border-l-4 border-[#C5A15B] animate-fade-in">
            <div className="flex items-center gap-2.5 text-sm">
              <CheckCircle className="h-4 w-4 text-[#C5A15B]" />
              <span className="font-medium">{typeof toast === 'string' ? toast : toast.message}</span>
            </div>
            <button onClick={() => setToast('')} className="text-slate-400 hover:text-white text-sm font-bold px-2">✕</button>
          </div>
        )}

        {/* Dynamic Main Workspace Container */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Global Search Results Banner when typing in top header */}
          {globalSearch.trim().length > 0 && (
            <div className="rounded-2xl border border-[#C5A15B] bg-white p-6 shadow-md space-y-4">
              <div className="flex items-center justify-between border-b border-[#EFECE3] pb-3.5">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#A68238]">
                    Global Institutional Search
                  </span>
                  <h4 className="font-sans font-bold text-lg text-[#101B2D] mt-0.5">
                    Results for "{globalSearch}"
                  </h4>
                </div>
                <button
                  onClick={() => setGlobalSearch('')}
                  className="px-3.5 py-1.5 rounded-lg bg-[#FAF8F5] border border-[#E3DCCB] text-xs font-bold text-slate-600 hover:text-[#101B2D]"
                >
                  Clear Search ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                {/* Educators Matches */}
                <div className="rounded-xl bg-[#FAF8F5] p-4 border border-[#E3DCCB]">
                  <p className="font-bold text-[#101B2D] mb-2.5 text-sm">
                    Educators ({faculty.filter(f => `${f.name} ${f.subject} ${f.department}`.toLowerCase().includes(globalSearch.toLowerCase())).length})
                  </p>
                  <div className="space-y-2 max-h-44 overflow-y-auto">
                    {faculty
                      .filter(f => `${f.name} ${f.subject} ${f.department}`.toLowerCase().includes(globalSearch.toLowerCase()))
                      .slice(0, 5)
                      .map(f => (
                        <div
                          key={f._id || f.id}
                          onClick={() => { setActiveTab('faculty'); setGlobalSearch(''); }}
                          className="p-2.5 rounded-lg bg-white border border-[#E3DCCB] cursor-pointer hover:border-[#C5A15B]"
                        >
                          <p className="font-bold text-[#101B2D] text-sm">{f.name}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{f.subject} — {f.facultyStream}</p>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Notices Matches */}
                <div className="rounded-xl bg-[#FAF8F5] p-4 border border-[#E3DCCB]">
                  <p className="font-bold text-[#101B2D] mb-2.5 text-sm">
                    Notices ({notices.filter(n => `${n.title} ${n.category}`.toLowerCase().includes(globalSearch.toLowerCase())).length})
                  </p>
                  <div className="space-y-2 max-h-44 overflow-y-auto">
                    {notices
                      .filter(n => `${n.title} ${n.category}`.toLowerCase().includes(globalSearch.toLowerCase()))
                      .slice(0, 5)
                      .map(n => (
                        <div
                          key={n._id}
                          onClick={() => { setActiveTab('notices'); setGlobalSearch(''); }}
                          className="p-2.5 rounded-lg bg-white border border-[#E3DCCB] cursor-pointer hover:border-[#C5A15B]"
                        >
                          <p className="font-bold text-[#101B2D] text-sm truncate">{n.title}</p>
                          <p className="text-xs text-[#A68238] mt-0.5">{n.category}</p>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Academic Streams & Pages */}
                <div className="rounded-xl bg-[#FAF8F5] p-4 border border-[#E3DCCB]">
                  <p className="font-bold text-[#101B2D] mb-2.5 text-sm">
                    Quick Navigation Jump
                  </p>
                  <div className="space-y-2">
                    {[
                      { label: 'Visual Page Builder', tab: 'pagebuilder' },
                      { label: 'Admissions & Intakes', tab: 'admissions' },
                      { label: 'Examinations (NEB)', tab: 'examinations' },
                      { label: 'Notices & News', tab: 'notices' }
                    ].map(item => (
                      <button
                        key={item.tab}
                        onClick={() => { setActiveTab(item.tab); setGlobalSearch(''); }}
                        className="w-full text-left p-2.5 rounded-lg bg-white border border-[#E3DCCB] text-xs sm:text-sm font-semibold text-[#101B2D] hover:border-[#C5A15B]"
                      >
                        Open {item.label} →
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'overview' && (
            <OverviewView setActiveTab={setActiveTab} user={user} />
          )}

          {activeTab === 'notices' && (
            <NoticesView />
          )}

          {activeTab === 'faculty' && (
            <FacultyView />
          )}

          {activeTab === 'settings' && (
            <SettingsView />
          )}

          {/* Academics View */}
          {activeTab === 'academics' && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-[#E3DCCB] bg-white p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="font-sans text-xl sm:text-2xl font-bold text-[#101B2D] tracking-tight">+2 Academic Streams</h3>
                  <p className="text-xs text-slate-500 mt-1">Configure higher secondary curricula, subject combinations, and laboratory profiles</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowAddStream(!showAddStream)}
                    className="px-4 py-2.5 rounded-xl bg-[#101B2D] text-[#C5A15B] text-xs sm:text-sm font-bold hover:bg-[#1B293E] transition shadow-xs cursor-pointer"
                  >
                    {showAddStream ? 'Close Form ✕' : '+ Add Academic Stream'}
                  </button>
                </div>
              </div>

              {showAddStream && (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (!newStream.title || !newStream.code) return;
                    await createProgramme(newStream);
                    setNewStream({ title: '', code: '', facultyStream: 'Science', overview: '' });
                    setShowAddStream(false);
                  }}
                  className="rounded-2xl border border-[#C5A15B] bg-[#FAF8F5] p-6 shadow-md space-y-4 text-sm"
                >
                  <div className="flex items-center justify-between border-b border-[#E3DCCB] pb-3">
                    <div>
                      <h4 className="font-sans font-bold text-lg text-[#101B2D]">Create New +2 Stream</h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowAddStream(false)}
                      className="text-xs text-slate-600 hover:text-[#101B2D] font-bold px-2 py-1 rounded"
                    >
                      Cancel ✕
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Stream Title</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. +2 Science (Computer Group)"
                        value={newStream.title}
                        onChange={(e) => setNewStream({ ...newStream, title: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-sm text-[#101B2D] focus:outline-none focus:border-[#C5A15B] focus:ring-1 focus:ring-[#C5A15B]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Stream Code</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. SCI-COMP"
                        value={newStream.code}
                        onChange={(e) => setNewStream({ ...newStream, code: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-sm text-[#101B2D] font-mono focus:outline-none focus:border-[#C5A15B] focus:ring-1 focus:ring-[#C5A15B]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Faculty Category</label>
                      <select
                        value={newStream.facultyStream}
                        onChange={(e) => setNewStream({ ...newStream, facultyStream: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-sm text-[#101B2D] focus:outline-none focus:border-[#C5A15B] focus:ring-1 focus:ring-[#C5A15B]"
                      >
                        <option value="Science">Science</option>
                        <option value="Management">Management</option>
                        <option value="Humanities & Law">Humanities & Law</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Curriculum Overview</label>
                    <textarea
                      rows={2}
                      required
                      placeholder="Describe subjects, laboratory work, and eligibility..."
                      value={newStream.overview}
                      onChange={(e) => setNewStream({ ...newStream, overview: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-sm text-[#101B2D] leading-relaxed focus:outline-none focus:border-[#C5A15B] focus:ring-1 focus:ring-[#C5A15B]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Stream Banner / Lab Image (Upload or URL)</label>
                    <ImageUploadInput
                      value={newStream.image}
                      onChange={(val) => setNewStream({ ...newStream, image: val })}
                      placeholder="https://... or click Upload on the left"
                    />
                  </div>
                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setShowAddStream(false)}
                      className="px-4 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-slate-700 text-xs sm:text-sm font-bold hover:bg-[#FAF8F5]"
                    >
                      Discard
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-[#101B2D] text-[#C5A15B] text-xs sm:text-sm font-bold hover:bg-[#1B293E] transition shadow-xs cursor-pointer"
                    >
                      Save Academic Stream
                    </button>
                  </div>
                </form>
              )}

              {/* Inline Edit Academic Stream Form */}
              {editingStream && (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (editingStream._id && editingStream._id.length > 5) {
                      await updateProgramme(editingStream._id, {
                        title: editingStream.title,
                        code: editingStream.code,
                        facultyStream: editingStream.facultyStream,
                        overview: editingStream.overview
                      });
                    } else {
                      await createProgramme({
                        title: editingStream.title,
                        code: editingStream.code || 'NEB-2',
                        facultyStream: editingStream.facultyStream || 'Science',
                        overview: editingStream.overview
                      });
                    }
                    setEditingStream(null);
                  }}
                  className="rounded-2xl border-2 border-[#C5A15B] bg-[#FAF8F5] p-6 shadow-lg space-y-4 text-sm"
                >
                  <div className="flex items-center justify-between border-b border-[#E3DCCB] pb-3">
                    <div>
                      <h4 className="font-sans font-bold text-lg text-[#101B2D]">Edit Academic Stream: {editingStream.title}</h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditingStream(null)}
                      className="text-xs text-slate-600 hover:text-[#101B2D] font-bold px-2 py-1 rounded"
                    >
                      Cancel ✕
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Stream Title</label>
                      <input
                        type="text"
                        required
                        value={editingStream.title || ''}
                        onChange={(e) => setEditingStream({ ...editingStream, title: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-sm text-[#101B2D] focus:outline-none focus:border-[#C5A15B] focus:ring-1 focus:ring-[#C5A15B]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Stream Code</label>
                      <input
                        type="text"
                        required
                        value={editingStream.code || ''}
                        onChange={(e) => setEditingStream({ ...editingStream, code: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-sm text-[#101B2D] font-mono focus:outline-none focus:border-[#C5A15B] focus:ring-1 focus:ring-[#C5A15B]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Faculty Category</label>
                      <select
                        value={editingStream.facultyStream || 'Science'}
                        onChange={(e) => setEditingStream({ ...editingStream, facultyStream: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-sm text-[#101B2D] focus:outline-none focus:border-[#C5A15B] focus:ring-1 focus:ring-[#C5A15B]"
                      >
                        <option value="Science">Science</option>
                        <option value="Management">Management</option>
                        <option value="Humanities & Law">Humanities & Law</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Curriculum Overview</label>
                    <textarea
                      rows={2}
                      required
                      value={editingStream.overview || ''}
                      onChange={(e) => setEditingStream({ ...editingStream, overview: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-sm text-[#101B2D] leading-relaxed focus:outline-none focus:border-[#C5A15B] focus:ring-1 focus:ring-[#C5A15B]"
                    />
                  </div>
                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setEditingStream(null)}
                      className="px-4 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-slate-700 text-xs sm:text-sm font-bold hover:bg-[#FAF8F5]"
                    >
                      Discard
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-[#101B2D] text-[#C5A15B] text-xs sm:text-sm font-bold hover:bg-[#1B293E] transition shadow-xs cursor-pointer"
                    >
                      Save Stream Changes
                    </button>
                  </div>
                </form>
              )}

              {programmes.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[#E3DCCB] bg-[#FAF8F5] p-10 text-center">
                  <p className="font-semibold text-sm text-[#101B2D]">No academic streams registered</p>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">Click "+ Add Academic Stream" above to configure your higher secondary curricula.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {programmes.map((prog) => (
                    <div key={prog._id} className="rounded-2xl border border-[#E3DCCB] bg-white p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#A68238] bg-[#C5A15B]/15 px-2.5 py-0.5 rounded-md">
                            {prog.facultyStream}
                          </span>
                          <span className="text-xs font-mono font-bold text-slate-600 bg-[#FAF8F5] border border-[#E3DCCB] px-2 py-0.5 rounded">
                            {prog.code}
                          </span>
                        </div>
                        <h4 className="mt-3 font-sans font-bold text-lg text-[#101B2D] leading-snug">{prog.title}</h4>
                        <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-3">{prog.overview}</p>
                      </div>

                      <div className="mt-5 pt-3.5 border-t border-[#EFECE3] flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2.5">
                          <button
                            onClick={() => setEditingStream({ ...prog })}
                            className="px-3 py-1.5 rounded-lg border border-[#E3DCCB] bg-[#FAF8F5] font-bold text-[#101B2D] hover:border-[#C5A15B] transition cursor-pointer"
                          >
                            Edit
                          </button>
                          <a href="/academics/programmes" target="_blank" rel="noreferrer" className="text-[#A68238] font-bold hover:underline">
                            Public View ↗
                          </a>
                        </div>
                        {prog._id && prog._id.length > 5 && (
                          <button
                            onClick={() => deleteProgramme(prog._id)}
                            className="text-rose-600 hover:underline font-semibold cursor-pointer"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Admissions View */}
          {activeTab === 'admissions' && (
            <AdmissionsView />
          )}

          {/* Contact Inquiries View */}
          {activeTab === 'inquiries' && (
            <ContactInquiriesView />
          )}

          {/* Examinations View */}
          {activeTab === 'examinations' && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-[#E3DCCB] bg-white p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="font-sans text-xl sm:text-2xl font-bold text-[#101B2D] tracking-tight">Examinations & Board Schedules</h3>
                  <p className="text-xs text-slate-500 mt-1">Publish terminal routines, NEB board schedules, admit card updates, and examination hall seat allocations</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowAddExam(!showAddExam)}
                    className="px-4 py-2.5 rounded-xl bg-[#101B2D] text-[#C5A15B] text-xs sm:text-sm font-bold hover:bg-[#1B293E] transition shadow-xs cursor-pointer"
                  >
                    {showAddExam ? 'Close Form ✕' : '+ Schedule Exam Routine'}
                  </button>
                </div>
              </div>

              {showAddExam && (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (!newExam.title || !newExam.examDate) return;
                    await createExamination(newExam);
                    setNewExam({ title: '', examDate: '', status: 'Routine Published', center: 'Center 104 (Khwopa)', gradeLevel: 'Grade 12' });
                    setShowAddExam(false);
                  }}
                  className="rounded-2xl border border-[#C5A15B] bg-[#FAF8F5] p-6 shadow-md space-y-4 text-sm"
                >
                  <div className="flex items-center justify-between border-b border-[#E3DCCB] pb-3">
                    <div>
                      <h4 className="font-sans font-bold text-lg text-[#101B2D]">Publish New Examination Schedule</h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowAddExam(false)}
                      className="text-xs text-slate-600 hover:text-[#101B2D] font-bold px-2 py-1 rounded"
                    >
                      Cancel ✕
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Exam Title</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Grade 12 Second Terminal Exam"
                        value={newExam.title}
                        onChange={(e) => setNewExam({ ...newExam, title: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-sm text-[#101B2D] focus:outline-none focus:border-[#C5A15B] focus:ring-1 focus:ring-[#C5A15B]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Start Date (BS)</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Starts Mangsir 15, 2083"
                        value={newExam.examDate}
                        onChange={(e) => setNewExam({ ...newExam, examDate: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-sm text-[#101B2D] focus:outline-none focus:border-[#C5A15B] focus:ring-1 focus:ring-[#C5A15B]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Current Status</label>
                      <select
                        value={newExam.status}
                        onChange={(e) => setNewExam({ ...newExam, status: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-sm text-[#101B2D] focus:outline-none focus:border-[#C5A15B] focus:ring-1 focus:ring-[#C5A15B]"
                      >
                        <option value="Routine Published">Routine Published</option>
                        <option value="Admit Cards Ready">Admit Cards Ready</option>
                        <option value="Results Published">Results Published</option>
                        <option value="Upcoming">Upcoming</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Exam Venue / Hall</label>
                      <input
                        type="text"
                        required
                        value={newExam.center}
                        onChange={(e) => setNewExam({ ...newExam, center: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-sm text-[#101B2D] focus:outline-none focus:border-[#C5A15B] focus:ring-1 focus:ring-[#C5A15B]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Routine Image / Seat Plan Attachment (Upload or URL)</label>
                    <ImageUploadInput
                      value={newExam.routineImage}
                      onChange={(val) => setNewExam({ ...newExam, routineImage: val })}
                      accept="image/*,.pdf"
                      placeholder="https://... or click Upload on the left"
                    />
                  </div>
                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setShowAddExam(false)}
                      className="px-4 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-slate-700 text-xs sm:text-sm font-bold hover:bg-[#FAF8F5]"
                    >
                      Discard
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-[#101B2D] text-[#C5A15B] text-xs sm:text-sm font-bold hover:bg-[#1B293E] transition shadow-xs cursor-pointer"
                    >
                      Publish Exam Schedule
                    </button>
                  </div>
                </form>
              )}

              {/* Inline Edit Examination Form */}
              {editingExam && (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (editingExam._id) {
                      await updateExamination(editingExam._id, {
                        title: editingExam.title,
                        examDate: editingExam.date || editingExam.examDate,
                        status: editingExam.status,
                        center: editingExam.center
                      });
                    } else {
                      await createExamination({
                        title: editingExam.title,
                        examDate: editingExam.date || editingExam.examDate,
                        status: editingExam.status,
                        center: editingExam.center
                      });
                    }
                    setEditingExam(null);
                  }}
                  className="rounded-2xl border-2 border-[#C5A15B] bg-[#FAF8F5] p-6 shadow-lg space-y-4 text-sm"
                >
                  <div className="flex items-center justify-between border-b border-[#E3DCCB] pb-3">
                    <div>
                      <h4 className="font-sans font-bold text-lg text-[#101B2D]">Edit Examination Schedule: {editingExam.title}</h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditingExam(null)}
                      className="text-xs text-slate-600 hover:text-[#101B2D] font-bold px-2 py-1 rounded"
                    >
                      Cancel ✕
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Exam Title</label>
                      <input
                        type="text"
                        required
                        value={editingExam.title || ''}
                        onChange={(e) => setEditingExam({ ...editingExam, title: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-sm text-[#101B2D] focus:outline-none focus:border-[#C5A15B] focus:ring-1 focus:ring-[#C5A15B]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Start Date (BS)</label>
                      <input
                        type="text"
                        required
                        value={editingExam.date || editingExam.examDate || ''}
                        onChange={(e) => setEditingExam({ ...editingExam, date: e.target.value, examDate: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-sm text-[#101B2D] focus:outline-none focus:border-[#C5A15B] focus:ring-1 focus:ring-[#C5A15B]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Current Status</label>
                      <input
                        type="text"
                        value={editingExam.status || ''}
                        onChange={(e) => setEditingExam({ ...editingExam, status: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-sm text-[#101B2D] focus:outline-none focus:border-[#C5A15B] focus:ring-1 focus:ring-[#C5A15B]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Exam Venue / Hall</label>
                      <input
                        type="text"
                        value={editingExam.center || ''}
                        onChange={(e) => setEditingExam({ ...editingExam, center: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-sm text-[#101B2D] focus:outline-none focus:border-[#C5A15B] focus:ring-1 focus:ring-[#C5A15B]"
                      />
                    </div>
                  </div>
                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setEditingExam(null)}
                      className="px-4 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-slate-700 text-xs sm:text-sm font-bold hover:bg-[#FAF8F5]"
                    >
                      Discard
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-[#101B2D] text-[#C5A15B] text-xs sm:text-sm font-bold hover:bg-[#1B293E] transition shadow-xs cursor-pointer"
                    >
                      Save Examination Changes
                    </button>
                  </div>
                </form>
              )}

              {examinations.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[#E3DCCB] bg-[#FAF8F5] p-10 text-center">
                  <p className="font-semibold text-sm text-[#101B2D]">No examination routines published</p>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">Click "+ Schedule Exam Routine" above to publish NEB board schedules or terminal routines.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {examinations.map((e) => ({ _id: e._id, title: e.title, date: e.examDate, status: e.status, center: e.center, routineImage: e.routineImage })).map((ex, idx) => (
                    <div key={ex._id || idx} className="rounded-2xl border border-[#E3DCCB] bg-white p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider ${
                            ex.status === 'Results Published'
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : ex.status === 'Admit Cards Ready'
                              ? 'bg-blue-50 text-blue-800 border border-blue-200'
                              : 'bg-[#C5A15B]/15 text-[#A68238] border border-[#C5A15B]/30'
                          }`}>
                            {ex.status}
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setEditingExam({ ...ex })}
                              className="px-2.5 py-1 rounded-lg border border-[#E3DCCB] bg-[#FAF8F5] text-xs font-bold text-[#101B2D] hover:border-[#C5A15B] transition cursor-pointer"
                            >
                              Edit
                            </button>
                            {ex._id && (
                              <button
                                onClick={() => deleteExamination(ex._id)}
                                className="text-xs text-rose-600 font-bold hover:underline cursor-pointer"
                              >
                                Remove
                              </button>
                            )}
                          </div>
                        </div>
                        <h4 className="font-sans font-bold text-base sm:text-lg text-[#101B2D] leading-snug">{ex.title}</h4>
                        <div className="space-y-1.5 pt-1 text-sm text-slate-600">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider w-16">Date:</span>
                            <span className="font-medium text-[#101B2D]">{ex.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider w-16">Venue:</span>
                            <span className="font-medium text-[#101B2D]">{ex.center}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Page Builder View */}
          {activeTab === 'pagebuilder' && (
            <PageBuilderView />
          )}

          {/* Student Clubs & Life View */}
          {activeTab === 'campuslife' && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-[#E3DCCB] bg-white p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="font-sans text-xl sm:text-2xl font-bold text-[#101B2D] tracking-tight">Campus Life, Clubs & Societies</h3>
                  <p className="text-xs text-slate-500 mt-1">Student athletic societies, scientific clubs, and community engagement bodies</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowAddClub(!showAddClub)}
                    className="px-4 py-2.5 rounded-xl bg-[#101B2D] text-[#C5A15B] text-xs sm:text-sm font-bold hover:bg-[#1B293E] transition shadow-xs cursor-pointer"
                  >
                    {showAddClub ? 'Close Form ✕' : '+ Register New Club'}
                  </button>
                </div>
              </div>

              {showAddClub && (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (!newClub.name || !newClub.lead) return;
                    await createClub(newClub);
                    setNewClub({ name: '', lead: '', members: '50 Members', description: '', category: 'Student Society' });
                    setShowAddClub(false);
                  }}
                  className="rounded-2xl border border-[#C5A15B] bg-[#FAF8F5] p-6 shadow-md space-y-4 text-sm"
                >
                  <div className="flex items-center justify-between border-b border-[#E3DCCB] pb-3">
                    <div>
                      <h4 className="font-sans font-bold text-lg text-[#101B2D]">Register Student Club or Society</h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowAddClub(false)}
                      className="text-xs text-slate-600 hover:text-[#101B2D] font-bold px-2 py-1 rounded"
                    >
                      Cancel ✕
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Club Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Khwopa Astronomy & Space Club"
                        value={newClub.name}
                        onChange={(e) => setNewClub({ ...newClub, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-sm text-[#101B2D] focus:outline-none focus:border-[#C5A15B] focus:ring-1 focus:ring-[#C5A15B]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Student Coordinator</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Suman Bekoju (Grade 12)"
                        value={newClub.lead}
                        onChange={(e) => setNewClub({ ...newClub, lead: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-sm text-[#101B2D] focus:outline-none focus:border-[#C5A15B] focus:ring-1 focus:ring-[#C5A15B]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Active Members</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 65 Members"
                        value={newClub.members}
                        onChange={(e) => setNewClub({ ...newClub, members: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-sm text-[#101B2D] focus:outline-none focus:border-[#C5A15B] focus:ring-1 focus:ring-[#C5A15B]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Mission & Activities</label>
                    <input
                      type="text"
                      required
                      placeholder="Brief description of club events and workshops..."
                      value={newClub.description}
                      onChange={(e) => setNewClub({ ...newClub, description: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-sm text-[#101B2D] focus:outline-none focus:border-[#C5A15B] focus:ring-1 focus:ring-[#C5A15B]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Club Banner / Activity Photo (Upload or URL)</label>
                    <ImageUploadInput
                      value={newClub.image}
                      onChange={(val) => setNewClub({ ...newClub, image: val })}
                      placeholder="https://... or click Upload on the left"
                    />
                  </div>
                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setShowAddClub(false)}
                      className="px-4 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-slate-700 text-xs sm:text-sm font-bold hover:bg-[#FAF8F5]"
                    >
                      Discard
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-[#101B2D] text-[#C5A15B] text-xs sm:text-sm font-bold hover:bg-[#1B293E] transition shadow-xs cursor-pointer"
                    >
                      Save Student Club
                    </button>
                  </div>
                </form>
              )}

              {/* Inline Edit Student Club Form */}
              {editingClub && (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (editingClub._id) {
                      await updateClub(editingClub._id, {
                        name: editingClub.name,
                        lead: editingClub.lead,
                        members: editingClub.members,
                        description: editingClub.desc || editingClub.description,
                        image: editingClub.image
                      });
                    } else {
                      await createClub({
                        name: editingClub.name,
                        lead: editingClub.lead,
                        members: editingClub.members,
                        description: editingClub.desc || editingClub.description,
                        image: editingClub.image || ''
                      });
                    }
                    setEditingClub(null);
                  }}
                  className="rounded-2xl border-2 border-[#C5A15B] bg-[#FAF8F5] p-6 shadow-lg space-y-4 text-sm"
                >
                  <div className="flex items-center justify-between border-b border-[#E3DCCB] pb-3">
                    <div>
                      <h4 className="font-sans font-bold text-lg text-[#101B2D]">Edit Student Club: {editingClub.name}</h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditingClub(null)}
                      className="text-xs text-slate-600 hover:text-[#101B2D] font-bold px-2 py-1 rounded"
                    >
                      Cancel ✕
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Club Name</label>
                      <input
                        type="text"
                        required
                        value={editingClub.name || ''}
                        onChange={(e) => setEditingClub({ ...editingClub, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-sm text-[#101B2D] focus:outline-none focus:border-[#C5A15B] focus:ring-1 focus:ring-[#C5A15B]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Student Coordinator</label>
                      <input
                        type="text"
                        required
                        value={editingClub.lead || ''}
                        onChange={(e) => setEditingClub({ ...editingClub, lead: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-sm text-[#101B2D] focus:outline-none focus:border-[#C5A15B] focus:ring-1 focus:ring-[#C5A15B]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Active Members</label>
                      <input
                        type="text"
                        required
                        value={editingClub.members || ''}
                        onChange={(e) => setEditingClub({ ...editingClub, members: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-sm text-[#101B2D] focus:outline-none focus:border-[#C5A15B] focus:ring-1 focus:ring-[#C5A15B]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Mission & Activities</label>
                    <input
                      type="text"
                      required
                      value={editingClub.desc || editingClub.description || ''}
                      onChange={(e) => setEditingClub({ ...editingClub, desc: e.target.value, description: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-sm text-[#101B2D] focus:outline-none focus:border-[#C5A15B] focus:ring-1 focus:ring-[#C5A15B]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Club Banner / Activity Photo (Upload or URL)</label>
                    <ImageUploadInput
                      value={editingClub.image || ''}
                      onChange={(val) => setEditingClub({ ...editingClub, image: val })}
                      placeholder="https://... or click Upload on the left"
                    />
                  </div>
                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setEditingClub(null)}
                      className="px-4 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-slate-700 text-xs sm:text-sm font-bold hover:bg-[#FAF8F5]"
                    >
                      Discard
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-[#101B2D] text-[#C5A15B] text-xs sm:text-sm font-bold hover:bg-[#1B293E] transition shadow-xs cursor-pointer"
                    >
                      Save Club Changes
                    </button>
                  </div>
                </form>
              )}

              {clubs.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[#E3DCCB] bg-[#FAF8F5] p-10 text-center">
                  <p className="font-semibold text-sm text-[#101B2D]">No student clubs or societies registered</p>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">Click "+ Register New Club" above to register student chapters and athletic teams.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {clubs.map(c => ({ _id: c._id, name: c.name, lead: c.lead, members: c.members, desc: c.description, image: c.image })).map((club, idx) => (
                    <div key={club._id || idx} className="rounded-2xl border border-[#E3DCCB] bg-white p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-3">
                      <div className="space-y-2.5">
                        {club.image && (
                          <div className="h-36 w-full rounded-xl overflow-hidden bg-slate-100 border border-[#EFECE3]">
                            <img src={club.image} alt={club.name} className="h-full w-full object-cover" />
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-[#A68238] bg-[#C5A15B]/15 px-2.5 py-0.5 rounded-md uppercase tracking-wider">Student Chapter</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setEditingClub({ ...club })}
                              className="px-2.5 py-1 rounded-lg border border-[#E3DCCB] bg-[#FAF8F5] text-xs font-bold text-[#101B2D] hover:border-[#C5A15B] transition cursor-pointer"
                            >
                              Edit
                            </button>
                            {club._id && (
                              <button
                                onClick={() => deleteClub(club._id)}
                                className="text-xs text-rose-600 font-bold hover:underline cursor-pointer"
                              >
                                Remove
                              </button>
                            )}
                          </div>
                        </div>
                        <h4 className="font-sans font-bold text-base text-[#101B2D] leading-snug">{club.name}</h4>
                        <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">{club.desc}</p>
                      </div>
                      <div className="pt-2.5 border-t border-[#EFECE3] text-xs text-slate-600 space-y-1">
                        <p><span className="font-semibold text-[#101B2D]">Coordinator:</span> {club.lead}</p>
                        <p><span className="font-semibold text-[#101B2D]">Registered:</span> {club.members}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Research View */}
          {activeTab === 'research' && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-[#E3DCCB] bg-white p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="font-sans text-xl sm:text-2xl font-bold text-[#101B2D] tracking-tight">Research Management Cell (RMC)</h3>
                  <p className="text-xs text-slate-500 mt-1">Faculty research papers, academic monographs, conference proceedings, and municipal grant papers</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowAddResearch(!showAddResearch)}
                    className="px-4 py-2.5 rounded-xl bg-[#101B2D] text-[#C5A15B] text-xs sm:text-sm font-bold hover:bg-[#1B293E] transition shadow-xs cursor-pointer"
                  >
                    {showAddResearch ? 'Close Form ✕' : '+ Add Research Paper'}
                  </button>
                </div>
              </div>

              {showAddResearch && (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (!newResearch.title || !newResearch.author) return;
                    await createResearch(newResearch);
                    setNewResearch({ title: '', author: '', year: '2082/2083', category: 'Peer Reviewed', abstract: '', pdfUrl: '' });
                    setShowAddResearch(false);
                  }}
                  className="rounded-2xl border border-[#C5A15B] bg-[#FAF8F5] p-6 shadow-md space-y-4 text-sm"
                >
                  <div className="flex items-center justify-between border-b border-[#E3DCCB] pb-3">
                    <div>
                      <h4 className="font-sans font-bold text-lg text-[#101B2D]">Publish Research Paper</h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowAddResearch(false)}
                      className="text-xs text-slate-600 hover:text-[#101B2D] font-bold px-2 py-1 rounded"
                    >
                      Cancel ✕
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Publication Title</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Traditional Water Conduits (Hiti) of Bhaktapur"
                        value={newResearch.title}
                        onChange={(e) => setNewResearch({ ...newResearch, title: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-sm text-[#101B2D] focus:outline-none focus:border-[#C5A15B] focus:ring-1 focus:ring-[#C5A15B]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Lead Author / Investigator</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Dr. Rajesh Shrestha"
                        value={newResearch.author}
                        onChange={(e) => setNewResearch({ ...newResearch, author: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-sm text-[#101B2D] focus:outline-none focus:border-[#C5A15B] focus:ring-1 focus:ring-[#C5A15B]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Issue / Year</label>
                      <input
                        type="text"
                        required
                        value={newResearch.year}
                        onChange={(e) => setNewResearch({ ...newResearch, year: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-sm text-[#101B2D] focus:outline-none focus:border-[#C5A15B] focus:ring-1 focus:ring-[#C5A15B]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Abstract / Research Focus</label>
                    <textarea
                      rows={2}
                      required
                      placeholder="Summarize the research methodology, findings, and civic significance..."
                      value={newResearch.abstract}
                      onChange={(e) => setNewResearch({ ...newResearch, abstract: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-sm text-[#101B2D] leading-relaxed focus:outline-none focus:border-[#C5A15B] focus:ring-1 focus:ring-[#C5A15B]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Paper Cover Image / PDF Attachment (Upload or URL)</label>
                    <ImageUploadInput
                      value={newResearch.pdfUrl}
                      onChange={(val) => setNewResearch({ ...newResearch, pdfUrl: val })}
                      accept="image/*,.pdf"
                      placeholder="https://... or click Upload on the left"
                    />
                  </div>
                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setShowAddResearch(false)}
                      className="px-4 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-slate-700 text-xs sm:text-sm font-bold hover:bg-[#FAF8F5]"
                    >
                      Discard
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-[#101B2D] text-[#C5A15B] text-xs sm:text-sm font-bold hover:bg-[#1B293E] transition shadow-xs cursor-pointer"
                    >
                      Publish to RMC Archive
                    </button>
                  </div>
                </form>
              )}

              {/* Inline Edit Research Paper Form */}
              {editingResearch && (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (editingResearch._id) {
                      await updateResearch(editingResearch._id, {
                        title: editingResearch.title,
                        author: editingResearch.author || editingResearch.year,
                        year: editingResearch.yearIssue || editingResearch.year,
                        category: editingResearch.status || editingResearch.category,
                        abstract: editingResearch.focus || editingResearch.abstract,
                        pdfUrl: editingResearch.pdfUrl || ''
                      });
                    } else {
                      await createResearch({
                        title: editingResearch.title,
                        author: editingResearch.author || editingResearch.year,
                        year: editingResearch.yearIssue || '2082/2083',
                        category: editingResearch.status || editingResearch.category || 'Peer Reviewed',
                        abstract: editingResearch.focus || editingResearch.abstract,
                        pdfUrl: editingResearch.pdfUrl || ''
                      });
                    }
                    setEditingResearch(null);
                  }}
                  className="rounded-2xl border-2 border-[#C5A15B] bg-[#FAF8F5] p-6 shadow-lg space-y-4 text-sm"
                >
                  <div className="flex items-center justify-between border-b border-[#E3DCCB] pb-3">
                    <div>
                      <h4 className="font-sans font-bold text-lg text-[#101B2D]">Edit Research Publication: {editingResearch.title}</h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditingResearch(null)}
                      className="text-xs text-slate-600 hover:text-[#101B2D] font-bold px-2 py-1 rounded"
                    >
                      Cancel ✕
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Publication Title</label>
                      <input
                        type="text"
                        required
                        value={editingResearch.title || ''}
                        onChange={(e) => setEditingResearch({ ...editingResearch, title: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-sm text-[#101B2D] focus:outline-none focus:border-[#C5A15B] focus:ring-1 focus:ring-[#C5A15B]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Lead Author / Issue Label</label>
                      <input
                        type="text"
                        required
                        value={editingResearch.year || ''}
                        onChange={(e) => setEditingResearch({ ...editingResearch, year: e.target.value, author: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-sm text-[#101B2D] focus:outline-none focus:border-[#C5A15B] focus:ring-1 focus:ring-[#C5A15B]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Status / Indexing Badge</label>
                      <input
                        type="text"
                        required
                        value={editingResearch.status || ''}
                        onChange={(e) => setEditingResearch({ ...editingResearch, status: e.target.value, category: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-sm text-[#101B2D] focus:outline-none focus:border-[#C5A15B] focus:ring-1 focus:ring-[#C5A15B]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Abstract / Research Focus</label>
                    <textarea
                      rows={2}
                      required
                      value={editingResearch.focus || ''}
                      onChange={(e) => setEditingResearch({ ...editingResearch, focus: e.target.value, abstract: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-sm text-[#101B2D] leading-relaxed focus:outline-none focus:border-[#C5A15B] focus:ring-1 focus:ring-[#C5A15B]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Paper Cover Image / PDF Attachment (Upload or URL)</label>
                    <ImageUploadInput
                      value={editingResearch.pdfUrl || ''}
                      onChange={(val) => setEditingResearch({ ...editingResearch, pdfUrl: val })}
                      accept="image/*,.pdf"
                      placeholder="https://... or click Upload on the left"
                    />
                  </div>
                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setEditingResearch(null)}
                      className="px-4 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-slate-700 text-xs sm:text-sm font-bold hover:bg-[#FAF8F5]"
                    >
                      Discard
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-[#101B2D] text-[#C5A15B] text-xs sm:text-sm font-bold hover:bg-[#1B293E] transition shadow-xs cursor-pointer"
                    >
                      Save Research Changes
                    </button>
                  </div>
                </form>
              )}

              {research.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[#E3DCCB] bg-[#FAF8F5] p-10 text-center">
                  <p className="font-semibold text-sm text-[#101B2D]">No research publications on record</p>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">Click "+ Add Research Paper" above to publish faculty papers or RMC monographs.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {research.map(r => ({ _id: r._id, title: r.title, author: r.author, yearIssue: r.year, year: `${r.author} (${r.year})`, status: r.category, focus: r.abstract, pdfUrl: r.pdfUrl })).map((rmc, idx) => (
                    <div key={rmc._id || idx} className="rounded-2xl border border-[#E3DCCB] bg-white p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-3">
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-[#A68238] bg-[#C5A15B]/15 px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                            {rmc.status}
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setEditingResearch({ ...rmc })}
                              className="px-2.5 py-1 rounded-lg border border-[#E3DCCB] bg-[#FAF8F5] text-xs font-bold text-[#101B2D] hover:border-[#C5A15B] transition cursor-pointer"
                            >
                              Edit
                            </button>
                            {rmc._id && (
                              <button
                                onClick={() => deleteResearch(rmc._id)}
                                className="text-xs text-rose-600 font-bold hover:underline cursor-pointer"
                              >
                                Remove
                              </button>
                            )}
                          </div>
                        </div>
                        <h4 className="font-sans font-bold text-base sm:text-lg text-[#101B2D] leading-snug">{rmc.title}</h4>
                        <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">{rmc.focus}</p>
                      </div>
                      <div className="pt-2 border-t border-[#EFECE3] flex items-center justify-between">
                        <p className="text-xs font-semibold text-[#A68238] font-mono">{rmc.year}</p>
                        {rmc.pdfUrl && (
                          <a
                            href={rmc.pdfUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs font-bold text-[#101B2D] hover:text-[#A68238] hover:underline"
                          >
                            View PDF ↗
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Media & Documents Library */}
          {activeTab === 'medialibrary' && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-[#E3DCCB] bg-white p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="font-sans text-xl sm:text-2xl font-bold text-[#101B2D] tracking-tight">Media & Document Assets</h3>
                  <p className="text-xs text-slate-500 mt-1">Campus photography, laboratory facilities, downloadable syllabi, and official forms</p>
                </div>
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => {
                      setShowAddMedia(!showAddMedia);
                      setEditingMedia(null);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-[#101B2D] text-[#C5A15B] text-xs sm:text-sm font-bold hover:bg-[#1B293E] transition shadow-xs cursor-pointer"
                  >
                    {showAddMedia ? 'Close Media Form ✕' : '+ Register Media Asset'}
                  </button>
                  <button
                    onClick={() => {
                      setShowAddDoc(!showAddDoc);
                      setEditingDoc(null);
                    }}
                    className="px-4 py-2.5 rounded-xl border border-[#101B2D] bg-white text-[#101B2D] text-xs sm:text-sm font-bold hover:bg-[#FAF8F5] transition shadow-xs cursor-pointer"
                  >
                    {showAddDoc ? 'Close Document Form ✕' : '+ Add Document'}
                  </button>
                </div>
              </div>

              {/* Inline Add Media Form */}
              {showAddMedia && (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (!newMedia.title || !newMedia.image) return;
                    await createFacility(newMedia);
                    setNewMedia({ number: '01', title: '', category: 'Academic', image: '', description: '' });
                    setShowAddMedia(false);
                  }}
                  className="rounded-2xl border border-[#C5A15B] bg-[#FAF8F5] p-6 shadow-md space-y-4 text-sm"
                >
                  <div className="flex items-center justify-between border-b border-[#E3DCCB] pb-3">
                    <div>
                      <h4 className="font-sans font-bold text-lg text-[#101B2D]">Add Institutional Image or Facility Asset</h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowAddMedia(false)}
                      className="text-xs text-slate-600 hover:text-[#101B2D] font-bold px-2 py-1 rounded"
                    >
                      Cancel ✕
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Asset Title</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Khwopa Central Library Wing"
                        value={newMedia.title}
                        onChange={(e) => setNewMedia({ ...newMedia, title: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-sm text-[#101B2D] focus:outline-none focus:border-[#C5A15B] focus:ring-1 focus:ring-[#C5A15B]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Category</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Library / Campus / Lab"
                        value={newMedia.category}
                        onChange={(e) => setNewMedia({ ...newMedia, category: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-sm text-[#101B2D] focus:outline-none focus:border-[#C5A15B] focus:ring-1 focus:ring-[#C5A15B]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Image Source (Upload or URL)</label>
                      <ImageUploadInput
                        value={newMedia.image}
                        onChange={(val) => setNewMedia({ ...newMedia, image: val })}
                        required
                        placeholder="https://... or click Upload on the left"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Caption / Description</label>
                    <input
                      type="text"
                      required
                      placeholder="Short description for alt text and gallery caption..."
                      value={newMedia.description}
                      onChange={(e) => setNewMedia({ ...newMedia, description: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-sm text-[#101B2D] focus:outline-none focus:border-[#C5A15B] focus:ring-1 focus:ring-[#C5A15B]"
                    />
                  </div>
                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setShowAddMedia(false)}
                      className="px-4 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-slate-700 text-xs sm:text-sm font-bold hover:bg-[#FAF8F5]"
                    >
                      Discard
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-[#101B2D] text-[#C5A15B] text-xs sm:text-sm font-bold hover:bg-[#1B293E] transition shadow-xs cursor-pointer"
                    >
                      Save to Media Repository
                    </button>
                  </div>
                </form>
              )}

              {/* Inline Add Document Form inside Media & Documents */}
              {showAddDoc && (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (!newDoc.title) return;
                    await createDocument(newDoc);
                    setNewDoc({ title: '', category: 'Syllabus', fileSize: '1.2 MB PDF', fileUrl: '/resources/downloads', academicYear: '2082/2083', description: '' });
                    setShowAddDoc(false);
                  }}
                  className="rounded-2xl border border-[#C5A15B] bg-[#FAF8F5] p-6 shadow-md space-y-4 text-sm"
                >
                  <div className="flex items-center justify-between border-b border-[#E3DCCB] pb-3">
                    <div>
                      <h4 className="font-sans font-bold text-lg text-[#101B2D]">Add Downloadable Document or Syllabus</h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowAddDoc(false)}
                      className="text-xs text-slate-600 hover:text-[#101B2D] font-bold px-2 py-1 rounded"
                    >
                      Cancel ✕
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Document Title</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. NEB Grade 11 Physics Lab Manual 2083"
                        value={newDoc.title}
                        onChange={(e) => setNewDoc({ ...newDoc, title: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-sm text-[#101B2D] focus:outline-none focus:border-[#C5A15B] focus:ring-1 focus:ring-[#C5A15B]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Category</label>
                      <input
                        type="text"
                        value={newDoc.category}
                        onChange={(e) => setNewDoc({ ...newDoc, category: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-sm text-[#101B2D] focus:outline-none focus:border-[#C5A15B] focus:ring-1 focus:ring-[#C5A15B]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">File Size / Format</label>
                      <input
                        type="text"
                        value={newDoc.fileSize}
                        onChange={(e) => setNewDoc({ ...newDoc, fileSize: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-sm text-[#101B2D] focus:outline-none focus:border-[#C5A15B] focus:ring-1 focus:ring-[#C5A15B]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">File / Download Link (Upload or URL)</label>
                      <ImageUploadInput
                        value={newDoc.fileUrl}
                        onChange={(val) => setNewDoc({ ...newDoc, fileUrl: val })}
                        accept="image/*,.pdf"
                        placeholder="https://... or click Upload on the left"
                      />
                    </div>
                  </div>
                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setShowAddDoc(false)}
                      className="px-4 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-slate-700 text-xs sm:text-sm font-bold hover:bg-[#FAF8F5]"
                    >
                      Discard
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-[#101B2D] text-[#C5A15B] text-xs sm:text-sm font-bold hover:bg-[#1B293E] transition shadow-xs cursor-pointer"
                    >
                      Save Document
                    </button>
                  </div>
                </form>
              )}

              {/* Edit Media Asset Modal / Card */}
              {editingMedia && (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (editingMedia._id) {
                      await updateFacility(editingMedia._id, {
                        number: editingMedia.number || '01',
                        title: editingMedia.title,
                        category: editingMedia.category,
                        image: editingMedia.image,
                        description: editingMedia.description
                      });
                    } else {
                      await createFacility({
                        number: '01',
                        title: editingMedia.title,
                        category: editingMedia.category || 'Campus',
                        image: editingMedia.image,
                        description: editingMedia.description
                      });
                    }
                    setEditingMedia(null);
                  }}
                  className="rounded-2xl border-2 border-[#C5A15B] bg-[#FAF8F5] p-6 shadow-lg space-y-4 text-sm"
                >
                  <div className="flex items-center justify-between border-b border-[#E3DCCB] pb-3.5">
                    <div>
                      <h4 className="font-sans font-bold text-lg text-[#101B2D]">Edit Media Asset: {editingMedia.title}</h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditingMedia(null)}
                      className="text-xs text-slate-600 hover:text-[#101B2D] font-bold px-2 py-1 rounded"
                    >
                      Cancel ✕
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Asset Title</label>
                      <input
                        type="text"
                        required
                        value={editingMedia.title}
                        onChange={(e) => setEditingMedia({ ...editingMedia, title: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-sm text-[#101B2D] focus:outline-none focus:border-[#C5A15B] focus:ring-1 focus:ring-[#C5A15B]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Category</label>
                      <input
                        type="text"
                        required
                        value={editingMedia.category || ''}
                        onChange={(e) => setEditingMedia({ ...editingMedia, category: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-sm text-[#101B2D] focus:outline-none focus:border-[#C5A15B] focus:ring-1 focus:ring-[#C5A15B]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Image Source (Upload or URL)</label>
                      <ImageUploadInput
                        value={editingMedia.image}
                        onChange={(val) => setEditingMedia({ ...editingMedia, image: val })}
                        required
                        placeholder="https://... or click Upload on the left"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Caption / Description</label>
                    <textarea
                      rows={2}
                      required
                      value={editingMedia.description}
                      onChange={(e) => setEditingMedia({ ...editingMedia, description: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-sm text-[#101B2D] leading-relaxed focus:outline-none focus:border-[#C5A15B] focus:ring-1 focus:ring-[#C5A15B]"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2.5 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingMedia(null)}
                      className="px-4 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-slate-700 text-xs sm:text-sm font-bold hover:bg-[#FAF8F5]"
                    >
                      Discard
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-[#101B2D] text-[#C5A15B] text-xs sm:text-sm font-bold hover:bg-[#1B293E] transition shadow-xs cursor-pointer"
                    >
                      Save Media Changes
                    </button>
                  </div>
                </form>
              )}

              {/* Media Image Cards Grid */}
              {facilities.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[#E3DCCB] bg-[#FAF8F5] p-8 text-center">
                  <p className="font-semibold text-sm text-[#101B2D]">No media assets registered</p>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">Click "+ Register Media Asset" above to curate institutional photography.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {facilities.map((item, idx) => (
                    <div key={item._id || idx} className="rounded-2xl border border-[#E3DCCB] bg-white overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
                      <div>
                        <div className="h-44 w-full bg-slate-900 overflow-hidden relative">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full object-cover"
                          />
                          <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider text-[#101B2D] bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md shadow-xs border border-[#E3DCCB]/60">
                            {item.category || 'Asset'}
                          </span>
                        </div>
                        <div className="p-4">
                          <h4 className="font-sans font-bold text-base text-[#101B2D] leading-snug">{item.title}</h4>
                          <p className="text-sm text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                      <div className="px-4 py-3 bg-[#FAF8F5] border-t border-[#EFECE3] flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setEditingMedia(item)}
                            className="px-3 py-1.5 rounded-lg bg-white border border-[#E3DCCB] font-bold text-[#101B2D] hover:border-[#C5A15B] transition cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(item.image);
                              showToast('Asset image URL copied to clipboard!');
                            }}
                            className="font-semibold text-slate-600 hover:text-[#A68238] cursor-pointer"
                          >
                            Copy URL
                          </button>
                        </div>
                        {item._id && (
                          <button
                            onClick={() => deleteFacility(item._id)}
                            className="text-rose-600 font-bold hover:underline cursor-pointer"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Editable Documents & Syllabi Section inside Media & Documents */}
              <div className="rounded-2xl border border-[#E3DCCB] bg-white p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-sans font-bold text-lg text-[#101B2D]">Downloadable Documents & Syllabi Archive</h4>
                    <p className="text-sm text-slate-600 mt-0.5">Click Edit on any document below to modify its title, category, size, or download link</p>
                  </div>
                  <span className="text-xs font-bold text-slate-600 bg-[#FAF8F5] border border-[#E3DCCB] px-3 py-1 rounded-full">
                    {documents.length} Documents
                  </span>
                </div>

                {editingDoc && (
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      if (editingDoc._id) {
                        await updateDocument(editingDoc._id, {
                          title: editingDoc.title,
                          category: editingDoc.category,
                          fileSize: editingDoc.fileSize,
                          fileUrl: editingDoc.fileUrl,
                          description: editingDoc.description
                        });
                      } else {
                        await createDocument({
                          title: editingDoc.title,
                          category: editingDoc.category,
                          fileSize: editingDoc.fileSize,
                          fileUrl: editingDoc.fileUrl || '/resources/downloads',
                          description: editingDoc.description || ''
                        });
                      }
                      setEditingDoc(null);
                    }}
                    className="rounded-xl border-2 border-[#C5A15B] bg-[#FAF8F5] p-5 space-y-4 text-sm"
                  >
                    <div className="flex items-center justify-between border-b border-[#E3DCCB] pb-3">
                      <div>
                        <h5 className="font-sans font-bold text-base text-[#101B2D]">Edit Document: {editingDoc.title}</h5>
                      </div>
                      <button
                        type="button"
                        onClick={() => setEditingDoc(null)}
                        className="text-xs text-slate-600 hover:text-[#101B2D] font-bold px-2 py-1 rounded"
                      >
                        Cancel ✕
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Document Title</label>
                        <input
                          type="text"
                          required
                          value={editingDoc.title}
                          onChange={(e) => setEditingDoc({ ...editingDoc, title: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-sm text-[#101B2D] focus:outline-none focus:border-[#C5A15B] focus:ring-1 focus:ring-[#C5A15B]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Category</label>
                        <input
                          type="text"
                          value={editingDoc.category}
                          onChange={(e) => setEditingDoc({ ...editingDoc, category: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-sm text-[#101B2D] focus:outline-none focus:border-[#C5A15B] focus:ring-1 focus:ring-[#C5A15B]"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">File Size / Format</label>
                        <input
                          type="text"
                          value={editingDoc.fileSize}
                          onChange={(e) => setEditingDoc({ ...editingDoc, fileSize: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-sm text-[#101B2D] focus:outline-none focus:border-[#C5A15B] focus:ring-1 focus:ring-[#C5A15B]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Document URL / File Link (Upload or URL)</label>
                        <ImageUploadInput
                          value={editingDoc.fileUrl || '/resources/downloads'}
                          onChange={(val) => setEditingDoc({ ...editingDoc, fileUrl: val })}
                          accept="image/*,.pdf"
                          placeholder="https://... or click Upload on the left"
                        />
                      </div>
                    </div>
                    <div className="pt-2 flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setEditingDoc(null)}
                        className="px-4 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-slate-700 text-xs sm:text-sm font-bold hover:bg-[#FAF8F5]"
                      >
                        Discard
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-xl bg-[#101B2D] text-[#C5A15B] text-xs sm:text-sm font-bold hover:bg-[#1B293E] transition shadow-xs cursor-pointer"
                      >
                        Save Document Changes
                      </button>
                    </div>
                  </form>
                )}

                <div className="divide-y divide-[#EFECE3] text-sm">
                  {documents.length === 0 ? (
                    <div className="py-6 text-center text-slate-500 text-xs">
                      <p className="font-semibold text-[#101B2D]">No documents uploaded to this archive</p>
                      <p className="text-slate-400 mt-0.5">Click "+ Add Document" above to upload syllabi or forms.</p>
                    </div>
                  ) : (
                    documents.map(d => ({
                      _id: d._id,
                      title: d.title,
                      fileSize: d.fileSize,
                      category: d.category,
                      fileUrl: d.fileUrl,
                      description: d.description
                    })).map((doc, idx) => (
                      <div key={doc._id || idx} className="py-3.5 flex flex-wrap items-center justify-between gap-4 hover:bg-[#FAF8F5]/60 px-2 rounded-xl transition">
                        <div>
                          <p className="font-bold text-[#101B2D]">{doc.title}</p>
                          <p className="text-slate-500 font-mono text-xs mt-0.5">{doc.fileSize} — <span className="font-sans font-semibold text-[#A68238]">{doc.category}</span></p>
                        </div>
                        <div className="flex items-center gap-3">
                          {doc.fileUrl && (
                            <a
                              href={doc.fileUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs font-bold text-slate-600 hover:text-[#101B2D] hover:underline"
                            >
                              Open Link ↗
                            </a>
                          )}
                          <button
                            onClick={() => setEditingDoc(doc)}
                            className="px-3 py-1.5 rounded-lg border border-[#E3DCCB] bg-[#FAF8F5] text-xs font-bold text-[#101B2D] hover:border-[#C5A15B] transition cursor-pointer"
                          >
                            Edit
                          </button>
                          {doc._id && (
                            <button
                              onClick={() => deleteDocument(doc._id)}
                              className="text-xs text-rose-600 font-bold hover:underline cursor-pointer"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Menu & Navigation Manager */}
          {activeTab === 'navmanager' && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-[#E3DCCB] bg-white p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="font-sans text-xl sm:text-2xl font-bold text-[#101B2D] tracking-tight">Public Menu & Navigation Architecture</h3>
                  <p className="text-xs text-slate-500 mt-1">Public site map routes, live preview shortcuts, and destination bindings</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: 'Home', to: '/', sub: 'Hero, Impact Metrics, Academic Streams, Facilities, Voices' },
                  { label: 'About Us', to: '/about', sub: 'History, Vision & Mission, Principal Message, Governance, Achievements' },
                  { label: 'Academics', to: '/academics', sub: '+2 Science, Management, Humanities, Law, Faculty Directory, Calendar' },
                  { label: 'Admissions', to: '/admissions', sub: 'Online Application Form, Eligibility, Scholarships, Fee Structure' },
                  { label: 'Examinations', to: '/examinations', sub: 'NEB Board Routines, Results Verification, Exam Code of Conduct' },
                  { label: 'Campus Life', to: '/campus-life', sub: 'Student Clubs, Sports, Labs & Facilities, Events, Photo Gallery' },
                  { label: 'Resources & Library', to: '/resources/library', sub: 'Central Library & OPAC, Academic Calendar, Online Services' },
                  { label: 'Research (RMC)', to: '/research', sub: 'Research Management Cell, Khwopa Journal (NepJOL), Grants' }
                ].map((nav) => (
                  <div key={nav.to} className="rounded-2xl border border-[#E3DCCB] bg-white p-5 shadow-xs hover:shadow-md transition-shadow flex items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <h4 className="font-sans font-bold text-base sm:text-lg text-[#101B2D]">{nav.label}</h4>
                        <span className="font-mono text-xs text-[#A68238] bg-[#FAF8F5] px-2.5 py-0.5 rounded border border-[#E3DCCB]">
                          {nav.to}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 mt-1 leading-relaxed">{nav.sub}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setActiveTab('pagebuilder')}
                        className="px-3.5 py-1.5 rounded-lg border border-[#E3DCCB] bg-[#FAF8F5] text-xs font-bold text-[#101B2D] hover:border-[#C5A15B] transition cursor-pointer"
                      >
                        Edit Page
                      </button>
                      <a
                        href={nav.to}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3.5 py-1.5 rounded-lg bg-[#101B2D] text-[#C5A15B] text-xs font-bold hover:bg-[#1B293E] transition shadow-xs"
                      >
                        Visit ↗
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Team Roles & RBAC */}
          {activeTab === 'permissions' && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-[#E3DCCB] bg-white p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="font-sans text-xl sm:text-2xl font-bold text-[#101B2D] tracking-tight">Team Accounts & Role-Based Access Control</h3>
                  <p className="text-xs text-slate-500 mt-1">Staff administrator provisioning, security privileges, and institutional role governance</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowAddUser(!showAddUser)}
                    className="px-4 py-2.5 rounded-xl bg-[#101B2D] text-[#C5A15B] text-xs sm:text-sm font-bold hover:bg-[#1B293E] transition shadow-xs cursor-pointer"
                  >
                    {showAddUser ? 'Close Form ✕' : '+ Add Team Member'}
                  </button>
                </div>
              </div>

              {showAddUser && (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (!newUser.name || !newUser.email || !newUser.password) return;
                    try {
                      await createUser(newUser);
                      setNewUser({ name: '', email: '', password: '', role: 'News Editor', department: 'Administration', avatar: '' });
                      setShowAddUser(false);
                    } catch (err) {
                      alert({
                        title: 'Administrator Provisioning Error',
                        message: err.response?.data?.message || err.message,
                        type: 'error'
                      });
                    }
                  }}
                  className="rounded-2xl border border-[#C5A15B] bg-[#FAF8F5] p-6 shadow-md space-y-4 text-sm"
                >
                  <div className="flex items-center justify-between border-b border-[#E3DCCB] pb-3">
                    <div>
                      <h4 className="font-sans font-bold text-lg text-[#101B2D]">Provision New Administrator Account</h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowAddUser(false)}
                      className="text-xs text-slate-600 hover:text-[#101B2D] font-bold px-2 py-1 rounded"
                    >
                      Cancel ✕
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Vice Principal"
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-sm text-[#101B2D] focus:outline-none focus:border-[#C5A15B] focus:ring-1 focus:ring-[#C5A15B]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Official Email</label>
                      <input
                        type="email"
                        required
                        placeholder="staff@khwopa.edu.np"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-sm text-[#101B2D] focus:outline-none focus:border-[#C5A15B] focus:ring-1 focus:ring-[#C5A15B]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Temporary Password</label>
                      <input
                        type="password"
                        required
                        placeholder="Min 6 characters"
                        value={newUser.password}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-sm text-[#101B2D] focus:outline-none focus:border-[#C5A15B] focus:ring-1 focus:ring-[#C5A15B]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Assigned Role</label>
                      <select
                        value={newUser.role}
                        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-sm text-[#101B2D] focus:outline-none focus:border-[#C5A15B] focus:ring-1 focus:ring-[#C5A15B]"
                      >
                        <option value="Super Admin">Super Admin</option>
                        <option value="Principal / Approver">Principal / Approver</option>
                        <option value="Academic Administrator">Academic Administrator</option>
                        <option value="Admission Officer">Admission Officer</option>
                        <option value="Examination Officer">Examination Officer</option>
                        <option value="Faculty Coordinator">Faculty Coordinator</option>
                        <option value="Research Editor">Research Editor</option>
                        <option value="News Editor">News Editor</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Profile Photo / Avatar (Upload or URL)</label>
                    <ImageUploadInput
                      value={newUser.avatar}
                      onChange={(val) => setNewUser({ ...newUser, avatar: val })}
                      placeholder="https://... or click Upload on the left"
                    />
                  </div>
                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setShowAddUser(false)}
                      className="px-4 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-slate-700 text-xs sm:text-sm font-bold hover:bg-[#FAF8F5]"
                    >
                      Discard
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-[#101B2D] text-[#C5A15B] text-xs sm:text-sm font-bold hover:bg-[#1B293E] transition shadow-xs cursor-pointer"
                    >
                      Create Administrator Account
                    </button>
                  </div>
                </form>
              )}

              {/* Registered Administrators Table */}
              {users.length > 0 && (
                <div className="rounded-2xl border border-[#E3DCCB] bg-white p-6 shadow-xs">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-sans font-bold text-lg text-[#101B2D]">Registered Administrative Accounts</h4>
                    <span className="text-xs text-slate-500 font-semibold">{users.length} active profiles</span>
                  </div>
                  <div className="divide-y divide-[#EFECE3] text-sm">
                    {users.map((u) => (
                      <div key={u._id} className="py-3.5 flex items-center justify-between gap-4 hover:bg-[#FAF8F5]/60 px-2 rounded-xl transition">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-[#101B2D] text-[#C5A15B] font-sans font-bold text-sm flex items-center justify-center border border-[#C5A15B]/30 shrink-0">
                            {u.avatar ? (
                              <img src={u.avatar} alt={u.name} className="h-full w-full rounded-full object-cover" />
                            ) : (
                              u.name?.charAt(0) || 'A'
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-[#101B2D]">{u.name}</p>
                            <p className="text-slate-500 font-mono text-xs">{u.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 rounded-md bg-[#FAF8F5] border border-[#E3DCCB] text-xs font-bold text-[#A68238]">
                            {u.role}
                          </span>
                          {u.email !== user?.email && (
                            <button
                              onClick={() => deleteUser(u._id)}
                              className="text-xs text-rose-600 font-bold hover:underline cursor-pointer"
                            >
                              Revoke
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Role Policy Reference Matrix */}
              <div className="space-y-3">
                <h4 className="font-sans font-bold text-lg text-[#101B2D]">Institutional Role Policy Matrix</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { role: 'Super Admin', desc: 'Complete system control, institutional settings, Atlas sync, and account grants' },
                    { role: 'Principal / Approver', desc: 'Review, approve, and authorize circulars and official disclosures' },
                    { role: 'Academic Administrator', desc: 'Higher secondary programmes, curriculum overviews, and syllabi' },
                    { role: 'Admission Officer', desc: 'Class 11 intakes, eligibility thresholds, quota verification, and applicant reviews' },
                    { role: 'Examination Officer', desc: 'NEB Center 104 terminal schedules, board routines, and seat plans' },
                    { role: 'Faculty Coordinator', desc: 'Departmental staff, educator credentials, and academic bios' },
                    { role: 'Research Editor', desc: 'RMC research archive, journal papers, and research grant summaries' },
                    { role: 'News Editor', desc: 'Campus events, student achievements, and circular articles' },
                  ].map((r) => (
                    <div key={r.role} className="rounded-2xl border border-[#E3DCCB] bg-white p-5 shadow-xs hover:shadow-md transition-shadow space-y-2">
                      <span className="text-[10px] font-bold text-[#A68238] bg-[#C5A15B]/15 px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                        Policy Active
                      </span>
                      <h5 className="font-sans font-bold text-base text-[#101B2D] mt-2 leading-snug">{r.role}</h5>
                      <p className="text-sm text-slate-600 leading-relaxed">{r.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <AdminDataProvider>
      <AdminDashboardContent />
    </AdminDataProvider>
  );
}
