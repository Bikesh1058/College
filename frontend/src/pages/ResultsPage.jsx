import { useMemo, useState } from "react";
import PageHero from "../components/common/PageHero";
import PageContainer from "../components/common/PageContainer";
import SectionHeading from "../components/common/SectionHeading";
import CTASection from "../components/common/CTASection";

const RESULT_PORTAL = "https://neb.ntc.net.np/";
const NEB_NOTICES = "https://www.neb.gov.np/notices";

const programmes = [
  "+2 Science (Grade 12)",
  "+2 Science (Grade 11)",
  "+2 Management (Grade 12)",
  "+2 Management (Grade 11)",
  "+2 Humanities (Grade 12)",
  "+2 Humanities (Grade 11)",
  "+2 Law (Grade 12)",
  "+2 Law (Grade 11)",
];

const resultNotices = [
  {
    id: 1,
    programme: "+2 Science",
    title: "NEB Grade 12 Annual Board Examination Result 2083",
    type: "National Board Result",
    date: "24 September 2026",
    category: "Grade 12 Regular / Partial",
    url: "https://neb.ntc.net.np",
  },
  {
    id: 2,
    programme: "+2 Management",
    title: "NEB Grade 12 Management & Law Board Result 2083",
    type: "National Board Result",
    date: "6 October 2026",
    category: "Grade 12 Regular / Partial",
    url: "https://neb.ntc.net.np",
  },
];

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m16 16 5 5" strokeLinecap="round" />
    </svg>
  );
}

function ExternalLink() {
  return <span aria-hidden="true">↗</span>;
}

function ResultLookup() {
  const [rollNumber, setRollNumber] = useState("");
  const [programme, setProgramme] = useState("");
  const [examYear, setExamYear] = useState("");
  const [examType, setExamType] = useState("Regular");
  const [lookupMessage, setLookupMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!rollNumber.trim() || !programme || !examYear) {
      setLookupMessage("Please complete all required fields.");
      return;
    }

    setLookupMessage(
      "Your lookup query is formatted. Click 'Open NEB Result Portal' on the right to enter your verified symbol number directly into the National Examinations Board ledger."
    );
  }

  return (
    <section id="result-lookup" className="scroll-mt-12 py-16 sm:py-24">
      <PageContainer>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          {/* Lookup Form */}
          <div>
            <SectionHeading
              eyebrow="Student Result Query"
              title="Official Result Verification"
              italicTitle="& Marksheet Lookup."
              description="Prepare your examination details to query university board marks and published term records."
            />

            <div className="rounded-2xl border border-[#e5ddce] bg-white p-7 sm:p-9 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="result-programme"
                    className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#12243a]"
                  >
                    Academic Programme *
                  </label>
                  <select
                    id="result-programme"
                    required
                    value={programme}
                    onChange={(e) => {
                      setProgramme(e.target.value);
                      setLookupMessage("");
                    }}
                    className="w-full rounded-xl border border-[#e5ddce] bg-[#fbfaf7] px-4 py-3.5 text-sm text-[#12243a] outline-none transition focus:border-[#b99754] focus:ring-2 focus:ring-[#b99754]/15"
                  >
                    <option value="">Select your enrolled programme</option>
                    {programmes.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="result-roll"
                    className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#12243a]"
                  >
                    Roll / Symbol Number *
                  </label>
                  <input
                    id="result-roll"
                    type="text"
                    required
                    value={rollNumber}
                    onChange={(e) => {
                      setRollNumber(e.target.value);
                      setLookupMessage("");
                    }}
                    placeholder="e.g., 10400234 (8-digit Symbol No.)"
                    className="w-full rounded-xl border border-[#e5ddce] bg-[#fbfaf7] px-4 py-3.5 text-sm text-[#12243a] outline-none transition placeholder:text-slate-400 focus:border-[#b99754] focus:ring-2 focus:ring-[#b99754]/15"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="result-year"
                      className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#12243a]"
                    >
                      Examination Year *
                    </label>
                    <select
                      id="result-year"
                      required
                      value={examYear}
                      onChange={(e) => {
                        setExamYear(e.target.value);
                        setLookupMessage("");
                      }}
                      className="w-full rounded-xl border border-[#e5ddce] bg-[#fbfaf7] px-4 py-3.5 text-sm text-[#12243a] outline-none transition focus:border-[#b99754]"
                    >
                      <option value="">Select BS Year</option>
                      <option value="2083">2083 BS</option>
                      <option value="2082">2082 BS</option>
                      <option value="2081">2081 BS</option>
                      <option value="2080">2080 BS</option>
                      <option value="2079">2079 BS</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="result-type"
                      className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#12243a]"
                    >
                      Candidate Status
                    </label>
                    <select
                      id="result-type"
                      value={examType}
                      onChange={(e) => {
                        setExamType(e.target.value);
                        setLookupMessage("");
                      }}
                      className="w-full rounded-xl border border-[#e5ddce] bg-[#fbfaf7] px-4 py-3.5 text-sm text-[#12243a] outline-none transition focus:border-[#b99754]"
                    >
                      <option>Regular</option>
                      <option>Partial</option>
                      <option>Chance / Retake</option>
                      <option>Supplementary</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0b2038] px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[#1c3857]"
                >
                  <SearchIcon />
                  Format Result Query
                </button>

                {lookupMessage && (
                  <div className="rounded-xl border border-[#dfd4bd] bg-[#fbf8f1] p-4 text-xs leading-6 text-[#685b44]">
                    {lookupMessage}
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Official NEB Portal Card */}
          <aside className="relative overflow-hidden rounded-2xl bg-[#091b30] p-7 text-white shadow-sm sm:p-9">
            <div className="pointer-events-none absolute -right-20 -top-36 -z-10 h-[380px] w-[380px] rounded-full border border-[#dfbd77]/10" />
            <div className="pointer-events-none absolute -right-5 -top-20 -z-10 h-[240px] w-[240px] rounded-full border border-[#dfbd77]/10" />

            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-9 bg-[#b99754]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#dfbd77]">
                Official Central Portal
              </span>
            </div>

            <h3 className="font-serif text-3xl font-bold leading-tight text-white">
              Check Your Result via National Examinations Board.
            </h3>

            <p className="editorial-copy mt-4 text-sm leading-7 text-white/70">
              The National Examinations Board (NEB Sanothimi) maintains the centralized official database for all Grade 11 & 12 marksheets and GPA ledgers:
            </p>

            <div className="mt-8 border-t border-white/15 pt-6">
              <p className="text-[9px] uppercase tracking-[0.16em] text-white/50">
                Official Result Server
              </p>
              <p className="mt-1 font-serif text-lg font-bold text-[#dfbd77]">
                neb.ntc.net.np
              </p>
            </div>

            <div className="mt-8 space-y-3">
              <a
                href={RESULT_PORTAL}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#dfbd77] px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-[#091b30] transition hover:bg-[#edcf91]"
              >
                Open NEB Result Portal <ExternalLink />
              </a>

              <a
                href={NEB_NOTICES}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:border-[#dfbd77] hover:text-[#dfbd77]"
              >
                Browse NEB Result Notices <ExternalLink />
              </a>
            </div>
          </aside>
        </div>
      </PageContainer>
    </section>
  );
}

function RecentResults() {
  const [programmeFilter, setProgrammeFilter] = useState("All");

  const filteredResults = useMemo(() => {
    if (programmeFilter === "All") return resultNotices;
    return resultNotices.filter((n) => n.programme === programmeFilter);
  }, [programmeFilter]);

  return (
    <section className="bg-[#f0ede5] py-16 sm:py-24">
      <PageContainer>
        <SectionHeading
          eyebrow="Recent Releases"
          title="Published Board Results"
          italicTitle="& Score Notifications."
          description="Official score releases published by the National Examinations Board for recent annual higher secondary cohorts."
        />

        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#92703b]">
            Filter by Faculty / Discipline
          </span>
          <select
            value={programmeFilter}
            onChange={(e) => setProgrammeFilter(e.target.value)}
            className="rounded-xl border border-[#e5ddce] bg-white px-4 py-2.5 text-xs font-semibold text-[#12243a] outline-none focus:border-[#b99754]"
          >
            <option>All</option>
            <option>+2 Science</option>
            <option>+2 Management</option>
          </select>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {filteredResults.map((notice) => (
            <article
              key={notice.id}
              className="flex flex-col justify-between rounded-2xl border border-[#e5ddce] bg-white p-7 shadow-sm transition hover:border-[#b99754]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                    {notice.programme}
                  </span>
                  <span className="text-xs text-slate-400">{notice.date}</span>
                </div>

                <h3 className="mt-5 font-serif text-xl font-bold text-[#12243a]">
                  {notice.title}
                </h3>
                <p className="editorial-copy mt-2 text-sm text-[#475365]">
                  {notice.type} | {notice.category}
                </p>
              </div>

              <div className="mt-6 border-t border-[#eee9df] pt-4">
                <a
                  href={notice.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8c6d37] transition hover:text-[#10243b]"
                >
                  View official ledger notice <ExternalLink />
                </a>
              </div>
            </article>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}

function HowToCheckResults() {
  const steps = [
    {
      number: "01",
      title: "Open the Official Result Portal",
      description: "Navigate to the official NEB portal (neb.ntc.net.np or neb.gov.np).",
    },
    {
      number: "02",
      title: "Select Specific Examination Batch",
      description: "Select Grade 11 or Grade 12 and your exact examination academic year (e.g., 2083 BS).",
    },
    {
      number: "03",
      title: "Enter Roll or Symbol Number",
      description: "Input your 8-digit examination symbol number as listed on your official admit card.",
    },
    {
      number: "04",
      title: "Verify Marksheet & Collect Grade Ledger",
      description: "Review your individual subject marks and follow college EMIS desk guidelines for physical marksheets.",
    },
  ];

  return (
    <section className="py-16 sm:py-24">
      <PageContainer>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Verification Step-by-Step"
              title="How to Check Your Results"
              italicTitle="Through Official NEB Gateways."
              description="A systematic walkthrough to verify your grades, view pass/fail ledgers, and apply for retotaling if necessary."
            />

            <a
              href={RESULT_PORTAL}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#0b2038] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[#1a3858]"
            >
              Open NEB Result Server ↗
            </a>
          </div>

          <div className="space-y-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className="flex items-start gap-5 rounded-2xl border border-[#e5ddce] bg-white p-6 shadow-sm"
              >
                <span className="font-serif text-2xl font-bold text-[#b99754]">
                  {step.number}
                </span>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#12243a]">
                    {step.title}
                  </h3>
                  <p className="editorial-copy mt-1 text-sm text-[#475365]">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}

export default function ResultsPage() {
  return (
    <main className="min-h-screen bg-[#f7f5f0] text-[#17283c]">
      {/* HERO SECTION MATCHING ABOUT PAGE HERO EXACTLY */}
      <PageHero
        eyebrow="Academic Examination Results | Khwopa College"
        title="Your Hard Work."
        italicTitle="Your Achievement."
        description="Verify published examination results, access university ledgers, marksheet distribution schedules, and official retotaling announcements."
        breadcrumbs={[
          { label: "Academics", to: "/academics" },
          { label: "Examinations", to: "/examinations" },
          { label: "Results" },
        ]}
        stats={[
          { label: "Results Source", value: "NEB Sanothimi" },
          { label: "Ledger Desk", value: "EMIS Unit" },
          { label: "Retotaling Window", value: "35 Days" },
        ]}
      />

      {/* RESULT LOOKUP & PORTAL */}
      <ResultLookup />

      {/* RECENT RESULTS */}
      <RecentResults />

      {/* STEP-BY-STEP CHECK */}
      <HowToCheckResults />

      {/* CTA */}
      <CTASection
        title="Looking for Examination Schedules or Forms?"
        description="Check upcoming routines and deadline submission paperwork across our centralized examination directory."
        primaryAction={{ label: "View Routines", to: "/examinations/routines" }}
        secondaryAction={{ label: "Exam Guidelines", to: "/examinations/guidelines" }}
      />
    </main>
  );
}
