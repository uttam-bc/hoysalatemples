import React from "react";
import Link from "next/link";
import { StarIcon } from "@/components/ui/StarIcon";

export default function TempleNotFound() {
  return (
    <main className="min-h-screen bg-[#0b0c12] text-[#ede7de] flex items-center justify-center p-4">
      <div className="max-w-md w-full border border-[#2d3244] bg-[#10121a] p-8 sm:p-10 rounded-sm text-center shadow-2xl relative">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#b07512]/60 to-transparent" />

        <StarIcon className="w-10 h-10 text-[#b07512] mx-auto mb-4 opacity-80" />

        <h1 className="text-3xl font-serif text-[#ede7de] mb-2">
          Sanctuary Not Found
        </h1>
        <p className="font-kannada text-lg text-[#9e9787] mb-4">
          ದೇವಾಲಯ ಕಂಡುಬಂದಿಲ್ಲ
        </p>

        <p className="text-sm text-[#c4bba8] mb-8 leading-relaxed">
          The requested temple identifier does not correspond to any known sanctuary in the Hoysala architectural network.
        </p>

        <Link
          href="/#explore"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#b07512] hover:bg-[#c98616] text-[#0b0c12] font-serif font-semibold text-xs uppercase tracking-widest rounded-xs transition-colors shadow"
        >
          <span>Return to Sacred Map</span>
        </Link>
      </div>
    </main>
  );
}
