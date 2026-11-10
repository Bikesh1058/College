import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import { ArrowRightIcon } from "./Icons";

export default function StudentTestimonials() {
  const { data: pageData } = useQuery({
    queryKey: ['page', 'home'],
    queryFn: () => api.getPage('home'),
    staleTime: 60000,
    retry: false
  });

  const testSection = pageData?.sections?.find(s => s.type === 'testimonials')?.content;

  const eyebrow = testSection?.eyebrow || "Student voices";
  const quote = testSection?.quote || "Every student has a story worth sharing.";
  const description = testSection?.description || "This space is dedicated to genuine experiences from the students and alumni who make up the Khwopa community.";
  const tag = testSection?.tag || "Experiences from our community";
  const ctaEyebrow = testSection?.ctaEyebrow || "Your experience matters";
  const ctaTitle = testSection?.ctaTitle || "Be part of the Khwopa story.";
  const ctaText = testSection?.ctaText || "We look forward to featuring authentic student perspectives, meaningful campus experiences and stories from our alumni.";

  return (
    <section
      id="student-testimonials"
      className="bg-white px-5 py-24 sm:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid overflow-hidden rounded-2xl bg-[#12243a] lg:grid-cols-[1fr_1fr]">
          <div className="relative flex min-h-[350px] flex-col justify-between overflow-hidden p-8 sm:p-12 lg:p-14">
            <div className="pointer-events-none absolute -left-16 -top-16 h-72 w-72 rounded-full border border-white/10" />

            <p className="relative text-xs font-semibold uppercase tracking-[0.25em] text-[#d2b577]">
              {eyebrow}
            </p>

            <div className="relative">
              <span className="font-serif text-7xl leading-none text-[#b99754]">
                “
              </span>

              <h2 className="max-w-lg font-serif text-3xl leading-snug text-white sm:text-4xl">
                {quote}
              </h2>

              <p className="mt-5 max-w-md text-sm leading-7 text-[#c0c9d4]">
                {description}
              </p>
            </div>

            <span className="relative mt-8 text-xs uppercase tracking-[0.18em] text-[#d2b577]">
              {tag}
            </span>
          </div>

          <div className="flex flex-col justify-center bg-[#f2eee5] p-8 sm:p-12 lg:p-14">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#a17c3d]">
              {ctaEyebrow}
            </p>

            <h3 className="mt-5 font-serif text-3xl leading-tight text-[#12243a] sm:text-4xl">
              {ctaTitle}
            </h3>

            <p className="mt-5 text-sm leading-7 text-[#68717d]">
              {ctaText}
            </p>

            <a
              href="/contact"
              className="mt-9 inline-flex w-fit items-center gap-4 rounded-xl bg-[#12243a] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#233d5a]"
            >
              Share your experience <ArrowRightIcon className="h-4 w-4 text-[#d2b577]" />
            </a>

            <p className="mt-5 text-xs leading-5 text-[#858b91]">
              Stories will be published with the contributor's approval.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

