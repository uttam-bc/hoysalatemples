"use client";

import React from "react";
import Link from "next/link";
import type { MapTemple } from "./types";

interface TempleListFallbackProps {
  temples: MapTemple[];
  selectedSlug: string | null;
  onSelectTemple: (temple: MapTemple) => void;
}

export function TempleListFallback({
  temples,
  selectedSlug,
  onSelectTemple,
}: TempleListFallbackProps) {
  // Sort in ring order (1 to 13)
  const sortedTemples = [...temples].sort((a, b) => a.ringOrder - b.ringOrder);

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 px-4">
      <div className="flex items-center justify-between pb-3 border-b border-soapstone-800">
        <div>
          <h3 className="font-display text-xl font-semibold tracking-wide text-bone">
            The Sacred Ring Itinerary
          </h3>
          <p className="font-kannada text-xs text-soapstone-400 mt-0.5">
            ಪವಿತ್ರ ವಲಯ ಯಾತ್ರಾ ಪಟ್ಟಿ
          </p>
        </div>
        <span className="text-xs font-mono text-lamp-400">
          13 Sanctuaries in Closed Ring
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[480px] overflow-y-auto pr-2 scrollbar-thin">
        {sortedTemples.map((temple) => {
          const isSelected = selectedSlug === temple.slug;
          return (
            <div
              key={temple.id}
              onClick={() => onSelectTemple(temple)}
              className={`group flex items-start gap-3 rounded-md border p-3 transition-all cursor-pointer ${
                isSelected
                  ? "border-lamp-500 bg-night-900/90 shadow-[0_0_16px_rgba(234,179,8,0.2)]"
                  : "border-soapstone-800/80 bg-night-950/70 hover:border-soapstone-700 hover:bg-night-900/50"
              }`}
            >
              {/* Ring Order Badge */}
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded border border-lamp-600/40 bg-lamp-500/10 font-mono text-xs font-semibold text-lamp-400">
                #{temple.ringOrder}
              </div>

              {/* Temple Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h4 className="font-display text-sm font-semibold text-bone group-hover:text-lamp-300 truncate">
                    {temple.name}
                  </h4>
                  <span className="shrink-0 text-[10px] font-mono text-soapstone-400">
                    {temple.yearBuilt}
                  </span>
                </div>

                <p className="font-kannada text-xs text-soapstone-300 mt-0.5">
                  {temple.nameKannada}
                </p>

                <div className="mt-1 flex items-center justify-between text-[11px] text-soapstone-400">
                  <span>
                    {temple.town}, {temple.district}
                  </span>
                  <Link
                    href={`/temples/${temple.slug}`}
                    className="inline-flex items-center gap-1 text-lamp-400 hover:text-lamp-300 hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>View</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
