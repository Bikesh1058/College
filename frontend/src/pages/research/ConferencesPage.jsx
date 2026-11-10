import PageHero from "../../components/common/PageHero";
import PageContainer from "../../components/common/PageContainer";
import SectionHeading from "../../components/common/SectionHeading";
import CTASection from "../../components/common/CTASection";
import { researchData } from "../../data/researchData";

export default function ConferencesPage() {
  return (
    <main className="bg-[#f7f5f0] min-h-screen">
      <PageHero
        eyebrow="Research & Publications"
        title="Conferences & Seminars."
        italicTitle="National Academic Colloquiums."
        description="National and regional academic colloquiums on economics, social transformation, environmental science, and municipal governance."
        breadcrumbs={[
          { label: "Research", to: "/research" },
          { label: "Conferences & Seminars" }
        ]}
        stats={[
          { label: "Conference Level", value: "National & Regional" },
          { label: "Proceedings", value: "ISBN Catalogued" },
          { label: "Venue", value: "Khwopa Central Hall" }
        ]}
      />

      <section className="py-16 sm:py-24">
        <PageContainer>
          <SectionHeading
            eyebrow="Scholarly Gatherings"
            title="Conferences & Proceedings"
            italicTitle="Deliberating Future Policy."
            description="Bringing together university professors, young scholars, and industry practitioners to deliberate on pressing developmental challenges."
          />

          <div className="space-y-8">
            {researchData.conferences.map((conf) => (
              <div
                key={conf.slug}
                className="rounded-2xl border border-[#e5ddce] bg-white p-7 sm:p-9 shadow-sm transition hover:border-[#b99754]"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-[#e5ddce] pb-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#92703b]">
                      Dates: {conf.dates}
                    </span>
                    <h3 className="mt-1 font-serif text-2xl font-bold text-[#12243a]">
                      {conf.title}
                    </h3>
                  </div>
                  <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                    conf.status.includes("Open")
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-slate-100 text-slate-700"
                  }`}>
                    {conf.status}
                  </span>
                </div>

                <div className="mt-4 text-xs sm:text-sm text-slate-500">
                  <span className="font-semibold text-slate-700">Venue: </span>
                  {conf.venue}
                </div>

                <div className="mt-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#12243a]">
                    Conference Tracks:
                  </h4>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {conf.tracks.map((t, idx) => (
                      <span
                        key={idx}
                        className="rounded-lg bg-[#fbfaf7] border border-[#e5ddce] px-3 py-1 text-xs text-[#475365]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 border-t border-slate-100 pt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <span className="text-xs text-slate-500 font-medium">
                    {conf.publishedProceedings}
                  </span>
                  <a
                    href="mailto:rmc@khwopacollege.edu.np"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-[#0b2038] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#17334c]"
                  >
                    <span>Inquire for Participation</span>
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      <CTASection
        title="Looking to Present Your Research?"
        description="Connect with the Research Management Cell to learn about abstract submission and upcoming colloquiums."
        primaryAction={{ label: "Contact RMC", to: "/research/management-cell" }}
        secondaryAction={{ label: "Research Overview", to: "/research" }}
      />
    </main>
  );
}
