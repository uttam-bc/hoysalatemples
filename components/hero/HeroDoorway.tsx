"use client";

import type { MotionValue } from "framer-motion";
import type { Ref } from "react";

type HeroDoorwayProps = {
  simplified: boolean;
  leftX?: MotionValue<number> | number;
  rightX?: MotionValue<number> | number;
  archY?: MotionValue<number> | number;
  holeRef: Ref<SVGGElement>;
};

/**
 * Authentic Hoysala temple entrance facade.
 * Uses the user's carved doorway artwork with an 8-point stellate reveal aperture
 * cut directly into the central sanctum door.
 */
export function HeroDoorway({ simplified, holeRef }: HeroDoorwayProps) {
  return (
    <svg
      viewBox="0 0 1200 900"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden
    >
      <defs>
        {/* Dusk atmospheric vignette to blend image with night background */}
        <radialGradient id="facade-vignette" cx="50%" cy="53.5%" r="65%">
          <stop offset="30%" stopColor="#000000" stopOpacity="0" />
          <stop offset="70%" stopColor="#0b0c12" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#0b0c12" stopOpacity="0.85" />
        </radialGradient>

        <linearGradient id="top-bottom-blend" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0b0c12" stopOpacity="0.85" />
          <stop offset="16%" stopColor="#0b0c12" stopOpacity="0.35" />
          <stop offset="38%" stopColor="#0b0c12" stopOpacity="0" />
          <stop offset="82%" stopColor="#0b0c12" stopOpacity="0" />
          <stop offset="100%" stopColor="#0b0c12" stopOpacity="0.75" />
        </linearGradient>

        {/* 8-point star aperture, centroid at 0,0 */}
        <path
          id="star8"
          d="M0 -14.5 L2.4 -4.8 L12.5 -6.9 L5.2 0 L12.5 6.9 L2.4 4.8 L0 14.5 L-2.4 4.8 L-12.5 6.9 L-5.2 0 L-12.5 -6.9 L-2.4 -4.8 Z"
        />

        {/* Expanding stellate mask on the door: white = visible facade, black = aperture cutout */}
        <mask id="star-window" maskUnits="userSpaceOnUse">
          <rect width="1200" height="900" fill="white" />
          <g ref={holeRef} transform="translate(600 480) scale(4.2)">
            <use href="#star8" fill="black" />
          </g>
        </mask>

        {/* Warm lamp rim glow filter */}
        <filter id="rim-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* 1. Temple Entrance Facade Image with expanding stellate door aperture */}
      <image
        href="/hoysala-temple-entrance.png"
        x="0"
        y="0"
        width="1200"
        height="900"
        preserveAspectRatio="xMidYMid slice"
        mask="url(#star-window)"
      />

      {/* 2. Soapstone dusk tone and ambient vignetting */}
      <rect
        width="1200"
        height="900"
        fill="url(#facade-vignette)"
        mask="url(#star-window)"
        pointerEvents="none"
      />
      <rect
        width="1200"
        height="900"
        fill="url(#top-bottom-blend)"
        mask="url(#star-window)"
        pointerEvents="none"
      />

      {/* 3. Warm ochre sanctum threshold rim accent */}
      {!simplified ? (
        <circle
          cx="600"
          cy="480"
          r="42"
          fill="none"
          stroke="#e8c36a"
          strokeWidth="1.2"
          strokeOpacity="0.4"
          filter="url(#rim-glow)"
          pointerEvents="none"
        />
      ) : null}
    </svg>
  );
}
