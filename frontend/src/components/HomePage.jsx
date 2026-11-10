
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import fallbackImage from "../assets/hero.png";

const SLIDE_INTERVAL = 3000;

const defaultSlides = [
  {
    image:
      "https://wms.edigitalnepal.com/wms/files/ws-profile/1751348345531_a4a2aae5-8df1-4a63-b163-31f03f657c13.png",
    alt: "Official Khwopa Secondary School campus banner in Dekocha, Bhaktapur",
  },
  {
    image:
      "https://wms.edigitalnepal.com/wms/files/ws-post-images/1751519828524_e4439fe2-801b-494c-8a2d-a89d2053bc77.png",
    alt: "Khwopa Secondary School practical science laboratory",
  },
  {
    image:
      "https://wms.edigitalnepal.com/wms/files/ws-post-images/1751512628392_35a0f113-7f94-43bb-9bf6-4a2d56daf8d6.jpg",
    alt: "Khwopa Secondary School academic assembly and campus life",
  },
  {
    image:
      "https://wms.edigitalnepal.com/wms/files/ws-post-images/1751519692269_d079f3e5-f915-4d9a-be18-6e19ced18c2e.png",
    alt: "Khwopa Secondary School modern computer and IT laboratory",
  },
];

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);

  // Fetch dynamic page builder CMS data for homepage
  const { data: pageData } = useQuery({
    queryKey: ['page', 'home'],
    queryFn: () => api.getPage('home'),
    staleTime: 60000,
    retry: false
  });

  const heroSection = pageData?.sections?.find(s => s.type === 'hero')?.content;
  const slides = defaultSlides;

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveSlide((currentSlide) => (currentSlide + 1) % slides.length);
    }, SLIDE_INTERVAL);

    return () => window.clearInterval(intervalId);
  }, [slides.length]);

  function handleImageError(event) {
    event.currentTarget.onerror = null;
    event.currentTarget.src = fallbackImage;
  }

  const currentSlide = slides[activeSlide];

  const eyebrow = heroSection?.eyebrow || "Khwopa College | Bhaktapur";
  const headingLines = heroSection?.headingLines || ["Learn.", "Discover.", "Belong."];
  const description = heroSection?.description || "An academic community rooted in Bhaktapur, helping students build knowledge, character, and opportunity.";
  const ctaText = heroSection?.ctaText || "Explore Streams";
  const ctaLink = heroSection?.ctaLink || "#academics";
  const secondaryCtaText = heroSection?.secondaryCtaText || "Discover College";
  const secondaryCtaLink = heroSection?.secondaryCtaLink || "#about";

  return (
    <section
      id="home"
      aria-labelledby="home-heading"
      className="relative isolate min-h-[620px] scroll-mt-24 overflow-hidden bg-[#091a2d] text-white sm:min-h-[680px] lg:min-h-[720px]"
    >
      {/* Campus slideshow */}
      <div className="absolute inset-0 -z-10 overflow-hidden bg-[#102238]">
        <img
          key={currentSlide.image}
          src={currentSlide.image}
          alt={currentSlide.alt}
          fetchPriority="high"
          onError={handleImageError}
          className="h-full w-full animate-[hero-fade_700ms_ease-out] object-cover object-[58%_center]"
        />
      </div>

      {/* Cinematic image treatment */}
      <div className="pointer-events-none absolute inset-0 -z-[5] bg-gradient-to-r from-[#071526] via-[#0a1d32]/90 to-[#102238]/25" />

      <div className="pointer-events-none absolute inset-0 -z-[4] bg-gradient-to-t from-[#071526]/90 via-transparent to-[#071526]/20" />

      {/* Subtle warm photographic tint */}
      <div className="pointer-events-none absolute inset-0 -z-[3] bg-[#8e7650]/[0.05] mix-blend-screen" />

      {/* Architectural framing */}
      <div className="pointer-events-none absolute right-[7%] top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-[#dfbd77]/45 to-transparent lg:block" />

      <div className="pointer-events-none absolute right-[9%] top-[18%] hidden h-28 w-28 border-r border-t border-[#dfbd77]/40 lg:block" />

      <div className="pointer-events-none absolute bottom-[12%] right-[9%] hidden h-28 w-28 border-b border-r border-[#dfbd77]/40 lg:block" />

      {/* Main hero content */}
      <div className="mx-auto flex min-h-[620px] max-w-[1440px] items-center px-5 py-24 sm:min-h-[680px] sm:px-8 lg:min-h-[720px] lg:px-10">
        <div className="relative z-10 max-w-3xl">

          {/* Institutional identification */}
          <div className="mb-7 flex items-center gap-4">
            <span className="h-px w-12 bg-[#dfbd77]" />

            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#e2c17f]">
              {eyebrow}
            </p>
          </div>

          {/* Main heading */}
          <h1
            id="home-heading"
            className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[78px] font-bold leading-[1.06] tracking-[-0.02em] text-white"
          >
            {headingLines[0] || "Learn."}
            <br />

            {headingLines[1] || "Discover."}
            <br />

            <span className="italic text-[#e0bd77]">
              {headingLines[2] || "Belong."}
            </span>
          </h1>

          {/* Gold divider */}
          <div className="mt-8 h-px w-20 bg-[#dfbd77]/80" />

          {/* Original description */}
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg sm:leading-8">
            {description}
          </p>

          {/* Original CTA buttons */}
          <div className="mt-9 flex flex-wrap gap-3.5">

            <a
              href={ctaLink}
              className="group inline-flex min-h-12 items-center gap-3.5 rounded-xl bg-[#dfbd77] px-6 py-3 text-sm font-bold text-[#12273d] shadow-lg shadow-black/10 transition duration-300 hover:-translate-y-0.5 hover:bg-[#f0d49a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#091a2d]"
            >
              {ctaText}

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <ArrowIcon />
              </span>
            </a>

            <a
              href={secondaryCtaLink}
              className="group inline-flex min-h-12 items-center gap-3.5 rounded-xl border border-white/55 bg-[#091a2d]/25 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition duration-300 hover:border-[#dfbd77] hover:bg-[#dfbd77]/10 hover:text-[#f0d49a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {secondaryCtaText}

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <ArrowIcon />
              </span>
            </a>

          </div>

        </div>
      </div>

      {/* Bottom gold edge */}
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#dfbd77]/70 to-transparent" />

    </section>
  );
}
