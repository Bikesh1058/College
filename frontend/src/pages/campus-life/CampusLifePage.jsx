import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PageHero from "../../components/common/PageHero";
import PageContainer from "../../components/common/PageContainer";
import SectionHeading from "../../components/common/SectionHeading";
import CTASection from "../../components/common/CTASection";
import { api } from "../../services/api";

export default function CampusLifePage() {
  // Dynamic PageBuilder CMS synchronization
  const { data: pageDoc } = useQuery({
    queryKey: ['page', 'campus-life'],
    queryFn: () => api.getPage('campus-life'),
    staleTime: 60000,
    retry: 1
  });

  // Dynamic Clubs count synchronization
  const { data: clubsRes } = useQuery({
    queryKey: ['clubs'],
    queryFn: () => api.getClubs(),
    staleTime: 60000,
    retry: 1
  });

  const heroSection = pageDoc?.sections?.find(s => s.type === 'campus_life_hero')?.content;
  const eyebrow = heroSection?.eyebrow || "Student Experience";
  const heading = heroSection?.heading || "Campus Life at Khwopa.";
  const subtext = heroSection?.subtext || "A vibrant community life blending the rich heritage traditions of historic Bhaktapur with energetic student societies, competitive sports, and meaningful social service.";
  const activeClubsCount = heroSection?.activeClubsCount || `${clubsRes?.data?.length || 8} Active Clubs`;
  const annualEvents = heroSection?.annualEvents || "15+ Campus Events Annually";

  return (
    <main className="bg-[#f7f5f0] min-h-screen">
      <PageHero
        eyebrow={eyebrow}
        title={heading.includes('.') ? heading.split('.')[0] + '.' : heading}
        italicTitle={heading.includes('.') ? heading.split('.').slice(1).join('.').trim() : "Culture, Community & Growth."}
        description={subtext}
        breadcrumbs={[{ label: "Campus Life" }]}
        stats={[
          { label: "Active Clubs", value: activeClubsCount },
          { label: "Annual Gala", value: "Sports Week" },
          { label: "Campus Events", value: annualEvents }
        ]}
      />

      <section className="py-16 sm:py-24">
        <PageContainer>
          <SectionHeading
            eyebrow="Beyond the Classroom"
            title="Explore Student Life"
            italicTitle="& Campus Societies."
            description="Discover how students develop leadership, team solidarity, and lifelong passions at Khwopa College."
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {/* 1. Clubs & Societies */}
            <Link
              to="/campus-life/clubs"
              className="group overflow-hidden rounded-2xl border border-[#e5ddce] bg-white transition hover:border-[#b99754] hover:shadow-xl flex flex-col"
            >
              <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-900">
                <img
                  src="https://wms.edigitalnepal.com/wms/files/ws-media-images/1751355381816-426846d5-93df-4761-989c-21986cfc2034.jpg"
                  alt="Khwopa Student Clubs & Societies"
                  className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105 opacity-90"
                  onError={(e) => {
                    e.currentTarget.src = "https://wms.edigitalnepal.com/wms/files/ws-post-images/1678958957817_007be5e2-a1dc-4580-9809-4964d79fa1a0.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 rounded-md bg-[#dfbd77] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#091b30] shadow-sm">
                  8+ Active Chapters
                </span>
              </div>
              <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#12243a] group-hover:text-[#92703b] transition">
                    Clubs & Societies
                  </h3>
                  <p className="editorial-copy mt-2.5 text-xs sm:text-sm leading-relaxed text-[#475365]">
                    Join IT, Management, Literature, Youth Red Cross, and Environmental circles run actively by students.
                  </p>
                </div>
                <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-[#12243a] group-hover:text-[#92703b]">
                  <span>Explore Clubs</span>
                  <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>

            {/* 2. Sports & Athletics */}
            <Link
              to="/campus-life/sports"
              className="group overflow-hidden rounded-2xl border border-[#e5ddce] bg-white transition hover:border-[#b99754] hover:shadow-xl flex flex-col"
            >
              <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-900">
                <img
                  src="https://wms.edigitalnepal.com/wms/files/ws-media-images/1751354678034-37421fd3-9033-4750-a31f-0270f477c4d0.jpg"
                  alt="Khwopa Sports & Athletics"
                  className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105 opacity-90"
                  onError={(e) => {
                    e.currentTarget.src = "https://wms.edigitalnepal.com/wms/files/ws-post-images/1678958957817_007be5e2-a1dc-4580-9809-4964d79fa1a0.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 rounded-md bg-[#dfbd77] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#091b30] shadow-sm">
                  Annual Sports Week
                </span>
              </div>
              <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#12243a] group-hover:text-[#92703b] transition">
                    Sports & Athletics
                  </h3>
                  <p className="editorial-copy mt-2.5 text-xs sm:text-sm leading-relaxed text-[#475365]">
                    Annual sports meet, indoor badminton and table tennis halls, basketball courts and inter-college friendlies.
                  </p>
                </div>
                <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-[#12243a] group-hover:text-[#92703b]">
                  <span>Sports Overview</span>
                  <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>

            {/* 3. Student Activities & Fieldwork */}
            <Link
              to="/campus-life/activities"
              className="group overflow-hidden rounded-2xl border border-[#e5ddce] bg-white transition hover:border-[#b99754] hover:shadow-xl flex flex-col"
            >
              <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-900">
                <img
                  src="https://wms.edigitalnepal.com/wms/files/ws-media-images/1751354678228-f22745f6-6237-430d-a51e-8e20b95dbfcd.jpg"
                  alt="Khwopa Student Activities & Community Fieldwork"
                  className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105 opacity-90"
                  onError={(e) => {
                    e.currentTarget.src = "https://wms.edigitalnepal.com/wms/files/ws-post-images/1678958957817_007be5e2-a1dc-4580-9809-4964d79fa1a0.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 rounded-md bg-[#dfbd77] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#091b30] shadow-sm">
                  Field Placements
                </span>
              </div>
              <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#12243a] group-hover:text-[#92703b] transition">
                    Student Activities & Fieldwork
                  </h3>
                  <p className="editorial-copy mt-2.5 text-xs sm:text-sm leading-relaxed text-[#475365]">
                    Student community action camps, scientific innovation exhibitions, and heritage awareness walking trails.
                  </p>
                </div>
                <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-[#12243a] group-hover:text-[#92703b]">
                  <span>View Activities</span>
                  <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>

            {/* 4. Events & Calendar */}
            <Link
              to="/campus-life/events"
              className="group overflow-hidden rounded-2xl border border-[#e5ddce] bg-white transition hover:border-[#b99754] hover:shadow-xl flex flex-col"
            >
              <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-900">
                <img
                  src="https://wms.edigitalnepal.com/wms/files/ws-post-images/1751512628392_35a0f113-7f94-43bb-9bf6-4a2d56daf8d6.jpg"
                  alt="Khwopa Campus Events & Assemblies"
                  className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105 opacity-90"
                  onError={(e) => {
                    e.currentTarget.src = "https://wms.edigitalnepal.com/wms/files/ws-post-images/1678958957817_007be5e2-a1dc-4580-9809-4964d79fa1a0.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 rounded-md bg-[#dfbd77] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#091b30] shadow-sm">
                  15+ Annual Events
                </span>
              </div>
              <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#12243a] group-hover:text-[#92703b] transition">
                    Events & Calendar
                  </h3>
                  <p className="editorial-copy mt-2.5 text-xs sm:text-sm leading-relaxed text-[#475365]">
                    National conferences, blood donation drives, coding hackathons, guest colloquiums, and festivals.
                  </p>
                </div>
                <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-[#12243a] group-hover:text-[#92703b]">
                  <span>Browse Events</span>
                  <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>

            {/* 5. Photo Gallery Showcase */}
            <Link
              to="/campus-life/gallery"
              className="group overflow-hidden rounded-2xl border border-[#e5ddce] bg-white transition hover:border-[#b99754] hover:shadow-xl sm:col-span-2 lg:col-span-2"
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-7 sm:p-9 flex flex-col justify-between">
                  <div>
                    <span className="inline-block rounded-md bg-[#dfbd77]/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#92703b] mb-3">
                      Visual Archives
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#12243a] group-hover:text-[#92703b] transition">
                      Photo Gallery & Albums
                    </h3>
                    <p className="editorial-copy mt-3 text-xs sm:text-sm leading-relaxed text-[#475365]">
                      Immerse yourself in photographs of our traditional Newar red-brick courtyards, academic labs, cultural galas, and sports celebrations.
                    </p>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-[#12243a] group-hover:text-[#92703b]">
                    <span>Open Gallery Lightbox</span>
                    <span aria-hidden="true">→</span>
                  </span>
                </div>
                <div className="h-56 md:h-full min-h-[200px] overflow-hidden bg-slate-900">
                  <img
                    src="https://www.cijnepal.org/wp-content/uploads/2018/09/11.jpg"
                    alt="Khwopa College Student Community Life"
                    className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = "https://wms.edigitalnepal.com/wms/files/ws-post-images/1678958957817_007be5e2-a1dc-4580-9809-4964d79fa1a0.jpg";
                    }}
                  />
                </div>
              </div>
            </Link>
          </div>
        </PageContainer>
      </section>

      <CTASection
        title="Experience Khwopa College in Person"
        description="Visit our peaceful campus in Dekocha, Bhaktapur and interact with current student leaders."
        primaryAction={{ label: "Location & Directions", to: "/contact/location" }}
        secondaryAction={{ label: "Contact Us", to: "/contact" }}
      />
    </main>
  );
}
