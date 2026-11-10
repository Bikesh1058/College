import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import PageHero from "../../components/common/PageHero";
import PageContainer from "../../components/common/PageContainer";
import SectionHeading from "../../components/common/SectionHeading";
import SearchBar from "../../components/common/SearchBar";
import FilterBar from "../../components/common/FilterBar";
import EmptyState from "../../components/common/EmptyState";
import CTASection from "../../components/common/CTASection";
import { campusLifeData } from "../../data/campusLifeData";
import { api } from "../../services/api";

export default function ClubsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Technology", "Business & Leadership", "Humanitarian & Social Service", "Culture & Arts", "Environment"];

  const { data: remoteClubs } = useQuery({
    queryKey: ['clubs'],
    queryFn: () => api.getClubs(),
    staleTime: 60000,
    retry: 1
  });

  const clubsList = useMemo(() => {
    const live = (remoteClubs?.data || []).map((c) => ({
      id: c._id || c.slug || c.name,
      name: c.name,
      category: c.category || "Student Society",
      membersCount: c.members || "50+ Members",
      lead: c.lead || "Student Coordinator",
      description: c.description,
      image: c.image || "",
      activities: Array.isArray(c.activities)
        ? c.activities
        : c.activities
        ? c.activities.split(",").map((s) => s.trim()).filter(Boolean)
        : ["Campus Workshops", "Annual Exhibition", "Student Mentorship"],
      isLive: true,
    }));
    return live.length > 0 ? live : campusLifeData.clubs;
  }, [remoteClubs]);

  const filtered = useMemo(() => {
    return clubsList.filter((club) => {
      const matchesSearch =
        club.name.toLowerCase().includes(search.toLowerCase()) ||
        (club.description && club.description.toLowerCase().includes(search.toLowerCase()));

      const matchesCat =
        activeCategory === "All" || club.category === activeCategory;

      return matchesSearch && matchesCat;
    });
  }, [clubsList, search, activeCategory]);

  return (
    <main className="bg-[#f7f5f0] min-h-screen">
      <PageHero
        eyebrow="Campus Life"
        title="Clubs & Societies."
        italicTitle="Student Leadership & Action."
        description="Empowering students to organize, lead, compete, and serve through diverse academic, cultural, and humanitarian clubs."
        breadcrumbs={[
          { label: "Campus Life", to: "/campus-life" },
          { label: "Clubs & Societies" }
        ]}
        stats={[
          { label: "Active Societies", value: "8+ Clubs" },
          { label: "Volunteers", value: "600+ Members" },
          { label: "Annual Events", value: "25+ Per Year" }
        ]}
      />

      <section className="py-16 sm:py-24">
        <PageContainer>
          <SectionHeading
            eyebrow="Student Leadership"
            title="Active Campus Societies"
            italicTitle="& Extra-Curricular Circles."
            description="Joining a club at Khwopa gives you hands-on organizational experience, camaraderie, and platforms to showcase your skills."
          />

          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#e5ddce] pb-6">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search clubs by name or activity..."
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
              title="No clubs found"
              description="No student club matches your search keyword. Try clearing your filter."
              onReset={() => {
                setSearch("");
                setActiveCategory("All");
              }}
            />
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {filtered.map((club) => (
                <div
                  key={club.id}
                  className="flex flex-col justify-between rounded-2xl border border-[#e5ddce] bg-white p-8 shadow-sm transition hover:border-[#b99754]"
                >
                  <div>
                    {club.image && (
                      <div className="mb-5 h-44 w-full overflow-hidden rounded-xl border border-[#e5ddce] bg-slate-100">
                        <img
                          src={club.image}
                          alt={club.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="rounded-md bg-[#dfbd77]/20 px-2.5 py-0.5 text-xs font-bold text-[#92703b]">
                        {club.category}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        {club.membersCount}
                      </span>
                    </div>

                    <h3 className="mt-4 font-serif text-2xl font-bold text-[#12243a]">
                      {club.name}
                    </h3>

                    <p className="mt-1 text-xs font-medium text-[#92703b]">
                      {club.lead}
                    </p>

                    <p className="editorial-copy mt-3 text-xs sm:text-sm leading-relaxed text-[#475365]">
                      {club.description}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-slate-100 pt-4">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#12243a]">
                      Key Annual Activities:
                    </h4>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {club.activities.map((act, i) => (
                        <span
                          key={i}
                          className="rounded-lg border border-[#e5ddce] bg-[#fbfaf7] px-2.5 py-1 text-[11px] font-medium text-[#475365]"
                        >
                          {act}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </PageContainer>
      </section>

      <CTASection
        title="Want to Initiate or Join a Student Chapter?"
        description="Club registrations open during the first month of every academic session under the Student Welfare Section."
        primaryAction={{ label: "Contact Student Welfare", to: "/contact" }}
        secondaryAction={{ label: "Browse Upcoming Events", to: "/campus-life/events" }}
      />
    </main>
  );
}
