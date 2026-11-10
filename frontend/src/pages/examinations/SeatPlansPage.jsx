import PageHero from "../../components/common/PageHero";
import PageContainer from "../../components/common/PageContainer";
import SectionHeading from "../../components/common/SectionHeading";
import CTASection from "../../components/common/CTASection";
import { examinationsData } from "../../data/examinationsData";

export default function SeatPlansPage() {
  return (
    <main className="bg-[#f7f5f0] min-h-screen">
      <PageHero
        eyebrow="Examination Section"
        title="Centres & Seat Plans."
        italicTitle="Hall & Room Allocations."
        description="Designated university examination centre allocations, campus building arrangements, and roll number seat distributions."
        breadcrumbs={[
          { label: "Examinations", to: "/examinations" },
          { label: "Centres & Seat Plans" }
        ]}
        stats={[
          { label: "Centre Code", value: "104 Khwopa" },
          { label: "Exam Buildings", value: "Blocks B & C" },
          { label: "Supervision", value: "NEB Centre Supdt." }
        ]}
      />

      <section className="py-16 sm:py-24">
        <PageContainer>
          <SectionHeading
            eyebrow="Hall Allocation"
            title="Designated Examination Centres"
            italicTitle="& Roll Number Allotments."
            description="Find which building and room your roll number has been assigned to for upcoming NEB Grade 11 & 12 board examinations at Centre 104."
          />

          <div className="space-y-8">
            {examinationsData.seatPlans.map((plan) => (
              <div
                key={plan.id}
                className="rounded-2xl border border-[#e5ddce] bg-white p-7 sm:p-9 shadow-sm transition hover:border-[#b99754]"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-[#e5ddce] pb-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#92703b]">
                      {plan.examName}
                    </span>
                    <h3 className="mt-1 font-serif text-2xl font-bold text-[#12243a]">
                      {plan.title}
                    </h3>
                  </div>
                  <span className="text-xs text-slate-500">
                    Published: {plan.noticeDate}
                  </span>
                </div>

                <div className="mt-5 rounded-xl bg-[#0b2038] p-5 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#dfbd77]">
                    Venue / Examination Hall Location
                  </span>
                  <p className="mt-1 font-serif text-xl font-bold text-white">
                    {plan.centreName}
                  </p>
                </div>

                <div className="mt-6">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#12243a]">
                    Roll Number & Room Distribution:
                  </h4>
                  <div className="mt-3.5 overflow-x-auto rounded-xl border border-[#e5ddce]">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-[#fbfaf7] text-slate-700 border-b border-[#e5ddce]">
                        <tr>
                          <th className="p-3.5 font-semibold">Institution / Candidate Group</th>
                          <th className="p-3.5 font-semibold">Roll Number Range</th>
                          <th className="p-3.5 font-semibold">Designated Rooms / Halls</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#e5ddce] text-[#475365]">
                        {(plan.allocations || plan.rollRanges || []).map((rr, rIdx) => (
                          <tr key={rIdx} className="hover:bg-slate-50">
                            <td className="p-3.5 font-medium text-[#12243a]">{rr.college}</td>
                            <td className="p-3.5 font-mono text-slate-600">{rr.rollNumbers}</td>
                            <td className="p-3.5 font-semibold text-[#92703b]">{rr.rooms}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      <CTASection
        title="Check Mandatory Exam Hall Regulations"
        description="Be thoroughly familiar with prohibited devices, reporting timelines and admit card rules."
        primaryAction={{ label: "View Exam Guidelines", to: "/examinations/guidelines" }}
        secondaryAction={{ label: "View Exam Routines", to: "/examinations/routines" }}
      />
    </main>
  );
}
