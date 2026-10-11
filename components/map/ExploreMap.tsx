"use client";

import React, { useState, useEffect, useRef, useId, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, useInView } from "framer-motion";
import type { MapTemple, MapLink } from "./types";
import { getKarnatakaBoundaryPath, MAP_WIDTH, MAP_HEIGHT } from "@/lib/map";
import { TempleTooltip } from "./TempleTooltip";
import { StarIrisTransition, type IrisState } from "./StarIrisTransition";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

interface ExploreMapProps {
  temples: MapTemple[];
  links: MapLink[];
  selectedRegion: string | null;
  selectedCentury: string | null;
  selectedTempleSlug: string | null;
  onSelectTemple: (temple: MapTemple | null) => void;
}

export function ExploreMap({
  temples,
  links,
  selectedRegion,
  selectedCentury,
  selectedTempleSlug,
  onSelectTemple,
}: ExploreMapProps) {
  const router = useRouter();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(mapContainerRef, { once: true, margin: "-100px" });

  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [internalActiveSlug, setInternalActiveSlug] = useState<string | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const [iris, setIris] = useState<IrisState>({
    isActive: false,
    originX: 0,
    originY: 0,
    slug: "",
  });

  const filterId = useId();
  const glowFilterId = `ochre-glow-${filterId.replace(/:/g, "")}`;
  const grainFilterId = `stone-grain-${filterId.replace(/:/g, "")}`;

  // Derive activeSlug directly from props or internal selection
  const activeSlug = selectedTempleSlug ?? internalActiveSlug;

  // Prefetch temple pages for swift navigation
  useEffect(() => {
    temples.forEach((t) => {
      try {
        router.prefetch(`/temples/${t.slug}`);
      } catch {
        // Safe ignore
      }
    });
  }, [temples, router]);

  const focusedOrHoveredSlug = hoveredSlug || activeSlug;
  const currentTemple = temples.find((t) => t.slug === focusedOrHoveredSlug) || null;

  // Set of connected neighbor IDs for the currently active/hovered temple
  const connectedNeighborIds = useMemo(() => {
    if (!currentTemple) return new Set<string>();
    const neighbors = new Set<string>();
    for (const link of links) {
      if (link.fromId === currentTemple.id) {
        neighbors.add(link.toId);
      } else if (link.toId === currentTemple.id) {
        neighbors.add(link.fromId);
      }
    }
    return neighbors;
  }, [currentTemple, links]);

  // Filter match helper
  const isTempleMatching = useCallback(
    (temple: MapTemple) => {
      if (selectedRegion && temple.region !== selectedRegion) return false;
      if (selectedCentury && temple.century !== selectedCentury) return false;
      return true;
    },
    [selectedRegion, selectedCentury]
  );

  // Trigger navigation with star-iris transition
  const handleNavigate = useCallback(
    (temple: MapTemple, clientX?: number, clientY?: number) => {
      let x = clientX;
      let y = clientY;

      if (x === undefined || y === undefined) {
        if (mapContainerRef.current) {
          const rect = mapContainerRef.current.getBoundingClientRect();
          x = rect.left + (temple.x / MAP_WIDTH) * rect.width;
          y = rect.top + (temple.y / MAP_HEIGHT) * rect.height;
        } else {
          x = window.innerWidth / 2;
          y = window.innerHeight / 2;
        }
      }

      setIris({
        isActive: true,
        originX: x,
        originY: y,
        slug: temple.slug,
      });
    },
    []
  );

  // Keyboard navigation among connected neighbors
  const handleKeyDown = (e: React.KeyboardEvent, temple: MapTemple) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleNavigate(temple);
      return;
    }

    // Directional navigation to connected neighbors
    if (
      ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key) &&
      connectedNeighborIds.size > 0
    ) {
      e.preventDefault();
      const neighbors = temples.filter((t) => connectedNeighborIds.has(t.id));
      if (neighbors.length === 0) return;

      let bestNeighbor: MapTemple | null = null;
      let bestScore = Infinity;

      for (const n of neighbors) {
        const dx = n.x - temple.x;
        const dy = n.y - temple.y;
        let directionMatch = false;

        if (e.key === "ArrowUp" && dy < 0) directionMatch = true;
        if (e.key === "ArrowDown" && dy > 0) directionMatch = true;
        if (e.key === "ArrowLeft" && dx < 0) directionMatch = true;
        if (e.key === "ArrowRight" && dx > 0) directionMatch = true;

        if (directionMatch) {
          const dist = Math.hypot(dx, dy);
          if (dist < bestScore) {
            bestScore = dist;
            bestNeighbor = n;
          }
        }
      }

      const target = bestNeighbor || neighbors[0];
      setInternalActiveSlug(target.slug);
      onSelectTemple(target);

      // Focus the target DOM element
      const targetEl = document.getElementById(`map-star-${target.slug}`);
      targetEl?.focus();
    }
  };

  const boundaryPath = useMemo(() => getKarnatakaBoundaryPath(), []);

  // Split links into ring vs cross
  const ringLinks = links.filter((l) => l.type === "ring");
  const crossLinks = links.filter((l) => l.type === "cross");

  return (
    <div
      ref={mapContainerRef}
      className="relative w-full max-w-3xl mx-auto touch-pan-y select-none"
      onPointerLeave={() => {
        setHoveredSlug(null);
      }}
    >
      {/* SVG Canvas */}
      <svg
        viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
        className="w-full h-auto overflow-visible"
        role="region"
        aria-label="Interactive map of Hoysala temples across Karnataka"
      >
        <defs>
          {/* Subtle Stone Grain Filter */}
          <filter id={grainFilterId} x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.04"
              numOctaves="3"
              result="noise"
            />
            <feColorMatrix
              type="matrix"
              values="0.33 0.33 0.33 0 0
                      0.33 0.33 0.33 0 0
                      0.33 0.33 0.33 0 0
                      0 0 0 0.12 0"
              in="noise"
              result="monoNoise"
            />
            <feBlend mode="multiply" in="SourceGraphic" in2="monoNoise" />
          </filter>

          {/* Soft Ochre Glow for Active/Hovered Nodes */}
          <filter id={glowFilterId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Reusable 8-Point Stellate Star Geometry (Centered at 0, 0) */}
          <g id="star-geometry">
            <path d="M0 -14.5 L2.4 -4.8 L12.5 -6.9 L5.2 0 L12.5 6.9 L2.4 4.8 L0 14.5 L-2.4 4.8 L-12.5 6.9 L-5.2 0 L-12.5 -6.9 L-2.4 -4.8 Z" />
          </g>
        </defs>

        {/* 1. Karnataka State Boundary Silhouette */}
        <g id="karnataka-boundary">
          <path
            d={boundaryPath}
            fill="#14171A"
            stroke="#8C6D3F"
            strokeWidth="1.25"
            strokeOpacity="0.45"
            filter={`url(#${grainFilterId})`}
          />
          {/* Subtle inner depth shadow */}
          <path
            d={boundaryPath}
            fill="none"
            stroke="#0B0D0E"
            strokeWidth="3.5"
            strokeOpacity="0.6"
          />
        </g>

        {/* 2. Historic Hoysala Core Heartland Label */}
        <text
          x="350"
          y="795"
          fill="#4A525A"
          fontSize="14"
          letterSpacing="4"
          textAnchor="middle"
          className="font-display uppercase select-none opacity-40"
        >
          Hoysala Heartland • ದ್ವಾರಸಮುದ್ರ ಸೀಮೆ
        </text>

        {/* 3. Cross-links (Dashed Bone, drawn beneath ring) */}
        <g id="cross-links" className="transition-opacity duration-300">
          {crossLinks.map((link) => {
            const isConnectedToFocused =
              currentTemple &&
              (link.fromId === currentTemple.id || link.toId === currentTemple.id);

            const isDimmed =
              focusedOrHoveredSlug && !isConnectedToFocused ? true : false;

            return (
              <line
                key={`cross-${link.fromId}-${link.toId}`}
                x1={link.x1}
                y1={link.y1}
                x2={link.x2}
                y2={link.y2}
                stroke={isConnectedToFocused ? "#EAB308" : "#D5C2A4"}
                strokeWidth={isConnectedToFocused ? "2" : "1"}
                strokeDasharray="4 4"
                strokeOpacity={
                  isDimmed ? 0.08 : isConnectedToFocused ? 0.95 : 0.26
                }
                className="transition-all duration-300"
              />
            );
          })}
        </g>

        {/* 4. Sacred Ring Edges (Solid Ochre, kolam sequential reveal) */}
        <g id="ring-links">
          {ringLinks.map((link, i) => {
            const isConnectedToFocused =
              currentTemple &&
              (link.fromId === currentTemple.id || link.toId === currentTemple.id);

            const isDimmed =
              focusedOrHoveredSlug && !isConnectedToFocused ? true : false;

            return (
              <React.Fragment key={`ring-${link.fromId}-${link.toId}`}>
                <motion.line
                  x1={link.x1}
                  y1={link.y1}
                  x2={link.x2}
                  y2={link.y2}
                  stroke={isConnectedToFocused ? "#EAB308" : "#D4A359"}
                  strokeWidth={isConnectedToFocused ? "2.6" : "1.75"}
                  strokeOpacity={
                    isDimmed ? 0.12 : isConnectedToFocused ? 1 : 0.55
                  }
                  strokeLinecap="round"
                  filter={isConnectedToFocused ? `url(#${glowFilterId})` : undefined}
                  initial={
                    prefersReducedMotion ? { pathLength: 1 } : { pathLength: 0 }
                  }
                  animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                  transition={{
                    delay: prefersReducedMotion ? 0 : 0.06 * i,
                    duration: prefersReducedMotion ? 0 : 0.45,
                    ease: "easeInOut",
                  }}
                />

                {/* Travelling Glow Pulse when hovered */}
                {isConnectedToFocused && !prefersReducedMotion ? (
                  <motion.circle
                    r="3.5"
                    fill="#FDE047"
                    filter={`url(#${glowFilterId})`}
                    initial={{
                      cx: link.x1,
                      cy: link.y1,
                    }}
                    animate={{
                      cx: [link.x1, link.x2, link.x1],
                      cy: [link.y1, link.y2, link.y1],
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                ) : null}
              </React.Fragment>
            );
          })}
        </g>

        {/* 5. Temple Nodes (8-point Stellate Stars) */}
        <g id="temple-nodes">
          {temples.map((temple) => {
            const isHovered = hoveredSlug === temple.slug;
            const isActive = activeSlug === temple.slug;
            const isFocused = isHovered || isActive;
            const isNeighbor = connectedNeighborIds.has(temple.id);
            const isMatching = isTempleMatching(temple);

            let opacity = 1;
            if (!isMatching) {
              opacity = 0.25;
            } else if (focusedOrHoveredSlug && !isFocused && !isNeighbor) {
              opacity = 0.4;
            }

            return (
              <g
                key={temple.id}
                id={`map-star-${temple.slug}`}
                tabIndex={0}
                role="button"
                aria-label={`${temple.name} (${temple.nameKannada}), ${temple.town}, built ${temple.yearBuilt}. Stop #${temple.ringOrder} of 13.`}
                aria-pressed={isActive}
                className="cursor-pointer outline-none focus:ring-2 focus:ring-lamp-400"
                style={{
                  transformOrigin: `${temple.x}px ${temple.y}px`,
                  opacity,
                  transition: "opacity 0.25s ease-out",
                }}
                onPointerEnter={() => {
                  setHoveredSlug(temple.slug);
                }}
                onPointerLeave={() => {
                  if (hoveredSlug === temple.slug) {
                    setHoveredSlug(null);
                  }
                }}
                onFocus={() => {
                  setInternalActiveSlug(temple.slug);
                  onSelectTemple(temple);
                }}
                onClick={(e) => {
                  if (activeSlug === temple.slug) {
                    // Second tap or direct click -> navigate
                    handleNavigate(temple, e.clientX, e.clientY);
                  } else {
                    // First tap -> select and show tooltip
                    setInternalActiveSlug(temple.slug);
                    onSelectTemple(temple);
                  }
                }}
                onKeyDown={(e) => handleKeyDown(e, temple)}
              >
                {/* Active-neighbor highlight ring */}
                {isNeighbor && !isFocused ? (
                  <circle
                    cx={temple.x}
                    cy={temple.y}
                    r="13"
                    fill="none"
                    stroke="#D4A359"
                    strokeWidth="1.2"
                    strokeDasharray="2 2"
                    className="animate-pulse"
                  />
                ) : null}

                {/* Stellate Star Geometry */}
                <g
                  transform={`translate(${temple.x}, ${temple.y}) scale(${
                    isFocused ? 1.4 : isNeighbor ? 1.15 : 1
                  })`}
                  filter={isFocused ? `url(#${glowFilterId})` : undefined}
                  style={{
                    transition: "transform 0.2s cubic-bezier(0.2, 0, 0, 1)",
                  }}
                >
                  <use
                    href="#star-geometry"
                    fill={isFocused ? "#EAB308" : isNeighbor ? "#252A2E" : "#1B1F22"}
                    stroke={isFocused ? "#FEF08A" : isNeighbor ? "#EAB308" : "#C49746"}
                    strokeWidth={isFocused ? "1.8" : "1.2"}
                  />

                  {/* Dark center gem stone */}
                  <circle
                    cx="0"
                    cy="0"
                    r={isFocused ? "3.2" : "2.4"}
                    fill={isFocused ? "#854D0E" : "#0B0D0E"}
                    stroke={isFocused ? "#FEF08A" : "#8C6D3F"}
                    strokeWidth="0.8"
                  />
                </g>

                {/* Ring order small numeral */}
                <text
                  x={temple.x}
                  y={temple.y + 24}
                  fill={isFocused ? "#FEF08A" : "#9B9890"}
                  fontSize="10"
                  fontFamily="monospace"
                  fontWeight={isFocused ? "bold" : "normal"}
                  textAnchor="middle"
                  className="pointer-events-none select-none transition-colors"
                >
                  {temple.ringOrder}
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      {/* 6. Smart-positioned Tooltip on Active/Hovered Sanctuary */}
      {currentTemple ? (
        <TempleTooltip
          temple={currentTemple}
          svgX={currentTemple.x}
          svgY={currentTemple.y}
          mapWidth={MAP_WIDTH}
          mapHeight={MAP_HEIGHT}
          onVisit={() => {
            handleNavigate(currentTemple);
          }}
        />
      ) : null}

      {/* 7. Star-Iris Full-Screen Wipe Transition */}
      <StarIrisTransition
        iris={iris}
        onComplete={() => {
          setIris((prev) => ({ ...prev, isActive: false }));
        }}
      />
    </div>
  );
}
