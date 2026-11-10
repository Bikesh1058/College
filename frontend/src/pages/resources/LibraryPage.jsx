import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import PageHero from "../../components/common/PageHero";
import PageContainer from "../../components/common/PageContainer";
import SectionHeading from "../../components/common/SectionHeading";
import CTASection from "../../components/common/CTASection";
import { resourcesData } from "../../data/resourcesData";
import { api } from "../../services/api";

export default function LibraryPage() {
  const { library } = resourcesData;
  const [activePhoto, setActivePhoto] = useState(null);

  const { data: remoteFacilities } = useQuery({
    queryKey: ['facilities-library'],
    queryFn: () => api.getFacilities(),
    staleTime: 60000,
    retry: 1
  });

  const galleryImages = useMemo(() => {
    const dbMedia = (remoteFacilities?.data || [])
      .filter(f => !f.category || f.category.toLowerCase().includes('library') || f.category.toLowerCase().includes('academic') || f.category.toLowerCase().includes('campus'))
      .map(f => ({
        src: f.image,
        title: f.title,
        subtitle: f.description || f.summary || 'Khwopa Central Library & Academic Wing'
      }));
    return dbMedia.length > 0 ? dbMedia : (library.gallery || []);
  }, [remoteFacilities, library.gallery]);

  return (
    <main className="bg-[#f7f5f0] min-h-screen">
      <PageHero
        eyebrow="Student Resources"
        title="Central Library & OPAC."
        italicTitle="Sanctuary of Learning."
        description="A rich academic repository of 45,000+ volumes, scholarly journals, quiet reading halls, and digital research terminals in Bhaktapur."
        breadcrumbs={[
          { label: "Resources", to: "/resources" },
          { label: "Library & OPAC" }
        ]}
        stats={[
          { label: "Book Volumes", value: "45,000+" },
          { label: "Reading Capacity", value: "180 Seats" },
          { label: "Digital OPAC", value: "Online Access" }
        ]}
      />

      {/* Rich Visual Library Showcase / Gallery */}
      <section className="border-b border-[#e5ddce] bg-[#faf8f5] py-14 sm:py-20">
        <PageContainer>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#92703b]">
                Institutional Sanctuary
              </span>
              <h2 className="mt-1 font-serif text-3xl sm:text-4xl font-bold text-[#12243a]">
                A Glimpse Into the Central Library
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[#475365] max-w-2xl">
                Explore our spacious multi-tier stacks, quiet study sanctuaries, specialized journal lounges, and automated OPAC lookup terminals.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-full bg-[#dfbd77]/20 px-3.5 py-1 text-xs font-semibold text-[#8a6833]">
              6 Dedicated Academic Wings
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setActivePhoto(img)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-[#e5ddce] bg-white shadow-sm transition hover:shadow-xl hover:border-[#b99754]"
              >
                <div className="relative h-60 w-full overflow-hidden bg-slate-900">
                  <img
                    src={img.src}
                    alt={img.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b2038]/90 via-[#0b2038]/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="rounded-md bg-[#dfbd77] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#0b2038]">
                      Wing {idx + 1}
                    </span>
                    <h3 className="mt-1 font-serif text-base sm:text-lg font-bold text-white drop-shadow">
                      {img.title}
                    </h3>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <p className="text-xs text-[#475365] leading-relaxed line-clamp-2">
                    {img.subtitle}
                  </p>
                  <p className="mt-3 text-[11px] font-bold uppercase tracking-wider text-[#92703b] group-hover:text-[#12243a] transition">
                    Click to view full photo →
                  </p>
                </div>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* Facilities & Services */}
      <section className="py-16 sm:py-24">
        <PageContainer>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <SectionHeading
                eyebrow="Facilities & Services"
                title="A Quiet Sanctuary for Inquiry"
                description={`Operating hours: ${library.timings}`}
              />

              <div className="rounded-2xl border border-[#e5ddce] bg-white p-8 shadow-sm">
                <h3 className="font-serif text-2xl font-bold text-[#12243a]">
                  Key Library Privileges & Features
                </h3>
                <ul className="mt-5 space-y-3.5">
                  {library.facilities.map((fac, idx) => (
                    <li key={idx} className="flex items-start gap-3.5 text-xs sm:text-sm text-[#475365]">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#dfbd77]/20 font-serif text-xs font-bold text-[#92703b]">
                        {idx + 1}
                      </span>
                      <span>{fac}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Digital Repositories */}
              <div className="mt-12">
                <h3 className="font-serif text-2xl font-bold text-[#12243a]">
                  Connected Digital Repositories
                </h3>
                <div className="mt-5 space-y-4">
                  {library.digitalResources.map((res, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-[#e5ddce] bg-white p-6 shadow-sm transition hover:border-[#b99754]"
                    >
                      <div>
                        <h4 className="font-serif text-lg font-bold text-[#12243a]">
                          {res.name}
                        </h4>
                        <p className="editorial-copy mt-1 text-xs sm:text-sm text-[#475365]">
                          {res.description}
                        </p>
                      </div>
                      <a
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-xl bg-[#0b2038] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#17334c]"
                      >
                        <span>Open Repository</span>
                        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="overflow-hidden rounded-2xl border border-[#e5ddce] bg-white shadow-sm">
                <img
                  src="https://khwopa.edu.np/themes/khce_v2/images/Library_Section_2082.png"
                  alt="Khwopa Central Library OPAC Terminal and Circulation Counter"
                  className="h-48 w-full object-cover object-center transition duration-500 hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = "https://management.khwopaconference.com/themes/management_conf/img/kc.jpg";
                  }}
                />
                <div className="p-6">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#92703b]">
                    Online Catalog
                  </span>
                  <h4 className="mt-1 font-serif text-xl font-bold text-[#12243a]">
                    OPAC Book Search
                  </h4>
                  <p className="editorial-copy mt-2 text-xs leading-relaxed text-[#475365]">
                    Search book availability, call numbers, and shelf racks online before visiting the issuing desk.
                  </p>
                  <a
                    href={library.opacUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center rounded-xl bg-[#0b2038] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#17334c]"
                  >
                    Access OPAC Portal →
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border border-[#091b30] bg-[#091b30] p-7 text-white shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#dfbd77]">
                  Book-Bank Support
                </span>
                <h4 className="mt-2 font-serif text-xl font-bold">
                  Textbook Bank Scheme
                </h4>
                <p className="editorial-copy mt-2 text-xs text-white/70">
                  Deserving students from any faculty can apply for a full semester set of textbooks through the library book-bank committee.
                </p>
              </div>

              <div className="rounded-2xl border border-[#e5ddce] bg-white p-6 shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#92703b]">
                  Library Guidelines
                </span>
                <h4 className="mt-1 font-serif text-base font-bold text-[#12243a]">
                  Study Hall Etiquette
                </h4>
                <ul className="mt-3 space-y-2 text-xs text-[#475365]">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#92703b]" />
                    Compulsory student identity card at the entry gate
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#92703b]" />
                    Absolute silence inside all reading sanctuaries
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#92703b]" />
                    Automated barcode issuing for 14-day book circulation
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Lightbox / Zoom Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full rounded-2xl bg-white overflow-hidden shadow-2xl border border-[#e5ddce]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative bg-slate-950 max-h-[70vh] flex items-center justify-center">
              <img
                src={activePhoto.src}
                alt={activePhoto.title}
                className="max-h-[70vh] w-full object-contain"
              />
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-3 right-3 h-8 w-8 rounded-full bg-black/60 text-white font-bold flex items-center justify-center hover:bg-black transition"
              >
                ✕
              </button>
            </div>
            <div className="p-6 bg-[#faf8f5]">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#92703b]">
                Khwopa Central Library
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#12243a] mt-0.5">
                {activePhoto.title}
              </h3>
              <p className="mt-2 text-sm text-[#475365]">
                {activePhoto.subtitle}
              </p>
            </div>
          </div>
        </div>
      )}

      <CTASection
        title="Need to Download Student Forms or Syllabus?"
        description="Access downloadable syllabi and academic request forms."
        primaryAction={{ label: "Downloads & Forms", to: "/resources/downloads" }}
        secondaryAction={{ label: "Contact Us", to: "/contact" }}
      />
    </main>
  );
}
