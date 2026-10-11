"use client";

import React, { useEffect, useRef, useCallback } from "react";
import "leaflet/dist/leaflet.css";
import type { MapTemple, MapLink } from "./types";
import { StarIrisTransition, type IrisState } from "./StarIrisTransition";

interface LeafletMapProps {
  temples: MapTemple[];
  links: MapLink[];
  selectedRegion: string | null;
  selectedCentury: string | null;
  selectedTempleSlug: string | null;
  onSelectTemple: (temple: MapTemple | null) => void;
}

export function LeafletMap({
  temples,
  links,
  selectedRegion,
  selectedCentury,
  selectedTempleSlug,
  onSelectTemple,
}: LeafletMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const linesRef = useRef<L.Polyline[]>([]);

  const [iris, setIris] = React.useState<IrisState>({
    isActive: false,
    originX: 0,
    originY: 0,
    slug: "",
  });

  const handleNavigate = useCallback((slug: string) => {
    setIris({
      isActive: true,
      originX: window.innerWidth / 2,
      originY: window.innerHeight / 2,
      slug,
    });
  }, []);

  // Filter match helper
  const isTempleMatching = useCallback(
    (temple: MapTemple) => {
      if (selectedRegion && temple.region !== selectedRegion) return false;
      if (selectedCentury && temple.century !== selectedCentury) return false;
      return true;
    },
    [selectedRegion, selectedCentury]
  );

  // Initialize Leaflet map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    let isMounted = true;

    // Dynamically import Leaflet in client
    import("leaflet").then((L) => {
      if (!isMounted || !mapContainerRef.current) return;

      // Center around Karnataka Hoysala heartland (Hassan / Belur / Halebidu)
      const map = L.map(mapContainerRef.current, {
        center: [13.1, 76.2],
        zoom: 8,
        minZoom: 6,
        maxZoom: 16,
        zoomControl: false,
        attributionControl: false,
      });

      // Custom Zoom Control top-right
      L.control.zoom({ position: "topright" }).addTo(map);

      // CartoDB Dark Matter Tile Layer (OpenStreetMap data)
      const cartoKey =
        process.env.NEXT_PUBLIC_CARTO_API_KEY ||
        "cb1_4h14_1_ebf82acc3225a1780a1514b1";

      const tileUrl = cartoKey
        ? `https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png?key=${cartoKey}`
        : "https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png";

      L.tileLayer(tileUrl, {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 19,
      }).addTo(map);

      // Add custom minimal attribution at bottom right
      L.control
        .attribution({ position: "bottomright", prefix: false })
        .addAttribution(
          '&copy; <a href="https://openstreetmap.org" target="_blank" style="color:#D4A359;">OSM</a> / <a href="https://carto.com" target="_blank" style="color:#D4A359;">CARTO</a>'
        )
        .addTo(map);

      mapInstanceRef.current = map;

      // 1. Draw Ring & Cross-link Polylines
      const ringLinks = links.filter((l) => l.type === "ring");
      const crossLinks = links.filter((l) => l.type === "cross");
      const templeCoordMap = new Map<string, [number, number]>(
        temples.map((t) => [t.id, [t.lat, t.lng]])
      );

      // Draw dashed cross-links first
      crossLinks.forEach((link) => {
        const fromCoord = templeCoordMap.get(link.fromId);
        const toCoord = templeCoordMap.get(link.toId);
        if (fromCoord && toCoord) {
          const polyline = L.polyline([fromCoord, toCoord], {
            color: "#D5C2A4",
            weight: 1.5,
            opacity: 0.35,
            dashArray: "5, 8",
          }).addTo(map);
          linesRef.current.push(polyline);
        }
      });

      // Draw solid ochre ring edges
      ringLinks.forEach((link) => {
        const fromCoord = templeCoordMap.get(link.fromId);
        const toCoord = templeCoordMap.get(link.toId);
        if (fromCoord && toCoord) {
          const polyline = L.polyline([fromCoord, toCoord], {
            color: "#EAB308",
            weight: 2.75,
            opacity: 0.75,
            lineCap: "round",
          }).addTo(map);
          linesRef.current.push(polyline);
        }
      });

      // 2. Draw 8-point Stellate Star Markers
      const bounds = L.latLngBounds([]);

      temples.forEach((temple) => {
        bounds.extend([temple.lat, temple.lng]);

        // Custom Stellate Star HTML Icon
        const iconHtml = `
          <div class="leaflet-star-marker relative group flex items-center justify-center cursor-pointer" data-slug="${temple.slug}">
            <svg viewBox="0 0 32 32" class="w-8 h-8 filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] transition-transform duration-200 hover:scale-125">
              <path
                d="M16 1.5 L18.4 11.2 L28.5 9.1 L21.2 16 L28.5 22.9 L18.4 20.8 L16 30.5 L13.6 20.8 L3.5 22.9 L10.8 16 L3.5 9.1 L13.6 11.2 Z"
                fill="#16181B"
                stroke="#EAB308"
                stroke-width="1.6"
              />
              <circle cx="16" cy="16" r="3.2" fill="#EAB308" stroke="#FEF08A" stroke-width="0.8" />
            </svg>
            <span class="absolute -bottom-4 font-mono text-[10px] font-bold text-lamp-300 bg-night-950/80 px-1 rounded border border-soapstone-800 pointer-events-none">
              ${temple.ringOrder}
            </span>
          </div>
        `;

        const customIcon = L.divIcon({
          html: iconHtml,
          className: "custom-leaflet-div-icon",
          iconSize: [32, 32],
          iconAnchor: [16, 16],
          popupAnchor: [0, -18],
        });

        const marker = L.marker([temple.lat, temple.lng], {
          icon: customIcon,
          title: temple.name,
        }).addTo(map);

        // Stone-and-lamplight Popup content
        const popupContent = `
          <div class="p-3 bg-night-950 text-bone rounded border border-lamp-500/50 shadow-2xl min-w-[220px]">
            <div class="flex items-center justify-between pb-1 mb-2 border-b border-soapstone-800">
              <span class="text-[10px] font-mono text-lamp-400 font-semibold">Stop #${temple.ringOrder} • ${temple.century} Century</span>
              <span class="text-[10px] text-soapstone-400">${temple.yearBuilt}</span>
            </div>
            <h4 class="font-display text-base font-semibold text-bone leading-tight">${temple.name}</h4>
            <p class="font-kannada text-xs text-soapstone-300 mt-0.5">${temple.nameKannada}</p>
            <p class="text-[11px] text-soapstone-400 mt-1">${temple.town}, ${temple.district}</p>
            <p class="text-[11px] text-soapstone-300 mt-1"><span class="text-soapstone-400">Deity:</span> ${temple.deity}</p>
            <a
              href="/temples/${temple.slug}"
              id="leaflet-visit-${temple.slug}"
              class="mt-3 block w-full text-center rounded border border-lamp-500/80 bg-lamp-500/10 py-1.5 text-xs font-semibold uppercase tracking-wider text-lamp-300 hover:bg-lamp-500 hover:text-night-950 transition-colors"
            >
              Explore Sanctuary →
            </a>
          </div>
        `;

        marker.bindPopup(popupContent, {
          className: "custom-leaflet-popup",
          maxWidth: 300,
        });

        marker.on("popupopen", () => {
          const btn = document.getElementById(`leaflet-visit-${temple.slug}`);
          if (btn) {
            btn.onclick = (e) => {
              e.preventDefault();
              handleNavigate(temple.slug);
            };
          }
        });

        marker.on("click", () => {
          onSelectTemple(temple);
        });

        markersRef.current.set(temple.slug, marker);
      });

      // Fit map viewport to encompass all temples with comfortable padding
      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    });

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [temples, links, onSelectTemple, handleNavigate]);

  // Handle active temple selection or programmatic popup opening
  useEffect(() => {
    if (!selectedTempleSlug || !mapInstanceRef.current) return;
    const marker = markersRef.current.get(selectedTempleSlug);
    if (marker) {
      marker.openPopup();
      mapInstanceRef.current.panTo(marker.getLatLng(), { animate: true });
    }
  }, [selectedTempleSlug]);

  // Apply filters by adjusting marker opacity
  useEffect(() => {
    temples.forEach((temple) => {
      const marker = markersRef.current.get(temple.slug);
      if (!marker) return;

      const isMatch = isTempleMatching(temple);
      const el = marker.getElement();
      if (el) {
        el.style.opacity = isMatch ? "1" : "0.22";
        el.style.transition = "opacity 0.25s ease";
      }
    });
  }, [temples, isTempleMatching]);

  return (
    <div className="relative w-full overflow-hidden rounded-lg border border-soapstone-800 bg-night-950 shadow-[0_12px_40px_rgba(0,0,0,0.85),0_0_24px_rgba(234,179,8,0.1)]">
      {/* Real Interactive Leaflet Container */}
      <div
        ref={mapContainerRef}
        id="leaflet-explore-map"
        className="w-full h-[540px] sm:h-[640px] md:h-[720px] bg-night-950"
      />

      {/* Embedded CSS for Leaflet stone & lamplight theme overrides */}
      <style jsx global>{`
        .custom-leaflet-div-icon {
          background: transparent !important;
          border: none !important;
        }
        .custom-leaflet-popup .leaflet-popup-content-wrapper {
          background: #0b0d0e !important;
          color: #f7f3ee !important;
          border-radius: 6px !important;
          padding: 0 !important;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.95), 0 0 16px rgba(234, 179, 8, 0.2) !important;
        }
        .custom-leaflet-popup .leaflet-popup-content {
          margin: 0 !important;
          line-height: inherit !important;
        }
        .custom-leaflet-popup .leaflet-popup-tip {
          background: #0b0d0e !important;
          box-shadow: none !important;
        }
        .leaflet-control-zoom a {
          background-color: #14171a !important;
          color: #d4a359 !important;
          border: 1px solid #252a2e !important;
          transition: background-color 0.15s ease;
        }
        .leaflet-control-zoom a:hover {
          background-color: #252a2e !important;
          color: #fef08a !important;
        }
      `}</style>

      {/* Star Iris Wipe Transition */}
      <StarIrisTransition
        iris={iris}
        onComplete={() => {
          setIris((prev) => ({ ...prev, isActive: false }));
        }}
      />
    </div>
  );
}
