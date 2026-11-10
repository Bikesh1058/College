import { useParams, Link, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PageHero from "../../components/common/PageHero";
import PageContainer from "../../components/common/PageContainer";
import CTASection from "../../components/common/CTASection";
import { newsData } from "../../data/newsData";
import { api } from "../../services/api";

export default function NewsDetailPage() {
  const { slug } = useParams();

  const { data: remoteData, isLoading } = useQuery({
    queryKey: ["news"],
    queryFn: () => api.getNews(),
    staleTime: 60000,
    retry: 1,
  });

  const remoteArticles = (remoteData?.data || []).map((item) => ({
    ...item,
    author: item.author || "College Administration",
    content: Array.isArray(item.content)
      ? item.content
      : (item.content || item.excerpt || "").split("\n").filter(Boolean),
  }));

  const article =
    remoteArticles.find((a) => a.slug === slug || a._id === slug) ||
    newsData.find((a) => a.slug === slug);

  if (isLoading && !article) {
    return (
      <main className="bg-[#f7f5f0] min-h-screen py-24 text-center text-sm text-slate-500">
        Loading story...
      </main>
    );
  }

  if (!article) {
    return <Navigate to="/news" replace />;
  }

  return (
    <main className="bg-[#f7f5f0] min-h-screen">
      <PageHero
        eyebrow={`Campus News · ${article.category}`}
        title={article.title}
        italicTitle={`Published: ${article.date}`}
        description={`Official release authorized by ${article.author}.`}
        breadcrumbs={[
          { label: "News", to: "/news" },
          { label: article.title }
        ]}
        stats={[
          { label: "Category", value: article.category },
          { label: "Date", value: article.date },
          { label: "Author", value: article.author }
        ]}
      />

      <section className="py-16 sm:py-24">
        <PageContainer className="max-w-4xl">
          {/* Featured Image */}
          <div className="overflow-hidden rounded-2xl border border-[#e5ddce] bg-white shadow-sm">
            <img
              src={article.image}
              alt={article.title}
              className="h-72 sm:h-96 w-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://wms.edigitalnepal.com/wms/files/ws-post-images/1678958957817_007be5e2-a1dc-4580-9809-4964d79fa1a0.jpg";
              }}
            />
          </div>

          {/* Article Body */}
          <div className="mt-10 rounded-2xl border border-[#e5ddce] bg-white p-8 sm:p-12 shadow-sm">
            <div className="space-y-6 text-sm sm:text-base leading-relaxed text-[#475365]">
              {article.content.map((paragraph, idx) => (
                <p key={idx} className="editorial-copy text-[15px] sm:text-base leading-8">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-12 border-t border-slate-100 pt-6 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-slate-400">
                Official Release · Khwopa College Media Bureau
              </span>
              <Link
                to="/news"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#12243a] hover:text-[#92703b]"
              >
                <span>← Back to News Archive</span>
              </Link>
            </div>
          </div>
        </PageContainer>
      </section>

      <CTASection
        title="Stay Connected with Khwopa College"
        description="Follow campus updates, institutional notices, and student achievements."
        primaryAction={{ label: "View Notice Board", to: "/notices" }}
        secondaryAction={{ label: "Campus Life", to: "/campus-life" }}
      />
    </main>
  );
}
