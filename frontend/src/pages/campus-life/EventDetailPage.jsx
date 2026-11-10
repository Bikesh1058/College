import { useParams, Navigate } from "react-router-dom";
import PageHero from "../../components/common/PageHero";
import PageContainer from "../../components/common/PageContainer";
import SectionHeading from "../../components/common/SectionHeading";
import CTASection from "../../components/common/CTASection";
import { campusLifeData } from "../../data/campusLifeData";

export default function EventDetailPage() {
  const { slug } = useParams();
  const event = campusLifeData.events.find((e) => e.slug === slug);

  if (!event) {
    return <Navigate to="/campus-life/events" replace />;
  }

  return (
    <main className="bg-[#f7f5f0] min-h-screen">
      <PageHero
        eyebrow={`Campus Event · ${event.category}`}
        title={event.title}
        italicTitle={`Date: ${event.date}`}
        description={event.summary}
        breadcrumbs={[
          { label: "Campus Life", to: "/campus-life" },
          { label: "Events", to: "/campus-life/events" },
          { label: event.title }
        ]}
        stats={[
          { label: "Time", value: event.time },
          { label: "Venue", value: event.location },
          { label: "Organizer", value: event.organizer }
        ]}
      />

      <section className="py-16 sm:py-24">
        <PageContainer>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <SectionHeading
                eyebrow="Detailed Schedule"
                title="Event Agenda & Program Timeline"
                description="Sessions and presentations planned for the event."
              />

              <div className="space-y-4">
                {event.agenda.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 rounded-2xl border border-[#e5ddce] bg-white p-6 shadow-sm"
                  >
                    <span className="rounded-lg bg-[#dfbd77]/20 px-3 py-1 font-serif text-xs font-bold text-[#92703b] whitespace-nowrap">
                      {item.time}
                    </span>
                    <p className="font-serif text-lg font-bold text-[#12243a]">
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>

              {/* Speakers Section */}
              <div className="mt-12">
                <h3 className="font-serif text-2xl font-bold text-[#12243a]">
                  Keynote Speakers & Resource Persons
                </h3>
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {event.speakers.map((spk, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-[#e5ddce] bg-white p-6 shadow-sm"
                    >
                      <h4 className="font-serif text-lg font-bold text-[#12243a]">
                        {spk.name}
                      </h4>
                      <p className="mt-1 text-xs text-[#92703b] font-medium">
                        {spk.role}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="rounded-2xl border border-[#e5ddce] bg-white p-7 shadow-sm text-center">
                <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                  Open for Attendees
                </span>
                <h4 className="mt-3 font-serif text-xl font-bold text-[#12243a]">
                  Register as Attendee
                </h4>
                <p className="editorial-copy mt-2 text-xs leading-relaxed text-[#475365]">
                  Students and faculty members can register free of charge at the event registration desk.
                </p>
                <div className="mt-5 rounded-xl bg-[#fbfaf7] border border-[#e5ddce] p-3 text-xs text-slate-500">
                  Registration closes 24 hours prior to commencement.
                </div>
              </div>

              <div className="rounded-2xl border border-[#e5ddce] bg-white p-7 shadow-sm">
                <h4 className="font-serif text-lg font-bold text-[#12243a]">
                  Need Assistance?
                </h4>
                <p className="editorial-copy mt-2 text-xs text-[#475365]">
                  Contact event coordinators at <span className="font-semibold text-[#12243a] not-italic">info@khwopacollege.edu.np</span> or visit the Student Welfare section.
                </p>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      <CTASection
        title="Explore More College Events & Activities"
        description="Check upcoming academic colloquiums, debate contests, and student club meets."
        primaryAction={{ label: "Back to Events", to: "/campus-life/events" }}
        secondaryAction={{ label: "Campus Life Hub", to: "/campus-life" }}
      />
    </main>
  );
}
