import PageHero from "../../components/common/PageHero";
import PageContainer from "../../components/common/PageContainer";
import SectionHeading from "../../components/common/SectionHeading";
import CTASection from "../../components/common/CTASection";
import { admissionsData } from "../../data/admissionsData";

export default function FeesScholarshipsPage() {
  return (
    <main className="bg-[#f7f5f0] min-h-screen">
      <PageHero
        eyebrow="Admissions Office"
        title="Fees & Scholarships."
        italicTitle="Affordable Higher Education."
        description="Affordable, non-profit community education supported by Bhaktapur Municipality with extensive merit and need-based fee concessions."
        breadcrumbs={[
          { label: "Admissions", to: "/admissions" },
          { label: "Fees & Scholarships" }
        ]}
        stats={[
          { label: "Model", value: "Non-Profit" },
          { label: "Municipal Support", value: "Bhaktapur Trust" },
          { label: "Scholarship Ratio", value: "30%+ Students" }
        ]}
      />

      <section className="py-16 sm:py-24">
        <PageContainer>
          <SectionHeading
            eyebrow="Fee Structure"
            title="Non-Profit Educational Cost"
            italicTitle="by Academic Programme."
            description="Operated strictly on a public service community model to make higher education accessible to students from all districts of Nepal."
          />

          <div className="overflow-x-auto rounded-2xl border border-[#e5ddce] bg-white shadow-sm">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#e5ddce] bg-[#0b2038] text-white">
                  <th className="p-4 font-semibold">Programme</th>
                  <th className="p-4 font-semibold">Duration</th>
                  <th className="p-4 font-semibold">Admission / Reg.</th>
                  <th className="p-4 font-semibold">Annual / Semester Fee</th>
                  <th className="p-4 font-semibold">Monthly Tuition</th>
                  <th className="p-4 font-semibold">Deposit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e5ddce] text-[#475365]">
                {admissionsData.fees.map((f, i) => (
                  <tr key={i} className="hover:bg-[#fbfaf7] transition">
                    <td className="p-4 font-bold text-[#12243a]">
                      {f.programme}
                      <span className="block text-[11px] font-normal text-slate-500 mt-0.5">{f.note}</span>
                    </td>
                    <td className="p-4 whitespace-nowrap">{f.duration}</td>
                    <td className="p-4 whitespace-nowrap font-medium text-[#92703b]">{f.admissionFee}</td>
                    <td className="p-4 whitespace-nowrap font-medium text-[#12243a]">{f.annualFee}</td>
                    <td className="p-4 whitespace-nowrap">{f.monthlyTuition}</td>
                    <td className="p-4 whitespace-nowrap text-slate-500">{f.labDeposit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Scholarships */}
          <div className="mt-20">
            <SectionHeading
              eyebrow="Financial Assistance"
              title="Scholarship Schemes & Quotas"
              italicTitle="Supporting Deserving Minds."
              description="Over 30% of our enrolled scholars benefit from tuition concessions through municipal trusts and merit programs."
            />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {admissionsData.scholarships.map((sch, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-[#e5ddce] bg-white p-7 shadow-sm transition hover:border-[#b99754]"
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-[#dfbd77]/20 px-2.5 py-0.5 text-xs font-bold text-[#92703b]">
                      {sch.category}
                    </span>
                    <span className="text-xs font-bold text-[#12243a]">
                      {sch.coverage}
                    </span>
                  </div>

                  <h3 className="mt-4 font-serif text-xl font-bold text-[#12243a]">
                    {sch.title}
                  </h3>

                  <p className="editorial-copy mt-2 text-xs sm:text-sm leading-relaxed text-[#475365]">
                    {sch.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </PageContainer>
      </section>

      <CTASection
        title="Have Questions About Scholarships or Payment Schedule?"
        description="Review our frequently asked questions or speak directly with our finance and accounts desk."
        primaryAction={{ label: "Read Admission FAQs", to: "/admissions/faqs" }}
        secondaryAction={{ label: "Contact Accounts Desk", to: "/contact" }}
      />
    </main>
  );
}
