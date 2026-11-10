import PageHero from "../../components/common/PageHero";
import PageContainer from "../../components/common/PageContainer";
import SectionHeading from "../../components/common/SectionHeading";
import CTASection from "../../components/common/CTASection";
import { resourcesData } from "../../data/resourcesData";

export default function AcademicCalendarPage() {
  return (
    <main className="bg-[#f7f5f0] min-h-screen">
      <PageHero
        eyebrow="Student Resources"
        title="Academic Calendar."
        italicTitle="Session Schedule 2083."
        description="Official timeline of academic sessions, internal examinations, vacation breaks, and cultural festivals."
        breadcrumbs={[
          { label: "Resources", to: "/resources" },
          { label: "Academic Calendar" }
        ]}
        stats={[
          { label: "Academic Year", value: "2083 BS" },
          { label: "Gregorian", value: "2026 - 2027" },
          { label: "Term System", value: "Annual & Sem" }
        ]}
      />

      <section className="py-16 sm:py-24">
        <PageContainer>
          <SectionHeading
            eyebrow="Session Schedule"
            title="Academic Timeline & Events"
            italicTitle="for Year 2083 (2026 - 2027)."
            description="Important milestones, exam routines, and term dates scheduled for +2 higher secondary students (Grades 11 & 12)."
          />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {resourcesData.calendar.map((block, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-[#e5ddce] bg-white p-8 shadow-sm transition hover:border-[#b99754]"
              >
                <div className="flex items-center gap-3 border-b border-[#e5ddce] pb-4">
                  <span className="h-3 w-3 rounded-full bg-[#dfbd77]" />
                  <h3 className="font-serif text-xl font-bold text-[#12243a]">
                    {block.month}
                  </h3>
                </div>

                <div className="mt-6 space-y-4">
                  {block.events.map((ev, eIdx) => (
                    <div
                      key={eIdx}
                      className="flex items-start gap-4 rounded-xl bg-[#fbfaf7] border border-[#e5ddce] p-4 text-xs sm:text-sm"
                    >
                      <span className="font-serif font-bold text-[#92703b] whitespace-nowrap">
                        {ev.date}
                      </span>
                      <span className="font-medium text-[#475365]">
                        {ev.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      <CTASection
        title="Looking for Examination Timetables?"
        description="Check upcoming board examination schedules and form deadlines."
        primaryAction={{ label: "Exam Routines", to: "/examinations/routines" }}
        secondaryAction={{ label: "Student Downloads", to: "/resources/downloads" }}
      />
    </main>
  );
}
