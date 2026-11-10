import { useMemo } from 'react';
import { ChevronRight } from 'lucide-react';
import { useAdminData } from '../context/useAdminData';

export default function OverviewView({ setActiveTab, user }) {
  const { faculty, notices, programmes, clubs, documents, research } = useAdminData();

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  }, []);

  const todayFormatted = useMemo(() => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }, []);

  const kpis = [
    { title: 'Academic Streams', count: programmes.length || '4', sub: '+2 Curricula', trend: 'NEB Board', tab: 'academics' },
    { title: 'Teaching Faculty', count: faculty.length || '116', sub: 'Active Educators', trend: 'Atlas Live', tab: 'faculty' },
    { title: 'Public Notices', count: notices.length || '0', sub: 'Live Announcements', trend: 'Realtime', tab: 'notices' },
    { title: 'Admissions 2083', count: 'Open', sub: 'Online Intakes', trend: 'PDF + Gmail', tab: 'admissions' },
    { title: 'Student Chapters', count: clubs?.length || '8', sub: 'Campus Life', trend: 'Active', tab: 'campuslife' },
    { title: 'Syllabi & Papers', count: (documents?.length || 0) + (research?.length || 0), sub: 'Resources & RMC', trend: 'Indexed', tab: 'resources' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="rounded-2xl border border-[#E3DCCB] bg-white p-7 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-96 bg-gradient-to-l from-[#C5A15B]/10 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-[#A68238]">
            <span>{todayFormatted}</span>
            <span className="text-slate-300">/</span>
            <span>Khwopa Higher Secondary Administration</span>
            <span className="text-slate-300">/</span>
            <span>NEB Center 104</span>
          </div>
          <h1 className="mt-2.5 font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#101B2D]">
            {greeting}, {user?.name ? user.name.split(' ')[0] : 'Educator'}.
          </h1>
          <p className="mt-2.5 text-sm sm:text-base text-[#4E5D6F] leading-relaxed">
            Welcome to the centralized administration portal for Khwopa Secondary School. You have{' '}
            <strong className="text-[#101B2D] font-semibold">{faculty.length} educators</strong> indexed in MongoDB Atlas,{' '}
            <strong className="text-[#101B2D] font-semibold">{notices.length} active notices</strong> on the public board, and all academic streams running smoothly.
          </p>
        </div>
      </div>

      {/* 6 Metric KPI Cards - Clean, Typographic & Clickable */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpis.map((kpi) => {
          return (
            <div
              key={kpi.title}
              onClick={() => setActiveTab(kpi.tab)}
              className="group cursor-pointer rounded-2xl border border-[#E3DCCB] bg-white p-5 shadow-xs hover:border-[#C5A15B] hover:shadow-md transition duration-200 flex flex-col justify-between"
            >
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#A68238] truncate">
                  {kpi.sub}
                </p>
                <p className="mt-3 font-serif text-3xl font-bold text-[#101B2D] leading-none">
                  {kpi.count}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#EFECE3] flex items-center justify-between gap-1">
                <span className="text-xs sm:text-sm font-semibold text-[#101B2D] truncate">
                  {kpi.title}
                </span>
                <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-[#A68238] group-hover:translate-x-0.5 transition shrink-0" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Stream & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Notices Feed (8 cols) */}
        <div className="lg:col-span-8 rounded-2xl border border-[#E3DCCB] bg-white p-6 sm:p-7 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-[#EFECE3] pb-4">
            <div>
              <h3 className="font-serif font-bold text-lg sm:text-xl text-[#101B2D]">Recent Announcements & Circulars</h3>
              <p className="text-sm text-slate-600 mt-0.5">Notices currently visible to students and parents on the website</p>
            </div>
            <button
              onClick={() => setActiveTab('notices')}
              className="text-xs sm:text-sm font-bold text-[#A68238] hover:underline shrink-0"
            >
              View All Notices →
            </button>
          </div>

          <div className="divide-y divide-[#EFECE3]">
            {notices.length === 0 ? (
              <div className="py-8 text-center text-sm text-slate-400">
                <p>No circulars published yet.</p>
                <button
                  onClick={() => setActiveTab('notices')}
                  className="mt-2 text-sm font-bold text-[#A68238] hover:underline"
                >
                  Publish your first notice →
                </button>
              </div>
            ) : (
              notices.slice(0, 5).map((n) => (
                <div key={n._id} className="py-4 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-semibold text-sm sm:text-base text-[#101B2D] truncate">{n.title}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      Category: <span className="font-semibold text-[#101B2D]">{n.category}</span> — Posted {new Date(n.publishedAt || n.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('notices')}
                    className="shrink-0 text-xs font-bold text-[#A68238] bg-[#FAF8F5] hover:bg-[#101B2D] hover:text-[#C5A15B] px-3 py-1.5 rounded-lg border border-[#E3DCCB] transition"
                  >
                    Manage
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Shortcuts & Queue Status (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-2xl border border-[#E3DCCB] bg-white p-6 shadow-xs">
            <div className="border-b border-[#EFECE3] pb-3.5">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#A68238] mb-0.5">
                Editorial Workflow
              </p>
              <h4 className="font-serif font-bold text-base sm:text-lg text-[#101B2D]">Editorial Desk Queue</h4>
            </div>
            <p className="text-sm text-slate-600 mt-3 leading-relaxed">
              All submitted educator profiles, academic circulars, and institutional releases are currently reviewed and published on the public portal.
            </p>
          </div>

          <div className="rounded-2xl border border-[#E3DCCB] bg-white p-6 shadow-xs space-y-3.5">
            <h4 className="font-serif font-bold text-base sm:text-lg text-[#101B2D]">Quick Actions</h4>
            <div className="space-y-2.5">
              <button
                onClick={() => setActiveTab('pagebuilder')}
                className="w-full flex items-center justify-between p-3.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] hover:border-[#C5A15B] hover:bg-white transition text-sm font-bold text-[#101B2D] group"
              >
                <span>Visual Page Builder</span>
                <ChevronRight className="h-4 w-4 text-slate-400 group-hover:translate-x-0.5 transition" />
              </button>

              <button
                onClick={() => setActiveTab('faculty')}
                className="w-full flex items-center justify-between p-3.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] hover:border-[#C5A15B] hover:bg-white transition text-sm font-bold text-[#101B2D] group"
              >
                <span>Educator Directory</span>
                <ChevronRight className="h-4 w-4 text-slate-400 group-hover:translate-x-0.5 transition" />
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className="w-full flex items-center justify-between p-3.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] hover:border-[#C5A15B] hover:bg-white transition text-sm font-bold text-[#101B2D] group"
              >
                <span>College Site Settings</span>
                <ChevronRight className="h-4 w-4 text-slate-400 group-hover:translate-x-0.5 transition" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
