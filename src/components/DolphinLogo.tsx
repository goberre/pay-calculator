type DolphinLogoProps = {
  size?: number;
  className?: string;
};

/** ehfrhfo.com brand mascot — cute dolphin with ₩ coin */
export default function DolphinLogo({ size = 48, className }: DolphinLogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      aria-hidden
    >
      <ellipse cx="32" cy="58" rx="20" ry="4" fill="#BAE6FD" opacity="0.55" />
      <circle cx="17" cy="54" r="2.8" fill="#7DD3FC" />
      <circle cx="32" cy="52" r="3.8" fill="#38BDF8" />
      <circle cx="47" cy="54" r="2.2" fill="#7DD3FC" />

      <path d="M11 38 Q3 32 7 24 Q13 30 15 34 Z" fill="#0284C7" />
      <path d="M11 42 Q3 48 9 52 Q15 46 13 40 Z" fill="#0369A1" />

      <ellipse cx="29" cy="36" rx="22" ry="14" fill="#0EA5E9" />
      <ellipse cx="27" cy="40" rx="16" ry="8" fill="#E0F2FE" />

      <path d="M25 24 Q29 15 33 21 Q29 26 25 24 Z" fill="#0284C7" />
      <ellipse cx="37" cy="44" rx="6" ry="3" fill="#0284C7" transform="rotate(-18 37 44)" />

      <ellipse cx="43" cy="30" rx="10" ry="9" fill="#0EA5E9" />
      <path d="M49 28 Q57 25 55 32 Q51 34 49 28 Z" fill="#0284C7" />

      <circle cx="41" cy="28" r="4.2" fill="#1E293B" />
      <circle cx="42.6" cy="26.4" r="1.6" fill="#FFFFFF" />
      <circle cx="47" cy="32" r="3" fill="#FDA4AF" opacity="0.55" />
      <path
        d="M45 34 Q49 36.5 52 34"
        stroke="#0369A1"
        strokeWidth="1.3"
        fill="none"
        strokeLinecap="round"
      />

      <circle cx="51" cy="42" r="8.5" fill="#FBBF24" />
      <circle cx="51" cy="42" r="6.8" fill="#F59E0B" />
      <text
        x="51"
        y="45.5"
        textAnchor="middle"
        fill="#92400E"
        fontFamily="system-ui,sans-serif"
        fontSize="9"
        fontWeight="700"
      >
        ₩
      </text>
    </svg>
  );
}
