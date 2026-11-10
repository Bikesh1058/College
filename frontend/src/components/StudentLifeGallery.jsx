import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowRightIcon } from "./Icons";
import { api } from "../services/api";

const fallbackImage =
  "https://wms.edigitalnepal.com/wms/files/ws-media-images/1751355381600-a4597213-3f0c-4e9e-b4ba-a3202aa81783.jpg";

const defaultPhotos = [
  {
    id: "default-1",
    image:
      "https://wms.edigitalnepal.com/wms/files/ws-media-images/1751355381420-4ac05be0-9eeb-41ce-a554-074a7a659f79.jpg",
    title: "Campus life",
    category: "Around the college",
    description:
      "Daily student interactions, red-brick heritage courtyards, and academic gatherings across Dekocha campus.",
    href: "/campus-life",
    isLive: false,
  },
  {
    id: "default-2",
    image:
      "https://wms.edigitalnepal.com/wms/files/ws-media-images/1751352979401-f3d040cd-1ff9-43a5-87c8-4e2859c53345.jpg",
    title: "Cultural expressions",
    category: "Culture and community",
    description:
      "Traditional Newar artistry, annual foundation day assemblies, and student-led cultural forums.",
    href: "/campus-life/activities",
    isLive: false,
  },
  {
    id: "default-3",
    image:
      "https://wms.edigitalnepal.com/wms/files/ws-media-images/1751354678034-37421fd3-9033-4750-a31f-0270f477c4d0.jpg",
    title: "Traditions together",
    category: "Student experiences",
    description:
      "Shared celebrations, science exhibitions, and inter-college athletic tournaments.",
    href: "/campus-life/clubs",
    isLive: false,
  },
];

function handleImageError(event) {
  event.currentTarget.onerror = null;
  event.currentTarget.src = fallbackImage;
}

export default function StudentLifeGallery() {
  const { data: clubsResponse } = useQuery({
    queryKey: ["clubs"],
    queryFn: () => api.getClubs(),
    staleTime: 60000,
    retry: 1,
  });

  const { data: facilitiesResponse } = useQuery({
    queryKey: ["facilities"],
    queryFn: () => api.getFacilities(),
    staleTime: 60000,
    retry: 1,
  });

  // Convert live clubs and campus media into Life at Khwopa items, sorted newest-first
  const liveClubItems = (clubsResponse?.data || []).map((c) => ({
    id: c._id || c.slug || c.name,
    image: c.image || fallbackImage,
    title: c.name,
    category: `${c.category || "Student Society"} — ${c.lead || "Campus Chapter"}`,
    description: c.description,
    meta: c.members,
    href: "/campus-life/clubs",
    createdAt: c.createdAt ? new Date(c.createdAt).getTime() : 0,
    isLive: true,
  }));

  const liveFacilityItems = (facilitiesResponse?.data || []).map((f) => ({
    id: f._id || f.title,
    image: f.image || fallbackImage,
    title: f.title,
    category: f.category || "Campus Moment",
    description: f.description,
    meta: f.badge || "Verified Moment",
    href: "/campus-life/gallery",
    createdAt: f.createdAt ? new Date(f.createdAt).getTime() : 0,
    isLive: true,
  }));

  const combinedLive = [...liveClubItems, ...liveFacilityItems].sort(
    (a, b) => b.createdAt - a.createdAt
  );

  const displayPhotos = (combinedLive.length >= 3 ? combinedLive : [...combinedLive, ...defaultPhotos]).slice(0, 3);
  const featuredItem = displayPhotos[0];
  const secondaryItems = displayPhotos.slice(1, 3);

  return (
    <section
      id="student-life"
      className="bg-[#f7f5f0] px-5 py-24 sm:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-7 md:flex-row md:items-end">
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-[#a17c3d]">
              Beyond the classroom
            </p>

            <h2 className="font-serif text-4xl leading-tight text-[#12243a] sm:text-5xl lg:text-6xl">
              Life at
              <span className="italic text-[#a17c3d]"> Khwopa.</span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-base leading-8 text-[#68717d]">
              Discover the people, activities, cultural moments and shared
              experiences that make up college life.
            </p>

            <Link
              to="/campus-life"
              className="mt-4 inline-flex items-center gap-3 text-sm font-semibold text-[#9b773d] transition hover:gap-5"
            >
              Explore student life <ArrowRightIcon />
            </Link>
          </div>
        </div>

        <div className="grid auto-rows-[240px] gap-5 md:grid-cols-12 md:auto-rows-[260px]">
          {/* PRIMARY SPOTLIGHT CARD (Newest published Life at Khwopa / Club / Moment takes the 7-column highlight) */}
          {featuredItem && (
            <Link
              to={featuredItem.href}
              className="group relative overflow-hidden rounded-2xl border-2 border-[#c5a15d] shadow-lg md:col-span-7 md:row-span-2"
            >
              <img
                src={featuredItem.image}
                alt={featuredItem.title}
                loading="lazy"
                onError={handleImageError}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#081522]/90 via-[#081522]/25 to-transparent" />

              <div className="absolute top-5 left-5 flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-[#c5a15d] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#102238] shadow-sm">
                  {featuredItem.isLive ? "Newest Campus Highlight" : "Featured Campus Life"}
                </span>
                {featuredItem.meta && (
                  <span className="rounded-md bg-[#12243a]/85 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#e5d0a2]">
                    {featuredItem.meta}
                  </span>
                )}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#e2c990]">
                  {featuredItem.category}
                </p>

                <h3 className="mt-2 font-serif text-2xl text-white sm:text-4xl">
                  {featuredItem.title}
                </h3>

                {featuredItem.description && (
                  <p className="mt-2.5 max-w-xl text-xs sm:text-sm leading-6 text-white/80 line-clamp-2">
                    {featuredItem.description}
                  </p>
                )}

                <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#dfbd77]">
                  Explore highlight <ArrowRightIcon className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          )}

          {/* SECONDARY CARDS (Right 5 columns) */}
          {secondaryItems.map((photo) => (
            <Link
              key={photo.id || photo.title}
              to={photo.href}
              className="group relative overflow-hidden rounded-2xl border border-[#ddd5c7] md:col-span-5"
            >
              <img
                src={photo.image}
                alt={photo.title}
                loading="lazy"
                onError={handleImageError}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#081522]/85 via-[#081522]/15 to-transparent" />

              {photo.isLive && (
                <span className="absolute top-4 left-4 rounded bg-[#12243a]/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#e2c990]">
                  New Moment
                </span>
              )}

              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#e2c990]">
                  {photo.category}
                </p>

                <h3 className="mt-1.5 font-serif text-2xl text-white sm:text-3xl line-clamp-1">
                  {photo.title}
                </h3>

                {photo.description && (
                  <p className="mt-1 text-xs text-white/75 line-clamp-1">
                    {photo.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-5 flex flex-col items-start justify-between gap-4 border-t border-[#ddd5c7] pt-6 sm:flex-row sm:items-center">
          <p className="text-xs leading-6 text-[#858b91]">
            Moments from the college community, student chapters, and campus activities.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/campus-life/clubs"
              className="inline-flex items-center gap-2 rounded-xl border border-[#d8cdb9] px-4 py-3 text-xs font-semibold text-[#12243a] transition hover:border-[#b99754] hover:bg-white"
            >
              Student clubs & chapters
            </Link>
            <Link
              to="/campus-life/gallery"
              className="inline-flex items-center gap-3 rounded-xl border border-[#d8cdb9] px-5 py-3 text-sm font-semibold text-[#12243a] transition hover:border-[#b99754] hover:bg-white"
            >
              View photo gallery <ArrowRightIcon className="h-4 w-4 text-[#a17c3d]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

