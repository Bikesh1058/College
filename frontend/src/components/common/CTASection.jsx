import { Link } from "react-router-dom";

export default function CTASection({
  title = "Begin Your Academic Journey at Khwopa",
  description = "Join a legacy of community-funded excellence, dedicated faculty mentors and disciplined education in historic Bhaktapur.",
  primaryAction = { label: "Apply for Admission", to: "/admissions" },
  secondaryAction = { label: "Contact Us", to: "/contact" }
}) {
  return (
    <section className="relative overflow-hidden bg-[#14283F] py-14 text-white sm:py-16">
      <div className="pointer-events-none absolute inset-0 opacity-10 bg-[radial-gradient(#dfbd77_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-serif text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
          {description}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {primaryAction && (
            <Link
              to={primaryAction.to}
              className="inline-flex items-center justify-center rounded-xl bg-[#dfbd77] px-6 py-3 text-sm font-semibold text-[#14283F] shadow-sm transition hover:bg-[#c9a65d]"
            >
              {primaryAction.label}
            </Link>
          )}
          {secondaryAction && (
            <Link
              to={secondaryAction.to}
              className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              {secondaryAction.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

