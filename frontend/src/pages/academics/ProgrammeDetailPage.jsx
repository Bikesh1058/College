import { useParams, Link, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PageHero from "../../components/common/PageHero";
import PageContainer from "../../components/common/PageContainer";
import SectionHeading from "../../components/common/SectionHeading";
import CTASection from "../../components/common/CTASection";
import { programmes as localProgrammes } from "../../data/programmes";
import { api } from "../../services/api";

export default function ProgrammeDetailPage() {
  const { slug } = useParams();

  // Fetch dynamic programme details from MongoDB Atlas
  const { data: remoteProgramme, isLoading } = useQuery({
    queryKey: ['programme', slug],
    queryFn: () => api.getProgramme(slug),
    staleTime: 60000,
    retry: 1
  });

  const localProg = localProgrammes.find((p) => p.slug === slug);
  const programme = remoteProgramme || localProg;

  if (!programme && !isLoading) {
    return <Navigate to="/academics" replace />;
  }

  if (!programme) {
    return null;
  }

  return (
    <main className="bg-[#f7f5f0] min-h-screen">
      <PageHero
        eyebrow={`Degree Overview · ${programme.faculty}`}
        title={programme.fullName}
        italicTitle={`Code: ${programme.code}`}
        description={programme.tagline}
        breadcrumbs={[
          { label: "Academics", to: "/academics" },
          { label: programme.faculty, to: `/academics/${programme.facultySlug}` },
          { label: programme.shortName }
        ]}
        stats={[
          { label: "Academic Level", value: programme.level },
          { label: "Duration", value: programme.duration },
          { label: "Board / University", value: programme.affiliation }
        ]}
      />

      <section className="py-16 sm:py-24">
        <PageContainer>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <SectionHeading
                eyebrow="Curriculum Focus"
                title={`About the ${programme.fullName}`}
                description={programme.description}
              />

              {/* Objectives */}
              <div className="mt-8 rounded-2xl border border-[#e5ddce] bg-white p-8 shadow-sm">
                <h3 className="font-serif text-2xl font-bold text-[#12243a]">
                  Key Programme Objectives
                </h3>
                <ul className="mt-5 space-y-3.5">
                  {programme.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-3.5 text-xs sm:text-sm text-[#475365]">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#dfbd77]/20 font-serif text-xs font-bold text-[#92703b]">
                        {i + 1}
                      </span>
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Curriculum Breakdown */}
              <div className="mt-10">
                <h3 className="font-serif text-2xl font-bold text-[#12243a]">
                  Course Structure & Curriculum
                </h3>
                <div className="mt-5 space-y-5">
                  {programme.curriculum.map((item, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-[#e5ddce] bg-white p-7 shadow-sm"
                    >
                      <h4 className="flex items-center gap-2.5 font-serif text-lg font-bold text-[#12243a]">
                        <span className="h-2 w-2 rounded-full bg-[#dfbd77]" />
                        <span>{item.year}</span>
                      </h4>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.subjects.map((sub, sIdx) => (
                          <span
                            key={sIdx}
                            className="inline-flex rounded-lg border border-[#e5ddce] bg-[#fbfaf7] px-3 py-1.5 text-xs font-medium text-slate-700"
                          >
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Details */}
            <div className="lg:col-span-4 space-y-6">
              <div className="rounded-2xl border border-[#e5ddce] bg-white p-7 shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#92703b]">
                  Admission Criteria
                </span>
                <h4 className="mt-2 font-serif text-xl font-bold text-[#12243a]">
                  Eligibility Requirements
                </h4>
                <p className="editorial-copy mt-3 text-xs sm:text-sm leading-relaxed text-[#475365]">
                  {programme.eligibility}
                </p>
                <Link
                  to="/admissions/requirements"
                  className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#92703b] hover:underline"
                >
                  <span>Detailed Checklist & Documents →</span>
                </Link>
              </div>

              <div className="rounded-2xl border border-[#e5ddce] bg-white p-7 shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#92703b]">
                  Future Scope
                </span>
                <h4 className="mt-2 font-serif text-xl font-bold text-[#12243a]">
                  Career Pathways
                </h4>
                <ul className="mt-4 space-y-2.5">
                  {programme.careers.map((career, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-xs text-[#475365]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#dfbd77]" />
                      <span>{career}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-[#091b30] bg-[#091b30] p-7 text-white shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#dfbd77]">
                  Faculty Division
                </span>
                <h4 className="mt-2 font-serif text-xl font-bold text-white">
                  {programme.faculty}
                </h4>
                <p className="editorial-copy mt-2 text-xs leading-relaxed text-white/70">
                  Discover departments, faculty mentors, research projects, and extracurricular societies.
                </p>
                <Link
                  to={`/academics/${programme.facultySlug}`}
                  className="mt-5 inline-flex items-center justify-center rounded-xl bg-[#dfbd77] px-4 py-2.5 text-xs font-bold text-[#091b30] transition hover:bg-[#c9a65d]"
                >
                  Visit Study Area Page
                </Link>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      <CTASection
        title={`Apply for ${programme.shortName} at Khwopa`}
        description="Learn more about intake timelines, application procedures, and available municipality scholarships."
        primaryAction={{ label: "How to Apply", to: "/admissions/how-to-apply" }}
        secondaryAction={{ label: "View Fee Structure", to: "/admissions/fees-scholarships" }}
      />
    </main>
  );
}
