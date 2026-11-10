import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import PageHero from "../../components/common/PageHero";
import PageContainer from "../../components/common/PageContainer";
import SectionHeading from "../../components/common/SectionHeading";
import FilterBar from "../../components/common/FilterBar";
import CTASection from "../../components/common/CTASection";
import { campusLifeData } from "../../data/campusLifeData";
import { api } from "../../services/api";

export default function GalleryPage() {
  const [activeAlbumId, setActiveAlbumId] = useState("album-campus");
  const [lightboxImg, setLightboxImg] = useState(null);

  const { data: facilitiesResponse } = useQuery({
    queryKey: ["facilities"],
    queryFn: () => api.getFacilities(),
    staleTime: 60000,
    retry: 1,
  });

  const albumOptions = campusLifeData.galleryAlbums.map((a) => ({
    value: a.id,
    label: a.category
  }));

  const currentAlbum = useMemo(() => {
    const baseAlbum =
      campusLifeData.galleryAlbums.find((a) => a.id === activeAlbumId) ||
      campusLifeData.galleryAlbums[0];
    const liveImages = (facilitiesResponse?.data || []).map((f) => ({
      src: f.image,
      title: f.title,
      description: f.description,
    }));
    return {
      ...baseAlbum,
      images: [...liveImages, ...baseAlbum.images],
    };
  }, [activeAlbumId, facilitiesResponse]);

  return (
    <main className="bg-[#f7f5f0] min-h-screen">
      <PageHero
        eyebrow="Campus Life"
        title="Photo Gallery & Moments."
        italicTitle="Visual Heritage of Khwopa."
        description="A visual journey across Khwopa's traditional red-brick Newar architecture, scientific laboratories, cultural galas, and sports championships."
        breadcrumbs={[
          { label: "Campus Life", to: "/campus-life" },
          { label: "Photo Gallery" }
        ]}
        stats={[
          { label: "Albums", value: "3 Collections" },
          { label: "Resolution", value: "High-Definition" },
          { label: "Campus Setting", value: "Dekocha, Bhaktapur" }
        ]}
      />

      <section className="py-16 sm:py-24">
        <PageContainer>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between border-b border-[#e5ddce] pb-6">
            <SectionHeading
              eyebrow="Curated Album"
              title={currentAlbum.title}
              description="Click any photograph to view in high-resolution lightbox preview."
              className="mb-0 sm:mb-0"
            />
            <FilterBar
              options={albumOptions}
              activeOption={activeAlbumId}
              onChange={setActiveAlbumId}
            />
          </div>

          {/* Photo Grid */}
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {currentAlbum.images.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setLightboxImg(img)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-[#e5ddce] bg-white shadow-sm transition hover:border-[#b99754] hover:shadow-lg"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <img
                    src={img.src}
                    alt={img.title}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://wms.edigitalnepal.com/wms/files/ws-post-images/1678958957817_007be5e2-a1dc-4580-9809-4964d79fa1a0.jpg";
                    }}
                  />
                </div>
                <div className="p-5 bg-white">
                  <h4 className="font-serif text-base font-bold text-[#12243a] group-hover:text-[#92703b] transition">
                    {img.title}
                  </h4>
                  <span className="mt-1 block text-[10px] uppercase tracking-[0.16em] text-slate-400">
                    Click to view full image
                  </span>
                </div>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={() => setLightboxImg(null)}
        >
          <div
            className="relative max-w-4xl overflow-hidden rounded-2xl bg-[#091b30] text-white shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxImg(null)}
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black transition"
              aria-label="Close Lightbox"
            >
              ✕
            </button>
            <img
              src={lightboxImg.src}
              alt={lightboxImg.title}
              className="max-h-[75vh] w-full object-contain"
            />
            <div className="p-6 border-t border-slate-700">
              <h3 className="font-serif text-xl font-bold text-[#dfbd77]">
                {lightboxImg.title}
              </h3>
              <p className="editorial-copy mt-1 text-xs text-slate-300">
                Khwopa College Campus Archives · Dekocha, Bhaktapur
              </p>
            </div>
          </div>
        </div>
      )}

      <CTASection
        title="Experience the Campus Atmosphere Yourself"
        description="Visit our peaceful red-brick campus located in historic Dekocha, Bhaktapur."
        primaryAction={{ label: "Campus Location", to: "/contact/location" }}
        secondaryAction={{ label: "Campus Life Overview", to: "/campus-life" }}
      />
    </main>
  );
}
