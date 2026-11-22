import { useState, useMemo } from "react";
import PageHero from "../../components/common/PageHero";
import PageContainer from "../../components/common/PageContainer";
import CTASection from "../../components/common/CTASection";
import { BS_MONTHS, CALENDAR_CATEGORIES, KHWOPA_CALENDAR_EVENTS } from "../../data/calendarData";

export default function AcademicCalendarPage() {
  const [selectedMonthId, setSelectedMonthId] = useState(1); // Default Baishakh
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDay, setSelectedDay] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("calendar"); // "calendar" or "timeline"

  const currentMonth = useMemo(() => {
    return BS_MONTHS.find((m) => m.id === selectedMonthId) || BS_MONTHS[0];
  }, [selectedMonthId]);

  // Events filtered by month, category, and search query
  const monthEvents = useMemo(() => {
    return KHWOPA_CALENDAR_EVENTS.filter((e) => {
      const matchMonth = e.monthId === selectedMonthId;
      const matchCategory = selectedCategory === "all" || e.category === selectedCategory;
      const matchSearch =
        !searchQuery ||
        e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchMonth && matchCategory && matchSearch;
    });
  }, [selectedMonthId, selectedCategory, searchQuery]);

  // All events matching filters across the entire year (for timeline mode)
  const allFilteredEvents = useMemo(() => {
    return KHWOPA_CALENDAR_EVENTS.filter((e) => {
      const matchCategory = selectedCategory === "all" || e.category === selectedCategory;
      const matchSearch =
        !searchQuery ||
        e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Map of day -> events for the grid
  const dayEventsMap = useMemo(() => {
    const map = {};
    monthEvents.forEach((ev) => {
      if (!map[ev.day]) map[ev.day] = [];
      map[ev.day].push(ev);
    });
    return map;
  }, [monthEvents]);

  // Calendar Grid Days Calculation
  const calendarGrid = useMemo(() => {
    const cells = [];
    const totalDays = currentMonth.days;
    const startOffset = currentMonth.startDayOfWeek; // 0 = Sun, 1 = Mon ... 6 = Sat

    // Empty leading cells
    for (let i = 0; i < startOffset; i++) {
      cells.push({ empty: true, key: `empty-${i}` });
    }

    // Days of the month
    for (let d = 1; d <= totalDays; d++) {
      const dayOfWeek = (startOffset + d - 1) % 7;
      const isSaturday = dayOfWeek === 6; // Saturday is public holiday in Nepal
      const events = dayEventsMap[d] || [];
      cells.push({
        empty: false,
        day: d,
        isSaturday,
        events,
        key: `day-${d}`
      });
    }

    return cells;
  }, [currentMonth, dayEventsMap]);

  // Selected Day Details
  const activeDayEvents = useMemo(() => {
    if (!selectedDay) return [];
    return monthEvents.filter((e) => e.day === selectedDay);
  }, [selectedDay, monthEvents]);

  const handlePrevMonth = () => {
    setSelectedDay(null);
    setSelectedMonthId((prev) => (prev > 1 ? prev - 1 : 12));
  };

  const handleNextMonth = () => {
    setSelectedDay(null);
    setSelectedMonthId((prev) => (prev < 12 ? prev + 1 : 1));
  };

  const getCategoryBadgeClass = (category) => {
    switch (category) {
      case "exam":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "academic":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "holiday":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "event":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "admission":
        return "bg-purple-50 text-purple-700 border-purple-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  return (
    <main className="bg-[#f7f5f0] min-h-screen">
      <PageHero
        eyebrow="Khwopa Secondary School · Bhaktapur Municipality"
        title="Official Academic Calendar."
        italicTitle="Session 2083 BS (2026 – 2027 AD)."
        description="Interactive academic almanac detailing +2 National Examination Board (NEB) schedules, term evaluations, municipal holidays, campus events, and Class 11 intake milestones."
        breadcrumbs={[
          { label: "Resources", to: "/resources" },
          { label: "Academic Calendar 2083" }
        ]}
        stats={[
          { label: "Academic Year", value: "2083 BS" },
          { label: "Operating Cycle", value: "NEB Annual" },
          { label: "Standard Holiday", value: "Saturday" }
        ]}
      />

      <section className="py-12 sm:py-20">
        <PageContainer>
          {/* Header Controls: Search, View Mode, Category Filters */}
          <div className="space-y-6">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 rounded-2xl border border-[#e5ddce] bg-white p-5 sm:p-6 shadow-xs">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search exams, festivals, admissions, or sports..."
                    className="w-full rounded-xl border border-[#e5ddce] bg-[#fbfaf7] pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#12243a] focus:border-[#b99754] focus:outline-none focus:ring-1 focus:ring-[#b99754]"
                  />
                  <svg className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center rounded-xl border border-[#e5ddce] bg-[#fbfaf7] p-1 text-xs font-semibold">
                  <button
                    onClick={() => setViewMode("calendar")}
                    className={`px-3 py-1.5 rounded-lg transition ${viewMode === "calendar" ? "bg-[#0b2038] text-[#dfbd77] shadow-xs" : "text-slate-600 hover:text-[#12243a]"}`}
                  >
                    Monthly Grid
                  </button>
                  <button
                    onClick={() => setViewMode("timeline")}
                    className={`px-3 py-1.5 rounded-lg transition ${viewMode === "timeline" ? "bg-[#0b2038] text-[#dfbd77] shadow-xs" : "text-slate-600 hover:text-[#12243a]"}`}
                  >
                    Annual Timeline ({allFilteredEvents.length})
                  </button>
                </div>

                <Link
                  to="/resources"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#e5ddce] bg-white text-xs font-bold text-[#0b2038] hover:bg-[#FAF8F5] transition"
                >
                  <span>Resources Directory</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 shrink-0 mr-1">
                Filter:
              </span>
              {CALENDAR_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition border ${
                    selectedCategory === cat.id
                      ? "bg-[#0b2038] text-[#dfbd77] border-[#0b2038] shadow-xs"
                      : "bg-white text-slate-600 border-[#e5ddce] hover:border-[#b99754]"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* VIEW MODE 1: Interactive Monthly Grid */}
          {viewMode === "calendar" ? (
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Month Navigator & Interactive Calendar Grid */}
              <div className="lg:col-span-8 rounded-3xl border border-[#e5ddce] bg-white shadow-sm overflow-hidden">
                {/* Month Selector Bar */}
                <div className="p-6 sm:p-7 border-b border-[#e5ddce] bg-gradient-to-r from-[#0b2038] via-[#10243b] to-[#0b2038] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handlePrevMonth}
                      className="h-9 w-9 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
                      aria-label="Previous Month"
                    >
                      ←
                    </button>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
                          {currentMonth.name}
                        </h2>
                        <span className="font-serif text-lg font-bold text-[#dfbd77]">
                          ({currentMonth.nepali})
                        </span>
                        <span className="rounded-md bg-[#dfbd77]/20 px-2.5 py-0.5 font-mono text-xs font-bold text-[#dfbd77]">
                          2083 BS
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-0.5">
                        {currentMonth.engRange} · Total {currentMonth.days} Days
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleNextMonth}
                      className="h-9 w-9 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
                      aria-label="Next Month"
                    >
                      →
                    </button>
                  </div>
                </div>

                {/* Month Horizontal Fast-Scroller */}
                <div className="flex items-center gap-1.5 overflow-x-auto p-3 bg-[#fbfaf7] border-b border-[#e5ddce] scrollbar-none">
                  {BS_MONTHS.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => {
                        setSelectedDay(null);
                        setSelectedMonthId(m.id);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                        selectedMonthId === m.id
                          ? "bg-[#0b2038] text-[#dfbd77] font-bold shadow-xs"
                          : "text-slate-600 hover:bg-white hover:text-[#12243a]"
                      }`}
                    >
                      {m.name} ({m.nepali})
                    </button>
                  ))}
                </div>

                {/* Day of Week Header */}
                <div className="grid grid-cols-7 border-b border-[#e5ddce] bg-[#f7f5f0] text-center text-[11px] font-bold uppercase tracking-wider text-slate-600">
                  <div className="py-3">Sun (आइत)</div>
                  <div className="py-3">Mon (सोम)</div>
                  <div className="py-3">Tue (मंगल)</div>
                  <div className="py-3">Wed (बुध)</div>
                  <div className="py-3">Thu (बिही)</div>
                  <div className="py-3">Fri (शुक्र)</div>
                  <div className="py-3 text-rose-600 font-extrabold">Sat (शनि)</div>
                </div>

                {/* 7-Column Days Grid */}
                <div className="grid grid-cols-7 divide-x divide-y divide-[#eee9df] bg-slate-50">
                  {calendarGrid.map((cell) => {
                    if (cell.empty) {
                      return <div key={cell.key} className="h-20 sm:h-24 bg-[#FAF8F5]/60" />;
                    }

                    const isSelected = selectedDay === cell.day;
                    const hasEvents = cell.events.length > 0;

                    return (
                      <div
                        key={cell.key}
                        onClick={() => setSelectedDay(cell.day)}
                        className={`group relative h-20 sm:h-24 p-2 transition cursor-pointer flex flex-col justify-between ${
                          cell.isSaturday ? "bg-rose-50/40 text-rose-700" : "bg-white text-[#12243a]"
                        } ${isSelected ? "ring-2 ring-[#0b2038] bg-[#fbf8f1] z-10" : "hover:bg-slate-50"}`}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={`font-serif text-sm sm:text-base font-bold ${
                              cell.isSaturday ? "text-rose-600 font-extrabold" : isSelected ? "text-[#92703b]" : "text-slate-700"
                            }`}
                          >
                            {cell.day}
                          </span>
                          {hasEvents && (
                            <span className="flex h-2 w-2 rounded-full bg-[#dfbd77]" />
                          )}
                        </div>

                        {/* Event Tags inside cell */}
                        <div className="space-y-1 overflow-hidden">
                          {cell.events.slice(0, 2).map((ev) => (
                            <div
                              key={ev.id}
                              className={`truncate rounded px-1.5 py-0.5 text-[9px] font-semibold border ${getCategoryBadgeClass(ev.category)}`}
                              title={ev.title}
                            >
                              {ev.title}
                            </div>
                          ))}
                          {cell.events.length > 2 && (
                            <span className="text-[9px] text-slate-500 font-bold block">
                              +{cell.events.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Month Schedule & Selected Day Inspector */}
              <div className="lg:col-span-4 space-y-6">
                {/* Active Day Inspector */}
                {selectedDay && (
                  <div className="rounded-3xl border border-[#b99754] bg-[#fbfaf7] p-6 shadow-md transition animate-fadeIn">
                    <div className="flex items-center justify-between border-b border-[#e5ddce] pb-3">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#92703b]">
                          Selected Date
                        </span>
                        <h3 className="font-serif text-xl font-bold text-[#12243a]">
                          {currentMonth.name} {selectedDay}, 2083
                        </h3>
                      </div>
                      <button
                        onClick={() => setSelectedDay(null)}
                        className="text-xs font-bold text-slate-400 hover:text-slate-700 p-1"
                      >
                        ✕ Close
                      </button>
                    </div>

                    <div className="mt-4 space-y-3">
                      {activeDayEvents.length > 0 ? (
                        activeDayEvents.map((ev) => (
                          <div
                            key={ev.id}
                            className="rounded-2xl border border-[#e5ddce] bg-white p-4 shadow-2xs space-y-2"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${getCategoryBadgeClass(ev.category)}`}>
                                {ev.category}
                              </span>
                              <span className="text-[11px] font-mono font-semibold text-slate-500">
                                🕒 {ev.time}
                              </span>
                            </div>
                            <h4 className="font-serif font-bold text-sm text-[#12243a] leading-snug">
                              {ev.title}
                            </h4>
                            <p className="editorial-copy text-xs text-[#475365] leading-relaxed">
                              {ev.desc}
                            </p>
                            <div className="pt-2 border-t border-[#eee9df] text-[11px] text-slate-500 flex items-center gap-1.5">
                              <span>📍</span>
                              <span className="font-medium">{ev.venue}</span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="py-6 text-center text-xs text-slate-500">
                          <p className="font-medium text-slate-600">Regular Academic Instruction Day</p>
                          <p className="mt-1 text-[11px] text-slate-400">No special examinations or campus recess scheduled on this date.</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Full Month Agenda Card */}
                <div className="rounded-3xl border border-[#e5ddce] bg-white p-6 sm:p-7 shadow-sm">
                  <div className="flex items-center justify-between border-b border-[#e5ddce] pb-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#92703b]">
                        Agenda & Milestones
                      </span>
                      <h3 className="font-serif text-lg font-bold text-[#12243a]">
                        {currentMonth.name} Schedule
                      </h3>
                    </div>
                    <span className="rounded-full bg-[#f5f0e5] px-2.5 py-1 text-xs font-bold text-[#92703b]">
                      {monthEvents.length} Events
                    </span>
                  </div>

                  <div className="mt-5 space-y-3.5 max-h-[500px] overflow-y-auto pr-1">
                    {monthEvents.length > 0 ? (
                      monthEvents.map((ev) => (
                        <div
                          key={ev.id}
                          onClick={() => setSelectedDay(ev.day)}
                          className={`rounded-2xl border p-4 transition cursor-pointer ${
                            selectedDay === ev.day
                              ? "border-[#b99754] bg-[#fbfaf7] shadow-xs"
                              : "border-[#e5ddce] bg-[#fbfaf7]/60 hover:bg-white hover:border-[#b99754]"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-mono text-xs font-bold text-[#92703b]">
                              {currentMonth.name} {ev.day}
                            </span>
                            <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider border ${getCategoryBadgeClass(ev.category)}`}>
                              {ev.category}
                            </span>
                          </div>
                          <h4 className="mt-2 font-serif text-sm font-bold text-[#12243a]">
                            {ev.title}
                          </h4>
                          <p className="editorial-copy mt-1 text-xs text-[#475365] line-clamp-2">
                            {ev.desc}
                          </p>
                          <p className="mt-2 text-[10px] text-slate-500">
                            📍 {ev.venue} · 🕒 {ev.time}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="py-8 text-center text-xs text-slate-500">
                        No events matched your category filter for this month.
                      </div>
                    )}
                  </div>
                </div>

                {/* Important Notice Callout */}
                <div className="rounded-2xl border border-[#dfd4bd] bg-[#fbf8f1] p-5">
                  <div className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#dfbd77] text-xs font-bold text-[#0b2038]">
                      i
                    </span>
                    <div className="text-xs text-[#475365] leading-relaxed">
                      <strong className="text-[#12243a]">Institutional Note:</strong> Festival dates and NEB board examinations are subject to official government notifications. Always cross-reference with official circulars published on our notice board.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* VIEW MODE 2: Comprehensive Annual Timeline */
            <div className="mt-8 rounded-3xl border border-[#e5ddce] bg-white p-6 sm:p-10 shadow-sm">
              <div className="border-b border-[#e5ddce] pb-5 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#92703b]">
                    Full Academic Chronology
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#12243a] mt-0.5">
                    Annual Session 2083 Schedule ({allFilteredEvents.length} Milestones)
                  </h3>
                </div>
                <button
                  onClick={() => setViewMode("calendar")}
                  className="px-4 py-2 rounded-xl bg-[#0b2038] text-[#dfbd77] text-xs font-bold hover:bg-[#1a3858] transition"
                >
                  Switch to Monthly Grid View
                </button>
              </div>

              <div className="mt-8 space-y-6">
                {allFilteredEvents.map((ev) => {
                  const m = BS_MONTHS.find((month) => month.id === ev.monthId);
                  return (
                    <div
                      key={ev.id}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl border border-[#e5ddce] bg-[#fbfaf7] hover:border-[#b99754] transition hover:bg-white"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-20 shrink-0 text-center rounded-xl bg-[#0b2038] text-white p-2">
                          <span className="block text-[10px] uppercase tracking-wider text-[#dfbd77]">
                            {m?.name}
                          </span>
                          <span className="font-serif text-2xl font-bold leading-none mt-0.5 block">
                            {ev.day}
                          </span>
                          <span className="text-[9px] text-white/60 block mt-0.5">
                            2083
                          </span>
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider border ${getCategoryBadgeClass(ev.category)}`}>
                              {ev.category}
                            </span>
                            <span className="text-xs font-mono text-slate-500">
                              🕒 {ev.time}
                            </span>
                          </div>
                          <h4 className="mt-1 font-serif text-base sm:text-lg font-bold text-[#12243a]">
                            {ev.title}
                          </h4>
                          <p className="editorial-copy mt-1 text-xs text-[#475365]">
                            {ev.desc}
                          </p>
                        </div>
                      </div>

                      <div className="sm:text-right shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 w-full sm:w-auto text-xs text-slate-500">
                        <span className="block font-medium text-[#12243a]">📍 {ev.venue}</span>
                        <span className="text-[11px] text-slate-400">{m?.engRange}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PageContainer>
      </section>

      <CTASection
        title="Looking for Examination Timetables?"
        description="Check upcoming board examination schedules, NEB room allocations, and form deadlines."
        primaryAction={{ label: "Exam Routines Hub", to: "/examinations/routines" }}
        secondaryAction={{ label: "Academic Resources", to: "/resources" }}
      />
    </main>
  );
}
