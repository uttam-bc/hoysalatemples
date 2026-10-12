"use client";

import React from "react";
import type { TempleDetailData } from "@/lib/temple-data";
import { MiniKarnatakaMap } from "./MiniKarnatakaMap";
import { useLocale } from "@/lib/locale-context";

interface TempleSummarySectionProps {
  temple: TempleDetailData;
  connectedLinks: {
    targetLng: number;
    targetLat: number;
    type: "ring" | "cross";
    targetName: string;
  }[];
}

export function TempleSummarySection({
  temple,
  connectedLinks,
}: TempleSummarySectionProps) {
  const { isKannada } = useLocale();

  const displayText =
    isKannada && temple.summaryKannada
      ? temple.summaryKannada
      : temple.summary;

  const isFallbackEnglish = isKannada && !temple.summaryKannada;

  return (
    <section aria-label="Sanctuary overview" className="w-full mb-16 sm:mb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Summary Pull-Quote */}
          <div className="lg:col-span-8 space-y-6">
            <div className="relative pl-6 sm:pl-8 border-l-2 border-[#b07512]/80">
              {/* Decorative top quote mark */}
              <span
                className="absolute -top-6 -left-3 text-5xl font-serif text-[#b07512]/30 select-none pointer-events-none"
                aria-hidden="true"
              >
                “
              </span>

              {isFallbackEnglish && (
                <div className="mb-3">
                  <span className="inline-block px-2 py-0.5 text-[10px] uppercase font-serif tracking-wider bg-[#1f2333] border border-[#2d3244] text-[#e8c36a] rounded-xs">
                    English only / ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ಮಾತ್ರ
                  </span>
                </div>
              )}

              <p
                className={`text-xl sm:text-2xl lg:text-3xl font-serif text-[#ede7de] leading-relaxed italic drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] ${
                  isKannada && temple.summaryKannada ? "font-kannada not-italic" : ""
                }`}
              >
                {displayText}
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2 text-xs font-serif tracking-widest uppercase text-[#9e9787]">
              <span className="w-8 h-[1px] bg-[#2d3244]" />
              <span>
                {temple.town} · {temple.region} Region · {temple.century} Century
              </span>
            </div>
          </div>

          {/* Mini Karnataka Map */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <MiniKarnatakaMap
              currentLat={temple.lat}
              currentLng={temple.lng}
              templeName={temple.name}
              town={temple.town}
              connectedLinks={connectedLinks}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
