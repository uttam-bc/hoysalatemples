"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import type { TempleDetailImage } from "@/lib/temple-data";
import { Lightbox } from "./Lightbox";
import { StarIcon } from "@/components/ui/StarIcon";

interface TempleGalleryProps {
  images: TempleDetailImage[];
  templeName: string;
}

function GalleryCard({
  img,
  idx,
  onOpen,
}: {
  img: TempleDetailImage;
  idx: number;
  onOpen: (idx: number, e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  const resolveUrl = (url: string) => {
    if (url.startsWith("/") || url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    return "/placeholders/temple-dusk-placeholder.svg";
  };

  const [src, setSrc] = useState(resolveUrl(img.url));

  useEffect(() => {
    setSrc(resolveUrl(img.url));
  }, [img.url]);

  return (
    <div className="snap-start shrink-0 w-[280px] sm:w-[380px] md:w-[420px] flex flex-col group">
      <button
        type="button"
        onClick={(e) => onOpen(idx, e)}
        className="relative aspect-[4/3] w-full bg-[#10121a] border border-[#2d3244] group-hover:border-[#b07512]/80 rounded-sm overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#b07512] transition-colors text-left"
        aria-label={`Enlarge photograph: ${img.alt}`}
      >
        <Image
          src={src}
          alt={img.alt}
          fill
          sizes="(max-width: 640px) 280px, (max-width: 768px) 380px, 420px"
          unoptimized={src.startsWith("http")}
          onError={() => setSrc("/placeholders/temple-dusk-placeholder.svg")}
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Enlarge badge */}
        <span className="absolute bottom-2.5 right-2.5 px-2 py-1 bg-black/75 border border-[#2d3244] text-[10px] uppercase tracking-wider text-[#ede7de] font-serif rounded-xs flex items-center gap-1 group-hover:text-[#e8c36a] transition-colors">
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 3 21 3 21 9" />
            <polyline points="9 21 3 21 3 15" />
            <line x1="21" y1="3" x2="14" y2="10" />
            <line x1="3" y1="21" x2="10" y2="14" />
          </svg>
          View
        </span>
      </button>

      {/* Caption and credit below thumbnail */}
      <div className="mt-2.5 px-1">
        <p className="text-sm font-serif text-[#ede7de] line-clamp-2">
          {img.alt}
        </p>
        <p className="text-[11px] text-[#9e9787] mt-0.5 truncate">
          <span className="text-[#6b665c]">Credit:</span> {img.credit}
        </p>
      </div>
    </div>
  );
}

export function TempleGallery({ images, templeName }: TempleGalleryProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [triggerEl, setTriggerEl] = useState<HTMLElement | null>(null);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -360, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 360, behavior: "smooth" });
    }
  };

  const openLightbox = (index: number, e: React.MouseEvent<HTMLButtonElement>) => {
    setTriggerEl(e.currentTarget);
    setActiveImageIndex(index);
    setLightboxOpen(true);
  };

  // Case: Zero images or purely placeholder notes — decorative stone panel fallback
  if (!images || images.length === 0) {
    return (
      <section aria-label="Visual gallery" className="w-full mb-16 sm:mb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="border border-[#2d3244] bg-[#10121a]/80 p-8 sm:p-12 rounded-sm text-center shadow-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#b07512]/40 to-transparent" />
            <StarIcon className="w-8 h-8 text-[#b07512] mx-auto mb-4 opacity-75" />
            <h3 className="text-xl sm:text-2xl font-serif text-[#ede7de] mb-2">
              Sanctuary Photographic Archive
            </h3>
            <p className="text-sm text-[#9e9787] max-w-lg mx-auto mb-4">
              Archival survey photographs are pending official cataloguing. Field photography is protected under Archaeological Survey of India (ASI) guidelines.
            </p>
            <p className="text-xs text-[#6b665c] font-serif uppercase tracking-wider">
              License: ASI / Directorate of Archaeology & Museums Karnataka · TODO: verify
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section aria-label="Visual gallery" className="w-full mb-16 sm:mb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header and scroll arrow controls */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <span className="text-xs font-serif uppercase tracking-widest text-[#b07512]">
              Visual Survey
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#ede7de]">
              Sanctuary Gallery & Details
            </h2>
          </div>

          {images.length > 1 && (
            <div className="hidden sm:flex items-center gap-2">
              <button
                type="button"
                onClick={handleScrollLeft}
                aria-label="Scroll gallery left"
                className="p-2 rounded-sm bg-[#10121a] hover:bg-[#1a1e2e] border border-[#2d3244] text-[#ede7de] hover:text-[#e8c36a] transition-colors focus:outline-none focus:ring-1 focus:ring-[#b07512]"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={handleScrollRight}
                aria-label="Scroll gallery right"
                className="p-2 rounded-sm bg-[#10121a] hover:bg-[#1a1e2e] border border-[#2d3244] text-[#ede7de] hover:text-[#e8c36a] transition-colors focus:outline-none focus:ring-1 focus:ring-[#b07512]"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Scroll snap horizontal track */}
        <div
          ref={scrollContainerRef}
          tabIndex={0}
          role="region"
          aria-label="Scrollable image gallery"
          className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory pb-4 pt-1 focus:outline-none focus:ring-1 focus:ring-[#b07512]/60 scrollbar-thin"
          style={{ scrollbarWidth: "thin" }}
        >
          {images.map((img, idx) => (
            <GalleryCard
              key={img.id || idx}
              img={img}
              idx={idx}
              onOpen={openLightbox}
            />
          ))}
        </div>
      </div>

      {/* Accessible Lightbox Modal */}
      <Lightbox
        images={images}
        currentIndex={activeImageIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(newIdx) => setActiveImageIndex(newIdx)}
        triggerElement={triggerEl}
      />
    </section>
  );
}
