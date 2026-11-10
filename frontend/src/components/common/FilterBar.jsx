export default function FilterBar({
  options = [],
  activeOption,
  onChange,
  className = ""
}) {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {options.map((option) => {
        const value = typeof option === "string" ? option : option.value;
        const label = typeof option === "string" ? option : option.label;
        const count = typeof option === "object" ? option.count : undefined;
        const isActive = activeOption === value;

        return (
          <button
            key={value}
            type="button"
            onClick={() => onChange(value)}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
              isActive
                ? "bg-[#14283F] text-white shadow-sm"
                : "border border-[#E5E0D5] bg-white text-slate-700 hover:border-[#C6A66B] hover:text-[#99733A]"
            }`}
          >
            <span>{label}</span>
            {count !== undefined && (
              <span
                className={`ml-1 rounded-full px-1.5 py-0.2 text-[10px] ${
                  isActive
                    ? "bg-[#dfbd77] text-[#14283F]"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

