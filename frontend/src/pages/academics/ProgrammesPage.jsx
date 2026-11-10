import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PageHero from "../../components/common/PageHero";
import PageContainer from "../../components/common/PageContainer";
import SectionHeading from "../../components/common/SectionHeading";
import SearchBar from "../../components/common/SearchBar";
import FilterBar from "../../components/common/FilterBar";
import EmptyState from "../../components/common/EmptyState";
import CTASection from "../../components/common/CTASection";
import { programmes as localProgrammes } from "../../data/programmes";
import { api } from "../../services/api";

const STREAM_DETAILS = {
  "plus-two-science": {
    image: "https://wms.edigitalnepal.com/wms/files/ws-post-images/1751519828524_e4439fe2-801b-494c-8a2d-a89d2053bc77.png",
    groups: [
      { name: "Biology Group", focus: "Pre-Medical & Life Sciences", subjects: "Physics, Chemistry, Biology, Mathematics, English, Nepali" },
      { name: "Computer Science Group", focus: "Pre-Engineering & Tech", subjects: "Physics, Chemistry, Computer Science, Mathematics, English, Nepali" }
    ],
    highlights: ["Modern Physics, Chemistry & Biology wet labs", "Preparation for IOE (Engineering) & CEE (Medical) entrances", "Weekly 3-hour practical experimental rotations"]
  },
  "plus-two-management": {
    image: "https://wms.edigitalnepal.com/wms/files/ws-post-images/1751519692269_d079f3e5-f915-4d9a-be18-6e19ced18c2e.png",
    groups: [
      { name: "Computer & Math Group", focus: "IT, Analytics & Commerce", subjects: "Accounting, Economics, Computer Science, Business Math, English, Nepali" },
      { name: "Hotel Management Group", focus: "Hospitality & Enterprise", subjects: "Accounting, Economics, Hotel Management, Business Studies, English, Nepali" }
    ],
    highlights: ["Computerized accounting software training", "Hotel management demonstration kitchen & field exposure", "Foundational preparation for CA, ACCA, and business management"]
  },
  "plus-two-humanities": {
    image: "https://wms.edigitalnepal.com/wms/files/ws-media-images/1751355381420-4ac05be0-9eeb-41ce-a554-074a7a659f79.jpg",
    groups: [
      { name: "Social Sciences Group", focus: "Society & Public Policy", subjects: "Sociology, Mass Communication, Political Science, English, Nepali" },
      { name: "Literature Group", focus: "Languages & Humanities", subjects: "Major English, Major Nepali, Social Studies, English, Nepali" }
    ],
    highlights: ["Community observation & heritage walks in historic Bhaktapur", "Feature writing, journalism, and public communication workshops", "Preparation for Civil Services (Lok Sewa) and social work"]
  },
  "plus-two-law": {
    image: "https://wms.edigitalnepal.com/wms/files/ws-post-images/1781678200024_c36f13dd-8bad-4e5f-a44d-7c98fe64603a.jpg",
    groups: [
      { name: "Legal Studies Group", focus: "Jurisprudence & Ethics", subjects: "General Principles of Law, Nepalese Legal System, Constitutional Law, Procedural Law, English, Nepali" }
    ],
    highlights: ["Moot court trial demonstrations & legal argumentation", "Constitutional rights, legal drafting, and courtroom observation", "Direct preparation for 5-Year integrated BA LLB entrance"]
  }
};

export default function ProgrammesPage() {
  const [search, setSearch] = useState("");
  const [facultyFilter, setFacultyFilter] = useState("All");

  const filterOptions = ["All", "Science", "Management", "Humanities & Law"];

  // Fetch dynamic programs from backend MongoDB
  const { data: remoteData } = useQuery({
    queryKey: ['programmes'],
    queryFn: () => api.getProgrammes(),
    staleTime: 60000,
    retry: 1
  });

  const programmesList = useMemo(() => {
    if (remoteData?.data && Array.isArray(remoteData.data) && remoteData.data.length > 0) {
      return remoteData.data.map((p) => {
        const localMatch =
          localProgrammes.find(
            (l) =>
              l.slug === p.slug ||
              l.shortName?.toLowerCase() === p.title?.toLowerCase()
          ) || {};
        const facultySlug =
          p.facultyStream === "Science"
            ? "science"
            : p.facultyStream === "Management"
            ? "management"
            : "humanities-social-sciences";
        return {
          ...localMatch,
          ...p,
          slug: p.slug || localMatch.slug || "plus-two-science",
          code: p.code || localMatch.code || "+2 STREAM",
          shortName: p.title || localMatch.shortName || "+2 Stream",
          fullName:
            p.fullName ||
            localMatch.fullName ||
            `Higher Secondary (${p.title || "+2 Stream"})`,
          faculty: p.facultyStream || localMatch.faculty || "Academic Stream",
          facultySlug: localMatch.facultySlug || facultySlug,
          duration: p.duration || localMatch.duration || "2 Years (Grades 11 & 12)",
          affiliation:
            p.affiliatedBody ||
            localMatch.affiliation ||
            "National Examinations Board (NEB)",
          description: p.description || p.overview || localMatch.description || "",
          eligibility:
            p.eligibility ||
            localMatch.eligibility ||
            "Minimum SEE GPA criteria as prescribed by NEB.",
          careers:
            Array.isArray(p.careers) && p.careers.length > 0
              ? p.careers
              : localMatch.careers || [
                  "Higher University Studies",
                  "Civil & Public Services",
                  "Research & Professional Careers",
                ],
        };
      });
    }
    return localProgrammes;
  }, [remoteData]);

  const filtered = useMemo(() => {
    return programmesList.filter((prog) => {
      const q = search.toLowerCase();
      const matchesSearch =
        (prog.fullName || "").toLowerCase().includes(q) ||
        (prog.code || "").toLowerCase().includes(q) ||
        (prog.description || "").toLowerCase().includes(q) ||
        (prog.faculty || "").toLowerCase().includes(q);

      const matchesFaculty =
        facultyFilter === "All" ||
        (facultyFilter === "Science" && prog.facultySlug === "science") ||
        (facultyFilter === "Management" && prog.facultySlug === "management") ||
        (facultyFilter === "Humanities & Law" && (prog.facultySlug === "humanities-social-sciences" || prog.facultySlug === "law"));

      return matchesSearch && matchesFaculty;
    });
  }, [programmesList, search, facultyFilter]);

  return (
    <main className="bg-[#f7f5f0] min-h-screen">
      {/* Canonical Institutional Hero */}
      <PageHero
        eyebrow="Academic Directory · Khwopa Secondary School"
        title="Class 11 & 12 (+2) Streams."
        italicTitle="Comprehensive Academic Overview."
        description="Explore the complete higher-secondary curricula offered at Khwopa Secondary School in Dekocha, Bhaktapur. Affiliated with the National Examination Board (NEB), our institution offers +2 Science, Management, Humanities, and Law."
        breadcrumbs={[
          { label: "Academics", to: "/academics" },
          { label: "All +2 Streams & Curricula" }
        ]}
        stats={[
          { label: "Academic Board", value: "NEB Nepal" },
          { label: "Active Streams", value: "4 Disciplines" },
          { label: "Course Duration", value: "2 Years (+2)" }
        ]}
      />

      {/* Main Section */}
      <section className="py-16 sm:py-24">
        <PageContainer>
          <SectionHeading
            eyebrow="National Examination Board (NEB) Curricula"
            title="All +2 Streams & Disciplines"
            italicTitle="Under One Unified Directory."
            description="Compare subject combinations, lab practical frameworks, SEE entry eligibility, and future career avenues across all four streams."
          />

          {/* Search & Stream Filter Controls */}
          <div className="mb-12 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between border-b border-[#e5ddce] pb-6">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search streams, subjects, or career paths..."
              className="w-full sm:max-w-md"
            />
            <FilterBar
              options={filterOptions}
              activeOption={facultyFilter}
              onChange={setFacultyFilter}
            />
          </div>

          {filtered.length === 0 ? (
            <EmptyState
              title="No +2 stream found"
              description="No discipline matched your search criteria. Try selecting another filter or clearing your search query."
              onReset={() => {
                setSearch("");
                setFacultyFilter("All");
              }}
            />
          ) : (
            /* Rich Multi-Disciplinary +2 Stream Cards */
            <div className="space-y-12">
              {filtered.map((prog) => {
                const details = STREAM_DETAILS[prog.slug] || {};

                return (
                  <article
                    key={prog.slug}
                    id={prog.slug}
                    className="overflow-hidden rounded-2xl border border-[#e5ddce] bg-white shadow-sm transition duration-300 hover:border-[#b99754] hover:shadow-md"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12">
                      {/* Left Column: Image & Quick Specs */}
                      <div className="lg:col-span-4 bg-[#091b30] text-white flex flex-col justify-between">
                        <div className="h-56 lg:h-64 overflow-hidden relative">
                          <img
                            src={prog.image || details.image || "https://wms.edigitalnepal.com/wms/files/ws-post-images/1678958957817_007be5e2-a1dc-4580-9809-4964d79fa1a0.jpg"}
                            alt={prog.fullName}
                            className="h-full w-full object-cover object-center opacity-85 transition duration-500 hover:scale-105"
                            onError={(e) => {
                              e.currentTarget.src = "https://wms.edigitalnepal.com/wms/files/ws-post-images/1751519828524_e4439fe2-801b-494c-8a2d-a89d2053bc77.png";
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#091b30] via-transparent to-transparent" />
                          <span className="absolute top-4 left-4 rounded-md bg-[#dfbd77] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#091b30]">
                            {prog.code}
                          </span>
                        </div>

                        <div className="p-7 space-y-4">
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#dfbd77]">
                              SEE Entry Requirement
                            </span>
                            <p className="mt-1 font-serif text-base text-white">
                              {prog.eligibility}
                            </p>
                          </div>

                          <div className="border-t border-white/10 pt-4">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
                              Duration & Board
                            </span>
                            <p className="mt-1 text-xs text-white/80">
                              {prog.duration} · {prog.affiliation}
                            </p>
                          </div>

                          <div className="pt-2">
                            <Link
                              to="/admissions/apply"
                              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#dfbd77] px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#091b30] transition hover:bg-[#edcf91]"
                            >
                              <span>Apply for {prog.shortName}</span>
                              <span aria-hidden="true">→</span>
                            </Link>
                          </div>
                        </div>
                      </div>

                      {/* Right Column: Complete Stream Overview, Subjects & Careers */}
                      <div className="lg:col-span-8 p-7 sm:p-10 flex flex-col justify-between">
                        <div>
                          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e5ddce] pb-4">
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#92703b]">
                                Faculty: {prog.faculty}
                              </span>
                              <h3 className="mt-1 font-serif text-3xl font-bold text-[#12243a]">
                                {prog.fullName}
                              </h3>
                            </div>
                            <span className="rounded-md bg-[#f5f0e5] px-3 py-1 text-xs font-semibold text-[#8c6d37]">
                              Grades 11 & 12
                            </span>
                          </div>

                          <p className="editorial-copy mt-4 text-sm leading-relaxed text-[#475365]">
                            {prog.description}
                          </p>

                          {/* Subject Groups / Electives */}
                          <div className="mt-6">
                            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#12243a]">
                              Available Subject Groups & Focus Areas:
                            </h4>
                            <div className="mt-3 grid gap-3 sm:grid-cols-2">
                              {details.groups?.map((grp, i) => (
                                <div key={i} className="rounded-xl border border-[#e5ddce] bg-[#fbfaf7] p-4 text-xs">
                                  <div className="flex items-center justify-between">
                                    <span className="font-bold text-[#12243a] text-sm">{grp.name}</span>
                                    <span className="text-[10px] font-semibold text-[#92703b]">{grp.focus}</span>
                                  </div>
                                  <p className="editorial-copy mt-2 text-[#475365] leading-relaxed">
                                    {grp.subjects}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Academic Highlights */}
                          {details.highlights && (
                            <div className="mt-6 border-t border-[#eee9df] pt-4">
                              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#12243a]">
                                Stream Key Highlights:
                              </h4>
                              <ul className="mt-2.5 space-y-1.5 text-xs text-[#475365]">
                                {details.highlights.map((hl, i) => (
                                  <li key={i} className="flex items-start gap-2.5">
                                    <span className="text-[#dfbd77] font-bold">✓</span>
                                    <span>{hl}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Career Pathways */}
                          <div className="mt-6 border-t border-[#eee9df] pt-4">
                            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#92703b]">
                              Future Degree & Career Avenues:
                            </h4>
                            <div className="mt-2.5 flex flex-wrap gap-2">
                              {prog.careers.map((career, i) => (
                                <span
                                  key={i}
                                  className="rounded-lg bg-[#f0ede5] px-3 py-1 text-[11px] font-medium text-[#12243a]"
                                >
                                  {career}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Card Footer Controls */}
                        <div className="mt-8 pt-5 border-t border-[#eee9df] flex flex-wrap items-center justify-between gap-4">
                          <Link
                            to={`/academics/programmes/${prog.slug}`}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0b2038] hover:text-[#92703b] transition"
                          >
                            <span>View Full Syllabus & Term Plans</span>
                            <span aria-hidden="true">→</span>
                          </Link>

                          <Link
                            to={`/academics/${prog.facultySlug}`}
                            className="text-xs font-semibold text-slate-500 hover:text-[#12243a] transition"
                          >
                            Explore {prog.faculty} Faculty Details →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </PageContainer>
      </section>

      {/* Unified CTA Section */}
      <CTASection
        title="Ready to Begin Your +2 Journey at Khwopa?"
        description="Online priority applications are open for Class 11 (+2 Science, Management, Humanities, and Law)."
        primaryAction={{ label: "Apply Online (+2)", to: "/admissions/apply" }}
        secondaryAction={{ label: "View SEE Eligibility", to: "/admissions/requirements" }}
      />
    </main>
  );
}
