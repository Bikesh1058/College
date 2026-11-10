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
import { examinationsData } from "../../data/examinationsData";
import { api } from "../../services/api";

export default function RoutinesPage() {
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("All");

  const levels = ["All", "+2 Science", "+2 Management", "+2 Humanities & Law"];

  // Fetch dynamic examinations and notices
  const { data: examsData } = useQuery({
    queryKey: ['examinations'],
    queryFn: () => api.getExaminations(),
    staleTime: 60000,
    retry: 1
  });

  const { data: noticesData } = useQuery({
    queryKey: ['notices'],
    queryFn: () => api.getNotices(),
    staleTime: 60000,
    retry: 1
  });

  const routinesList = useMemo(() => {
    const dbExams = (examsData?.data || []).map(e => ({
      id: e._id,
      title: e.title,
      programme: e.gradeLevel || "+2 Science, Management, Humanities & Law",
      level: "+2 Science",
      publishedDate: e.examDate || "Official Schedule",
      fileSize: e.status || "Routine Published",
      fileType: "NEB 104",
      downloadUrl: e.routineImage || "https://neb.gov.np"
    }));
    const examNotices = (noticesData?.data || [])
      .filter(n => n.category?.toLowerCase() === 'examination')
      .map(n => ({
        id: n._id,
        title: n.title,
        programme: "+2 General / All Streams",
        level: "+2 Science",
        publishedDate: new Date(n.publishedAt || n.createdAt).toLocaleDateString(),
        fileSize: "Official Circular",
        fileType: "NOTICE",
        downloadUrl: n.attachment?.url || `/notices`
      }));
    const combined = [...dbExams, ...examNotices];
    return combined.length > 0 ? combined : examinationsData.routines;
  }, [examsData, noticesData]);

  const filtered = useMemo(() => {
    return routinesList.filter((r) => {
      const matchesSearch =
        r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.programme.toLowerCase().includes(search.toLowerCase());

      const matchesLevel =
        levelFilter === "All" || r.level === levelFilter;

      return matchesSearch && matchesLevel;
    });
  }, [routinesList, search, levelFilter]);

  return (
    <main className="bg-[#f7f5f0] min-h-screen">
      <PageHero
        eyebrow="Examination Section"
        title="Examination Routines."
        italicTitle="Timetables & Schedules."
        description="Official schedule routines, revised timetables, and board examination calendars from the National Examinations Board (NEB)."
        breadcrumbs={[
          { label: "Examinations", to: "/examinations" },
          { label: "Routines" }
        ]}
        stats={[
          { label: "Governing Board", value: "NEB Sanothimi" },
          { label: "Updates Frequency", value: "Daily" },
          { label: "Exam Centre", value: "Code 104" }
        ]}
      />

      <section className="py-16 sm:py-24">
        <PageContainer>
          <SectionHeading
            eyebrow="Published Timetables"
            title="Download Examination Schedules"
            italicTitle="for All Disciplines."
            description="Find your programme timetable below. Always verify that you are checking the latest published revision before scheduling your travel."
          />

          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#e5ddce] pb-6">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search routines by programme, faculty, or exam year..."
              className="w-full sm:max-w-md"
            />
            <FilterBar
              options={levels}
              activeOption={levelFilter}
              onChange={setLevelFilter}
            />
          </div>

          {filtered.length === 0 ? (
            <EmptyState
              title="No routines found"
              description="No timetable matches your search query. Try clearing your search keyword."
              onReset={() => {
                setSearch("");
                setLevelFilter("All");
              }}
            />
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((item) => (
                <DocumentCard
                  key={item.id}
                  title={item.title}
                  category={`${item.programme} · ${item.year}`}
                  date={item.publishedDate}
                  fileType={item.fileType}
                  fileSize={item.fileSize}
                  description={`Examinations scheduled to commence from ${item.examStartDate}. Published by university controller of examinations.`}
                  downloadUrl={item.downloadUrl}
                />
              ))}
            </div>
          )}
        </PageContainer>
      </section>

      <CTASection
        title="Looking for Examination Forms or Results?"
        description="Verify examination deadlines, payment vouchers, and published semester/annual marks."
        primaryAction={{ label: "Examination Forms", to: "/examinations/forms" }}
        secondaryAction={{ label: "Check Results", to: "/results" }}
      />
    </main>
  );
}
