export function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Flight trail */}
      <path
        d="M6 32C10 30 14 31 18 28C22 25 24 22 26 22"
        stroke="#93c5fd"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="2 3"
        opacity="0.7"
      />

      {/* Paper airplane body */}
      <path
        d="M42 12L18 24L22 28L42 12Z"
        fill="#3b82f6"
      />
      <path
        d="M42 12L22 28L24 36L42 12Z"
        fill="#2563eb"
      />
      <path
        d="M42 12L18 24L14 20L42 12Z"
        fill="#60a5fa"
      />

      {/* Highlight */}
      <path
        d="M42 12L28 20L24 18L42 12Z"
        fill="#93c5fd"
        opacity="0.5"
      />
    </svg>
  );
}
