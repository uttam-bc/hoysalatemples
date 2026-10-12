"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import type { TempleDetailData } from "@/lib/temple-data";
import { computeRoute } from "@/lib/route";
import { RouteMap } from "./RouteMap";
import { StarIcon } from "@/components/ui/StarIcon";

interface RoutePlannerProps {
  temples: TempleDetailData[];
}

function RouteStepThumb({ url, name }: { url?: string; name: string }) {
  const resolveImageUrl = (u?: string) => {
    if (u && (u.startsWith("/") || u.startsWith("http://") || u.startsWith("https://"))) {
      return u;
    }
    return "/placeholders/temple-dusk-placeholder.svg";
  };

  const [src, setSrc] = useState(resolveImageUrl(url));

  useEffect(() => {
    setSrc(resolveImageUrl(url));
  }, [url]);

  return (
    <div className="relative w-16 h-16 shrink-0 rounded-xs overflow-hidden bg-[#0b0c12] border border-[#1f2333]">
      <Image
        src={src}
        alt={name}
        fill
        sizes="64px"
        unoptimized={src.startsWith("http")}
        onError={() => setSrc("/placeholders/temple-dusk-placeholder.svg")}
        className="object-cover"
      />
    </div>
  );
}

export function RoutePlanner({ temples }: RoutePlannerProps) {
  const searchParams = useSearchParams();

  // Extract initial parameters from URL query string if provided
  const initialStart = searchParams.get("start") || temples[0]?.slug || "chennakeshava-belur";
  const initialStops = Number(searchParams.get("stops")) || 4;
  const initialRegion = searchParams.get("region") || "all";

  const [startSlug, setStartSlug] = useState<string>(initialStart);
  const [stopCount, setStopCount] = useState<number>(
    Math.min(Math.max(initialStops, 3), 5)
  );
  const [regionFilter, setRegionFilter] = useState<string>(initialRegion);
  const [selectedRouteType, setSelectedRouteType] = useState<"primary" | "alternative">("primary");
  const [copiedState, setCopiedState] = useState<string | null>(null);

  // Available regions
  const availableRegions = useMemo(() => {
    const set = new Set(temples.map((t) => t.region));
    return ["all", ...Array.from(set).sort()];
  }, [temples]);

  // Compute route whenever options change
  const routeResult = useMemo(() => {
    return computeRoute(temples, {
      startSlug,
      stopCount,
      regionFilter: regionFilter === "all" ? null : regionFilter,
    });
  }, [temples, startSlug, stopCount, regionFilter]);

  const activePlan =
    selectedRouteType === "alternative" && routeResult.alternativeRoute
      ? routeResult.alternativeRoute
      : routeResult.primaryRoute;

  // Sync state with browser URL query string without full reload
  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    url.searchParams.set("start", startSlug);
    url.searchParams.set("stops", String(stopCount));
    url.searchParams.set("region", regionFilter);
    window.history.replaceState({}, "", url.toString());
  }, [startSlug, stopCount, regionFilter]);

  const resolveImageUrl = (url?: string) => {
    if (url && (url.startsWith("/") || url.startsWith("http://") || url.startsWith("https://"))) {
      return url;
    }
    return "/placeholders/temple-dusk-placeholder.svg";
  };

  // Copy route summary text to clipboard
  const handleCopySummary = () => {
    const lines = [
      `Hoysala Temple Pilgrimage Route (${activePlan.steps.length} Stops):`,
      ...activePlan.steps.map(
        (s) =>
          `Stop ${s.stopNumber}: ${s.temple.name} (${s.temple.town}) — ${
            s.stepDistanceKm > 0 ? `+${s.stepDistanceKm} km` : "Starting point"
          } [Total: ~${s.cumulativeDistanceKm} km approx road distance]`
      ),
      `Total Approximate Road Distance: ~${activePlan.totalDistanceKm} km`,
      `Directions: ${activePlan.googleMapsUrl}`,
    ];

    navigator.clipboard.writeText(lines.join("\n"));
    setCopiedState("summary");
    setTimeout(() => setCopiedState(null), 2500);
  };

  // Share URL to clipboard
  const handleShareUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedState("url");
    setTimeout(() => setCopiedState(null), 2500);
  };

  return (
    <div className="space-y-12">
      {/* Configuration Controls Bar */}
      <div className="bg-[#10121a] border border-[#2d3244] p-5 sm:p-7 rounded-sm shadow-xl">
        <div className="flex items-center gap-2 mb-4 text-xs font-serif uppercase tracking-widest text-[#b07512]">
          <StarIcon className="w-3.5 h-3.5 text-[#b07512]" />
          <span>Route Parameters</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 1. Start Sanctuary Selector */}
          <div>
            <label
              htmlFor="start-temple"
              className="block text-xs font-serif uppercase tracking-wider text-[#9e9787] mb-2"
            >
              Starting Sanctuary
            </label>
            <select
              id="start-temple"
              value={startSlug}
              onChange={(e) => setStartSlug(e.target.value)}
              className="w-full bg-[#0b0c12] border border-[#2d3244] text-[#ede7de] text-sm px-3.5 py-2.5 rounded-xs focus:outline-none focus:ring-1 focus:ring-[#b07512]"
            >
              {temples.map((t) => (
                <option key={t.slug} value={t.slug}>
                  {t.name} ({t.town})
                </option>
              ))}
            </select>
          </div>

          {/* 2. Number of Stops Selector (3, 4, 5) */}
          <div>
            <label className="block text-xs font-serif uppercase tracking-wider text-[#9e9787] mb-2">
              Number of Stops
            </label>
            <div className="flex gap-2">
              {[3, 4, 5].map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => setStopCount(count)}
                  className={`flex-1 py-2.5 text-xs font-serif uppercase tracking-wider rounded-xs border transition-colors ${
                    stopCount === count
                      ? "bg-[#b07512] text-[#0b0c12] font-semibold border-[#b07512] shadow"
                      : "bg-[#0b0c12] text-[#ede7de] border-[#2d3244] hover:bg-[#1a1e2e]"
                  }`}
                >
                  {count} Stops
                </button>
              ))}
            </div>
          </div>

          {/* 3. Optional Region Filter */}
          <div>
            <label
              htmlFor="region-filter"
              className="block text-xs font-serif uppercase tracking-wider text-[#9e9787] mb-2"
            >
              Region Focus
            </label>
            <select
              id="region-filter"
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="w-full bg-[#0b0c12] border border-[#2d3244] text-[#ede7de] text-sm px-3.5 py-2.5 rounded-xs focus:outline-none focus:ring-1 focus:ring-[#b07512]"
            >
              {availableRegions.map((reg) => (
                <option key={reg} value={reg}>
                  {reg === "all" ? "All Circuits & Regions" : `${reg} District`}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Route Alternative Switcher (if available) */}
        {routeResult.alternativeRoute && (
          <div className="mt-6 pt-5 border-t border-[#1c2030] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-serif uppercase tracking-wider text-[#9e9787]">
                Circuit Variant:
              </span>
              <button
                type="button"
                onClick={() => setSelectedRouteType("primary")}
                className={`px-3 py-1.5 text-xs font-serif uppercase tracking-wider rounded-xs border transition-colors ${
                  selectedRouteType === "primary"
                    ? "bg-[#1f2333] text-[#e8c36a] border-[#b07512]"
                    : "bg-[#0b0c12] text-[#9e9787] border-[#2d3244]"
                }`}
              >
                Recommended Path
              </button>
              <button
                type="button"
                onClick={() => setSelectedRouteType("alternative")}
                className={`px-3 py-1.5 text-xs font-serif uppercase tracking-wider rounded-xs border transition-colors ${
                  selectedRouteType === "alternative"
                    ? "bg-[#1f2333] text-[#e8c36a] border-[#b07512]"
                    : "bg-[#0b0c12] text-[#9e9787] border-[#2d3244]"
                }`}
              >
                Alternative Circuit
              </button>
            </div>

            <div className="text-xs text-[#9e9787] font-serif">
              Total Road Distance:{" "}
              <span className="text-[#e8c36a] font-mono font-semibold">
                ~{activePlan.totalDistanceKm} km
              </span>{" "}
              <span className="text-[11px] text-[#6b665c]">(approx road factor 1.3×)</span>
            </div>
          </div>
        )}
      </div>

      {/* Main Grid: Sequential Itinerary Cards + Map Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Step-by-Step Itinerary Column */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl sm:text-2xl font-serif text-[#ede7de]">
              Sequential Pilgrimage Itinerary
            </h2>
            <span className="text-xs font-mono text-[#e8c36a]">
              {activePlan.steps.length} Sanctuaries
            </span>
          </div>

          <div className="space-y-4">
            {activePlan.steps.map((step) => {
              const heroImg =
                step.temple.images.find((img) => img.isHero) ||
                step.temple.images[0];

              return (
                <div
                  key={step.temple.slug}
                  className="bg-[#10121a] border border-[#2d3244] hover:border-[#b07512]/60 p-4 sm:p-5 rounded-sm shadow-md transition-colors flex items-center justify-between gap-4 group"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    {/* Numbered Stop Badge */}
                    <div className="w-10 h-10 shrink-0 bg-[#0b0c12] border border-[#b07512] rounded-full flex items-center justify-center text-sm font-serif font-bold text-[#e8c36a] shadow">
                      {step.stopNumber}
                    </div>

                    {/* Thumbnail */}
                    <RouteStepThumb url={heroImg?.url} name={step.temple.name} />

                    {/* Temple Info */}
                    <div className="min-w-0">
                      <h3 className="text-base font-serif text-[#ede7de] group-hover:text-[#e8c36a] transition-colors truncate">
                        {step.temple.name}
                      </h3>
                      <p className="font-kannada text-xs text-[#9e9787] truncate">
                        {step.temple.nameKannada}
                      </p>
                      <p className="text-xs text-[#6b665c] font-serif uppercase tracking-wider mt-0.5">
                        {step.temple.town}, {step.temple.district}
                      </p>
                    </div>
                  </div>

                  {/* Leg distance & link */}
                  <div className="text-right shrink-0">
                    {step.stepDistanceKm > 0 ? (
                      <div>
                        <span className="text-xs font-mono font-medium text-[#e8c36a]">
                          +{step.stepDistanceKm} km
                        </span>
                        <div className="text-[10px] text-[#6b665c]">
                          cum. ~{step.cumulativeDistanceKm} km
                        </div>
                      </div>
                    ) : (
                      <span className="text-xs font-serif text-[#b07512] uppercase tracking-wider">
                        Start Point
                      </span>
                    )}

                    <Link
                      href={`/temples/${step.temple.slug}`}
                      className="text-[11px] text-[#9e9787] hover:text-[#e8c36a] font-serif underline decoration-[#2d3244] hover:decoration-[#e8c36a] block mt-1 transition-colors"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Buttons Toolbar */}
          <div className="pt-4 flex flex-wrap items-center gap-3">
            {activePlan.googleMapsUrl && (
              <a
                href={activePlan.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#b07512] hover:bg-[#c98616] text-[#0b0c12] font-serif font-semibold text-xs uppercase tracking-widest rounded-xs shadow flex items-center gap-2 transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
                <span>Open in Google Maps</span>
              </a>
            )}

            <button
              type="button"
              onClick={handleCopySummary}
              className="px-4 py-2.5 bg-[#10121a] hover:bg-[#1a1e2e] border border-[#2d3244] text-[#ede7de] font-serif text-xs uppercase tracking-wider rounded-xs transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4 text-[#b07512]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              <span>{copiedState === "summary" ? "Summary Copied!" : "Copy Itinerary"}</span>
            </button>

            <button
              type="button"
              onClick={handleShareUrl}
              className="px-4 py-2.5 bg-[#10121a] hover:bg-[#1a1e2e] border border-[#2d3244] text-[#ede7de] font-serif text-xs uppercase tracking-wider rounded-xs transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4 text-[#b07512]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
              <span>{copiedState === "url" ? "Link Copied!" : "Share Link"}</span>
            </button>
          </div>
        </div>

        {/* Map Visualization Column */}
        <div className="lg:col-span-5 flex justify-center">
          <RouteMap allTemples={temples} routeSteps={activePlan.steps} />
        </div>
      </div>
    </div>
  );
}
