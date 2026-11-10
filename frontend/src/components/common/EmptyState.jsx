export default function EmptyState({
  title = "No results found",
  description = "Try adjusting your search terms or filter selections.",
  onReset,
  resetLabel = "Clear filters"
}) {
  return (
    <div className="rounded-2xl border border-dashed border-[#E5E0D5] bg-white/60 p-10 text-center sm:p-14">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#f7f5f0] text-slate-400">
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      <h3 className="mt-4 font-serif text-lg font-bold text-[#14283F]">
        {title}
      </h3>

      <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500">
        {description}
      </p>

      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="mt-5 inline-flex items-center rounded-xl bg-[#14283F] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#1f3c5f]"
        >
          {resetLabel}
        </button>
      )}
    </div>
  );
}

