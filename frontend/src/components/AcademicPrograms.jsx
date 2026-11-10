import { ArrowRightIcon } from "./Icons";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

const defaultPrograms = [
  {
    number: "01",
    title: "+2 Science",
    subtitle: "Scientific inquiry, analytical thinking and further-study preparation",
    courses: ["Physics", "Chemistry", "Mathematics", "Biology", "Computer Science"],
    route: "/academics/science",
  },
  {
    number: "02",
    title: "+2 Management",
    subtitle: "Business, accounting, economics and organisational management",
    courses: ["Accountancy", "Economics", "Business Studies", "Hotel Management"],
    route: "/academics/management",
  },
  {
    number: "03",
    title: "+2 Humanities",
    subtitle: "Sociology, mass communication, social sciences and languages",
    courses: ["Sociology", "Mass Communication", "English", "Nepali"],
    route: "/academics/humanities",
  },
  {
    number: "04",
    title: "+2 Law",
    subtitle: "Jurisprudence, constitutional legal principles and courtroom practice",
    courses: ["Constitutional Law", "Nepalese Legal System", "Procedural Law"],
    route: "/academics/programmes",
  },
];

export default function AcademicPrograms() {
  const { data: remoteData } = useQuery({
    queryKey: ['programmes'],
    queryFn: () => api.getProgrammes(),
    staleTime: 60000,
    retry: 1
  });

  const programs = remoteData?.data && remoteData.data.length > 0
    ? remoteData.data.map((p, idx) => ({
        number: String(idx + 1).padStart(2, '0'),
        title: p.title || p.shortName,
        subtitle: p.overview || p.tagline || 'National Examinations Board (+2) affiliated stream',
        courses: p.subjects && p.subjects.length > 0 ? p.subjects.slice(0, 5) : ["Core Curriculum", "NEB Syllabi"],
        route: `/academics/${p.facultyStream === 'Science' ? 'science' : p.facultyStream === 'Management' ? 'management' : p.facultyStream === 'Humanities' ? 'humanities' : 'programmes'}`
      }))
    : defaultPrograms;
  return (
    <section id="academics" className="bg-white px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-[#a17c3d]">
              +2 academic streams
            </p>

            <h2 className="font-serif text-4xl leading-tight text-[#12243a] sm:text-5xl lg:text-6xl">
              Choose your stream.
              <span className="block italic text-[#a17c3d]">
                Shape your future.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-base leading-8 text-[#68717d]">
            Explore the Science and Management streams available for
            Grades 11 and 12 at Khwopa College.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {programs.map((program) => (
            <article
              key={program.number}
              className="group rounded-2xl border border-[#e9e4da] bg-[#f9f7f2] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#c6aa70] hover:bg-[#12243a] hover:shadow-xl sm:p-9"
            >
              <div className="flex items-start justify-between">
                <span className="font-serif text-3xl text-[#b99754]">
                  {program.number}
                </span>

                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#dfd5c2] text-lg text-[#a17c3d] transition group-hover:border-[#b99754] group-hover:text-[#e2c990]">
                  <ArrowRightIcon />
                </span>
              </div>

              <h3 className="mt-7 font-serif text-3xl text-[#12243a] transition group-hover:text-white sm:text-4xl">
                {program.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#737b85] transition group-hover:text-[#cbd2dc]">
                {program.subtitle}
              </p>

              <div className="my-7 h-px bg-[#e3ddcf] transition group-hover:bg-white/15" />

              <div className="flex flex-wrap gap-2">
                {program.courses.map((course) => (
                  <span
                    key={course}
                    className="rounded-lg border border-[#e0d8c9] bg-white px-3 py-2 text-xs font-medium text-[#475365] transition group-hover:border-white/20 group-hover:bg-white/10 group-hover:text-[#f4e7c9]"
                  >
                    {course}
                  </span>
                ))}
              </div>

              <Link
                to={program.route || "/academics"}
                className="mt-8 inline-flex items-center gap-3 text-sm font-semibold text-[#a17c3d] transition group-hover:text-[#e2c990]"
              >
                View stream details
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-9 flex flex-col justify-between gap-5 rounded-2xl bg-[#12243a] p-7 sm:flex-row sm:items-center sm:p-9">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d2b577]">
              Explore academics
            </p>
            <h3 className="mt-2 font-serif text-2xl text-white sm:text-3xl">
              Find the right +2 stream.
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#c0c9d4]">
              Review subject combinations and current admission guidance.
            </p>
          </div>

          <Link
            to="/academics"
            className="inline-flex shrink-0 items-center justify-center gap-4 rounded-xl border border-[#b99754] px-6 py-4 text-sm font-semibold text-[#e6cf9f] transition hover:bg-[#b99754] hover:text-[#12243a]"
          >
            Explore +2 academics <ArrowRightIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}

