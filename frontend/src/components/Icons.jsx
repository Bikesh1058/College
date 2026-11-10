const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export function ArrowRightIcon({ className = "h-4 w-4" }) {
  return (
    <svg {...iconProps} className={className}>
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

export function ArrowLeftIcon({ className = "h-4 w-4" }) {
  return (
    <svg {...iconProps} className={className}>
      <path d="M19 12H5m6 6-6-6 6-6" />
    </svg>
  );
}

export function ArrowUpIcon({ className = "h-4 w-4" }) {
  return (
    <svg {...iconProps} className={className}>
      <path d="M12 19V5m-6 6 6-6 6 6" />
    </svg>
  );
}

export function ExternalLinkIcon({ className = "h-4 w-4" }) {
  return (
    <svg {...iconProps} className={className}>
      <path d="M14 5h5v5m0-5L10 14" />
      <path d="M19 14v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4" />
    </svg>
  );
}
