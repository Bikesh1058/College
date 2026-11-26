import { Link } from 'react-router-dom';
import {
  LogOut,
  ExternalLink,
  Shield,
  Layers,
  Compass,
  Sparkles
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
  const navGroups = [
    {
      group: 'MAIN WORKSPACE',
      items: [
        { id: 'overview', label: 'Dashboard Overview' },
        { id: 'pagebuilder', label: 'Visual Page Builder' },
        { id: 'academics', label: 'Academic Streams' },
        { id: 'admissions', label: 'Admissions & Intakes' },
        { id: 'inquiries', label: 'Contact Inquiries' },
        { id: 'examinations', label: 'Examinations (NEB)' },
        { id: 'faculty', label: 'Teachers & Faculty' },
        { id: 'campuslife', label: 'Student Clubs & Life' },
        { id: 'research', label: 'Research Cell (RMC)' },
        { id: 'notices', label: 'Notices & News' },
      ]
    },
    {
      group: 'INSTITUTIONAL CONTROLS',
      items: [
        { id: 'medialibrary', label: 'Media & Documents' },
        { id: 'navmanager', label: 'Menu & Navigation' },
        { id: 'permissions', label: 'Team Roles & RBAC' },
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
          {/* Institutional Crest & Brand Header */}
          <div className="p-5 border-b border-[#1E2E44] flex items-center justify-between bg-[#0C1523]">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#1E3048] to-[#121F33] border border-[#C5A15B]/50 flex items-center justify-center shrink-0 shadow-sm">
                <span className="font-sans font-black text-sm tracking-wider text-[#C5A15B]">KC</span>
              </div>
              <div className="min-w-0">
                <h2 className="font-sans font-bold text-white text-sm tracking-wide leading-tight">
                  KHWOPA
                </h2>
                <p className="text-[10px] font-semibold tracking-[0.16em] text-[#C5A15B] uppercase mt-0.5">
                  Administration
                </p>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1A283C] cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Clean Editorial Navigation Links */}
          <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-6 admin-sidebar-scroll">
            {navGroups.map((grp) => (
              <div key={grp.group}>
                <div className="flex items-center justify-between px-3 mb-2.5">
                  <p className="text-[10px] font-extrabold tracking-[0.22em] text-slate-400 uppercase">
                    {grp.group}
                  </p>
                  <span className="h-px flex-1 ml-3 bg-[#1B293E]" />
                </div>
                <div className="space-y-1">
                  {grp.items.map((item) => {
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full flex items-center px-3.5 py-2.5 rounded-xl text-xs sm:text-[13px] transition group cursor-pointer ${
                          isActive
                            ? 'bg-gradient-to-r from-[#C5A15B] to-[#B38F48] text-[#101B2D] font-bold shadow-md shadow-[#C5A15B]/20'
                            : 'text-slate-300 hover:bg-[#16253B] hover:text-white'
                        }`}
                      >
                        <span className="truncate">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Administrator Profile Card */}
          <div className="p-4 border-t border-[#1E2E44] bg-[#0C1523]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-9 w-9 rounded-xl bg-[#17263B] border border-[#C5A15B]/40 flex items-center justify-center font-sans font-bold text-sm text-[#C5A15B] shrink-0 shadow-inner">
                  {user?.name ? user.name[0] : 'A'}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-white truncate">{user?.name || 'Administrator'}</p>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">{user?.email || 'Authenticated'}</p>
                </div>
              </div>
              <button
                onClick={onLogout}
                title="Sign Out"
                className="p-2 rounded-xl text-slate-400 hover:text-rose-300 hover:bg-rose-500/10 transition cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>

            <Link
              to="/"
              target="_blank"
              className="mt-3.5 flex items-center justify-center gap-2 rounded-xl border border-[#23354B] bg-[#142336] py-2.5 text-xs font-semibold text-slate-300 hover:text-[#C5A15B] hover:border-[#C5A15B]/60 transition shadow-xs"
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
