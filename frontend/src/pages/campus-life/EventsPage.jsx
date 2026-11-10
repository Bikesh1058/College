import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PageHero from "../../components/common/PageHero";
import PageContainer from "../../components/common/PageContainer";
import SectionHeading from "../../components/common/SectionHeading";
import CTASection from "../../components/common/CTASection";
import { campusLifeData } from "../../data/campusLifeData";
import { api } from "../../services/api";

export default function EventsPage() {
  const { data: remoteEvents } = useQuery({
    queryKey: ['events'],
    queryFn: () => api.getEvents(),
    staleTime: 60000,
    retry: 1
  });

  const eventList = useMemo(() => {
    if (remoteEvents?.data && Array.isArray(remoteEvents.data) && remoteEvents.data.length > 0) {
      return remoteEvents.data.map(e => ({
        ...e,
        summary: e.description || e.summary || e.title
      }));
    }
    return campusLifeData.events;
  }, [remoteEvents]);
  return (
    <main className="bg-[#f7f5f0] min-h-screen">
      <PageHero
        eyebrow="Campus Life"
        title="College Events & Calendar."
        italicTitle="Celebrations & Colloquiums."
        description="Seminars, national academic conferences, hackathons, blood donation drives, and cultural festivals organized across the campus."
        breadcrumbs={[
          { label: "Campus Life", to: "/campus-life" },
          { label: "Events" }
        ]}
        stats={[
          { label: "Colloquiums", value: "National Level" },
          { label: "Venue", value: "Dekocha Auditorium" },
          { label: "Participation", value: "Open to Students" }
        ]}
      />

      <section className="py-16 sm:py-24">
        <PageContainer>
          <SectionHeading
            eyebrow="Calendar Highlights"
            title="Featured Campus Events"
            italicTitle="& Public Seminars."
            description="Explore key academic conferences and student activities scheduled across the college."
          />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {eventList.map((event) => (
              <div
                key={event.slug}
                className="flex flex-col justify-between rounded-2xl border border-[#e5ddce] bg-white p-8 shadow-sm transition hover:border-[#b99754] hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-[#dfbd77]/20 px-2.5 py-0.5 text-xs font-bold text-[#92703b]">
                      {event.category}
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                      Open for Registration
                    </span>
                  </div>

                  <h3 className="mt-4 font-serif text-2xl font-bold text-[#12243a]">
                    {event.title}
                  </h3>

                  <div className="mt-4 space-y-1.5 text-xs text-slate-500">
                    <p className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-[#dfbd77]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{event.date} · {event.time}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-[#dfbd77]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{event.location}</span>
                    </p>
                  </div>

                  <p className="editorial-copy mt-4 text-xs sm:text-sm leading-relaxed text-[#475365] line-clamp-3">
                    {event.summary}
                  </p>
                </div>

                <div className="mt-6 border-t border-slate-100 pt-5">
                  <Link
                    to={`/campus-life/events/${event.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-[#0b2038] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#17334c]"
                  >
                    <span>View Event Schedule & Agenda</span>
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      <CTASection
        title="Looking for the Complete Academic Calendar?"
        description="Check examination schedules, term breaks, and admission intakes in our downloadable institutional calendar."
        primaryAction={{ label: "View Academic Calendar", to: "/resources/academic-calendar" }}
        secondaryAction={{ label: "Contact College Desk", to: "/contact" }}
      />
    </main>
  );
}
