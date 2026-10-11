"use client";

import React from "react";
import type { MapTemple } from "./types";
import { StarIcon } from "@/components/ui/StarIcon";

interface TempleTooltipProps {
  temple: MapTemple;
  svgX: number;
  svgY: number;
  mapWidth: number;
  mapHeight: number;
  onVisit: (slug: string) => void;
}

export function TempleTooltip({
  temple,
  svgX,
  svgY,
  mapWidth,
  mapHeight,
  onVisit,
}: TempleTooltipProps) {
  // Determine smart positioning to avoid clipping at SVG boundaries
  const isRightSide = svgX > mapWidth * 0.58;
  const isBottom = svgY > mapHeight * 0.72;

  // Percentage positions inside relative map container
  const leftPct = (svgX / mapWidth) * 100;
  const topPct = (svgY / mapHeight) * 100;

  return (
    <div
      role="tooltip"
      aria-live="polite"
      className="pointer-events-auto absolute z-30 transition-transform duration-200 ease-out"
      style={{
        left: `${leftPct}%`,
        top: `${topPct}%`,
        transform: `translate(${isRightSide ? "-105%" : "15px"}, ${
          isBottom ? "-105%" : "15px"
        })`,
      }}
    >
      <div className="w-72 sm:w-80 rounded-md border border-lamp-500/50 bg-night-950/95 p-4 shadow-[0_12px_36px_rgba(0,0,0,0.85),0_0_24px_rgba(217,169,78,0.2)] backdrop-blur-md">
        {/* Header row with Tour badge */}
        <div className="flex items-center justify-between pb-2 border-b border-soapstone-800/80">
          <span className="flex items-center gap-1.5 text-[11px] font-mono tracking-wider text-lamp-400">
            <StarIcon className="h-3 w-3 text-lamp-400" />
            Tour Stop #{temple.ringOrder}
          </span>
          <span className="rounded bg-soapstone-900 px-2 py-0.5 text-[10px] font-medium text-soapstone-300 border border-soapstone-800">
            {temple.century} Century
          </span>
        </div>

        {/* Temple Names */}
        <div className="mt-3">
          <h3 className="font-display text-lg font-semibold tracking-wide text-bone leading-tight">
            {temple.name}
          </h3>
          <p className="font-kannada text-sm font-medium text-soapstone-300 mt-0.5">
            {temple.nameKannada}
          </p>
        </div>

        {/* Location & Built Year */}
        <div className="mt-3 flex flex-col gap-1 text-xs text-soapstone-300">
          <div className="flex items-center justify-between">
            <span className="text-soapstone-400">Location:</span>
            <span className="font-medium text-bone">
              {temple.town}, {temple.district}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-soapstone-400">Consecrated:</span>
            <span className="font-medium text-lamp-300">{temple.yearBuilt}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-soapstone-400">Presiding Deity:</span>
            <span className="font-medium text-bone truncate max-w-[170px]" title={temple.deity}>
              {temple.deity}
            </span>
          </div>
        </div>

        {/* Call to action button */}
        <button
          type="button"
          onClick={() => onVisit(temple.slug)}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded border border-lamp-500/70 bg-lamp-500/10 py-2 text-xs font-semibold uppercase tracking-wider text-lamp-300 transition-colors hover:bg-lamp-500 hover:text-night-950 focus:outline-none focus:ring-2 focus:ring-lamp-400"
        >
          <span>Explore Sanctuary</span>
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
