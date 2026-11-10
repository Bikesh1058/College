import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PageHero from "../../components/common/PageHero";
import PageContainer from "../../components/common/PageContainer";
import SectionHeading from "../../components/common/SectionHeading";
import SearchBar from "../../components/common/SearchBar";
import FilterBar from "../../components/common/FilterBar";
import EmptyState from "../../components/common/EmptyState";
import CTASection from "../../components/common/CTASection";
import { newsData as localNews } from "../../data/newsData";
import { api } from "../../services/api";

export default function NewsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedArticles, setExpandedArticles] = useState({});
  const [showAllArticles, setShowAllArticles] = useState(false);

  const toggleExpandArticle = (id) => {
    setExpandedArticles((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const categories = ["All", "Institutional", "Achievement", "Research", "Academic"];

  // Fetch dynamic news from MongoDB
  const { data: remoteData } = useQuery({
    queryKey: ['news'],
    queryFn: () => api.getNews(),
    staleTime: 60000,
    retry: 1
  });

  const newsList = useMemo(() => {
    const live = (remoteData?.data || []).map((item) => ({
      ...item,
      id: item._id || item.slug,
      summary: item.excerpt || item.summary || item.title,
      fullText: Array.isArray(item.content)
        ? item.content.join("\n\n")
        : item.content || item.excerpt || item.summary || "",
      isLive: true
    }));
    const localFormatted = localNews.map((item) => ({
      ...item,
      id: item.slug,
      fullText: Array.isArray(item.content)
        ? item.content.join("\n\n")
        : item.content || item.summary || "",
      isLive: false
    }));
    if (live.length > 0) {
      return live;
    }
    return localFormatted;
  }, [remoteData]);

  const filtered = useMemo(() => {
    return newsList.filter((article) => {
      const matchesSearch =
        (article.title || "").toLowerCase().includes(search.toLowerCase()) ||
        (article.summary || "").toLowerCase().includes(search.toLowerCase());

      const matchesCat =
        activeCategory === "All" || article.category === activeCategory;

      return matchesSearch && matchesCat;
    });
  }, [newsList, search, activeCategory]);

  return (
    <main className="bg-[#f7f5f0] min-h-screen">
      <PageHero
        eyebrow="Media & Releases"
        title="College News & Stories."
        italicTitle="Chronicles of Achievement."
        description="Official stories, student achievements, institutional celebrations, and faculty advancements from Khwopa College."
        breadcrumbs={[{ label: "News" }]}
        stats={[
          { label: "Reporting", value: "Media Bureau" },
          { label: "Coverage", value: "Institutional" },
          { label: "Community", value: "Bhaktapur" }
        ]}
      />

      <section className="py-16 sm:py-24">
        <PageContainer>
          <SectionHeading
            eyebrow="Campus Reporting"
            title="Recent Institutional Stories"
            italicTitle="& Student Milestones."
            description="Explore the latest milestones, academic honors, and developments at Khwopa College."
          />

          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#e5ddce] pb-6">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search news articles by keyword..."
              className="w-full sm:max-w-md"
            />
            <FilterBar
              options={categories}
              activeOption={activeCategory}
              onChange={setActiveCategory}
            />
          </div>

          {filtered.length === 0 ? (
            <EmptyState
              title="No news articles found"
              description="No article matches your search keyword. Try clearing your filter."
              onReset={() => {
                setSearch("");
                setActiveCategory("All");
              }}
            />
          ) : (
            <>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {(showAllArticles ? filtered : filtered.slice(0, 6)).map((item, idx) => {
                  const keyId = item.id || item.slug || idx;
                  const isExpanded = Boolean(expandedArticles[keyId]);
                  return (
                    <div
                      key={keyId}
                      className={`flex flex-col justify-between overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:border-[#b99754] hover:shadow-lg ${
                        idx === 0 ? "border-2 border-[#c5a15d]" : "border-[#e5ddce]"
                      }`}
                    >
                      <div>
                        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full object-cover transition duration-300 hover:scale-105"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "https://wms.edigitalnepal.com/wms/files/ws-post-images/1678958957817_007be5e2-a1dc-4580-9809-4964d79fa1a0.jpg";
                            }}
                          />
                          {idx === 0 && (
                            <span className="absolute top-3 left-3 rounded-md bg-[#c5a15d] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#10243b] shadow-sm">
                              Latest Highlight
                            </span>
                          )}
                        </div>

                        <div className="p-7">
                          <div className="flex items-center justify-between gap-2 text-xs text-slate-400">
                            <span className="rounded-md bg-[#dfbd77]/20 px-2.5 py-0.5 font-bold text-[#92703b]">
                              {item.category}
                            </span>
                            <div className="flex items-center gap-2">
                              <span>{item.date}</span>
                              <button
                                type="button"
                                onClick={() => toggleExpandArticle(keyId)}
                                title={isExpanded ? "Collapse story" : "Expand to read full story"}
                                className="inline-flex items-center gap-1 rounded-lg border border-[#e5ddce] bg-[#fbfaf7] px-2 py-1 text-[11px] font-bold text-[#12243a] transition hover:border-[#c5a15d]"
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
                          </div>

                          <h3 className="mt-3 font-serif text-xl font-bold text-[#12243a]">
                            {item.title}
                          </h3>

                          <p
                            className={`editorial-copy mt-2 text-xs sm:text-sm leading-relaxed text-[#475365] whitespace-pre-line ${
                              isExpanded ? "" : "line-clamp-3"
                            }`}
                          >
                            {isExpanded ? item.fullText || item.summary : item.summary}
                          </p>
                        </div>
                      </div>

                      <div className="p-7 pt-0 flex items-center justify-between gap-3">
                        <button
                          type="button"
                          onClick={() => toggleExpandArticle(keyId)}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#92703b] hover:text-[#12243a]"
                        >
                          <span>{isExpanded ? "Show less" : "Expand inline"}</span>
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

                        <Link
                          to={`/news/${item.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#12243a] hover:text-[#92703b]"
                        >
                          <span>Read Full Page</span>
                          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filtered.length > 6 && (
                <div className="mt-10 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setShowAllArticles((prev) => !prev)}
                    className="inline-flex items-center gap-2.5 rounded-xl border-2 border-[#12243a] bg-white px-6 py-3.5 text-xs sm:text-sm font-bold text-[#12243a] shadow-sm transition hover:bg-[#12243a] hover:text-white"
                  >
                    <span>
                      {showAllArticles
                        ? "Show fewer articles"
                        : `Expand to read all remaining stories (${filtered.length - 6} more)`}
                    </span>
                    <svg
                      className={`h-4 w-4 transition-transform duration-200 ${
                        showAllArticles ? "rotate-180" : ""
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
          )}
        </PageContainer>
      </section>

      <CTASection
        title="Looking for Official Notices and Announcements?"
        description="Visit the Notice Board for circulars, exam dates, deadlines, and university alerts."
        primaryAction={{ label: "View Notice Board", to: "/notices" }}
        secondaryAction={{ label: "Campus Life", to: "/campus-life" }}
      />
    </main>
  );
}
