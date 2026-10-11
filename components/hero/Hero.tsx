"use client";

import { animate, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { HERO, HERO_PLACEHOLDER_IMAGE } from "@/components/hero/constants";
import { HeroDoorway } from "@/components/hero/HeroDoorway";
import { StarIcon } from "@/components/ui/StarIcon";
import { useIsMobile } from "@/components/hero/useIsMobile";

const HeroDust = dynamic(
  () => import("@/components/hero/HeroDust").then((m) => m.HeroDust),
  { ssr: false },
);

const TITLE = "Hoysala Temples";
const EASE = [0.22, 0.61, 0.36, 1] as const;

export function Hero() {
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const holeRef = useRef<SVGGElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const open = HERO.openingEnd;
  const d = HERO.depth * (mobile ? 0.65 : 1);
  const still = reduced === true;

  const leftX = useTransform(scrollYProgress, [0, open], [0, still ? 0 : -150 * d]);
  const rightX = useTransform(scrollYProgress, [0, open], [0, still ? 0 : 175 * d]);
  const archY = useTransform(scrollYProgress, [0, open], [0, still ? 0 : -110 * d]);
  const frameScale = useTransform(scrollYProgress, [0, open], [1, still ? 1 : mobile ? 1.35 : 1.6]);
  const starScale = useTransform(scrollYProgress, [0, open], [4.2, still ? 4.2 : mobile ? 18 : 26]);
  const imageScale = useTransform(scrollYProgress, [0, open], [1.05, still ? 1.05 : 1.18]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.04, 0.22], [1, 1, still ? 1 : 0]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.08], [1, still ? 1 : 0]);
  const floodOpacity = useTransform(
    scrollYProgress,
    [0, open, 0.82, 1],
    still ? [0, 0, 0, 0] : [0.12, 0.78, 0.28, 0],
  );

  const lampOpacity = useTransform(scrollYProgress, [0, open], [1, still ? 1 : 1.15]);
  const lampScale = useTransform(scrollYProgress, [0, open], [1, still ? 1 : 1.8]);

  useMotionValueEvent(starScale, "change", (value) => {
    holeRef.current?.setAttribute("transform", `translate(600 480) scale(${value})`);
  });

  useEffect(() => {
    holeRef.current?.setAttribute(
      "transform",
      `translate(600 480) scale(${starScale.get()})`,
    );
  }, [starScale, still]);

  useEffect(() => {
    if (still) return;
    let cancelled = false;
    let timer: number;
    let stopAnim: { stop: () => void } | undefined;

    const pulse = () => {
      const wait =
        (HERO.flickerMin + Math.random() * (HERO.flickerMax - HERO.flickerMin)) * 1000;
      timer = window.setTimeout(() => {
        if (cancelled) return;
        stopAnim = animate(lampOpacity, [lampOpacity.get(), 0.82, 1.08, 0.9, 1], {
          duration: 1.05,
          ease: "easeInOut",
        });
        animate(lampScale, [lampScale.get(), 0.96, 1.05, 1], {
          duration: 1.05,
          ease: "easeInOut",
        });
        window.setTimeout(() => {
          if (!cancelled) pulse();
        }, 1100);
      }, wait);
    };

    pulse();
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      stopAnim?.stop();
    };
  }, [still, lampOpacity, lampScale]);

  return (
    <div
      ref={wrapperRef}
      className={
        still ? "relative h-screen" : "relative h-[200vh] max-md:h-[160vh]"
      }
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-night-950">
        {/* 1. Dusk sky (indigo to faint ochre horizon) + tiny stars */}
        <div className="absolute inset-0" aria-hidden>
          <svg viewBox="0 0 1200 900" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
            <defs>
              <linearGradient id="bg-dusk-sky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0b0c12" />
                <stop offset="62%" stopColor="#1c2030" />
                <stop offset="100%" stopColor="#4a3a18" />
              </linearGradient>
              <radialGradient id="bg-horizon-ochre" cx="50%" cy="88%" r="55%">
                <stop offset="0%" stopColor="#d4a017" stopOpacity="0.35" />
                <stop offset="55%" stopColor="#b07512" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#0b0c12" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="1200" height="900" fill="url(#bg-dusk-sky)" />
            <rect width="1200" height="900" fill="url(#bg-horizon-ochre)" />
            <g fill="#e8c36a">
              <circle cx="90" cy="70" r="1.1" opacity="0.7" />
              <circle cx="210" cy="40" r="0.8" opacity="0.5" />
              <circle cx="340" cy="95" r="1.2" opacity="0.65" />
              <circle cx="860" cy="55" r="0.9" opacity="0.55" />
              <circle cx="980" cy="88" r="1.1" opacity="0.7" />
              <circle cx="1110" cy="36" r="0.8" opacity="0.45" />
              <circle cx="470" cy="48" r="0.7" opacity="0.4" />
              <circle cx="720" cy="30" r="1" opacity="0.5" />
              <circle cx="150" cy="120" r="0.6" opacity="0.35" />
            </g>
          </svg>
        </div>

        {/* 3. Placeholder photo, slow zoom, revealed through doorway star window */}
        <motion.div className="absolute inset-0" style={{ scale: still ? 1.04 : imageScale }}>
          <Image
            src={HERO_PLACEHOLDER_IMAGE}
            alt="Placeholder temple photograph — not a real site image"
            fill
            priority
            sizes="100vw"
            unoptimized
            className="object-cover"
          />
        </motion.div>

        {/* 2. Warm inner light */}
        <motion.div
          className="pointer-events-none absolute left-1/2 top-[53.5%] h-[75vmin] w-[75vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            opacity: lampOpacity,
            scale: still ? 1 : lampScale,
            background:
              "radial-gradient(circle, rgba(232,195,106,0.85) 0%, rgba(212,160,23,0.35) 40%, rgba(11,12,18,0) 72%)",
          }}
        />

        <motion.div
          className="absolute inset-0"
          style={{
            scale: still ? 1 : frameScale,
            transformOrigin: "50% 53.5%",
          }}
        >
          <HeroDoorway
            simplified={mobile || still}
            leftX={still ? 0 : leftX}
            rightX={still ? 0 : rightX}
            archY={still ? 0 : archY}
            holeRef={holeRef}
          />
        </motion.div>

        {/* Light flood — peaks at opening, then yields to Explore */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: floodOpacity,
            background:
              "radial-gradient(circle at 50% 53.5%, rgba(243,234,216,0.65) 0%, rgba(232,195,106,0.32) 35%, rgba(11,12,18,0.2) 75%)",
          }}
        />

        <motion.div
          className="absolute inset-x-0 top-[32%] z-10 px-6 text-center drop-shadow-[0_4px_18px_rgba(0,0,0,0.85)] md:top-[30%]"
          style={{ opacity: titleOpacity }}
        >
          <p className="label-caps mb-3 font-semibold text-[#D5C2A4] tracking-[0.25em] [text-shadow:0_2px_4px_rgba(0,0,0,0.95),0_3px_10px_rgba(0,0,0,0.9)]">
            Karnataka
          </p>
          <h1
            className="font-display text-[clamp(2.75rem,1.8rem+5vw,5.5rem)] font-bold tracking-wide text-[#D5C2A4] [text-shadow:0_2px_4px_rgba(0,0,0,0.95),0_4px_14px_rgba(0,0,0,0.9),0_8px_28px_rgba(0,0,0,0.8)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {TITLE.split("").map((char, i) => (
              <motion.span
                key={`${char}-${i}`}
                className="inline-block"
                initial={still ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.035 * i, duration: 0.42, ease: EASE }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </h1>
          <p className="font-kannada mt-2 text-[clamp(1.65rem,1.3rem+1.8vw,2.5rem)] font-semibold text-[#D5C2A4] [text-shadow:0_2px_4px_rgba(0,0,0,0.95),0_4px_14px_rgba(0,0,0,0.9),0_6px_22px_rgba(0,0,0,0.75)]">
            ಹೊಯ್ಸಳ ದೇವಾಲಯಗಳು
          </p>
        </motion.div>

        {!still ? <HeroDust /> : null}

        <motion.div
          className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-lamp-400"
          style={{ opacity: cueOpacity }}
        >
          <StarIcon className={still ? "h-5 w-5" : "h-5 w-5 hero-scroll-cue"} />
          <span className="label-caps">Scroll to enter</span>
        </motion.div>
      </div>
    </div>
  );
}
