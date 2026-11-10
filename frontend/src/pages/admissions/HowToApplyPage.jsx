import PageHero from "../../components/common/PageHero";
import PageContainer from "../../components/common/PageContainer";
import SectionHeading from "../../components/common/SectionHeading";
import CTASection from "../../components/common/CTASection";
import { admissionsData } from "../../data/admissionsData";

export default function HowToApplyPage() {
  return (
    <main className="bg-[#f7f5f0] min-h-screen">
      <PageHero
        eyebrow="Admissions Office"
        title="How to Apply."
        italicTitle="The 5-Step Process."
        description="A structured, transparent guide through Khwopa College's admission procedure from initial prospectus collection to official enrollment."
        breadcrumbs={[
          { label: "Admissions", to: "/admissions" },
          { label: "How to Apply" }
        ]}
        stats={[
          { label: "Process Steps", value: "5 Milestones" },
          { label: "Desk Hours", value: "Sun - Fri" },
          { label: "Counseling", value: "In-Person & Phone" }
        ]}
      />

      <section className="py-16 sm:py-24">
        <PageContainer>
          <SectionHeading
            eyebrow="Structured Process"
            title="The Step-by-Step Pathway"
            italicTitle="to Joining Khwopa."
            description="Follow these key milestones to secure your enrollment at Khwopa College."
          />

          <div className="relative border-l-2 border-[#dfbd77]/40 ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-10">
            {admissionsData.steps.map((item, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute -left-[35px] sm:-left-[43px] top-1 flex h-9 w-9 items-center justify-center rounded-full bg-[#0b2038] font-serif text-sm font-bold text-[#dfbd77] ring-4 ring-[#f7f5f0]">
                  {item.step}
                </div>

                <div className="rounded-2xl border border-[#e5ddce] bg-white p-7 shadow-sm transition hover:border-[#b99754]">
                  <h3 className="font-serif text-2xl font-bold text-[#12243a]">
                    {item.title}
                  </h3>
                  <p className="editorial-copy mt-3 text-[15px] leading-7 text-[#475365]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#e5ddce] bg-white p-7 text-center">
              <span className="font-serif text-3xl font-bold text-[#dfbd77]">01</span>
              <h4 className="mt-2 font-serif text-lg font-bold text-[#12243a]">Desk Timings</h4>
              <p className="editorial-copy mt-1 text-xs text-[#475365]">Admission Desk operates Sun - Fri, 6:30 AM to 4:00 PM.</p>
            </div>
            <div className="rounded-2xl border border-[#e5ddce] bg-white p-7 text-center">
              <span className="font-serif text-3xl font-bold text-[#dfbd77]">02</span>
              <h4 className="mt-2 font-serif text-lg font-bold text-[#12243a]">Admit Cards</h4>
              <p className="editorial-copy mt-1 text-xs text-[#475365]">Entrance admit cards are issued immediately upon form registration.</p>
            </div>
            <div className="rounded-2xl border border-[#e5ddce] bg-white p-7 text-center">
              <span className="font-serif text-3xl font-bold text-[#dfbd77]">03</span>
              <h4 className="mt-2 font-serif text-lg font-bold text-[#12243a]">Telephone Assistance</h4>
              <p className="editorial-copy mt-1 text-xs text-[#475365]">Call the Admissions Helpline at +977-1-6614336 for direct guidance.</p>
            </div>
          </div>
        </PageContainer>
      </section>

      <CTASection
        title="Check Tuition & Available Scholarships"
        description="Learn how municipal and merit scholarship quotas support your studies at Khwopa."
        primaryAction={{ label: "Fees & Scholarships", to: "/admissions/fees-scholarships" }}
        secondaryAction={{ label: "Admission FAQs", to: "/admissions/faqs" }}
      />
    </main>
  );
}
