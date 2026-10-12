import React from "react";
import { StarIcon } from "@/components/ui/StarIcon";

interface IconProps {
  className?: string;
  title?: string;
}

/** Stellate ground plan motif icon (8-pointed / 16-pointed stellate vimana profile) */
export function StarPlanIcon({ className = "w-6 h-6", title }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title && <title>{title}</title>}
      {/* Outer stellate perimeter outline */}
      <path
        d="M24 3 L27.5 12 L36.5 7.5 L34 17 L43.5 18 L38 26 L46 31 L37 35 L40.5 44 L31 41 L28.5 50 L24 43 L19.5 50 L17 41 L7.5 44 L11 35 L2 31 L10 26 L4.5 18 L14 17 L11.5 7.5 L20.5 12 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      {/* Inner sanctum chamber */}
      <rect
        x="18"
        y="18"
        width="12"
        height="12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* Central linga / deity pedestal */}
      <circle cx="24" cy="24" r="2.5" fill="currentColor" />
    </svg>
  );
}

/** Tiered narrative frieze motif icon (horizontal sculpted bands) */
export function FriezeIcon({ className = "w-6 h-6", title }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title && <title>{title}</title>}
      {/* Horizontal masonry tiers */}
      <line x1="4" y1="8" x2="44" y2="8" stroke="currentColor" strokeWidth="2" />
      <line x1="4" y1="18" x2="44" y2="18" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
      <line x1="4" y1="28" x2="44" y2="28" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 2" />
      <line x1="4" y1="38" x2="44" y2="38" stroke="currentColor" strokeWidth="2" />
      {/* Rhythmic carved wave relief in central tier */}
      <path
        d="M6 23 Q 10 19, 14 23 T 22 23 T 30 23 T 38 23 T 42 23"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      {/* Marching animal/elephant relief motif indications in lower tier */}
      <rect x="8" y="31" width="5" height="4" rx="1" fill="currentColor" opacity="0.85" />
      <rect x="17" y="31" width="5" height="4" rx="1" fill="currentColor" opacity="0.85" />
      <rect x="26" y="31" width="5" height="4" rx="1" fill="currentColor" opacity="0.85" />
      <rect x="35" y="31" width="5" height="4" rx="1" fill="currentColor" opacity="0.85" />
    </svg>
  );
}

/** Madanika / Salabhanjika sculpted bracket damsel motif icon */
export function MadanikaIcon({ className = "w-6 h-6", title }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title && <title>{title}</title>}
      {/* Angled bracket beam */}
      <path
        d="M10 8 L38 8 L38 14 L18 38 L12 38 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Stylized tribhanga (three-bend pose) dancer figure */}
      <circle cx="27" cy="18" r="3" fill="currentColor" />
      <path
        d="M27 21 C 24 25, 29 28, 25 35"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Raised arm holding foliage / mirror */}
      <path
        d="M26 23 C 28 20, 33 21, 33 17"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Lower supporting torana base */}
      <path d="M10 38 L22 38" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

/** Lathe-turned bell pillar motif icon with moulded circular rings */
export function LathePillarIcon({ className = "w-6 h-6", title }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title && <title>{title}</title>}
      {/* Capital / Abacus plate */}
      <line x1="12" y1="6" x2="36" y2="6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="15" y1="10" x2="33" y2="10" stroke="currentColor" strokeWidth="1.5" />
      {/* Bulbous bell-shaped moulding */}
      <path
        d="M18 10 C 18 16, 30 16, 30 10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      {/* Ring disc mouldings */}
      <ellipse cx="24" cy="19" rx="8" ry="2.2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <ellipse cx="24" cy="24" rx="9.5" ry="2.5" fill="none" stroke="currentColor" strokeWidth="1.75" />
      <ellipse cx="24" cy="29" rx="8" ry="2.2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      {/* Shaft and base */}
      <line x1="20" y1="31" x2="20" y2="39" stroke="currentColor" strokeWidth="1.5" />
      <line x1="28" y1="31" x2="28" y2="39" stroke="currentColor" strokeWidth="1.5" />
      {/* Chiseled plinth base */}
      <rect x="14" y="39" width="20" height="4" rx="0.5" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

/**
 * Automatically selects the appropriate architectural motif icon based on highlight keywords.
 * Defaults to the 8-point stellate StarIcon when no specific motif matches.
 */
export function ArchitecturalMotifIcon({
  text,
  className = "w-6 h-6",
}: {
  text: string;
  className?: string;
}) {
  const lower = text.toLowerCase();

  if (
    lower.includes("star") ||
    lower.includes("stellate") ||
    lower.includes("vimana") ||
    lower.includes("plan") ||
    lower.includes("shrine") ||
    lower.includes("jagati")
  ) {
    return <StarPlanIcon className={className} title="Stellate plan motif" />;
  }

  if (
    lower.includes("frieze") ||
    lower.includes("band") ||
    lower.includes("relief") ||
    lower.includes("elephant") ||
    lower.includes("sculpture") ||
    lower.includes("animal")
  ) {
    return <FriezeIcon className={className} title="Tiered frieze motif" />;
  }

  if (
    lower.includes("madanika") ||
    lower.includes("bracket") ||
    lower.includes("salabhanjika") ||
    lower.includes("figure") ||
    lower.includes("sculptor")
  ) {
    return <MadanikaIcon className={className} title="Madanika bracket motif" />;
  }

  if (
    lower.includes("pillar") ||
    lower.includes("lathe") ||
    lower.includes("column") ||
    lower.includes("navaranga") ||
    lower.includes("moulding")
  ) {
    return <LathePillarIcon className={className} title="Lathe-turned pillar motif" />;
  }

  // Generic star fallback
  return <StarIcon className={className} title="Architectural highlight" />;
}
