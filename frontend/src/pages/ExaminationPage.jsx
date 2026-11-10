import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PageHero from "../components/common/PageHero";
import PageContainer from "../components/common/PageContainer";
import SectionHeading from "../components/common/SectionHeading";
import CTASection from "../components/common/CTASection";
import { api } from "../services/api";

const NEB_EXAM_PORTAL = "https://www.neb.gov.np/";
const NEB_NOTICES = "https://www.neb.gov.np/notices";

const EXAM_NOTICES = [
  {
    id: 1,
    title:
      "NEB Grade 12 Annual Board Examination Routine 2083 Published",
    category: "schedule",
    categoryLabel: "Exam Routine",
    date: "29 October 2026",
    dateISO: "2026-10-29",
    description:
      "National Examinations Board (NEB) comprehensive board routine for +2 Science, Management, Humanities, and Law.",
    url: "https://www.neb.gov.np/notices",
  },
  {
    id: 2,
    title:
      "Registration & Board Examination Form Notice for Grade 11 & 12",
    category: "forms",
    categoryLabel: "Exam Form",
    date: "27 October 2026",
    dateISO: "2026-10-27",
    description:
      "Official registration form submission deadlines and bank voucher verification guidelines issued by NEB Sanothimi.",
    url: "https://www.neb.gov.np/notices",
  },
  {
    id: 3,
    title:
      "NEB Grade 12 Annual Board Examination Grade-Sheet Release",
    category: "results",
    categoryLabel: "Results",
    date: "6 October 2026",
    dateISO: "2026-10-06",
    description:
      "Official score releases and grade ledger published by the National Examinations Board for recent annual cohorts.",
    url: "https://neb.ntc.net.np",
  },
];

const EXAM_CATEGORIES = [
  { label: "All updates", value: "all" },
  { label: "Exam routines", value: "schedule" },
  { label: "Exam forms", value: "forms" },
  { label: "Results", value: "results" },
];

const EXAM_HUBS = [
  {
    number: "01",
    title: "Examination Routines",
    description:
      "Find complete examination schedules, revised timetables, and stream-specific routines for NEB Grade 11 & 12 boards.",
    action: "View Routines & Timetables",
    link: "/examinations/routines",
    isExternal: false,
  },
  {
    number: "02",
    title: "Examination Forms",
    description:
      "Check form application deadlines, regular and double-fee submission dates, bank voucher details, and eligibility criteria.",
    action: "Access Form Guidelines",
    link: "/examinations/forms",
    isExternal: false,
  },
  {
    number: "03",
    title: "Centres & Seat Plans",
    description:
      "Check official examination centre allocations, campus block distributions (Block B & C), and roll-number seating charts.",
    action: "Check Seat Plans",
    link: "/examinations/centres-seat-plans",
    isExternal: false,
  },
  {
    number: "04",
    title: "Results & Transcripts",
    description:
      "Direct portal lookup for published university examination results, marksheet verifications, and retotaling instructions.",
    action: "Check Published Results",
    link: "/examinations/results",
    isExternal: false,
  },
  {
    number: "05",
    title: "Examination Guidelines",
    description:
      "Review the mandatory code of conduct, entrance rules, prohibited digital items, and CCTV-monitored examination hall integrity protocols.",
    action: "Read Examinee Guidelines",
    link: "/examinations/guidelines",
    isExternal: false,
  },
  {
    number: "06",
    title: "NEB Official Exam Portal",
    description:
      "Access the central National Examinations Board (Sanothimi, Bhaktapur) digital portal for board routines and announcements.",
    action: "Visit NEB Board Portal",
    link: NEB_EXAM_PORTAL,
    isExternal: true,
  },
];

const EXAM_PREPARATION = [
  "Check that the notice applies to your exact programme, semester, and academic batch.",
  "Download and print the latest revised routine before scheduling travel or reporting.",
  "Confirm your exam form submission, registration status, and bank fee voucher clearance.",
  "Check your designated examination centre, building block, and seat plan in advance.",
  "Keep your original NEB admit card and College Identity Card readily available.",
];

const FAQS = [
  {
    question: "Where can I find the latest examination routine?",
    answer:
      "For board examinations, browse our dedicated Examination Routines page or check the official National Examinations Board website. Always check for revised routines before relying on an earlier schedule.",
  },
  {
    question: "Where do I submit my examination form?",
    answer:
      "Follow the instructions on our Forms & Deadlines page. For affiliated programmes, physical form verification and submission take place at the Khwopa College Examination Desk (Block B).",
  },
  {
    question: "How are examination centres and seating arrangements announced?",
    answer:
      "University examination centres are published 7-10 days before exams. Seating plans for candidates sitting at Khwopa College (Centre Code 104) are published on our Centres & Seat Plans page and posted on physical bulletin boards.",
  },
  {
    question: "Where are examination results published?",
    answer:
      "NEB publishes examination results through its official telecom and board portals (neb.ntc.net.np). You can quickly navigate to verified links via our Results page.",
  },
  {
    question: "What should I do if my name or subject details are incorrect on the admit card?",
    answer:
      "Immediately contact the Khwopa College Examination Administration desk with your original admission receipt and university registration card to submit an urgent correction requisition.",
  },
];

function ExamNoticeCard({ notice }) {
  const badgeStyles = {
    schedule: "bg-blue-50 text-blue-800 border-blue-200",
    forms: "bg-amber-50 text-amber-800 border-amber-200",
    results: "bg-emerald-50 text-emerald-800 border-emerald-200",
  };

  return (
    <article className="flex h-full flex-col rounded-2xl border border-[#e5ddce] bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#b99754] hover:shadow-[0_15px_35px_rgba(16,36,59,0.07)]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span
          className={`rounded-md border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
            badgeStyles[notice.category] || "bg-slate-50 text-slate-800 border-slate-200"
          }`}
        >
          {notice.categoryLabel}
        </span>

        <span className="text-xs text-slate-400">
          {notice.date}
        </span>
      </div>

      <h3 className="mt-5 font-serif text-xl font-bold leading-snug text-[#12243a]">
        {notice.title}
      </h3>

      <p className="editorial-copy mt-3 flex-1 text-sm leading-relaxed text-[#475365]">
        {notice.description}
      </p>

      <div className="mt-6 border-t border-[#eee9df] pt-4">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          Source: National Examinations Board (NEB)
        </p>

        <a
          href={notice.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8c6d37] transition hover:gap-2.5 hover:text-[#10243b]"
        >
          View official notification <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  );
}

function FaqItem({ item, isOpen, onClick }) {
  return (
    <div className="border-b border-[#e5ddce] last:border-0">
      <button
        type="button"
        onClick={onClick}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-5 py-5 text-left transition hover:text-[#8c6d37]"
      >
        <span className="font-serif text-base font-bold text-[#12243a] sm:text-lg">
          {item.question}
        </span>

        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold transition ${
            isOpen
              ? "rotate-45 bg-[#0b2038] text-[#dfbd77]"
              : "bg-[#f5f0e5] text-[#8c6d37]"
          }`}
        >
          +
        </span>
      </button>

      {isOpen && (
        <div className="pb-6 pr-6 sm:pr-10">
          <p className="editorial-copy text-sm leading-7 text-[#475365] sm:text-[15px]">
            {item.answer}
          </p>
        </div>
      )}
    </div>
  );
}

export default function ExaminationPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [openFaq, setOpenFaq] = useState(0);

  // Fetch dynamic notices categorized under 'Examination'
  const { data: noticesData } = useQuery({
    queryKey: ['notices'],
    queryFn: () => api.getNotices(),
    staleTime: 60000,
    retry: 1
  });

  const combinedNotices = useMemo(() => {
    const liveNotices = (noticesData?.data || [])
      .filter(n => n.category?.toLowerCase() === 'examination' || n.category?.toLowerCase() === 'general')
      .map(n => ({
        id: n._id,
        title: n.title,
        category: "schedule",
        categoryLabel: n.category,
        date: new Date(n.publishedAt || n.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
        dateISO: new Date(n.publishedAt || n.createdAt).toISOString(),
        description: n.content,
        url: "/notices"
      }));
    return [...liveNotices, ...EXAM_NOTICES];
  }, [noticesData]);

  const filteredNotices = useMemo(() => {
    return combinedNotices.filter((notice) => {
      const matchesCategory =
        activeCategory === "all" || notice.category === activeCategory;

      const term = search.trim().toLowerCase();
      const matchesSearch =
        !term ||
        `${notice.title} ${notice.description} ${notice.categoryLabel}`
          .toLowerCase()
          .includes(term);

      return matchesCategory && matchesSearch;
    });
  }, [combinedNotices, activeCategory, search]);

  return (
    <main className="min-h-screen bg-[#f7f5f0] text-[#17283c]">
      {/* HERO SECTION MATCHING ABOUT PAGE HERO EXACTLY */}
      <PageHero
        eyebrow="Academic Examination Centre | Khwopa College"
        title="Stay Prepared."
        italicTitle="Stay Informed."
        description="Comprehensive examination management hub for Khwopa College students. Access verified board schedules, registration forms, hall seating distributions, and university result records."
        breadcrumbs={[
          { label: "Academics", to: "/academics" },
          { label: "Examination Centre" },
        ]}
        stats={[
          { label: "Centre Code", value: "104 Khwopa" },
          { label: "Governing Board", value: "NEB Sanothimi" },
          { label: "Examination Halls", value: "Blocks B & C" },
        ]}
      />

      {/* ADVISORY BANNER */}
      <section className="mx-auto max-w-[1380px] px-5 pt-12 sm:px-8 md:pt-16">
        <div className="rounded-2xl border border-[#e5ddce] bg-[#fbfaf7] p-6 sm:p-8 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0b2038] text-base font-bold text-[#dfbd77]">
              !
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#92703b]">
                Mandatory Candidate Advisory
              </p>
              <h2 className="mt-1 font-serif text-2xl font-bold text-[#12243a]">
                Always verify the latest revised examination announcements.
              </h2>
              <p className="editorial-copy mt-2 max-w-4xl text-sm leading-7 text-[#475365]">
                Khwopa Secondary School higher secondary programmes are officially affiliated with the National Examinations Board (NEB). 
                Dates, paper codes, and centres are subject to board notifications. Always verify whether a routine applies to regular, partial, or supplementary candidates before reporting to the examination venue.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COMPREHENSIVE EXAMINATION HUBS SECTION */}
      <section id="examination-hubs" className="scroll-mt-12 py-16 sm:py-24">
        <PageContainer>
          <SectionHeading
            eyebrow="Central Examination Directory"
            title="Complete Examination Hubs"
            italicTitle="& Dedicated Resources."
            description="Direct access to verified examination schedules, registration paperwork, venue arrangements, and official result portals."
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {EXAM_HUBS.map((hub) => (
              <article
                key={hub.number}
                className="group flex flex-col justify-between rounded-2xl border border-[#e5ddce] bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-[#b99754] hover:shadow-[0_15px_35px_rgba(16,36,59,0.06)]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-3xl font-bold text-[#b99754]">
                      {hub.number}
                    </span>
                    <span className="text-xl text-[#a98545] transition group-hover:translate-x-1">
                      {hub.isExternal ? "↗" : "→"}
                    </span>
                  </div>

                  <h3 className="mt-6 font-serif text-2xl font-bold text-[#12243a]">
                    {hub.title}
                  </h3>

                  <p className="editorial-copy mt-3 text-sm leading-7 text-[#475365]">
                    {hub.description}
                  </p>
                </div>

                <div className="mt-8 border-t border-[#eee9df] pt-5">
                  {hub.isExternal ? (
                    <a
                      href={hub.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#8c6d37] transition hover:text-[#10243b]"
                    >
                      {hub.action} <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    <Link
                      to={hub.link}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#8c6d37] transition hover:text-[#10243b]"
                    >
                      {hub.action} <span aria-hidden="true">→</span>
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* RECENT NOTICES SECTION */}
      <section id="recent-updates" className="scroll-mt-12 bg-[#f0ede5] py-16 sm:py-24">
        <PageContainer>
          <SectionHeading
            eyebrow="University Examination Updates"
            title="Recent Examination Notices"
            italicTitle="& Office Releases."
            description="Selected notices published by the National Examinations Board (NEB), Sanothimi, Bhaktapur."
          />

          {/* Search & Category Filter */}
          <div className="mb-10 rounded-2xl border border-[#e5ddce] bg-white p-6 shadow-sm">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search exam routines, form notifications, or results..."
              className="w-full rounded-xl border border-[#e5ddce] bg-[#fbfaf7] px-4 py-3.5 text-sm text-[#12243a] outline-none transition placeholder:text-slate-400 focus:border-[#b99754] focus:ring-2 focus:ring-[#b99754]/15"
            />

            <div className="mt-4 flex flex-wrap gap-2">
              {EXAM_CATEGORIES.map((cat) => {
                const isSelected = activeCategory === cat.value;
                return (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => setActiveCategory(cat.value)}
                    className={`rounded-lg px-4 py-2 text-xs font-semibold transition ${
                      isSelected
                        ? "bg-[#0b2038] text-white"
                        : "border border-[#e5ddce] bg-white text-[#475365] hover:border-[#b99754] hover:text-[#12243a]"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notice Grid */}
          {filteredNotices.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredNotices.map((notice) => (
                <ExamNoticeCard key={notice.id} notice={notice} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-[#d8d0c1] bg-white p-12 text-center">
              <h3 className="font-serif text-2xl font-bold text-[#12243a]">
                No matching notices found
              </h3>
              <p className="editorial-copy mt-2 text-sm text-slate-500">
                Try searching with different keywords or switch categories.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setActiveCategory("all");
                }}
                className="mt-5 rounded-xl bg-[#0b2038] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#1c3857]"
              >
                Clear Filters
              </button>
            </div>
          )}

          <div className="mt-10 text-center">
            <a
              href={NEB_NOTICES}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-[#0b2038] bg-white px-7 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#0b2038] transition hover:bg-[#0b2038] hover:text-white"
            >
              Browse All NEB Examination Notices ↗
            </a>
          </div>
        </PageContainer>
      </section>

      {/* CANDIDATE CHECKLIST */}
      <section className="py-16 sm:py-24">
        <PageContainer>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Student Examination Protocol"
                title="Essential Pre-Exam Checklist"
                italicTitle="for Every Candidate."
                description="Make sure you have satisfied every university and college requirement prior to entering the examination hall."
              />

              <p className="editorial-copy text-sm leading-8 text-[#475365]">
                Candidate protocols are strictly monitored under University regulations. Discrepancies in subject codes or admit cards must be brought to the administration desk immediately.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/examinations/guidelines"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#0b2038] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[#1a3858]"
                >
                  Read Code of Conduct →
                </Link>
                <Link
                  to="/examinations/centres-seat-plans"
                  className="inline-flex items-center gap-2 rounded-xl border border-[#e5ddce] bg-white px-6 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-[#12243a] transition hover:border-[#b99754]"
                >
                  Check Seating Plans →
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-[#e5ddce] bg-white p-7 sm:p-9 shadow-sm">
              <h3 className="font-serif text-2xl font-bold text-[#12243a]">
                Candidate Verification Checklist
              </h3>

              <div className="mt-6 space-y-4">
                {EXAM_PREPARATION.map((item, index) => (
                  <div key={item} className="flex items-start gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f5f0e5] font-serif text-xs font-bold text-[#a98545]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="editorial-copy pt-1 text-sm leading-relaxed text-[#475365]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* FAQS */}
      <section className="bg-[#f0ede5] py-16 sm:py-24">
        <PageContainer>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <SectionHeading
                eyebrow="Student Support"
                title="Examination Queries"
                italicTitle="& Frequently Asked Questions."
                description="Common procedural guidelines regarding examinations, admit card issues, centre assignments, and result publication."
              />

              <div className="rounded-2xl border border-[#e5ddce] bg-white p-6 sm:p-8 shadow-sm">
                <h3 className="font-serif text-xl font-bold text-[#12243a]">
                  Have an urgent question?
                </h3>
                <p className="editorial-copy mt-2 text-sm leading-relaxed text-[#475365]">
                  The Khwopa College Examination Administration desk is open Sunday through Friday from 6:30 AM to 4:00 PM in Block B.
                </p>
                <Link
                  to="/contact"
                  className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#8c6d37] transition hover:text-[#10243b]"
                >
                  Contact College Desk →
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-[#e5ddce] bg-white px-6 sm:px-8 shadow-sm">
              {FAQS.map((item, index) => (
                <FaqItem
                  key={item.question}
                  item={item}
                  isOpen={openFaq === index}
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                />
              ))}
            </div>
          </div>
        </PageContainer>
      </section>

      {/* CTA SECTION */}
      <CTASection
        title="Need Specific Examination Timetables or Forms?"
        description="Jump straight to routines, application forms, or hall seating plans for your respective academic batch."
        primaryAction={{ label: "View Routines", to: "/examinations/routines" }}
        secondaryAction={{ label: "Download Forms", to: "/examinations/forms" }}
      />
    </main>
  );
}
