import React from "react";
import { ArchitecturalMotifIcon } from "./MotifIcons";
import { StarIcon } from "@/components/ui/StarIcon";

interface ArchitectureHighlightsProps {
  highlights: string[];
  templeName: string;
}

export function ArchitectureHighlights({
  highlights,
  templeName,
}: ArchitectureHighlightsProps) {
  if (!highlights || highlights.length === 0) {
    return null;
  }

  return (
    <section aria-label="Architecture highlights" className="w-full mb-16 sm:mb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="border-t border-[#1f2333] pt-12 sm:pt-16">
          <div className="flex items-center gap-2 mb-3 text-xs font-serif uppercase tracking-widest text-[#b07512]">
            <StarIcon className="w-3.5 h-3.5 text-[#b07512]" />
            <span>Vesara & Soapstone Craft</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif text-[#ede7de] mb-4">
            Architectural Elements & Design
          </h2>
          <p className="text-sm sm:text-base text-[#9e9787] max-w-2xl mb-8">
            The distinctive sculpture and structural innovations that define the sanctuary layout at {templeName}.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((highlight, index) => {
              const paddedNumber = String(index + 1).padStart(2, "0");

              return (
                <div
                  key={index}
                  className="bg-[#10121a] border border-[#2d3244] p-6 rounded-sm relative flex flex-col justify-between group hover:border-[#b07512]/60 transition-colors shadow-lg"
                >
                  {/* Top bar: Number & Motif Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-serif text-xs font-semibold tracking-widest text-[#e8c36a] px-2 py-0.5 bg-[#1f2333] border border-[#2d3244] rounded-xs">
                      {paddedNumber}
                    </span>

                    <div className="text-[#b07512] group-hover:text-[#e8c36a] transition-colors">
                      <ArchitecturalMotifIcon text={highlight} className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Highlight statement */}
                  <p className="text-base font-serif text-[#ede7de] leading-relaxed">
                    {highlight}
                  </p>

                  {/* Bottom chisel accent line */}
                  <div className="mt-5 pt-3 border-t border-[#1c2030] flex items-center justify-between text-[11px] text-[#6b665c] font-serif uppercase tracking-wider">
                    <span>Hoysala Motif</span>
                    <StarIcon className="w-2.5 h-2.5 text-[#b07512]/40" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
