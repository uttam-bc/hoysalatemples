import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import timelineData from "@/data/timeline.json";
import { getAllTemples } from "@/lib/temple-data";
import { VerticalTimeline, type TimelineEra } from "@/components/timeline/VerticalTimeline";
import { StarIcon } from "@/components/ui/StarIcon";

export const metadata: Metadata = {
  title: "Chronological Timeline | Hoysala Temples",
  description:
    "A chronological journey through the Hoysala Empire (1000–1343 CE), tracing dynastic origins, Vishnuvardhana's golden era, Ballala II's imperial expansion, and landmark temple consecrations across Karnataka.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://hoysalatemples.online"}/timeline`,
  },
  openGraph: {
    title: "Hoysala Dynastic Timeline — From Malnad Hills to Imperial Sanctuaries",
    description:
      "Explore the 350-year chronology of the Hoysala dynasty, ruler tenures, and the consecutive foundation of all 13 surviving stone temples.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://hoysalatemples.online"}/timeline`,
  },
};

export default async function TimelinePage() {
  const temples = await getAllTemples();
  const eras = timelineData.eras as TimelineEra[];

  return (
    <main id="main" className="min-h-screen bg-[#0b0c12] text-[#ede7de]">
      {/* Header and Breadcrumb */}
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
              Timeline
            </span>
          </nav>

          <div className="flex items-center gap-2 mb-3 text-xs font-serif uppercase tracking-widest text-[#e8c36a]">
            <StarIcon className="w-3.5 h-3.5 text-[#e8c36a]" />
            <span>Epigraphical Chronology · 1000 – 1343 CE</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#ede7de] tracking-tight leading-tight mb-4">
            The Hoysala Epoch in Time
          </h1>

          <p className="font-kannada text-2xl sm:text-3xl text-[#c4bba8] mb-6">
            ಹೊಯ್ಸಳ ಸಾಮ್ರಾಜ್ಯದ ಕಾಲಗಣನೆ
          </p>

          <p className="text-base sm:text-lg text-[#c4bba8] max-w-3xl leading-relaxed">
            Spanning over three centuries, the Hoysala dynasty transformed the southern Deccan from rustic Malnad hill territories into an empire of breathtaking architectural grandeur. Follow the royal reigns, military campaigns, and successive temple foundations that defined the era.
          </p>
        </div>
      </header>

      {/* Main Vertical Timeline Container */}
      <section aria-label="Chronological events" className="max-w-6xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
        <VerticalTimeline eras={eras} temples={temples} />
      </section>

      {/* Bottom CTA Banner */}
      <section className="w-full pb-20 sm:pb-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="border border-[#2d3244] bg-[#10121a] p-8 sm:p-10 rounded-sm shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-serif uppercase tracking-widest text-[#e8c36a] mb-2">
                <StarIcon className="w-3 h-3 text-[#e8c36a]" />
                <span>Continue the Architectural Journey</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#ede7de]">
                Discover How They Were Carved
              </h2>
              <p className="text-sm text-[#9e9787] mt-1 max-w-lg">
                Explore our interactive guide to stellate ground plans, lathe-turned bell columns, and continuous narrative friezes.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <Link
                href="/architecture"
                className="px-6 py-3 bg-[#b07512] hover:bg-[#c98616] text-[#0b0c12] font-serif font-semibold text-xs uppercase tracking-widest rounded-xs shadow transition-colors flex items-center gap-2"
              >
                <StarIcon className="w-4 h-4 text-[#0b0c12]" />
                <span>Architecture Guide</span>
              </Link>
              <Link
                href="/#explore"
                className="px-6 py-3 bg-[#10121a] hover:bg-[#1f2333] border border-[#2d3244] text-[#ede7de] font-serif text-xs uppercase tracking-widest rounded-xs transition-colors"
              >
                <span>Sacred Map</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
