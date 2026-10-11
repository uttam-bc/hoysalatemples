"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

export interface IrisState {
  isActive: boolean;
  originX: number;
  originY: number;
  slug: string;
}

interface StarIrisTransitionProps {
  iris: IrisState;
  onComplete?: () => void;
}

export function StarIrisTransition({ iris, onComplete }: StarIrisTransitionProps) {
  const router = useRouter();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!iris.isActive) return;

    if (prefersReducedMotion) {
      router.push(`/temples/${iris.slug}`);
      onComplete?.();
      return;
    }

    const timer = setTimeout(() => {
      router.push(`/temples/${iris.slug}`);
      onComplete?.();
    }, 650);

    return () => clearTimeout(timer);
  }, [iris, router, prefersReducedMotion, onComplete]);

  if (!iris.isActive || prefersReducedMotion) {
    return null;
  }

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 pointer-events-auto overflow-hidden"
        aria-hidden="true"
      >
        {/* Expanding Stellate Iris SVG Wipe */}
        <motion.svg
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <defs>
            <radialGradient id="iris-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#EAB308" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#D4A359" stopOpacity="0.7" />
              <stop offset="80%" stopColor="#252A2E" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#0B0D0E" stopOpacity="1" />
            </radialGradient>
          </defs>

          {/* Expanding star shape centered on click origin */}
          <motion.g
            initial={{ scale: 0, opacity: 0.9 }}
            animate={{ scale: 120, opacity: 1 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            style={{
              transformOrigin: `${iris.originX}px ${iris.originY}px`,
            }}
          >
            <path
              transform={`translate(${iris.originX - 16}, ${iris.originY - 16})`}
              d="M16 1.5 L18.4 11.2 L28.5 9.1 L21.2 16 L28.5 22.9 L18.4 20.8 L16 30.5 L13.6 20.8 L3.5 22.9 L10.8 16 L3.5 9.1 L13.6 11.2 Z"
              fill="url(#iris-glow)"
              stroke="#EAB308"
              strokeWidth="0.5"
            />
          </motion.g>
        </motion.svg>
      </div>
    </AnimatePresence>
  );
}
