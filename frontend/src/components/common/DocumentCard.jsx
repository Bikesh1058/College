export default function DocumentCard({
  title,
  category,
  date,
  fileType = "PDF",
  fileSize,
  description,
  downloadUrl = "#",
  onDownload
}) {
  return (
    <div className="group flex flex-col justify-between rounded-2xl border border-[#E5E0D5] bg-white p-5 transition hover:border-[#C6A66B] hover:shadow-md">
      <div>
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center rounded-md bg-[#dfbd77]/20 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-[#99733A]">
            {fileType} {fileSize ? `/ ${fileSize}` : ""}
          </span>
          {category && (
            <span className="text-xs font-semibold text-slate-500">
              {category}
            </span>
          )}
        </div>

        <h3 className="mt-3 font-serif text-base sm:text-lg font-bold text-[#14283F] group-hover:text-[#99733A] transition">
          {title}
        </h3>

        {description && (
          <p className="mt-2 text-sm leading-relaxed text-slate-600 line-clamp-2">
            {description}
          </p>
        )}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
        <span className="text-slate-400">
          {date ? `Published: ${date}` : "Available for download"}
        </span>

        {onDownload ? (
          <button
            type="button"
            onClick={onDownload}
            className="inline-flex items-center gap-1.5 font-semibold text-[#14283F] group-hover:text-[#99733A]"
          >
            <span>Download</span>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
        ) : (
          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-semibold text-[#14283F] group-hover:text-[#99733A]"
          >
            <span>Download</span>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}

