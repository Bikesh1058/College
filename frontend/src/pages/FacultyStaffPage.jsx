import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowRightIcon } from "../components/Icons";
import { facultyMembers, facultyMembers as localFaculty } from '../data/facultyData';
import { api } from "../services/api";

const facultyBannerImage =
  "https://wms.edigitalnepal.com/wms/files/ws-post-images/1751512628392_35a0f113-7f94-43bb-9bf6-4a2d56daf8d6.jpg";

const campusImage =
  "https://wms.edigitalnepal.com/wms/files/ws-profile/1751348345531_a4a2aae5-8df1-4a63-b163-31f03f657c13.png";

/*
  Official Faculty, Teaching Staff and Academic Leadership Roster
  Sourced directly from Khwopa's institutional registries, official academic departments,
  subject divisions, and verified high-resolution photograph assets.
*/

const STREAM_FILTERS = [
  "All Streams",
  "Science",
  "Management",
  "Humanities & Law",
];

const ROLE_FILTERS = [
  "All Roles",
  "Chairman",
  "Principal",
  "Vice Principal",
  "HOD",
  "Teaching Faculty",
];

const SUBJECT_FILTERS = [
  "All Subjects",
  "Physics",
  "Chemistry",
  "Mathematics",
  "Computer Science",
  "Accountancy",
  "Economics",
  "Business Studies",
  "English",
  "Nepali",
  "Law",
  "Sociology",
];

const academicAreas = [
  {
    id: "science",
    number: "01",
    title: "+2 Science Faculty & Laboratories",
    image: "https://wms.edigitalnepal.com/wms/files/ws-post-images/1751519828524_e4439fe2-801b-494c-8a2d-a89d2053bc77.png",
    labBadge: "Physics, Chemistry & Biology Wet Labs",
    description:
      "Modern Physics, Chemistry, Biology and high-speed Computer Science laboratories equipped for hands-on NEB practicals under senior faculty supervision.",
    subjects: ["Physics", "Chemistry", "Biology", "Mathematics", "Computer Science"],
    route: "/academics/science",
  },
  {
    id: "management",
    number: "02",
    title: "+2 Management Faculty & IT Lab",
    image: "https://wms.edigitalnepal.com/wms/files/ws-post-images/1751519692269_d079f3e5-f915-4d9a-be18-6e19ced18c2e.png",
    labBadge: "Computerized Accounting & Tally Lab",
    description:
      "Dedicated computer terminal lab with Tally, spreadsheets, and business analytics, alongside practical culinary and hotel demonstration workshops.",
    subjects: ["Accountancy", "Economics", "Business Studies", "Computer Science", "Hotel Management"],
    route: "/academics/management",
  },
  {
    id: "humanities",
    number: "03",
    title: "+2 Humanities & Social Research Cell",
    image: "https://wms.edigitalnepal.com/wms/files/ws-media-images/1751355381420-4ac05be0-9eeb-41ce-a554-074a7a659f79.jpg",
    labBadge: "Media Lab & Community Heritage Fieldwork",
    description:
      "Media and feature writing workstations, audio recorders, sociological surveys, and community heritage observation cells in historic Bhaktapur.",
    subjects: ["Sociology", "Mass Communication", "Political Science", "English", "Nepali"],
    route: "/academics/humanities-social-sciences",
  },
  {
    id: "law",
    number: "04",
    title: "+2 Law Faculty & Moot Court",
    image: "https://wms.edigitalnepal.com/wms/files/ws-post-images/1781678200024_c36f13dd-8bad-4e5f-a44d-7c98fe64603a.jpg",
    labBadge: "Simulated Courtroom Practice Chamber",
    description:
      "Full simulated moot courtroom with judge's bench, bar podiums, and legal statutes where students practice procedural argumentation and trial advocacy.",
    subjects: ["Constitutional Law", "Nepalese Legal System", "Procedural Law", "Moot Court Practice"],
    route: "/academics/humanities-social-sciences",
  },
];

/* ---------------- SAFE IMAGE FALLBACK COMPONENT ---------------- */

function ImageWithFallback({ src, fallback, alt, className = "" }) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <img
      src={imgSrc}
      alt={alt}
      loading="lazy"
      onError={() => {
        if (imgSrc !== fallback) setImgSrc(fallback);
      }}
      className={className}
    />
  );
}

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

/* ---------------- HERO SECTION ---------------- */

function FacultyHero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#091b30] text-white">
      <div className="absolute inset-0 -z-10">
        <ImageWithFallback
          src={facultyBannerImage}
          fallback={campusImage}
          alt="Khwopa Secondary School Assembly"
          className="h-full w-full object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07182b] via-[#0b2038]/95 to-[#0b2038]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07182b]/80 to-transparent" />
      </div>

      <div className="pointer-events-none absolute -right-20 -top-36 -z-10 h-[430px] w-[430px] rounded-full border border-[#dfbd77]/10" />
      <div className="pointer-events-none absolute -right-5 -top-20 -z-10 h-[290px] w-[290px] rounded-full border border-[#dfbd77]/10" />

      <div className="mx-auto max-w-[1380px] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <div className="flex flex-wrap items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55">
          <Link to="/" className="transition hover:text-[#dfbd77]">
            Home
          </Link>
          <span>/</span>
          <Link to="/about" className="transition hover:text-[#dfbd77]">
            About
          </Link>
          <span>/</span>
          <span className="text-[#dfbd77]">Faculty & Staff</span>
        </div>

        <div className="mt-12 max-w-4xl">
          <Eyebrow light>Our Academic Community</Eyebrow>

          <h1 className="font-serif text-5xl leading-[1.05] sm:text-6xl lg:text-[78px]">
            Leadership, Mentors
            <span className="block italic text-[#dfbd77]">
              & Scholarly Guides.
            </span>
          </h1>

          <p className="editorial-copy mt-7 max-w-2xl text-[15px] leading-7 text-white/75 sm:text-base">
            Meet the experienced educators, department heads, and visionary leaders dedicated to shaping Nepal's next generation of scientists, managers, jurists, and scholars at Khwopa Secondary School across Science, Management, Humanities, and Law.
          </p>
        </div>

        <div className="mt-16 flex max-w-3xl flex-wrap items-center gap-x-9 gap-y-4 border-t border-white/20 pt-7">
          <div>
            <p className="font-serif text-2xl font-bold text-[#dfbd77]">
              {facultyMembers.length}
            </p>
            <p className="mt-1 text-[9px] uppercase tracking-[0.15em] text-white/50">
              Total Faculty & Leaders
            </p>
          </div>

          <div className="hidden h-9 w-px bg-white/20 sm:block" />

          <div>
            <p className="font-serif text-2xl font-bold text-[#dfbd77]">
              100%
            </p>
            <p className="mt-1 text-[9px] uppercase tracking-[0.15em] text-white/50">
              NEB Certified Mentors
            </p>
          </div>

          <div className="hidden h-9 w-px bg-white/20 sm:block" />

          <div>
            <p className="font-serif text-2xl font-bold text-[#dfbd77]">
              4 Streams
            </p>
            <p className="mt-1 text-[9px] uppercase tracking-[0.15em] text-white/50">
              Science, Mgmt, Hum & Law
            </p>
          </div>
        </div>
      </div>

      <div className="h-px w-full bg-[#dfbd77]/50" />
    </section>
  );
}

/* ---------------- PEOPLE DIRECTORY WITH MULTI-LEVEL FILTERS ---------------- */

function FacultyDirectory() {
  const [activeStream, setActiveStream] = useState("All Streams");
  const [activeRole, setActiveRole] = useState("All Roles");
  const [activeSubject, setActiveSubject] = useState("All Subjects");
  const [search, setSearch] = useState("");

  // Fetch dynamic faculty from MERN API with local fallback
  const { data: apiResponse } = useQuery({
    queryKey: ["faculty"],
    queryFn: () => api.getFaculty(),
  });

  const facultyList = apiResponse?.data?.length ? apiResponse.data : localFaculty;

  const filteredMembers = useMemo(() => {
    return facultyList.filter((member) => {
      // 1. Stream filter
      const matchesStream =
        activeStream === "All Streams" || member.facultyStream === activeStream;

      // 2. Role filter
      const matchesRole =
        activeRole === "All Roles" || member.roleCategory === activeRole;

      // 3. Subject filter
      const matchesSubject =
        activeSubject === "All Subjects" ||
        member.subject.toLowerCase().includes(activeSubject.toLowerCase());

      // 4. Text search query
      const query = search.trim().toLowerCase();
      const matchesSearch =
        !query ||
        `${member.name} ${member.designation} ${member.department} ${member.qualification} ${member.subject} ${member.facultyStream} ${member.roleCategory}`
          .toLowerCase()
          .includes(query);

      return matchesStream && matchesRole && matchesSubject && matchesSearch;
    });
  }, [facultyList, activeStream, activeRole, activeSubject, search]);

  const handleResetFilters = () => {
    setActiveStream("All Streams");
    setActiveRole("All Roles");
    setActiveSubject("All Subjects");
    setSearch("");
  };

  return (
    <section
      id="faculty-directory"
      className="scroll-mt-24 bg-[#f7f5f0] px-5 py-20 sm:px-8 lg:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-[1340px]">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            <Eyebrow>Institutional Directory</Eyebrow>

            <h2 className="font-serif text-4xl leading-tight text-[#12243a] sm:text-5xl">
              Faculty & Academic
              <span className="block italic text-[#a17c3d]">
                Leadership Roster.
              </span>
            </h2>
          </div>

          <p className="max-w-lg text-sm leading-7 text-[#68717d]">
            Filter our teaching faculty by academic stream (Management, Science, Humanities & Law), institutional role, or specific teaching subject.
          </p>
        </div>

        {/* Multi-Dimensional Filter Control Panel */}
        <div className="mt-10 rounded-2xl border border-[#ded7ca] bg-white p-6 shadow-sm">
          {/* Top row: Stream Tabs */}
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[#92703b] mb-2.5">
              1. Filter By Academic Stream
            </span>
            <div className="flex flex-wrap gap-2">
              {STREAM_FILTERS.map((stream) => (
                <button
                  key={stream}
                  type="button"
                  onClick={() => setActiveStream(stream)}
                  className={`rounded-xl px-4 py-2 text-xs font-bold transition duration-200 ${
                    activeStream === stream
                      ? "bg-[#12243a] text-[#dfbd77] shadow-sm"
                      : "border border-[#ded7ca] bg-[#fbfaf7] text-[#556477] hover:border-[#b99754] hover:text-[#12243a]"
                  }`}
                >
                  {stream}
                  {stream === "All Streams"
                    ? ` (${facultyMembers.length})`
                    : ` (${facultyMembers.filter((m) => m.facultyStream === stream).length})`}
                </button>
              ))}
            </div>
          </div>

          {/* Second row: Role Filter Buttons */}
          <div className="mt-5 pt-4 border-t border-[#f0ebe1]">
            <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[#92703b] mb-2.5">
              2. Filter By Institutional Role
            </span>
            <div className="flex flex-wrap gap-2">
              {ROLE_FILTERS.map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setActiveRole(role)}
                  className={`rounded-lg px-3 py-1.5 text-[11px] font-semibold transition duration-200 ${
                    activeRole === role
                      ? "bg-[#a17c3d] text-white shadow-sm"
                      : "border border-[#e2d8c3] bg-white text-[#637184] hover:border-[#a17c3d] hover:text-[#12243a]"
                  }`}
                >
                  {role}
                  {role === "All Roles"
                    ? ` (${facultyMembers.length})`
                    : ` (${facultyMembers.filter((m) => m.roleCategory === role).length})`}
                </button>
              ))}
            </div>
          </div>

          {/* Third row: Subject Filter & Text Search */}
          <div className="mt-5 pt-4 border-t border-[#f0ebe1] flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#92703b] mr-1">
                Subject:
              </span>
              <select
                value={activeSubject}
                onChange={(e) => setActiveSubject(e.target.value)}
                className="rounded-lg border border-[#ded7ca] bg-[#fbfaf7] px-3 py-2 text-xs font-medium text-[#12243a] outline-none focus:border-[#b99754]"
              >
                {SUBJECT_FILTERS.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>

              {(activeStream !== "All Streams" ||
                activeRole !== "All Roles" ||
                activeSubject !== "All Subjects" ||
                search) && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="rounded-lg border border-[#ded7ca] px-3 py-1.5 text-[11px] font-bold text-[#a17c3d] hover:bg-[#f2ece1]"
                >
                  Reset All Filters
                </button>
              )}
            </div>

            {/* Keyword Search Input */}
            <div className="relative w-full max-w-sm">
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search teacher, subject, or role..."
                aria-label="Search faculty and leadership"
                className="w-full rounded-xl border border-[#ded7ca] bg-[#fbfaf7] px-4 py-2.5 pl-10 text-xs text-[#12243a] outline-none transition placeholder:text-slate-400 focus:border-[#b99754] focus:ring-2 focus:ring-[#b99754]/15"
              />
              <svg
                className="absolute left-3.5 top-3 h-4 w-4 text-slate-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="mt-6 flex items-center justify-between text-xs text-[#68717d]">
          <p>
            Showing{" "}
            <strong className="text-[#12243a] font-bold">
              {filteredMembers.length}
            </strong>{" "}
            of {facultyMembers.length} educators & leaders
          </p>
          {(activeStream !== "All Streams" || activeRole !== "All Roles" || activeSubject !== "All Subjects") && (
            <p className="text-[#a17c3d] font-medium">
              Filtered: {[
                activeStream !== "All Streams" ? activeStream : null,
                activeRole !== "All Roles" ? activeRole : null,
                activeSubject !== "All Subjects" ? activeSubject : null
              ].filter(Boolean).join(" | ")}
            </p>
          )}
        </div>

        {/* Faculty Cards Grid - 4 Columns on desktop */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {filteredMembers.map((member) => (
            <article
              key={member.id}
              className={`group flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg ${
                member.roleCategory === "Chairman" || member.roleCategory === "Principal"
                  ? "border-[#b99754] ring-1 ring-[#b99754]/30"
                  : "border-[#e5ddce] hover:border-[#b99754]"
              }`}
            >
              {/* Professional Profile Header with Compact Aspect Ratio */}
              <div className="relative flex items-center justify-center overflow-hidden border-b border-[#f0ebe1] bg-gradient-to-b from-[#f7f5ef] to-[#efeae0] p-5 pt-6">
                {/* Role Category Badge */}
                <span className="absolute left-3 top-3 z-10 rounded-md border border-[#dfbd77]/40 bg-[#091b30] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#dfbd77] shadow-sm">
                  {member.roleCategory}
                </span>

                {/* Faculty Stream Tag */}
                <span className="absolute right-3 top-3 z-10 rounded-md border border-[#e2d8c3] bg-white/90 px-2 py-0.5 text-[9px] font-semibold text-[#8b6727] shadow-sm">
                  {member.facultyStream}
                </span>

                {/* Circular Portrait Frame or Dignified Institutional Monogram Badge */}
                <div className="relative h-36 w-36 overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow-md ring-1 ring-[#0b2038]/10 transition duration-300 group-hover:scale-105 group-hover:ring-[#b99754]/40 sm:h-40 sm:w-40 flex items-center justify-center">
                  {member.image ? (
                    <ImageWithFallback
                      src={member.image}
                      fallback={campusImage}
                      alt={member.name}
                      className="h-full w-full object-cover object-center"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#12243a] via-[#1a3452] to-[#0a1827] text-white">
                      <span className="font-serif text-2xl font-bold tracking-wider text-[#dfbd77]">
                        {member.name
                          .replace(/^Adv\.\s*|^Dr\.\s*/i, "")
                          .split(" ")
                          .slice(0, 2)
                          .map((n) => n[0])
                          .join("")}
                      </span>
                      <span className="mt-1 text-[8px] uppercase tracking-widest text-white/50 font-medium">
                        Khwopa (+2)
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Bio and Credentials */}
              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <div className="flex items-center justify-between gap-1">
                    <p className="line-clamp-1 text-[9px] font-bold uppercase tracking-[0.16em] text-[#92703b]" title={member.department}>
                      {member.department}
                    </p>
                  </div>

                  <h3 className="mt-1.5 font-serif text-xl font-bold text-[#12243a]">
                    {member.name}
                  </h3>

                  <p className="mt-0.5 text-xs font-semibold text-[#1f3a5a]">
                    {member.designation}
                  </p>

                  {/* Subject Tag */}
                  <div className="mt-2 inline-block rounded-md bg-[#f4efe4] px-2 py-0.5 text-[10px] font-semibold text-[#8a6525]">
                    Subject: {member.subject}
                  </div>

                  <p className="editorial-copy mt-2 line-clamp-3 text-xs leading-5 text-[#5e6977]" title={member.qualification}>
                    {member.qualification}
                  </p>
                </div>

                <div className="mt-4 border-t border-[#f0ebe1] pt-2.5 text-[9px] font-bold uppercase tracking-wider text-[#92703b]">
                  Khwopa Secondary School (+2)
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <div className="mt-8 rounded-2xl border border-[#ded7ca] bg-white p-12 text-center shadow-sm">
            <p className="font-serif text-2xl font-bold text-[#12243a]">
              No faculty members found
            </p>
            <p className="mt-2 text-sm text-[#68717d]">
              No matching records for your selected stream, role, or search keyword.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-5 rounded-xl bg-[#12243a] px-5 py-2.5 text-xs font-bold text-[#dfbd77] transition hover:bg-[#233d5a]"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------------- ACADEMIC DEPARTMENTS SECTION ---------------- */

function AcademicAreasSection() {
  return (
    <section className="border-t border-[#e8e2d4] bg-[#fbfaf7] px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1300px]">
        <div className="max-w-3xl">
          <Eyebrow>Four Core Streams</Eyebrow>

          <h2 className="font-serif text-4xl leading-tight text-[#12243a] sm:text-5xl">
            Departments Under
            <span className="block italic text-[#a17c3d]">
              NEB Curriculum.
            </span>
          </h2>

          <p className="editorial-copy mt-6 text-sm leading-7 text-[#5e6977]">
            Khwopa Secondary School offers four dedicated faculties under the National Examinations Board (NEB) for Grades 11 and 12, each supported by subject specialists, computerized workshops, and subject-specific laboratories.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {academicAreas.map((area) => (
            <article
              key={area.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[#ded7ca] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#b99754] hover:shadow-xl"
            >
              {/* Authentic Laboratory & Faculty Image Header */}
              <div className="relative h-48 overflow-hidden bg-[#12243a]">
                <ImageWithFallback
                  src={area.image}
                  fallback={campusImage}
                  alt={area.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#091b30] via-[#091b30]/60 to-transparent" />
                
                {/* Number & Stream Badge */}
                <div className="absolute left-3 top-3 flex items-center gap-2">
                  <span className="rounded-md border border-[#dfbd77]/40 bg-[#091b30]/90 px-2 py-0.5 font-serif text-xs font-bold text-[#dfbd77] shadow-sm">
                    {area.number}
                  </span>
                  <span className="rounded-md border border-white/20 bg-white/20 backdrop-blur-sm px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white">
                    NEB +2
                  </span>
                </div>

                {/* Laboratory Feature Badge */}
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="inline-block rounded-md border border-[#dfbd77]/40 bg-[#091b30]/90 px-2.5 py-1 text-[10px] font-medium text-[#dfbd77] shadow-sm backdrop-blur-sm">
                    🏛️ {area.labBadge}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <h3 className="font-serif text-xl font-bold text-[#12243a] group-hover:text-[#a17c3d] transition-colors">
                  {area.title}
                </h3>

                <p className="mt-3 text-xs leading-6 text-[#68717d]">
                  {area.description}
                </p>

                <div className="mt-4 border-t border-[#f0ebe1] pt-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#92703b]">
                    Curriculum Subjects:
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {area.subjects.map((sub) => (
                      <span
                        key={sub}
                        className="rounded-md bg-[#f4f1ea] px-2 py-0.5 text-[10px] font-medium text-[#556477]"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-6">
                  <Link
                    to={area.route}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#12243a] transition hover:text-[#a17c3d]"
                  >
                    Explore curriculum & labs
                    <ArrowRightIcon className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- MAIN FACULTY & STAFF PAGE ---------------- */

export default function FacultyStaffPage() {
  return (
    <div className="bg-[#f7f5f0] text-[#12243a]">
      <FacultyHero />
      <FacultyDirectory />
      <AcademicAreasSection />
    </div>
  );
}
