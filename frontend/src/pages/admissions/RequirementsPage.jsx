import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PageHero from "../../components/common/PageHero";
import PageContainer from "../../components/common/PageContainer";
import SectionHeading from "../../components/common/SectionHeading";
import CTASection from "../../components/common/CTASection";
import { admissionsData } from "../../data/admissionsData";
import { api } from "../../services/api";

export default function RequirementsPage() {
  const { data: remoteProgrammes } = useQuery({
    queryKey: ['programmes'],
    queryFn: () => api.getProgrammes(),
    staleTime: 60000,
    retry: 1
  });

  const streamCards = (remoteProgrammes?.data && remoteProgrammes.data.length > 0)
    ? remoteProgrammes.data.map(p => ({
        stream: p.title || p.shortName,
        eligibility: p.eligibility || 'Minimum GPA 2.0+ in SEE with prescribed subject grade prerequisites.',
        subjects: p.subjects || [],
        overview: p.overview
      }))
    : null;

  return (
    <main className="bg-[#f7f5f0] min-h-screen">
      <PageHero
        eyebrow="Admissions Office"
        title="Eligibility & Requirements."
        italicTitle="Criteria for Enrolment."
        description="Comprehensive grade requirements, academic eligibility, and essential documentation checklists across all academic programmes at Khwopa College."
        breadcrumbs={[
          { label: "Admissions", to: "/admissions" },
          { label: "Eligibility & Requirements" }
        ]}
        stats={[
          { label: "Academic Levels", value: "+2 Curricula" },
          { label: "Affiliations", value: "NEB Certified" },
          { label: "Admissions Desk", value: "Dekocha" }
        ]}
      />

      <section className="py-16 sm:py-24">
        <PageContainer>
          <SectionHeading
            eyebrow="Academic Standards"
            title="Programme-Based Eligibility"
            italicTitle="& Minimum Qualifications."
            description="Review the minimum criteria prescribed by NEB and Khwopa Secondary School before submitting your Class 11 application."
          />

          {streamCards && (
            <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              {streamCards.map((sc, i) => (
                <div key={i} className="rounded-2xl border border-[#c5a15b]/40 bg-white p-7 shadow-sm">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a68238] bg-[#fbf8f0] px-2.5 py-1 rounded-md border border-[#e8dfc8]">
                    NEB Stream
                  </span>
                  <h4 className="mt-3 font-serif text-2xl font-bold text-[#12243a]">{sc.stream}</h4>
                  <p className="mt-2 text-xs sm:text-sm text-[#475365] leading-relaxed">{sc.eligibility}</p>
                  {sc.subjects?.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-[#f0ece1]">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Included Subjects:</span>
                      <div className="mt-1 flex flex-wrap gap-1.5">
                        {sc.subjects.map((s, idx) => (
                          <span key={idx} className="text-xs bg-[#FAF8F5] border border-[#E3DCCB] text-[#101B2D] px-2.5 py-0.5 rounded-md font-medium">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="space-y-8">
            {admissionsData.requirements.map((req, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-[#e5ddce] bg-white p-7 sm:p-9 shadow-sm transition hover:border-[#b99754]"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-[#e5ddce] pb-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#92703b]">
                      {req.board} Affiliated
                    </span>
                    <h3 className="mt-1 font-serif text-2xl font-bold text-[#12243a]">
                      {req.level}
                    </h3>
                  </div>
                  <span className="inline-flex rounded-xl bg-[#0b2038] px-3.5 py-1.5 text-xs font-semibold text-[#dfbd77]">
                    {req.gpa}
                  </span>
                </div>

                <p className="editorial-copy mt-4 text-[15px] leading-7 text-[#475365]">
                  {req.details}
                </p>

                <div className="mt-6 rounded-xl bg-[#fbfaf7] border border-[#e5ddce] p-6">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#12243a]">
                    Required Document Checklist:
                  </h4>
                  <ul className="mt-3.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {req.documents.map((doc, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#475365]">
                        <span className="text-[#dfbd77] font-bold">✓</span>
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-[#dfbd77] bg-[#dfbd77]/10 p-7 sm:p-9">
            <h4 className="font-serif text-xl font-bold text-[#12243a]">
              Important Verification for Foreign & Non-NEB Boards
            </h4>
            <p className="editorial-copy mt-2 text-sm leading-relaxed text-[#475365]">
              Students who completed examinations under foreign boards (such as CBSE, ICSE, or Cambridge A-Levels) must obtain an official Equivalence Certificate from the Curriculum Development Centre (CDC), Sanothimi, Bhaktapur prior to final admission confirmation.
            </p>
            <div className="mt-5 flex gap-4">
              <Link
                to="/admissions/how-to-apply"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#12243a] hover:text-[#92703b]"
              >
                <span>Read Application Instructions →</span>
              </Link>
            </div>
          </div>
        </PageContainer>
      </section>

      <CTASection
        title="Ready to Begin Your Admission Application?"
        description="Follow our step-by-step application walkthrough to complete your submission smoothly."
        primaryAction={{ label: "How to Apply", to: "/admissions/how-to-apply" }}
        secondaryAction={{ label: "View Fee Structure", to: "/admissions/fees-scholarships" }}
      />
    </main>
  );
}
