import React, { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllTemples } from "@/lib/temple-data";
import { RoutePlanner } from "@/components/plan/RoutePlanner";
import { StarIcon } from "@/components/ui/StarIcon";

export const metadata: Metadata = {
  title: "Plan a Route | Hoysala Temples",
  description:
    "Design an optimal 3 to 5 stop pilgrimage circuit through Karnataka's Hoysala temples using nearest-neighbour routing, road distance approximations, and direct Google Maps exports.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://hoysalatemples.online"}/plan`,
  },
  openGraph: {
    title: "Hoysala Pilgrimage Route Planner — Karnataka Temple Circuits",
    description:
      "Plan your driving route across Belur, Halebidu, Somanathapura and 10 other stone sanctuaries with road distances and Google Maps directions.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://hoysalatemples.online"}/plan`,
  },
};

function RoutePlannerSkeleton() {
  return (
    <div className="w-full bg-[#10121a] border border-[#2d3244] p-8 rounded-sm animate-pulse text-center">
      <StarIcon className="w-6 h-6 text-[#b07512] mx-auto mb-3 opacity-50" />
      <div className="text-sm font-serif text-[#9e9787]">
        Loading circuit coordinates and graph paths...
      </div>
    </div>
  );
}

export default async function PlanRoutePage() {
  const temples = await getAllTemples();

  return (
    <main id="main" className="min-h-screen bg-[#0b0c12] text-[#ede7de]">
      {/* Header and Breadcrumbs */}
      <header className="relative w-full pt-10 pb-16 sm:pb-20 px-4 sm:px-8 border-b border-[#1f2333] bg-gradient-to-b from-[#141724] to-[#0b0c12]">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumbs */}
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
              Plan Route
            </span>
          </nav>

          <div className="flex items-center gap-2 mb-3 text-xs font-serif uppercase tracking-widest text-[#e8c36a]">
            <StarIcon className="w-3.5 h-3.5 text-[#e8c36a]" />
            <span>Itinerary Optimizer · 3 to 5 Sanctuaries</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#ede7de] tracking-tight leading-tight mb-4">
            Plan a Hoysala Circuit
          </h1>

          <p className="font-kannada text-2xl sm:text-3xl text-[#c4bba8] mb-6">
            ದೇವಾಲಯಗಳ ಯಾತ್ರಾ ಯೋಜನೆ
          </p>

          <p className="text-base sm:text-lg text-[#c4bba8] max-w-3xl leading-relaxed">
            Select your starting sanctuary and number of stops to calculate an optimal driving itinerary. Distances incorporate road curvature estimates (haversine × 1.3), complete with step-by-step navigation exportable directly to Google Maps.
          </p>
        </div>
      </header>

      {/* Main Interactive Route Planner Area */}
      <section aria-label="Route planner" className="max-w-6xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
        <Suspense fallback={<RoutePlannerSkeleton />}>
          <RoutePlanner temples={temples} />
        </Suspense>
      </section>

      {/* Bottom Exploration Links */}
      <section className="w-full pb-20 sm:pb-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="border border-[#2d3244] bg-[#10121a] p-8 sm:p-10 rounded-sm shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-serif uppercase tracking-widest text-[#e8c36a] mb-2">
                <StarIcon className="w-3 h-3 text-[#e8c36a]" />
                <span>Deepen Your Journey</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#ede7de]">
                Chronology & Architecture
              </h2>
              <p className="text-sm text-[#9e9787] mt-1 max-w-lg">
                Explore when each temple was consecrated in our timeline, or understand the 16-point stellate ground plans in our architecture guide.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <Link
                href="/timeline"
                className="px-6 py-3 bg-[#b07512] hover:bg-[#c98616] text-[#0b0c12] font-serif font-semibold text-xs uppercase tracking-widest rounded-xs shadow transition-colors"
              >
                <span>View Timeline</span>
              </Link>
              <Link
                href="/architecture"
                className="px-6 py-3 bg-[#10121a] hover:bg-[#1f2333] border border-[#2d3244] text-[#ede7de] font-serif text-xs uppercase tracking-widest rounded-xs transition-colors"
              >
                <span>Architecture Guide</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
