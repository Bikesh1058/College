
import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ExternalLinkIcon,
} from "../components/Icons";

const CAMPUS_IMAGE =
  "https://wms.edigitalnepal.com/wms/files/ws-post-images/1678958957817_007be5e2-a1dc-4580-9809-4964d79fa1a0.jpg";

const BUILDING_IMAGE =
  "https://management.khwopaconference.com/themes/management_conf/img/kc.jpg";

const objectives = [
  {
    number: "01",
    title: "Intellectualisation of society",
    description:
      "To assist on the mission of intellectualization of society.",
  },
  {
    number: "02",
    title: "Education and productive labour",
    description:
      "To make a strong connection of education with productive labor.",
  },
  {
    number: "03",
    title: "Preparing for the future",
    description:
      "To enable the new generation to cope with the challenges of the twenty first century.",
  },
  {
    number: "04",
    title: "Overall personality development",
    description:
      "To promote the overall personality of the students.",
  },
  {
    number: "05",
    title: "Competent human resources",
    description:
      "To give the country competent, skilled and qualified human resources.",
  },
];

function ImageWithFallback({
  src,
  fallback = CAMPUS_IMAGE,
  alt,
  className = "",
  priority = false,
}) {
  const [imageSrc, setImageSrc] = useState(src);
  const [hasFailed, setHasFailed] = useState(false);

  return (
    <img
      src={imageSrc}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onError={() => {
        if (!hasFailed) {
          setHasFailed(true);
          setImageSrc(fallback);
        }
      }}
      className={className}
    />
  );
}

function Eyebrow({ children, light = false }) {
  return (
    <div
      className={`mb-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.22em] ${
        light ? "text-[#dfbd77]" : "text-[#a17c3d]"
      }`}
    >
      <span className="h-px w-9 bg-current" />
      {children}
    </div>
  );
}

function Breadcrumbs() {
  return (
    <div className="flex flex-wrap items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55">
      <Link to="/" className="transition hover:text-[#dfbd77]">
        Home
      </Link>
      <span>/</span>
      <Link to="/about" className="transition hover:text-[#dfbd77]">
        About
      </Link>
      <span>/</span>
      <span className="text-[#dfbd77]">Vision & Mission</span>
    </div>
  );
}

export default function VisionMissionPage() {
  const { data: pageData } = useQuery({
    queryKey: ['page', 'vision-mission'],
    queryFn: () => api.getPage('vision-mission'),
    staleTime: 60000,
    retry: 1
  });

  const vmSection = pageData?.sections?.find(s => s.type === 'vision_mission_content')?.content;
  const eyebrow = vmSection?.eyebrow || 'Guiding Philosophy';
  const heading = vmSection?.heading || 'A vision for Bhaktapur.';
  const dynamicVision = vmSection?.vision || 'To establish Bhaktapur as the centre of Excellence.';
  const dynamicMission = vmSection?.mission || 'Delivering world-class +2 education at accessible costs undertaken by Bhaktapur Municipality, integrating modern scientific inquiry with deep community roots.';
  const dynamicMotto = vmSection?.motto || 'Knowledge, Character, and Community Service';

  return (
    <div className="overflow-hidden bg-[#f7f5f0] text-[#172b3f]">
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-[#091b30] text-white">
        <div className="absolute inset-0 -z-10">
          <ImageWithFallback
            src={CAMPUS_IMAGE}
            fallback={BUILDING_IMAGE}
            alt=""
            priority
            className="h-full w-full object-cover object-center opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07182b] via-[#0b2038]/95 to-[#0b2038]/65" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07182b]/65 to-transparent" />
        </div>

        <div className="pointer-events-none absolute -right-20 -top-36 -z-10 h-[430px] w-[430px] rounded-full border border-[#dfbd77]/10" />
        <div className="pointer-events-none absolute -right-5 -top-20 -z-10 h-[290px] w-[290px] rounded-full border border-[#dfbd77]/10" />

        <div className="mx-auto max-w-[1380px] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <div>
            <Breadcrumbs />

            <div className="mt-12 max-w-4xl">
              <Eyebrow light>{eyebrow}</Eyebrow>

              <h1 className="font-serif text-5xl leading-[1.05] text-white sm:text-6xl lg:text-[78px]">
                {heading}
              </h1>

              <p className="editorial-copy mt-7 max-w-xl text-[15px] leading-7 text-white/65 sm:text-base">
                Motto: {dynamicMotto}
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 h-px w-full bg-[#dfbd77]/50" />
      </section>

      {/* VISION */}
      <section id="vision" className="scroll-mt-20 px-6 py-20 sm:px-10 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            <Eyebrow>01 / Our vision</Eyebrow>

            <h2 className="font-serif text-4xl leading-tight text-[#0b2038] sm:text-5xl">
              The future
              <span className="block italic text-[#a17c3d]">
                we aspire to.
              </span>
            </h2>

            <p className="editorial-copy mt-6 max-w-sm text-[15px] leading-7 text-[#647184]">
              Our institutional vision places Bhaktapur at the heart of
              academic excellence and intellectual development.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-md bg-[#0b2038] p-8 sm:p-12 lg:p-16">
            <span className="pointer-events-none absolute -right-5 -top-16 select-none font-serif text-[190px] leading-none text-white/[0.045]">
              V
            </span>

            <div className="relative z-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#dfbd77]">
                Our vision
              </p>

              <h3 className="mt-8 max-w-3xl font-serif text-3xl leading-[1.3] text-[#fbfaf7] sm:text-4xl lg:text-5xl">
                {dynamicVision}
              </h3>

              <div className="mt-12 h-px w-full bg-white/15" />

              <p className="editorial-copy mt-5 max-w-xl text-[15px] leading-7 text-white/55">
                {dynamicMission}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section
        id="mission"
        className="scroll-mt-20 border-y border-[#e8e2d7] bg-[#efede6] px-6 py-20 sm:px-10 lg:px-12 lg:py-24"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative order-2 h-[320px] overflow-hidden rounded-md sm:h-[430px] lg:order-1">
            <ImageWithFallback
              src={BUILDING_IMAGE}
              fallback={CAMPUS_IMAGE}
              alt="Khwopa College building"
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#0b2038]/65 via-transparent to-transparent" />

            <div className="absolute bottom-6 left-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#dfbd77]">
                Higher education
              </p>
              <p className="mt-1 font-serif text-2xl text-white">
                Accessible to all
              </p>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <Eyebrow>02 / Our mission</Eyebrow>

            <h2 className="font-serif text-4xl leading-tight text-[#0b2038] sm:text-5xl">
              Education as an
              <span className="block italic text-[#a17c3d]">
                opportunity for everyone.
              </span>
            </h2>

            <div className="mt-9 border-l-2 border-[#b99754] pl-6 sm:pl-8">
              <p className="font-serif text-2xl leading-relaxed text-[#172b3f] sm:text-3xl">
                “To provide higher education to people of all economic
                and social strata.”
              </p>
            </div>

            <p className="editorial-copy mt-8 max-w-xl text-[15px] leading-7 text-[#647184]">
              The mission reflects the college's founding academic
              policy of expanding access to higher education, regardless
              of a person's economic or social background.
            </p>
          </div>
        </div>
      </section>

      {/* OBJECTIVES */}
      <section
        id="objectives"
        className="scroll-mt-20 px-6 py-20 sm:px-10 lg:px-12 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div>
              <Eyebrow>03 / Our objectives</Eyebrow>

              <h2 className="font-serif text-4xl leading-tight text-[#0b2038] sm:text-5xl">
                What guides
                <span className="block italic text-[#a17c3d]">
                  our work.
                </span>
              </h2>

              <p className="editorial-copy mt-6 max-w-sm text-[15px] leading-7 text-[#647184]">
                The college's published objectives outline its commitment
                to intellectual development, meaningful education and
                the growth of skilled human resources.
              </p>

              <div className="mt-10 hidden border-t border-[#d9d2c5] pt-6 lg:block">
                <p className="font-serif text-2xl italic text-[#a17c3d]">
                  Knowledge with purpose.
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.15em] text-[#7c8793]">
                  Khwopa College, Bhaktapur
                </p>
              </div>
            </div>

            <div className="border-t border-[#d9d2c5]">
              {objectives.map((objective) => (
                <article
                  key={objective.number}
                  className="group grid gap-4 border-b border-[#d9d2c5] py-7 sm:grid-cols-[70px_1fr] sm:gap-7 sm:py-9"
                >
                  <span className="font-serif text-2xl text-[#b99754] transition group-hover:text-[#0b2038]">
                    {objective.number}
                  </span>

                  <div>
                    <h3 className="font-serif text-2xl text-[#0b2038] transition group-hover:text-[#a17c3d] sm:text-[27px]">
                      {objective.title}
                    </h3>

                    <p className="editorial-copy mt-3 max-w-2xl text-[15px] leading-7 text-[#647184]">
                      {objective.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INSTITUTIONAL CONTEXT */}
      <section className="bg-[#0b2038] px-6 py-16 sm:px-10 lg:px-12 lg:py-20">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-3xl">
            <Eyebrow light>Our foundation</Eyebrow>

            <h2 className="font-serif text-3xl leading-tight text-[#fbfaf7] sm:text-4xl">
              An institution shaped by its community.
            </h2>

            <p className="editorial-copy mt-5 max-w-2xl text-[15px] leading-7 text-white/60">
              Established under Bhaktapur Municipality in 2001 AD
              (2058 BS), Khwopa College was founded with an academic
              policy of making higher education accessible to people
              of all economic and social strata.
            </p>
          </div>

          <Link
            to="/about/history"
            className="inline-flex w-fit shrink-0 items-center gap-4 rounded-md border border-[#dfbd77]/50 px-6 py-4 text-sm font-medium text-[#dfbd77] transition hover:bg-[#dfbd77] hover:text-[#0b2038]"
          >
            Explore our history
            <ArrowRightIcon />
          </Link>
        </div>
      </section>

      {/* PAGE NAVIGATION */}
      <section className="border-t border-[#e8e2d7] bg-[#fbfaf7] px-6 py-10 sm:px-10 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <Link
            to="/about/history"
            className="group text-sm text-[#647184] transition hover:text-[#a17c3d]"
          >
            <span className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-[#a17c3d]">
              Previous page
            </span>
            <span className="inline-flex items-center gap-2 font-medium">
              <ArrowLeftIcon />
              History of Khwopa College
            </span>
          </Link>

          <Link
            to="/about"
            className="group text-left text-sm text-[#647184] transition hover:text-[#a17c3d] sm:text-right"
          >
            <span className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-[#a17c3d]">
              Next page
            </span>
            <span className="inline-flex items-center justify-end gap-2 font-medium">
              Governance & Management
              <ArrowRightIcon />
            </span>
          </Link>
        </div>
      </section>

      {/* SOURCE NOTE */}
      <div className="bg-[#f1eee7] px-6 py-5 sm:px-10 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 text-xs leading-6 text-[#7c8793] sm:flex-row sm:items-center sm:justify-between">
          <p>
            Institutional statements reproduced from the college's
            published Tracer Study Report (2019), Section 1.1.
          </p>

          <a
            href="https://wms.edigitalnepal.com/wms/files/ws-post-files/1678960854821_f02df65e-7f33-49d7-9d35-dc0823d5c9ef.pdf"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-[#a17c3d] transition hover:text-[#0b2038]"
          >
            <span className="inline-flex items-center gap-2">
              View source document
              <ExternalLinkIcon />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
