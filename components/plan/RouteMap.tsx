"use client";

import React, { useId } from "react";
import { getKarnatakaBoundaryPath, projectCoordinates, defaultKarnatakaProjection } from "@/lib/map";
import type { RouteStep } from "@/lib/route";
import type { TempleDetailData } from "@/lib/temple-data";

interface RouteMapProps {
  allTemples: TempleDetailData[];
  routeSteps: RouteStep[];
}

export function RouteMap({ allTemples, routeSteps }: RouteMapProps) {
  const filterId = useId();
  const glowId = `route-glow-${filterId.replace(/:/g, "")}`;
  const boundaryPath = getKarnatakaBoundaryPath();

  // Project route points into SVG coordinate space
  const projectedSteps = routeSteps
    .map((step) => {
      const coords = projectCoordinates(
        step.temple.lng,
        step.temple.lat,
        defaultKarnatakaProjection
      );
      return coords ? { ...step, x: coords[0], y: coords[1] } : null;
    })
    .filter((s): s is NonNullable<typeof s> => s !== null);

  // Generate SVG path string through the ordered waypoints
  const pathD =
    projectedSteps.length > 1
      ? projectedSteps.reduce(
          (acc, step, i) => `${acc} ${i === 0 ? "M" : "L"} ${step.x} ${step.y}`,
          ""
        )
      : "";

  return (
    <div className="w-full bg-[#10121a] border border-[#2d3244] p-4 sm:p-6 rounded-sm shadow-xl flex flex-col items-center">
      <div className="w-full flex items-center justify-between pb-3 mb-2 border-b border-[#1c2030] text-xs font-serif uppercase tracking-widest text-[#9e9787]">
        <span>Karnataka Pilgrimage Circuit</span>
        <span className="text-[#b07512] font-mono">
          {routeSteps.length} Sequential Stops
        </span>
      </div>

      <div className="relative w-full aspect-[3/4] max-h-[500px]">
        <svg
          viewBox="0 0 720 960"
          className="w-full h-full select-none"
          role="img"
          aria-label="Karnataka state map showing numbered sequence of planned temple stops"
        >
          <defs>
            <filter id={glowId} x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* State Boundary */}
          <path
            d={boundaryPath}
            fill="#141724"
            stroke="#2d3244"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Other Temples in network (dimmed small circles) */}
          {allTemples.map((temple) => {
            const coords = projectCoordinates(
              temple.lng,
              temple.lat,
              defaultKarnatakaProjection
            );
            if (!coords) return null;
            const isSelected = routeSteps.some((s) => s.temple.slug === temple.slug);
            if (isSelected) return null;

            return (
              <circle
                key={temple.slug}
                cx={coords[0]}
                cy={coords[1]}
                r="3.5"
                fill="#252a3b"
                stroke="#10121a"
                strokeWidth="1"
                opacity="0.6"
              />
            );
          })}

          {/* Planned Route Travel Path */}
          {pathD && (
            <path
              d={pathD}
              fill="none"
              stroke="#b07512"
              strokeWidth="3.5"
              strokeDasharray="8 6"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.9"
            />
          )}

          {/* Numbered Stops (Stellate badges) */}
          {projectedSteps.map((step) => (
            <g
              key={step.temple.slug}
              transform={`translate(${step.x}, ${step.y})`}
            >
              {/* Outer Glow Halo */}
              <circle
                cx="0"
                cy="0"
                r="22"
                fill="#b07512"
                opacity="0.25"
                filter={`url(#${glowId})`}
              />

              {/* 8-point Stellate Star badge */}
              <path
                d="M0 -15 L3.5 -5 L14 -3 L6 4 L8 14 L0 8 L-8 14 L-6 4 L-14 -3 L-3.5 -5 Z"
                fill="#e8c36a"
                stroke="#0b0c12"
                strokeWidth="1.5"
              />

              {/* Stop Number in center */}
              <text
                x="0"
                y="3.5"
                textAnchor="middle"
                fill="#0b0c12"
                fontSize="11"
                fontWeight="bold"
                fontFamily="sans-serif"
              >
                {step.stopNumber}
              </text>

              {/* Town Label Banner */}
              <g transform="translate(0, 24)">
                <rect
                  x="-45"
                  y="-10"
                  width="90"
                  height="20"
                  rx="2"
                  fill="#0b0c12"
                  stroke="#b07512"
                  strokeWidth="1"
                  opacity="0.95"
                />
                <text
                  x="0"
                  y="4"
                  textAnchor="middle"
                  fill="#ede7de"
                  fontSize="11"
                  fontWeight="600"
                  fontFamily="sans-serif"
                >
                  {step.temple.town}
                </text>
              </g>
            </g>
          ))}
        </svg>
      </div>

      <div className="w-full mt-3 pt-3 border-t border-[#1c2030] flex items-center justify-between text-[11px] text-[#9e9787]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-0.5 border-t-2 border-dashed border-[#b07512]" />
          <span>Itinerary Path</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#e8c36a]" />
          <span>Numbered Stops</span>
        </div>
      </div>
    </div>
  );
}
