import { Link } from "react-router-dom";

const defaultCampusImage =
  "https://wms.edigitalnepal.com/wms/files/ws-post-images/1678958957817_007be5e2-a1dc-4580-9809-4964d79fa1a0.jpg";

export default function PageHero({
  eyebrow = "Discover our institution",
  title,
  italicTitle,
  description,
  breadcrumbs = [],
  stats = [],
  image = defaultCampusImage,
}) {
  return (
    <section className="relative isolate overflow-hidden bg-[#091b30] text-white">
      {/* Background Image & Layered Gradients */}
      <div className="absolute inset-0 -z-10">
        <img
          src={image}
          alt="Khwopa College Campus, Bhaktapur"
          className="h-full w-full object-cover object-center opacity-35"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07182b] via-[#0b2038]/95 to-[#0b2038]/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07182b]/65 to-transparent" />
      </div>

      {/* Traditional Concentric Arc Rings */}
      <div className="pointer-events-none absolute -right-20 -top-36 -z-10 h-[430px] w-[430px] rounded-full border border-[#dfbd77]/10" />
      <div className="pointer-events-none absolute -right-5 -top-20 -z-10 h-[290px] w-[290px] rounded-full border border-[#dfbd77]/10" />

      <div className="mx-auto max-w-[1380px] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        {/* Breadcrumb Trail */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="flex items-center gap-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55">
            <Link to="/" className="transition hover:text-[#dfbd77]">
              Home
            </Link>
            {breadcrumbs.map((crumb, idx) => {
              const isLast = idx === breadcrumbs.length - 1;
              return (
                <span key={idx} className="flex items-center gap-2.5">
                  <span className="text-white/30">/</span>
                  {isLast || !crumb.to ? (
                    <span className="text-[#dfbd77]">{crumb.label}</span>
                  ) : (
                    <Link to={crumb.to} className="transition hover:text-[#dfbd77]">
                      {crumb.label}
                    </Link>
                  )}
                </span>
              );
            })}
          </nav>
        )}

        {/* Hero Title & Editorial Copy */}
        <div className="mt-10 max-w-4xl">
          {eyebrow && (
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-9 bg-[#dfbd77]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#dfbd77]">
                {eyebrow}
              </span>
            </div>
          )}

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-white">
            {title}
            {italicTitle && (
              <span className="block italic text-[#dfbd77] mt-1">
                {italicTitle}
              </span>
            )}
          </h1>

          {description && (
            <p className="editorial-copy mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg sm:leading-8">
              {description}
            </p>
          )}
        </div>

        {/* Optional Stats Counter Bar */}
        {stats && stats.length > 0 && (
          <div className="mt-12 grid max-w-3xl grid-cols-2 gap-8 border-t border-white/15 pt-7 sm:grid-cols-3">
            {stats.map((s, idx) => (
              <div key={idx}>
                <p className="font-serif text-3xl font-bold text-[#dfbd77]">{s.value}</p>
                <p className="mt-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white/65">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Gold Border Base line */}
      <div className="absolute bottom-0 h-px w-full bg-[#dfbd77]/50" />
    </section>
  );
}
