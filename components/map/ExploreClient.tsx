"use client";

import React, { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import type { ExploreData, MapTemple } from "./types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StarIcon } from "@/components/ui/StarIcon";
import { MapFilters } from "./MapFilters";
import { ExploreMap } from "./ExploreMap";
import { TempleListFallback } from "./TempleListFallback";

// Dynamically import LeafletMap with SSR disabled
const LeafletMap = dynamic(
  () => import("./LeafletMap").then((mod) => mod.LeafletMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[540px] sm:h-[640px] w-full items-center justify-center rounded-lg border border-soapstone-800 bg-night-950 text-soapstone-400">
        <span className="font-mono text-xs text-lamp-400 animate-pulse">
          Loading OpenStreetMap Leaflet tiles...
        </span>
      </div>
    ),
  }
);

interface ExploreClientProps {
  data: ExploreData;
}

export function ExploreClient({ data }: ExploreClientProps) {
  const { temples, links } = data;

  const [viewMode, setViewMode] = useState<"leaflet" | "svg">("leaflet");
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedCentury, setSelectedCentury] = useState<string | null>(null);
  const [selectedTemple, setSelectedTemple] = useState<MapTemple | null>(null);

  const activeCount = useMemo(() => {
    return temples.filter((t) => {
      if (selectedRegion && t.region !== selectedRegion) return false;
      if (selectedCentury && t.century !== selectedCentury) return false;
      return true;
    }).length;
  }, [temples, selectedRegion, selectedCentury]);

  const handleReset = () => {
    setSelectedRegion(null);
    setSelectedCentury(null);
  };

  return (
    <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      {/* 1. Heading & Stellate Divider */}
      <div className="mb-8">
        <SectionHeading
          eyebrow="Sacred Cartography"
          title="Explore"
          kannada="ಅನ್ವೇಷಿಸಿ"
        />
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm sm:text-base text-soapstone-300 leading-relaxed">
          Trace the thirteenth-century soapstone shrines across Karnataka. An
          unbroken closed ring links all thirteen sanctuaries in geographical
          sequence, interwoven with radial cross-pilgrimage connections.
        </p>
      </div>

      {/* 2. Map Mode Toggle & Legend Row */}
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* View Mode Switcher */}
        <div className="inline-flex rounded border border-soapstone-800 bg-night-900/90 p-1">
          <button
            type="button"
            onClick={() => setViewMode("leaflet")}
            className={`rounded px-3 py-1 text-xs font-semibold tracking-wider transition-colors ${
              viewMode === "leaflet"
                ? "bg-lamp-500 text-night-950 font-bold shadow-[0_0_8px_rgba(234,179,8,0.4)]"
                : "text-soapstone-300 hover:text-lamp-300"
            }`}
          >
            Real Map (Leaflet)
          </button>
          <button
            type="button"
            onClick={() => setViewMode("svg")}
            className={`rounded px-3 py-1 text-xs font-semibold tracking-wider transition-colors ${
              viewMode === "svg"
                ? "bg-lamp-500 text-night-950 font-bold shadow-[0_0_8px_rgba(234,179,8,0.4)]"
                : "text-soapstone-300 hover:text-lamp-300"
            }`}
          >
            Stone Silhouette (SVG)
          </button>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-5 rounded-md border border-soapstone-800/60 bg-night-900/60 px-4 py-2 text-xs backdrop-blur-sm">
          <div className="flex items-center gap-1.5">
            <StarIcon className="h-3.5 w-3.5 text-lamp-400" />
            <span className="text-soapstone-200">Sanctuary</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-0.5 w-5 rounded bg-lamp-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
            <span className="text-soapstone-200">Sacred Ring</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-0.5 w-5 border-b border-dashed border-soapstone-300" />
            <span className="text-soapstone-300">Cross-Links</span>
          </div>
        </div>
      </div>

      {/* 3. Region & Century Filter Controls */}
      <MapFilters
        selectedRegion={selectedRegion}
        onSelectRegion={setSelectedRegion}
        selectedCentury={selectedCentury}
        onSelectCentury={setSelectedCentury}
        onReset={handleReset}
        activeCount={activeCount}
        totalCount={temples.length}
      />

      {/* 4. Active Map View */}
      <div className="mt-6">
        {viewMode === "leaflet" ? (
          <LeafletMap
            temples={temples}
            links={links}
            selectedRegion={selectedRegion}
            selectedCentury={selectedCentury}
            selectedTempleSlug={selectedTemple?.slug ?? null}
            onSelectTemple={setSelectedTemple}
          />
        ) : (
          <ExploreMap
            temples={temples}
            links={links}
            selectedRegion={selectedRegion}
            selectedCentury={selectedCentury}
            selectedTempleSlug={selectedTemple?.slug ?? null}
            onSelectTemple={setSelectedTemple}
          />
        )}
      </div>

      {/* 5. Mobile & Keyboard List Fallback */}
      <TempleListFallback
        temples={temples}
        selectedSlug={selectedTemple?.slug ?? null}
        onSelectTemple={setSelectedTemple}
      />
    </div>
  );
}
