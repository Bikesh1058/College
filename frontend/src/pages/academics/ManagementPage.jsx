import { Link } from "react-router-dom";
import PageHero from "../../components/common/PageHero";
import PageContainer from "../../components/common/PageContainer";
import SectionHeading from "../../components/common/SectionHeading";
import CTASection from "../../components/common/CTASection";
import { faculties, programmes } from "../../data/programmes";

const MANAGEMENT_LABS = [
  {
    title: "Computerized Accounting & Business IT Lab",
    tag: "Khwopa ICT Facility",
    image: "https://wms.edigitalnepal.com/wms/files/ws-post-images/1751519692269_d079f3e5-f915-4d9a-be18-6e19ced18c2e.png",
    equipment: ["Tally & Busy computerized accounting software", "Microsoft Excel financial modeling terminals", "Statistical data analysis packages"],
    description: "Khwopa's official computing facility where management students prepare digital journal entries, ledgers, payroll sheets, and corporate financial statements."
  },
  {
    title: "Hotel Management Demonstration Kitchen & Dining",
    tag: "Hospitality Practice",
    image: "https://wms.edigitalnepal.com/wms/files/ws-media-thumbnails/1791530931538-4ebf4dee-fb98-418f-8845-d4f6850fe4f4.JPG",
    equipment: ["Commercial food preparation range & burner stations", "Bakery ovens & culinary demonstration kitchen", "Formal table layout & food service mockup lab"],
    description: "Hands-on culinary practicals, table etiquette, mock drink preparation, and housekeeping operations for Hotel Management students."
  },
  {
    title: "Business Case Discussion & Multimedia Seminar Room",
    tag: "Executive Skills",
    image: "https://wms.edigitalnepal.com/wms/files/ws-post-images/1751519256049_2fd51e0f-5475-44e2-b639-f263e727722f.jpg",
    equipment: ["HD multimedia projection & audio system", "Interactive whiteboard & OHP presentation layout", "Podiums for student business case pitches"],
    description: "Khwopa Secondary School's smart multimedia classroom configured for interactive commercial case discussions, student presentations, and market research seminars."
  }
];

const MANAGEMENT_ACTIVITIES = [
  {
    title: "Khwopa Youth Business Fair & Food Gala",
    date: "Annual Event",
    desc: "Students design, finance, and run real popup food and merchandise stalls on campus grounds, applying real-world cost accounting and marketing."
  },
  {
    title: "Industrial & Bank Observation Visits",
    date: "Term Excursions",
    desc: "Guided field tours to commercial bank clearing houses, manufacturing plants in Bhaktapur Industrial Estate, and leading hotel properties."
  },
  {
    title: "Chartered Accountancy (CA/ACCA) Seminars",
    date: "Quarterly Sessions",
    desc: "Career mentorship with practicing auditors and chartered accountants explaining exam routes, articleship, and financial analytics."
  }
];

export default function ManagementPage() {
  const data = faculties.find((f) => f.slug === "management");
  const mgmtProgrammes = programmes.filter((p) => p.facultySlug === "management");

  return (
    <main className="bg-[#f7f5f0] min-h-screen">
      <PageHero
        eyebrow="Study Area & Faculty · Khwopa Secondary School"
        title="Faculty of Management (+2)."
        italicTitle="Leadership, Integrity & Commercial Acumen."
        description="Developing visionary business leaders, accountants, and entrepreneurs with strong grounding in bookkeeping, economics, business technology, and hotel management."
        breadcrumbs={[
          { label: "Academics", to: "/academics/programmes" },
          { label: "+2 Management Faculty" }
        ]}
        stats={[
          { label: "Curriculum", value: "NEB Certified" },
          { label: "Practical Facilities", value: "Accounting & HM Labs" },
          { label: "Entry Criteria", value: "Min. 2.0 GPA" }
        ]}
      />

      {/* Overview & Stream Card */}
      <section className="py-16 sm:py-24">
        <PageContainer>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-6">
              <SectionHeading
                eyebrow="Commercial Foundations"
                title="Business Education"
                italicTitle="with Ethical Leadership."
                description={data.description}
              />

              <p className="editorial-copy text-[15px] leading-7 text-[#475365]">
                Our management curriculum combines fundamental bookkeeping and macroeconomic theories with modern computer technology and practical hospitality training in Bhaktapur.
              </p>

              <div className="mt-8 rounded-2xl border border-[#e5ddce] bg-white p-7 shadow-sm">
                <h4 className="font-serif text-lg font-bold text-[#12243a]">
                  Pedagogical Methodology
                </h4>
                <ul className="mt-4 space-y-3 text-xs sm:text-sm leading-relaxed text-[#475365]">
                  {data.learningApproach.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="mt-1 flex h-2 w-2 shrink-0 rounded-full bg-[#dfbd77]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-6">
              {mgmtProgrammes.map((prog) => (
                <div
                  key={prog.slug}
                  className="rounded-2xl border border-[#e5ddce] bg-white p-8 shadow-sm transition hover:border-[#b99754]"
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-[#dfbd77]/20 px-2.5 py-0.5 text-xs font-bold text-[#92703b]">
                      {prog.code}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      {prog.duration}
                    </span>
                  </div>

                  <h3 className="mt-4 font-serif text-3xl font-bold text-[#12243a]">
                    {prog.fullName}
                  </h3>

                  <p className="editorial-copy mt-3 text-sm leading-relaxed text-[#475365]">
                    {prog.description}
                  </p>

                  <div className="mt-6 border-t border-[#eee9df] pt-5">
                    <h5 className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#92703b]">
                      Available Elective Combinations:
                    </h5>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2 text-xs">
                      <div className="rounded-xl border border-[#e5ddce] bg-[#fbfaf7] p-3.5">
                        <p className="font-bold text-[#12243a]">Computer & Math Group</p>
                        <p className="mt-1 text-slate-500">Business Mathematics, Computer Science & Economics</p>
                      </div>
                      <div className="rounded-xl border border-[#e5ddce] bg-[#fbfaf7] p-3.5">
                        <p className="font-bold text-[#12243a]">Hotel Management Group</p>
                        <p className="mt-1 text-slate-500">Culinary practice, Hotel Operations & Business Studies</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#eee9df] pt-5">
                    <div className="text-xs text-slate-500">
                      <span className="font-semibold text-slate-700">SEE Criteria: </span>
                      Min. 2.00 GPA in SEE
                    </div>

                    <Link
                      to="/admissions/apply"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-[#0b2038] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[#17334c]"
                    >
                      <span>Apply for Management</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Dedicated Management & Hospitality Labs */}
      <section className="border-t border-[#e5ddce] bg-white py-16 sm:py-24">
        <PageContainer>
          <SectionHeading
            eyebrow="Practical Facilities"
            title="Practical Commerce & Culinary Labs"
            italicTitle="for Hands-On Experience."
            description="Our management infrastructure connects theoretical economics and accounting with computer applications and hospitality skills."
          />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {MANAGEMENT_LABS.map((lab, idx) => (
              <div
                key={idx}
                className="group overflow-hidden rounded-2xl border border-[#e5ddce] bg-[#fbfaf7] shadow-sm transition hover:border-[#b99754] hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="h-52 overflow-hidden relative">
                    <img
                      src={lab.image}
                      alt={lab.title}
                      className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = "https://wms.edigitalnepal.com/wms/files/ws-post-images/1678958957817_007be5e2-a1dc-4580-9809-4964d79fa1a0.jpg";
                      }}
                    />
                    <span className="absolute top-3 left-3 rounded-md bg-[#0b2038] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#dfbd77]">
                      {lab.tag}
                    </span>
                  </div>

                  <div className="p-6">
                    <h4 className="font-serif text-xl font-bold text-[#12243a]">
                      {lab.title}
                    </h4>
                    <p className="editorial-copy mt-2 text-xs leading-relaxed text-[#475365]">
                      {lab.description}
                    </p>

                    <div className="mt-4 border-t border-[#e5ddce] pt-3.5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#92703b]">
                        Practical Elements:
                      </p>
                      <ul className="mt-2 space-y-1.5 text-xs text-[#475365]">
                        {lab.equipment.map((eq, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#dfbd77]" />
                            <span>{eq}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* Management Co-Curricular Activities */}
      <section className="bg-[#f0ede5] py-16 sm:py-24">
        <PageContainer>
          <SectionHeading
            eyebrow="Commercial Exposure"
            title="Business Expos & Industry Visits"
            italicTitle="Preparing Future Entrepreneurs."
            description="Our commerce club organizes corporate tours, tax filing workshops, and food galas to cultivate executive competence."
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {MANAGEMENT_ACTIVITIES.map((act, i) => (
              <div
                key={i}
                className="flex flex-col justify-between rounded-2xl border border-[#e5ddce] bg-white p-7 shadow-sm transition hover:border-[#b99754]"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#92703b]">
                    {act.date}
                  </span>
                  <h4 className="mt-2 font-serif text-xl font-bold text-[#12243a]">
                    {act.title}
                  </h4>
                  <p className="editorial-copy mt-3 text-xs sm:text-sm leading-relaxed text-[#475365]">
                    {act.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      <CTASection
        title="Ready to Build Your Commercial Foundation?"
        description="Class 11 (+2 Management) admissions are open. Review course syllabi and subject combinations."
        primaryAction={{ label: "Apply for Management", to: "/admissions/apply" }}
        secondaryAction={{ label: "View Curriculum", to: "/academics/programmes/plus-two-management" }}
      />
    </main>
  );
}
