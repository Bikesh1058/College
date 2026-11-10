import PageHero from "../../components/common/PageHero";
import PageContainer from "../../components/common/PageContainer";
import SectionHeading from "../../components/common/SectionHeading";
import CTASection from "../../components/common/CTASection";
import { researchData } from "../../data/researchData";

export default function JournalPage() {
  const { journal } = researchData;

  return (
    <main className="bg-[#f7f5f0] min-h-screen">
      <PageHero
        eyebrow="Research & Publications"
        title="Khwopa Journal."
        italicTitle="Peer-Reviewed Multi-Disciplinary Archive."
        description="A bi-annual, peer-reviewed multi-disciplinary journal published by Khwopa College and indexed on Nepal Journals Online (NepJOL)."
        breadcrumbs={[
          { label: "Research", to: "/research" },
          { label: "Khwopa Journal" }
        ]}
        stats={[
          { label: "Indexing", value: "NepJOL / INASP" },
          { label: "Frequency", value: "Bi-Annual" },
          { label: "Print ISSN", value: "2091-0371" }
        ]}
      />

      <section className="py-16 sm:py-24">
        <PageContainer>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <SectionHeading
                eyebrow="Journal Information"
                title={journal.name}
                description="Promoting rigorous multi-disciplinary inquiry across social sciences, management, literature, and applied sciences."
              />

              <div className="rounded-2xl border border-[#e5ddce] bg-white p-7 shadow-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs sm:text-sm">
                  <div>
                    <span className="text-slate-400">ISSN Details</span>
                    <p className="font-bold text-[#12243a] mt-0.5">{journal.issn}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Indexing Platform</span>
                    <p className="font-bold text-[#12243a] mt-0.5">{journal.indexing}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Editor-in-Chief</span>
                    <p className="font-bold text-[#12243a] mt-0.5">{journal.editorInChief}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Frequency</span>
                    <p className="font-bold text-[#12243a] mt-0.5">{journal.issuesPerYear}</p>
                  </div>
                </div>
              </div>

              {/* Published Volumes */}
              <div className="mt-12">
                <h3 className="font-serif text-2xl font-bold text-[#12243a]">
                  Archived Issues & Volumes
                </h3>
                <div className="mt-5 space-y-4">
                  {journal.volumes.map((vol, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-[#e5ddce] bg-white p-6 shadow-sm transition hover:border-[#b99754]"
                    >
                      <div>
                        <h4 className="font-serif text-lg font-bold text-[#12243a]">
                          {vol.vol}
                        </h4>
                        <p className="text-xs text-slate-500 mt-1">
                          {vol.articlesCount} · Published {vol.date}
                        </p>
                      </div>
                      <a
                        href={vol.nepjolUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-xl bg-[#0b2038] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#17334c]"
                      >
                        <span>Read on NepJOL</span>
                        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="rounded-2xl border border-[#e5ddce] bg-white p-7 shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#92703b]">
                  Author Guidelines
                </span>
                <h4 className="mt-2 font-serif text-xl font-bold text-[#12243a]">
                  Manuscript Preparation
                </h4>
                <ul className="mt-4 space-y-3">
                  {journal.guidelines.map((g, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-[#475365]">
                      <span className="text-[#dfbd77] font-bold">✓</span>
                      <span>{g}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-[#091b30] bg-[#091b30] p-7 text-white shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#dfbd77]">
                  Call for Papers
                </span>
                <h4 className="mt-2 font-serif text-xl font-bold">
                  Next Issue: December 2026
                </h4>
                <p className="editorial-copy mt-2 text-xs leading-relaxed text-white/70">
                  Submissions open until 15 November 2026. Send manuscript drafts to <span className="text-[#dfbd77] font-semibold not-italic">journal@khwopacollege.edu.np</span>.
                </p>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      <CTASection
        title="Explore Academic Conferences & Colloquiums"
        description="Learn about national research conferences hosted at Khwopa College."
        primaryAction={{ label: "View Conferences", to: "/research/conferences" }}
        secondaryAction={{ label: "Research Overview", to: "/research" }}
      />
    </main>
  );
}
