
import { ArrowRightIcon, ExternalLinkIcon } from "./Icons";
import { Link } from "react-router-dom";

const shortcuts = [
  {
    title: "Admissions",
    description: "Explore entry options",
    icon: "admissions",
    href: "/admissions",
  },
  {
    title: "Results",
    description: "Examination results",
    icon: "results",
    href: "/notices/results",
  },
  {
    title: "Notice Board",
    description: "Important updates",
    icon: "calendar",
    href: "/notices",
  },
  {
    title: "Facilities",
    description: "Explore the campus",
    icon: "location",
    href: "/about/facilities",
  },
];

const updates = [
  {
    category: "Campus Life",
    title: "College Day Concluded with Grand Cultural Show",
    href: "https://khwopacollege.edu.np/recent-activities/college-day-concluded-with-grand-cultural-show",
  },
  {
    category: "Research & Academics",
    title: "National Conference on Management and Economic Development",
    href: "https://khwopacollege.edu.np/recent-activities/nd-national-conference-on-role-of-management-in-economic-development",
  },
];

function ShortcutIcon({ type }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "h-5 w-5",
    "aria-hidden": true,
  };

  const icons = {
    admissions: (
      <>
        <path d="M3 10 12 4l9 6-9 6-9-6Z" />
        <path d="M7 13v5c3 2 7 2 10 0v-5M21 10v6" />
      </>
    ),
    results: (
      <>
        <rect x="4" y="3" width="16" height="18" rx="1" />
        <path d="M8 8h8M8 12h5m-5 4 2 2 5-5" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="1" />
        <path d="M8 3v4m8-4v4M3 10h18M8 14h3" />
      </>
    ),
    location: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
  };

  return <svg {...common}>{icons[type]}</svg>;
}

export default function QuickLinks() {
  return (
    <section
      id="quick-links"
      className="relative z-20 mx-auto -mt-10 sm:-mt-[76px] max-w-[1370px] px-4 sm:px-8 lg:px-10"
    >
      <div className="grid overflow-hidden rounded-2xl border border-[#e6ddca] bg-[#fbfaf6] shadow-[0_18px_55px_rgba(5,19,35,0.22)] lg:grid-cols-[1.08fr_0.92fr]">

        {/* Quick Access */}
        <div className="p-6 sm:p-8 lg:p-9">
          <div className="mb-7 flex items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#b99754]" />

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#957441]">
                  Quick Access
                </p>
              </div>

              <h2 className="mt-2.5 font-serif text-2xl sm:text-3xl font-bold text-[#12243a]">
                What are you looking for?
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-4">
            {shortcuts.map((item) => (
              <Link
                key={item.title}
                to={item.href}
                className="group flex min-h-[125px] flex-col rounded-xl border border-[#e7dfd1] bg-white p-4 transition duration-300 hover:-translate-y-1 hover:border-[#b99754] hover:shadow-md"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f2eee5] text-[#18344f] transition group-hover:bg-[#12243a] group-hover:text-[#dfbd77]">
                  <ShortcutIcon type={item.icon} />
                </span>

                <span className="mt-3.5 text-sm font-bold text-[#162b42] leading-snug">
                  {item.title}
                </span>

                <span className="mt-1 text-xs leading-relaxed text-slate-600">
                  {item.description}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Khwopa Today */}
        <div className="border-t border-[#e6ddca] bg-[#f0ece2] p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-9">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#b99754]" />

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#957441]">
                  Khwopa Today
                </p>
              </div>

              <h2 className="mt-2.5 font-serif text-2xl sm:text-3xl font-bold text-[#12243a]">
                From our community
              </h2>
            </div>

            <Link
              to="/notices"
              className="text-xs font-bold text-[#957441] hover:text-[#12243a] transition"
            >
              View all <ArrowRightIcon className="ml-1 inline h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-5 space-y-3">
            {updates.map((item) => (
              <a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-4 rounded-xl border border-[#e3dac9] bg-white p-4 transition hover:border-[#b99754]"
              >
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#a17c3d]">
                    {item.category}
                  </p>

                  <h3 className="mt-1.5 line-clamp-2 font-serif text-base font-semibold leading-snug text-[#17314b] transition group-hover:text-[#997542]">
                    {item.title}
                  </h3>
                </div>

                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#e5ddce] text-[#947443] transition group-hover:bg-[#12243a] group-hover:text-white">
                  <ExternalLinkIcon className="h-4 w-4" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

