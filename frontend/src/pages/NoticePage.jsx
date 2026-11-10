import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

const COLLEGE_WEBSITE = "https://khwopacollege.edu.np";
const CAMPUS_IMAGE =
  "https://wms.edigitalnepal.com/wms/files/ws-post-images/1678958957817_007be5e2-a1dc-4580-9809-4964d79fa1a0.jpg";

const NOTICES = [
  {
    id: 1,
    title: "Notice for Admission Scholarship 2082 Batch",
    category: "scholarship",
    categoryLabel: "Scholarship",
    batch: "2082 Batch",
    published: "Publication date not available",
    description:
      "Khwopa College published an admission scholarship notice for the 2082 batch. Refer to the original announcement for its scholarship details and conditions.",
    url: "https://khwopacollege.edu.np/p/notice-for-admission-scholarship-2082-batch--23659",
    archived: true,
    featured: true,
  },
  {
    id: 2,
    title: "Cultural Program",
    category: "events",
    categoryLabel: "Events",
    batch: "Archive",
    published: "Publication date not available",
    description:
      "An archived college publication relating to a cultural programme at Khwopa College.",
    url: "https://khwopacollege.edu.np/p/cultural-program-16466",
    archived: true,
    featured: false,
  },
  {
    id: 3,
    title: "Notice for Christmas Day",
    category: "general",
    categoryLabel: "General",
    batch: "Archive",
    published: "Publication date not available",
    description:
      "An archived notice listed on the official Khwopa College website.",
    url: "https://khwopacollege.edu.np/p/notice-for-chirstmas-day-15854",
    archived: true,
    featured: false,
  },
];

const CATEGORIES = [
  { label: "All notices", value: "all" },
  { label: "Admission", value: "admission" },
  { label: "Examination", value: "examination" },
  { label: "Results", value: "results" },
  { label: "Scholarships", value: "scholarship" },
  { label: "Events", value: "events" },
  { label: "General", value: "general" },
];

const CATEGORY_STYLES = {
  admission: "bg-blue-50 text-blue-800",
  examination: "bg-purple-50 text-purple-800",
  results: "bg-emerald-50 text-emerald-800",
  scholarship: "bg-amber-50 text-amber-800",
  events: "bg-orange-50 text-orange-800",
  general: "bg-slate-100 text-slate-700",
};

const ROUTE_CATEGORY_MAP = {
  admissions: "admission",
  examination: "examination",
  examinations: "examination",
  results: "results",
  scholarship: "scholarship",
  scholarships: "scholarship",
  events: "events",
  general: "general",
};

const HERO_CONTENT = {
  examination: {
    eyebrow: "Academic information | Khwopa College",
    title: "Examination",
    emphasis: "notices and updates.",
    description:
      "Find examination schedules, form deadlines, instructions and archived academic announcements in one place.",
  },
  results: {
    eyebrow: "Academic information | Khwopa College",
    title: "Examination",
    emphasis: "results and updates.",
    description:
      "Find published result announcements and related academic notices in one place.",
  },
  scholarship: {
    eyebrow: "Student opportunity | Khwopa College",
    title: "Scholarship",
    emphasis: "notices and updates.",
    description:
      "Find scholarship announcements, eligibility information and archived references in one place.",
  },
  admission: {
    eyebrow: "Admission information | Khwopa College",
    title: "Admission",
    emphasis: "notices and updates.",
    description:
      "Find application announcements, eligibility information and important admission updates in one place.",
  },
};

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mb-9">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#a98545]">
        {eyebrow}
      </p>

      <h2 className="font-serif text-3xl font-semibold leading-tight text-[#10243b] md:text-4xl">
        {title}
      </h2>

      {description && (
        <p className="editorial-copy mt-4 max-w-2xl text-[15px] leading-7 text-slate-600 md:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

function NoticeBadge({ category, label }) {
  const style =
    CATEGORY_STYLES[category] || "bg-slate-100 text-slate-700";

  return (
    <span
      className={`inline-flex rounded-md px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider ${style}`}
    >
      {label}
    </span>
  );
}

function NoticeCard({ notice, isExpanded, onToggleExpand }) {
  const isExternal = notice.url?.startsWith("http");

  return (
    <article
      className={`group flex h-full flex-col justify-between overflow-hidden rounded-2xl border bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#b99754] hover:shadow-lg ${
        notice.featured
          ? "border-2 border-[#c5a15d]"
          : "border-[#e5ddce]"
      }`}
    >
      <div>
        {notice.image && (
          <div className="aspect-[16/9] w-full overflow-hidden bg-slate-100 border-b border-[#eee9df]">
            <img
              src={notice.image}
              alt={notice.title}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        )}

        <div className="p-6 md:p-7">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <NoticeBadge
                category={notice.category}
                label={notice.categoryLabel}
              />
              {!notice.archived ? (
                <span className="rounded-md bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                  Live Circular
                </span>
              ) : (
                <span className="rounded-md bg-[#f1eee7] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Archived
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={onToggleExpand}
              title={isExpanded ? "Collapse notice" : "Expand to read full notice"}
              aria-expanded={isExpanded}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#e5ddce] bg-[#fbfaf7] px-2.5 py-1.5 text-[11px] font-bold text-[#10243b] transition hover:border-[#c5a15d] hover:text-[#98753c]"
            >
              <span>{isExpanded ? "Collapse" : "Expand"}</span>
              <svg
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  isExpanded ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>

          <div className="mt-5">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-[#98753c]">{notice.batch}</span>
              <span>{notice.published}</span>
            </div>

            <h3 className="mt-2.5 font-serif text-xl font-bold leading-snug text-[#12243a] transition group-hover:text-[#98753c] md:text-2xl">
              {notice.title}
            </h3>

            <p
              className={`editorial-copy mt-3 text-xs sm:text-sm leading-7 text-[#475365] whitespace-pre-line ${
                isExpanded ? "" : "line-clamp-3"
              }`}
            >
              {notice.description}
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6 pt-4 md:px-7 border-t border-[#eee9df] flex flex-wrap items-center justify-between gap-3 bg-[#fbfaf7]/60">
        <button
          type="button"
          onClick={onToggleExpand}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8c6d37] hover:text-[#10243b] transition"
        >
          <span>{isExpanded ? "Show less" : "Read full circular"}</span>
          <svg
            className={`h-3.5 w-3.5 transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isExternal ? (
          <a
            href={notice.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#12243a] transition hover:text-[#92703b]"
          >
            <span>Original source</span>
            <span aria-hidden="true">↗</span>
          </a>
        ) : (
          <Link
            to={notice.url}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#12243a] transition hover:text-[#92703b]"
          >
            <span>Open notice page</span>
            <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>
    </article>
  );
}

function EmptyState({ category, search }) {
  return (
    <div className="rounded-lg border border-dashed border-[#d8d0c1] bg-white px-6 py-16 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f1eee7] text-2xl text-[#a98545]">
        <span aria-hidden="true">⌕</span>
      </div>

      <h3 className="mt-5 font-serif text-2xl font-semibold text-[#10243b]">
        {search ? "No matching notices" : "No notices in this category"}
      </h3>

      <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500">
        {search
          ? "Try another search term or remove some filters."
          : `No verified archived ${category === "all" ? "" : category} notices are currently listed here. Check the official college website for additional announcements.`}
      </p>

      <a
        href={COLLEGE_WEBSITE}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#10243b] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1c3857]"
      >
        Visit official website <span aria-hidden="true">↗</span>
      </a>
    </div>
  );
}

function NoticePage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const routeCategory = ROUTE_CATEGORY_MAP[category] || "all";
  const activeCategory = routeCategory;
  const heroContent = HERO_CONTENT[activeCategory] || {
    eyebrow: "Stay informed | Khwopa College",
    title: "Information that",
    emphasis: "keeps you connected.",
    description:
      "Find college announcements, admission information, examination updates, scholarship notices and important academic communications.",
  };
  const [search, setSearch] = useState("");
  const [showArchived, setShowArchived] = useState(true);
  const [expandedCards, setExpandedCards] = useState({});
  const [showAllNotices, setShowAllNotices] = useState(false);

  const toggleCardExpand = (id) => {
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Fetch dynamic notices from MERN backend
  const { data: apiResponse } = useQuery({
    queryKey: ["notices"],
    queryFn: () => api.getNotices(),
  });

  const combinedNotices = useMemo(() => {
    const liveNotices = (apiResponse?.data || []).map((n, index) => ({
      id: n._id || n.slug || index,
      title: n.title,
      category: (n.category || "general").toLowerCase(),
      categoryLabel: n.category || "General",
      batch: "Official +2 Circular",
      published: n.publishedAt
        ? new Date(n.publishedAt).toLocaleDateString("en-GB", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : "Recent Circular",
      description: n.content,
      image: n.attachment?.url || "",
      url: `/notice/${n.slug || n._id}`,
      archived: false,
      featured: n.isPinned || index === 0,
    }));
    return liveNotices.length > 0 ? liveNotices : NOTICES;
  }, [apiResponse]);

  const filteredNotices = useMemo(() => {
    return combinedNotices.filter((notice) => {
      const matchesCategory =
        activeCategory === "all" ||
        notice.category === activeCategory;

      const searchText = search.trim().toLowerCase();

      const matchesSearch =
        !searchText ||
        [
          notice.title,
          notice.description,
          notice.categoryLabel,
          notice.batch,
        ]
          .join(" ")
          .toLowerCase()
          .includes(searchText);

      const matchesArchive = showArchived || !notice.archived;

      return (
        matchesCategory &&
        matchesSearch &&
        matchesArchive
      );
    });
  }, [combinedNotices, activeCategory, search, showArchived]);

  const activeCount = combinedNotices.filter(
    (notice) => !notice.archived
  ).length;

  const visibleNotices = showAllNotices
    ? filteredNotices
    : filteredNotices.slice(0, 6);
  const remainingCount = Math.max(0, filteredNotices.length - 6);

  return (
    <main className="min-h-screen bg-[#f7f5f0] text-[#17283c]">
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-[#091b30] text-white">
        <div className="absolute inset-0 -z-10">
          <img
            src={CAMPUS_IMAGE}
            alt="Khwopa College campus in Bhaktapur"
            className="h-full w-full object-cover object-center opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07182b] via-[#0b2038]/95 to-[#0b2038]/65" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07182b]/65 to-transparent" />
        </div>
        <div className="pointer-events-none absolute -right-20 -top-36 -z-10 h-[430px] w-[430px] rounded-full border border-[#dfbd77]/10" />
        <div className="pointer-events-none absolute -right-5 -top-20 -z-10 h-[290px] w-[290px] rounded-full border border-[#dfbd77]/10" />

        <div className="mx-auto max-w-[1380px] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <nav className="flex flex-wrap items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55">
            <Link to="/" className="transition hover:text-[#dfbd77]">
              Home
            </Link>

            <span>/</span>

            <span className="text-[#dfbd77]">
              Notice Board
            </span>
          </nav>

          <div className="mt-12 max-w-4xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-9 bg-[#b99754]" />
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#a17c3d]">
              Stay informed | Khwopa College
              </p>
            </div>

            <h1 className="font-serif text-5xl leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[78px]">
              {heroContent.title}
              <span className="block italic text-[#dfbd77]">
                {heroContent.emphasis}
              </span>
            </h1>

            <p className="editorial-copy mt-7 max-w-2xl text-[15px] leading-7 text-white/70 sm:text-base">
              {heroContent.description}
            </p>

            <a
              href="#notice-list"
              className="hidden"
            >
              Browse notices <span aria-hidden="true">↓</span>
            </a>
          </div>

          <div className="mt-14 grid max-w-3xl grid-cols-2 gap-8 border-t border-white/15 pt-7 sm:grid-cols-3">
            <div>
              <p className="font-serif text-3xl text-[#dfbd77]">
                06
              </p>
              <p className="mt-2 text-[9px] uppercase tracking-[0.16em] text-white/50">
                Notice categories
              </p>
            </div>

            <div className="border-l border-white/15 pl-5 md:pl-8">
              <p className="font-serif text-2xl text-white">
                {String(activeCount).padStart(2, "0")}
              </p>
              <p className="mt-2 text-[9px] uppercase tracking-[0.16em] text-white/50">
                Current verified notices
              </p>
            </div>

            <div className="border-l border-white/15 pl-5 md:pl-8">
              <p className="font-serif text-2xl text-white">
                {String(NOTICES.length).padStart(2, "0")}
              </p>
              <p className="mt-2 text-[9px] uppercase tracking-[0.16em] text-white/50">
                Archived references
              </p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 h-px w-full bg-[#dfbd77]/50" />
      </section>

      {/* NOTICE STATUS */}
      <section className="mx-auto max-w-7xl px-5 pt-12 sm:px-8 md:pt-16">
        <div className="flex flex-col gap-5 rounded-lg border border-[#e5d9bd] bg-[#fbf8f1] p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#eee6d4] text-xl text-[#8c6d37]">
              !
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.17em] text-[#a98545]">
                Notice board information
              </p>

              <h2 className="mt-2 font-serif text-xl font-semibold text-[#10243b] md:text-2xl">
                Check official announcements for current updates.
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
                The notices currently listed here are archived references.
                No current admission, examination or result announcement
                has been independently verified for this page.
              </p>
            </div>
          </div>

          <a
            href={COLLEGE_WEBSITE}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-[#10243b] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#1c3857]"
          >
            Official college website <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      {/* NOTICE LIST */}
      <section
        id="notice-list"
        className="mx-auto max-w-7xl scroll-mt-20 px-5 py-16 sm:px-8 md:py-24"
      >
        <SectionHeading
          eyebrow="College announcements"
          title="Browse the notice board."
          description="Search notices or select a category to find the information you are looking for."
        />

        {/* SEARCH */}
        <div className="rounded-lg border border-[#e8e2d6] bg-white p-4 md:p-5">
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="relative flex-1">
              <svg
                className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <circle cx="11" cy="11" r="7" />
                <path
                  d="m20 20-4-4"
                  strokeLinecap="round"
                />
              </svg>

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search notices, scholarships, examinations..."
                className="w-full rounded-md border border-[#e8e2d6] bg-[#fbfaf7] py-3.5 pl-12 pr-4 text-sm text-[#10243b] outline-none transition placeholder:text-slate-400 focus:border-[#c5a15d] focus:ring-2 focus:ring-[#c5a15d]/15"
              />
            </div>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                navigate("/notices");
              }}
              className="rounded-md border border-[#ded7ca] px-5 py-3 text-sm font-semibold text-[#536174] transition hover:border-[#c5a15d] hover:text-[#10243b]"
            >
              Clear filters
            </button>
          </div>

          {/* CATEGORY FILTERS */}
          <div className="mt-5 flex flex-wrap gap-2">
            {CATEGORIES.map((category) => {
              const selected =
                activeCategory === category.value;

              return (
                <button
                  key={category.value}
                  type="button"
                  onClick={() =>
                    navigate(
                      category.value === "all"
                        ? "/notices"
                        : `/notices/${category.value}`,
                    )
                  }
                  aria-pressed={selected}
                  className={`rounded-md px-4 py-2.5 text-xs font-semibold transition ${
                    selected
                      ? "bg-[#10243b] text-white"
                      : "border border-[#e8e2d6] bg-white text-slate-600 hover:border-[#c5a15d] hover:text-[#10243b]"
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* RESULTS HEADING */}
        <div className="mb-6 mt-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="font-serif text-2xl font-semibold text-[#10243b]">
              {activeCategory === "all"
                ? "College notices"
                : CATEGORIES.find(
                    (item) => item.value === activeCategory
                  )?.label}
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              {filteredNotices.length} notice
              {filteredNotices.length === 1 ? "" : "s"} found
            </p>
          </div>

          <label className="flex cursor-pointer items-center gap-3 text-xs font-medium text-slate-600">
            <input
              type="checkbox"
              checked={showArchived}
              onChange={(event) =>
                setShowArchived(event.target.checked)
              }
              className="h-4 w-4 accent-[#10243b]"
            />
            Show archived notices
          </label>
        </div>

        {/* NOTICE CARDS */}
        {filteredNotices.length > 0 ? (
          <>
            {/* Top Highlighted Spotlight Notice */}
            {visibleNotices.length > 0 && (
              <div className="mb-8 rounded-2xl border-2 border-[#c5a15d] bg-white p-6 sm:p-8 shadow-md">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-[#c5a15d] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#10243b]">
                      Latest Highlighted Notice
                    </span>
                    <NoticeBadge
                      category={visibleNotices[0].category}
                      label={visibleNotices[0].categoryLabel}
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-slate-500">
                      {visibleNotices[0].published}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleCardExpand(visibleNotices[0].id)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#e5ddce] bg-[#fbfaf7] px-3 py-1.5 text-xs font-bold text-[#10243b] transition hover:border-[#c5a15d]"
                    >
                      <span>
                        {expandedCards[visibleNotices[0].id]
                          ? "Collapse details"
                          : "Expand full circular"}
                      </span>
                      <svg
                        className={`h-4 w-4 transition-transform duration-200 ${
                          expandedCards[visibleNotices[0].id] ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <h3 className="mt-4 font-serif text-2xl sm:text-3xl font-bold text-[#10243b]">
                  {visibleNotices[0].title}
                </h3>

                <p
                  className={`editorial-copy mt-3 text-sm sm:text-base leading-8 text-[#475365] whitespace-pre-line ${
                    expandedCards[visibleNotices[0].id] ? "" : "line-clamp-3"
                  }`}
                >
                  {visibleNotices[0].description}
                </p>

                <div className="mt-5 pt-4 border-t border-[#eee9df] flex flex-wrap items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => toggleCardExpand(visibleNotices[0].id)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8c6d37] hover:text-[#10243b]"
                  >
                    <span>
                      {expandedCards[visibleNotices[0].id]
                        ? "Show less"
                        : "Read complete notice text"}
                    </span>
                    <svg
                      className={`h-3.5 w-3.5 transition-transform duration-200 ${
                        expandedCards[visibleNotices[0].id] ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {visibleNotices[0].url?.startsWith("http") ? (
                    <a
                      href={visibleNotices[0].url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#10243b] hover:text-[#98753c]"
                    >
                      <span>View original circular</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    <Link
                      to={visibleNotices[0].url}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#10243b] hover:text-[#98753c]"
                    >
                      <span>Open dedicated notice page</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  )}
                </div>
              </div>
            )}

            {/* Remaining Notice Cards Grid */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {visibleNotices.map((notice) => (
                <NoticeCard
                  key={notice.id}
                  notice={notice}
                  isExpanded={Boolean(expandedCards[notice.id])}
                  onToggleExpand={() => toggleCardExpand(notice.id)}
                />
              ))}
            </div>

            {/* Expand / Collapse All Remaining Notices Button */}
            {filteredNotices.length > 6 && (
              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={() => setShowAllNotices((prev) => !prev)}
                  className="inline-flex items-center gap-2.5 rounded-xl border-2 border-[#10243b] bg-white px-6 py-3.5 text-xs sm:text-sm font-bold text-[#10243b] shadow-sm transition hover:bg-[#10243b] hover:text-white"
                >
                  <span>
                    {showAllNotices
                      ? "Show fewer notices"
                      : `Expand to read all remaining notices (${remainingCount} more)`}
                  </span>
                  <svg
                    className={`h-4 w-4 transition-transform duration-200 ${
                      showAllNotices ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
            )}
          </>
        ) : (
          <EmptyState
            category={activeCategory}
            search={search}
          />
        )}
      </section>

      {/* CATEGORY QUICK ACCESS */}
      <section className="bg-[#f0ede5] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Information centre"
            title="Find the announcement you need."
            description="The notice board is organised around the main types of academic and college announcements."
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Admissions",
                description:
                  "Application announcements, admission procedures and important deadlines.",
                category: "admission",
                number: "01",
              },
              {
                title: "Examinations",
                description:
                  "Examination schedules, form deadlines and examination instructions.",
                category: "examination",
                number: "02",
              },
              {
                title: "Results",
                description:
                  "Published examination results and academic result announcements.",
                category: "results",
                number: "03",
              },
              {
                title: "Scholarships",
                description:
                  "Scholarship announcements, eligibility and application information.",
                category: "scholarship",
                number: "04",
              },
              {
                title: "Events",
                description:
                  "College programmes, cultural activities and important events.",
                category: "events",
                number: "05",
              },
              {
                title: "General",
                description:
                  "Other important notices and college-wide announcements.",
                category: "general",
                number: "06",
              },
            ].map((item) => (
              <button
                key={item.category}
                type="button"
                onClick={() => {
                  navigate(`/notices/${item.category}`);
                  setSearch("");
                  setShowArchived(true);

                  document
                    .getElementById("notice-list")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group rounded-lg border border-[#e4ddd0] bg-white p-6 text-left transition hover:-translate-y-1 hover:border-[#c5a15d]/60 hover:shadow-[0_15px_35px_rgba(16,36,59,0.06)]"
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-2xl font-semibold text-[#b99754]">
                    {item.number}
                  </span>

                  <span className="text-lg text-[#a98545] transition group-hover:translate-x-1">
                    →
                  </span>
                </div>

                <h3 className="mt-6 font-serif text-xl font-semibold text-[#10243b]">
                  {item.title}
                </h3>

                <p className="editorial-copy mt-3 text-[15px] leading-7 text-slate-500">
                  {item.description}
                </p>

                <p className="mt-5 text-xs font-bold uppercase tracking-wider text-[#98753c]">
                  Browse category
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* OFFICIAL SOURCE */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Official information"
              title="Always verify important announcements."
              description="Use the original college publication when checking deadlines, examination details, application instructions or scholarship conditions."
            />

            <p className="editorial-copy text-[15px] leading-8 text-slate-600">
              This notice board is currently a frontend catalogue of
              verified references. It does not yet receive live updates
              automatically from the college website.
            </p>
          </div>

          <div className="rounded-lg bg-[#10243b] p-8 text-white md:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#dfbd77]">
              Khwopa College
            </p>

            <h3 className="mt-4 font-serif text-2xl font-semibold leading-snug">
              Visit the official college website for the latest notices.
            </h3>

            <p className="editorial-copy mt-4 text-[15px] leading-7 text-white/60">
              Confirm the original announcement before acting on any
              admission, scholarship or examination information.
            </p>

            <a
              href={COLLEGE_WEBSITE}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-md bg-[#dfbd77] px-6 py-3 text-sm font-bold text-[#10243b] transition hover:bg-[#edcf91]"
            >
              Visit Khwopa College <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="border-t border-[#e8e2d6] bg-[#fbfaf7]">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-12 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a98545]">
              Explore Khwopa College
            </p>

            <h2 className="mt-3 font-serif text-2xl font-semibold text-[#10243b] md:text-3xl">
              Continue exploring academic opportunities.
            </h2>
          </div>

          <Link
            to="/academics"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-[#10243b] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#1c3857]"
          >
            Explore programmes <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}

export default NoticePage;
