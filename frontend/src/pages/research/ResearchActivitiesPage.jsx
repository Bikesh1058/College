import PageHero from "../../components/common/PageHero";
import PageContainer from "../../components/common/PageContainer";
import SectionHeading from "../../components/common/SectionHeading";
import CTASection from "../../components/common/CTASection";
import { researchData } from "../../data/researchData";

export default function ResearchActivitiesPage() {
  return (
    <main className="bg-[#f7f5f0] min-h-screen">
      <PageHero
        eyebrow="Research & Publications"
        title="Research Activities & Projects."
        italicTitle="Field Studies & Assessments."
        description="Empirical field assessments, institutional grants, and environmental water tests conducted by Khwopa faculty and researchers."
        breadcrumbs={[
          { label: "Research", to: "/research" },
          { label: "Activities & Projects" }
        ]}
        stats={[
          { label: "Grants Provider", value: "UGC & Municipality" },
          { label: "Regional Focus", value: "Bagmati Province" },
          { label: "Methodology", value: "Empirical & Mixed" }
        ]}
      />

      <section className="py-16 sm:py-24">
        <PageContainer>
          <SectionHeading
            eyebrow="Empirical Fieldwork"
            title="Institutional Research Initiatives"
            italicTitle="& Municipal Impact."
            description="Our research prioritizes sustainable regional development, local micro-enterprises and environmental public health in Bhaktapur."
          />

          <div className="space-y-8">
            {researchData.activities.map((act) => (
              <div
                key={act.slug}
                className="rounded-2xl border border-[#e5ddce] bg-white p-7 sm:p-9 shadow-sm transition hover:border-[#b99754]"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-[#e5ddce] pb-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#92703b]">
                      Funding: {act.funding}
                    </span>
                    <h3 className="mt-1 font-serif text-2xl font-bold text-[#12243a]">
                      {act.title}
                    </h3>
                  </div>
                  <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                    act.status.includes("Completed")
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-amber-100 text-amber-800"
                  }`}>
                    {act.status}
                  </span>
                </div>

                <div className="mt-4 text-xs font-medium text-slate-500">
                  <span className="font-semibold text-slate-700">Lead Investigator: </span>
                  {act.leadResearcher} · ({act.year})
                </div>

                <p className="editorial-copy mt-4 text-[15px] leading-7 text-[#475365]">
                  {act.abstract}
                </p>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      <CTASection
        title="Explore Scholarly Journal Volumes"
        description="Read published full-text monographs and research papers indexed in NepJOL."
        primaryAction={{ label: "View Khwopa Journal", to: "/research/journal" }}
        secondaryAction={{ label: "Faculty Publications", to: "/research/publications" }}
      />
    </main>
  );
}
