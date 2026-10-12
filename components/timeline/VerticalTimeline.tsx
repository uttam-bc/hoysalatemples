"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import { StarIcon } from "@/components/ui/StarIcon";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import type { TempleDetailData } from "@/lib/temple-data";

export interface TimelineMilestone {
  year: string;
  title: string;
  summary: string;
  templeSlug: string | null;
}

export interface TimelineEra {
  id: string;
  period: string;
  eraTitle: string;
  eraTitleKannada: string;
  ruler: string;
  description: string;
  uncertaintyNote: string;
  milestones: TimelineMilestone[];
}

interface VerticalTimelineProps {
  eras: TimelineEra[];
  temples: TempleDetailData[];
}

function TimelineTempleThumb({ url, name }: { url?: string; name: string }) {
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
    <div className="relative w-14 h-14 shrink-0 rounded-xs overflow-hidden bg-[#1f2333]">
      <Image
        src={src}
        alt={name}
        fill
        sizes="56px"
        unoptimized={src.startsWith("http")}
        onError={() => setSrc("/placeholders/temple-dusk-placeholder.svg")}
        className="object-cover"
      />
    </div>
  );
}

export function VerticalTimeline({ eras, temples }: VerticalTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Map temple details by slug for fast lookup
  const templeMap = new Map<string, TempleDetailData>(
    temples.map((t) => [t.slug, t])
  );

  // Scroll progress for the vertical timeline spine
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 20%", "end 80%"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div ref={containerRef} className="relative w-full py-8 sm:py-12">
      {/* Central continuous spine line on desktop, left-aligned on mobile */}
      <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-[#1f2333]">
        {/* Animated scroll-drawn line */}
        <motion.div
          className="w-full bg-gradient-to-b from-[#b07512] via-[#e8c36a] to-[#b07512] origin-top"
          style={
            prefersReducedMotion
              ? { height: "100%" }
              : { height: "100%", scaleY }
          }
        />
      </div>

      <div className="space-y-16 sm:space-y-24">
        {eras.map((era, eraIndex) => (
          <motion.article
            key={era.id}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Era Header Marker centered on the timeline spine */}
            <div className="flex flex-col items-start md:items-center relative z-10 mb-8 sm:mb-12 pl-14 md:pl-0">
              {/* Star Era Icon Badge positioned on the spine line */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-0 p-2.5 bg-[#0b0c12] border border-[#b07512] rounded-full shadow-[0_0_16px_rgba(176,117,18,0.5)]">
                <StarIcon className="w-5 h-5 text-[#e8c36a]" />
              </div>

              {/* Era Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#10121a] border border-[#2d3244] rounded-full text-xs font-serif uppercase tracking-widest text-[#e8c36a] mb-2 shadow">
                <span>{era.period}</span>
                <span className="text-[#4a5068]">•</span>
                <span className="text-[#9e9787]">{era.ruler}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif text-[#ede7de] text-left md:text-center">
                {era.eraTitle}
              </h2>

              <p className="font-kannada text-base sm:text-lg text-[#b07512] mt-0.5 text-left md:text-center">
                {era.eraTitleKannada}
              </p>

              <p className="max-w-2xl text-xs sm:text-sm text-[#c4bba8] mt-3 leading-relaxed text-left md:text-center">
                {era.description}
              </p>

              {/* Uncertainty note */}
              {era.uncertaintyNote && (
                <div className="mt-2 text-[11px] text-[#6b665c] font-serif tracking-wide italic">
                  {era.uncertaintyNote}
                </div>
              )}
            </div>

            {/* Milestones list belonging to this era */}
            <div className="space-y-8 pl-12 md:pl-0">
              {era.milestones.map((milestone, mIndex) => {
                const isEven = mIndex % 2 === 0;
                const temple = milestone.templeSlug
                  ? templeMap.get(milestone.templeSlug)
                  : null;
                const heroImg =
                  temple?.images.find((img) => img.isHero) || temple?.images[0];

                return (
                  <div
                    key={`${era.id}-${milestone.year}-${mIndex}`}
                    className={`relative md:flex items-center ${
                      isEven ? "md:flex-row-reverse" : "md:flex-row"
                    }`}
                  >
                    {/* Spine Branch Dot */}
                    <div className="absolute -left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#10121a] border-2 border-[#b07512] z-10" />

                    {/* Milestone Card Container */}
                    <div className="md:w-1/2 md:px-8">
                      <div className="bg-[#10121a] border border-[#2d3244] hover:border-[#b07512]/60 p-5 sm:p-6 rounded-sm shadow-xl transition-all group">
                        {/* Year Badge */}
                        <div className="flex items-center justify-between mb-2 pb-2 border-b border-[#1c2030]">
                          <span className="px-2 py-0.5 bg-[#1f2333] border border-[#2d3244] text-xs font-mono font-semibold text-[#e8c36a] rounded-xs">
                            {milestone.year}
                          </span>

                          <span className="text-[10px] font-serif uppercase tracking-widest text-[#9e9787]">
                            {milestone.templeSlug ? "Temple Foundation" : "Historical Event"}
                          </span>
                        </div>

                        <h3 className="text-base sm:text-lg font-serif text-[#ede7de] group-hover:text-[#e8c36a] transition-colors mb-2">
                          {milestone.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-[#c4bba8] leading-relaxed mb-4">
                          {milestone.summary}
                        </p>

                        {/* If Milestone is linked to a Temple in the Database */}
                        {temple && (
                          <div className="pt-3 border-t border-[#1c2030]">
                            <Link
                              href={`/temples/${temple.slug}`}
                              className="flex items-center gap-3 p-2 bg-[#0b0c12] hover:bg-[#141724] border border-[#1f2333] hover:border-[#b07512] rounded-xs transition-colors"
                            >
                              <TimelineTempleThumb url={heroImg?.url} name={temple.name} />

                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-serif text-[#ede7de] truncate">
                                  {temple.name}
                                </h4>
                                <p className="font-kannada text-xs text-[#9e9787] truncate">
                                  {temple.nameKannada} · {temple.town}
                                </p>
                                <span className="text-[10px] text-[#b07512] font-serif uppercase tracking-wider flex items-center gap-1 mt-0.5">
                                  <span>View Sanctuary</span>
                                  <span>→</span>
                                </span>
                              </div>
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
