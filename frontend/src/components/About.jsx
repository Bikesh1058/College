import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import { ArrowRightIcon } from "./Icons";

const fallbackCampusImage =
  "https://wms.edigitalnepal.com/wms/files/ws-post-images/1751512628392_35a0f113-7f94-43bb-9bf6-4a2d56daf8d6.jpg";

const fallbackImage =
  "https://wms.edigitalnepal.com/wms/files/ws-profile/1751348345531_a4a2aae5-8df1-4a63-b163-31f03f657c13.png";

function handleImageError(event) {
  event.currentTarget.onerror = null;
  event.currentTarget.src = fallbackImage;
}

export default function About() {
  const { data: pageData } = useQuery({
    queryKey: ['page', 'about'],
    queryFn: () => api.getPage('about'),
    staleTime: 60000,
    retry: false
  });

  const heroSection = pageData?.sections?.find(s => s.type === 'hero')?.content;

  const eyebrow = heroSection?.eyebrow || "About Khwopa College";
  const heading = heroSection?.heading || "Rooted in our community. Built for the future.";
  const description = heroSection?.description || "Khwopa College is a community college in Bhaktapur, undertaken by Bhaktapur Municipality and affiliated with the National Examinations Board (NEB). Its identity is closely connected with the educational, cultural and intellectual life of the community it serves.";
  const bannerImage = heroSection?.bannerImage || fallbackCampusImage;

  return (
    <section id="about" className="bg-[#f7f5f0] px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <div>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-[#a17c3d]">
            {eyebrow}
          </p>

          <h2 className="max-w-xl font-serif text-4xl leading-[1.12] text-[#12243a] sm:text-5xl lg:text-6xl">
            {heading.includes('.') ? (
              <>
                {heading.split('.')[0]}.
                <span className="block italic text-[#a17c3d]">
                  {heading.split('.').slice(1).join('.').trim()}
                </span>
              </>
            ) : (
              heading
            )}
          </h2>

          <div className="my-8 h-px w-20 bg-[#b99754]" />

          <p className="max-w-xl text-base leading-8 text-[#5c6470]">
            {description}
          </p>

          <p className="mt-5 max-w-xl text-base leading-8 text-[#5c6470]">
            Explore the college's background, academic direction, institutional
            values and the people who contribute to its learning environment.
          </p>

          <Link
            to="/about"
            className="mt-9 inline-flex items-center gap-5 rounded-xl bg-[#12243a] px-6 py-4 text-sm font-semibold text-white transition duration-300 hover:bg-[#233d5a]"
          >
            Discover our college
            <ArrowRightIcon className="h-4 w-4 text-[#d2b577]" />
          </Link>
        </div>

        <div className="relative">
          <div className="absolute -right-3 -top-3 h-32 w-32 border-r border-t border-[#b99754] sm:-right-5 sm:-top-5" />

          <div className="relative overflow-hidden rounded-2xl">
            <img
              src={bannerImage}
              alt="Khwopa College building and courtyard in Bhaktapur"
              loading="lazy"
              onError={handleImageError}
              className="h-[380px] w-full object-cover sm:h-[490px]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#081522]/70 via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 p-7 text-white sm:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#e0c58e]">
                A place to learn and grow
              </p>
              <p className="mt-2 font-serif text-2xl sm:text-3xl">
                Khwopa College, Bhaktapur
              </p>
            </div>
          </div>

          <div className="absolute left-6 top-6 hidden max-w-xs rounded-xl border border-[#e6ddca] bg-white/95 p-5 shadow-xl backdrop-blur-sm sm:block">
            <p className="font-serif text-3xl font-bold text-[#a17c3d]">Khwopa</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#667080]">
              Education / Community / Culture
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

