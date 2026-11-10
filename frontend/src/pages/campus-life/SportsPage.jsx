import PageHero from "../../components/common/PageHero";
import PageContainer from "../../components/common/PageContainer";
import SectionHeading from "../../components/common/SectionHeading";
import CTASection from "../../components/common/CTASection";
import { campusLifeData } from "../../data/campusLifeData";

export default function SportsPage() {
  return (
    <main className="bg-[#f7f5f0] min-h-screen">
      <PageHero
        eyebrow="Campus Life"
        title="Sports & Competitions."
        italicTitle="Discipline & Team Solidarity."
        description="Fostering physical stamina, sportsmanship, and mental resilience through dedicated courts, athletic tracks and annual tournaments."
        breadcrumbs={[
          { label: "Campus Life", to: "/campus-life" },
          { label: "Sports & Competitions" }
        ]}
        stats={[
          { label: "Flagship Event", value: "Annual Sports Week" },
          { label: "Indoor Facilities", value: "TT & Badminton" },
          { label: "Outdoors", value: "Courts & Grounds" }
        ]}
      />

      <section className="py-16 sm:py-24">
        <PageContainer>
          <SectionHeading
            eyebrow="Athletic Excellence"
            title="Sports Facilities & Tournaments"
            italicTitle="for Physical Well-being."
            description="Our students actively participate in university championships, municipal leagues, and inter-faculty tourneys."
          />

          <div className="space-y-8">
            {campusLifeData.sports.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-[#e5ddce] bg-white p-7 sm:p-9 shadow-sm transition hover:border-[#b99754]"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-[#e5ddce] pb-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#92703b]">
                      Season: {item.season}
                    </span>
                    <h3 className="mt-1 font-serif text-2xl font-bold text-[#12243a]">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <p className="editorial-copy mt-4 text-[15px] leading-7 text-[#475365]">
                  {item.description}
                </p>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 rounded-xl bg-[#fbfaf7] border border-[#e5ddce] p-6 text-xs sm:text-sm">
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#12243a]">
                      Designated Venues:
                    </h4>
                    <ul className="mt-2.5 space-y-1.5 text-[#475365]">
                      {item.venues.map((v, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#dfbd77]" />
                          <span>{v}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#12243a]">
                      Featured Sports & Events:
                    </h4>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {item.featuredEvents.map((ev, i) => (
                        <span
                          key={i}
                          className="rounded-md bg-white border border-[#e5ddce] px-2.5 py-1 text-xs font-semibold text-[#12243a]"
                        >
                          {ev}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      <CTASection
        title="Check the Annual Sports Calendar"
        description="Stay informed about registration trials, inter-faculty football, and athletics meets."
        primaryAction={{ label: "View Academic Calendar", to: "/resources/academic-calendar" }}
        secondaryAction={{ label: "Campus Life Overview", to: "/campus-life" }}
      />
    </main>
  );
}
