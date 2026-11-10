import { useState } from "react";
import { Link } from "react-router-dom";

const CAMPUS_IMAGE =
  "https://wms.edigitalnepal.com/wms/files/ws-post-images/1751512628392_35a0f113-7f94-43bb-9bf6-4a2d56daf8d6.jpg";

const DEPARTMENTS = [
  {
    id: "management",
    number: "01",
    name: "Management",
    shortName: "Management",
    image: "https://wms.edigitalnepal.com/wms/files/ws-post-images/1751519692269_d079f3e5-f915-4d9a-be18-6e19ced18c2e.png",
    labBadge: "Computerized Accounting & Tally Lab",
    eyebrow: "Business | Finance | Leadership",
    description:
      "Develop a grounding in business, accounting, economics and organisational management through a focused +2 stream.",
    detail:
      "The +2 Management stream combines core subjects with a published choice of optional subjects. Practical accounting and digital data terminals are hosted in Khwopa's computerized business IT laboratory.",
    programmes: [
      {
        slug: "plus-two-management",
        code: "+2",
        name: "Management — Grades 11 & 12",
        level: "Higher secondary",
      },
    ],
    themes: [
      "Accounting",
      "Business studies",
      "Economics",
      "Computer Science or Hotel Management",
      "Business Mathematics",
    ],
    symbol: "M",
    labs: [
      {
        name: "Computerized Accounting & Tally Lab",
        image: "https://wms.edigitalnepal.com/wms/files/ws-post-images/1751519692269_d079f3e5-f915-4d9a-be18-6e19ced18c2e.png",
        desc: "Khwopa ICT computer lab equipped with Tally Prime and financial spreadsheets.",
      },
      {
        name: "Hospitality & Culinary Demonstration Kitchen",
        image: "https://wms.edigitalnepal.com/wms/files/ws-media-thumbnails/1791530931538-4ebf4dee-fb98-418f-8845-d4f6850fe4f4.JPG",
        desc: "Commercial food prep stations, dining table setup and mock kitchen practicals.",
      },
    ],
    facultyHOD: {
      name: "Rupesh Joshi",
      designation: "Head of Department & Senior Lecturer",
      qualification: "M.B.S., M.Phil. in Management",
      image: "https://wms.edigitalnepal.com/wms/files/ws-board-member/1775462534571_e82cf0b6-fef8-4e89-82ef-d75e01bbf866.JPG",
    },
  },
  {
    id: "humanities-law",
    number: "02",
    name: "Humanities & Law",
    shortName: "Humanities & Law",
    image: "https://wms.edigitalnepal.com/wms/files/ws-post-images/1781678200024_c36f13dd-8bad-4e5f-a44d-7c98fe64603a.jpg",
    labBadge: "Moot Court Chamber & Social Research Cell",
    eyebrow: "Society | Justice | Ethics",
    description:
      "Understand society, constitutional rights, legal jurisprudence and literary culture through specialized +2 streams.",
    detail:
      "The +2 Humanities and +2 Law streams nurture critical consciousness, constitutional awareness, moot court advocacy, and sociological inquiry under NEB, utilizing simulated legal argumentation chambers and community field research cells.",
    programmes: [
      {
        slug: "plus-two-humanities",
        code: "+2",
        name: "Humanities & Social Sciences — Grades 11 & 12",
        level: "Higher Secondary",
      },
      {
        slug: "plus-two-law",
        code: "+2",
        name: "Law & Jurisprudence — Grades 11 & 12",
        level: "Higher Secondary",
      },
    ],
    themes: [
      "Sociology & Community Studies",
      "Mass Communication & Journalism",
      "Constitutional & Criminal Law",
      "Moot Court & Legal Drafting",
      "Languages & Literature",
    ],
    symbol: "H",
    labs: [
      {
        name: "Moot Court & Legal Argumentation Hall",
        image: "https://wms.edigitalnepal.com/wms/files/ws-post-images/1781678200024_c36f13dd-8bad-4e5f-a44d-7c98fe64603a.jpg",
        desc: "Simulated courtroom with judge's bench and lawyer podiums for trial advocacy.",
      },
      {
        name: "Community Field Study & Heritage Cell",
        image: "https://wms.edigitalnepal.com/wms/files/ws-media-images/1751355381420-4ac05be0-9eeb-41ce-a554-074a7a659f79.jpg",
        desc: "Field research station for sociological surveys and Bhaktapur heritage documentation.",
      },
    ],
    facultyHOD: {
      name: "Dr. Govinda Prasad Prajapati",
      designation: "Head of Department & Associate Professor",
      qualification: "Ph.D. in Sociology",
      image: "https://wms.edigitalnepal.com/wms/files/ws-board-member/1775463777558_267d32be-62cf-4b7f-b472-a164b4c73045.JPG",
    },
  },
  {
    id: "science",
    number: "03",
    name: "Science",
    shortName: "Science",
    image: "https://wms.edigitalnepal.com/wms/files/ws-post-images/1751519828524_e4439fe2-801b-494c-8a2d-a89d2053bc77.png",
    labBadge: "Physics, Chemistry & Biology Wet Labs",
    eyebrow: "Physics | Environment | Research",
    description:
      "Build scientific curiosity, analytical thinking and a strong foundation for further study through the +2 Science stream.",
    detail:
      "The +2 Science stream includes core science subjects and a published choice between Computer Science and Biology, supported by Khwopa's dedicated Physics, Chemistry, Life Sciences, and ICT practical laboratories.",
    programmes: [
      {
        slug: "plus-two-science",
        code: "+2",
        name: "Science — Grades 11 & 12",
        level: "Higher secondary",
      },
    ],
    themes: [
      "Physics",
      "Chemistry",
      "Mathematics",
      "Computer Science or Biology",
    ],
    symbol: "S",
    labs: [
      {
        name: "Khwopa +2 Science Wet Laboratory",
        image: "https://wms.edigitalnepal.com/wms/files/ws-post-images/1751519828524_e4439fe2-801b-494c-8a2d-a89d2053bc77.png",
        desc: "Chemical titration stations, optical spectrometers, balances, and specimen tables.",
      },
      {
        name: "High-Speed ICT Computer Laboratory",
        image: "https://wms.edigitalnepal.com/wms/files/ws-post-images/1751519692269_d079f3e5-f915-4d9a-be18-6e19ced18c2e.png",
        desc: "Equipped for C/C++ programming, DBMS practicals, and digital logic circuits.",
      },
    ],
    facultyHOD: {
      name: "Bhesh Bahadur Thapa",
      designation: "Head of Department & Senior Lecturer",
      qualification: "M.Sc. in Physics",
      image: "https://wms.edigitalnepal.com/wms/files/ws-board-member/1775460803457_b16382ef-66dc-4008-897b-bb682dafc0f3.JPG",
    },
  },
];

const FILTERS = [
  { label: "All streams", value: "all" },
  { label: "Science", value: "science" },
  { label: "Management", value: "management" },
  { label: "Humanities & Law", value: "humanities-law" },
];

const DEDICATED_LABS = [
  {
    id: "science-lab",
    faculty: "Science",
    name: "Khwopa +2 Science Practical Wet Laboratory",
    badge: "Physics, Chemistry & Biology",
    image: "https://wms.edigitalnepal.com/wms/files/ws-post-images/1751519828524_e4439fe2-801b-494c-8a2d-a89d2053bc77.png",
    description: "The official +2 Science laboratory at Khwopa Secondary School, designed specifically for hands-on NEB Physics, Chemistry, and Biology practicals under senior faculty supervision.",
    features: [
      "Optical benches, spectrometers & spherometers",
      "Digital analytical balances & chemical titration stations",
      "Preserved botanical/zoological specimens & binocular microscopes",
      "Flame test burners, reagent racks & safety eyewash showers"
    ],
    route: "/academics/science"
  },
  {
    id: "ict-lab",
    faculty: "Management & Science",
    name: "Central ICT & Computer Programming Lab",
    badge: "Computing & Business Software",
    image: "https://wms.edigitalnepal.com/wms/files/ws-post-images/1751519692269_d079f3e5-f915-4d9a-be18-6e19ced18c2e.png",
    description: "High-speed computing laboratory supporting C/C++ programming and database queries for Science, alongside Tally Prime, Busy, and financial spreadsheets for Management.",
    features: [
      "High-speed Core i7 workstations with dual OS environments",
      "Tally Prime & corporate accounting simulation suites",
      "GCC C/C++ compilers, HTML/CSS & MySQL databases",
      "Dedicated high-speed campus LAN with uninterrupted solar power backup"
    ],
    route: "/academics/management"
  },
  {
    id: "moot-court",
    faculty: "Humanities & Law",
    name: "Simulated Moot Courtroom & Advocacy Chamber",
    badge: "+2 Law & Jurisprudence",
    image: "https://wms.edigitalnepal.com/wms/files/ws-post-images/1781678200024_c36f13dd-8bad-4e5f-a44d-7c98fe64603a.jpg",
    description: "A full simulated court chamber where +2 Law students enact constitutional trials, debate legal precedents, draft legal writs, and practice procedural argumentation.",
    features: [
      "Elevated judicial bench with gavel and witness enclosure",
      "Prosecution and defense advocacy podiums",
      "Nepal Law Reports (NLR) and Supreme Court precedent digests",
      "Annual Inter-College Moot Court competition preparation hub"
    ],
    route: "/academics/humanities-social-sciences"
  },
  {
    id: "culinary-lab",
    faculty: "Management",
    name: "Hotel Management Demonstration Kitchen & Dining",
    badge: "Hospitality Practice",
    image: "https://wms.edigitalnepal.com/wms/files/ws-media-thumbnails/1791530931538-4ebf4dee-fb98-418f-8845-d4f6850fe4f4.JPG",
    description: "Equipped for culinary practicals, formal food and beverage service, housekeeping operations, and table layout techniques under seasoned hospitality mentors.",
    features: [
      "Commercial culinary gas ranges, ovens & baking gear",
      "Formal dining table setup & silver service mockup",
      "Mock cocktail/mocktail preparation and beverage handling",
      "Hygiene standards and culinary sanitation protocols"
    ],
    route: "/academics/management"
  },
  {
    id: "multimedia-lab",
    faculty: "Humanities & Management",
    name: "Smart Multimedia & Business Case Seminar Hall",
    badge: "Executive Presentation",
    image: "https://wms.edigitalnepal.com/wms/files/ws-post-images/1751519256049_2fd51e0f-5475-44e2-b639-f263e727722f.jpg",
    description: "Interactive smart seminar facility used for commercial business pitch presentations, economics seminars, journalism workshops, and literary colloquiums.",
    features: [
      "HD multimedia digital projection and acoustic surround system",
      "Smart interactive digital whiteboard for lectures",
      "Podium and stage layout for student debate sessions",
      "Audio recording equipment for journalism and oral histories"
    ],
    route: "/academics/humanities-social-sciences"
  },
  {
    id: "heritage-cell",
    faculty: "Humanities & Law",
    name: "Bhaktapur Heritage & Social Research Field Cell",
    badge: "Sociological Fieldwork",
    image: "https://wms.edigitalnepal.com/wms/files/ws-media-images/1751355381420-4ac05be0-9eeb-41ce-a554-074a7a659f79.jpg",
    description: "Dedicated research cell organizing field excursions, ethnographic interviews, community surveys, and architectural heritage preservation in ancient Bhaktapur.",
    features: [
      "Survey questionnaire tabulation kits & mapping resources",
      "Audio-visual oral history documentation archives",
      "Field excursions to historical monuments and water spouts",
      "Collaboration with Bhaktapur Municipal cultural preservation wings"
    ],
    route: "/academics/humanities-social-sciences"
  }
];

const ACTIVE_STREAMS = DEPARTMENTS;

function SectionHeading({ eyebrow, title, description, centered = false }) {
  return (
    <div className={`mb-9 ${centered ? "mx-auto text-center" : ""}`}>
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#a98545]">
        {eyebrow}
      </p>

      <h2 className="font-serif text-3xl font-semibold leading-tight text-[#10243b] md:text-4xl">
        {title}
      </h2>

      {description && (
        <p className="editorial-copy mt-4 max-w-2xl text-[15px] leading-7 text-slate-600 md:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

function ProgrammeLink({ programme }) {
  return (
    <Link
      to="/academics#programme-directory"
      className="group flex items-center gap-3 border-b border-[#eee9df] py-4 last:border-0"
    >
      <span className="flex h-10 min-w-12 items-center justify-center rounded-md bg-[#f4f0e7] px-2 text-xs font-bold text-[#8c6d37] transition group-hover:bg-[#10243b] group-hover:text-[#dfbd77]">
        {programme.code}
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-[#182d43] transition group-hover:text-[#9b783c]">
          {programme.name}
        </span>
        <span className="mt-1 block text-xs text-slate-500">
          {programme.level} programme
        </span>
      </span>

      <span className="text-lg text-[#a98545] transition group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}

function DepartmentCard({ department }) {
  return (
    <article
      id={department.id}
      className="scroll-mt-28 flex flex-col overflow-hidden rounded-2xl border border-[#e8e2d6] bg-white shadow-[0_10px_35px_rgba(16,36,59,0.035)] transition duration-300 hover:-translate-y-1 hover:border-[#b99754] hover:shadow-[0_18px_42px_rgba(16,36,59,0.08)]"
    >
      {/* Card header with real facility/lab image background */}
      <div className="relative overflow-hidden bg-[#10243b] px-7 py-8 text-white md:px-8 min-h-[190px]">
        {department.image && (
          <div className="absolute inset-0">
            <img
              src={department.image}
              alt={department.name}
              className="h-full w-full object-cover opacity-35 transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#10243b] via-[#10243b]/85 to-[#10243b]/50" />
          </div>
        )}
        <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full border border-[#dfbd77]/20 pointer-events-none" />
        <div className="absolute -right-2 -top-8 h-32 w-32 rounded-full border border-[#dfbd77]/15 pointer-events-none" />

        <div className="relative z-10 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#dfbd77]">
              Academic area {department.number}
            </p>

            <h3 className="mt-3 max-w-sm font-serif text-2xl font-semibold leading-tight md:text-3xl">
              {department.name}
            </h3>

            <p className="mt-2 text-xs font-medium uppercase tracking-wider text-white/60">
              {department.eyebrow}
            </p>
          </div>

          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-[#dfbd77]/40 bg-[#dfbd77]/10 font-serif text-2xl font-semibold text-[#dfbd77] shadow-inner">
            {department.symbol}
          </div>
        </div>

        <div className="relative z-10 mt-6 flex flex-wrap items-center gap-2">
          <span className="rounded-md border border-[#dfbd77]/30 bg-[#091b30]/80 px-2.5 py-1 text-[10px] font-semibold text-[#dfbd77]">
            🏛️ {department.labBadge}
          </span>
          <span className="rounded-md bg-white/10 px-2.5 py-1 text-[10px] text-white/85">
            +2 | Grades 11 & 12
          </span>
        </div>
      </div>

      {/* Card content */}
      <div className="flex flex-1 flex-col p-7 md:p-8">
        <p className="editorial-copy text-[15px] leading-7 text-slate-600">
          {department.description}
        </p>

        {/* Head of Department with Circular Portrait scaled down */}
        {department.facultyHOD && (
          <div className="mt-6 flex items-center gap-3.5 rounded-xl border border-[#e8e2d6] bg-[#fbfaf7] p-3.5">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-white bg-slate-200 shadow-sm ring-1 ring-[#0b2038]/10">
              <img
                src={department.facultyHOD.image}
                alt={department.facultyHOD.name}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[9px] font-bold uppercase tracking-wider text-[#92703b]">
                Head of Department (HOD)
              </p>
              <h5 className="truncate font-serif text-sm font-bold text-[#10243b]">
                {department.facultyHOD.name}
              </h5>
              <p className="truncate text-[11px] text-[#647184]">
                {department.facultyHOD.qualification}
              </p>
            </div>
          </div>
        )}

        <div className="mt-7">
          <div className="mb-2 flex items-center justify-between gap-3">
            <h4 className="font-serif text-xl font-semibold text-[#10243b]">
              Programmes
            </h4>
            <span className="text-xs text-slate-400">Explore details</span>
          </div>

          <div>
            {department.programmes.map((programme) => (
              <ProgrammeLink
                key={programme.slug}
                programme={programme}
              />
            ))}
          </div>
        </div>

        {/* Department Practical Labs Preview */}
        {department.labs && (
          <div className="mt-7 border-t border-[#eee9df] pt-6">
            <h4 className="text-xs font-bold uppercase tracking-[0.17em] text-[#a98545]">
              Dedicated Laboratories
            </h4>

            <div className="mt-3.5 space-y-3">
              {department.labs.map((lab) => (
                <div
                  key={lab.name}
                  className="group/lab flex items-center gap-3 rounded-lg border border-[#eee9df] p-2.5 transition hover:border-[#dfbd77] hover:bg-[#fbfaf7]"
                >
                  <img
                    src={lab.image}
                    alt={lab.name}
                    className="h-12 w-16 shrink-0 rounded-md object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-[#10243b] group-hover/lab:text-[#9b783c]">
                      {lab.name}
                    </p>
                    <p className="line-clamp-1 text-[11px] text-slate-500">
                      {lab.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-7 border-t border-[#eee9df] pt-6">
          <h4 className="text-xs font-bold uppercase tracking-[0.17em] text-[#a98545]">
            Academic themes
          </h4>

          <div className="mt-4 flex flex-wrap gap-2">
            {department.themes.map((theme) => (
              <span
                key={theme}
                className="rounded-md bg-[#f5f2eb] px-3 py-2 text-xs font-medium text-[#526174]"
              >
                {theme}
              </span>
            ))}
          </div>
        </div>

        <p className="mt-6 border-l-2 border-[#c5a15d] pl-4 text-xs leading-6 text-slate-500">
          {department.detail}
        </p>
      </div>
    </article>
  );
}

function DepartmentsPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const visibleDepartments =
    activeFilter === "all"
      ? ACTIVE_STREAMS
      : ACTIVE_STREAMS.filter(
          (department) => department.id === activeFilter
        );

  const totalProgrammes = ACTIVE_STREAMS.reduce(
    (total, department) => total + department.programmes.length,
    0
  );

  return (
    <main className="min-h-screen bg-[#f7f5f0] text-[#17283c]">
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[#091b30] text-white">
        <div className="absolute inset-0 -z-10">
          <img
            src={CAMPUS_IMAGE}
            alt="Khwopa College campus in Bhaktapur"
            className="h-full w-full object-cover object-center opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07182b] via-[#0b2038]/95 to-[#0b2038]/65" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07182b]/65 to-transparent" />
        </div>

        <div className="pointer-events-none absolute -right-20 -top-36 -z-10 h-[430px] w-[430px] rounded-full border border-[#dfbd77]/10" />
        <div className="pointer-events-none absolute -right-5 -top-20 -z-10 h-[290px] w-[290px] rounded-full border border-[#dfbd77]/10" />

        <div className="mx-auto max-w-[1380px] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <nav className="flex flex-wrap items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55">
            <Link to="/" className="transition hover:text-[#dfbd77]">
              Home
            </Link>
            <span>/</span>
            <Link
              to="/academics"
              className="transition hover:text-[#dfbd77]"
            >
              Academics
            </Link>
            <span>/</span>
            <span className="text-[#dfbd77]">Faculties & Labs</span>
          </nav>

          <div className="mt-12 max-w-4xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-9 bg-[#b99754]" />
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#a17c3d]">
                Faculties & Practical Laboratories | Khwopa College
              </p>
            </div>

            <h1 className="font-serif text-5xl leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[78px]">
              Faculties &
              <span className="block italic text-[#dfbd77]">Academic Labs.</span>
            </h1>

            <p className="editorial-copy mt-7 max-w-2xl text-[15px] leading-7 text-white/70 sm:text-base">
              Explore the four core faculties and state-of-the-art laboratory infrastructure across Science, Management, Humanities, and Law at Khwopa Secondary School (+2).
            </p>
          </div>

          {/* Hero statistics */}
          <div className="mt-14 grid max-w-3xl grid-cols-2 gap-8 border-t border-white/15 pt-7 sm:grid-cols-3">
            <div>
              <p className="font-serif text-3xl text-[#dfbd77]">
                04
              </p>
              <p className="mt-2 text-[9px] uppercase tracking-[0.16em] text-white/50">
                Core Faculties
              </p>
            </div>

            <div className="border-l border-white/15 pl-5 md:pl-8">
              <p className="font-serif text-2xl text-white">
                {String(totalProgrammes).padStart(2, "0")}+
              </p>
              <p className="mt-2 text-[9px] uppercase tracking-[0.16em] text-white/50">
                Specialized Labs & Streams
              </p>
            </div>

            <div className="border-l border-white/15 pl-5 md:pl-8">
              <p className="font-serif text-2xl text-white">
                +2
              </p>
              <p className="mt-2 text-[9px] uppercase tracking-[0.16em] text-white/50">
                Grade 11 & 12 | NEB
              </p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 h-px w-full bg-[#dfbd77]/50" />
      </section>

      {/* Introduction */}
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-[1fr_0.8fr] md:items-center md:py-24">
        <div>
          <SectionHeading
            eyebrow="Practical Academic Excellence"
            title="Rigorous theory. Authentic hands-on laboratories."
            description="Explore the +2 Science, Management, Humanities, and Law faculties supported by specialized wet laboratories, high-speed computer terminals, and simulated moot courts."
          />

          <p className="editorial-copy max-w-2xl text-[15px] leading-8 text-slate-600">
            At Khwopa Secondary School (+2), practical learning is an integral cornerstone of the NEB curriculum. Each faculty operates specialized practical facilities guided by senior subject lecturers, ensuring students develop scientific verification, computational, and analytical rigor.
          </p>
        </div>

        <div className="relative">
          <div className="absolute -bottom-4 -left-4 h-full w-full rounded-2xl border border-[#c5a15d]/50" />

          <div className="relative overflow-hidden rounded-2xl bg-[#10243b] p-8 text-white md:p-10 shadow-xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#dfbd77]">
              Dedicated to country and people
            </p>

            <h3 className="mt-5 font-serif text-3xl font-semibold leading-tight">
              Education as a foundation for a stronger society.
            </h3>

            <p className="editorial-copy mt-5 text-[15px] leading-7 text-white/65">
              Khwopa College is a community institution undertaken by
              Bhaktapur Municipality, affiliated with the National Examinations Board (NEB) for Grades 11 and 12.
            </p>

            <Link
              to="/about/faculty"
              className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#dfbd77] transition hover:gap-3"
            >
              Meet our 110+ faculty & mentors <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* +2 Streams & Faculty Breakdown */}
      <section
        id="academic-areas"
        className="scroll-mt-20 bg-[#f0ede5] py-16 md:py-24"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Explore our +2 faculties"
            title="Departments, HODs & Academic Pathways."
            description="Browse the faculties and review their published subject groups, department leadership, and practical lab infrastructure."
          />

          {/* Interactive filters */}
          <div className="mb-9 flex flex-wrap gap-2">
            {FILTERS.map((filter) => {
              const isActive = activeFilter === filter.value;

              return (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => setActiveFilter(filter.value)}
                  aria-pressed={isActive}
                  className={`rounded-lg px-5 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-[#10243b] text-white shadow-sm"
                      : "border border-[#ded7ca] bg-white text-[#536174] hover:border-[#c5a15d] hover:text-[#10243b]"
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>

          <div className="grid items-start gap-7 lg:grid-cols-2 xl:grid-cols-3">
            {visibleDepartments.map((department) => (
              <DepartmentCard
                key={department.id}
                department={department}
              />
            ))}
          </div>

          {visibleDepartments.length === 0 && (
            <div className="rounded-2xl border border-[#e8e2d6] bg-white p-10 text-center">
              <p className="text-sm text-slate-600">
                No streams match this selection.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* DEDICATED LABORATORIES & PRACTICAL FACILITIES GALLERY */}
      <section className="border-t border-[#e8e2d6] bg-[#fbfaf7] px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="State-of-the-Art Practical Infrastructure"
            title="Specialized College Laboratories & Chambers."
            description="Explore authentic photographs and detailed equipment profiles of Khwopa's dedicated academic laboratories."
          />

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {DEDICATED_LABS.map((lab) => (
              <article
                key={lab.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-[#e5dece] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#b99754] hover:shadow-xl"
              >
                {/* Real Lab Image */}
                <div className="relative h-52 overflow-hidden bg-[#10243b]">
                  <img
                    src={lab.image}
                    alt={lab.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#091b30] via-[#091b30]/40 to-transparent" />

                  {/* Faculty Badge */}
                  <div className="absolute left-3 top-3">
                    <span className="rounded-md border border-[#dfbd77]/40 bg-[#091b30]/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#dfbd77] shadow-sm backdrop-blur-sm">
                      {lab.faculty}
                    </span>
                  </div>

                  {/* Specialization Badge */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="inline-block rounded-md border border-white/20 bg-white/20 px-2.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
                      🏛️ {lab.badge}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#10243b] group-hover:text-[#a17c3d] transition-colors">
                      {lab.name}
                    </h3>

                    <p className="mt-3 text-xs leading-6 text-[#647184]">
                      {lab.description}
                    </p>

                    {/* Features list */}
                    <div className="mt-5 border-t border-[#f0ebe0] pt-4">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#92703b]">
                        Key Facilities & Equipment:
                      </p>
                      <ul className="mt-2.5 space-y-1.5">
                        {lab.features.map((feat) => (
                          <li
                            key={feat}
                            className="flex items-start gap-2 text-[11px] leading-5 text-[#526174]"
                          >
                            <span className="text-[#a17c3d] mt-0.5">✓</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-[#f0ebe0] pt-4">
                    <Link
                      to={lab.route}
                      className="inline-flex items-center gap-2 text-xs font-bold text-[#10243b] transition hover:text-[#a17c3d]"
                    >
                      View curriculum integration
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Academic guidance */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="Planning your studies"
              title="Choose a stream with the right information."
              description="Understanding a stream before applying can help you make a more informed academic decision."
            />

            <Link
              to="/about/facilities"
              className="inline-flex items-center gap-2 rounded-xl bg-[#10243b] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#1c3857] shadow-sm"
            >
              Explore all campus facilities <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="space-y-3">
            {[
              {
                number: "01",
                title: "Explore the stream & laboratories",
                description:
                  "Understand the subject group, laboratory equipment, practical schedules, and the stream's general focus.",
              },
              {
                number: "02",
                title: "Check the current requirements",
                description:
                  "Review the latest official admission notice for eligibility, fees and application deadlines.",
              },
              {
                number: "03",
                title: "Contact the college",
                description:
                  "Ask the administration about current stream availability and laboratory practical arrangements.",
              },
            ].map((item) => (
              <div
                key={item.number}
                className="flex gap-5 rounded-2xl border border-[#e8e2d6] bg-white p-6 shadow-sm"
              >
                <span className="font-serif text-2xl font-bold text-[#b99754]">
                  {item.number}
                </span>

                <div>
                  <h3 className="font-serif text-xl font-bold text-[#10243b]">
                    {item.title}
                  </h3>
                  <p className="editorial-copy mt-2 text-[15px] leading-7 text-slate-600">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty and staff connection */}
      <section className="bg-[#10243b]">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-14 sm:px-8 md:flex-row md:items-center md:justify-between md:py-16">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#dfbd77]">
              Meet the academic community
            </p>

            <h2 className="mt-4 font-serif text-3xl font-semibold text-white md:text-4xl">
              Get to know our 110+ faculty and staff.
            </h2>

            <p className="editorial-copy mt-4 text-[15px] leading-7 text-white/65">
              Visit the faculty and staff directory to explore the complete teaching roster across Science, Management, Humanities, and Law with full subject and stream filters.
            </p>
          </div>

          <Link
            to="/about/faculty"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#dfbd77] px-6 py-3.5 text-sm font-bold text-[#10243b] transition hover:bg-[#edcf91] shadow-md"
          >
            Faculty & Staff Directory <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* Important note */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="rounded-2xl border border-[#e5dece] bg-[#fbf8f1] p-6 md:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#a98545]">
            Academic information notice
          </p>

          <p className="editorial-copy mt-3 max-w-5xl text-[15px] leading-7 text-slate-600">
            This page presents the official +2 academic faculties and practical laboratories for
            reference. Confirm the current subject combination, laboratory practical slots, eligibility,
            availability and admission details through the college's latest
            official notice before applying.
          </p>
        </div>
      </section>
    </main>
  );
}

export default DepartmentsPage;
