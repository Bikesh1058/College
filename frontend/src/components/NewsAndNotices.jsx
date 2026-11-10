import { useState } from "react";
import { ArrowRightIcon, ExternalLinkIcon } from "./Icons";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import { newsData as fallbackNewsData } from "../data/newsData";

const defaultStories = fallbackNewsData.map((n) => ({
  id: n.slug,
  category: n.category || "Institutional",
  title: n.title,
  description: n.summary,
  image: n.image,
  date: n.date,
  href: `/news/${n.slug}`,
  isLive: false,
}));

const noticeLinks = [
  {
    id: "adm",
    category: "Admission",
    title: "Admission Scholarship & Intake Guidelines 2082/2083",
    description: "Applications, eligibility criteria and entrance updates for Grade 11.",
    published: "Official Circular",
    href: "/notices/admission",
    isLive: false,
  },
  {
    id: "exam",
    category: "Examination",
    title: "NEB Grade 11 & 12 Terminal and Board Examination Routines",
    description: "Exam forms, seat plans (Center 104) and examination schedules.",
    published: "NEB / Exam Cell",
    href: "/examinations/routines",
    isLive: false,
  },
  {
    id: "sch",
    category: "Scholarship",
    title: "Merit & Municipality Quota Scholarship Announcements",
    description: "Full and partial tuition fee waiver guidelines for +2 streams.",
    published: "Scholarship Committee",
    href: "/notices/scholarship",
    isLive: false,
  },
  {
    id: "gen",
    category: "General",
    title: "Academic Calendar & Institutional Holiday Notifications",
    description: "College-wide administrative circulars and student instructions.",
    published: "Administration",
    href: "/notices",
    isLive: false,
  },
];

const fallbackImage =
  "https://www.cijnepal.org/wp-content/uploads/2018/09/11.jpg";

function handleImageError(event) {
  event.currentTarget.onerror = null;
  event.currentTarget.src = fallbackImage;
}

export default function NewsAndNotices() {
  const [expandedHomeNotices, setExpandedHomeNotices] = useState({});
  const [showAllHomeNotices, setShowAllHomeNotices] = useState(false);

  const toggleHomeNotice = (id) => {
    setExpandedHomeNotices((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const { data: newsResponse } = useQuery({
    queryKey: ["news"],
    queryFn: () => api.getNews(),
    staleTime: 60000,
    retry: 1,
  });

  const { data: noticesResponse } = useQuery({
    queryKey: ["notices"],
    queryFn: () => api.getNotices(),
    staleTime: 60000,
    retry: 1,
  });

  // Merge live DB news at the top with fallback stories so the container is always rich,
  // and index 0 is always the newest highlighted story.
  const liveStories = (newsResponse?.data || []).map((n) => ({
    id: n._id || n.slug,
    category: n.category || "Institutional",
    title: n.title,
    description: n.excerpt || (n.content ? n.content.slice(0, 160) + "..." : ""),
    image: n.image || fallbackImage,
    date:
      n.date ||
      (n.createdAt
        ? new Date(n.createdAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        : "Recently Published"),
    href: `/news/${n.slug || ""}`,
    isLive: true,
  }));

  const allStories = (liveStories.length > 0 ? liveStories : defaultStories).slice(0, 3);

  const featuredStory = allStories[0];
  const secondaryStories = allStories.slice(1, 3);

  // Use live DB notices when available so index 0 is highlighted as Latest Notice
  const liveNotices = (noticesResponse?.data || []).map((n) => ({
    id: n._id || n.slug,
    category: n.category || "General",
    title: n.title,
    description: n.content,
    published:
      n.publishedAt || n.createdAt
        ? new Date(n.publishedAt || n.createdAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        : "Recent Circular",
    href: `/notice/${n.slug || n._id}`,
    isPinned: n.isPinned,
    isLive: true,
  }));

  const allNotices = liveNotices.length > 0 ? liveNotices : noticeLinks;
  const highlightedNotice = allNotices[0];
  const regularNotices = showAllHomeNotices
    ? allNotices.slice(1)
    : allNotices.slice(1, 4);
  const remainingHomeNoticesCount = Math.max(0, allNotices.length - 4);

  return (
    <section id="news" className="bg-white px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-[#a17c3d]">
              What's happening
            </p>

            <h2 className="font-serif text-4xl text-[#12243a] sm:text-5xl lg:text-6xl">
              News & <span className="italic text-[#a17c3d]">notices.</span>
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <Link
              to="/news"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#12243a] transition hover:text-[#9b773d]"
            >
              All news stories <ArrowRightIcon />
            </Link>
            <Link
              to="/notices"
              className="inline-flex items-center gap-3 text-sm font-semibold text-[#9b773d] transition hover:gap-5"
            >
              Explore notices <ArrowRightIcon />
            </Link>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.85fr]">
          {/* LEFT COLUMN: NEWS CONTAINER (Newest takes top spotlight highlight) */}
          <div className="flex flex-col gap-6">
            {featuredStory && (
              <article className="group relative overflow-hidden rounded-2xl border-2 border-[#c5a15d] bg-[#faf9f6] shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="grid md:grid-cols-[1.15fr_1fr]">
                  <div className="relative h-64 md:h-full min-h-[260px] overflow-hidden">
                    <img
                      src={featuredStory.image}
                      alt={featuredStory.title}
                      loading="lazy"
                      onError={handleImageError}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#102238]/60 via-transparent to-transparent" />

                    <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                      <span className="rounded-md bg-[#c5a15d] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#102238] shadow-sm">
                        Latest Highlight
                      </span>
                      <span className="rounded-md bg-[#12243a]/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#e5d0a2]">
                        {featuredStory.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between p-6 sm:p-8">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#9b773d]">
                        {featuredStory.date}
                      </p>

                      <h3 className="mt-2 font-serif text-2xl sm:text-3xl leading-snug text-[#12243a] transition group-hover:text-[#9b773d]">
                        {featuredStory.title}
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-[#5a6573] line-clamp-3">
                        {featuredStory.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#eae5dc] flex items-center justify-between">
                      <Link
                        to={featuredStory.href}
                        className="inline-flex items-center gap-2.5 text-sm font-bold text-[#12243a] group-hover:text-[#9b773d] transition"
                      >
                        Read full story <ExternalLinkIcon />
                      </Link>
                      {featuredStory.isLive && (
                        <span className="rounded bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                          New Release
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            )}

            {/* Secondary Stories Grid */}
            <div className="grid gap-6 sm:grid-cols-2">
              {secondaryStories.map((story) => (
                <article
                  key={story.id || story.title}
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#eae5dc] bg-[#faf9f6] transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div>
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={story.image}
                        alt={story.title}
                        loading="lazy"
                        onError={handleImageError}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-[#102238]/45 to-transparent" />

                      <span className="absolute bottom-3 left-3 rounded-lg bg-[#12243a] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#e5d0a2]">
                        {story.category}
                      </span>
                    </div>

                    <div className="p-6 pb-3">
                      <p className="text-[11px] font-medium text-[#9b773d]">
                        {story.date}
                      </p>
                      <h3 className="mt-1.5 font-serif text-xl leading-snug text-[#12243a] transition group-hover:text-[#9b773d] line-clamp-2">
                        {story.title}
                      </h3>

                      <p className="mt-2.5 text-xs sm:text-sm leading-6 text-[#727b86] line-clamp-2">
                        {story.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2">
                    <Link
                      to={story.href}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9b773d]"
                    >
                      Read story <ExternalLinkIcon />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: NOTICE BOARD CONTAINER (Newest notice highlighted on top) */}
          <aside className="flex flex-col justify-between rounded-2xl bg-[#12243a] p-7 text-white sm:p-9 shadow-lg">
            <div>
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#d2b577]">
                  Official Notice Board
                </p>
                <span className="rounded-md bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#e2c990]">
                  Live Feed
                </span>
              </div>

              <h3 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">
                Important circulars & updates.
              </h3>

              {/* Highlighted Top Notice Card */}
              {highlightedNotice && (
                <div className="mt-6 rounded-xl border-2 border-[#d2b577] bg-[#1a314d] p-5 transition hover:bg-[#213c5c]">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="rounded bg-[#d2b577] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#12243a]">
                      Newest Notice
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold text-[#e2c990]">
                        {highlightedNotice.category} — {highlightedNotice.published}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleHomeNotice(highlightedNotice.id || highlightedNotice.title)}
                        title="Expand or collapse notice details"
                        className="inline-flex items-center gap-1 rounded-md border border-white/20 bg-white/10 px-2 py-0.5 text-[10px] font-bold text-[#e2c990] hover:bg-white/20"
                      >
                        <span>{expandedHomeNotices[highlightedNotice.id || highlightedNotice.title] ? "Less" : "Expand"}</span>
                        <svg
                          className={`h-3 w-3 transition-transform duration-200 ${
                            expandedHomeNotices[highlightedNotice.id || highlightedNotice.title] ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <h4 className="mt-3 font-serif text-lg font-bold leading-snug text-white">
                    {highlightedNotice.title}
                  </h4>

                  {highlightedNotice.description && (
                    <p
                      className={`mt-2 text-xs leading-5 text-[#cbd5e1] whitespace-pre-line ${
                        expandedHomeNotices[highlightedNotice.id || highlightedNotice.title] ? "" : "line-clamp-2"
                      }`}
                    >
                      {highlightedNotice.description}
                    </p>
                  )}

                  <div className="mt-3 flex items-center justify-between gap-3">
                    <Link
                      to={highlightedNotice.href}
                      className="inline-flex items-center gap-2 text-xs font-bold text-[#d2b577] hover:underline"
                    >
                      <span>Open circular page</span>
                      <ArrowRightIcon className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              )}

              {/* Subsequent Notices List */}
              <div className="mt-5 divide-y divide-white/15 border-t border-b border-white/15">
                {regularNotices.map((n) => {
                  const nKey = n.id || n.title;
                  const isExpanded = Boolean(expandedHomeNotices[nKey]);
                  return (
                    <div key={nKey} className="py-4">
                      <div className="flex items-start justify-between gap-3">
                        <Link to={n.href} className="group min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] uppercase font-bold text-[#d2b577] tracking-wider">
                              {n.category || "Notice"}
                            </span>
                            <span className="text-[11px] text-[#8fa1b5]">
                              {n.published}
                            </span>
                          </div>
                          <h4 className="mt-0.5 font-medium text-white transition group-hover:text-[#e2c990] text-sm">
                            {n.title}
                          </h4>
                        </Link>

                        <button
                          type="button"
                          onClick={() => toggleHomeNotice(nKey)}
                          title={isExpanded ? "Collapse" : "Expand to read"}
                          className="inline-flex items-center gap-1 rounded-md border border-white/15 bg-white/5 px-2 py-1 text-[10px] font-bold text-[#d2b577] hover:bg-white/15 shrink-0"
                        >
                          <svg
                            className={`h-3.5 w-3.5 transition-transform duration-200 ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>

                      {isExpanded && n.description && (
                        <div className="mt-2.5 rounded-lg bg-white/5 p-3 text-xs leading-5 text-[#cbd5e1] whitespace-pre-line">
                          <p>{n.description}</p>
                          <Link
                            to={n.href}
                            className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-bold text-[#d2b577] hover:underline"
                          >
                            <span>View full notice page</span>
                            <ArrowRightIcon className="h-3 w-3" />
                          </Link>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {remainingHomeNoticesCount > 0 && (
                <button
                  type="button"
                  onClick={() => setShowAllHomeNotices((prev) => !prev)}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-xs font-bold text-[#e2c990] transition hover:bg-white/10"
                >
                  <span>
                    {showAllHomeNotices
                      ? "Show fewer notices"
                      : `Expand all remaining notices (${remainingHomeNoticesCount} more)`}
                  </span>
                  <svg
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${
                      showAllHomeNotices ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              )}
            </div>

            <Link
              to="/notices"
              className="mt-7 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-[#b99754] px-5 py-4 text-sm font-semibold text-[#12243a] transition hover:bg-[#d2b577]"
            >
              Browse notice board <ArrowRightIcon />
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}

