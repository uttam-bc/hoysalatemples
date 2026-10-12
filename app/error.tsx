"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { StarIcon } from "@/components/ui/StarIcon";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log unexpected errors
    console.error("Hoysala Temples runtime error:", error);
  }, [error]);

  return (
    <main
      id="main"
      className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-[#0b0c12] text-[#ede7de]"
    >
      <div className="max-w-xl w-full text-center p-8 sm:p-12 bg-[#10121a] border border-[#2d3244] shadow-[0_8px_32px_rgba(0,0,0,0.8)] rounded-xs relative overflow-hidden">
        {/* Subtle stone grain border highlight */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#b07512] to-transparent" />

        {/* Flickering Lamp Motif */}
        <div className="mx-auto w-20 h-20 mb-6 flex items-center justify-center rounded-xs bg-[#141724] border border-[#b07512]/60 shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)]">
          <StarIcon className="w-10 h-10 text-[#d4a017] animate-pulse" />
        </div>

        <span className="text-xs uppercase tracking-[0.25em] text-[#d4a017] font-serif font-semibold">
          Temple Sanctuary Error • ಅಡಚಣೆ
        </span>

        <h1 className="mt-3 font-serif text-3xl sm:text-4xl font-bold text-[#ede7de] tracking-tight">
          A Tremor in the Stone
        </h1>

        <p className="mt-2 font-kannada text-lg text-[#c4bba8]">
          ಅನಿರೀಕ್ಷಿತ ತಾಂತ್ರಿಕ ದೋಷ ಉಂಟಾಗಿದೆ
        </p>

        <p className="mt-4 text-sm sm:text-base text-[#9e9787] leading-relaxed max-w-md mx-auto">
          An unexpected tremor occurred while chiseling this view. The sacred architectural archive remains intact.
        </p>

        {error.digest && (
          <p className="mt-2 text-xs font-mono text-[#6b7868]">
            Ref: {error.digest}
          </p>
        )}

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center min-h-[44px] px-6 py-2.5 text-xs font-serif uppercase tracking-widest font-bold bg-[#b07512] text-[#0b0c12] hover:bg-[#d4a017] transition-colors rounded-xs shadow-[0_2px_8px_rgba(176,117,18,0.3)] cursor-pointer"
          >
            Re-enter Sanctuary (ಮರುಪ್ರಯತ್ನಿಸಿ)
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center min-h-[44px] px-6 py-2.5 text-xs font-serif uppercase tracking-widest border border-[#2d3244] hover:border-[#b07512] text-[#c4bba8] hover:text-[#ede7de] transition-colors rounded-xs"
          >
            Return to Entrance
          </Link>
        </div>
      </div>
    </main>
  );
}
