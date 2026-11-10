import { ArrowRightIcon } from "./Icons";

const resources = [
  {
    number: "01",
    title: "Academic Calendar",
    description: "Academic schedules, important dates and college activities.",
    href: "/student-resources/academic-calendar",
    label: "Academic",
  },
  {
    number: "02",
    title: "Exam Routine",
    description: "Examination schedules and related announcements.",
    href: "/examinations/routines",
    label: "Examinations",
  },
  {
    number: "03",
    title: "Results",
    description: "Access examination results and result-related information.",
    href: "/results",
    label: "Examinations",
  },
  {
    number: "04",
    title: "Downloads",
    description: "Forms, documents and useful academic materials.",
    href: "/downloads",
    label: "Documents",
  },
  {
    number: "05",
    title: "Fee Information",
    description: "Find information about fees and payment procedures.",
    href: "/student-resources/fees",
    label: "Administration",
  },
  {
    number: "06",
    title: "Scholarships",
    description: "Scholarship information, criteria and announcements.",
    href: "/student-resources/scholarships",
    label: "Student support",
  },
];

export default function StudentResources() {
  return (
    <section
      id="student-resources"
      className="bg-[#eeeae1] px-5 py-24 sm:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-[#a17c3d]">
              Student support
            </p>

            <h2 className="font-serif text-4xl leading-tight text-[#12243a] sm:text-5xl">
              Everything you need.
              <span className="mt-1 block italic text-[#a17c3d]">
                Within reach.
              </span>
            </h2>

            <p className="mt-6 max-w-md text-base leading-8 text-[#68717d]">
              Access essential academic information, student documents and
              support resources without having to search through multiple pages.
            </p>

            <a
              href="/student-resources"
              className="mt-8 inline-flex items-center gap-4 rounded-xl bg-[#12243a] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#233d5a]"
            >
              Explore all resources <ArrowRightIcon className="h-4 w-4 text-[#d2b577]" />
            </a>

            <div className="mt-12 hidden border-t border-[#d4cbb9] pt-6 lg:block">
              <p className="font-serif text-2xl italic text-[#9b773d]">
                Your academic journey, organised.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {resources.map((item) => (
              <a
                key={item.number}
                href={item.href}
                className="group flex min-h-[205px] flex-col justify-between rounded-2xl border border-[#ded7ca] bg-[#f9f7f2] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#b99754] hover:bg-white hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-2xl text-[#b99754]">
                    {item.number}
                  </span>

                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#e2dacb] text-[#9b773d] transition group-hover:border-[#b99754] group-hover:bg-[#12243a] group-hover:text-white">
                    <ArrowRightIcon className="h-4 w-4" />
                  </span>
                </div>

                <div className="mt-8">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#a17c3d]">
                    {item.label}
                  </span>

                  <h3 className="mt-2 font-serif text-2xl text-[#12243a]">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#737b85]">
                    {item.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

