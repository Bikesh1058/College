import PageHero from "../../components/common/PageHero";
import PageContainer from "../../components/common/PageContainer";
import SectionHeading from "../../components/common/SectionHeading";
import CTASection from "../../components/common/CTASection";
import { examinationsData } from "../../data/examinationsData";

export default function GuidelinesPage() {
  return (
    <main className="bg-[#f7f5f0] min-h-screen">
      <PageHero
        eyebrow="Examination Section"
        title="Guidelines & Rules."
        italicTitle="Code of Academic Integrity."
        description="Mandatory code of conduct, entrance regulations, prohibited devices, and university disciplinary protocols for examinees."
        breadcrumbs={[
          { label: "Examinations", to: "/examinations" },
          { label: "Guidelines & Rules" }
        ]}
        stats={[
          { label: "Surveillance", value: "CCTV Enabled" },
          { label: "Strict Policy", value: "Zero Tolerance" },
          { label: "Reporting", value: "30 Min Prior" }
        ]}
      />

      <section className="py-16 sm:py-24">
        <PageContainer className="max-w-4xl">
          <SectionHeading
            eyebrow="Academic Integrity"
            title="Official Code of Conduct"
            italicTitle="for Examinees."
            description="All +2 students appearing for NEB board examinations at Khwopa Secondary School Centre must comply strictly with the following regulations."
          />

          <div className="space-y-6">
            {examinationsData.guidelines.map((g, i) => (
              <div
                key={i}
                className="flex items-start gap-5 rounded-2xl border border-[#e5ddce] bg-white p-7 shadow-sm transition hover:border-[#b99754]"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0b2038] font-serif text-sm font-bold text-[#dfbd77]">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#12243a]">
                    {g.title}
                  </h3>
                  <p className="editorial-copy mt-2 text-sm sm:text-[15px] leading-7 text-[#475365]">
                    {g.rule}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-rose-200 bg-rose-50/70 p-7 text-rose-950">
            <h4 className="font-serif text-xl font-bold text-rose-900">
              Notice on Examination Hall Integrity
            </h4>
            <p className="editorial-copy mt-2 text-sm leading-relaxed text-rose-800">
              CCTV surveillance is operational across all examination halls at Khwopa College. Any candidate found in possession of unauthorized materials or mobile devices will be immediately reported to the University Office of the Controller of Examinations, resulting in expulsion and cancellation of all exam papers for the current term.
            </p>
          </div>
        </PageContainer>
      </section>

      <CTASection
        title="Need to Check Your Exam Center or Timetable?"
        description="View published routines and building allocations before heading to the examination venue."
        primaryAction={{ label: "View Routines", to: "/examinations/routines" }}
        secondaryAction={{ label: "Centres & Seat Plans", to: "/examinations/centres-seat-plans" }}
      />
    </main>
  );
}
