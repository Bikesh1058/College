
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import { ArrowRightIcon } from "../components/Icons";

const campusImage =
  "https://wms.edigitalnepal.com/wms/files/ws-post-images/1678958957817_007be5e2-a1dc-4580-9809-4964d79fa1a0.jpg";

const alternateImage =
  "https://www.cijnepal.org/wp-content/uploads/2018/09/11.jpg";

const aboutNavigation = [
  ["Introduction", "#college-introduction"],
  ["Vision & Mission", "#vision-mission"],
  ["Objectives", "#objectives"],
  ["History", "#history"],
];

const milestones = [
  {
    year: "2056 BS",
    date: "1999 AD",
    title: "Establishment of Khwopa Secondary School",
    description:
      "Khwopa Secondary School was established by Bhaktapur Municipality to deliver community-directed higher secondary (+2) education to the public.",
  },
  {
    year: "2058 BS",
    title: "Launch of +2 Science and Management Streams",
    description:
      "Comprehensive laboratory facilities and business lecture halls were inaugurated for Grades 11 and 12 under NEB.",
  },
  {
    year: "2061 BS",
    title: "Introduction of +2 Humanities & Social Sciences",
    description:
      "Curriculum expanded to include Sociology, Mass Communication, and Languages to foster cultural inquiry and civic responsibility.",
  },
  {
    year: "2076 BS",
    title: "Introduction of +2 Law Stream",
    description:
      "The specialized +2 Law curriculum and dedicated Moot Court were inaugurated to cultivate future legal advocates and judicial officers.",
  },
  {
    year: "Present",
    title: "Premier NEB Higher Secondary Institution",
    description:
      "Continuing as Nepal's pioneering municipality-run higher secondary institution educating thousands of +2 scholars with affordable fees.",
  },
];

const objectives = [
  "Contribute to the intellectual development of society.",
  "Connect education with productive labour.",
  "Prepare the new generation to meet the challenges of the twenty-first century.",
  "Promote the overall personality and development of students.",
  "Develop competent, skilled and qualified human resources.",
];

const relatedPages = [
  {
    number: "01",
    title: "Leadership",
    description:
      "Meet the college leadership and understand its institutional responsibilities.",
    href: "/about/leadership",
  },
  {
    number: "02",
    title: "Management & Governance",
    description:
      "Explore the management committee, governance and institutional structure.",
    href: "/about/governance",
  },
  {
    number: "03",
    title: "Faculty & Staff",
    description:
      "Discover the academic departments, faculty members and supporting staff.",
    href: "/about/faculty",
  },
  {
    number: "04",
    title: "Campus & Facilities",
    description:
      "Explore the college campus, facilities and learning environment.",
    href: "/about/facilities",
  },
];

function SectionLabel({ children }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="h-px w-9 bg-[#b99754]" />
      <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#92703b]">
        {children}
      </span>
    </div>
  );
}

function handleCampusImageError(event) {
  event.currentTarget.onerror = null;
  event.currentTarget.src = alternateImage;
}

function CampusPhoto({ className = "" }) {
  return (
    <img
      src={campusImage}
      alt="Khwopa College campus building in Bhaktapur"
      loading="lazy"
      onError={handleCampusImageError}
      className={className}
    />
  );
}

function AboutNavigation() {
  return (
    <nav
      aria-label="About Khwopa page navigation"
      className="sticky top-[108px] z-30 border-b border-[#e5ddce] bg-[#fbfaf7]/95 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-[1400px] items-center gap-7 overflow-x-auto px-5 py-4 sm:px-8 lg:px-10">
        <span className="hidden shrink-0 text-[10px] font-bold uppercase tracking-[0.17em] text-[#92703b] md:block">
          About Khwopa
        </span>

        <div className="flex shrink-0 items-center gap-6">
          {aboutNavigation.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="whitespace-nowrap text-[11px] font-semibold text-[#475365] transition hover:text-[#a17c3d]"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

function AboutHero({ dynamicHero, dynamicStats }) {
  const eyebrow = dynamicHero?.eyebrow || "Discover our institution";
  const heading = dynamicHero?.heading || "Rooted in Bhaktapur. Committed to education.";
  const description = dynamicHero?.description || "Discover the history, institutional identity, vision and educational purpose of Khwopa College, a community college undertaken by Bhaktapur Municipality.";
  const bannerImage = dynamicHero?.bannerImage || campusImage;

  return (
    <section className="relative isolate overflow-hidden bg-[#091b30] text-white">
      <div className="absolute inset-0 -z-10">
        <img
          src={bannerImage}
          alt="Khwopa College campus building in Bhaktapur"
          onError={handleCampusImageError}
          className="h-full w-full object-cover object-center opacity-35"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#07182b] via-[#0b2038]/95 to-[#0b2038]/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07182b]/65 to-transparent" />
      </div>

      <div className="pointer-events-none absolute -right-20 -top-36 -z-10 h-[430px] w-[430px] rounded-full border border-[#dfbd77]/10" />
      <div className="pointer-events-none absolute -right-5 -top-20 -z-10 h-[290px] w-[290px] rounded-full border border-[#dfbd77]/10" />

      <div className="mx-auto max-w-[1380px] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55">
          <Link to="/" className="transition hover:text-[#dfbd77]">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#dfbd77]">About Khwopa</span>
        </div>

        <div className="mt-12 max-w-4xl">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-9 bg-[#b99754]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#a17c3d]">
              {eyebrow}
            </span>
          </div>

          <h1 className="font-serif text-5xl leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[78px]">
            {heading.includes('.') ? (
              <>
                {heading.split('.')[0]}.
                <span className="block italic text-[#dfbd77]">
                  {heading.split('.').slice(1).join('.').trim()}
                </span>
              </>
            ) : (
              heading
            )}
          </h1>

          <p className="editorial-copy mt-7 max-w-2xl text-[15px] leading-7 text-white/70 sm:text-base">
            {description}
          </p>
        </div>

        <div className="mt-14 grid max-w-3xl grid-cols-2 gap-8 border-t border-white/15 pt-7 sm:grid-cols-3">
          {dynamicStats && dynamicStats.length > 0 ? (
            dynamicStats.slice(0, 3).map((st) => (
              <div key={st.label}>
                <p className="font-serif text-3xl text-[#dfbd77]">{st.value}</p>
                <p className="mt-2 text-[9px] uppercase tracking-[0.16em] text-white/50">
                  {st.label}
                </p>
              </div>
            ))
          ) : (
            <>
              <div>
                <p className="font-serif text-3xl text-[#dfbd77]">2001</p>
                <p className="mt-2 text-[9px] uppercase tracking-[0.16em] text-white/50">
                  Year established
                </p>
              </div>

              <div>
                <p className="font-serif text-2xl text-white">
                  Bhaktapur Municipality
                </p>
                <p className="mt-2 text-[9px] uppercase tracking-[0.16em] text-white/50">
                  Undertaking institution
                </p>
              </div>

              <div>
                <p className="font-serif text-2xl text-white">
                  Dekocha, Bhaktapur
                </p>
                <p className="mt-2 text-[9px] uppercase tracking-[0.16em] text-white/50">
                  College location
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 h-px w-full bg-[#dfbd77]/50" />
    </section>
  );
}

function CollegeIntroduction() {
  return (
    <section
      id="college-introduction"
      className="scroll-mt-24 bg-[#f7f5f0] px-5 py-20 sm:px-8 lg:py-28"
    >
      <div className="mx-auto grid max-w-[1300px] items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">

        <div>
          <SectionLabel>Who we are</SectionLabel>

          <h2 className="font-serif text-4xl leading-[1.12] text-[#12243a] sm:text-5xl">
            An institution shaped by
            <span className="block italic text-[#a17c3d]">
              a community's vision.
            </span>
          </h2>

          <p className="editorial-copy mt-7 text-[15px] leading-7 text-[#626c78]">
            Khwopa is the prehistoric name of Bhaktapur. Khwopa College
            takes its identity from this historic city and was established
            as part of Bhaktapur Municipality's educational initiative.
          </p>

          <p className="editorial-copy mt-5 text-[15px] leading-7 text-[#626c78]">
            Founded in 2001 AD (2058 BS), Khwopa College was established
            with an academic policy of extending higher education to
            people from different economic and social backgrounds.
          </p>

          <p className="editorial-copy mt-5 text-[15px] leading-7 text-[#626c78]">
            Its educational objectives connect academic knowledge with
            practical understanding, intellectual development and the
            preparation of skilled human resources.
          </p>

          <a
            href="#vision-mission"
            className="mt-8 inline-flex items-center gap-3 text-xs font-bold text-[#92703b] transition hover:gap-5"
          >
            Understand our vision
            <ArrowRightIcon />
          </a>
        </div>

        <div className="relative">
          <div className="absolute -right-3 -top-3 h-24 w-24 border-r border-t border-[#b99754] sm:-right-5 sm:-top-5" />

          <div className="relative overflow-hidden rounded-md bg-[#16354f]">
            <CampusPhoto className="h-[320px] w-full object-cover sm:h-[470px]" />

            <div className="absolute inset-0 bg-gradient-to-t from-[#07182b]/65 via-transparent to-transparent" />

            <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#dfbd77]">
                Dekocha, Bhaktapur
              </p>

              <h3 className="mt-2 font-serif text-2xl text-white sm:text-3xl">
                The Khwopa campus
              </h3>
            </div>
          </div>

          <div className="absolute -bottom-8 left-5 hidden max-w-xs border border-[#e4dccd] bg-[#fbfaf7] p-5 shadow-xl sm:block">
            <p className="font-serif text-2xl italic text-[#a17c3d]">
              Dedicated to country and people.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function VisionMission() {
  return (
    <section
      id="vision-mission"
      className="scroll-mt-24 bg-[#12243a] px-5 py-20 text-white sm:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-[1300px]">
        <SectionLabel>Our direction</SectionLabel>

        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
              Vision.
              <span className="block italic text-[#dfbd77]">
                Mission.
              </span>
            </h2>

            <p className="editorial-copy mt-6 text-[15px] leading-7 text-white/60">
              The principles that guide the college's educational
              purpose and its contribution to society.
            </p>
          </div>

          <div className="grid gap-0 sm:grid-cols-2">
            <article className="border-t border-white/20 py-7 sm:pr-8">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#dfbd77]">
                Our Vision
              </span>

              <h3 className="mt-6 font-serif text-3xl leading-snug text-white">
                To establish Bhaktapur as the Centre of Excellence.
              </h3>

              <p className="editorial-copy mt-5 text-[15px] leading-7 text-white/55">
                A vision focused on strengthening education and
                intellectual growth within the community.
              </p>
            </article>

            <article className="border-t border-white/20 py-7 sm:border-l sm:pl-8">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#dfbd77]">
                Our Mission
              </span>

              <h3 className="mt-6 font-serif text-3xl leading-snug text-white">
                To provide higher education to people of all economic
                and social strata.
              </h3>

              <p className="editorial-copy mt-5 text-[15px] leading-7 text-white/55">
                An educational commitment centred on access,
                opportunity and community service.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

function Objectives() {
  return (
    <section
      id="objectives"
      className="scroll-mt-24 bg-[#f2eee5] px-5 py-20 sm:px-8 lg:py-28"
    >
      <div className="mx-auto grid max-w-[1300px] gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div>
          <SectionLabel>What we aim to achieve</SectionLabel>

          <h2 className="font-serif text-4xl leading-tight text-[#12243a] sm:text-5xl">
            Education with
            <span className="block italic text-[#a17c3d]">
              meaningful objectives.
            </span>
          </h2>

          <p className="editorial-copy mt-6 text-[15px] leading-7 text-[#65707d]">
            Khwopa College's institutional objectives emphasise
            intellectual development, practical engagement and
            the overall development of students.
          </p>
        </div>

        <div className="border-t border-[#d9d0bf]">
          {objectives.map((objective, index) => (
            <article
              key={objective}
              className="group grid grid-cols-[46px_1fr] gap-5 border-b border-[#d9d0bf] py-6 sm:grid-cols-[65px_1fr] sm:py-7"
            >
              <span className="font-serif text-2xl text-[#b99754] transition group-hover:text-[#12243a] sm:text-3xl">
                {String(index + 1).padStart(2, "0")}
              </span>

              <p className="max-w-2xl text-base leading-7 text-[#394858] sm:text-lg">
                {objective}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HistoryTimeline() {
  return (
    <section
      id="history"
      className="scroll-mt-24 bg-[#fbfaf7] px-5 py-20 sm:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-[1300px]">
        <div className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <SectionLabel>Institutional milestones</SectionLabel>

            <h2 className="font-serif text-4xl text-[#12243a] sm:text-5xl">
              A story of growth.
            </h2>
          </div>

          <p className="editorial-copy max-w-md text-[15px] leading-7 text-[#6d7680]">
            Selected historical programme milestones recorded in the
            college's 2019 graduate tracer study.
          </p>
        </div>

        <div className="relative">
          <div className="absolute bottom-4 left-[11px] top-4 w-px bg-[#d9cfbb] sm:left-[15px]" />

          <div className="space-y-8 sm:space-y-10">
            {milestones.map((item) => (
              <article
                key={item.year + item.title}
                className="relative grid grid-cols-[24px_90px_1fr] items-start gap-4 sm:grid-cols-[32px_130px_1fr] sm:gap-6 lg:grid-cols-[32px_160px_1fr]"
              >
                <span className="relative z-10 mt-1.5 flex h-6 w-6 items-center justify-center rounded-full border border-[#b99754] bg-[#fbfaf7] sm:h-8 sm:w-8">
                  <span className="h-2 w-2 rounded-full bg-[#b99754]" />
                </span>

                <div>
                  <p className="font-serif text-xl text-[#a17c3d] sm:text-2xl">
                    {item.year}
                  </p>

                  {item.date && (
                    <p className="mt-1 text-[10px] text-[#89909a]">
                      {item.date}
                    </p>
                  )}
                </div>

                <div className="max-w-2xl border-b border-[#e8e1d5] pb-7">
                  <h3 className="font-serif text-xl text-[#12243a] sm:text-2xl">
                    {item.title}
                  </h3>

                  <p className="editorial-copy mt-3 text-[15px] leading-7 text-[#68717d]">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <p className="mt-8 text-[10px] leading-5 text-[#92969b]">
          Historical milestones are presented from an institutional
          report and should be expanded after review of the college's
          complete official historical records.
        </p>
      </div>
    </section>
  );
}

function ExploreAbout() {
  return (
    <section className="bg-[#f7f5f0] px-5 py-20 sm:px-8 lg:py-24">
      <div className="mx-auto max-w-[1300px]">
        <SectionLabel>Explore further</SectionLabel>

        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <h2 className="font-serif text-4xl text-[#12243a] sm:text-5xl">
            Get to know Khwopa.
          </h2>

          <p className="editorial-copy max-w-md text-[15px] leading-7 text-[#68717d]">
            Explore other aspects of the institution through
            dedicated informational pages.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {relatedPages.map((page) => (
            <Link
              key={page.number}
              to={page.href}
              className="group grid grid-cols-[48px_1fr_auto] items-center gap-4 border border-[#e3dacb] bg-[#fbfaf7] p-5 transition duration-300 hover:border-[#b99754] hover:bg-white sm:p-7"
            >
              <span className="font-serif text-xl text-[#b99754]">
                {page.number}
              </span>

              <span>
                <span className="block font-serif text-xl text-[#12243a] transition group-hover:text-[#a17c3d] sm:text-2xl">
                  {page.title}
                </span>

                <span className="mt-2 block text-sm leading-6 text-[#737b85]">
                  {page.description}
                </span>
              </span>

              <ArrowRightIcon className="h-4 w-4 text-[#a17c3d] transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  const { data: pageData } = useQuery({
    queryKey: ['page', 'about'],
    queryFn: () => api.getPage('about'),
    staleTime: 60000,
    retry: false
  });

  const heroSection = pageData?.sections?.find(s => s.type === 'hero')?.content;
  const statsSection = pageData?.sections?.find(s => s.type === 'statistics')?.content?.stats;

  return (
    <main className="bg-[#f7f5f0]">
      <AboutHero dynamicHero={heroSection} dynamicStats={statsSection} />
      <AboutNavigation />
      <CollegeIntroduction />
      <VisionMission />
      <Objectives />
      <HistoryTimeline />
      <ExploreAbout />
    </main>
  );
}
