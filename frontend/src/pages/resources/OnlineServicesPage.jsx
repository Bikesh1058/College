import PageHero from "../../components/common/PageHero";
import PageContainer from "../../components/common/PageContainer";
import SectionHeading from "../../components/common/SectionHeading";
import CTASection from "../../components/common/CTASection";
import { resourcesData } from "../../data/resourcesData";

export default function OnlineServicesPage() {
  return (
    <main className="bg-[#f7f5f0] min-h-screen">
      <PageHero
        eyebrow="Student Resources"
        title="Online Portals & Services."
        italicTitle="Digital Academic Gateways."
        description="Direct external links to official university examination portals, NEB circulars, e-library repositories, and college digital portals."
        breadcrumbs={[
          { label: "Resources", to: "/resources" },
          { label: "Online Services" }
        ]}
        stats={[
          { label: "Gateways", value: "NEB & Sanothimi" },
          { label: "Accreditation", value: "UGC Nepal" },
          { label: "Accessibility", value: "24/7 Web" }
        ]}
      />

      <section className="py-16 sm:py-24">
        <PageContainer>
          <SectionHeading
            eyebrow="Digital Gateways"
            title="External Academic Portals"
            italicTitle="& Examination Services."
            description="Verified official links for student registration, examination forms, syllabus archives, and national scholarships."
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {resourcesData.onlineServices.map((srv, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between rounded-2xl border border-[#e5ddce] bg-white p-8 shadow-sm transition hover:border-[#b99754]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-[#dfbd77]/20 px-2.5 py-0.5 text-xs font-bold text-[#92703b]">
                      {srv.category}
                    </span>
                    <span className="text-[11px] text-slate-400">External Gateway</span>
                  </div>

                  <h3 className="mt-4 font-serif text-2xl font-bold text-[#12243a]">
                    {srv.title}
                  </h3>

                  <p className="editorial-copy mt-2 text-xs sm:text-sm leading-relaxed text-[#475365]">
                    {srv.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-slate-100 pt-5 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono truncate max-w-[200px]">
                    {srv.url}
                  </span>
                  <a
                    href={srv.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-[#0b2038] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#17334c]"
                  >
                    <span>Launch Portal</span>
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      <CTASection
        title="Need Technical Help with Portals or Result Lookups?"
        description="Our IT assistance desk can help you resolve registration and admit card issues."
        primaryAction={{ label: "Contact College Desk", to: "/contact" }}
        secondaryAction={{ label: "Check Results", to: "/results" }}
      />
    </main>
  );
}
