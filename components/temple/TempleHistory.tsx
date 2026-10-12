"use client";

import React from "react";
import { StarIcon } from "@/components/ui/StarIcon";
import { useLocale } from "@/lib/locale-context";

interface TempleHistoryProps {
  history: string;
  historyKannada?: string | null;
  templeName: string;
}

export function TempleHistory({
  history,
  historyKannada,
  templeName,
}: TempleHistoryProps) {
  const { isKannada } = useLocale();

  const activeText =
    isKannada && historyKannada ? historyKannada : history;

  const isFallbackEnglish = isKannada && !historyKannada;

  // Format paragraphs by double newline if present
  const paragraphs = activeText
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  const firstParagraph = paragraphs[0] || "";
  const remainingParagraphs = paragraphs.slice(1);

  // Extract first letter for drop cap
  const firstLetter = firstParagraph.charAt(0);
  const restOfFirstParagraph = firstParagraph.slice(1);

  return (
    <section aria-label="Chronicle & history" className="w-full mb-16 sm:mb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="border-t border-[#1f2333] pt-12 sm:pt-16">
          <div className="flex items-center gap-2 mb-3 text-xs font-serif uppercase tracking-widest text-[#b07512]">
            <StarIcon className="w-3.5 h-3.5 text-[#b07512]" />
            <span>Chronicle & Epigraphy</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif text-[#ede7de] mb-6">
            Historical Foundations of {templeName}
          </h2>

          {isFallbackEnglish && (
            <div className="mb-4">
              <span className="inline-block px-2 py-0.5 text-[10px] uppercase font-serif tracking-wider bg-[#1f2333] border border-[#2d3244] text-[#e8c36a] rounded-xs">
                English only / ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ಮಾತ್ರ
              </span>
            </div>
          )}

          {/* Reading column restricted to max 65ch for ideal typography */}
          <div
            className={`max-w-[65ch] text-base sm:text-lg text-[#c4bba8] leading-relaxed space-y-6 ${
              isKannada && historyKannada ? "font-kannada leading-loose" : ""
            }`}
          >
            {/* First paragraph with drop cap */}
            {firstParagraph && (
              <p className="leading-relaxed">
                <span className="float-left text-5xl sm:text-6xl font-serif font-bold text-[#e8c36a] pr-3 pt-1 pb-0 leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                  {firstLetter}
                </span>
                {restOfFirstParagraph}
              </p>
            )}

            {remainingParagraphs.map((para, idx) => (
              <p key={idx} className="leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
