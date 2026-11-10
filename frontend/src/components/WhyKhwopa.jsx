import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import { ArrowRightIcon } from "./Icons";

const defaultStrengths = [
  {
    number: "01",
    title: "Community-rooted",
    text: "An institution connected to Bhaktapur's community and its wider educational aspirations.",
  },
  {
    number: "02",
    title: "Accessible education",
    text: "A community-college approach focused on making higher education accessible to different sections of society.",
  },
  {
    number: "03",
    title: "Academic inquiry",
    text: "An environment where research, conferences, discussion and the exchange of ideas have a place.",
  },
  {
    number: "04",
    title: "Culture and identity",
    text: "A learning environment connected to the cultural traditions and shared life of Bhaktapur.",
  },
];

export default function WhyKhwopa() {
  const { data: pageData } = useQuery({
    queryKey: ['page', 'home'],
    queryFn: () => api.getPage('home'),
    staleTime: 60000,
    retry: false
  });

  const whySection = pageData?.sections?.find(s => s.type === 'why_khwopa')?.content;

  const eyebrow = whySection?.eyebrow || "The Khwopa difference";
  const title = whySection?.title || "Education with";
  const titleItalic = whySection?.titleItalic || "purpose and identity.";
  const strengths = whySection?.strengths && whySection.strengths.length > 0
    ? whySection.strengths
    : defaultStrengths;

  return (
    <section
      id="why-khwopa"
      className="relative overflow-hidden bg-[#102238] px-5 py-24 text-white sm:px-8 lg:py-32"
    >
      <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full border border-white/5" />
      <div className="pointer-events-none absolute -right-20 -top-20 h-[340px] w-[340px] rounded-full border border-[#b99754]/15" />

      <div className="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-[#d2b577]">
            {eyebrow}
          </p>

          <h2 className="font-serif text-4xl leading-[1.15] sm:text-5xl lg:text-6xl">
            {title}
            <span className="block italic text-[#d2b577]">
              {titleItalic}
            </span>
          </h2>

          <div className="my-8 h-px w-20 bg-[#b99754]" />

          <p className="max-w-md text-base leading-8 text-[#bdc8d5]">
            Khwopa's identity is shaped by its connection to Bhaktapur, its
            community-oriented approach and its contribution to academic and
            cultural life.
          </p>

          <Link
            to="/about"
            className="mt-9 inline-flex items-center gap-4 rounded-xl border border-[#b99754] px-6 py-4 text-sm font-semibold text-[#e4ce9f] transition hover:bg-[#b99754] hover:text-[#12243a]"
          >
            Learn about our values <ArrowRightIcon />
          </Link>
        </div>

        <div className="border-t border-white/15">
          {strengths.map((item) => (
            <article
              key={item.number}
              className="group grid gap-4 border-b border-white/15 py-7 sm:grid-cols-[65px_1fr] sm:gap-7 sm:py-9"
            >
              <span className="font-serif text-2xl text-[#b99754]">
                {item.number}
              </span>

              <div>
                <h3 className="font-serif text-2xl transition group-hover:text-[#e2c990] sm:text-3xl">
                  {item.title}
                </h3>

                <p className="mt-3 max-w-xl text-sm leading-7 text-[#aebbc9] sm:text-base">
                  {item.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

