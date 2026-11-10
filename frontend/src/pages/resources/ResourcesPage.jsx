import { Link } from "react-router-dom";
import PageHero from "../../components/common/PageHero";
import PageContainer from "../../components/common/PageContainer";
import SectionHeading from "../../components/common/SectionHeading";
import CTASection from "../../components/common/CTASection";

export default function ResourcesPage() {
  return (
    <main className="bg-[#f7f5f0] min-h-screen">
      <PageHero
        eyebrow="Student Support"
        title="Resources & Services."
        italicTitle="Academic Assistance Directory."
        description="Centralized academic downloads, institutional calendar, library repository, and external university digital gateways."
        breadcrumbs={[{ label: "Student Resources" }]}
        stats={[
          { label: "Volumes", value: "45,000+ Books" },
          { label: "Document Archive", value: "Downloadable" },
          { label: "Online OPAC", value: "Available" }
        ]}
      />

      <section className="py-16 sm:py-24">
        <PageContainer>
          <SectionHeading
            eyebrow="Quick Navigation"
            title="Explore Academic Resources"
            italicTitle="& Campus Facilities."
            description="Access official forms, calendars, library databases, and online student portals."
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              to="/resources/downloads"
              className="group rounded-2xl border border-[#e5ddce] bg-white p-8 shadow-sm transition hover:border-[#b99754] hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#dfbd77]/20 text-[#92703b]">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <h3 className="mt-5 font-serif text-2xl font-bold text-[#12243a] group-hover:text-[#92703b] transition">
                Downloads & Forms
              </h3>
              <p className="editorial-copy mt-2 text-xs sm:text-sm leading-relaxed text-[#475365]">
                Course syllabus, leave applications, practical lab manuals, and recommendation forms.
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-[#12243a] group-hover:text-[#92703b]">
                Browse Files →
              </span>
            </Link>

            <Link
              to="/resources/academic-calendar"
              className="group rounded-2xl border border-[#e5ddce] bg-white p-8 shadow-sm transition hover:border-[#b99754] hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#dfbd77]/20 text-[#92703b]">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="mt-5 font-serif text-2xl font-bold text-[#12243a] group-hover:text-[#92703b] transition">
                Academic Calendar
              </h3>
              <p className="editorial-copy mt-2 text-xs sm:text-sm leading-relaxed text-[#475365]">
                Monthly event timelines, term examinations, vacations, and municipality holidays.
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-[#12243a] group-hover:text-[#92703b]">
                View Calendar →
              </span>
            </Link>

            <Link
              to="/resources/library"
              className="group rounded-2xl border border-[#e5ddce] bg-white p-8 shadow-sm transition hover:border-[#b99754] hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#dfbd77]/20 text-[#92703b]">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="mt-5 font-serif text-2xl font-bold text-[#12243a] group-hover:text-[#92703b] transition">
                Library & OPAC
              </h3>
              <p className="editorial-copy mt-2 text-xs sm:text-sm leading-relaxed text-[#475365]">
                45,000+ volumes, digital theses repository, research databases, and reading hall hours.
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-[#12243a] group-hover:text-[#92703b]">
                Library Info →
              </span>
            </Link>

            <Link
              to="/resources/online-services"
              className="group rounded-2xl border border-[#e5ddce] bg-white p-8 shadow-sm transition hover:border-[#b99754] hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#dfbd77]/20 text-[#92703b]">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="mt-5 font-serif text-2xl font-bold text-[#12243a] group-hover:text-[#92703b] transition">
                Online Services
              </h3>
              <p className="editorial-copy mt-2 text-xs sm:text-sm leading-relaxed text-[#475365]">
                Direct access to NEB examination portals, board results, e-library catalog, and curriculum downloads.
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-[#12243a] group-hover:text-[#92703b]">
                External Portals →
              </span>
            </Link>
          </div>
        </PageContainer>
      </section>

      <CTASection
        title="Need Specific Academic Assistance?"
        description="The student help desk is available in the administrative building, Dekocha."
        primaryAction={{ label: "Contact College Desk", to: "/contact" }}
        secondaryAction={{ label: "Download Forms", to: "/resources/downloads" }}
      />
    </main>
  );
}
