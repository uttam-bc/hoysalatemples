"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import type { TempleNeighborItem, NextRingTempleItem } from "@/lib/temple-data";
import { StarIcon } from "@/components/ui/StarIcon";
import { StarIrisTransition, type IrisState } from "@/components/map/StarIrisTransition";

interface TempleNeighborsProps {
  neighbors: TempleNeighborItem[];
  nextRingTemple: NextRingTempleItem | null;
  currentTempleName: string;
}

function NeighborCard({ neighbor }: { neighbor: TempleNeighborItem }) {
  const resolveUrl = (url?: string) => {
    if (url && (url.startsWith("/") || url.startsWith("http://") || url.startsWith("https://"))) {
      return url;
    }
    return "/placeholders/temple-dusk-placeholder.svg";
  };

  const [imgSrc, setImgSrc] = useState(resolveUrl(neighbor.heroImage?.url));

  useEffect(() => {
    setImgSrc(resolveUrl(neighbor.heroImage?.url));
  }, [neighbor.heroImage?.url]);

  return (
    <Link
      href={`/temples/${neighbor.slug}`}
      prefetch={true}
      className="group bg-[#10121a] border border-[#2d3244] hover:border-[#b07512] rounded-sm overflow-hidden flex flex-col justify-between transition-all shadow-lg hover:shadow-2xl"
    >
      <div className="relative aspect-[16/9] w-full bg-[#0b0c12] overflow-hidden">
        <Image
          src={imgSrc}
          alt={neighbor.name}
          fill
          sizes="(max-width: 768px) 100vw, 360px"
          unoptimized={imgSrc.startsWith("http")}
          onError={() => setImgSrc("/placeholders/temple-dusk-placeholder.svg")}
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Edge type badge */}
        <span className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-black/80 border border-[#2d3244] text-[10px] uppercase font-serif tracking-wider text-[#e8c36a] rounded-xs">
          {neighbor.type === "ring" ? "Sacred Ring Node" : "Cross Connection"}
        </span>

        {/* Distance pill */}
        <span className="absolute bottom-2.5 right-2.5 px-2.5 py-1 bg-black/85 border border-[#2d3244] text-xs font-serif text-[#ede7de] rounded-xs flex items-center gap-1.5 shadow">
          <span className="text-[#b07512] font-mono">~{neighbor.distanceKm} km</span>
          <span className="text-[10px] text-[#9e9787]">direct</span>
        </span>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-serif text-[#ede7de] group-hover:text-[#e8c36a] transition-colors">
            {neighbor.name}
          </h3>
          <p className="text-sm font-kannada text-[#9e9787] mt-0.5">
            {neighbor.nameKannada}
          </p>
          <p className="text-xs text-[#6b665c] mt-2 font-serif uppercase tracking-wider">
            {neighbor.town}, {neighbor.district}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-[#1c2030] flex items-center justify-between text-xs text-[#b07512] font-serif uppercase tracking-wider">
          <span>Explore Sanctuary</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </Link>
  );
}

export function TempleNeighbors({
  neighbors,
  nextRingTemple,
  currentTempleName,
}: TempleNeighborsProps) {
  const [iris, setIris] = useState<IrisState>({
    isActive: false,
    originX: 0,
    originY: 0,
    slug: "",
  });

  const resolveUrl = (url?: string) => {
    if (url && (url.startsWith("/") || url.startsWith("http://") || url.startsWith("https://"))) {
      return url;
    }
    return "/placeholders/temple-dusk-placeholder.svg";
  };

  const handleNextRingClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    slug: string
  ) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    setIris({
      isActive: true,
      originX,
      originY,
      slug,
    });
  };

  return (
    <section aria-label="Connected sanctuaries" className="w-full pb-20 sm:pb-28">
      {/* Star Iris Transition Overlay */}
      <StarIrisTransition
        iris={iris}
        onComplete={() => setIris((prev) => ({ ...prev, isActive: false }))}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="border-t border-[#1f2333] pt-12 sm:pt-16">
          {/* Header */}
          <div className="flex items-center gap-2 mb-3 text-xs font-serif uppercase tracking-widest text-[#b07512]">
            <StarIcon className="w-3.5 h-3.5 text-[#b07512]" />
            <span>Sacred Geography</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif text-[#ede7de] mb-4">
            Connected Sanctuaries in the Hoysala Network
          </h2>
          <p className="text-sm sm:text-base text-[#9e9787] max-w-2xl mb-8">
            Temples linked by geographic proximity and epigraphical trade routes in the regional network.
          </p>

          {/* 2–3 Neighbor cards */}
          {neighbors.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {neighbors.map((neighbor) => (
                <NeighborCard key={neighbor.slug} neighbor={neighbor} />
              ))}
            </div>
          )}

          {/* Next Ring Temple CTA Banner with Star-Iris transition */}
          {nextRingTemple && (
            <div className="border border-[#b07512]/60 bg-gradient-to-r from-[#10121a] via-[#141724] to-[#10121a] p-6 sm:p-8 rounded-sm shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#b07512]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-serif uppercase tracking-widest text-[#e8c36a]">
                    <StarIcon className="w-3.5 h-3.5 text-[#e8c36a]" />
                    <span>Next on the Sacred Ring Tour · Sanctuary #{nextRingTemple.ringOrder}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif text-[#ede7de]">
                    {nextRingTemple.name}
                  </h3>
                  <p className="text-sm font-kannada text-[#c4bba8]">
                    {nextRingTemple.nameKannada} · {nextRingTemple.town}
                  </p>
                </div>

                <Link
                  href={`/temples/${nextRingTemple.slug}`}
                  onClick={(e) => handleNextRingClick(e, nextRingTemple.slug)}
                  className="px-6 py-3 bg-[#b07512] hover:bg-[#c98616] text-[#0b0c12] font-serif font-semibold text-sm uppercase tracking-widest rounded-xs flex items-center gap-2.5 shadow-[0_4px_16px_rgba(176,117,18,0.4)] transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#e8c36a]"
                >
                  <StarIcon className="w-4 h-4 text-[#0b0c12]" />
                  <span>Enter Next Sanctuary</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
