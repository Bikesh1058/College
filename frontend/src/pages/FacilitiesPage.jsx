
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeftIcon, ArrowRightIcon } from "../components/Icons";

const images = {
  campus:
    "https://wms.edigitalnepal.com/wms/files/ws-profile/1751348345531_a4a2aae5-8df1-4a63-b163-31f03f657c13.png",

  courtyard:
    "https://republicaimg.nagariknewscdn.com/shared/web/uploads/media/83312903_843484796167513_7104932718646919168_n_20200123150723.jpg",

  building:
    "https://wms.edigitalnepal.com/wms/files/ws-post-images/1751519828524_e4439fe2-801b-494c-8a2d-a89d2053bc77.png",
};

const facilities = [
  {
    category: "Academic",
    title: "Laboratories",
    description:
      "Laboratory facilities documented in the college prospectus to support practical and subject-based academic learning.",
    detail:
      "Practical learning and laboratory-based academic activities.",
    icon: "flask",
    image:
      "https://wms.edigitalnepal.com/wms/files/ws-post-images/1751519828524_e4439fe2-801b-494c-8a2d-a89d2053bc77.png",
  },
  {
    category: "Academic",
    title: "Library & Reference Section",
    description:
      "A resourceful library and reference collection for academic reading, coursework and independent study.",
    detail:
      "Textbooks, reference books and academic reading materials.",
    icon: "library",
    image:
      "https://wms.edigitalnepal.com/wms/files/ws-post-images/1751519420518_f79d0e13-0613-4d59-817f-5de8760e9927.jpg",
  },
  {
    category: "Academic",
    title: "Library OPAC Services",
    description:
      "A computerized book issuing system listed among the college's library services.",
    detail:
      "Organised access to library book issue services.",
    icon: "search",
    image:
      "https://wms.edigitalnepal.com/wms/files/ws-post-images/1751519420518_f79d0e13-0613-4d59-817f-5de8760e9927.jpg",
  },
  {
    category: "Research",
    title: "Research Computers",
    description:
      "Computers for researchers with uninterrupted power supply, as described in the prospectus.",
    detail:
      "Computing resources for academic and research work.",
    icon: "computer",
    image:
      "https://wms.edigitalnepal.com/wms/files/ws-post-images/1751519692269_d079f3e5-f915-4d9a-be18-6e19ced18c2e.png",
  },
  {
    category: "Research",
    title: "Journals & Periodicals",
    description:
      "Academic journals, national and international periodicals, newspapers and weekly publications.",
    detail:
      "Reading and reference materials for academic research.",
    icon: "book",
    image:
      "https://wms.edigitalnepal.com/wms/files/ws-post-images/1678960989234_351877e9-c298-451a-b66d-4131ab09e37b.jpg",
  },
  {
    category: "Academic",
    title: "Audiovisual Facilities",
    description:
      "Audiovisual aids, multimedia and overhead projector facilities listed in the institutional prospectus.",
    detail:
      "Multimedia-supported teaching and presentations.",
    icon: "presentation",
    image:
      "https://wms.edigitalnepal.com/wms/files/ws-post-images/1751519256049_2fd51e0f-5475-44e2-b639-f263e727722f.jpg",
  },
  {
    category: "Campus Life",
    title: "Cafeteria",
    description:
      "A cafeteria is listed among the campus facilities in the college prospectus.",
    detail:
      "A campus amenity for the college community.",
    icon: "coffee",
    image:
      "https://wms.edigitalnepal.com/wms/files/ws-media-thumbnails/1791530931538-4ebf4dee-fb98-418f-8845-d4f6850fe4f4.JPG",
  },
  {
    category: "Campus Life",
    title: "Co-curricular Activities",
    description:
      "Indoor and outdoor co-curricular activities and educational field visits.",
    detail:
      "Learning experiences beyond regular classroom activities.",
    icon: "users",
    image:
      "https://wms.edigitalnepal.com/wms/files/ws-media-images/1751355381420-4ac05be0-9eeb-41ce-a554-074a7a659f79.jpg",
  },
  {
    category: "Sports",
    title: "Football Ground",
    description:
      "A football ground is included in the college's published facilities list.",
    detail:
      "Outdoor sports and recreational activities.",
    icon: "football",
    image:
      "https://wms.edigitalnepal.com/wms/files/ws-media-thumbnails/1791372458765-9db3f152-c18a-420b-8a07-fac7f44f1f0a.JPG",
  },
  {
    category: "Sports",
    title: "Volleyball Court",
    description:
      "A volleyball court is included in the published campus facilities.",
    detail:
      "Team sports and outdoor recreation.",
    icon: "volleyball",
    image:
      "https://wms.edigitalnepal.com/wms/files/ws-media-images/1751354678228-f22745f6-6237-430d-a51e-8e20b95dbfcd.jpg",
  },
  {
    category: "Sports",
    title: "Basketball Court",
    description:
      "A basketball court is documented among the college's outdoor facilities.",
    detail:
      "Sports activities and physical recreation.",
    icon: "basketball",
    image:
      "https://wms.edigitalnepal.com/wms/files/ws-post-images/1751519563015_771441eb-ef4b-43c2-a404-c3ca18dc9c3e.jpg",
  },
  {
    category: "Campus Life",
    title: "Auditorium",
    description:
      "An auditorium is listed as part of the college's infrastructure.",
    detail:
      "Institutional gatherings and academic programmes.",
    icon: "building",
    image:
      "https://wms.edigitalnepal.com/wms/files/ws-post-images/1751512628392_35a0f113-7f94-43bb-9bf6-4a2d56daf8d6.jpg",
  },
  {
    category: "Campus Life",
    title: "Open Stage",
    description:
      "An open stage is documented among the college's campus facilities.",
    detail:
      "Cultural programmes and community activities.",
    icon: "stage",
    image:
      "https://wms.edigitalnepal.com/wms/files/ws-media-images/1751352979401-f3d040cd-1ff9-43a5-87c8-4e2859c53345.jpg",
  },
  {
    category: "Environment",
    title: "Ecological Garden",
    description:
      "An ecological garden is included in the college's published campus facilities.",
    detail:
      "A campus landscape and environmental learning space.",
    icon: "leaf",
    image:
      "https://wms.edigitalnepal.com/wms/files/ws-media-thumbnails/1780814038612-2ddd4914-e574-437c-a685-621bc25ac673.JPG",
  },
  {
    category: "Environment",
    title: "Rainwater Harvesting",
    description:
      "Rainwater harvesting is listed among the college's infrastructure features.",
    detail:
      "A documented water-management initiative.",
    icon: "water",
    image:
      "https://wms.edigitalnepal.com/wms/files/ws-profile/1751348345531_a4a2aae5-8df1-4a63-b163-31f03f657c13.png",
  },
  {
    category: "Campus Life",
    title: "Internet Access",
    description:
      "Internet access is listed among the services in the college prospectus.",
    detail:
      "Connectivity for academic and campus activities.",
    icon: "wifi",
    image:
      "https://wms.edigitalnepal.com/wms/files/ws-media-thumbnails/1780813241053-3a8dcfd0-71e0-4a5a-a982-75072e698f06.JPG",
  },
  {
    category: "Campus Life",
    title: "Notice Board Service",
    description:
      "A notice board service is documented among the college's information facilities.",
    detail:
      "Access to college announcements and information.",
    icon: "notice",
    image:
      "https://wms.edigitalnepal.com/wms/files/ws-post-images/1766463536050_81bbdab1-d2fe-4913-8986-e89fcd0173b6.jpg",
  },
];

const filters = [
  "All",
  "Academic",
  "Research",
  "Campus Life",
  "Sports",
  "Environment",
];

function ArrowIcon({ className = "h-4 w-4" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
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

/* ---------------- IMAGE WITH FALLBACK ---------------- */

function CampusImage({
  src,
  fallback = images.building,
  alt,
  className = "",
}) {
  const [currentImage, setCurrentImage] = useState(src);
  const [failed, setFailed] = useState(false);

  return failed ? (
    <div
      className={`flex items-center justify-center bg-[#183650] font-serif text-2xl text-[#dfbd77] ${className}`}
    >
      Khwopa College
    </div>
  ) : (
    <img
      src={currentImage}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => {
        if (currentImage !== fallback) {
          setCurrentImage(fallback);
        } else {
          setFailed(true);
        }
      }}
      className={className}
    />
  );
}

/* ---------------- ICONS ---------------- */

function FacilityIcon({ type }) {
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
    flask: (
      <>
        <path d="M9 3h6m-1 0v6l5 9a2 2 0 0 1-2 3H7a2 2 0 0 1-2-3l5-9V3" />
        <path d="M8 15h8" />
      </>
    ),
    library: (
      <>
        <path d="M3 21h18M5 21V5l7-3 7 3v16M9 21v-8h6v8" />
      </>
    ),
    search: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m15.5 15.5 5 5M8 10h5" />
      </>
    ),
    computer: (
      <>
        <rect x="3" y="4" width="18" height="13" rx="2" />
        <path d="M8 21h8m-4-4v4" />
      </>
    ),
    book: (
      <>
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v18H6.5A2.5 2.5 0 0 0 4 23V5.5Z" />
        <path d="M4 5.5V21M8 8h8m-8 4h8" />
      </>
    ),
    presentation: (
      <>
        <rect x="3" y="3" width="18" height="13" rx="1" />
        <path d="M12 16v5m-5 0h10m-9-9 3-3 2 2 3-4" />
      </>
    ),
    coffee: (
      <>
        <path d="M5 8h13v7a5 5 0 0 1-5 5h-3a5 5 0 0 1-5-5V8Zm13 2h2a2 2 0 0 1 0 4h-2M8 3v2m4-2v2m4-2v2" />
      </>
    ),
    users: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 21v-1a6 6 0 0 1 12 0v1m2-10a3 3 0 1 0 0-6m1 10a5 5 0 0 1 3 4" />
      </>
    ),
    football: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m12 7 4 3-2 5h-5l-2-5 5-3Zm0-4v4m7 3 2-1m-5 9 1 3m-9-3-1 3m-4-11 3 2" />
      </>
    ),
    volleyball: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3c3 4 3 8 0 9m0 0c-3 1-6 0-9-3m9 3c2 3 2 6-1 9m1-9c4-1 6-3 7-7" />
      </>
    ),
    basketball: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3v18M3 12h18M5 5l14 14M19 5 5 19" />
      </>
    ),
    building: (
      <>
        <path d="M3 21V7l9-4 9 4v14M7 21v-5h10v5M7 10h.01M12 10h.01M17 10h.01" />
      </>
    ),
    stage: (
      <>
        <path d="M3 21h18M5 17h14M7 17V8l5-4 5 4v9M9 11h6" />
      </>
    ),
    leaf: (
      <>
        <path d="M20 4C11 4 5 6 5 13a7 7 0 0 0 7 7c7 0 9-7 8-16Z" />
        <path d="M4 21c4-7 8-9 13-12" />
      </>
    ),
    water: (
      <>
        <path d="M12 3s-7 8-7 12a7 7 0 0 0 14 0c0-4-7-12-7-12Z" />
        <path d="M9 16a3 3 0 0 0 3 3" />
      </>
    ),
    wifi: (
      <>
        <path d="M3 9a14 14 0 0 1 18 0M6 12a9 9 0 0 1 12 0m-9 3a5 5 0 0 1 6 0m-3 4h.01" />
      </>
    ),
    notice: (
      <>
        <path d="M6 3h9l4 4v14H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
        <path d="M14 3v5h5M8 12h8m-8 4h6" />
      </>
    ),
  };

  return <svg {...common}>{icons[type]}</svg>;
}

/* ---------------- HERO ---------------- */

function FacilitiesHero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#091b30] text-white">
      <div className="absolute inset-0 -z-10">
        <CampusImage
          src={images.campus}
          fallback={images.building}
          alt="Khwopa College campus aerial view"
          className="h-full w-full object-cover object-center opacity-40"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#07182b] via-[#0b2038]/90 to-[#0b2038]/40" />
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
          <span className="text-[#dfbd77]">Campus & Facilities</span>
        </div>

        <div className="mt-12 max-w-4xl">
          <Eyebrow light>Explore our campus</Eyebrow>

          <h1 className="font-serif text-5xl leading-[1.05] sm:text-6xl lg:text-[78px]">
            Spaces to learn.
            <span className="block italic text-[#dfbd77]">
              Places to grow.
            </span>
          </h1>

          <p className="editorial-copy mt-7 max-w-2xl text-[15px] leading-7 text-white/70 sm:text-base">
            Discover the learning resources, campus spaces and
            facilities documented at Khwopa College, situated in
            Dekocha, Bhaktapur.
          </p>

        </div>
      </div>

      <div className="absolute bottom-0 h-px w-full bg-[#dfbd77]/50" />
    </section>
  );
}

/* ---------------- CAMPUS OVERVIEW ---------------- */

function CampusOverview() {
  return (
    <section className="bg-[#f7f5f0] px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1300px]">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <Eyebrow>The campus</Eyebrow>

            <h2 className="font-serif text-4xl leading-tight text-[#12243a] sm:text-5xl">
              An environment
              <span className="block italic text-[#a17c3d]">
                for discovery.
              </span>
            </h2>
          </div>

          <div>
            <p className="editorial-copy text-[15px] leading-7 text-[#566474]">
              Khwopa College is situated in Dekocha, Ward No. 6,
              Bhaktapur, in the north-eastern part of Bhaktapur
              Municipality.
            </p>

            <p className="editorial-copy mt-5 text-[15px] leading-7 text-[#75808b]">
              Its published prospectus describes a campus with
              academic facilities, reference resources, research
              support, recreational spaces and an ecological garden.
            </p>
          </div>
        </div>

        {/* Campus facts */}
        <div className="mt-12 grid border-y border-[#ded7ca] sm:grid-cols-2 lg:grid-cols-4">
          <div className="py-7 sm:pr-6 lg:pr-8">
            <p className="font-serif text-3xl text-[#a17c3d]">
              Dekocha
            </p>
            <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-[#78828e]">
              Bhaktapur
            </p>
          </div>

          <div className="border-t border-[#ded7ca] py-7 sm:border-l sm:pl-6 lg:border-t-0 lg:pl-8">
            <p className="font-serif text-3xl text-[#12243a]">
              Ward 6
            </p>
            <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-[#78828e]">
              College location
            </p>
          </div>

          <div className="border-t border-[#ded7ca] py-7 sm:pr-6 lg:border-l lg:border-t-0 lg:pl-8">
            <p className="font-serif text-3xl text-[#12243a]">
              55 Ropani
            </p>
            <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-[#78828e]">
              Published campus-area figure
            </p>
          </div>

          <div className="border-t border-[#ded7ca] py-7 sm:border-l sm:pl-6 lg:pl-8">
            <p className="font-serif text-3xl text-[#a17c3d]">
              Community
            </p>
            <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-[#78828e]">
              Institutional foundation
            </p>
          </div>
        </div>

        <p className="mt-5 text-[10px] leading-5 text-[#92969b]">
          The 55-ropani figure is taken from the college prospectus;
          the current land boundary and campus measurements should
          be confirmed before final publication.
        </p>
      </div>
    </section>
  );
}

/* ---------------- CAMPUS PHOTOGRAPHY ---------------- */

function CampusShowcase() {
  return (
    <section className="bg-[#efede6] px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1300px]">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <Eyebrow>Inside Khwopa</Eyebrow>

            <h2 className="font-serif text-4xl text-[#12243a] sm:text-5xl">
              The campus, in view.
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-[#68717d]">
            Explore photographs of the college's architecture,
            courtyard and surroundings.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-12">
          <figure className="relative overflow-hidden rounded-md md:col-span-8">
            <CampusImage
              src={images.campus}
              fallback={images.building}
              alt="Aerial view of Khwopa College with buildings, courtyard, basketball area and college buses"
              className="h-[300px] w-full object-cover sm:h-[480px]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#07182b]/75 via-transparent to-transparent" />

            <figcaption className="absolute bottom-0 left-0 p-6 sm:p-9">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#dfbd77]">
                Campus overview
              </p>

              <h3 className="mt-2 font-serif text-3xl text-white sm:text-4xl">
                Khwopa College
              </h3>
            </figcaption>
          </figure>

          <div className="flex flex-col gap-4 md:col-span-4">
            <figure className="relative flex-1 overflow-hidden rounded-md bg-[#183650]">
              <CampusImage
                src={images.building}
                fallback={images.courtyard}
                alt="Khwopa College red-brick building and courtyard"
                className="h-[220px] w-full object-cover sm:h-[280px]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#07182b]/75 to-transparent" />

              <figcaption className="absolute bottom-5 left-5">
                <p className="text-[9px] uppercase tracking-[0.17em] text-[#dfbd77]">
                  Architecture
                </p>
                <h3 className="mt-1 font-serif text-xl text-white">
                  Campus buildings
                </h3>
              </figcaption>
            </figure>

            <figure className="relative flex-1 overflow-hidden rounded-md bg-[#183650]">
              <CampusImage
                src={images.courtyard}
                fallback={images.campus}
                alt="Khwopa College educational fete in 2014"
                className="h-[220px] w-full object-cover sm:h-[280px]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#07182b]/75 to-transparent" />

              <figcaption className="absolute bottom-5 left-5">
                <p className="text-[9px] uppercase tracking-[0.17em] text-[#dfbd77]">
                  Historical photograph (2014)
                </p>
                <h3 className="mt-1 font-serif text-xl text-white">
                  College courtyard
                </h3>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FACILITY CARD ---------------- */

function FacilityCard({ facility, index }) {
  return (
    <article className="group flex min-h-[360px] flex-col overflow-hidden rounded-xl border border-[#e5ddce] bg-[#fbfaf7] shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-[#dfbd77] hover:shadow-[0_20px_40px_rgba(18,36,58,0.12)]">
      {/* Facility Image Container */}
      <div className="relative h-48 w-full overflow-hidden bg-[#12243a]">
        <img
          src={facility.image}
          alt={facility.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = images.building;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1827]/80 via-transparent to-black/20" />

        {/* Index Badge */}
        <div className="absolute top-3.5 right-3.5 flex h-7 items-center rounded-full bg-[#12243a]/80 px-2.5 backdrop-blur-sm border border-white/20">
          <span className="font-mono text-xs font-bold text-[#dfbd77]">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Category Pill */}
        <div className="absolute top-3.5 left-3.5">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#12243a]/85 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-[#dfbd77] backdrop-blur-sm border border-[#dfbd77]/30">
            <FacilityIcon type={facility.icon} />
            {facility.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-xl font-bold text-[#12243a] transition-colors group-hover:text-[#8a6828]">
          {facility.title}
        </h3>

        <p className="mt-2.5 text-xs leading-relaxed text-[#566474]">
          {facility.description}
        </p>

        <div className="mt-auto border-t border-[#ede7dc] pt-4 mt-5">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#dfbd77]" />
            <p className="text-[11px] font-medium leading-tight text-[#8a6828]">
              {facility.detail}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ---------------- FACILITIES DIRECTORY ---------------- */

function FacilitiesDirectory() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filteredFacilities = useMemo(() => {
    const query = search.trim().toLowerCase();

    return facilities.filter((facility) => {
      const categoryMatch =
        activeFilter === "All" ||
        facility.category === activeFilter;

      const searchMatch =
        !query ||
        `${facility.title} ${facility.category} ${facility.description} ${facility.detail}`
          .toLowerCase()
          .includes(query);

      return categoryMatch && searchMatch;
    });
  }, [activeFilter, search]);

  return (
    <section
      id="facilities"
      className="scroll-mt-24 bg-[#f7f5f0] px-5 py-20 sm:px-8 lg:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-[1300px]">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.75fr] lg:items-end">
          <div>
            <Eyebrow>Campus resources</Eyebrow>

            <h2 className="font-serif text-4xl leading-tight text-[#12243a] sm:text-5xl">
              Explore our
              <span className="block italic text-[#a17c3d]">
                facilities.
              </span>
            </h2>
          </div>

          <p className="max-w-lg text-sm leading-7 text-[#68717d]">
            From academic resources and research facilities to
            recreational spaces, explore the facilities documented
            in Khwopa College's prospectus.
          </p>
        </div>

        {/* Search */}
        <div className="mt-12 max-w-xl">
          <label
            htmlFor="facility-search"
            className="mb-2 block text-[10px] font-bold uppercase tracking-[0.17em] text-[#92703b]"
          >
            Find a facility
          </label>

          <div className="flex items-center gap-3 border border-[#ded7ca] bg-[#fbfaf7] px-4 py-4 transition focus-within:border-[#b99754]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              className="h-5 w-5 shrink-0 text-[#94713c]"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m16 16 5 5" />
            </svg>

            <input
              id="facility-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search library, laboratory, sports..."
              className="w-full bg-transparent text-sm text-[#12243a] outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Category filters */}
        <div className="mt-6 flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              aria-pressed={activeFilter === filter}
              className={`rounded-md px-4 py-2.5 text-xs font-semibold transition ${
                activeFilter === filter
                  ? "bg-[#12243a] text-white"
                  : "border border-[#ded7ca] bg-[#fbfaf7] text-[#647184] hover:border-[#b99754] hover:text-[#12243a]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="mt-9 flex items-center justify-between border-b border-[#ded7ca] pb-4">
          <p className="text-xs text-[#68717d]">
            Showing{" "}
            <strong className="text-[#12243a]">
              {filteredFacilities.length}
            </strong>{" "}
            facilities
          </p>

          <button
            type="button"
            onClick={() => {
              setSearch("");
              setActiveFilter("All");
            }}
            className="text-[10px] font-bold uppercase tracking-[0.13em] text-[#94713c] hover:text-[#12243a]"
          >
            Reset filters
          </button>
        </div>

        {/* Facility results */}
        {filteredFacilities.length > 0 ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredFacilities.map((facility, index) => (
              <FacilityCard
                key={facility.title}
                facility={facility}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="mt-8 border border-[#ded7ca] bg-[#fbfaf7] px-6 py-14 text-center">
            <h3 className="font-serif text-2xl text-[#12243a]">
              No matching facilities
            </h3>

            <p className="mt-3 text-sm text-[#68717d]">
              Try searching with a different keyword or category.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveFilter("All");
              }}
              className="mt-6 rounded-md bg-[#12243a] px-5 py-3 text-xs font-bold text-white hover:bg-[#233d5a]"
            >
              View all facilities
            </button>
          </div>
        )}

        <p className="mt-7 text-[10px] leading-5 text-[#90969d]">
          Information is based on the published Khwopa College
          prospectus. Availability, condition and current operational
          status should be verified by the college.
        </p>
      </div>
    </section>
  );
}

/* ---------------- CAMPUS ENVIRONMENT ---------------- */

function CampusEnvironment() {
  return (
    <section className="bg-[#efede6] px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1300px]">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
          <div>
            <Eyebrow>Environment & recreation</Eyebrow>

            <h2 className="font-serif text-4xl leading-tight text-[#12243a] sm:text-5xl">
              A campus that connects
              <span className="block italic text-[#a17c3d]">
                learning with life.
              </span>
            </h2>

            <p className="mt-6 text-sm leading-8 text-[#68717d]">
              The college's published prospectus also identifies
              recreational and environmental features, including
              an ecological garden, sporting spaces, rainwater
              harvesting and an open stage.
            </p>

            <div className="mt-9 space-y-5">
              {[
                ["Outdoor recreation", "Football, volleyball and basketball facilities."],
                ["Community activities", "Indoor and outdoor co-curricular activities."],
                ["Environmental awareness", "Ecological garden and rainwater harvesting."],
                ["College gatherings", "Auditorium and open-stage facilities."],
              ].map(([title, description]) => (
                <div
                  key={title}
                  className="flex gap-4 border-b border-[#d9d2c5] pb-5"
                >
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#b99754]" />

                  <div>
                    <h3 className="font-serif text-xl text-[#12243a]">
                      {title}
                    </h3>

                    <p className="mt-1 text-xs leading-6 text-[#68717d]">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -right-4 -top-4 h-24 w-24 border-r border-t border-[#b99754]" />

            <CampusImage
              src={images.courtyard}
              fallback={images.campus}
              alt="Khwopa College courtyard during an educational exhibition in 2014"
              className="h-[320px] w-full rounded-md object-cover sm:h-[420px]"
            />

            <div className="absolute bottom-0 left-0 bg-[#0b2038] p-5 text-white sm:p-7">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#dfbd77]">
                Campus archive
              </p>

              <p className="mt-2 font-serif text-2xl">
                Educational Fete (2014)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- LOCATION ---------------- */

function CampusLocation() {
  const mapUrl =
    "https://www.google.com/maps/search/?api=1&query=Khwopa+College+Dekocha+Bhaktapur";

  return (
    <section
      id="location"
      className="scroll-mt-24 bg-[#0b2038] px-5 py-20 text-white sm:px-8 lg:px-10 lg:py-24"
    >
      <div className="mx-auto grid max-w-[1300px] gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:gap-20">
        <div>
          <Eyebrow light>Find your way</Eyebrow>

          <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
            Come visit
            <span className="block italic text-[#dfbd77]">
              Khwopa College.
            </span>
          </h2>

          <p className="mt-6 max-w-lg text-sm leading-8 text-white/60">
            The college is located in Dekocha, Ward No. 6,
            Bhaktapur, on the north-eastern side of Bhaktapur
            Municipality.
          </p>

          <div className="mt-9 border-t border-white/15 pt-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#dfbd77]">
              College location
            </p>

            <p className="mt-3 font-serif text-2xl">
              Dekocha, Bhaktapur, Nepal
            </p>

            <p className="mt-2 text-xs text-white/50">
              Ward No. 6, Bhaktapur Municipality
            </p>
          </div>

          <a
            href={mapUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-9 inline-flex items-center gap-4 rounded-md bg-[#dfbd77] px-6 py-4 text-xs font-bold text-[#12243a] transition hover:bg-[#f0d49a]"
          >
            Open Google Maps
            <ArrowIcon />
          </a>
        </div>

        <div className="relative overflow-hidden rounded-md border border-white/15 bg-[#17334c] p-8 sm:p-10">
          <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full border border-[#dfbd77]/15" />

          <p className="relative text-[10px] font-bold uppercase tracking-[0.2em] text-[#dfbd77]">
            Getting here
          </p>

          <h3 className="relative mt-5 font-serif text-3xl">
            Located in the historic city of Bhaktapur.
          </h3>

          <p className="relative mt-5 text-sm leading-7 text-white/65">
            The college prospectus describes access from Dekocha
            Chowk and connections via public transport routes
            serving Bhaktapur.
          </p>

          <div className="relative mt-8 border-t border-white/15 pt-6">
            <p className="text-xs leading-6 text-white/45">
              Public transportation routes and accessibility
              information should be reconfirmed before your visit.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SOURCE DOCUMENT ---------------- */

function FacilitySource() {
  return (
    <section className="bg-[#f7f5f0] px-5 py-12 sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-[1300px] flex-col justify-between gap-5 border-l-2 border-[#b99754] bg-[#efede6] p-6 sm:flex-row sm:items-center sm:p-8">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#a17c3d]">
            Source of facilities information
          </p>

          <h3 className="mt-2 font-serif text-2xl text-[#12243a]">
            Khwopa College Prospectus
          </h3>

          <p className="mt-2 text-xs leading-6 text-[#68717d]">
            Published institutional information about campus
            infrastructure and facilities.
          </p>
        </div>

        <a
          href="https://wms.edigitalnepal.com/wms/files/ws-post-files/1678960927254_a82f7d01-e03a-4789-b0ae-14165ca3d1d5.pdf"
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-fit shrink-0 items-center gap-3 rounded-md bg-[#12243a] px-5 py-3.5 text-xs font-bold text-white transition hover:bg-[#233d5a]"
        >
          View prospectus
          <ArrowIcon />
        </a>
      </div>
    </section>
  );
}

/* ---------------- PAGE NAVIGATION ---------------- */

function PageNavigation() {
  return (
    <section className="border-t border-[#e4ddd0] bg-[#fbfaf7] px-5 py-10 sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-[1300px] flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to="/about/faculty"
          className="text-sm text-[#647184] transition hover:text-[#a17c3d]"
        >
          <span className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-[#a17c3d]">
            Previous page
          </span>

          <span className="inline-flex items-center gap-2 font-medium">
            <ArrowLeftIcon />
            Faculty & Staff
          </span>
        </Link>

        <Link
          to="/about"
          className="text-left text-sm text-[#647184] transition hover:text-[#a17c3d] sm:text-right"
        >
          <span className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-[#a17c3d]">
            About section
          </span>

          <span className="inline-flex items-center justify-end gap-2 font-medium">
            Return to About Khwopa
            <ArrowRightIcon />
          </span>
        </Link>
      </div>
    </section>
  );
}

/* ---------------- MAIN PAGE ---------------- */

export default function FacilitiesPage() {
  return (
    <main className="bg-[#f7f5f0]">
      <FacilitiesHero />
      <CampusOverview />
      <CampusShowcase />
      <FacilitiesDirectory />
      <CampusEnvironment />
      <CampusLocation />
      <FacilitySource />
      <PageNavigation />
    </main>
  );
}
