"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { TempleDetailImage } from "@/lib/temple-data";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

interface LightboxProps {
  images: TempleDetailImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
  triggerElement: HTMLElement | null;
}

function resolveUrl(url?: string) {
  if (url && (url.startsWith("/") || url.startsWith("http://") || url.startsWith("https://"))) {
    return url;
  }
  return "/placeholders/temple-dusk-placeholder.svg";
}

export function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
  triggerElement,
}: LightboxProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const total = images.length;
  const current = images[currentIndex];

  const [imageSrc, setImageSrc] = useState(resolveUrl(current?.url));

  useEffect(() => {
    setImageSrc(resolveUrl(current?.url));
  }, [current?.url]);

  const goPrev = useCallback(() => {
    if (total <= 1) return;
    onNavigate((currentIndex - 1 + total) % total);
  }, [currentIndex, total, onNavigate]);

  const goNext = useCallback(() => {
    if (total <= 1) return;
    onNavigate((currentIndex + 1) % total);
  }, [currentIndex, total, onNavigate]);

  // Lock body scroll and restore focus on close
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus the modal or close button on open
    const timer = setTimeout(() => {
      const closeBtn = modalRef.current?.querySelector<HTMLButtonElement>(
        '[data-lightbox-close="true"]'
      );
      closeBtn?.focus();
    }, 50);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
      // Focus restore
      if (triggerElement && typeof triggerElement.focus === "function") {
        triggerElement.focus();
      }
    };
  }, [isOpen, triggerElement]);

  // Keyboard navigation & Focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
        return;
      }

      // Focus trap
      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, goPrev, goNext]);

  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current;
      const minSwipeDistance = 50;
      if (diff > minSwipeDistance) {
        goNext();
      } else if (diff < -minSwipeDistance) {
        goPrev();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (!isOpen || !current) return null;

  // Preload adjacent images
  const prevImg = total > 1 ? images[(currentIndex - 1 + total) % total] : null;
  const nextImg = total > 1 ? images[(currentIndex + 1) % total] : null;

  return (
    <AnimatePresence>
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label="Image gallery lightbox"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Hidden preloads for adjacent images */}
        {prevImg && (
          <link rel="prefetch" href={resolveUrl(prevImg.url)} as="image" />
        )}
        {nextImg && (
          <link rel="prefetch" href={resolveUrl(nextImg.url)} as="image" />
        )}

        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="relative max-w-5xl w-full max-h-[92vh] flex flex-col bg-[#0b0c12] border border-[#2d3244] rounded-sm overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#1f2333] bg-[#10121a]/95 text-xs text-[#9e9787]">
            <span className="font-serif tracking-widest uppercase">
              Image {currentIndex + 1} of {total}
            </span>

            <button
              type="button"
              data-lightbox-close="true"
              onClick={onClose}
              className="p-1.5 text-[#ede7de] hover:text-[#e8c36a] focus:outline-none focus:ring-1 focus:ring-[#b07512] rounded transition-colors"
              aria-label="Close lightbox"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Main Image Stage */}
          <div className="relative flex-1 min-h-[300px] max-h-[68vh] flex items-center justify-center p-2 sm:p-4 bg-black/60">
            <div className="relative w-full h-[58vh] max-h-[640px]">
              <Image
                src={imageSrc}
                alt={current.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-contain"
                priority
                unoptimized={imageSrc.startsWith("http")}
                onError={() => setImageSrc("/placeholders/temple-dusk-placeholder.svg")}
              />
            </div>

            {/* Navigation Arrows */}
            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={goPrev}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-[#10121a]/80 hover:bg-[#1a1e2e] text-[#ede7de] hover:text-[#e8c36a] border border-[#2d3244] rounded-full shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#b07512]"
                  aria-label="Previous image"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-[#10121a]/80 hover:bg-[#1a1e2e] text-[#ede7de] hover:text-[#e8c36a] border border-[#2d3244] rounded-full shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#b07512]"
                  aria-label="Next image"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Footer Bar: Caption and Credit */}
          <div className="px-4 py-3 bg-[#10121a]/95 border-t border-[#1f2333] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <p className="text-[#ede7de] font-serif text-sm">
              {current.alt}
            </p>
            <p className="text-[#9e9787] text-[11px] tracking-wide shrink-0">
              <span className="text-[#6b665c]">Credit:</span> {current.credit}
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
