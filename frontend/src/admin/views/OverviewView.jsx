import { useMemo } from 'react';
import { ChevronRight, ArrowUpRight, BookOpen, Clock, FileText, Users, GraduationCap, Mail } from 'lucide-react';
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

  const totalCurricula = programmes.length || 4;
  const totalFaculty = faculty.length || 116;
  const totalNotices = notices.length || 0;
  const totalClubs = clubs?.length || 8;
  const totalScholarshipAssets = (documents?.length || 0) + (research?.length || 0);

  return (
    <div className="space-y-6">
      {/* 1. Institutional Executive Header */}
      <div className="border-b border-[#E3DCCB] pb-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-[#A68238] uppercase tracking-wider">
              {todayFormatted} — Khwopa Secondary School
            </p>
            <h1 className="font-sans text-2xl sm:text-3xl font-bold text-[#101B2D] mt-1">
              {greeting}, {user?.name ? user.name.split(' ')[0] : 'Administrator'}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('admissions')}
              className="px-4 py-2 rounded-xl bg-[#101B2D] text-[#C5A15B] text-xs sm:text-sm font-bold hover:bg-[#1B293E] transition shadow-xs cursor-pointer"
            >
              Admissions Desk
            </button>
            <button
              onClick={() => setActiveTab('notices')}
              className="px-4 py-2 rounded-xl border border-[#E3DCCB] bg-white text-[#101B2D] text-xs sm:text-sm font-bold hover:bg-[#FAF8F5] transition shadow-xs cursor-pointer"
            >
              + Post Notice
            </button>
          </div>
        </div>
      </div>

      {/* 2. Structured Institutional Metrics Ledger (Domain-Grouped, Not Repetitive Cards) */}
      <div className="rounded-2xl border border-[#E3DCCB] bg-white p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#EFECE3] -mx-2">
          {/* Domain A: Admissions & Student Intake */}
          <div className="px-5 py-3 md:py-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Intake & Enrollment</span>
              <button
                onClick={() => setActiveTab('admissions')}
                className="text-xs font-bold text-[#A68238] hover:underline cursor-pointer"
              >
                Review Intake →
              </button>
            </div>
            <div className="mt-3 flex items-baseline gap-3">
              <span className="font-sans text-3xl sm:text-4xl font-bold text-[#101B2D]">Class 11</span>
            </div>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Evaluating applications across Science, Management, Humanities & Law streams with municipality quotas.
            </p>
          </div>

          {/* Domain B: Academic Operations & Teaching Staff */}
          <div className="px-5 py-3 md:py-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Faculty & Curricula</span>
              <button
                onClick={() => setActiveTab('faculty')}
                className="text-xs font-bold text-[#A68238] hover:underline cursor-pointer"
              >
                Directory →
              </button>
            </div>
            <div className="mt-3 flex items-baseline gap-3">
              <span className="font-sans text-3xl sm:text-4xl font-bold text-[#101B2D]">{totalFaculty}</span>
              <span className="text-xs text-slate-500 font-medium">
                Educators across {totalCurricula} Streams
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Full-time and adjunct faculty actively assigned to NEB-aligned higher secondary courses.
            </p>
          </div>

          {/* Domain C: Public Communications & RMC */}
          <div className="px-5 py-3 md:py-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Publications & Cell</span>
              <button
                onClick={() => setActiveTab('notices')}
                className="text-xs font-bold text-[#A68238] hover:underline cursor-pointer"
              >
                Gazette →
              </button>
            </div>
            <div className="mt-3 flex items-baseline gap-3">
              <span className="font-sans text-3xl sm:text-4xl font-bold text-[#101B2D]">{totalNotices}</span>
              <span className="text-xs text-slate-500 font-medium">
                {totalNotices} Published Notices
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Official municipal circulars, routine schedules, and Research Management Cell monographs.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Main Operational Working Grid (8 cols : 4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Official Circulars & Dispatches (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-2xl border border-[#E3DCCB] bg-white p-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#EFECE3] pb-4">
              <div>
                <h2 className="font-sans text-lg font-bold text-[#101B2D]">Official Announcements & Circulars</h2>
                <p className="text-xs text-slate-500 mt-0.5">Currently published and publicly visible on khwopa.edu.np</p>
              </div>
              <button
                onClick={() => setActiveTab('notices')}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#A68238] hover:text-[#101B2D] transition cursor-pointer"
              >
                <span>Full Archive</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="divide-y divide-[#EFECE3]">
              {notices.length === 0 ? (
                <div className="my-2 p-5 rounded-xl border border-dashed border-[#E3DCCB] bg-[#FAF8F5] text-center">
                  <BookOpen className="h-5 w-5 mx-auto text-[#A68238]/60 mb-1.5" />
                  <p className="text-xs text-slate-600 font-medium">No official circulars currently published on the board.</p>
                  <button
                    onClick={() => setActiveTab('notices')}
                    className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#101B2D] text-[#C5A15B] text-xs font-bold hover:bg-[#1B293E] transition cursor-pointer shadow-xs"
                  >
                    <span>+ Publish Circular</span>
                  </button>
                </div>
              ) : (
                notices.slice(0, 5).map((n) => (
                  <div key={n._id} className="py-3.5 flex items-center justify-between gap-4 group">
                    <div className="min-w-0">
                      <p className="font-semibold text-sm text-[#101B2D] group-hover:text-[#A68238] transition truncate">
                        {n.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                        <span className="font-medium text-[#A68238] bg-[#FAF8F5] border border-[#E3DCCB] px-2 py-0.5 rounded">
                          {n.category}
                        </span>
                        <span>—</span>
                        <span>
                          {new Date(n.publishedAt || n.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab('notices')}
                      className="shrink-0 text-xs font-semibold text-slate-700 bg-[#FAF8F5] hover:bg-white hover:border-[#C5A15B] px-3 py-1.5 rounded-lg border border-[#E3DCCB] transition cursor-pointer"
                    >
                      Edit
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Academic Disciplines Overview Strip */}
          <div className="rounded-2xl border border-[#E3DCCB] bg-white p-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#EFECE3] pb-3 mb-4">
              <div>
                <h3 className="font-sans font-bold text-base text-[#101B2D]">Higher Secondary Academic Offerings (+2)</h3>
                <p className="text-xs text-slate-500 mt-0.5">Approved streams affiliated with the National Examinations Board</p>
              </div>
              <button
                onClick={() => setActiveTab('academics')}
                className="text-xs font-bold text-[#A68238] hover:underline cursor-pointer"
              >
                Academic Streams →
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E3DCCB]">
                <p className="font-bold text-[#101B2D] text-sm">+2 Science</p>
                <p className="text-slate-600 mt-1 leading-relaxed">Physics, Chemistry, Biology, Math & Computer Science laboratories.</p>
                <span className="mt-2 inline-block text-[11px] font-medium text-slate-500">NEB Affiliated</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E3DCCB]">
                <p className="font-bold text-[#101B2D] text-sm">+2 Management</p>
                <p className="text-slate-600 mt-1 leading-relaxed">Accountancy, Economics, Business Studies, Computer Science & Hotel Management.</p>
                <span className="mt-2 inline-block text-[11px] font-medium text-slate-500">NEB Affiliated</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E3DCCB]">
                <p className="font-bold text-[#101B2D] text-sm">+2 Humanities & Law</p>
                <p className="text-slate-600 mt-1 leading-relaxed">Sociology, Mass Communication, English, Jurisprudence and General Law.</p>
                <span className="mt-2 inline-block text-[11px] font-medium text-slate-500">NEB Affiliated</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Operational Shortcuts & Governance (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Access Desk */}
          <div className="rounded-2xl border border-[#E3DCCB] bg-white p-6 shadow-xs">
            <h3 className="font-sans font-bold text-base text-[#101B2D] border-b border-[#EFECE3] pb-3 mb-3">
              Administrative Workflows
            </h3>
            <div className="space-y-2">
              {[
                { label: 'Class 11 Admissions Intake', tab: 'admissions', desc: 'Process applications & merit evaluation' },
                { label: 'Visual Page Builder (CMS)', tab: 'pagebuilder', desc: 'Edit homepage text, banners & sections' },
                { label: 'Faculty & Teacher Directory', tab: 'faculty', desc: 'Manage educators, departments & bios' },
                { label: 'Citizen & Student Inquiries', tab: 'inquiries', desc: 'Review messages & dispatch replies' },
                { label: 'Institutional Site Settings', tab: 'settings', desc: 'Legal identity, contacts & logo configuration' },
              ].map((flow) => (
                <button
                  key={flow.tab}
                  onClick={() => setActiveTab(flow.tab)}
                  className="w-full text-left p-3 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] hover:bg-white hover:border-[#C5A15B] transition shadow-xs group cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs sm:text-sm text-[#101B2D] group-hover:text-[#A68238] transition">
                      {flow.label}
                    </span>
                    <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#A68238] group-hover:translate-x-0.5 transition" />
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{flow.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Institutional Governance Information */}
          <div className="rounded-2xl border border-[#E3DCCB] bg-[#FAF8F5] p-5 text-xs text-slate-600 space-y-2">
            <p className="font-sans font-bold text-[#101B2D] text-sm">
              Khwopa Secondary School (+2)
            </p>
            <p className="leading-relaxed">
              Established in 2058 BS (2001 AD) as an educational initiative of Bhaktapur Municipality, affiliated with the National Examinations Board (NEB Center Code 104).
            </p>
            <div className="pt-2 border-t border-[#E3DCCB] flex items-center justify-between text-[11px] text-slate-500">
              <span>Bhaktapur, Nepal</span>
              <span>Dekocha, Ward 2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
