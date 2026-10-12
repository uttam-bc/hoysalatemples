import React from "react";
import { StarIcon } from "@/components/ui/StarIcon";

interface VisitingPanelProps {
  visitInfo: string;
  town: string;
  district: string;
  region: string;
}

export function VisitingPanel({
  visitInfo,
  town,
  district,
  region,
}: VisitingPanelProps) {
  return (
    <section aria-label="Visitor information" className="w-full mb-16 sm:mb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="border border-[#2d3244] bg-[#10121a] rounded-sm p-6 sm:p-8 relative overflow-hidden shadow-xl">
          {/* Top subtle ochre rim */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#b07512]/50 to-transparent" />

          <div className="flex items-center gap-2 mb-3 text-xs font-serif uppercase tracking-widest text-[#b07512]">
            <StarIcon className="w-3.5 h-3.5 text-[#b07512]" />
            <span>Field Notes & Pilgrimage</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif text-[#ede7de] mb-6">
            Visiting Sanctuary & Access
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Field visit status & timing notice */}
            <div className="bg-[#0b0c12] border border-[#1f2333] p-5 rounded-sm flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-serif uppercase tracking-widest text-[#9e9787] mb-2 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#b07512]" />
                  Operational Schedule & Entry
                </h3>
                <p className="text-sm sm:text-base text-[#ede7de] leading-relaxed">
                  {visitInfo}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#1a1e2e] text-xs text-[#9e9787] italic">
                Note: Operational hours, priest pujas, and ASI ticket counter schedules fluctuate by season. Verification with local authorities is recommended prior to travel.
              </div>
            </div>

            {/* Travel Guidelines & Heritage Etiquette */}
            <div className="space-y-4 text-sm text-[#c4bba8]">
              <div className="border-l-2 border-[#b07512]/60 pl-3.5 py-0.5">
                <h4 className="font-serif text-[#ede7de] text-sm uppercase tracking-wider mb-0.5">
                  Location & Transit Hub
                </h4>
                <p className="text-xs text-[#9e9787]">
                  Situated in {town}, {district} district ({region} circuit). Accessible via state highways with local taxi/bus links from district headquarters.
                </p>
              </div>

              <div className="border-l-2 border-[#2d3244] pl-3.5 py-0.5">
                <h4 className="font-serif text-[#ede7de] text-sm uppercase tracking-wider mb-0.5">
                  Preservation & ASI Guidelines
                </h4>
                <p className="text-xs text-[#9e9787]">
                  Protected national monument. Footwear must be deposited at the outer entrance before stepping onto the raised soapstone jagati (platform). Flash photography inside inner sanctums is restricted.
                </p>
              </div>

              <div className="border-l-2 border-[#2d3244] pl-3.5 py-0.5">
                <h4 className="font-serif text-[#ede7de] text-sm uppercase tracking-wider mb-0.5">
                  Best Hours of Illumination
                </h4>
                <p className="text-xs text-[#9e9787]">
                  Early morning and late afternoon sunlight reveal the deep relief of lathe-turned columns and frieze relief bands with minimum stone heat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
