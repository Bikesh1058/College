
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeftIcon, ArrowRightIcon, ExternalLinkIcon } from "../components/Icons";

const CAMPUS_IMAGE =
  "https://wms.edigitalnepal.com/wms/files/ws-post-images/1678958957817_007be5e2-a1dc-4580-9809-4964d79fa1a0.jpg";

const BUILDING_IMAGE =
  "https://www.cijnepal.org/wp-content/uploads/2018/09/11.jpg";

const committeeMembers = [
  {
    name: "Sunil Prajapati",
    position: "Chairman",
    designation: "Mayor, Bhaktapur Municipality",
  },
  {
    name: "Ar. Rajani Joshi",
    position: "Vice Chairman",
    designation: "Deputy Mayor, Bhaktapur Municipality",
  },
  {
    name: "Rabindra Jyakhwo",
    position: "Member",
    designation: "Chairman, Ward No. 9, Bhaktapur Municipality",
  },
  {
    name: "Dr. Hari Ram Suwal",
    position: "Member",
    designation: "Chairman, Ward No. 6, Bhaktapur Municipality",
  },
];

function ImageWithFallback({ src, fallback = CAMPUS_IMAGE, alt, className = "" }) {
  const [imageSrc, setImageSrc] = useState(src);
  const [hasFailed, setHasFailed] = useState(false);

  return (
    <img
      src={imageSrc}
      alt={alt}
      loading="lazy"
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
      <span className="text-[#dfbd77]">Governance & Management</span>
    </div>
  );
}

function GovernanceCard({ number, title, description, image, badge }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-[#e2d8c3] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#b99754] hover:shadow-lg">
      {/* Profile Header scaled down to fit perfectly with circular portrait like staff cards */}
      {image && (
        <div className="relative flex items-center justify-center overflow-hidden border-b border-[#f0ebe1] bg-gradient-to-b from-[#f7f5ef] to-[#efeae0] p-5 pt-6">
          {/* Institutional Pillar Badge */}
          <span className="absolute left-3 top-3 z-10 rounded-md border border-[#dfbd77]/40 bg-[#091b30] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#dfbd77] shadow-sm">
            Pillar {number}
          </span>

          {/* Role / Context Tag */}
          {badge && (
            <span className="absolute right-3 top-3 z-10 max-w-[55%] truncate rounded-md border border-[#e2d8c3] bg-white/90 px-2 py-0.5 text-[9px] font-semibold text-[#8b6727] shadow-sm" title={badge}>
              {badge}
            </span>
          )}

          {/* Circular Portrait Frame perfectly sized and scaled like faculty cards */}
          <div className="relative h-36 w-36 overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow-md ring-1 ring-[#0b2038]/10 transition duration-300 group-hover:scale-105 group-hover:ring-[#b99754]/40 sm:h-40 sm:w-40 flex items-center justify-center">
            <ImageWithFallback
              src={image}
              fallback={BUILDING_IMAGE}
              alt={title}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>
      )}

      {/* Text Body */}
      <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#94733e]">
            Institutional Governance
          </span>

          <h3 className="mt-2 font-serif text-2xl font-bold text-[#0b2038] transition-colors group-hover:text-[#a17c3d]">
            {title}
          </h3>

          <p className="mt-3 text-xs leading-6 text-[#647184]">
            {description}
          </p>
        </div>

        <div className="mt-6 border-t border-[#f0ebe0] pt-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#94733e] flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#dfbd77]" />
            Official Khwopa Institutional Pillar
          </span>
        </div>
      </div>
    </article>
  );
}

function CommitteeMember({ member }) {
  return (
    <article className="group border-b border-[#ded8cc] py-6 first:border-t">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
        <div>
          <h3 className="font-serif text-xl text-[#0b2038] transition group-hover:text-[#a17c3d] sm:text-2xl">
            {member.name}
          </h3>

          <p className="mt-2 text-sm leading-6 text-[#647184]">
            {member.designation}
          </p>
        </div>

        <span className="w-fit rounded-md border border-[#d9c9a8] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#94733e]">
          {member.position}
        </span>
      </div>
    </article>
  );
}

export default function GovernancePage() {
  return (
    <div className="overflow-hidden bg-[#f7f5f0] text-[#172b3f]">
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-[#091b30] text-white">
        <div className="absolute inset-0 -z-10">
          <ImageWithFallback src={CAMPUS_IMAGE} fallback={BUILDING_IMAGE} alt="" className="h-full w-full object-cover object-center opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07182b] via-[#0b2038]/95 to-[#0b2038]/65" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07182b]/65 to-transparent" />
        </div>
        <div className="pointer-events-none absolute -right-20 -top-36 -z-10 h-[430px] w-[430px] rounded-full border border-[#dfbd77]/10" />
        <div className="pointer-events-none absolute -right-5 -top-20 -z-10 h-[290px] w-[290px] rounded-full border border-[#dfbd77]/10" />

        <div className="mx-auto max-w-[1380px] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <div>
            <Breadcrumbs />

            <div className="mt-12 max-w-4xl">
              <Eyebrow light>Institutional leadership</Eyebrow>

              <h1 className="font-serif text-5xl leading-[1.05] text-white sm:text-6xl lg:text-[78px]">
                Governed by
                <span className="block italic text-[#dfbd77]">
                  community.
                </span>
              </h1>

              <p className="editorial-copy mt-7 max-w-xl text-[15px] leading-7 text-white/65 sm:text-base">
                An institutional approach rooted in local responsibility,
                educational development and the collective progress of
                the Bhaktapur community.
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 h-px w-full bg-[#dfbd77]/50" />
      </section>

      {/* INTRODUCTION */}
      <section className="px-6 py-20 sm:px-10 lg:px-12 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div>
            <Eyebrow>01 / Institutional foundation</Eyebrow>

            <h2 className="font-serif text-4xl leading-tight text-[#0b2038] sm:text-5xl">
              Education with
              <span className="block italic text-[#a17c3d]">
                public purpose.
              </span>
            </h2>
          </div>

          <div className="max-w-3xl">
            <p className="editorial-copy text-[15px] leading-7 text-[#33465a]">
              Khwopa College is an educational institution undertaken by
              Bhaktapur Municipality. Its community-oriented foundation
              connects institutional management with the broader goal
              of expanding access to higher education.
            </p>

            <p className="editorial-copy mt-6 text-[15px] leading-7 text-[#647184]">
              The college's governance and academic leadership provide
              the institutional direction for its educational activities.
              The published management committee listing also reflects
              the involvement of municipal representatives.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3 border-t border-[#ded8cc] pt-6">
              <span className="font-serif text-3xl text-[#a17c3d]">
                2058 BS
              </span>
              <span className="h-8 w-px bg-[#d9d2c5]" />
              <span className="text-sm text-[#647184]">
                Established in 2001 AD
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* GOVERNANCE AREAS */}
      <section
        id="structure"
        className="scroll-mt-20 border-y border-[#e8e2d7] bg-[#efede6] px-6 py-20 sm:px-10 lg:px-12 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <Eyebrow>02 / Governance framework</Eyebrow>

            <h2 className="font-serif text-4xl leading-tight text-[#0b2038] sm:text-5xl">
              How the institution
              <span className="block italic text-[#a17c3d]">
                is guided.
              </span>
            </h2>

            <p className="mt-6 text-sm leading-8 text-[#647184]">
              These areas describe the broad responsibilities reflected
              in the college's published institutional information.
              They are not intended to represent a formal organizational
              chart.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <GovernanceCard
              number="01"
              title="Municipal stewardship"
              description="Bhaktapur Municipality provides the institutional and community context in which Khwopa College operates."
              image="https://wms.edigitalnepal.com/wms/files/ws-post-images/1678969137327_351cb6e7-7c56-494d-94ed-d17d2ac5f69d.jpg"
              badge="Mayor / Chairman Sunil Prajapati"
            />

            <GovernanceCard
              number="02"
              title="Management oversight"
              description="The College Management Committee provides an institutional governance structure, with municipal representatives represented in its published membership."
              image="https://wms.edigitalnepal.com/wms/files/ws-media-thumbnails/1765262743619-a462d2c9-d7d9-488a-b1fe-fa5ffe161b6d.JPG"
              badge="College Management Committee Assembly"
            />

            <GovernanceCard
              number="03"
              title="College leadership"
              description="The college's academic and administrative leadership supports the operation of programmes and institutional activities."
              image="https://wms.edigitalnepal.com/wms/files/ws-post-images/1687053929232_e72d3c87-e1a2-4476-accd-c293045e53a8.jpg"
              badge="Principal Prakash Kumar Shrestha"
            />
          </div>
        </div>
      </section>

      {/* MANAGEMENT COMMITTEE */}
      <section
        id="management"
        className="scroll-mt-20 px-6 py-20 sm:px-10 lg:px-12 lg:py-28"
      >
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
          <div>
            <Eyebrow>03 / Management committee</Eyebrow>

            <h2 className="font-serif text-4xl leading-tight text-[#0b2038] sm:text-5xl">
              Institutional
              <span className="block italic text-[#a17c3d]">
                oversight.
              </span>
            </h2>

            <p className="mt-7 text-sm leading-8 text-[#647184]">
              The following names and positions are reproduced from
              the College Management Committee listing published in
              the first volume of Khwopa Review.
            </p>

            <div className="mt-8 border-l-2 border-[#b99754] bg-[#efede6] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#94733e]">
                Publication reference
              </p>

              <p className="mt-3 font-serif text-xl text-[#0b2038]">
                May – July 2025
              </p>

              <p className="mt-2 text-xs leading-6 text-[#647184]">
                This is a dated published listing. Confirm current
                membership and designations with the college before
                presenting it as the current committee.
              </p>
            </div>
          </div>

          <div>
            {committeeMembers.map((member) => (
              <CommitteeMember key={member.name} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* PRINCIPAL / COLLEGE LEADERSHIP */}
      <section className="bg-[#0b2038] px-6 py-20 sm:px-10 lg:px-12 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.8fr] lg:gap-20">
          <div>
            <Eyebrow light>04 / College leadership</Eyebrow>

            <h2 className="font-serif text-4xl leading-tight text-[#fbfaf7] sm:text-5xl">
              Academic direction.
              <span className="block italic text-[#dfbd77]">
                Institutional responsibility.
              </span>
            </h2>

            <p className="mt-7 max-w-2xl text-sm leading-8 text-white/65">
              The college's principal and academic leadership are central
              to the coordination of its educational programmes and
              institutional operations.
            </p>

            <p className="mt-5 max-w-2xl text-sm leading-8 text-white/65">
              In the May–July 2025 issue of Khwopa Review, Prakash Kumar
              Shrestha is listed as Principal of Khwopa College in the
              publication's advisors section. This reference is retained
              as a dated record rather than a confirmation of the
              present office-holder.
            </p>

            <a
              href="https://wms.edigitalnepal.com/wms/files/ws-file-manager-files/1770870492398_608d5c07-4d9c-4521-ab0c-8c391b60aae1.pdf"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-4 rounded-md border border-[#dfbd77]/50 px-6 py-3.5 text-sm font-medium text-[#dfbd77] transition hover:bg-[#dfbd77] hover:text-[#0b2038]"
            >
              Read the published leadership listing
              <ExternalLinkIcon />
            </a>
          </div>

          <div className="relative">
            <div className="absolute -bottom-4 -right-4 h-28 w-28 border-b border-r border-[#dfbd77]/60" />

            <div className="relative h-[300px] overflow-hidden rounded-md sm:h-[390px]">
              <ImageWithFallback
                src={BUILDING_IMAGE}
                fallback={CAMPUS_IMAGE}
                alt="Khwopa College campus building"
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#07182b]/70 to-transparent" />

              <div className="absolute bottom-6 left-6">
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#dfbd77]">
                  Khwopa College
                </p>
                <p className="mt-1 font-serif text-2xl text-white">
                  Dekocha, Bhaktapur
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GOVERNANCE PRINCIPLES */}
      <section className="px-6 py-20 sm:px-10 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <Eyebrow>05 / Institutional values</Eyebrow>

            <h2 className="font-serif text-4xl leading-tight text-[#0b2038] sm:text-5xl">
              What good governance
              <span className="block italic text-[#a17c3d]">
                should protect.
              </span>
            </h2>
          </div>

          <div className="mt-12 grid gap-8 border-t border-[#ded8cc] pt-9 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <span className="font-serif text-3xl text-[#b99754]">01</span>
              <h3 className="mt-5 font-serif text-xl text-[#0b2038]">
                Accountability
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#647184]">
                Responsible institutional management and clear roles.
              </p>
            </div>

            <div>
              <span className="font-serif text-3xl text-[#b99754]">02</span>
              <h3 className="mt-5 font-serif text-xl text-[#0b2038]">
                Academic quality
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#647184]">
                Supporting effective teaching, learning and research.
              </p>
            </div>

            <div>
              <span className="font-serif text-3xl text-[#b99754]">03</span>
              <h3 className="mt-5 font-serif text-xl text-[#0b2038]">
                Public responsibility
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#647184]">
                Keeping the institution connected to the community it serves.
              </p>
            </div>

            <div>
              <span className="font-serif text-3xl text-[#b99754]">04</span>
              <h3 className="mt-5 font-serif text-xl text-[#0b2038]">
                Institutional growth
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#647184]">
                Encouraging continuous development and improvement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SOURCE */}
      <section className="border-y border-[#e8e2d7] bg-[#efede6] px-6 py-8 sm:px-10 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a17c3d]">
              Institutional reference
            </p>

            <h3 className="mt-2 font-serif text-xl text-[#0b2038]">
              Khwopa Review — Volume 1
            </h3>

            <p className="mt-1 text-xs text-[#647184]">
              Quarterly magazine (May–July 2025)
            </p>
          </div>

          <a
            href="https://wms.edigitalnepal.com/wms/files/ws-file-manager-files/1770870492398_608d5c07-4d9c-4521-ab0c-8c391b60aae1.pdf"
            target="_blank"
            rel="noreferrer"
            className="w-fit rounded-md border border-[#b99754] px-5 py-3 text-sm font-semibold text-[#8b6c39] transition hover:bg-[#0b2038] hover:text-white"
          >
            <span className="inline-flex items-center gap-2">
              View publication
              <ExternalLinkIcon />
            </span>
          </a>
        </div>
      </section>

      {/* PAGE NAVIGATION */}
      <section className="bg-[#fbfaf7] px-6 py-10 sm:px-10 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <Link
            to="/about/vision-mission"
            className="text-sm text-[#647184] transition hover:text-[#a17c3d]"
          >
            <span className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-[#a17c3d]">
              Previous page
            </span>
            <span className="inline-flex items-center gap-2 font-medium">
              <ArrowLeftIcon />
              Vision & Mission
            </span>
          </Link>

          <Link
            to="/about/faculty"
            className="text-left text-sm text-[#647184] transition hover:text-[#a17c3d] sm:text-right"
          >
            <span className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-[#a17c3d]">
              Next page
            </span>
            <span className="inline-flex items-center justify-end gap-2 font-medium">
              Faculty & Staff
              <ArrowRightIcon />
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
