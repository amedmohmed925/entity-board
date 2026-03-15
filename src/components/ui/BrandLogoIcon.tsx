type BrandLogoIconProps = {
  className?: string;
};

export function BrandLogoIcon({ className = 'h-10 w-10' }: BrandLogoIconProps) {
  return (
    <svg
      viewBox="0 0 128 128"
      className={className}
      role="img"
      aria-label="Kayan Board logo"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="kayan-logo-glow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#6BA8FF" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#1B35FF" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="kayan-logo-face" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2958FF" />
          <stop offset="100%" stopColor="#152BDF" />
        </linearGradient>
      </defs>

      <circle cx="64" cy="64" r="62" fill="url(#kayan-logo-glow)" />

      <rect
        x="18"
        y="18"
        width="92"
        height="92"
        rx="28"
        fill="url(#kayan-logo-face)"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="1.5"
      />

      <path
        d="M36 81 L55 63 L70 75 L94 49"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle cx="36" cy="81" r="4.5" fill="#FFFFFF" />
      <circle cx="55" cy="63" r="4.5" fill="#FFFFFF" />
      <circle cx="70" cy="75" r="4.5" fill="#FFFFFF" />
      <circle cx="94" cy="49" r="4.5" fill="#FFFFFF" />

      <path d="M40 38v8M36 42h8" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
      <path d="M52 32v6M49 35h6" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
