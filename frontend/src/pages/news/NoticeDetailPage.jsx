import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PageHero from "../../components/common/PageHero";
import PageContainer from "../../components/common/PageContainer";
import CTASection from "../../components/common/CTASection";
import { api } from "../../services/api";

export default function NoticeDetailPage() {
  const { slug } = useParams();

  const { data: noticesResponse } = useQuery({
    queryKey: ["notices"],
    queryFn: () => api.getNotices(),
    staleTime: 60000,
    retry: 1,
  });

  const liveNotice = (noticesResponse?.data || []).find(
    (n) => n.slug === slug || n._id === slug
  );

  const formattedTitle = liveNotice?.title
    ? liveNotice.title
    : slug
    ? slug
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
    : "Official Circular";

  const categoryLabel = liveNotice?.category || "Official Notification";
  const publishedDate = liveNotice?.publishedAt
    ? new Date(liveNotice.publishedAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Department of Academic Administration";

  return (
    <main className="bg-[#f7f5f0] min-h-screen">
      <PageHero
        eyebrow={`Notice Board — ${categoryLabel}`}
        title={formattedTitle}
        italicTitle="Official College Notice."
        description="Official circular and announcement published by the Department of Academic Administration."
        breadcrumbs={[
          { label: "Notices", to: "/notices" },
          { label: formattedTitle }
        ]}
        stats={[
          { label: "Authorized", value: "Principal's Office" },
          { label: "Category", value: categoryLabel },
          { label: "Campus", value: "Dekocha, Bhaktapur" }
        ]}
      />

      <section className="py-16 sm:py-24">
        <PageContainer className="max-w-4xl">
          <div className="rounded-2xl border border-[#e5ddce] bg-white p-8 sm:p-12 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#e5ddce] pb-4">
              <span className="rounded-md bg-[#dfbd77]/20 px-3 py-1 font-serif text-xs font-bold text-[#92703b]">
                {categoryLabel}
              </span>
              <span className="text-xs text-slate-400">
                {publishedDate}
              </span>
            </div>

            <h2 className="mt-6 font-serif text-3xl font-bold text-[#12243a]">
              {formattedTitle}
            </h2>

            <div className="mt-6 space-y-4 text-sm sm:text-base leading-relaxed text-[#475365]">
              {liveNotice?.content ? (
                liveNotice.content
                  .split("\n")
                  .filter(Boolean)
                  .map((para, idx) => (
                    <p key={idx} className="editorial-copy text-[15px] sm:text-base leading-8">
                      {para}
                    </p>
                  ))
              ) : (
                <>
                  <p className="editorial-copy text-[15px] sm:text-base leading-8">
                    All concerned students, faculty members, and administrative staff are hereby notified regarding the official circular above. Please review all scheduled dates, eligibility criteria, and compliance steps carefully.
                  </p>
                  <p className="editorial-copy text-[15px] sm:text-base leading-8">
                    Original stamped documentation, registration forms, and examination guidelines can also be verified physically at the college administration desk at Dekocha, Bhaktapur.
                  </p>
                </>
              )}
            </div>

            <div className="mt-8 rounded-xl bg-[#fbfaf7] border border-[#e5ddce] p-6">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#12243a]">
                Attachment / Related Document:
              </h4>
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <span className="text-xs sm:text-sm text-[#475365] font-medium">
                  {slug}-official-notice.pdf (340 KB)
                </span>
                <a
                  href="https://www.neb.gov.np"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#0b2038] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#17334c]"
                >
                  <span>Download Circular</span>
                </a>
              </div>
            </div>

            <div className="mt-12 border-t border-slate-100 pt-6 flex justify-between items-center">
              <Link
                to="/notices"
                className="text-xs font-bold text-[#12243a] hover:text-[#92703b]"
              >
                ← Back to All Notices
              </Link>
              <Link
                to="/examinations"
                className="text-xs font-bold text-[#92703b] hover:underline"
              >
                Examinations Hub →
              </Link>
            </div>
          </div>
        </PageContainer>
      </section>

      <CTASection
        title="Check Examination Updates & Results"
        description="Verify recent timetables, seat plans, and published marks."
        primaryAction={{ label: "Examinations Hub", to: "/examinations" }}
        secondaryAction={{ label: "View Results", to: "/results" }}
      />
    </main>
  );
}
