import { Link } from "react-router-dom";
import PageHero from "../../components/common/PageHero";
import PageContainer from "../../components/common/PageContainer";
import SectionHeading from "../../components/common/SectionHeading";
import CTASection from "../../components/common/CTASection";
import { faculties, programmes } from "../../data/programmes";

const SCIENCE_LABS = [
  {
    title: "Khwopa +2 Science Laboratory",
    tag: "Physics & Chemistry Practicals",
    image: "https://wms.edigitalnepal.com/wms/files/ws-post-images/1751519828524_e4439fe2-801b-494c-8a2d-a89d2053bc77.png",
    equipment: ["Optical benches, spectrometers & spherometers", "Digital analytical balances & chemical titration stations", "Preserved botanical/zoological specimens & binocular microscopes"],
    description: "The official +2 Science laboratory at Khwopa Secondary School, designed specifically for hands-on NEB Physics, Chemistry, and Biology practicals under instructor supervision."
  },
  {
    title: "Khwopa Dedicated Physics Lab",
    tag: "Physical Sciences & Mechanics",
    image: "https://khec.edu.np/uploads/gallery/Photo_20240905_1725518287.jpg",
    equipment: ["Sonometer & resonance tube apparatus", "Optical diffraction prisms & ray benches", "Galvanometers, Wheatstone bridge & rheostats"],
    description: "Khwopa's dedicated experimental physics laboratory where students verify physical laws, measure refractive indices, and study circuit mechanics."
  },
  {
    title: "Khwopa ICT & Computer Laboratory",
    tag: "Computing & Digital Science",
    image: "https://wms.edigitalnepal.com/wms/files/ws-post-images/1751519692269_d079f3e5-f915-4d9a-be18-6e19ced18c2e.png",
    equipment: ["High-speed Core i7 computing terminals", "C/C++ GCC programming environments & DBMS suites", "Dedicated LAN server with uninterrupted power backup"],
    description: "The official computer laboratory at Khwopa Secondary School equipped for practical computing, programming, and algorithmic problem-solving for +2 students."
  },
  {
    title: "Life Sciences & Biological Investigation Lab",
    tag: "Cellular & Cytology Research",
    image: "https://wms.edigitalnepal.com/wms/files/ws-post-images/1788425022344_f0f05e4b-bab7-46dd-84af-87837670da23.jpg",
    equipment: ["High-magnification compound microscopes", "Permanent cytological slides & tissue specimens", "Dissection trays & anatomical model charts"],
    description: "Equipped for cellular cytology, botany slide preparation, physiological tests, and taxonomy studies mandated by the NEB Grade 11 & 12 curriculum."
  }
];

const SCIENCE_ACTIVITIES = [
  {
    title: "Annual Science Exhibition & Innovation Fair",
    date: "Every Mangsir",
    desc: "Students build interactive working models in robotics, renewable energy generators, and environmental biosensors presented to thousands of visitors."
  },
  {
    title: "Engineering (IOE) & Medical (CEE) Mentorship",
    date: "Weekly Sessions",
    desc: "Rigorous MCQ practice drills, speed problem-solving workshops, and past paper analysis led by alumni and seasoned faculty."
  },
  {
    title: "Ecological & Geological Fieldwork",
    date: "Annual Excursion",
    desc: "Field sampling trips to Shivapuri watershed, Nagarkot geological ridges, and local wetland ecosystems for biodiversity mapping."
  }
];

export default function SciencePage() {
  const data = faculties.find((f) => f.slug === "science");
  const sciProgrammes = programmes.filter((p) => p.facultySlug === "science");

  return (
    <main className="bg-[#f7f5f0] min-h-screen">
      <PageHero
        eyebrow="Study Area & Faculty · Khwopa Secondary School"
        title="Faculty of Science (+2)."
        italicTitle="Curiosity, Discovery & Empirical Rigor."
        description="Fostering scientific inquiry, analytical discipline, modern laboratory mastery, and competitive entrance coaching in Physics, Chemistry, Biology, and Computer Science."
        breadcrumbs={[
          { label: "Academics", to: "/academics/programmes" },
          { label: "+2 Science Faculty" }
        ]}
        stats={[
          { label: "Modern Stations", value: "4 Specialized Labs" },
          { label: "Weekly Practical", value: "3 Hrs / Subject" },
          { label: "Board Affiliation", value: "NEB Certified" }
        ]}
      />

      {/* Overview & Core Disciplines */}
      <section className="py-16 sm:py-24">
        <PageContainer>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-6">
              <SectionHeading
                eyebrow="Empirical Mastery"
                title="A Disciplined Foundation"
                italicTitle="for Future Engineers & Doctors."
                description={data.description}
              />

              <p className="editorial-copy text-[15px] leading-7 text-[#475365]">
                At Khwopa College, theoretical principles taught in lecture halls are rigorously validated through mandatory weekly laboratory hours. 
                Our experienced mentors guide students through apparatus calibration, experimental error calculation, and viva voce defense.
              </p>

              <div className="mt-8 rounded-2xl border border-[#e5ddce] bg-white p-7 shadow-sm">
                <h4 className="font-serif text-lg font-bold text-[#12243a]">
                  Practical Laboratory Framework
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
              {sciProgrammes.map((prog) => (
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
                      Core Subject Groups Available:
                    </h5>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2 text-xs">
                      <div className="rounded-xl border border-[#e5ddce] bg-[#fbfaf7] p-3.5">
                        <p className="font-bold text-[#12243a]">Biology Group</p>
                        <p className="mt-1 text-slate-500">Pre-Medical, Nursing, Pharmacy & Life Sciences</p>
                      </div>
                      <div className="rounded-xl border border-[#e5ddce] bg-[#fbfaf7] p-3.5">
                        <p className="font-bold text-[#12243a]">Computer Science Group</p>
                        <p className="mt-1 text-slate-500">Pre-Engineering, IT, Architecture & Tech</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#eee9df] pt-5">
                    <div className="text-xs text-slate-500">
                      <span className="font-semibold text-slate-700">SEE Criteria: </span>
                      Min. 2.40 GPA with C+ in Math & Science
                    </div>

                    <Link
                      to="/admissions/apply"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-[#0b2038] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[#17334c]"
                    >
                      <span>Apply for Science</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Dedicated Laboratory Stations Showcase */}
      <section className="border-t border-[#e5ddce] bg-white py-16 sm:py-24">
        <PageContainer>
          <SectionHeading
            eyebrow="Practical Infrastructure"
            title="Specialized Laboratory Stations"
            italicTitle="in Physical, Chemical & Life Sciences."
            description="Our students cultivate hands-on experimental proficiency with modern instruments, safety showers, and individual apparatus setups."
          />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {SCIENCE_LABS.map((lab, idx) => (
              <div
                key={idx}
                className="group overflow-hidden rounded-2xl border border-[#e5ddce] bg-[#fbfaf7] shadow-sm transition hover:border-[#b99754] hover:shadow-md"
              >
                <div className="h-56 overflow-hidden relative">
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

                <div className="p-7">
                  <h4 className="font-serif text-2xl font-bold text-[#12243a]">
                    {lab.title}
                  </h4>
                  <p className="editorial-copy mt-2 text-xs sm:text-sm leading-relaxed text-[#475365]">
                    {lab.description}
                  </p>

                  <div className="mt-5 border-t border-[#e5ddce] pt-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#92703b]">
                      Key Apparatus & Instrumentation:
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
            ))}
          </div>
        </PageContainer>
      </section>

      {/* Science Student Activities */}
      <section className="bg-[#f0ede5] py-16 sm:py-24">
        <PageContainer>
          <SectionHeading
            eyebrow="Experiential Learning"
            title="Science Activities & Competitions"
            italicTitle="Beyond Classroom Theory."
            description="From annual robotics and science fairs to entrance mentorship camps, our students engage in rigorous co-curricular discovery."
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {SCIENCE_ACTIVITIES.map((act, i) => (
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
        title="Aspire for Engineering or Medical Excellence?"
        description="Online applications are active for Class 11 (+2 Science). Review syllabus details and entrance requirements."
        primaryAction={{ label: "Apply for +2 Science", to: "/admissions/apply" }}
        secondaryAction={{ label: "View Curriculum", to: "/academics/programmes/plus-two-science" }}
      />
    </main>
  );
}
