import { Link } from "react-router-dom";
import PageHero from "../../components/common/PageHero";
import PageContainer from "../../components/common/PageContainer";
import SectionHeading from "../../components/common/SectionHeading";
import CTASection from "../../components/common/CTASection";
import { researchData } from "../../data/researchData";

export default function ResearchPage() {
  return (
    <main className="bg-[#f7f5f0] min-h-screen">
      <PageHero
        eyebrow="Scholarly Inquiry"
        title="Research & Publications."
        italicTitle="Evidence-Based Knowledge."
        description="Fostering evidence-based investigation, faculty monographs, graduate dissertations, and municipal policy research under the Research Management Cell (RMC)."
        breadcrumbs={[{ label: "Research" }]}
        stats={[
          { label: "Research Unit", value: "RMC Cell" },
          { label: "Journal", value: "NepJOL Indexed" },
          { label: "Peer-Review", value: "Double-Blind" }
        ]}
      />

      <section className="py-16 sm:py-24">
        <PageContainer>
          <div className="rounded-2xl border border-[#e5ddce] bg-white p-8 sm:p-12 shadow-sm">
            <div className="max-w-3xl">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#92703b]">
                Institutional Incubator
              </span>
              <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-[#12243a]">
                {researchData.rmc.title}
              </h2>
              <p className="editorial-copy mt-4 text-[15px] sm:text-base leading-7 text-[#475365]">
                {researchData.rmc.overview}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/research/management-cell"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#0b2038] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#17334c]"
                >
                  <span>About the Cell & Guidelines</span>
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  to="/research/journal"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-[#e5ddce] bg-white px-5 py-2.5 text-xs font-semibold text-[#12243a] transition hover:border-[#b99754]"
                >
                  <span>Khwopa Journal (NepJOL)</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-14">
            <SectionHeading
              eyebrow="Divisions of Inquiry"
              title="Explore Scholarly Endeavors"
              italicTitle="at Khwopa."
              description="Discover completed municipal assessments, academic publications and national colloquiums."
            />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Link
                to="/research/activities"
                className="group rounded-2xl border border-[#e5ddce] bg-white p-7 shadow-sm transition hover:border-[#b99754] hover:shadow-md"
              >
                <span className="font-serif text-3xl text-[#dfbd77]">01</span>
                <h3 className="mt-3 font-serif text-xl font-bold text-[#12243a] group-hover:text-[#92703b] transition">
                  Research Activities
                </h3>
                <p className="editorial-copy mt-2 text-xs leading-relaxed text-[#475365]">
                  Ongoing and completed institutional grant projects, surveys, and scientific assessments.
                </p>
              </Link>

              <Link
                to="/research/publications"
                className="group rounded-2xl border border-[#e5ddce] bg-white p-7 shadow-sm transition hover:border-[#b99754] hover:shadow-md"
              >
                <span className="font-serif text-3xl text-[#dfbd77]">02</span>
                <h3 className="mt-3 font-serif text-xl font-bold text-[#12243a] group-hover:text-[#92703b] transition">
                  Faculty Publications
                </h3>
                <p className="editorial-copy mt-2 text-xs leading-relaxed text-[#475365]">
                  Peer-reviewed journal articles, policy briefs, and conference proceedings by professors.
                </p>
              </Link>

              <Link
                to="/research/journal"
                className="group rounded-2xl border border-[#e5ddce] bg-white p-7 shadow-sm transition hover:border-[#b99754] hover:shadow-md"
              >
                <span className="font-serif text-3xl text-[#dfbd77]">03</span>
                <h3 className="mt-3 font-serif text-xl font-bold text-[#12243a] group-hover:text-[#92703b] transition">
                  Khwopa Journal
                </h3>
                <p className="editorial-copy mt-2 text-xs leading-relaxed text-[#475365]">
                  Bi-annual multi-disciplinary peer-reviewed journal indexed on Nepal Journals Online (NepJOL).
                </p>
              </Link>

              <Link
                to="/research/conferences"
                className="group rounded-2xl border border-[#e5ddce] bg-white p-7 shadow-sm transition hover:border-[#b99754] hover:shadow-md"
              >
                <span className="font-serif text-3xl text-[#dfbd77]">04</span>
                <h3 className="mt-3 font-serif text-xl font-bold text-[#12243a] group-hover:text-[#92703b] transition">
                  Conferences & Seminars
                </h3>
                <p className="editorial-copy mt-2 text-xs leading-relaxed text-[#475365]">
                  National and regional academic colloquiums on economics, social transformation, and sciences.
                </p>
              </Link>
            </div>
          </div>
        </PageContainer>
      </section>

      <CTASection
        title="Submit a Manuscript to the Khwopa Journal"
        description="The editorial board invites original research papers, review articles, and book reviews from scholars worldwide."
        primaryAction={{ label: "View Call for Papers", to: "/research/journal" }}
        secondaryAction={{ label: "Research Activities", to: "/research/activities" }}
      />
    </main>
  );
}
