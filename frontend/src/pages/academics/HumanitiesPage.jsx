import { Link } from "react-router-dom";
import PageHero from "../../components/common/PageHero";
import PageContainer from "../../components/common/PageContainer";
import SectionHeading from "../../components/common/SectionHeading";
import CTASection from "../../components/common/CTASection";
import { faculties, programmes } from "../../data/programmes";

const HUMANITIES_LAW_LABS = [
  {
    title: "Moot Court & Legal Argumentation Room",
    tag: "+2 Law Practice",
    image: "https://wms.edigitalnepal.com/wms/files/ws-post-images/1781678200024_c36f13dd-8bad-4e5f-a44d-7c98fe64603a.jpg",
    equipment: ["Judge's elevated bench & witness stand", "Bar council lawyer podiums & gavel", "Legal statutes & Supreme Court case law books"],
    description: "A simulated courtroom where +2 Law students enact mock constitutional trials, debate legal precedents, and practice procedural argumentation."
  },
  {
    title: "Media, Journalism & Feature Writing Station",
    tag: "Mass Communication",
    image: "https://wms.edigitalnepal.com/wms/files/ws-media-thumbnails/1769758263984-2483680e-b572-4fd2-8043-7034bdbade48.jpg",
    equipment: ["Digital audio recorders & reporting microphones", "Page layout & editorial desktop workstations", "Archived national newspapers & periodicals"],
    description: "Students learn news reporting, interview transcription, editorial layout design, and publication of the student literary magazine."
  },
  {
    title: "Bhaktapur Heritage & Social Research Cell",
    tag: "Sociology & Culture",
    image: "https://wms.edigitalnepal.com/wms/files/ws-post-images/1788424384800_efc697cf-4522-468e-bb6c-426032c3bcf7.jpg",
    equipment: ["Historical architectural maps of Bhaktapur", "Audio recording kits for oral history interviews", "Community survey statistical tabulation sheets"],
    description: "Dedicated hub for sociological surveys, traditional Newar cultural documentation, and heritage preservation field projects."
  }
];

const HUMANITIES_LAW_ACTIVITIES = [
  {
    title: "Inter-College Moot Court Competition",
    date: "Annual Event",
    desc: "+2 Law students represent simulated prosecution and defense counsels arguing contemporary constitutional and human rights petitions."
  },
  {
    title: "Bhaktapur Heritage & Monument Documentation",
    date: "Term Fieldwork",
    desc: "Guided field survey recording indigenous water spouts, historic mathas, and local architectural preservation practices in Bhaktapur."
  },
  {
    title: "Literary Colloquium & Creative Poetry Circle",
    date: "Monthly Sessions",
    desc: "Open literary sessions where students recite original poetry, critique contemporary Nepali/English literature, and present short stories."
  }
];

export default function HumanitiesPage() {
  const data = faculties.find((f) => f.slug === "humanities-social-sciences");
  const humProgrammes = programmes.filter((p) => p.facultySlug === "humanities-social-sciences");

  return (
    <main className="bg-[#f7f5f0] min-h-screen">
      <PageHero
        eyebrow="Study Area & Faculty · Khwopa Secondary School"
        title="Faculty of Humanities & Law (+2)."
        italicTitle="Social Conscience, Justice & Cultural Inquiry."
        description="Nurturing critical consciousness, legal ethics, constitutional awareness, literary expression, and sociological research in historic Bhaktapur."
        breadcrumbs={[
          { label: "Academics", to: "/academics/programmes" },
          { label: "+2 Humanities & Law Faculty" }
        ]}
        stats={[
          { label: "Disciplines", value: "+2 Law & Humanities" },
          { label: "Practical Facilities", value: "Moot Court & Media Lab" },
          { label: "Affiliation", value: "NEB Certified" }
        ]}
      />

      {/* Overview & Stream Cards */}
      <section className="py-16 sm:py-24">
        <PageContainer>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Social Transformation"
                title="Critical Thought & Ethics"
                italicTitle="for Community Upliftment."
                description={data.description}
              />

              <p className="editorial-copy text-[15px] leading-7 text-[#475365]">
                Our Humanities and Law programs foster empathetic civic leadership. Grounded in the living heritage of Bhaktapur, students study sociology, mass media, and constitutional law through participatory community research and courtroom simulation.
              </p>

              <div className="mt-8 rounded-2xl border border-[#e5ddce] bg-white p-7 shadow-sm">
                <h4 className="font-serif text-lg font-bold text-[#12243a]">
                  Experiential Fieldwork & Research
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

            <div className="lg:col-span-7">
              <div className="space-y-6">
                {humProgrammes.map((prog) => (
                  <div
                    key={prog.slug}
                    className="rounded-2xl border border-[#e5ddce] bg-white p-7 sm:p-8 shadow-sm transition hover:border-[#b99754]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="rounded-md bg-[#dfbd77]/20 px-2.5 py-0.5 text-xs font-bold text-[#92703b]">
                        {prog.code}
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        {prog.duration}
                      </span>
                    </div>

                    <h3 className="mt-4 font-serif text-2xl font-bold text-[#12243a]">
                      {prog.fullName}
                    </h3>

                    <p className="editorial-copy mt-2 text-xs sm:text-sm leading-relaxed text-[#475365]">
                      {prog.description}
                    </p>

                    <div className="mt-5 border-t border-[#eee9df] pt-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#92703b]">
                        Key Focus Areas:
                      </p>
                      <ul className="mt-2 space-y-1 text-xs text-[#475365]">
                        {prog.objectives.map((obj, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-[#dfbd77] font-bold">✓</span>
                            <span>{obj}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#eee9df] pt-4">
                      <div className="text-xs text-slate-500">
                        <span className="font-semibold text-slate-700">SEE Entry: </span>
                        {prog.eligibility}
                      </div>

                      <Link
                        to="/admissions/apply"
                        className="inline-flex items-center gap-1.5 rounded-xl bg-[#0b2038] px-5 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[#17334c]"
                      >
                        <span>Apply Online</span>
                        <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Practical Labs & Moot Court Room */}
      <section className="border-t border-[#e5ddce] bg-white py-16 sm:py-24">
        <PageContainer>
          <SectionHeading
            eyebrow="Practical Infrastructure"
            title="Moot Court, Media & Fieldwork Stations"
            italicTitle="for Active Engagement."
            description="Our facilities allow students to argue mock legal cases, edit media features, and conduct socio-cultural community surveys."
          />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {HUMANITIES_LAW_LABS.map((lab, idx) => (
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
                        Key Facilities:
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

      {/* Activities & Fieldwork */}
      <section className="bg-[#f0ede5] py-16 sm:py-24">
        <PageContainer>
          <SectionHeading
            eyebrow="Social Immersion"
            title="Fieldwork, Moot Trials & Colloquiums"
            italicTitle="in Historic Bhaktapur."
            description="Our students cultivate articulate voices through active debate, judicial simulations, and community ethnography."
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {HUMANITIES_LAW_ACTIVITIES.map((act, i) => (
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
        title="Passionate About Justice, Society, or Literature?"
        description="Join +2 Law or Humanities at Khwopa Secondary School. Applications are now open for the upcoming session."
        primaryAction={{ label: "Apply for Humanities or Law", to: "/admissions/apply" }}
        secondaryAction={{ label: "View Syllabi", to: "/academics/programmes" }}
      />
    </main>
  );
}
