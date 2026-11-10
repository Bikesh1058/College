import { Search, Plus, Menu, RefreshCw } from 'lucide-react';
import { useAdminData } from '../context/useAdminData';

export default function AdminHeader({
  globalSearch,
  setGlobalSearch,
  onOpenMobileMenu,
  onQuickAction
}) {
  const { loading, refreshAll } = useAdminData();

  return (
    <header className="h-16 border-b border-[#E3DCCB] bg-white px-4 sm:px-8 flex items-center justify-between shrink-0 shadow-xs gap-3">
      {/* Mobile Toggle & Search */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-[#FAF8F5] border border-[#E3DCCB]"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="relative w-full max-w-md">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            placeholder="Search educators, circulars, streams, or pages..."
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-[#101B2D] placeholder-slate-400 outline-none focus:border-[#C5A15B] focus:bg-white transition"
          />
        </div>
      </div>

      {/* Right Actions: Sync Status & Quick Action */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={refreshAll}
          disabled={loading}
          title="Refresh data from Atlas"
          className="p-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-slate-600 hover:text-[#101B2D] hover:bg-white transition disabled:opacity-50 flex items-center"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin text-[#A68238]' : 'text-slate-500'}`} />
        </button>

        <button
          onClick={onQuickAction}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#101B2D] text-[#F5F2EA] text-xs sm:text-sm font-bold hover:bg-[#1F3147] transition shadow-xs"
        >
          <Plus className="h-4 w-4 text-[#C5A15B]" />
          <span>Post Notice</span>
        </button>
      </div>
    </header>
  );
}
