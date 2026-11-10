
import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowRightIcon, ExternalLinkIcon } from "../components/Icons";

const images = {
  campus:
    "https://wms.edigitalnepal.com/wms/files/ws-post-images/1751512628392_35a0f113-7f94-43bb-9bf6-4a2d56daf8d6.jpg",

  fete:
    "https://republicaimg.nagariknewscdn.com/shared/web/uploads/media/83312903_843484796167513_7104932718646919168_n_20200123150723.jpg",

  building:
    "https://wms.edigitalnepal.com/wms/files/ws-profile/1751348345531_a4a2aae5-8df1-4a63-b163-31f03f657c13.png",
};

const milestones = [
  {
    year: "2056 BS",
    label: "The beginning",
    title: "Khwopa Secondary School Established",
    description:
      "Established by Bhaktapur Municipality to deliver accessible, high-standard higher secondary (+2) education to all students.",
    programs: ["+2 Science", "+2 Management"],
    type: "Foundation",
  },
  {
    year: "2058 BS",
    label: "Laboratory Infrastructure",
    title: "Science & Computer Labs Inaugurated",
    description:
      "Full experimental physics, chemistry, biology, and computerized workstations completed for Grades 11 & 12 under NEB.",
    programs: ["Physics Lab", "Chemistry Lab", "Computer Lab"],
    type: "Infrastructure",
  },
  {
    year: "2061 BS",
    label: "Social Sciences",
    title: "+2 Humanities Stream Introduced",
    description:
      "Curriculum expanded with Sociology, Mass Communication, Political Science, and Languages to foster social and civic awareness.",
    programs: ["+2 Humanities", "Social Studies"],
    type: "+2 Stream",
  },
  {
    year: "2076 BS",
    label: "Legal Studies",
    title: "+2 Law Stream & Moot Court Established",
    description:
      "Launched specialized legal education and simulated courtroom practice to nurture future judicial leaders and advocates.",
    programs: ["+2 Law", "Moot Court Practice"],
    type: "+2 Stream",
  },
  {
    year: "2019 AD",
    label: "Graduate tracking",
    title: "Graduate tracer study",
    description:
      "Khwopa College prepared a tracer study for graduates of the 2017 academic year, documenting graduates' employment, further studies and feedback on academic programmes.",
    programs: ["Graduate outcomes", "Academic review"],
    type: "Institutional development",
  },
  {
    year: "2025 AD",
    label: "Academic publication",
    title: "Khwopa Review — Volume 1",
    description:
      "The first volume of Khwopa Review was published as a quarterly magazine of Khwopa College and Khwopa Secondary School, providing a platform for research, writing and academic discussion.",
    programs: ["Khwopa Review", "Academic publications"],
    type: "Research & publication",
  },
];

const sourceDocuments = [
  {
    title: "Graduate Tracer Study Report",
    detail: "Khwopa College | Graduates of 2017 | April 2019",
    type: "Institutional report",
    href:
      "https://wms.edigitalnepal.com/wms/files/ws-post-files/1678960854821_f02df65e-7f33-49d7-9d35-dc0823d5c9ef.pdf",
  },
  {
    title: "Khwopa College Prospectus",
    detail: "College overview, academic programmes and brief history",
    type: "College prospectus",
    href:
      "https://wms.edigitalnepal.com/wms/files/ws-post-files/1678960927254_a82f7d01-e03a-4789-b0ae-14165ca3d1d5.pdf",
  },
  {
    title: "Khwopa Review | Volume 1",
    detail: "Quarterly magazine (May–July 2025)",
    type: "Academic publication",
    href:
      "https://wms.edigitalnepal.com/wms/files/ws-file-manager-files/1770870492398_608d5c07-4d9c-4521-ab0c-8c391b60aae1.pdf",
  },
];

function HistoryLabel({ children }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="h-px w-9 bg-[#b99754]" />
      <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#a17c3d]">
        {children}
      </span>
    </div>
  );
}

/* ---------------- IMAGE HANDLING ---------------- */

function HistoryImage({ src, fallback = images.building, alt, className = "" }) {
  const [current, setCurrent] = useState(src);
  const [failed, setFailed] = useState(false);

  return (
    <div className={`overflow-hidden bg-[#17334c] ${className}`}>
      {!failed ? (
        <img
          src={current}
          alt={alt}
          loading="lazy"
          onError={() => {
            if (current !== fallback) {
              setCurrent(fallback);
            } else {
              setFailed(true);
            }
          }}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full items-center justify-center text-[#dfbd77]">
          <span className="font-serif text-2xl">Khwopa College</span>
        </div>
      )}
    </div>
  );
}

/* ---------------- PAGE HERO ---------------- */

function HistoryHero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#091b30] text-white">
      <div className="absolute inset-0 -z-10">
        <img
          src={images.campus}
          alt=""
          className="h-full w-full object-cover object-center opacity-35"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
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

          <Link to="/about" className="transition hover:text-[#dfbd77]">
            About Khwopa
          </Link>

          <span>/</span>

          <span className="text-[#dfbd77]">History</span>
        </div>

        <div className="mt-12 max-w-4xl">
          <HistoryLabel>Our institutional journey</HistoryLabel>

          <h1 className="font-serif text-5xl leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[78px]">
            A story shaped by
            <span className="block italic text-[#dfbd77]">
              people and purpose.
            </span>
          </h1>

          <p className="editorial-copy mt-7 max-w-2xl text-[15px] leading-7 text-white/70 sm:text-base">
            From a community-driven vision for higher education to an
            expanding academic institution, discover the key milestones
            in the development of Khwopa College.
          </p>
        </div>

        <div className="mt-14 grid max-w-3xl grid-cols-2 gap-8 border-t border-white/15 pt-7 sm:grid-cols-3">
          <div>
            <p className="font-serif text-3xl text-[#dfbd77]">2058 BS</p>
            <p className="mt-2 text-[9px] uppercase tracking-[0.16em] text-white/50">
              College established
            </p>
          </div>

          <div>
            <p className="font-serif text-2xl text-white">Bhaktapur</p>
            <p className="mt-2 text-[9px] uppercase tracking-[0.16em] text-white/50">
              Institutional roots
            </p>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <p className="font-serif text-2xl text-white">Community-led</p>
            <p className="mt-2 text-[9px] uppercase tracking-[0.16em] text-white/50">
              Educational initiative
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 h-px w-full bg-[#dfbd77]/50" />
    </section>
  );
}

/* ---------------- HISTORICAL CONTEXT ---------------- */

function HistoricalContext() {
  return (
    <section className="bg-[#f7f5f0] px-5 py-20 sm:px-8 lg:py-24">
      <div className="mx-auto grid max-w-[1300px] items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div>
          <HistoryLabel>The beginnings</HistoryLabel>

          <h2 className="font-serif text-4xl leading-tight text-[#12243a] sm:text-5xl">
            An educational vision
            <span className="block italic text-[#a17c3d]">
              for Bhaktapur.
            </span>
          </h2>

          <p className="editorial-copy mt-6 text-[15px] leading-7 text-[#626c78]">
            The development of Khwopa College is part of a wider
            community-led educational initiative undertaken by
            Bhaktapur Municipality.
          </p>

          <p className="editorial-copy mt-5 text-[15px] leading-7 text-[#626c78]">
            Khwopa Higher Secondary School was established in 2056 BS
            (1999 AD). Khwopa College followed in 2058 BS (2001 AD),
            as a distinct higher education institution affiliated
            with the National Examinations Board (NEB).
          </p>

          <p className="editorial-copy mt-5 text-[15px] leading-7 text-[#626c78]">
            The wider initiative sought to make higher education
            accessible across economic and social backgrounds and
            to contribute to the intellectual development of society.
          </p>
        </div>

        <div className="relative">
          <HistoryImage
            src={images.fete}
            fallback={images.building}
            alt="Historical archival photograph of Khwopa College courtyard in Dekocha, Bhaktapur"
            className="h-[310px] rounded-md sm:h-[430px]"
          />

          <div className="absolute bottom-0 left-0 max-w-[280px] translate-y-1/3 border border-[#e5ddce] bg-[#fbfaf7] p-5 shadow-lg sm:left-6 sm:p-6">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#a17c3d]">
              Historical Archive | Dekocha
            </p>

            <p className="mt-2 font-serif text-xl text-[#12243a]">
              Khwopa College Courtyard
            </p>

            <p className="mt-2 text-[10px] leading-5 text-[#7b838c]">
              An archival photograph of the college courtyard.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- TIMELINE ---------------- */

function HistoricalTimeline() {
  return (
    <section className="bg-[#0b2038] px-5 py-20 text-white sm:px-8 lg:py-28">
      <div className="mx-auto max-w-[1300px]">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <HistoryLabel>Chronology</HistoryLabel>

            <h2 className="font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
              The milestones
              <span className="block italic text-[#dfbd77]">
                along the way.
              </span>
            </h2>
          </div>

          <p className="editorial-copy max-w-xl text-[15px] leading-7 text-white/60">
            A selected chronology of academic and institutional
            developments documented in Khwopa College's available
            historical reports and prospectus.
          </p>
        </div>

        <div className="relative mt-16 border-t border-white/15">
          {milestones.map((item, index) => (
            <article
              key={item.year + item.title}
              className="group grid gap-5 border-b border-white/15 py-8 transition duration-300 sm:grid-cols-[125px_1fr] sm:gap-9 lg:grid-cols-[160px_1fr] lg:py-10"
            >
              <div>
                <p className="font-serif text-2xl text-[#dfbd77] sm:text-3xl">
                  {item.year}
                </p>

                <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.14em] text-white/40">
                  {item.label}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-serif text-2xl text-white transition group-hover:text-[#dfbd77] sm:text-3xl">
                    {item.title}
                  </h3>

                  <span className="border border-white/15 px-2.5 py-1 text-[9px] font-medium uppercase tracking-wider text-white/45">
                    {item.type}
                  </span>
                </div>

                <p className="editorial-copy mt-4 max-w-3xl text-[15px] leading-7 text-white/60">
                  {item.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {item.programs.map((program) => (
                    <span
                      key={program}
                      className="border border-[#dfbd77]/25 bg-[#dfbd77]/[0.06] px-3 py-1.5 text-[10px] text-[#e2c990]"
                    >
                      {program}
                    </span>
                  ))}
                </div>
              </div>

              <span className="pointer-events-none absolute hidden font-serif text-8xl font-semibold text-white/[0.025] transition group-hover:text-white/[0.05] lg:right-4 lg:block">
                {String(index + 1).padStart(2, "0")}
              </span>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[10px] leading-5 text-white/40">
            Dates are presented in their source calendar (BS or AD).
          </p>

          <a
            href="https://khwopacollege.edu.np/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-fit items-center gap-2 text-xs font-semibold text-[#dfbd77] transition hover:text-white"
          >
            College website
            <ExternalLinkIcon />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- HISTORICAL CAMPUS PHOTOGRAPHS ---------------- */

function CampusArchive() {
  return (
    <section className="bg-[#f2eee5] px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-[1300px]">
        <HistoryLabel>Through the years</HistoryLabel>

        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <h2 className="font-serif text-4xl text-[#12243a] sm:text-5xl">
            The campus archive.
          </h2>

          <p className="editorial-copy max-w-md text-[15px] leading-7 text-[#6d7680]">
            Photographs and moments documenting aspects of the
            college's campus and academic community.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-12">
          <figure className="group relative overflow-hidden rounded-md md:col-span-7">
            <HistoryImage
              src={images.campus}
              fallback={images.building}
              alt="Aerial view of Khwopa College campus with its buildings and courtyard"
              className="h-[300px] sm:h-[420px]"
            />

            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#07182b]/90 to-transparent px-6 pb-6 pt-20 text-white">
              <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#dfbd77]">
                Campus grounds
              </span>

              <h3 className="mt-2 font-serif text-2xl sm:text-3xl">
                Khwopa College, Bhaktapur
              </h3>
            </figcaption>
          </figure>

          <div className="flex flex-col gap-4 md:col-span-5">
            <figure className="group relative flex-1 overflow-hidden rounded-md">
              <HistoryImage
                src={images.building}
                fallback={images.fete}
                alt="Khwopa College red-brick building and courtyard"
                className="h-[220px] sm:h-[260px]"
              />

              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#07182b]/85 to-transparent p-5 pt-16 text-white">
                <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#dfbd77]">
                  College architecture
                </span>
                <h3 className="mt-2 font-serif text-xl">
                  The campus environment
                </h3>
              </figcaption>
            </figure>

            <figure className="group relative flex-1 overflow-hidden rounded-md">
              <HistoryImage
                src={images.fete}
                fallback={images.campus}
                alt="Historical archival photograph of Khwopa College courtyard in Dekocha, Bhaktapur"
                className="h-[220px] sm:h-[260px]"
              />

              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#07182b]/85 to-transparent p-5 pt-16 text-white">
                <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#dfbd77]">
                  Archival photograph | Dekocha
                </span>
                <h3 className="mt-2 font-serif text-xl">
                  Historic College Courtyard
                </h3>
              </figcaption>
            </figure>
          </div>
        </div>

        <p className="mt-5 text-[10px] leading-5 text-[#92969b]">
          Photographs are from published Khwopa College-related sources.
          Their publication dates should not be confused with the dates
          when the buildings or facilities were established.
        </p>
      </div>
    </section>
  );
}

/* ---------------- PRIMARY SOURCE DOCUMENTS ---------------- */

function HistoricalSources() {
  return (
    <section className="bg-[#fbfaf7] px-5 py-20 sm:px-8 lg:py-24">
      <div className="mx-auto grid max-w-[1300px] gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
        <div>
          <HistoryLabel>Institutional records</HistoryLabel>

          <h2 className="font-serif text-4xl leading-tight text-[#12243a] sm:text-5xl">
            History through
            <span className="block italic text-[#a17c3d]">
              original records.
            </span>
          </h2>

          <p className="editorial-copy mt-6 text-[15px] leading-7 text-[#68717d]">
            Explore published institutional documents that record
            Khwopa College's background, academic developments and
            research activities.
          </p>
        </div>

        <div className="border-t border-[#e2dacb]">
          {sourceDocuments.map((document, index) => (
            <a
              key={document.title}
              href={document.href}
              target="_blank"
              rel="noreferrer"
              className="group grid grid-cols-[38px_1fr_auto] items-center gap-4 border-b border-[#e2dacb] py-6 transition hover:bg-[#f2eee5] sm:grid-cols-[55px_1fr_auto] sm:px-4"
            >
              <span className="font-serif text-xl text-[#b99754]">
                0{index + 1}
              </span>

              <span>
                <span className="block font-serif text-xl text-[#12243a] transition group-hover:text-[#a17c3d] sm:text-2xl">
                  {document.title}
                </span>

                <span className="mt-2 block text-xs leading-5 text-[#77808a]">
                  {document.detail}
                </span>

                <span className="mt-2 block text-[9px] font-semibold uppercase tracking-[0.15em] text-[#a17c3d]">
                  {document.type}
                </span>
              </span>

              <span className="flex h-10 w-10 items-center justify-center border border-[#e3dacb] text-[#92703b] transition group-hover:border-[#12243a] group-hover:bg-[#12243a] group-hover:text-white">
                <ExternalLinkIcon />
              </span>
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-[1300px] border-l-2 border-[#b99754] bg-[#f2eee5] p-5 sm:p-6">
        <p className="editorial-copy text-[15px] leading-7 text-[#68717d]">
          <strong className="text-[#12243a]">Historical accuracy:</strong>{" "}
          This page presents a selected chronology based on available
          institutional records. Programme launch dates, archival
          photographs and historical claims should be reviewed against
          the college's original records before final publication.
          It does not claim to be a complete history.
        </p>
      </div>
    </section>
  );
}

/* ---------------- BOTTOM NAVIGATION ---------------- */

function HistoryNavigation() {
  return (
    <section className="bg-[#12243a] px-5 py-14 text-white sm:px-8">
      <div className="mx-auto flex max-w-[1300px] flex-col justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#dfbd77]">
            Continue exploring
          </p>

          <h2 className="mt-3 font-serif text-3xl">
            Discover more about Khwopa.
          </h2>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/about"
            className="rounded-md border border-white/25 px-5 py-3 text-xs font-semibold text-white transition hover:border-[#dfbd77] hover:text-[#dfbd77]"
          >
            About Khwopa
          </Link>

          <Link
            to="/about/vision-mission"
            className="rounded-md bg-[#dfbd77] px-5 py-3 text-xs font-bold text-[#12243a] transition hover:bg-[#f0d49a]"
          >
            Vision & Mission <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------------- PAGE ---------------- */

export default function HistoryPage() {
  return (
    <main className="bg-[#f7f5f0]">
      <HistoryHero />
      <HistoricalContext />
      <HistoricalTimeline />
      <CampusArchive />
      <HistoricalSources />
      <HistoryNavigation />
    </main>
  );
}
