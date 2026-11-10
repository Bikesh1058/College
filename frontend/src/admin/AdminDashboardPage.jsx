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

  // Editable Sidebar Badges State (persisted in settings)
  const [editingBadges, setEditingBadges] = useState(false);
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
                  <h4 className="font-serif font-bold text-lg text-[#101B2D] mt-0.5">
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
                      { label: 'Downloads & Syllabi', tab: 'resources' }
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
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#101B2D] tracking-tight">+2 Academic Streams</h3>
                  <p className="text-sm text-slate-600 mt-1">Grades 11 and 12 curricula under National Examinations Board (NEB)</p>
                </div>
                <div className="flex items-center gap-3">
                  {editingBadges === 'academics' ? (
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        const val = e.target.badgeVal.value.trim();
                        await updateSettings({ ...settings, moduleBadges: { ...(settings?.moduleBadges || {}), academics: val } });
                        setEditingBadges(false);
                      }}
                      className="flex items-center gap-1.5"
                    >
                      <input
                        name="badgeVal"
                        defaultValue={settings?.moduleBadges?.academics || `${programmes.length || 3}`}
                        className="w-24 px-2.5 py-1.5 rounded-lg border border-[#C5A15B] text-xs font-bold text-[#101B2D]"
                      />
                      <button type="submit" className="px-2.5 py-1.5 rounded-lg bg-[#101B2D] text-[#C5A15B] text-xs font-bold">Save</button>
                      <button type="button" onClick={() => setEditingBadges(false)} className="text-xs text-slate-500 font-bold px-1">✕</button>
                    </form>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setEditingBadges('academics')}
                      title="Click to edit badge label"
                      className="text-xs font-bold text-[#A68238] bg-[#C5A15B]/15 px-3.5 py-1.5 rounded-full hover:bg-[#C5A15B]/25 transition"
                    >
                      {settings?.moduleBadges?.academics || `${programmes.length || 3} Active Streams`} ✎
                    </button>
                  )}
                  <button
                    onClick={() => setShowAddStream(!showAddStream)}
                    className="px-4 py-2.5 rounded-xl bg-[#101B2D] text-[#C5A15B] text-xs sm:text-sm font-bold hover:bg-[#1B293E] transition"
                  >
                    {showAddStream ? 'Close Form' : '+ Add Academic Stream'}
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
                  className="rounded-2xl border border-[#C5A15B] bg-white p-6 shadow-md space-y-4 text-sm"
                >
                  <h4 className="font-serif font-bold text-lg text-[#101B2D]">Create New +2 Stream / Programme</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Stream Title</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. +2 Science (Computer Group)"
                        value={newStream.title}
                        onChange={(e) => setNewStream({ ...newStream, title: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
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
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Faculty Category</label>
                      <select
                        value={newStream.facultyStream}
                        onChange={(e) => setNewStream({ ...newStream, facultyStream: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
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
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D] leading-relaxed"
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
                  <button type="submit" className="px-5 py-2.5 rounded-xl bg-[#101B2D] text-[#C5A15B] text-xs sm:text-sm font-bold">
                    Save Academic Stream
                  </button>
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
                  className="rounded-2xl border-2 border-[#C5A15B] bg-white p-6 shadow-lg space-y-4 text-sm"
                >
                  <div className="flex items-center justify-between border-b border-[#EFECE3] pb-3">
                    <span className="text-xs font-bold text-[#101B2D] uppercase tracking-wider">Edit Academic Stream: {editingStream.title}</span>
                    <button type="button" onClick={() => setEditingStream(null)} className="text-xs text-slate-600 font-bold">Cancel ✕</button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Stream Title</label>
                      <input
                        type="text"
                        required
                        value={editingStream.title || ''}
                        onChange={(e) => setEditingStream({ ...editingStream, title: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Stream Code</label>
                      <input
                        type="text"
                        required
                        value={editingStream.code || ''}
                        onChange={(e) => setEditingStream({ ...editingStream, code: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Faculty Category</label>
                      <select
                        value={editingStream.facultyStream || 'Science'}
                        onChange={(e) => setEditingStream({ ...editingStream, facultyStream: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
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
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D] leading-relaxed"
                    />
                  </div>
                  <button type="submit" className="px-5 py-2.5 rounded-xl bg-[#101B2D] text-[#C5A15B] text-xs sm:text-sm font-bold">
                    Save Stream Changes
                  </button>
                </form>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {(programmes.length > 0 ? programmes : [
                  { _id: 'sci', title: '+2 Science', code: 'SCI-NEB', facultyStream: 'Science', overview: 'Comprehensive secondary science curriculum with Physics, Chemistry, Biology and Math.' },
                  { _id: 'mgt', title: '+2 Management', code: 'MGT-NEB', facultyStream: 'Management', overview: 'Business studies, Accountancy, Economics, Hotel Management and Computer Science.' },
                  { _id: 'hum', title: '+2 Humanities & Law', code: 'HUM-NEB', facultyStream: 'Humanities & Law', overview: 'Sociology, Mass Communication, Jurisprudence, and General Literature.' }
                ]).map((prog) => (
                  <div key={prog._id} className="rounded-2xl border border-[#E3DCCB] bg-white p-6 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#A68238] bg-[#C5A15B]/15 px-2.5 py-0.5 rounded-md">
                          {prog.facultyStream}
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-500">{prog.code}</span>
                      </div>
                      <h4 className="mt-3 font-serif font-bold text-lg text-[#101B2D] leading-snug">{prog.title}</h4>
                      <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-3">{prog.overview}</p>
                    </div>

                    <div className="mt-5 pt-3.5 border-t border-[#EFECE3] flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <button
                          onClick={() => setEditingStream({ ...prog })}
                          className="px-3 py-1.5 rounded-lg border border-[#E3DCCB] bg-[#FAF8F5] font-bold text-[#101B2D] hover:border-[#C5A15B]"
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
                          className="text-rose-600 hover:underline font-semibold"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Admissions View */}
          {activeTab === 'admissions' && (
            <AdmissionsView />
          )}

          {/* Examinations View */}
          {activeTab === 'examinations' && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-[#E3DCCB] bg-white p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#101B2D] tracking-tight">Examinations & NEB Board Hub</h3>
                  <p className="text-sm text-slate-600 mt-1">Class 11 & 12 board routines, room seat plans, and examination circulars (Center 104)</p>
                </div>
                <div className="flex items-center gap-3">
                  {editingBadges === 'examinations' ? (
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        const val = e.target.badgeVal.value.trim();
                        await updateSettings({ ...settings, moduleBadges: { ...(settings?.moduleBadges || {}), examinations: val } });
                        setEditingBadges(false);
                      }}
                      className="flex items-center gap-1.5"
                    >
                      <input
                        name="badgeVal"
                        defaultValue={settings?.moduleBadges?.examinations || 'Code 104'}
                        className="w-28 px-2.5 py-1.5 rounded-lg border border-[#C5A15B] text-xs font-bold text-[#101B2D]"
                      />
                      <button type="submit" className="px-2.5 py-1.5 rounded-lg bg-[#101B2D] text-[#C5A15B] text-xs font-bold">Save</button>
                      <button type="button" onClick={() => setEditingBadges(false)} className="text-xs text-slate-500 font-bold px-1">✕</button>
                    </form>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setEditingBadges('examinations')}
                      title="Click to edit badge label"
                      className="text-xs font-bold text-[#A68238] bg-[#C5A15B]/15 px-3.5 py-1.5 rounded-full hover:bg-[#C5A15B]/25 transition"
                    >
                      {settings?.moduleBadges?.examinations || 'Exam Center Code: 104'} ✎
                    </button>
                  )}
                  <button
                    onClick={() => setShowAddExam(!showAddExam)}
                    className="px-4 py-2.5 rounded-xl bg-[#101B2D] text-[#C5A15B] text-xs sm:text-sm font-bold hover:bg-[#1B293E] transition"
                  >
                    {showAddExam ? 'Close Form' : '+ Schedule Exam Routine'}
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
                  className="rounded-2xl border border-[#C5A15B] bg-white p-6 shadow-md space-y-4 text-sm"
                >
                  <h4 className="font-serif font-bold text-lg text-[#101B2D]">Publish New Examination Schedule</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Exam Title</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Grade 12 Second Terminal Exam"
                        value={newExam.title}
                        onChange={(e) => setNewExam({ ...newExam, title: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
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
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Current Status</label>
                      <select
                        value={newExam.status}
                        onChange={(e) => setNewExam({ ...newExam, status: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
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
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
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
                  <button type="submit" className="px-5 py-2.5 rounded-xl bg-[#101B2D] text-[#C5A15B] text-xs sm:text-sm font-bold">
                    Publish Exam Schedule
                  </button>
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
                  className="rounded-2xl border-2 border-[#C5A15B] bg-white p-6 shadow-lg space-y-4 text-sm"
                >
                  <div className="flex items-center justify-between border-b border-[#EFECE3] pb-3">
                    <span className="text-xs font-bold text-[#101B2D] uppercase tracking-wider">Edit Examination Schedule: {editingExam.title}</span>
                    <button type="button" onClick={() => setEditingExam(null)} className="text-xs text-slate-600 font-bold">Cancel ✕</button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Exam Title</label>
                      <input
                        type="text"
                        required
                        value={editingExam.title || ''}
                        onChange={(e) => setEditingExam({ ...editingExam, title: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Start Date (BS)</label>
                      <input
                        type="text"
                        required
                        value={editingExam.date || editingExam.examDate || ''}
                        onChange={(e) => setEditingExam({ ...editingExam, date: e.target.value, examDate: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Current Status</label>
                      <input
                        type="text"
                        value={editingExam.status || ''}
                        onChange={(e) => setEditingExam({ ...editingExam, status: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Exam Venue / Hall</label>
                      <input
                        type="text"
                        value={editingExam.center || ''}
                        onChange={(e) => setEditingExam({ ...editingExam, center: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
                      />
                    </div>
                  </div>
                  <button type="submit" className="px-5 py-2.5 rounded-xl bg-[#101B2D] text-[#C5A15B] text-xs sm:text-sm font-bold">
                    Save Examination Changes
                  </button>
                </form>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {examinations.map((e) => ({ _id: e._id, title: e.title, date: e.examDate, status: e.status, center: e.center, routineImage: e.routineImage })).map((ex, idx) => (
                  <div key={ex._id || idx} className="rounded-2xl border border-[#E3DCCB] bg-white p-5 shadow-xs flex flex-col justify-between space-y-3">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-[#A68238] bg-[#C5A15B]/15 px-2.5 py-0.5 rounded-md uppercase">
                          {ex.status}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingExam({ ...ex })}
                            className="px-2.5 py-1 rounded-lg border border-[#E3DCCB] bg-[#FAF8F5] text-xs font-bold text-[#101B2D] hover:border-[#C5A15B]"
                          >
                            Edit
                          </button>
                          {ex._id && (
                            <button
                              onClick={() => deleteExamination(ex._id)}
                              className="text-xs text-rose-600 font-bold hover:underline"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      </div>
                      <h4 className="font-serif font-bold text-base sm:text-lg text-[#101B2D] leading-snug">{ex.title}</h4>
                      <p className="text-sm text-slate-600"><span className="font-semibold text-[#101B2D]">Schedule:</span> {ex.date}</p>
                      <p className="text-sm text-slate-600"><span className="font-semibold text-[#101B2D]">Venue:</span> {ex.center}</p>
                    </div>
                  </div>
                ))}
              </div>
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
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#101B2D] tracking-tight">Campus Life, Clubs & Sports</h3>
                  <p className="text-sm text-slate-600 mt-1">Student societies, annual sports tournaments, and photo galleries</p>
                </div>
                <div className="flex items-center gap-3">
                  {editingBadges === 'campuslife' ? (
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        const val = e.target.badgeVal.value.trim();
                        await updateSettings({ ...settings, moduleBadges: { ...(settings?.moduleBadges || {}), campuslife: val } });
                        setEditingBadges(false);
                      }}
                      className="flex items-center gap-1.5"
                    >
                      <input
                        name="badgeVal"
                        defaultValue={settings?.moduleBadges?.campuslife || `${clubs.length || 8}`}
                        className="w-24 px-2.5 py-1.5 rounded-lg border border-[#C5A15B] text-xs font-bold text-[#101B2D]"
                      />
                      <button type="submit" className="px-2.5 py-1.5 rounded-lg bg-[#101B2D] text-[#C5A15B] text-xs font-bold">Save</button>
                      <button type="button" onClick={() => setEditingBadges(false)} className="text-xs text-slate-500 font-bold px-1">✕</button>
                    </form>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setEditingBadges('campuslife')}
                      title="Click to edit badge label"
                      className="text-xs font-bold text-[#A68238] bg-[#C5A15B]/15 px-3.5 py-1.5 rounded-full hover:bg-[#C5A15B]/25 transition"
                    >
                      {settings?.moduleBadges?.campuslife || `${clubs.length || 8} Active Chapters`} ✎
                    </button>
                  )}
                  <button
                    onClick={() => setShowAddClub(!showAddClub)}
                    className="px-4 py-2.5 rounded-xl bg-[#101B2D] text-[#C5A15B] text-xs sm:text-sm font-bold hover:bg-[#1B293E] transition"
                  >
                    {showAddClub ? 'Close Form' : '+ Register New Club'}
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
                  className="rounded-2xl border border-[#C5A15B] bg-white p-6 shadow-md space-y-4 text-sm"
                >
                  <h4 className="font-serif font-bold text-lg text-[#101B2D]">Register Student Club or Society</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Club Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Khwopa Astronomy & Space Club"
                        value={newClub.name}
                        onChange={(e) => setNewClub({ ...newClub, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
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
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
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
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
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
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
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
                  <button type="submit" className="px-5 py-2.5 rounded-xl bg-[#101B2D] text-[#C5A15B] text-xs sm:text-sm font-bold">
                    Save Student Club
                  </button>
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
                  className="rounded-2xl border-2 border-[#C5A15B] bg-white p-6 shadow-lg space-y-4 text-sm"
                >
                  <div className="flex items-center justify-between border-b border-[#EFECE3] pb-3">
                    <span className="text-xs font-bold text-[#101B2D] uppercase tracking-wider">Edit Student Club: {editingClub.name}</span>
                    <button type="button" onClick={() => setEditingClub(null)} className="text-xs text-slate-600 font-bold">Cancel ✕</button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Club Name</label>
                      <input
                        type="text"
                        required
                        value={editingClub.name || ''}
                        onChange={(e) => setEditingClub({ ...editingClub, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Student Coordinator</label>
                      <input
                        type="text"
                        required
                        value={editingClub.lead || ''}
                        onChange={(e) => setEditingClub({ ...editingClub, lead: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Active Members</label>
                      <input
                        type="text"
                        required
                        value={editingClub.members || ''}
                        onChange={(e) => setEditingClub({ ...editingClub, members: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
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
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
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
                  <button type="submit" className="px-5 py-2.5 rounded-xl bg-[#101B2D] text-[#C5A15B] text-xs sm:text-sm font-bold">
                    Save Club Changes
                  </button>
                </form>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {clubs.map(c => ({ _id: c._id, name: c.name, lead: c.lead, members: c.members, desc: c.description, image: c.image })).map((club, idx) => (
                  <div key={club._id || idx} className="rounded-2xl border border-[#E3DCCB] bg-white p-5 shadow-xs flex flex-col justify-between space-y-3">
                    <div className="space-y-2.5">
                      {club.image && (
                        <div className="h-36 w-full rounded-xl overflow-hidden bg-slate-100 border border-[#EFECE3]">
                          <img src={club.image} alt={club.name} className="h-full w-full object-cover" />
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-[#A68238] bg-[#C5A15B]/15 px-2.5 py-0.5 rounded-md uppercase">Student Chapter</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingClub({ ...club })}
                            className="px-2.5 py-1 rounded-lg border border-[#E3DCCB] bg-[#FAF8F5] text-xs font-bold text-[#101B2D] hover:border-[#C5A15B]"
                          >
                            Edit
                          </button>
                          {club._id && (
                            <button
                              onClick={() => deleteClub(club._id)}
                              className="text-xs text-rose-600 font-bold hover:underline"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      </div>
                      <h4 className="font-serif font-bold text-base text-[#101B2D] leading-snug">{club.name}</h4>
                      <p className="text-sm text-slate-600 leading-relaxed">{club.desc}</p>
                    </div>
                    <div className="pt-2.5 border-t border-[#EFECE3] text-xs text-slate-600 space-y-1">
                      <p><span className="font-semibold text-[#101B2D]">Coordinator:</span> {club.lead}</p>
                      <p><span className="font-semibold text-[#101B2D]">Registered:</span> {club.members}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Research View */}
          {activeTab === 'research' && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-[#E3DCCB] bg-white p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#101B2D] tracking-tight">Research Management Cell (RMC)</h3>
                  <p className="text-sm text-slate-600 mt-1">Peer-reviewed publications, faculty grant allocations, and Khwopa Journal indexed on NepJOL</p>
                </div>
                <div className="flex items-center gap-3">
                  {editingBadges === 'research' ? (
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        const val = e.target.badgeVal.value.trim();
                        await updateSettings({ ...settings, moduleBadges: { ...(settings?.moduleBadges || {}), research: val } });
                        setEditingBadges(false);
                      }}
                      className="flex items-center gap-1.5"
                    >
                      <input
                        name="badgeVal"
                        defaultValue={settings?.moduleBadges?.research || 'NepJOL'}
                        className="w-24 px-2.5 py-1.5 rounded-lg border border-[#C5A15B] text-xs font-bold text-[#101B2D]"
                      />
                      <button type="submit" className="px-2.5 py-1.5 rounded-lg bg-[#101B2D] text-[#C5A15B] text-xs font-bold">Save</button>
                      <button type="button" onClick={() => setEditingBadges(false)} className="text-xs text-slate-500 font-bold px-1">✕</button>
                    </form>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setEditingBadges('research')}
                      title="Click to edit badge label"
                      className="text-xs font-bold text-[#A68238] bg-[#C5A15B]/15 px-3.5 py-1.5 rounded-full hover:bg-[#C5A15B]/25 transition"
                    >
                      {settings?.moduleBadges?.research || 'Indexed on NepJOL'} ✎
                    </button>
                  )}
                  <button
                    onClick={() => setShowAddResearch(!showAddResearch)}
                    className="px-4 py-2.5 rounded-xl bg-[#101B2D] text-[#C5A15B] text-xs sm:text-sm font-bold hover:bg-[#1B293E] transition"
                  >
                    {showAddResearch ? 'Close Form' : '+ Add Research Paper'}
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
                  className="rounded-2xl border border-[#C5A15B] bg-white p-6 shadow-md space-y-4 text-sm"
                >
                  <h4 className="font-serif font-bold text-lg text-[#101B2D]">Publish Research Paper / RMC Grant</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Publication Title</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Traditional Water Conduits (Hiti) of Bhaktapur"
                        value={newResearch.title}
                        onChange={(e) => setNewResearch({ ...newResearch, title: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
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
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Issue / Year</label>
                      <input
                        type="text"
                        required
                        value={newResearch.year}
                        onChange={(e) => setNewResearch({ ...newResearch, year: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Abstract / Research Focus</label>
                    <textarea
                      rows={2}
                      required
                      placeholder="Summarize the research methodology and findings..."
                      value={newResearch.abstract}
                      onChange={(e) => setNewResearch({ ...newResearch, abstract: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D] leading-relaxed"
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
                  <button type="submit" className="px-5 py-2.5 rounded-xl bg-[#101B2D] text-[#C5A15B] text-xs sm:text-sm font-bold">
                    Publish to RMC Archive
                  </button>
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
                  className="rounded-2xl border-2 border-[#C5A15B] bg-white p-6 shadow-lg space-y-4 text-sm"
                >
                  <div className="flex items-center justify-between border-b border-[#EFECE3] pb-3">
                    <span className="text-xs font-bold text-[#101B2D] uppercase tracking-wider">Edit Research / RMC Publication: {editingResearch.title}</span>
                    <button type="button" onClick={() => setEditingResearch(null)} className="text-xs text-slate-600 font-bold">Cancel ✕</button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Publication Title</label>
                      <input
                        type="text"
                        required
                        value={editingResearch.title || ''}
                        onChange={(e) => setEditingResearch({ ...editingResearch, title: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Lead Author / Issue Label</label>
                      <input
                        type="text"
                        required
                        value={editingResearch.year || ''}
                        onChange={(e) => setEditingResearch({ ...editingResearch, year: e.target.value, author: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Status / Indexing Badge</label>
                      <input
                        type="text"
                        required
                        value={editingResearch.status || ''}
                        onChange={(e) => setEditingResearch({ ...editingResearch, status: e.target.value, category: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
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
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D] leading-relaxed"
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
                  <button type="submit" className="px-5 py-2.5 rounded-xl bg-[#101B2D] text-[#C5A15B] text-xs sm:text-sm font-bold">
                    Save Research Changes
                  </button>
                </form>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {research.map(r => ({ _id: r._id, title: r.title, author: r.author, yearIssue: r.year, year: `${r.author} (${r.year})`, status: r.category, focus: r.abstract, pdfUrl: r.pdfUrl })).map((rmc, idx) => (
                  <div key={rmc._id || idx} className="rounded-2xl border border-[#E3DCCB] bg-white p-5 shadow-xs space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-[#A68238] bg-[#C5A15B]/15 px-2.5 py-0.5 rounded-md uppercase">{rmc.status}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingResearch({ ...rmc })}
                          className="px-2.5 py-1 rounded-lg border border-[#E3DCCB] bg-[#FAF8F5] text-xs font-bold text-[#101B2D] hover:border-[#C5A15B]"
                        >
                          Edit
                        </button>
                        {rmc._id && (
                          <button
                            onClick={() => deleteResearch(rmc._id)}
                            className="text-xs text-rose-600 font-bold hover:underline"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                    <h4 className="font-serif font-bold text-base sm:text-lg text-[#101B2D] leading-snug">{rmc.title}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{rmc.focus}</p>
                    <p className="text-xs font-semibold text-[#A68238] pt-1">{rmc.year}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Resources View */}
          {activeTab === 'resources' && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-[#E3DCCB] bg-white p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#101B2D] tracking-tight">Resources, Library & Student Downloads</h3>
                  <p className="text-sm text-slate-600 mt-1">Official syllabi, leave request forms, scholarship guidelines, and digital library catalogue</p>
                </div>
                <div className="flex items-center gap-3">
                  {editingBadges === 'resources' ? (
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        const val = e.target.badgeVal.value.trim();
                        await updateSettings({ ...settings, moduleBadges: { ...(settings?.moduleBadges || {}), resources: val } });
                        setEditingBadges(false);
                      }}
                      className="flex items-center gap-1.5"
                    >
                      <input
                        name="badgeVal"
                        defaultValue={settings?.moduleBadges?.resources || `${documents.length + 4}`}
                        className="w-28 px-2.5 py-1.5 rounded-lg border border-[#C5A15B] text-xs font-bold text-[#101B2D]"
                      />
                      <button type="submit" className="px-2.5 py-1.5 rounded-lg bg-[#101B2D] text-[#C5A15B] text-xs font-bold">Save</button>
                      <button type="button" onClick={() => setEditingBadges(false)} className="text-xs text-slate-500 font-bold px-1">✕</button>
                    </form>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setEditingBadges('resources')}
                      title="Click to edit badge label"
                      className="text-xs font-bold text-[#A68238] bg-[#C5A15B]/15 px-3.5 py-1.5 rounded-full hover:bg-[#C5A15B]/25 transition"
                    >
                      {settings?.moduleBadges?.resources || 'OPAC Digital Server Online'} ✎
                    </button>
                  )}
                  <button
                    onClick={() => setShowAddDoc(!showAddDoc)}
                    className="px-4 py-2.5 rounded-xl bg-[#101B2D] text-[#C5A15B] text-xs sm:text-sm font-bold hover:bg-[#1B293E] transition"
                  >
                    {showAddDoc ? 'Close Form' : '+ Upload Syllabus / Form'}
                  </button>
                </div>
              </div>

              {showAddDoc && (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (!newDoc.title) return;
                    await createDocument(newDoc);
                    setNewDoc({ title: '', category: 'Syllabus', fileSize: '1.2 MB PDF', fileUrl: '/resources/downloads', academicYear: '2082/2083', description: '' });
                    setShowAddDoc(false);
                  }}
                  className="rounded-2xl border border-[#C5A15B] bg-white p-6 shadow-md space-y-4 text-sm"
                >
                  <h4 className="font-serif font-bold text-lg text-[#101B2D]">Add Downloadable Syllabus or Student Form</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Document Title</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. NEB Grade 11 Physics Lab Manual 2083"
                        value={newDoc.title}
                        onChange={(e) => setNewDoc({ ...newDoc, title: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Category</label>
                      <select
                        value={newDoc.category}
                        onChange={(e) => setNewDoc({ ...newDoc, category: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
                      >
                        <option value="Syllabus">Syllabus</option>
                        <option value="Forms">Student Form</option>
                        <option value="Model Papers">Model Question Papers</option>
                        <option value="Academic">Academic Regulation</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">File Size / Format Label</label>
                      <input
                        type="text"
                        value={newDoc.fileSize}
                        onChange={(e) => setNewDoc({ ...newDoc, fileSize: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Document URL / File Link (Upload or URL)</label>
                      <ImageUploadInput
                        value={newDoc.fileUrl}
                        onChange={(val) => setNewDoc({ ...newDoc, fileUrl: val })}
                        accept="image/*,.pdf"
                        placeholder="https://... or click Upload on the left"
                      />
                    </div>
                  </div>
                  <button type="submit" className="px-5 py-2.5 rounded-xl bg-[#101B2D] text-[#C5A15B] text-xs sm:text-sm font-bold">
                    Publish Document
                  </button>
                </form>
              )}

              <div className="rounded-2xl border border-[#E3DCCB] bg-white p-6 shadow-xs space-y-4">
                <h4 className="font-serif font-bold text-lg text-[#101B2D]">Official Downloadable Documents Directory</h4>

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
                    className="rounded-xl border border-[#C5A15B] bg-[#FAF8F5] p-5 space-y-4 text-sm"
                  >
                    <div className="flex items-center justify-between border-b border-[#E3DCCB] pb-3">
                      <span className="text-xs font-bold text-[#101B2D] uppercase tracking-wider">Edit Document Contents</span>
                      <button
                        type="button"
                        onClick={() => setEditingDoc(null)}
                        className="text-xs text-slate-600 hover:text-[#101B2D] font-bold"
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
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-sm text-[#101B2D]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Category</label>
                        <input
                          type="text"
                          value={editingDoc.category}
                          onChange={(e) => setEditingDoc({ ...editingDoc, category: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-sm text-[#101B2D]"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">File Size / Format Label</label>
                        <input
                          type="text"
                          value={editingDoc.fileSize}
                          onChange={(e) => setEditingDoc({ ...editingDoc, fileSize: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-sm text-[#101B2D]"
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
                    <button type="submit" className="px-5 py-2.5 rounded-xl bg-[#101B2D] text-[#C5A15B] text-xs sm:text-sm font-bold">
                      Save Document Changes
                    </button>
                  </form>
                )}

                <div className="divide-y divide-[#EFECE3] text-sm">
                  {documents.map(d => ({
                    _id: d._id,
                    title: d.title,
                    fileSize: d.fileSize,
                    category: d.category,
                    fileUrl: d.fileUrl,
                    description: d.description
                  })).map((doc, idx) => (
                    <div key={doc._id || idx} className="py-3.5 flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <p className="font-bold text-[#101B2D]">{doc.title}</p>
                        <p className="text-slate-500 text-xs mt-0.5">{doc.fileSize} — {doc.category}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setEditingDoc(doc)}
                          className="px-3 py-1.5 rounded-lg border border-[#E3DCCB] bg-[#FAF8F5] text-xs font-bold text-[#101B2D] hover:border-[#C5A15B]"
                        >
                          Edit
                        </button>
                        <a
                          href={doc.fileUrl || "/resources/downloads"}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs font-bold text-[#A68238] bg-[#C5A15B]/15 px-3 py-1.5 rounded-lg hover:underline"
                        >
                          View ↗
                        </a>
                        {doc._id && (
                          <button
                            onClick={() => deleteDocument(doc._id)}
                            className="text-xs text-rose-600 font-bold hover:underline"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Media & Documents Library */}
          {activeTab === 'medialibrary' && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-[#E3DCCB] bg-white p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#101B2D] tracking-tight">Media & Document Assets</h3>
                  <p className="text-sm text-slate-600 mt-1">Edit, add, and manage campus photography, library images, and downloadable documents</p>
                </div>
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => {
                      setShowAddMedia(!showAddMedia);
                      setEditingMedia(null);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-[#101B2D] text-[#C5A15B] text-xs sm:text-sm font-bold hover:bg-[#1B293E] transition"
                  >
                    {showAddMedia ? 'Close Media Form' : '+ Register Media Asset'}
                  </button>
                  <button
                    onClick={() => {
                      setShowAddDoc(!showAddDoc);
                      setEditingDoc(null);
                    }}
                    className="px-4 py-2.5 rounded-xl border border-[#101B2D] bg-white text-[#101B2D] text-xs sm:text-sm font-bold hover:bg-[#FAF8F5] transition"
                  >
                    {showAddDoc ? 'Close Document Form' : '+ Add Document'}
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
                  className="rounded-2xl border border-[#C5A15B] bg-white p-6 shadow-md space-y-4 text-sm"
                >
                  <h4 className="font-serif font-bold text-lg text-[#101B2D]">Add New Institutional Image or Facility Asset</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Asset Title</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Khwopa Central Library Wing"
                        value={newMedia.title}
                        onChange={(e) => setNewMedia({ ...newMedia, title: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
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
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
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
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
                    />
                  </div>
                  <button type="submit" className="px-5 py-2.5 rounded-xl bg-[#101B2D] text-[#C5A15B] text-xs sm:text-sm font-bold">
                    Save to Media Repository
                  </button>
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
                  className="rounded-2xl border border-[#C5A15B] bg-white p-6 shadow-md space-y-4 text-sm"
                >
                  <h4 className="font-serif font-bold text-lg text-[#101B2D]">Add Downloadable Document or Syllabus</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Document Title</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. NEB Grade 11 Physics Lab Manual 2083"
                        value={newDoc.title}
                        onChange={(e) => setNewDoc({ ...newDoc, title: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Category</label>
                      <input
                        type="text"
                        value={newDoc.category}
                        onChange={(e) => setNewDoc({ ...newDoc, category: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
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
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
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
                  <button type="submit" className="px-5 py-2.5 rounded-xl bg-[#101B2D] text-[#C5A15B] text-xs sm:text-sm font-bold">
                    Save Document
                  </button>
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
                  className="rounded-2xl border-2 border-[#C5A15B] bg-white p-6 shadow-lg space-y-4 text-sm"
                >
                  <div className="flex items-center justify-between border-b border-[#EFECE3] pb-3.5">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#A68238]">Editing Media Asset</span>
                      <h4 className="font-serif font-bold text-lg text-[#101B2D] mt-0.5">{editingMedia.title}</h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditingMedia(null)}
                      className="px-3.5 py-1.5 rounded-lg bg-[#FAF8F5] border border-[#E3DCCB] text-xs font-bold text-slate-600 hover:text-[#101B2D]"
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
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Category</label>
                      <input
                        type="text"
                        required
                        value={editingMedia.category || ''}
                        onChange={(e) => setEditingMedia({ ...editingMedia, category: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
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
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D] leading-relaxed"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2.5">
                    <button
                      type="button"
                      onClick={() => setEditingMedia(null)}
                      className="px-4 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-slate-700 text-xs sm:text-sm font-bold"
                    >
                      Discard
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-[#101B2D] text-[#C5A15B] text-xs sm:text-sm font-bold"
                    >
                      Save Media Changes
                    </button>
                  </div>
                </form>
              )}

              {/* Media Image Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {facilities.map((item, idx) => (
                  <div key={item._id || idx} className="rounded-2xl border border-[#E3DCCB] bg-white overflow-hidden shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="h-44 w-full bg-slate-900 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#A68238]">
                          {item.category || 'Asset'}
                        </span>
                        <h4 className="font-serif font-bold text-base text-[#101B2D] mt-1 leading-snug">{item.title}</h4>
                        <p className="text-sm text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                    <div className="px-4 py-3.5 bg-[#FAF8F5] border-t border-[#EFECE3] flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setEditingMedia(item)}
                          className="px-3 py-1.5 rounded-lg bg-white border border-[#E3DCCB] font-bold text-[#101B2D] hover:border-[#C5A15B]"
                        >
                          Edit Asset
                        </button>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(item.image);
                            showToast('Asset image URL copied to clipboard!');
                          }}
                          className="font-semibold text-slate-600 hover:text-[#A68238]"
                        >
                          Copy URL
                        </button>
                      </div>
                      {item._id && (
                        <button
                          onClick={() => deleteFacility(item._id)}
                          className="text-rose-600 font-bold hover:underline"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Editable Documents & Syllabi Section inside Media & Documents */}
              <div className="rounded-2xl border border-[#E3DCCB] bg-white p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-serif font-bold text-lg text-[#101B2D]">Editable Documents & Syllabi Repository</h4>
                    <p className="text-sm text-slate-600 mt-0.5">Click Edit on any document below to modify its title, category, size, or download link</p>
                  </div>
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
                      <span className="text-xs font-bold text-[#101B2D] uppercase tracking-wider">Editing Document: {editingDoc.title}</span>
                      <button
                        type="button"
                        onClick={() => setEditingDoc(null)}
                        className="text-xs text-slate-600 hover:text-[#101B2D] font-bold"
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
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-sm text-[#101B2D]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Category</label>
                        <input
                          type="text"
                          value={editingDoc.category}
                          onChange={(e) => setEditingDoc({ ...editingDoc, category: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-sm text-[#101B2D]"
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
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-sm text-[#101B2D]"
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
                    <button type="submit" className="px-5 py-2.5 rounded-xl bg-[#101B2D] text-[#C5A15B] text-xs sm:text-sm font-bold">
                      Save Document Changes
                    </button>
                  </form>
                )}

                <div className="divide-y divide-[#EFECE3] text-sm">
                  {documents.map(d => ({
                    _id: d._id,
                    title: d.title,
                    fileSize: d.fileSize,
                    category: d.category,
                    fileUrl: d.fileUrl,
                    description: d.description
                  })).map((doc, idx) => (
                    <div key={doc._id || idx} className="py-3.5 flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <p className="font-bold text-[#101B2D]">{doc.title}</p>
                        <p className="text-slate-500 text-xs mt-0.5">{doc.fileSize} — {doc.category}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setEditingDoc(doc)}
                          className="px-3 py-1.5 rounded-lg border border-[#E3DCCB] bg-[#FAF8F5] text-xs font-bold text-[#101B2D] hover:border-[#C5A15B]"
                        >
                          Edit Document
                        </button>
                        {doc._id && (
                          <button
                            onClick={() => deleteDocument(doc._id)}
                            className="text-xs text-rose-600 font-bold hover:underline"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Menu & Navigation Manager */}
          {activeTab === 'navmanager' && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-[#E3DCCB] bg-white p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#101B2D] tracking-tight">Public Menu & Navigation Architecture</h3>
                  <p className="text-sm text-slate-600 mt-1">Inspect, test, and configure the primary navigation hierarchy displayed across desktop and mobile headers</p>
                </div>
                <span className="text-xs font-bold text-[#A68238] bg-[#C5A15B]/15 px-3.5 py-1.5 rounded-full">
                  8 Primary Routes Active
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: 'Home', to: '/', sub: 'Hero, Impact Metrics, Academic Streams, Facilities, Voices' },
                  { label: 'About Us', to: '/about', sub: 'History, Vision & Mission, Principal Message, Governance, Achievements' },
                  { label: 'Academics', to: '/academics', sub: '+2 Science, Management, Humanities, Law, Faculty Directory, Calendar' },
                  { label: 'Admissions', to: '/admissions', sub: 'Online Application Form, Eligibility, Scholarships, Fee Structure' },
                  { label: 'Examinations', to: '/examinations', sub: 'NEB Board Routines, Results Verification, Exam Code of Conduct' },
                  { label: 'Campus Life', to: '/campus-life', sub: 'Student Clubs, Sports, Labs & Facilities, Events, Photo Gallery' },
                  { label: 'Resources & Library', to: '/resources/library', sub: 'Central Library & OPAC, Downloads & Syllabi, Online Services' },
                  { label: 'Research (RMC)', to: '/research', sub: 'Research Management Cell, Khwopa Journal (NepJOL), Grants' }
                ].map((nav) => (
                  <div key={nav.to} className="rounded-2xl border border-[#E3DCCB] bg-white p-5 shadow-xs flex items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <h4 className="font-serif font-bold text-base sm:text-lg text-[#101B2D]">{nav.label}</h4>
                        <span className="font-mono text-xs text-[#A68238] bg-[#FAF8F5] px-2.5 py-0.5 rounded border border-[#E3DCCB]">
                          {nav.to}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 mt-1 leading-relaxed">{nav.sub}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setActiveTab('pagebuilder')}
                        className="px-3.5 py-1.5 rounded-lg border border-[#E3DCCB] bg-[#FAF8F5] text-xs font-bold text-[#101B2D] hover:border-[#C5A15B]"
                      >
                        Edit Page
                      </button>
                      <a
                        href={nav.to}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3.5 py-1.5 rounded-lg bg-[#101B2D] text-[#C5A15B] text-xs font-bold hover:bg-[#1B293E]"
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
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#101B2D] tracking-tight">Team Accounts & Role-Based Access Control (RBAC)</h3>
                  <p className="text-sm text-slate-600 mt-1">Provision staff administrator accounts and assign granular institutional permissions</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-[#A68238] bg-[#C5A15B]/15 px-3.5 py-1.5 rounded-full">
                    {users.length || 1} Active Accounts
                  </span>
                  <button
                    onClick={() => setShowAddUser(!showAddUser)}
                    className="px-4 py-2.5 rounded-xl bg-[#101B2D] text-[#C5A15B] text-xs sm:text-sm font-bold hover:bg-[#1B293E] transition"
                  >
                    {showAddUser ? 'Close Form' : '+ Add Team Member'}
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
                      setNewUser({ name: '', email: '', password: '', role: 'News Editor', department: 'Administration' });
                      setShowAddUser(false);
                    } catch (err) {
                      alert({
                        title: 'Administrator Provisioning Error',
                        message: err.response?.data?.message || err.message,
                        type: 'error'
                      });
                    }
                  }}
                  className="rounded-2xl border border-[#C5A15B] bg-white p-6 shadow-md space-y-4 text-sm"
                >
                  <h4 className="font-serif font-bold text-lg text-[#101B2D]">Provision New Administrator Account</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Vice Principal"
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
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
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
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
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Assigned Role</label>
                      <select
                        value={newUser.role}
                        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
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
                  <button type="submit" className="px-5 py-2.5 rounded-xl bg-[#101B2D] text-[#C5A15B] text-xs sm:text-sm font-bold">
                    Create Administrator Account
                  </button>
                </form>
              )}

              {/* Registered Administrators Table */}
              {users.length > 0 && (
                <div className="rounded-2xl border border-[#E3DCCB] bg-white p-6 shadow-xs">
                  <h4 className="font-serif font-bold text-lg text-[#101B2D] mb-4">Registered Administrative Accounts</h4>
                  <div className="divide-y divide-[#EFECE3] text-sm">
                    {users.map((u) => (
                      <div key={u._id} className="py-3.5 flex items-center justify-between gap-4">
                        <div>
                          <p className="font-bold text-[#101B2D]">{u.name}</p>
                          <p className="text-slate-500 font-mono text-xs mt-0.5">{u.email}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 rounded-md bg-[#FAF8F5] border border-[#E3DCCB] text-xs font-bold text-[#A68238]">
                            {u.role}
                          </span>
                          {u.email !== user?.email && (
                            <button
                              onClick={() => deleteUser(u._id)}
                              className="text-xs text-rose-600 font-bold hover:underline"
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { role: 'Super Admin', desc: 'Complete system control & permission grants' },
                  { role: 'Principal / Approver', desc: 'Review, approve and sign off live releases' },
                  { role: 'Academic Administrator', desc: 'Programmes, study areas & curricula' },
                  { role: 'Admission Officer', desc: 'Class 11 intake, eligibility & forms' },
                  { role: 'Examination Officer', desc: 'NEB board routines & seat allocations' },
                  { role: 'Faculty Coordinator', desc: 'Educator credentials & departmental staff' },
                  { role: 'Research Editor', desc: 'RMC monographs & journal publications' },
                  { role: 'News Editor', desc: 'College circulars, events & media stories' },
                ].map((r) => (
                  <div key={r.role} className="rounded-2xl border border-[#E3DCCB] bg-white p-5 shadow-xs space-y-2">
                    <span className="text-[11px] font-bold text-[#A68238] bg-[#C5A15B]/15 px-2.5 py-0.5 rounded-md uppercase">
                      Policy Active
                    </span>
                    <h4 className="font-serif font-bold text-base text-[#101B2D] mt-2 leading-snug">{r.role}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{r.desc}</p>
                  </div>
                ))}
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
