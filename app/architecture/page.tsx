import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { StarIcon } from "@/components/ui/StarIcon";
import { ArchitecturalPrimer } from "@/components/architecture/ArchitecturalPrimer";
import { StellatePlanExplorer } from "@/components/architecture/StellatePlanExplorer";
import { FriezeBands } from "@/components/architecture/FriezeBands";

export const metadata: Metadata = {
  title: "Architecture & Stonecraft | Hoysala Temples",
  description:
    "An interactive visual guide to the stellate plans, chloritic schist carvings, lathe-turned pillars, and frieze bands of medieval Hoysala architecture in Karnataka.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://hoysalatemples.online"}/architecture`,
  },
  openGraph: {
    title: "Hoysala Architecture & Stonecraft — Stellate Plans & Vesara Traditions",
    description:
      "Explore the 16-point star sanctums, chloritic schist medium, lathe-turned pillars, and continuous narrative friezes of Karnataka's Hoysala sanctuaries.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://hoysalatemples.online"}/architecture`,
  },
};

export default function ArchitecturePage() {
  return (
    <main id="main" className="min-h-screen bg-[#0b0c12] text-[#ede7de]">
      {/* Top Header & Breadcrumb */}
      <header className="relative w-full pt-10 pb-16 sm:pb-20 px-4 sm:px-8 border-b border-[#1f2333] bg-gradient-to-b from-[#141724] to-[#0b0c12]">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb nav */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-serif uppercase tracking-widest text-[#9e9787] mb-8">
            <Link href="/" className="hover:text-[#e8c36a] transition-colors">
              Home
            </Link>
            <span className="text-[#4a5068]" aria-hidden="true">/</span>
            <Link href="/#explore" className="hover:text-[#e8c36a] transition-colors">
              Explore
            </Link>
            <span className="text-[#4a5068]" aria-hidden="true">/</span>
            <span className="text-[#e8c36a]" aria-current="page">
              Architecture
            </span>
          </nav>

          <div className="flex items-center gap-2 mb-3 text-xs font-serif uppercase tracking-widest text-[#e8c36a]">
            <StarIcon className="w-3.5 h-3.5 text-[#e8c36a]" />
            <span>Sacred Geometry & Stonecarving Traditions</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#ede7de] tracking-tight leading-tight mb-4">
            Hoysala Architecture & Craft
          </h1>

          <p className="font-kannada text-2xl sm:text-3xl text-[#c4bba8] mb-6">
            ಹೊಯ್ಸಳ ವಾಸ್ತುಶಿಲ್ಪ ಮತ್ತು ಶಿಲ್ಪಕಲೆ
          </p>

          <p className="text-base sm:text-lg text-[#c4bba8] max-w-3xl leading-relaxed">
            Between the 11th and 14th centuries in the southern Deccan plateau, Hoysala master sculptors translated complex cosmic geometry into soft soapstone. Through rotated star ground plans, lathe-turned bell columns, and miles of uninterrupted narrative friezes, they established one of the world&apos;s most sophisticated sculptural traditions.
          </p>
        </div>
      </header>

      {/* 1. Interactive Stellate Plan & Elevation Explorer */}
      <div className="pt-12 sm:pt-16">
        <StellatePlanExplorer />
      </div>

      {/* 2. Core Foundations & Architectural Grammar */}
      <ArchitecturalPrimer />

      {/* 3. Horizontal Narrative Frieze Tiers */}
      <FriezeBands />

      {/* Bottom CTA Banner */}
      <section className="w-full pb-20 sm:pb-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="border border-[#2d3244] bg-[#10121a] p-8 sm:p-10 rounded-sm shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-serif uppercase tracking-widest text-[#e8c36a] mb-2">
                <StarIcon className="w-3 h-3 text-[#e8c36a]" />
                <span>Experience the Sanctuaries in Stone</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#ede7de]">
                Explore the Hoysala Network
              </h2>
              <p className="text-sm text-[#9e9787] mt-1 max-w-lg">
                View all 13 surviving architectural exemplars across Belur, Halebidu, Somanathapura, and beyond on our interactive sacred graph map.
              </p>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <Link
                href="/#explore"
                className="px-6 py-3 bg-[#b07512] hover:bg-[#c98616] text-[#0b0c12] font-serif font-semibold text-xs uppercase tracking-widest rounded-xs shadow transition-colors flex items-center gap-2"
              >
                <StarIcon className="w-4 h-4 text-[#0b0c12]" />
                <span>Open Explore Map</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
