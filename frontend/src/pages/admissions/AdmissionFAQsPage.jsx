import { useState, useMemo } from "react";
import PageHero from "../../components/common/PageHero";
import PageContainer from "../../components/common/PageContainer";
import SectionHeading from "../../components/common/SectionHeading";
import SearchBar from "../../components/common/SearchBar";
import FilterBar from "../../components/common/FilterBar";
import EmptyState from "../../components/common/EmptyState";
import CTASection from "../../components/common/CTASection";
import { admissionsData } from "../../data/admissionsData";

export default function AdmissionFAQsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [openIndex, setOpenIndex] = useState(0);

  const categories = ["All", "Eligibility", "Admission Process", "Scholarships", "Documents", "Fees"];

  const filteredFaqs = useMemo(() => {
    return admissionsData.faqs.filter((faq) => {
      const matchesSearch =
        faq.question.toLowerCase().includes(search.toLowerCase()) ||
        faq.answer.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        activeCategory === "All" || faq.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  return (
    <main className="bg-[#f7f5f0] min-h-screen">
      <PageHero
        eyebrow="Admissions Office"
        title="Admission FAQs."
        italicTitle="Answers to Common Queries."
        description="Frequently asked queries regarding entrance criteria, quota seatings, documents, tuition payments and municipal scholarships."
        breadcrumbs={[
          { label: "Admissions", to: "/admissions" },
          { label: "FAQs" }
        ]}
        stats={[
          { label: "Helpdesk", value: "Dekocha Desk" },
          { label: "Phone Helpline", value: "+977-1-6614336" },
          { label: "Email Support", value: "info@khwopacollege.edu.np" }
        ]}
      />

      <section className="py-16 sm:py-24">
        <PageContainer className="max-w-4xl">
          <SectionHeading
            eyebrow="Helpdesk Directory"
            title="Everything You Need to Know"
            italicTitle="about Admissions at Khwopa."
            description="Quick answers to clarify admissions, quotas, eligibility and student enrollment."
          />

          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#e5ddce] pb-6">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search frequently asked questions..."
              className="w-full sm:max-w-md"
            />
            <FilterBar
              options={categories}
              activeOption={activeCategory}
              onChange={setActiveCategory}
            />
          </div>

          {filteredFaqs.length === 0 ? (
            <EmptyState
              title="No answers found"
              description="No FAQ matched your query or category. You can clear your search or send an enquiry directly."
              onReset={() => {
                setSearch("");
                setActiveCategory("All");
              }}
            />
          ) : (
            <div className="space-y-4">
              {filteredFaqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div
                    key={idx}
                    className="overflow-hidden rounded-2xl border border-[#e5ddce] bg-white transition hover:border-[#b99754]"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="flex w-full items-center justify-between p-6 text-left"
                    >
                      <div className="pr-4">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#92703b]">
                          {faq.category}
                        </span>
                        <h3 className="mt-1 font-serif text-lg sm:text-xl font-bold text-[#12243a]">
                          {faq.question}
                        </h3>
                      </div>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#fbfaf7] text-slate-500">
                        <svg
                          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180 text-[#92703b]" : ""}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </button>

                    {isOpen && (
                      <div className="border-t border-[#e5ddce] bg-[#fbfaf7] p-6 text-xs sm:text-sm leading-relaxed text-[#475365]">
                        <p className="editorial-copy text-sm sm:text-[15px] leading-7">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </PageContainer>
      </section>

      <CTASection
        title="Still Need Clarification on Any Point?"
        description="Our admission counsellors are glad to assist you in person or through an online enquiry."
        primaryAction={{ label: "Send an Online Enquiry", to: "/contact/enquiry" }}
        secondaryAction={{ label: "Campus Location", to: "/contact/location" }}
      />
    </main>
  );
}
