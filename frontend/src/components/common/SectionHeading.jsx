export default function SectionHeading({
  eyebrow,
  title,
  italicTitle,
  description,
  align = "left",
  className = ""
}) {
  const isCentered = align === "center";

  return (
    <div
      className={`mb-10 sm:mb-14 ${
        isCentered ? "mx-auto max-w-2xl text-center" : "max-w-3xl"
      } ${className}`}
    >
      {eyebrow && (
        <div
          className={`mb-3.5 flex items-center gap-3 ${
            isCentered ? "justify-center" : ""
          }`}
        >
          <span className="h-px w-9 bg-[#b99754]" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#92703b]">
            {eyebrow}
          </span>
          {isCentered && <span className="h-px w-9 bg-[#b99754]" />}
        </div>
      )}

      <h2 className="font-serif text-2xl sm:text-4xl lg:text-[42px] font-bold leading-[1.15] tracking-tight text-[#12243a]">
        {title}
        {italicTitle && (
          <span className="block italic text-[#a17c3d] mt-1">
            {italicTitle}
          </span>
        )}
      </h2>

      {description && (
        <p className="editorial-copy mt-4 text-base leading-relaxed text-[#475365]">
          {description}
        </p>
      )}
    </div>
  );
}
