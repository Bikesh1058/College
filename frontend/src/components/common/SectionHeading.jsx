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
          className={`mb-3 flex items-center gap-2.5 ${
            isCentered ? "justify-center" : ""
          }`}
        >
          <span className="h-0.5 w-6 bg-[#b99754]" />
          <span className="text-xs font-semibold tracking-wider uppercase text-[#92703b]">
            {eyebrow}
          </span>
          {isCentered && <span className="h-0.5 w-6 bg-[#b99754]" />}
        </div>
      )}

      <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-normal text-[#12243a]">
        {title}
        {italicTitle && (
          <span className="block font-sans font-medium text-lg sm:text-xl text-[#755725] mt-1.5 not-italic">
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
