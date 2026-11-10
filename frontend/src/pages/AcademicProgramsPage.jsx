
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ExternalLinkIcon,
} from "../components/Icons";

const campusImage =
  "https://wms.edigitalnepal.com/wms/files/ws-post-images/1678958957817_007be5e2-a1dc-4580-9809-4964d79fa1a0.jpg";

const fallbackImage =
  "https://www.cijnepal.org/wp-content/uploads/2018/09/11.jpg";

const programmes = [
  {
    id: "plus-two-science",
    code: "+2 SCIENCE",
    fullName: "+2 Science",
    level: "+2",
    stream: "Grade 11 & 12",
    faculty: "Science",
    description:
      "A rigorous higher-secondary stream backed by Physics, Chemistry, Biology and Computer Science laboratories preparing students for Engineering, Medicine and Pure Sciences.",
    details:
      "Minimum GPA 2.4 in SEE with C+ in Science and Compulsory Mathematics. Weekly 3-hour laboratory practical rotations.",
    subjects: [
      "English",
      "Nepali",
      "Mathematics",
      "Physics",
      "Chemistry",
      "Computer Science or Biology",
    ],
  },
  {
    id: "plus-two-management",
    code: "+2 MANAGEMENT",
    fullName: "+2 Management",
    level: "+2",
    stream: "Grade 11 & 12",
    faculty: "Management",
    description:
      "A comprehensive higher-secondary stream introducing accountancy, economics, business studies, hotel management and computing.",
    details:
      "Minimum GPA 2.0 in SEE. Includes computerized accounting software training and hospitality demonstration labs.",
    subjects: [
      "Nepali",
      "English",
      "Social Studies & Life Skills Education or Mathematics",
      "Accounting",
      "Economics",
      "Computer Science, Hotel Management, Business Mathematics or Business Studies",
    ],
  },
  {
    id: "plus-two-humanities",
    code: "+2 HUMANITIES",
    fullName: "+2 Humanities",
    level: "+2",
    stream: "Grade 11 & 12",
    faculty: "Humanities & Law",
    description:
      "Nurtures social consciousness, journalism, public policy and literary inquiry through Sociology, Mass Communication and Languages.",
    details:
      "Minimum GPA 1.6 in SEE. Includes community heritage fieldwork and media communication workshops in Bhaktapur.",
    subjects: [
      "English",
      "Nepali",
      "Sociology",
      "Mass Communication",
      "Major English / Major Nepali",
      "Political Science or Economics",
    ],
  },
  {
    id: "plus-two-law",
    code: "+2 LAW",
    fullName: "+2 Law",
    level: "+2",
    stream: "Grade 11 & 12",
    faculty: "Humanities & Law",
    description:
      "Foundational legal education in Constitutional Law, Jurisprudence, Nepalese Legal System, Legal Drafting and Moot Court advocacy.",
    details:
      "Minimum GPA 2.0 in SEE. Includes simulated moot courtroom trial practice and legal drafting workshops.",
    subjects: [
      "English",
      "Nepali",
      "Constitutional Law",
      "Nepalese Legal System",
      "General Principles of Law & Jurisprudence",
      "Procedural Law & Legal Drafting",
    ],
  },
];

const facultyFilters = [
  "All",
  "Science",
  "Management",
  "Humanities & Law",
];

function Eyebrow({ children, light = false }) {
  return (
    <div
      className={`mb-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.22em] ${
        light ? "text-[#dfbd77]" : "text-[#92703b]"
      }`}
    >
      <span className="h-px w-9 bg-current" />
      {children}
    </div>
  );
}

/* ---------------- HERO ---------------- */

function AcademicHero() {
  const [image, setImage] = useState(campusImage);

  return (
    <section className="relative isolate overflow-hidden bg-[#0b2038] text-white">
      <div className="absolute inset-0 -z-10">
        <img
          src={image}
          alt="Khwopa College campus in Bhaktapur"
          onError={() => setImage(fallbackImage)}
          className="h-full w-full object-cover opacity-35"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#07182b] via-[#0b2038]/95 to-[#0b2038]/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07182b]/65 to-transparent" />
      </div>

      <div className="pointer-events-none absolute -right-20 -top-36 -z-10 h-[430px] w-[430px] rounded-full border border-[#dfbd77]/10" />
      <div className="pointer-events-none absolute -right-5 -top-20 -z-10 h-[290px] w-[290px] rounded-full border border-[#dfbd77]/10" />

      <div className="mx-auto max-w-[1380px] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55">
          <Link to="/" className="hover:text-[#dfbd77]">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#dfbd77]">Academics</span>
        </div>

        <div className="mt-12 max-w-4xl">
          <Eyebrow light>Discover your academic path</Eyebrow>

          <h1 className="font-serif text-5xl leading-[1.06] sm:text-6xl lg:text-[78px]">
            Learn with purpose.
            <span className="block italic text-[#dfbd77]">
              Grow with knowledge.
            </span>
          </h1>

          <p className="editorial-copy mt-7 max-w-2xl text-[15px] leading-7 text-white/70 sm:text-base">
            Explore Khwopa College's higher-secondary education in
            Science and Management for Grades 11 and 12.
          </p>

        </div>

        <div className="mt-16 flex flex-wrap gap-x-12 gap-y-5 border-t border-white/15 pt-7">
          {[
            ["+2 Science", "Grades 11 & 12"],
            ["+2 Management", "Grades 11 & 12"],
          ].map(([title, subtitle]) => (
            <div key={title}>
              <p className="font-serif text-xl text-[#dfbd77]">
                {title}
              </p>
              <p className="mt-1 text-[9px] uppercase tracking-[0.15em] text-white/50">
                {subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 h-px w-full bg-[#dfbd77]/50" />
    </section>
  );
}

/* ---------------- PROGRAMME CARD ---------------- */

function ProgrammeCard({ programme, index, expanded, onToggle }) {
  const facultyColors = {
    Management: "bg-[#eee7d8] text-[#92703b]",
    Science: "bg-[#e4ece6] text-[#406a54]",
  };

  return (
    <article
      className={`group flex h-full flex-col rounded-md border bg-[#fbfaf7] transition duration-300 ${
        expanded
          ? "border-[#b99754] shadow-[0_15px_40px_rgba(11,32,56,0.09)]"
          : "border-[#e6dfd3] hover:-translate-y-1 hover:border-[#b99754] hover:shadow-lg"
      }`}
    >
      <div className="p-6 sm:p-7">
        <div className="flex items-center justify-between gap-3">
          <span className="font-serif text-3xl text-[#b99754]">
            {String(index + 1).padStart(2, "0")}
          </span>

          <span
            className={`rounded-sm px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.13em] ${
              facultyColors[programme.faculty]
            }`}
          >
            {programme.faculty}
          </span>
        </div>

        <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.17em] text-[#a17c3d]">
          {programme.level}
        </p>

        <h3 className="mt-2 font-serif text-2xl leading-tight text-[#12243a] sm:text-3xl">
          {programme.fullName}
        </h3>

        <p className="editorial-copy mt-3 text-[15px] leading-7 text-[#68717d]">
          {programme.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {programme.subjects.map((subject) => (
            <span
              key={subject}
              className="border border-[#e6dfd3] bg-white px-2.5 py-1.5 text-[9px] text-[#667181]"
            >
              {subject}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-auto border-t border-[#e6dfd3]">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={expanded}
          className="flex w-full items-center justify-between gap-3 px-6 py-4 text-left text-xs font-bold text-[#92703b] transition hover:bg-[#f0ece2] sm:px-7"
        >
          {expanded ? "Close programme overview" : "View programme overview"}

          <span
            className={`text-lg transition-transform ${
              expanded ? "rotate-45" : ""
            }`}
          >
            +
          </span>
        </button>

        {expanded && (
          <div className="border-t border-[#e6dfd3] bg-[#f2eee5] px-6 py-5 sm:px-7">
            <p className="editorial-copy text-[15px] leading-7 text-[#566474]">
              {programme.details}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#92703b]">
                Source:
              </span>

              <span className="text-[10px] text-[#68717d]">
                Confirm current details with the college
              </span>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

/* ---------------- PROGRAMME DIRECTORY ---------------- */

function ProgrammeDirectory() {
  const [faculty, setFaculty] = useState("All");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  const filteredProgrammes = useMemo(() => {
    const query = search.trim().toLowerCase();

    return programmes.filter((programme) => {
      const facultyMatch =
        faculty === "All" || programme.faculty === faculty;

      const searchableText = [
        programme.code,
        programme.fullName,
        programme.faculty,
        programme.level,
        programme.description,
        ...programme.subjects,
      ]
        .join(" ")
        .toLowerCase();

      return (
        facultyMatch &&
        (!query || searchableText.includes(query))
      );
    });
  }, [faculty, search]);

  return (
    <section
      id="programme-directory"
      className="scroll-mt-24 bg-[#f2eee5] px-5 py-20 sm:px-8 lg:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-[1300px]">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            <Eyebrow>+2 academic streams</Eyebrow>

            <h2 className="font-serif text-4xl leading-tight text-[#12243a] sm:text-5xl">
              Choose your stream.
              <span className="block italic text-[#a17c3d]">
                Discover your future.
              </span>
            </h2>
          </div>

          <p className="editorial-copy text-[15px] leading-7 text-[#68717d]">
            Khwopa College offers +2 education in two focused streams:
            Science and Management.
          </p>
        </div>

        {/* Search */}
        <div className="mt-12 max-w-xl">
          <label
            htmlFor="programme-search"
            className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-[#92703b]"
          >
            Search streams
          </label>

          <div className="flex items-center gap-3 border border-[#ddd5c7] bg-[#fbfaf7] px-4 py-4 focus-within:border-[#b99754]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              className="h-5 w-5 text-[#a17c3d]"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m16 16 5 5" />
            </svg>

            <input
              id="programme-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by stream or subject..."
              className="w-full bg-transparent text-sm text-[#12243a] outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="mt-7 border-b border-[#dcd3c4] pb-7">
          <div>
            <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.15em] text-[#8d7957]">
              +2 stream
            </p>

            <div className="flex flex-wrap gap-2">
              {facultyFilters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  aria-pressed={faculty === filter}
                  onClick={() => {
                    setFaculty(filter);
                    setExpandedId(null);
                  }}
                  className={`rounded-sm px-4 py-2.5 text-xs font-semibold transition ${
                    faculty === filter
                      ? "bg-[#b99754] text-[#12243a]"
                      : "border border-[#ded6c8] bg-[#fbfaf7] text-[#657181] hover:border-[#b99754]"
                  }`}
                >
                  {filter === "All" ? "All streams" : filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results heading */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-[#68717d]">
            Showing{" "}
            <strong className="text-[#12243a]">
              {filteredProgrammes.length}
            </strong>{" "}
            streams
          </p>

          <button
            type="button"
            onClick={() => {
              setFaculty("All");
              setSearch("");
              setExpandedId(null);
            }}
            className="text-[10px] font-bold uppercase tracking-[0.13em] text-[#92703b] hover:text-[#12243a]"
          >
            Reset filters
          </button>
        </div>

        {/* Programme cards */}
        {filteredProgrammes.length > 0 ? (
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredProgrammes.map((programme, index) => (
              <ProgrammeCard
                key={programme.id}
                programme={programme}
                index={index}
                expanded={expandedId === programme.id}
                onToggle={() =>
                  setExpandedId((current) =>
                    current === programme.id ? null : programme.id
                  )
                }
              />
            ))}
          </div>
        ) : (
          <div className="mt-8 border border-[#ded7ca] bg-[#fbfaf7] px-6 py-14 text-center">
            <h3 className="font-serif text-2xl text-[#12243a]">
              No matching streams
            </h3>

            <p className="mt-3 text-sm text-[#68717d]">
              Try another search term or change the filters.
            </p>

            <button
              type="button"
              onClick={() => {
                setFaculty("All");
                setSearch("");
              }}
              className="mt-6 rounded-md bg-[#12243a] px-5 py-3 text-xs font-bold text-white hover:bg-[#233d5a]"
            >
              Show all streams
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------------- ACADEMIC PATHWAYS ---------------- */

function AcademicPathways() {
  const pathways = [
    {
      number: "01",
      title: "+2 Science",
      description:
        "A higher-secondary stream that develops scientific curiosity, analytical thinking and a foundation for further study.",
      programmes:
        "English, Nepali, Mathematics, Physics, Chemistry, and Computer Science or Biology",
    },
    {
      number: "02",
      title: "+2 Management",
      description:
        "A higher-secondary stream introducing business, accounting, economics and organisational management.",
      programmes:
        "Nepali, English, Social Studies & Life Skills Education or Mathematics, Accounting, Economics, and one listed optional subject",
    },
  ];

  return (
    <section className="bg-[#0b2038] px-5 py-20 text-white sm:px-8 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1300px]">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <Eyebrow light>+2 pathways</Eyebrow>

            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
              Two streams.
              <span className="block italic text-[#dfbd77]">
                Shared purpose.
              </span>
            </h2>
          </div>

          <p className="editorial-copy max-w-xl text-[15px] leading-7 text-white/60">
            Both +2 streams support strong academic foundations and
            informed choices for the next stage of study.
          </p>
        </div>

        <div className="mt-12 grid gap-px border border-white/10 bg-white/10 md:grid-cols-2">
          {pathways.map((pathway) => (
            <article
              key={pathway.number}
              className="bg-[#102943] p-7 transition hover:bg-[#173651] sm:p-9"
            >
              <span className="font-serif text-3xl text-[#dfbd77]">
                {pathway.number}
              </span>

              <h3 className="mt-7 font-serif text-2xl text-white">
                {pathway.title}
              </h3>

              <p className="editorial-copy mt-4 min-h-[70px] text-[15px] leading-7 text-white/55">
                {pathway.description}
              </p>

              <div className="mt-7 border-t border-white/15 pt-5">
                <p className="text-[9px] font-bold uppercase tracking-[0.17em] text-[#dfbd77]">
                  Indicative subject areas
                </p>

                <p className="mt-3 text-xs leading-6 text-white/75">
                  {pathway.programmes}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- ADMISSION INFORMATION ---------------- */

function AdmissionInformation() {
  return (
    <section
      id="academic-information"
      className="scroll-mt-24 bg-[#f7f5f0] px-5 py-20 sm:px-8 lg:px-10 lg:py-24"
    >
      <div className="mx-auto max-w-[1300px]">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <Eyebrow>Planning your education</Eyebrow>

            <h2 className="font-serif text-4xl leading-tight text-[#12243a] sm:text-5xl">
              Find the right
              <span className="block italic text-[#a17c3d]">
                information before applying.
              </span>
            </h2>

            <p className="editorial-copy mt-6 max-w-xl text-[15px] leading-7 text-[#68717d]">
              Stream eligibility, entrance requirements, fees,
              subject combinations and admission availability may vary by
              academic session. Refer to the latest
              official college announcements before applying.
            </p>

            <a
              href="https://khwopacollege.edu.np/"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-4 rounded-md bg-[#12243a] px-6 py-4 text-xs font-bold text-white transition hover:bg-[#233d5a]"
            >
              Visit official college website
              <ExternalLinkIcon />
            </a>
          </div>

          <div className="border border-[#e5ddce] bg-[#fbfaf7] p-7 sm:p-9">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a17c3d]">
              Before choosing a stream
            </p>

            <div className="mt-6 space-y-5">
              {[
                [
                  "Eligibility",
                  "Check the current admission and academic entry requirements.",
                ],
                [
                  "Curriculum",
                  "Review the current +2 curriculum and subject combination.",
                ],
                [
                  "Duration and structure",
                  "Confirm the Grade 11–12 structure and study schedule.",
                ],
                [
                  "Admission availability",
                  "Check the latest college admission notices and deadlines.",
                ],
              ].map(([title, description], index) => (
                <div
                  key={title}
                  className="flex gap-4 border-b border-[#e8e1d5] pb-5 last:border-0 last:pb-0"
                >
                  <span className="font-serif text-xl text-[#b99754]">
                    0{index + 1}
                  </span>

                  <div>
                    <h3 className="text-sm font-bold text-[#12243a]">
                      {title}
                    </h3>

                    <p className="mt-2 text-xs leading-6 text-[#68717d]">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SOURCES ---------------- */

function ProgrammeSources() {
  return (
    <section className="border-y border-[#e5ddce] bg-[#efede6] px-5 py-10 sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-[1300px] flex-col justify-between gap-6 lg:flex-row lg:items-center">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#92703b]">
            +2 programme information
          </p>

          <h3 className="mt-2 font-serif text-2xl text-[#12243a]">
            Current details should come from the college
          </h3>

          <p className="mt-2 max-w-2xl text-xs leading-6 text-[#68717d]">
            This page lists the published +2 Science and Management
            subject combinations, including alternative choices. Confirm
            the current combination, eligibility, fees and availability
            through official college notices before applying.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href="https://khwopacollege.edu.np/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-[#12243a] px-4 py-3 text-xs font-bold text-white transition hover:bg-[#233d5a]"
          >
            Official college website <ExternalLinkIcon />
          </a>
        </div>
      </div>

      <p className="mx-auto mt-6 max-w-[1300px] text-[10px] leading-5 text-[#92969b]">
        This page is not a current admission notice. Verify +2 stream
        availability and application deadlines directly with the college.
      </p>
    </section>
  );
}

/* ---------------- PAGE NAVIGATION ---------------- */

function PageNavigation() {
  return (
    <section className="bg-[#fbfaf7] px-5 py-10 sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-[1300px] flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to="/"
          className="text-sm text-[#647184] transition hover:text-[#a17c3d]"
        >
          <span className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-[#a17c3d]">
            Return
          </span>

          <span className="inline-flex items-center gap-2 font-medium">
            <ArrowLeftIcon />
            College homepage
          </span>
        </Link>

        <Link
          to="/about"
          className="text-left text-sm text-[#647184] transition hover:text-[#a17c3d] sm:text-right"
        >
          <span className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-[#a17c3d]">
            Continue exploring
          </span>

          <span className="inline-flex items-center justify-end gap-2 font-medium">
            About Khwopa
            <ArrowRightIcon />
          </span>
        </Link>
      </div>
    </section>
  );
}

/* ---------------- MAIN PAGE ---------------- */

export default function AcademicProgramsPage() {
  return (
    <main className="bg-[#f7f5f0]">
      <AcademicHero />
      <ProgrammeDirectory />
      <AcademicPathways />
      <AdmissionInformation />
      <ProgrammeSources />
      <PageNavigation />
    </main>
  );
}
