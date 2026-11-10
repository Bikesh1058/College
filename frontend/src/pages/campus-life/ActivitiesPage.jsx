import PageHero from "../../components/common/PageHero";
import PageContainer from "../../components/common/PageContainer";
import SectionHeading from "../../components/common/SectionHeading";
import CTASection from "../../components/common/CTASection";
import { campusLifeData } from "../../data/campusLifeData";

export default function ActivitiesPage() {
  return (
    <main className="bg-[#f7f5f0] min-h-screen">
      <PageHero
        eyebrow="Campus Life"
        title="Activities & Fieldwork."
        italicTitle="Experiential Community Learning."
        description="Rural social work immersions, science exhibitions, industrial observational visits, and local heritage documentation in Bhaktapur."
        breadcrumbs={[
          { label: "Campus Life", to: "/campus-life" },
          { label: "Student Activities" }
        ]}
        stats={[
          { label: "Community Camp", value: "10 Days Annual" },
          { label: "Science Expo", value: "60+ Prototypes" },
          { label: "Heritage Walks", value: "Bi-Monthly" }
        ]}
      />

      <section className="py-16 sm:py-24">
        <PageContainer>
          <SectionHeading
            eyebrow="Hands-on Engagement"
            title="Field Immersions"
            italicTitle="& Practical Discovery."
            description="Education at Khwopa is rooted in direct engagement with local communities, production industries, and historic heritage environments."
          />

          <div className="space-y-12">
            {campusLifeData.activities.map((act, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 gap-8 lg:grid-cols-12 rounded-2xl border border-[#e5ddce] bg-white p-7 sm:p-9 shadow-sm transition hover:border-[#b99754]"
              >
                <div className="lg:col-span-5 overflow-hidden rounded-xl bg-slate-100">
                  <img
                    src={act.image}
                    alt={act.title}
                    className="h-60 sm:h-72 w-full object-cover transition duration-300 hover:scale-105"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://www.cijnepal.org/wp-content/uploads/2018/09/11.jpg";
                    }}
                  />
                </div>

                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="rounded-md bg-[#dfbd77]/20 px-2.5 py-0.5 text-xs font-bold text-[#92703b]">
                        {act.category}
                      </span>
                      <span className="text-xs text-slate-400">
                        Frequency: {act.frequency}
                      </span>
                    </div>

                    <h3 className="mt-3 font-serif text-2xl font-bold text-[#12243a]">
                      {act.title}
                    </h3>

                    <p className="editorial-copy mt-3 text-[15px] leading-7 text-[#475365]">
                      {act.description}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-slate-100 pt-4 text-xs text-slate-500">
                    Students receive supervised academic credits and experiential learning certification upon successful completion of field assignments.
                  </div>
                </div>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      <CTASection
        title="Discover Social Work & Scientific Fieldwork"
        description="Learn how curriculum requirements translate into tangible community impact."
        primaryAction={{ label: "Humanities & Social Sciences", to: "/academics/programmes/plus-two-humanities" }}
        secondaryAction={{ label: "Explore Clubs", to: "/campus-life/clubs" }}
      />
    </main>
  );
}
