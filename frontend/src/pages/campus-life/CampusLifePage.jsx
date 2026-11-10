import { Link } from "react-router-dom";
import PageHero from "../../components/common/PageHero";
import PageContainer from "../../components/common/PageContainer";
import SectionHeading from "../../components/common/SectionHeading";
import CTASection from "../../components/common/CTASection";

export default function CampusLifePage() {
  return (
    <main className="bg-[#f7f5f0] min-h-screen">
      <PageHero
        eyebrow="Student Experience"
        title="Campus Life at Khwopa."
        italicTitle="Culture, Community & Growth."
        description="A vibrant community life blending the rich heritage traditions of historic Bhaktapur with energetic student societies, competitive sports, and meaningful social service."
        breadcrumbs={[{ label: "Campus Life" }]}
        stats={[
          { label: "Active Clubs", value: "8+ Chapters" },
          { label: "Annual Gala", value: "Sports Week" },
          { label: "Field Placements", value: "150+ Hours" }
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

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              to="/campus-life/clubs"
              className="group rounded-2xl border border-[#e5ddce] bg-white p-8 transition hover:border-[#b99754] hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#dfbd77]/20 text-[#92703b]">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="mt-5 font-serif text-2xl font-bold text-[#12243a] group-hover:text-[#92703b] transition">
                Clubs & Societies
              </h3>
              <p className="editorial-copy mt-2 text-xs sm:text-sm leading-relaxed text-[#475365]">
                Join IT, Management, Literature, Youth Red Cross, and Environmental circles run actively by students.
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-[#12243a] group-hover:text-[#92703b]">
                Explore Clubs →
              </span>
            </Link>

            <Link
              to="/campus-life/sports"
              className="group rounded-2xl border border-[#e5ddce] bg-white p-8 transition hover:border-[#b99754] hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#dfbd77]/20 text-[#92703b]">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mt-5 font-serif text-2xl font-bold text-[#12243a] group-hover:text-[#92703b] transition">
                Sports & Athletics
              </h3>
              <p className="editorial-copy mt-2 text-xs sm:text-sm leading-relaxed text-[#475365]">
                Annual sports meet, indoor badminton and table tennis halls, basketball courts and inter-college friendlies.
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-[#12243a] group-hover:text-[#92703b]">
                Sports Overview →
              </span>
            </Link>

            <Link
              to="/campus-life/activities"
              className="group rounded-2xl border border-[#e5ddce] bg-white p-8 transition hover:border-[#b99754] hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#dfbd77]/20 text-[#92703b]">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="mt-5 font-serif text-2xl font-bold text-[#12243a] group-hover:text-[#92703b] transition">
                Student Activities & Fieldwork
              </h3>
              <p className="editorial-copy mt-2 text-xs sm:text-sm leading-relaxed text-[#475365]">
                Student community action camps, scientific innovation exhibitions, and heritage awareness walking trails.
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-[#12243a] group-hover:text-[#92703b]">
                View Activities →
              </span>
            </Link>

            <Link
              to="/campus-life/events"
              className="group rounded-2xl border border-[#e5ddce] bg-white p-8 transition hover:border-[#b99754] hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#dfbd77]/20 text-[#92703b]">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="mt-5 font-serif text-2xl font-bold text-[#12243a] group-hover:text-[#92703b] transition">
                Events & Calendar
              </h3>
              <p className="editorial-copy mt-2 text-xs sm:text-sm leading-relaxed text-[#475365]">
                National conferences, blood donation drives, coding hackathons, guest colloquiums, and festivals.
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-[#12243a] group-hover:text-[#92703b]">
                Browse Events →
              </span>
            </Link>

            <Link
              to="/campus-life/gallery"
              className="group overflow-hidden rounded-2xl border border-[#e5ddce] bg-white transition hover:border-[#b99754] hover:shadow-lg sm:col-span-2 lg:col-span-2"
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#dfbd77]/20 text-[#92703b]">
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="mt-5 font-serif text-2xl font-bold text-[#12243a] group-hover:text-[#92703b] transition">
                      Photo Gallery & Albums
                    </h3>
                    <p className="editorial-copy mt-2 text-xs sm:text-sm leading-relaxed text-[#475365]">
                      Immerse yourself in photographs of our traditional Newar red-brick courtyards, academic labs, cultural galas, and sports celebrations.
                    </p>
                  </div>
                  <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-[#12243a] group-hover:text-[#92703b]">
                    Open Gallery Lightbox →
                  </span>
                </div>
                <div className="h-48 md:h-full min-h-[160px] overflow-hidden">
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
