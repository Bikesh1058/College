import PageHero from "../../components/common/PageHero";
import PageContainer from "../../components/common/PageContainer";
import SectionHeading from "../../components/common/SectionHeading";
import CTASection from "../../components/common/CTASection";
import { researchData } from "../../data/researchData";

export default function ResearchCellPage() {
  const { rmc } = researchData;

  return (
    <main className="bg-[#f7f5f0] min-h-screen">
      <PageHero
        eyebrow="Research & Publications"
        title="Research Management Cell."
        italicTitle="Institutional Research Oversight."
        description="Fostering an institutional ecosystem of inquiry, ethical review, empirical methodology training, and scholarly publication."
        breadcrumbs={[
          { label: "Research", to: "/research" },
          { label: "Research Management Cell" }
        ]}
        stats={[
          { label: "Coordinator", value: rmc.coordinator },
          { label: "Grants Available", value: "Mini & Team IRG" },
          { label: "Ethics Clearance", value: "Mandatory" }
        ]}
      />

      <section className="py-16 sm:py-24">
        <PageContainer>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <SectionHeading
                eyebrow="Institutional Mandate"
                title="Vision & Objectives of RMC"
                description={rmc.vision}
              />

              <div className="mt-8 rounded-2xl border border-[#e5ddce] bg-white p-8 shadow-sm">
                <h3 className="font-serif text-2xl font-bold text-[#12243a]">
                  Core Responsibilities & Activities
                </h3>
                <ul className="mt-5 space-y-3.5">
                  {rmc.functions.map((fn, idx) => (
                    <li key={idx} className="flex items-start gap-3.5 text-xs sm:text-sm text-[#475365]">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#dfbd77]/20 font-serif text-xs font-bold text-[#92703b]">
                        {idx + 1}
                      </span>
                      <span>{fn}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Research Grant Policy */}
              <div className="mt-10 rounded-2xl border border-[#e5ddce] bg-white p-8 shadow-sm">
                <h3 className="font-serif text-2xl font-bold text-[#12243a]">
                  Institutional Research Grants (IRG)
                </h3>
                <p className="editorial-copy mt-3 text-sm leading-relaxed text-[#475365]">
                  Khwopa College allocates dedicated municipal funds every fiscal year to support mini-research grants awarded to faculty researchers. Selection is conducted via double-blind peer assessment of submitted proposals by external university subject experts.
                </p>
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3 text-xs">
                  <div className="rounded-xl bg-[#fbfaf7] border border-[#e5ddce] p-5">
                    <p className="font-bold text-[#12243a]">Individual Grants</p>
                    <p className="mt-1 text-slate-500">Up to Rs. 75,000 for single investigator field research.</p>
                  </div>
                  <div className="rounded-xl bg-[#fbfaf7] border border-[#e5ddce] p-5">
                    <p className="font-bold text-[#12243a]">Collaborative Grants</p>
                    <p className="mt-1 text-slate-500">Up to Rs. 150,000 for inter-departmental teams.</p>
                  </div>
                  <div className="rounded-xl bg-[#fbfaf7] border border-[#e5ddce] p-5">
                    <p className="font-bold text-[#12243a]">Publication Subsidies</p>
                    <p className="mt-1 text-slate-500">100% APC waiver for high impact indexed journals.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="rounded-2xl border border-[#e5ddce] bg-white p-7 shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#92703b]">
                  Cell Leadership
                </span>
                <h4 className="mt-2 font-serif text-2xl font-bold text-[#12243a]">
                  {rmc.coordinator}
                </h4>
                <p className="text-xs text-slate-500 font-medium">{rmc.coordinatorTitle}</p>
                <p className="mt-4 text-xs text-slate-600">
                  Direct Email: <a href={`mailto:${rmc.email}`} className="font-semibold text-[#92703b] hover:underline">{rmc.email}</a>
                </p>
              </div>

              <div className="rounded-2xl border border-[#091b30] bg-[#091b30] p-7 text-white shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#dfbd77]">
                  Academic Journal
                </span>
                <h4 className="mt-2 font-serif text-xl font-bold">
                  Khwopa Journal (NepJOL)
                </h4>
                <p className="editorial-copy mt-2 text-xs leading-relaxed text-white/70">
                  Read archived volumes or consult the call for papers for the upcoming December edition.
                </p>
                <a
                  href="/research/journal"
                  className="mt-5 inline-flex items-center rounded-xl bg-[#dfbd77] px-4 py-2 text-xs font-bold text-[#091b30] transition hover:bg-[#c9a65d]"
                >
                  Visit Journal Page
                </a>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      <CTASection
        title="Looking for Active Projects or Publications?"
        description="Browse completed empirical assessments and peer-reviewed articles by Khwopa faculty scholars."
        primaryAction={{ label: "View Publications", to: "/research/publications" }}
        secondaryAction={{ label: "Research Activities", to: "/research/activities" }}
      />
    </main>
  );
}
