"use client";

import React from "react";
import Link from "next/link";
import { useLocale } from "@/lib/locale-context";
import { StarIcon } from "@/components/ui/StarIcon";

export function Footer() {
  const { t, locale } = useLocale();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      aria-label="Site footer"
      className="relative w-full border-t border-[#1f2333] bg-[#0b0c12] text-[#ede7de] overflow-hidden transition-colors"
    >
      {/* Decorative top gold hairline glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#b07512]/60 to-transparent" />

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#1c2030]">
          
          {/* Column 1: Brand & Independent Developer Spotlight (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Site Identity */}
              <div className="flex items-center gap-2.5 mb-3">
                <StarIcon className="w-5 h-5 text-[#e8c36a]" />
                <span className="font-serif text-xl tracking-wider font-semibold text-[#ede7de]">
                  Hoysala Temples
                </span>
                <span className="text-xs px-2 py-0.5 rounded-xs bg-[#161a26] border border-[#2d3244] text-[#9e9787] font-mono">
                  online
                </span>
              </div>

              {locale === "kn" ? (
                <p className="font-kannada text-xs text-[#b07512] mb-3">
                  ಹೊಯ್ಸಳ ದೇವಾಲಯಗಳು · ಕರ್ನಾಟಕದ ಪವಿತ್ರ ಶಿಲ್ಪಕಲೆ
                </p>
              ) : null}

              <p className="text-xs sm:text-sm text-[#9e9787] leading-relaxed max-w-md mb-6">
                {t(
                  "footer.tagline",
                  "A stone-and-lamplight digital sanctuary exploring the 11th–14th century soapstone architectural marvels of Karnataka."
                )}
              </p>

              {/* Developer Attribution Highlight Badge */}
              <div className="inline-flex flex-col sm:flex-row items-start sm:items-center gap-2 p-3 rounded-sm bg-[#10121a] border border-[#b07512]/40 shadow-md">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#e8c36a] animate-pulse shrink-0" />
                  <span className="text-xs font-serif tracking-wide text-[#ede7de] font-semibold">
                    {t("footer.developedBy", "Independently developed by UTTAM B C")}
                  </span>
                </div>
              </div>
            </div>

            {/* Domain Badge */}
            <div className="mt-6 flex items-center gap-2 text-xs text-[#6b665c] font-mono">
              <span className="text-[#b07512]">🌐</span>
              <span className="text-[#c4bba8]">hoysalatemples.online</span>
            </div>
          </div>

          {/* Column 2: Quick Navigation (3 cols) */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-serif uppercase tracking-widest text-[#e8c36a] mb-4 flex items-center gap-1.5">
              <span>✦</span>
              <span>{t("footer.quickLinks", "Quick Navigation")}</span>
            </h3>

            <ul className="space-y-2.5 text-xs sm:text-sm font-serif">
              <li>
                <Link
                  href="/"
                  className="text-[#c4bba8] hover:text-[#e8c36a] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#4a5068]">›</span>
                  <span>{t("footer.home", "Home")}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/#explore"
                  className="text-[#c4bba8] hover:text-[#e8c36a] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#4a5068]">›</span>
                  <span>{t("footer.explore", "Explore Sanctuaries")}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/architecture"
                  className="text-[#c4bba8] hover:text-[#e8c36a] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#4a5068]">›</span>
                  <span>{t("footer.architecture", "Stellate Architecture")}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/timeline"
                  className="text-[#c4bba8] hover:text-[#e8c36a] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#4a5068]">›</span>
                  <span>{t("footer.timeline", "Chronology Timeline")}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/plan"
                  className="text-[#c4bba8] hover:text-[#e8c36a] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#4a5068]">›</span>
                  <span>{t("footer.plan", "Plan a Circuit")}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Me (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-start">
            <h3 className="text-xs font-serif uppercase tracking-widest text-[#e8c36a] mb-4 flex items-center gap-1.5">
              <span>✉</span>
              <span>{t("footer.contactMe", "Contact Me")}</span>
            </h3>

            {/* Horizontal Circular Logos */}
            <div className="flex items-center gap-3.5 pt-1">
              {/* Email */}
              <a
                href="mailto:uttam_bc@yahoo.com"
                className="w-11 h-11 rounded-full flex items-center justify-center bg-[#10121a] border border-[#2d3244] text-[#c4bba8] hover:text-[#e8c36a] hover:border-[#b07512] hover:bg-[#1c1810] hover:scale-110 shadow-md hover:shadow-[0_0_14px_rgba(232,195,106,0.35)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#b07512]"
                aria-label="Send email to uttam_bc@yahoo.com"
                title="Email: uttam_bc@yahoo.com"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/uttam-b-c-573123290"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full flex items-center justify-center bg-[#10121a] border border-[#2d3244] text-[#c4bba8] hover:text-[#0a66c2] hover:border-[#0a66c2] hover:bg-[#0d1c2d] hover:scale-110 shadow-md hover:shadow-[0_0_14px_rgba(10,102,194,0.35)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#0a66c2]"
                aria-label="Visit LinkedIn Profile"
                title="LinkedIn Profile: uttam-b-c-573123290"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.738-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/uttam.b.c/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full flex items-center justify-center bg-[#10121a] border border-[#2d3244] text-[#c4bba8] hover:text-[#e1306c] hover:border-[#e1306c] hover:bg-[#25101a] hover:scale-110 shadow-md hover:shadow-[0_0_14px_rgba(225,48,108,0.35)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#e1306c]"
                aria-label="Visit Instagram Profile"
                title="Instagram Profile: @uttam.b.c"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Recognition */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8f8877]">
          <div className="flex items-center gap-2 flex-wrap text-center sm:text-left">
            <span>
              © {currentYear}{" "}
              <strong className="font-mono text-[#c4bba8]">hoysalatemples.online</strong>.
            </span>
            <span>{t("footer.copyright", "All rights reserved.")}</span>
          </div>

          <div className="flex items-center gap-2 text-center sm:text-right text-[11px] text-[#787265]">
            <StarIcon className="w-3 h-3 text-[#b07512] shrink-0" />
            <span>{t("footer.unesco", "Celebrating the Sacred Ensembles of the Hoysalas.")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
