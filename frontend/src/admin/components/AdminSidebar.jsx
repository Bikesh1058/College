import { Link } from 'react-router-dom';
import {
  LogOut,
  ExternalLink
} from 'lucide-react';
import { useAdminData } from '../context/useAdminData';

export default function AdminSidebar({
  activeTab,
  setActiveTab,
  isMobileOpen,
  setIsMobileOpen,
  user,
  onLogout
}) {
  const { faculty, notices, programmes, clubs, documents, facilities, users, settings } = useAdminData();
  const badges = settings?.moduleBadges || {};

  const navGroups = [
    {
      group: 'MAIN WORKSPACE',
      items: [
        { id: 'overview', label: 'Dashboard Overview', badge: 'Live' },
        { id: 'pagebuilder', label: 'Visual Page Builder', badge: 'Canvas' },
        { id: 'academics', label: 'Academic Streams', badge: badges.academics || (programmes.length ? `${programmes.length}` : '4') },
        { id: 'admissions', label: 'Admissions & Intakes', badge: '2083' },
        { id: 'examinations', label: 'Examinations (NEB)', badge: badges.examinations || 'Code 104' },
        { id: 'faculty', label: 'Teachers & Faculty', badge: badges.faculty || (faculty.length ? `${faculty.length}` : '116') },
        { id: 'campuslife', label: 'Student Clubs & Life', badge: badges.campuslife || `${clubs?.length || 8}` },
        { id: 'research', label: 'Research Cell (RMC)', badge: badges.research || 'NepJOL' },
        { id: 'notices', label: 'Notices & News', badge: notices.length ? `${notices.length}` : 'Active' },
        { id: 'resources', label: 'Downloads & Syllabi', badge: badges.resources || `${documents?.length || 6}` },
      ]
    },
    {
      group: 'INSTITUTIONAL CONTROLS',
      items: [
        { id: 'medialibrary', label: 'Media & Documents', badge: `${(facilities?.length || 0) + (documents?.length || 0)}` },
        { id: 'navmanager', label: 'Menu & Navigation', badge: '8 Routes' },
        { id: 'permissions', label: 'Team Roles & RBAC', badge: users?.length ? `${users.length} Staff` : '8 Roles' },
        { id: 'settings', label: 'College Site Settings' },
      ]
    }
  ];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    if (setIsMobileOpen) setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex w-72 flex-col justify-between border-r border-[#1B293E] bg-[#101B2D] text-slate-300 transition-transform duration-300 lg:static lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Institutional Crest & Brand */}
          <div className="p-5 border-b border-[#1B293E] flex items-center justify-between bg-[#0C1523]">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#C5A15B] to-[#997B3C] p-0.5 shadow-md flex items-center justify-center shrink-0">
                <div className="h-full w-full bg-[#101B2D] rounded-[9px] flex items-center justify-center">
                  <span className="font-serif font-black text-base text-[#C5A15B] tracking-wider">KC</span>
                </div>
              </div>
              <div>
                <h2 className="font-serif font-bold text-white text-base tracking-wide leading-tight">
                  KHWOPA
                </h2>
                <p className="text-[11px] font-semibold tracking-[0.18em] text-[#C5A15B] uppercase mt-0.5">
                  College Administration
                </p>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          {/* Clean Editorial Navigation Links */}
          <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-6 admin-sidebar-scroll">
            {navGroups.map((grp) => (
              <div key={grp.group}>
                <p className="px-3 text-[11px] font-extrabold tracking-[0.2em] text-slate-500 uppercase mb-2.5">
                  {grp.group}
                </p>
                <div className="space-y-1">
                  {grp.items.map((item) => {
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition group ${
                          isActive
                            ? 'bg-gradient-to-r from-[#C5A15B] to-[#B38F48] text-[#101B2D] font-bold shadow-md shadow-[#C5A15B]/20'
                            : 'text-slate-300 hover:bg-[#1A283C] hover:text-white'
                        }`}
                      >
                        <span className="truncate">{item.label}</span>
                        {item.badge !== undefined && (
                          <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold shrink-0 ml-2 ${
                            isActive
                              ? 'bg-[#101B2D] text-[#C5A15B]'
                              : 'bg-[#1E2E44] text-slate-300'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Administrator Profile Card */}
          <div className="p-4 border-t border-[#1B293E] bg-[#0C1523]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-9 w-9 rounded-full bg-[#1F3147] border border-[#C5A15B]/40 flex items-center justify-center font-serif font-bold text-sm text-[#C5A15B] shrink-0">
                  {user?.name ? user.name[0] : 'A'}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-white truncate">{user?.name || 'Administrator'}</p>
                  <p className="text-xs text-[#C5A15B] truncate font-medium">{user?.role || 'Super Admin'}</p>
                </div>
              </div>
              <button
                onClick={onLogout}
                title="Sign Out"
                className="p-2 rounded-lg text-slate-400 hover:text-red-300 hover:bg-red-500/10 transition"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>

            <Link
              to="/"
              target="_blank"
              className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-[#23354B] bg-[#142336] py-2.5 text-xs font-semibold text-slate-300 hover:text-[#C5A15B] hover:border-[#C5A15B] transition shadow-xs"
            >
              <span>View Public Live Site</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
