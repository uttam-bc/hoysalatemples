"use client";

import React, { useId } from "react";
import { getKarnatakaBoundaryPath, projectCoordinates, defaultKarnatakaProjection } from "@/lib/map";
import { StarIcon } from "@/components/ui/StarIcon";

interface ConnectedLinkItem {
  targetLng: number;
  targetLat: number;
  type: "ring" | "cross";
  targetName: string;
}

interface MiniKarnatakaMapProps {
  currentLat: number;
  currentLng: number;
  templeName: string;
  town: string;
  connectedLinks: ConnectedLinkItem[];
}

export function MiniKarnatakaMap({
  currentLat,
  currentLng,
  templeName,
  town,
  connectedLinks,
}: MiniKarnatakaMapProps) {
  const filterId = useId();
  const glowId = `mini-glow-${filterId.replace(/:/g, "")}`;
  const boundaryPath = getKarnatakaBoundaryPath();

  const currentCoords = projectCoordinates(
    currentLng,
    currentLat,
    defaultKarnatakaProjection
  ) ?? [360, 480];

  return (
    <div className="w-full max-w-[280px] sm:max-w-[320px] mx-auto bg-[#10121a]/90 border border-[#2d3244] p-3 sm:p-4 rounded-sm shadow-xl flex flex-col items-center">
      <div className="w-full flex items-center justify-between pb-2 mb-2 border-b border-[#1c2030] text-[11px] font-serif uppercase tracking-widest text-[#9e9787]">
        <span>Karnataka Graph</span>
        <span className="text-[#b07512] flex items-center gap-1">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#e8c36a] animate-pulse" />
          Active Node
        </span>
      </div>

      <div className="relative w-full aspect-[3/4] max-h-[340px]">
        <svg
          viewBox="0 0 720 960"
          className="w-full h-full"
          role="img"
          aria-label={`Karnataka map showing position of ${templeName} in ${town} and connected sanctuaries`}
        >
          <defs>
            <filter id={glowId} x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Karnataka state boundary */}
          <path
            d={boundaryPath}
            fill="#141724"
            stroke="#2d3244"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Connected Graph Edges */}
          {connectedLinks.map((link, idx) => {
            const targetCoords = projectCoordinates(
              link.targetLng,
              link.targetLat,
              defaultKarnatakaProjection
            );
            if (!targetCoords) return null;

            const isRing = link.type === "ring";

            return (
              <g key={`${link.targetName}-${idx}`}>
                <line
                  x1={currentCoords[0]}
                  y1={currentCoords[1]}
                  x2={targetCoords[0]}
                  y2={targetCoords[1]}
                  stroke={isRing ? "#b07512" : "#9e9787"}
                  strokeWidth={isRing ? "2.5" : "1.5"}
                  strokeDasharray={isRing ? undefined : "4 3"}
                  strokeOpacity={isRing ? "0.75" : "0.5"}
                />
                {/* Neighbor node star */}
                <circle
                  cx={targetCoords[0]}
                  cy={targetCoords[1]}
                  r="5"
                  fill="#10121a"
                  stroke={isRing ? "#e8c36a" : "#9e9787"}
                  strokeWidth="1.5"
                />
              </g>
            );
          })}

          {/* Current Temple Node: glowing 8-point star */}
          <g transform={`translate(${currentCoords[0] - 14}, ${currentCoords[1] - 14})`}>
            {/* Halo pulse */}
            <circle
              cx="14"
              cy="14"
              r="22"
              fill="#b07512"
              opacity="0.25"
              filter={`url(#${glowId})`}
            />
            {/* 8-point Star */}
            <path
              d="M14 0 L16.1 9.8 L25.9 7.7 L19.6 14 L25.9 20.3 L16.1 18.2 L14 28 L11.9 18.2 L2.1 20.3 L8.4 14 L2.1 7.7 L11.9 9.8 Z"
              fill="#e8c36a"
              stroke="#0b0c12"
              strokeWidth="1"
            />
          </g>

          {/* Pin label */}
          <g transform={`translate(${currentCoords[0]}, ${currentCoords[1] + 28})`}>
            <rect
              x="-60"
              y="-12"
              width="120"
              height="24"
              rx="2"
              fill="#0b0c12"
              stroke="#b07512"
              strokeWidth="1"
              opacity="0.9"
            />
            <text
              x="0"
              y="3.5"
              textAnchor="middle"
              fill="#ede7de"
              fontSize="14"
              fontWeight="600"
              fontFamily="sans-serif"
            >
              {town}
            </text>
          </g>
        </svg>
      </div>

      <div className="w-full mt-2 pt-2 border-t border-[#1c2030] flex items-center justify-between text-[10px] text-[#9e9787]">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-0.5 bg-[#b07512]" />
          <span>Sacred Ring</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-0.5 border-t border-dashed border-[#9e9787]" />
          <span>Cross-link</span>
        </div>
      </div>
    </div>
  );
}
