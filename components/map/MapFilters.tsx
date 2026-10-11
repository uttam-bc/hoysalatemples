"use client";

import React from "react";

interface MapFiltersProps {
  selectedRegion: string | null;
  onSelectRegion: (region: string | null) => void;
  selectedCentury: string | null;
  onSelectCentury: (century: string | null) => void;
  onReset: () => void;
  activeCount: number;
  totalCount: number;
}

const REGIONS = [
  "Hassan",
  "Mysuru",
  "Tumakuru",
  "Chikkamagaluru",
  "Mandya",
  "Shivamogga",
];

const CENTURIES = ["12th", "13th"];

export function MapFilters({
  selectedRegion,
  onSelectRegion,
  selectedCentury,
  onSelectCentury,
  onReset,
  activeCount,
  totalCount,
}: MapFiltersProps) {
  const hasActiveFilter = Boolean(selectedRegion || selectedCentury);

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-4 px-4 py-6">
      {/* Regions and Centuries container */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="label-caps text-soapstone-300 mr-2 text-xs">Region:</span>
        {REGIONS.map((region) => {
          const isActive = selectedRegion === region;
          return (
            <button
              key={region}
              type="button"
              onClick={() => onSelectRegion(isActive ? null : region)}
              className={`rounded-sm px-3 py-1 text-xs font-medium tracking-wider transition-all duration-200 border ${
                isActive
                  ? "bg-lamp-500 text-night-950 border-lamp-400 font-semibold shadow-[0_0_12px_rgba(234,179,8,0.4)]"
                  : "bg-night-900/80 text-soapstone-200 border-soapstone-800/80 hover:border-lamp-500/60 hover:text-lamp-300"
              }`}
              aria-pressed={isActive}
            >
              {region}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="label-caps text-soapstone-300 mr-2 text-xs">Century:</span>
        {CENTURIES.map((century) => {
          const isActive = selectedCentury === century;
          return (
            <button
              key={century}
              type="button"
              onClick={() => onSelectCentury(isActive ? null : century)}
              className={`rounded-sm px-3 py-1 text-xs font-medium tracking-wider transition-all duration-200 border ${
                isActive
                  ? "bg-lamp-500 text-night-950 border-lamp-400 font-semibold shadow-[0_0_12px_rgba(234,179,8,0.4)]"
                  : "bg-night-900/80 text-soapstone-200 border-soapstone-800/80 hover:border-lamp-500/60 hover:text-lamp-300"
              }`}
              aria-pressed={isActive}
            >
              {century} Century
            </button>
          );
        })}

        {hasActiveFilter ? (
          <button
            type="button"
            onClick={onReset}
            className="ml-3 rounded-sm border border-lamp-600/40 bg-night-950/90 px-3 py-1 text-xs font-medium tracking-wider text-lamp-400 hover:border-lamp-400 hover:text-lamp-300 hover:bg-night-900 transition-colors"
          >
            Reset Filters
          </button>
        ) : null}
      </div>

      <div className="text-xs text-soapstone-400 font-mono">
        Showing <span className="text-lamp-400 font-semibold">{activeCount}</span> of {totalCount} sanctuaries
        {hasActiveFilter ? " (non-matching sanctuaries dimmed)" : ""}
      </div>
    </div>
  );
}
