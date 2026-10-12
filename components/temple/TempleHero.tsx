"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { TempleDetailData, TempleDetailImage } from "@/lib/temple-data";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { StarIcon } from "@/components/ui/StarIcon";

interface TempleHeroProps {
  temple: TempleDetailData;
  heroImage?: TempleDetailImage | null;
}

export function TempleHero({ temple, heroImage }: TempleHeroProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const resolveUrl = (url?: string) => {
    if (url && (url.startsWith("/") || url.startsWith("http://") || url.startsWith("https://"))) {
      return url;
    }
    return "/placeholders/temple-dusk-placeholder.svg";
  };

  const [imgSrc, setImgSrc] = useState(resolveUrl(heroImage?.url));

  useEffect(() => {
    setImgSrc(resolveUrl(heroImage?.url));
  }, [heroImage?.url]);

  return (
    <header className="relative w-full h-[72vh] min-h-[520px] max-h-[760px] overflow-hidden bg-[#0b0c12]">
      {/* Background Image with subtle slow zoom */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        initial={{ scale: 1 }}
        animate={prefersReducedMotion ? { scale: 1 } : { scale: 1.05 }}
        transition={{
          duration: 16,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        <Image
          src={imgSrc}
          alt={heroImage?.alt || `${temple.name} sanctuary facade`}
          fill
          priority
          sizes="100vw"
          unoptimized={imgSrc.startsWith("http")}
          onError={() => setImgSrc("/placeholders/temple-dusk-placeholder.svg")}
          className="object-cover object-center"
        />
      </motion.div>

      {/* Deep Stone & Lamplight Scrim Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c12] via-[#0b0c12]/75 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b0c12]/80 via-transparent to-[#0b0c12]/40" />

      {/* Top Navbar & Breadcrumbs */}
      <div className="absolute top-0 left-0 right-0 z-20 pt-6 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-serif uppercase tracking-widest text-[#9e9787]">
            <Link
              href="/"
              className="text-[#c4bba8] hover:text-[#e8c36a] transition-colors flex items-center gap-1"
            >
              <span>Home</span>
            </Link>
            <span className="text-[#4a5068]" aria-hidden="true">/</span>
            <Link
              href="/#explore"
              className="text-[#c4bba8] hover:text-[#e8c36a] transition-colors"
            >
              Explore
            </Link>
            <span className="text-[#4a5068]" aria-hidden="true">/</span>
            <span className="text-[#e8c36a] truncate max-w-[160px] sm:max-w-xs" aria-current="page">
              {temple.name}
            </span>
          </nav>

          <Link
            href="/#explore"
            className="px-3 py-1.5 bg-[#10121a]/80 hover:bg-[#1f2333] border border-[#2d3244] text-[11px] font-serif uppercase tracking-wider text-[#ede7de] rounded-xs transition-colors flex items-center gap-1.5 shadow"
          >
            <span>← Map</span>
          </Link>
        </div>
      </div>

      {/* Hero Content positioned over bottom scrim */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pb-16 sm:pb-20 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Stellate sanctuary badge */}
          <div className="flex items-center gap-2 mb-3 text-xs font-serif uppercase tracking-widest text-[#e8c36a]">
            <StarIcon className="w-3.5 h-3.5 text-[#e8c36a]" />
            <span>Sanctuary #{temple.ringOrder} · {temple.region} Circuit</span>
          </div>

          {/* Temple Title (English + Kannada) */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#ede7de] tracking-tight leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            {temple.name}
          </h1>

          <p className="font-kannada text-2xl sm:text-3xl text-[#c4bba8] mt-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
            {temple.nameKannada}
          </p>

          {/* Location & Century indicator */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-4 text-sm font-serif text-[#9e9787]">
            <span className="text-[#ede7de] font-medium">
              {temple.town}, {temple.district}
            </span>
            <span className="text-[#4a5068]" aria-hidden="true">•</span>
            <span>{temple.yearBuilt} ({temple.century} Century)</span>
            {temple.unescoStatus.includes("Inscribed") && (
              <>
                <span className="text-[#4a5068]" aria-hidden="true">•</span>
                <span className="text-[#e8c36a] flex items-center gap-1">
                  <StarIcon className="w-3 h-3 text-[#e8c36a]" />
                  UNESCO World Heritage
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Photo credit label pinned to bottom right */}
      {heroImage?.credit && (
        <div className="absolute bottom-2 right-4 z-20 text-[10px] text-[#6b665c] font-serif tracking-wider uppercase bg-black/60 px-2 py-0.5 rounded-xs">
          Credit: {heroImage.credit}
        </div>
      )}
    </header>
  );
}
