import { useState } from "react";
import PageHero from "../../components/common/PageHero";
import PageContainer from "../../components/common/PageContainer";
import SectionHeading from "../../components/common/SectionHeading";
import CTASection from "../../components/common/CTASection";
import { examinationsData } from "../../data/examinationsData";

export default function ExaminationFormsPage() {
  const [downloadMsg, setDownloadMsg] = useState("");

  const handleDownload = (title) => {
    setDownloadMsg(`Downloading template for "${title}"...`);
    setTimeout(() => setDownloadMsg(""), 4000);
  };

  return (
    <main className="bg-[#f7f5f0] min-h-screen">
      <PageHero
        eyebrow="Examination Section"
        title="Forms & Deadlines."
        italicTitle="Registration & Processing."
        description="Official NEB Grade 11 & 12 examination registration forms, regular and late fee deadlines, bank voucher guidelines and board submission instructions."
        breadcrumbs={[
          { label: "Examinations", to: "/examinations" },
          { label: "Forms & Deadlines" }
        ]}
        stats={[
          { label: "Current Intake", value: "2082 / 2083" },
          { label: "Verification Desk", value: "Block B" },
          { label: "Submission", value: "Physical Desk" }
        ]}
      />

      <section className="py-16 sm:py-24">
        <PageContainer>
          <SectionHeading
            eyebrow="Registration Deadlines"
            title="Active Examination Forms"
            italicTitle="& Processing Guidelines."
            description="Complete and verify your examination forms before the scheduled deadline to avoid late submission penalties."
          />

          {downloadMsg && (
            <div className="mb-6 rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-xs font-semibold text-emerald-800">
              {downloadMsg}
            </div>
          )}

          <div className="space-y-6">
            {examinationsData.forms.map((form) => (
              <div
                key={form.id}
                className="rounded-2xl border border-[#e5ddce] bg-white p-7 sm:p-9 shadow-sm transition hover:border-[#b99754]"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-[#e5ddce] pb-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#92703b]">
                      {form.programme} · {form.level}
                    </span>
                    <h3 className="mt-1 font-serif text-2xl font-bold text-[#12243a]">
                      {form.title}
                    </h3>
                  </div>
                  <span className="text-xs text-slate-500">
                    Published: {form.publishedDate}
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 rounded-xl bg-[#fbfaf7] border border-[#e5ddce] p-5 text-xs">
                  <div>
                    <p className="text-slate-500">Regular Deadline</p>
                    <p className="mt-0.5 font-bold text-[#12243a] text-sm">{form.deadlineRegular}</p>
                    <p className="mt-0.5 text-[#92703b]">Fee: {form.feeRegular}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Late Deadline</p>
                    <p className="mt-0.5 font-bold text-rose-700 text-sm">{form.deadlineLate}</p>
                    <p className="mt-0.5 text-rose-600">Fee: {form.feeLate}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Format</p>
                    <p className="mt-0.5 font-bold text-[#12243a] text-sm">{form.fileType} ({form.fileSize})</p>
                  </div>
                  <div className="flex items-center sm:justify-end">
                    <button
                      type="button"
                      onClick={() => handleDownload(form.title)}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-[#0b2038] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#17334c]"
                    >
                      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      <span>Download Form</span>
                    </button>
                  </div>
                </div>

                <div className="editorial-copy mt-5 text-xs sm:text-sm leading-relaxed text-[#475365]">
                  <span className="font-bold text-[#12243a] font-serif not-italic">Instructions: </span>
                  {form.instructions}
                </div>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      <CTASection
        title="Need to Check Examination Guidelines or Seat Plans?"
        description="Review code of conduct rules, calculators permitted, and designated examination hall allocations."
        primaryAction={{ label: "Exam Guidelines", to: "/examinations/guidelines" }}
        secondaryAction={{ label: "Centres & Seat Plans", to: "/examinations/centres-seat-plans" }}
      />
    </main>
  );
}
