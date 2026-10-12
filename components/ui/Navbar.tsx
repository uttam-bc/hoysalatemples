"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { StarIcon } from "@/components/ui/StarIcon";
import { useLocale } from "@/lib/locale-context";
import { useTheme } from "@/lib/theme-context";

export function Navbar() {
  const pathname = usePathname();
  const { locale, setLocale, t } = useLocale();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: t("nav.home"), matchExact: true },
    { href: "/#explore", label: t("nav.explore"), matchExact: false },
    { href: "/architecture", label: t("nav.architecture"), matchExact: false },
    { href: "/timeline", label: t("nav.timeline"), matchExact: false },
    { href: "/plan", label: t("nav.planRoute"), matchExact: false },
  ];

  const isActive = (href: string, matchExact: boolean) => {
    if (matchExact) return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0b0c12]/90 backdrop-blur-md border-b border-[#2d3244]/80 shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group focus:outline-none focus:ring-1 focus:ring-[#b07512] rounded-xs"
        >
          <div className="p-1.5 bg-[#141724] border border-[#b07512]/60 rounded-xs group-hover:border-[#e8c36a] transition-colors shadow">
            <StarIcon className="w-5 h-5 text-[#e8c36a] group-hover:scale-105 transition-transform" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg tracking-tight font-semibold text-[#ede7de] group-hover:text-[#e8c36a] transition-colors leading-tight">
              Hoysala Temples
            </span>
            <span className="font-kannada text-[11px] text-[#9e9787] leading-none">
              ಹೊಯ್ಸಳ ದೇವಾಲಯಗಳು
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          aria-label="Main navigation"
          className="hidden md:flex items-center gap-1 lg:gap-2"
        >
          {navLinks.map((link) => {
            const active = isActive(link.href, link.matchExact);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-xs text-xs font-serif uppercase tracking-widest transition-colors relative ${
                  active
                    ? "text-[#e8c36a] font-semibold"
                    : "text-[#c4bba8] hover:text-[#ede7de] hover:bg-[#141724]/60"
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#b07512]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Language & Theme Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Carved EN | ಕನ್ನಡ Language Toggle Switch */}
          <div
            role="group"
            aria-label="Select language"
            className="inline-flex items-center bg-[#10121a] border border-[#2d3244] p-0.5 rounded-xs shadow-inner"
          >
            <button
              type="button"
              onClick={() => setLocale("en")}
              aria-pressed={locale === "en"}
              className={`px-2 sm:px-2.5 py-1 text-xs font-serif uppercase tracking-wider rounded-xs transition-colors ${
                locale === "en"
                  ? "bg-[#b07512] text-[#0b0c12] font-bold shadow"
                  : "text-[#9e9787] hover:text-[#ede7de]"
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLocale("kn")}
              aria-pressed={locale === "kn"}
              className={`px-2 sm:px-2.5 py-1 text-xs font-kannada rounded-xs transition-colors ${
                locale === "kn"
                  ? "bg-[#b07512] text-[#0b0c12] font-bold shadow"
                  : "text-[#9e9787] hover:text-[#ede7de]"
              }`}
            >
              ಕನ್ನಡ
            </button>
          </div>

          {/* Theme Toggle Button (Dark Dusk / Light Daylight) */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              theme === "dark"
                ? "Switch to Daylight mode (ಬೆಳಕಿನ ಶೈಲಿ)"
                : "Switch to Dusk mode (ಕತ್ತಲೆಯ ಶೈಲಿ)"
            }
            title={
              theme === "dark"
                ? "Switch to Daylight mode (ಬೆಳಕಿನ ಶೈಲಿ)"
                : "Switch to Dusk mode (ಕತ್ತಲೆಯ ಶೈಲಿ)"
            }
            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center bg-[#10121a] border border-[#2d3244] hover:border-[#b07512] text-[#ede7de] hover:text-[#e8c36a] rounded-xs shadow transition-colors focus:outline-none focus:ring-1 focus:ring-[#b07512]"
          >
            {theme === "dark" ? (
              /* Sun / Dawn Icon */
              <svg
                className="w-4 h-4 text-[#e8c36a]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              /* Moon / Dusk Oil Lamp Icon */
              <svg
                className="w-4 h-4 text-[#b07512]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {/* Mobile Menu Hamburger Button (44px min tap target) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="md:hidden w-11 h-11 flex items-center justify-center text-[#ede7de] hover:text-[#e8c36a] border border-[#2d3244] bg-[#10121a] rounded-xs focus:outline-none focus:ring-1 focus:ring-[#b07512]"
          >
            {mobileMenuOpen ? (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#1f2333] bg-[#0b0c12] px-4 pt-3 pb-6 space-y-1 shadow-2xl">
          {navLinks.map((link) => {
            const active = isActive(link.href, link.matchExact);

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between min-h-[44px] px-3 py-2 text-sm font-serif uppercase tracking-widest rounded-xs ${
                  active
                    ? "text-[#e8c36a] bg-[#141724] border-l-2 border-[#b07512]"
                    : "text-[#c4bba8] hover:text-[#ede7de] hover:bg-[#10121a]"
                }`}
              >
                <span>{link.label}</span>
                {active && <StarIcon className="w-3.5 h-3.5 text-[#e8c36a]" />}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
