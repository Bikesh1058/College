import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import PageHero from "../../components/common/PageHero";
import PageContainer from "../../components/common/PageContainer";
import SectionHeading from "../../components/common/SectionHeading";
import SearchBar from "../../components/common/SearchBar";
import FilterBar from "../../components/common/FilterBar";
import DocumentCard from "../../components/common/DocumentCard";
import EmptyState from "../../components/common/EmptyState";
import CTASection from "../../components/common/CTASection";
import { resourcesData } from "../../data/resourcesData";
import { api } from "../../services/api";

export default function DownloadsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [downloadNote, setDownloadNote] = useState("");

  const categories = ["All", "Academic", "Forms", "Syllabus"];

  // Fetch dynamic notices with attachments or official circulars
  const { data: noticesData } = useQuery({
    queryKey: ['notices'],
    queryFn: () => api.getNotices(),
    staleTime: 60000,
    retry: 1
  });

  // Fetch dynamic documents from MongoDB
  const { data: remoteDocs } = useQuery({
    queryKey: ['documents'],
    queryFn: () => api.getDocuments(),
    staleTime: 60000,
    retry: 1
  });

  const handleDownload = (item) => {
    if (item.downloadUrl && item.downloadUrl !== "#" && item.downloadUrl !== "/resources") {
      if (item.downloadUrl.startsWith("data:")) {
        const a = document.createElement("a");
        a.href = item.downloadUrl;
        a.download = `${item.title.replace(/[^a-z0-9]/gi, "_")}.pdf`;
        a.click();
        return;
      }
      window.open(item.downloadUrl, "_blank", "noopener,noreferrer");
      return;
    }
    setDownloadNote(`Opening official document: "${item.title}"...`);
    setTimeout(() => setDownloadNote(""), 4000);
  };

  const downloadsList = useMemo(() => {
    const liveNotices = (noticesData?.data || []).map(n => ({
      id: n._id,
      title: n.title,
      category: n.category === 'Admission' ? 'Forms' : 'Academic',
      description: n.content?.slice(0, 160) + '...',
      fileType: "PDF",
      fileSize: "Official Circular",
      updatedAt: new Date(n.publishedAt || n.createdAt).toLocaleDateString(),
      downloadUrl: "/notices"
    }));

    const dynamicMongoDocs = (remoteDocs?.data || []).map(d => ({
      id: d._id,
      title: d.title,
      category: d.category === 'Scholarships' ? 'Forms' : d.category || 'Academic',
      description: d.description || 'Institutional circular and curriculum document.',
      fileType: "PDF",
      fileSize: d.fileSize || "1.2 MB PDF",
      updatedAt: d.academicYear || "2082/83",
      downloadUrl: d.fileUrl || "/resources"
    }));

    const combined = [...dynamicMongoDocs, ...liveNotices];
    return combined.length > 0 ? combined : resourcesData.downloads;
  }, [noticesData, remoteDocs]);

  const filtered = useMemo(() => {
    return downloadsList.filter((doc) => {
      const matchesSearch =
        doc.title.toLowerCase().includes(search.toLowerCase()) ||
        doc.description.toLowerCase().includes(search.toLowerCase());

      const matchesCat =
        activeCategory === "All" || doc.category === activeCategory;

      return matchesSearch && matchesCat;
    });
  }, [downloadsList, search, activeCategory]);

  return (
    <main className="bg-[#f7f5f0] min-h-screen">
      <PageHero
        eyebrow="Student Resources"
        title="Downloads & Forms."
        italicTitle="Official Syllabus & Applications."
        description="Searchable document repository for course syllabi, student handbooks, leave forms, and official administrative templates."
        breadcrumbs={[
          { label: "Resources", to: "/resources" },
          { label: "Downloads & Forms" }
        ]}
        stats={[
          { label: "Archive", value: "Verified Docs" },
          { label: "Formats", value: "PDF & DOCX" },
          { label: "Availability", value: "Free Download" }
        ]}
      />

      <section className="py-16 sm:py-24">
        <PageContainer>
          <SectionHeading
            eyebrow="Document Library"
            title="Searchable Document Repository"
            italicTitle="& Application Forms."
            description="Download official forms, course guidelines, and practical manuals in PDF / DOCX format."
          />

          {downloadNote && (
            <div className="mb-6 rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-xs font-semibold text-emerald-800">
              {downloadNote}
            </div>
          )}

          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#e5ddce] pb-6">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search documents by title or topic..."
              className="w-full sm:max-w-md"
            />
            <FilterBar
              options={categories}
              activeOption={activeCategory}
              onChange={setActiveCategory}
            />
          </div>

          {filtered.length === 0 ? (
            <EmptyState
              title="No documents found"
              description="No file matched your search query. Try clearing your filter."
              onReset={() => {
                setSearch("");
                setActiveCategory("All");
              }}
            />
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((item) => (
                <DocumentCard
                  key={item.id}
                  title={item.title}
                  category={item.category}
                  date={item.updatedAt || item.date}
                  fileType={item.fileType}
                  fileSize={item.fileSize}
                  description={item.description}
                  downloadUrl={item.downloadUrl}
                  onDownload={() => handleDownload(item)}
                />
              ))}
            </div>
          )}
        </PageContainer>
      </section>

      <CTASection
        title="Can't Find the Form You're Looking For?"
        description="Visit the administration desk or send us an enquiry for archived documents."
        primaryAction={{ label: "Contact College Desk", to: "/contact" }}
        secondaryAction={{ label: "Academic Calendar", to: "/resources/academic-calendar" }}
      />
    </main>
  );
}
