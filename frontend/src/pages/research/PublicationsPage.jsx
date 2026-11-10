import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import PageHero from "../../components/common/PageHero";
import PageContainer from "../../components/common/PageContainer";
import SectionHeading from "../../components/common/SectionHeading";
import SearchBar from "../../components/common/SearchBar";
import FilterBar from "../../components/common/FilterBar";
import EmptyState from "../../components/common/EmptyState";
import CTASection from "../../components/common/CTASection";
import { researchData } from "../../data/researchData";
import { api } from "../../services/api";

export default function PublicationsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Economics & Governance", "Environmental Science", "Social Work & Psychology"];

  // Fetch dynamic research from backend MongoDB
  const { data: remoteResearch } = useQuery({
    queryKey: ['research'],
    queryFn: () => api.getResearch(),
    staleTime: 60000,
    retry: 1
  });

  const publicationList = useMemo(() => {
    if (remoteResearch?.data && Array.isArray(remoteResearch.data) && remoteResearch.data.length > 0) {
      return remoteResearch.data.map(pub => ({
        ...pub,
        authors: pub.author || pub.authors || 'Khwopa Faculty',
        volume: pub.volume || 'Vol. XII',
        doi: pub.doi || '10.3126/kjr.v12i1',
        fileSize: pub.fileSize || 'PDF (1.2 MB)'
      }));
    }
    return researchData.publications;
  }, [remoteResearch]);

  const filtered = useMemo(() => {
    return publicationList.filter((pub) => {
      const title = pub.title || "";
      const authors = pub.authors || pub.author || "";
      const journal = pub.journal || "";

      const matchesSearch =
        title.toLowerCase().includes(search.toLowerCase()) ||
        authors.toLowerCase().includes(search.toLowerCase()) ||
        journal.toLowerCase().includes(search.toLowerCase());

      const matchesCat =
        activeCategory === "All" || pub.category === activeCategory;

      return matchesSearch && matchesCat;
    });
  }, [publicationList, search, activeCategory]);

  return (
    <main className="bg-[#f7f5f0] min-h-screen">
      <PageHero
        eyebrow="Research & Publications"
        title="Scholarly Publications."
        italicTitle="Peer-Reviewed Monograph Index."
        description="A curated index of peer-reviewed scientific articles, book chapters, and policy whitepapers authored by Khwopa faculty scholars."
        breadcrumbs={[
          { label: "Research", to: "/research" },
          { label: "Publications" }
        ]}
        stats={[
          { label: "Indexation", value: "NepJOL / Scopus" },
          { label: "Access", value: "Open Access" },
          { label: "Faculty Scholars", value: "35+ Active" }
        ]}
      />

      <section className="py-16 sm:py-24">
        <PageContainer>
          <SectionHeading
            eyebrow="Catalogue"
            title="Peer-Reviewed Articles & Papers"
            italicTitle="by Academic Department."
            description="Explore research contributions across economic policy, public health, hydrology, and sociology."
          />

          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#e5ddce] pb-6">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search publications by title, author, or keyword..."
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
              title="No publications found"
              description="No article matches your search keyword. Try clearing your search."
              onReset={() => {
                setSearch("");
                setActiveCategory("All");
              }}
            />
          ) : (
            <div className="space-y-6">
              {filtered.map((pub) => (
                <div
                  key={pub.slug}
                  className="rounded-2xl border border-[#e5ddce] bg-white p-7 sm:p-9 shadow-sm transition hover:border-[#b99754]"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <span className="rounded-md bg-[#dfbd77]/20 px-2.5 py-0.5 text-xs font-bold text-[#92703b]">
                      {pub.category}
                    </span>
                    <span className="text-xs text-slate-400">
                      Published: {pub.year} · {pub.fileSize}
                    </span>
                  </div>

                  <h3 className="mt-3 font-serif text-2xl font-bold text-[#12243a]">
                    {pub.title}
                  </h3>

                  <p className="mt-2 text-xs font-semibold text-[#92703b]">
                    {pub.authors}
                  </p>

                  <p className="mt-1 text-xs text-slate-500 italic">
                    {pub.journal} ({pub.volume}) · DOI: {pub.doi}
                  </p>

                  <p className="editorial-copy mt-4 text-[15px] leading-7 text-[#475365]">
                    <span className="font-bold text-[#12243a] font-serif not-italic">Abstract: </span>
                    {pub.abstract}
                  </p>

                  <div className="mt-6 border-t border-slate-100 pt-5 flex items-center justify-between">
                    <span className="text-xs text-slate-400">
                      Peer-reviewed publication
                    </span>
                    <a
                      href="https://www.nepjol.info"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-[#0b2038] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#17334c]"
                    >
                      <span>Access via NepJOL</span>
                      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </PageContainer>
      </section>

      <CTASection
        title="Interested in Academic Publishing?"
        description="Read submission guidelines for the Khwopa Journal and submit your manuscript for peer review."
        primaryAction={{ label: "Khwopa Journal", to: "/research/journal" }}
        secondaryAction={{ label: "Research Cell", to: "/research/management-cell" }}
      />
    </main>
  );
}
