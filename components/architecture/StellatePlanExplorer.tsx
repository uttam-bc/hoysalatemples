"use client";

import React, { useState } from "react";
import { StarIcon } from "@/components/ui/StarIcon";

interface Hotspot {
  id: string;
  name: string;
  kannadaName: string;
  x: number;
  y: number;
  summary: string;
  classicalRole: string;
  examples: string;
}

const PLAN_HOTSPOTS: Hotspot[] = [
  {
    id: "vimana",
    name: "Stellate Vimana (Sanctum)",
    kannadaName: "ನಕ್ಷತ್ರಾಕಾರದ ಗರ್ಭಗೃಹ",
    x: 480,
    y: 240,
    summary:
      "An 8- or 16-pointed star formed by rotating equal squares around a central pivot. The multiplied exterior corners (re-entrant angles) dramatically multiply the wall surface area, maximizing space for sculpted friezes and casting rhythmically alternating vertical shadows throughout the day.",
    classicalRole:
      "Houses the primary consecrated murti (deity) inside a square garbhagriha, surrounded by a thick, massive load-bearing stone perimeter.",
    examples: "Belur (Chennakeshava), Somanathapura (Chennakesava), Arasikere (Ishvara)",
  },
  {
    id: "antarala",
    name: "Antarala (Vestibule)",
    kannadaName: "ಅಂತರಾಳ / ಸುಖನಾಸಿ",
    x: 375,
    y: 240,
    summary:
      "A narrow, low-ceilinged threshold corridor connecting the illuminated navaranga hall to the dark, sacred vimana chamber. Its exterior superstructure projects forward as the sukanasi (the temple's 'nose'), carrying the royal Hoysala emblem of Sala slaying the lion.",
    classicalRole:
      "A psychological and spiritual transition zone between secular gathering and inner divine sanctum.",
    examples: "Halebidu (Hoysaleswara), Belavadi (Veera Narayana)",
  },
  {
    id: "navaranga",
    name: "Navaranga (Nine-Bay Hall)",
    kannadaName: "ನವರಂಗ / ಮಹಾಮಂಟಪ",
    x: 240,
    y: 240,
    summary:
      "A large pillared gathering hall partitioned into nine distinct bays (navaranga) by four central lathe-turned pillars. The central square ceiling bay is deeply coffered with tiered concentric rings and carved lotus buds.",
    classicalRole:
      "Used for temple dance (natya), music recitals, devotional congregations, and royal audience.",
    examples: "Belur, Halebidu, Amruthapura (Amrutesvara)",
  },
  {
    id: "jagati",
    name: "Jagati (Raised Terrace)",
    kannadaName: "ಜಗತಿ / ಪ್ರದಕ್ಷಿಣಾಪಥ",
    x: 100,
    y: 130,
    summary:
      "A wide, raised stone terrace elevating the entire temple complex 1 to 2 metres above natural ground level. Because Hoysala shrines frequently lack an internal circumambulation passage around the inner deity, the exterior jagati serves as the open-air pradakshinapatha.",
    classicalRole:
      "Facilitates outdoor clock-wise circumambulation while allowing devotees to view narrative friezes at eye-level.",
    examples: "Somanathapura, Belur, Hosaholalu",
  },
  {
    id: "lathe-pillars",
    name: "Central Lathe-Turned Pillars",
    kannadaName: "ತಿರುಗಣೆ ಕಂಬಗಳು",
    x: 240,
    y: 190,
    summary:
      "Four monolithic soapstone columns placed at the corners of the central dance pavilion. Each pillar was shaped on mechanical lathes using water power and abrasive slurry, resulting in high-precision circular bell moulds and mirror-reflective finishes.",
    classicalRole:
      "Primary load-bearing supports for the massive central stone ceiling vault.",
    examples: "Belur (Narasimha pillar), Halebidu (Mohini pillar)",
  },
];

const ELEVATION_HOTSPOTS: Hotspot[] = [
  {
    id: "adhishthana",
    name: "Adhishthana (Frieze Plinth)",
    kannadaName: "ಅಧಿಷ್ಠಾನ / ಪೀಠ",
    x: 300,
    y: 380,
    summary:
      "The massive layered basement platform carrying 6 to 8 continuous, horizontal relief friezes. Stacked bands of elephants, cavalry, foliage, epics, yalis, and hamsas run uninterrupted around every star point of the perimeter.",
    classicalRole:
      "Forms the visual foundation of the temple while narrating sacred Hindu epics to walking pilgrims.",
    examples: "Halebidu, Somanathapura, Basaralu",
  },
  {
    id: "jangha",
    name: "Jangha (Wall Register)",
    kannadaName: "ಜಂಘಾ / ಶಿಲ್ಪ ಫಲಕ",
    x: 300,
    y: 260,
    summary:
      "The central vertical wall surface above the basement friezes. Here, near life-size statues of deities, avatars, musicians, and bracket dancers (madanikas) are carved under elaborate miniature architectural canopies (toranas).",
    classicalRole:
      "Displays the divine cosmos, including signed works by master sculptors like Mallitamma and Dasoja.",
    examples: "Belur Chennakeshava, Halebidu Hoysaleswara",
  },
  {
    id: "chhajja",
    name: "Chhajja (Projecting Eaves)",
    kannadaName: "ಛಜ್ಜಾ / ತೂಗು ಸೂರು",
    x: 300,
    y: 180,
    summary:
      "Heavy, double-curved projecting stone eaves designed to throw monsoonal rainwater clear of the delicate wall reliefs. Underneath the eaves, angled struts house the famous madanika bracket figurines.",
    classicalRole:
      "Protects the soft chloritic schist sculptures from rainwater erosion while casting dramatic deep shadow lines.",
    examples: "Belur, Halebidu, Belavadi",
  },
  {
    id: "shikhara",
    name: "Shikhara (Stepped Stellate Tower)",
    kannadaName: "ಶಿಖರ / ವಿಮಾನ ಗೋಪುರ",
    x: 300,
    y: 90,
    summary:
      "The multi-tiered tower rising directly over the sanctum, faithfully mirroring the star-shaped contour of the floor plan. Each diminishing horizontal tier is decorated with miniature shrines (kutas and salas) rising to a ribbed star capstone.",
    classicalRole:
      "Represents Mount Meru, the cosmic mountain connecting earthly worshippers with the celestial realm.",
    examples: "Somanathapura, Arasikere, Amruthapura",
  },
  {
    id: "kalasha",
    name: "Kalasha & Sukanasi Finial",
    kannadaName: "ಕಲಶ / ಸ್ತೂಪಿ",
    x: 300,
    y: 25,
    summary:
      "The crowning gilded copper or carved stone water-pot finial atop the shikhara. Forward of the main tower, the sukanasi tower projection carries the sculpted royal emblem of young prince Sala slaying the mythical tiger.",
    classicalRole:
      "The spiritual pinnacle of the temple, focusing divine cosmic energy into the consecrated linga or murti below.",
    examples: "Somanathapura, Kikkeri, Belavadi",
  },
];

export function StellatePlanExplorer() {
  const [activeTab, setActiveTab] = useState<"plan" | "elevation">("plan");
  const [selectedHotspotId, setSelectedHotspotId] = useState<string>("vimana");
  const [showTextList, setShowTextList] = useState(false);

  const currentHotspots = activeTab === "plan" ? PLAN_HOTSPOTS : ELEVATION_HOTSPOTS;
  const currentHotspot =
    currentHotspots.find((h) => h.id === selectedHotspotId) || currentHotspots[0];

  const handleTabSwitch = (tab: "plan" | "elevation") => {
    setActiveTab(tab);
    setSelectedHotspotId(tab === "plan" ? "vimana" : "adhishthana");
  };

  return (
    <section aria-label="Interactive architecture explorer" className="w-full mb-16 sm:mb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section title & mode switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs font-serif uppercase tracking-widest text-[#b07512]">
              <StarIcon className="w-3.5 h-3.5 text-[#b07512]" />
              <span>Interactive Blueprint</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#ede7de]">
              Stellate Ground Plan & Elevation Profile
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-[#10121a] border border-[#2d3244] p-1 rounded-sm flex">
              <button
                type="button"
                onClick={() => handleTabSwitch("plan")}
                className={`px-4 py-1.5 text-xs font-serif uppercase tracking-wider rounded-xs transition-colors ${
                  activeTab === "plan"
                    ? "bg-[#b07512] text-[#0b0c12] font-semibold shadow"
                    : "text-[#9e9787] hover:text-[#ede7de]"
                }`}
              >
                Ground Plan (ನಕ್ಷೆ)
              </button>
              <button
                type="button"
                onClick={() => handleTabSwitch("elevation")}
                className={`px-4 py-1.5 text-xs font-serif uppercase tracking-wider rounded-xs transition-colors ${
                  activeTab === "elevation"
                    ? "bg-[#b07512] text-[#0b0c12] font-semibold shadow"
                    : "text-[#9e9787] hover:text-[#ede7de]"
                }`}
              >
                Elevation Profile (ಎತ್ತರ)
              </button>
            </div>

            <button
              type="button"
              onClick={() => setShowTextList((prev) => !prev)}
              className="px-3 py-2 bg-[#10121a] hover:bg-[#1a1e2e] border border-[#2d3244] text-[11px] font-serif uppercase tracking-wider text-[#ede7de] rounded-xs transition-colors flex items-center gap-1.5"
              aria-expanded={showTextList}
              aria-controls="architecture-text-list"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#e8c36a]" />
              {showTextList ? "Hide Text List" : "Show Text List"}
            </button>
          </div>
        </div>

        {/* Interactive Diagram Stage and Detail Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* SVG Diagram Canvas */}
          <div className="lg:col-span-7 bg-[#10121a] border border-[#2d3244] rounded-sm p-4 sm:p-6 shadow-xl relative overflow-hidden flex flex-col items-center">
            <div className="w-full flex items-center justify-between text-[11px] font-serif uppercase tracking-widest text-[#9e9787] mb-2 pb-2 border-b border-[#1c2030]">
              <span>
                {activeTab === "plan"
                  ? "16-Point Stellate Plan Blueprint"
                  : "Vesara Superstructure Elevation"}
              </span>
              <span className="text-[#b07512] font-mono">Select a Hotspot ★</span>
            </div>

            <div className="relative w-full aspect-[4/3] max-h-[460px] flex items-center justify-center">
              <svg
                viewBox="0 0 600 480"
                className="w-full h-full select-none"
                role="img"
                aria-label={
                  activeTab === "plan"
                    ? "Interactive Hoysala stellate ground plan diagram"
                    : "Interactive Hoysala temple elevation cross-section"
                }
              >
                <defs>
                  <filter id="hotspot-glow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* ================= PLAN VIEW ================= */}
                {activeTab === "plan" && (
                  <g>
                    {/* Jagati terrace outline (large circumambulatory platform) */}
                    <polygon
                      points="40,80 560,80 560,400 40,400"
                      fill="#141724"
                      stroke="#2d3244"
                      strokeWidth="2.5"
                    />
                    <polygon
                      points="20,100 580,100 580,380 20,380"
                      fill="none"
                      stroke="#252a3b"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                    />

                    {/* Entrance steps to Jagati */}
                    <rect x="15" y="210" width="25" height="60" fill="#1b2030" stroke="#2d3244" strokeWidth="1.5" />
                    <line x1="23" y1="210" x2="23" y2="270" stroke="#b07512" strokeWidth="1" />
                    <line x1="31" y1="210" x2="31" y2="270" stroke="#b07512" strokeWidth="1" />

                    {/* Navaranga Pillared Hall (Closed Hall perimeter) */}
                    <rect
                      x="160"
                      y="160"
                      width="160"
                      height="160"
                      fill="#0e1017"
                      stroke="#3b4259"
                      strokeWidth="2.5"
                    />

                    {/* Central 9-Bay Grid Lines in Navaranga */}
                    <line x1="213" y1="160" x2="213" y2="320" stroke="#252a3b" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="266" y1="160" x2="266" y2="320" stroke="#252a3b" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="160" y1="213" x2="320" y2="213" stroke="#252a3b" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="160" y1="266" x2="320" y2="266" stroke="#252a3b" strokeWidth="1" strokeDasharray="3 3" />

                    {/* Central Natyamandapa Raised Dance Circle */}
                    <circle cx="240" cy="240" r="32" fill="#141724" stroke="#b07512" strokeWidth="1.5" />

                    {/* 4 Lathe-Turned Monolithic Columns around dance circle */}
                    <circle cx="213" cy="213" r="7" fill="#0b0c12" stroke="#e8c36a" strokeWidth="2" />
                    <circle cx="267" cy="213" r="7" fill="#0b0c12" stroke="#e8c36a" strokeWidth="2" />
                    <circle cx="213" cy="267" r="7" fill="#0b0c12" stroke="#e8c36a" strokeWidth="2" />
                    <circle cx="267" cy="267" r="7" fill="#0b0c12" stroke="#e8c36a" strokeWidth="2" />

                    {/* Antarala Vestibule */}
                    <rect
                      x="320"
                      y="205"
                      width="80"
                      height="70"
                      fill="#0b0c12"
                      stroke="#3b4259"
                      strokeWidth="2"
                    />

                    {/* Stellate Vimana (16-Point Rotated Star geometry) */}
                    <g transform="translate(480 240)">
                      {/* Square 1 */}
                      <rect x="-65" y="-65" width="130" height="130" fill="none" stroke="#b07512" strokeWidth="2" />
                      {/* Square 2 (rotated 22.5 deg) */}
                      <rect x="-65" y="-65" width="130" height="130" transform="rotate(22.5)" fill="none" stroke="#b07512" strokeWidth="2" />
                      {/* Square 3 (rotated 45 deg) */}
                      <rect x="-65" y="-65" width="130" height="130" transform="rotate(45)" fill="none" stroke="#b07512" strokeWidth="2" />
                      {/* Square 4 (rotated 67.5 deg) */}
                      <rect x="-65" y="-65" width="130" height="130" transform="rotate(67.5)" fill="none" stroke="#b07512" strokeWidth="2" />

                      {/* Inner Sanctum (Garbhagriha) square chamber */}
                      <rect x="-35" y="-35" width="70" height="70" fill="#0b0c12" stroke="#e8c36a" strokeWidth="2" />
                      {/* Consecrated Murti pedestal & Linga */}
                      <circle cx="0" cy="0" r="10" fill="#e8c36a" />
                      <circle cx="0" cy="0" r="4" fill="#0b0c12" />
                    </g>
                  </g>
                )}

                {/* ================= ELEVATION VIEW ================= */}
                {activeTab === "elevation" && (
                  <g>
                    {/* Natural ground line */}
                    <line x1="30" y1="450" x2="570" y2="450" stroke="#252a3b" strokeWidth="3" />

                    {/* Tier 1: Adhishthana (Frieze plinth) */}
                    <rect x="70" y="390" width="460" height="55" fill="#141724" stroke="#2d3244" strokeWidth="2.5" />
                    {/* Frieze relief band lines */}
                    <line x1="70" y1="400" x2="530" y2="400" stroke="#b07512" strokeWidth="1" strokeDasharray="6 3" />
                    <line x1="70" y1="412" x2="530" y2="412" stroke="#9e9787" strokeWidth="1" strokeDasharray="3 2" />
                    <line x1="70" y1="424" x2="530" y2="424" stroke="#b07512" strokeWidth="1" strokeDasharray="8 4" />
                    <line x1="70" y1="436" x2="530" y2="436" stroke="#9e9787" strokeWidth="1" strokeDasharray="4 2" />

                    {/* Tier 2: Jangha (Sculpted wall register) */}
                    <rect x="110" y="270" width="380" height="120" fill="#0e1017" stroke="#3b4259" strokeWidth="2.5" />
                    {/* Wall niches & pilaster divisions */}
                    <line x1="160" y1="270" x2="160" y2="390" stroke="#252a3b" strokeWidth="1.5" />
                    <line x1="220" y1="270" x2="220" y2="390" stroke="#252a3b" strokeWidth="1.5" />
                    <line x1="300" y1="270" x2="300" y2="390" stroke="#b07512" strokeWidth="1.5" />
                    <line x1="380" y1="270" x2="380" y2="390" stroke="#252a3b" strokeWidth="1.5" />
                    <line x1="440" y1="270" x2="440" y2="390" stroke="#252a3b" strokeWidth="1.5" />

                    {/* Madanika bracket angled struts */}
                    <line x1="145" y1="270" x2="160" y2="245" stroke="#e8c36a" strokeWidth="2" />
                    <line x1="205" y1="270" x2="220" y2="245" stroke="#e8c36a" strokeWidth="2" />
                    <line x1="395" y1="270" x2="380" y2="245" stroke="#e8c36a" strokeWidth="2" />
                    <line x1="455" y1="270" x2="440" y2="245" stroke="#e8c36a" strokeWidth="2" />

                    {/* Tier 3: Chhajja (Double-curved projecting eaves) */}
                    <polygon
                      points="80,245 520,245 490,270 110,270"
                      fill="#1b2030"
                      stroke="#b07512"
                      strokeWidth="2"
                    />

                    {/* Tier 4: Shikhara (Stepped Stellate Spire) */}
                    {/* Tier 4a */}
                    <polygon points="140,245 460,245 440,200 160,200" fill="#141724" stroke="#2d3244" strokeWidth="2" />
                    {/* Tier 4b */}
                    <polygon points="170,200 430,200 410,150 190,150" fill="#10121a" stroke="#2d3244" strokeWidth="2" />
                    {/* Tier 4c */}
                    <polygon points="200,150 400,150 380,105 220,105" fill="#141724" stroke="#2d3244" strokeWidth="2" />
                    {/* Tier 4d - Neck & Griva */}
                    <polygon points="230,105 370,105 350,65 250,65" fill="#10121a" stroke="#b07512" strokeWidth="2" />

                    {/* Sukanasi forward projection badge (Sala slaying lion) */}
                    <polygon points="160,200 120,200 150,165" fill="#b07512" stroke="#e8c36a" strokeWidth="1.5" />

                    {/* Ribbed Stellate Capstone (Amalaka / Stupi) */}
                    <ellipse cx="300" cy="62" rx="55" ry="12" fill="#1b2030" stroke="#e8c36a" strokeWidth="2" />

                    {/* Tier 5: Kalasha (Golden Pot Finial) */}
                    <path
                      d="M292,50 C290,40, 285,30, 300,15 C315,30, 310,40, 308,50 Z"
                      fill="#e8c36a"
                      stroke="#b07512"
                      strokeWidth="1.5"
                    />
                    <circle cx="300" cy="12" r="3" fill="#ffffff" />
                  </g>
                )}

                {/* ================= INTERACTIVE HOTSPOT PINS ================= */}
                {currentHotspots.map((spot) => {
                  const isSelected = spot.id === currentHotspot.id;

                  return (
                    <g
                      key={spot.id}
                      transform={`translate(${spot.x}, ${spot.y})`}
                      className="cursor-pointer"
                      onClick={() => setSelectedHotspotId(spot.id)}
                    >
                      {/* Pulse halo for selected */}
                      {isSelected && (
                        <circle
                          cx="0"
                          cy="0"
                          r="20"
                          fill="#b07512"
                          opacity="0.35"
                          filter="url(#hotspot-glow)"
                        />
                      )}

                      {/* Hotspot node badge */}
                      <circle
                        cx="0"
                        cy="0"
                        r={isSelected ? "14" : "11"}
                        fill={isSelected ? "#e8c36a" : "#10121a"}
                        stroke={isSelected ? "#ffffff" : "#b07512"}
                        strokeWidth={isSelected ? "2" : "1.5"}
                        className="transition-all duration-200"
                      />

                      {/* 8-point Star glyph inside button */}
                      <path
                        d="M0 -7 L1.2 -2.5 L6 -2 L2.4 1 L3.6 5.5 L0 3 L-3.6 5.5 L-2.4 1 L-6 -2 L-1.2 -2.5 Z"
                        fill={isSelected ? "#0b0c12" : "#e8c36a"}
                      />

                      {/* Accessible invisible hit area button */}
                      <circle
                        cx="0"
                        cy="0"
                        r="26"
                        fill="transparent"
                        tabIndex={0}
                        role="button"
                        aria-label={`Inspect ${spot.name}`}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setSelectedHotspotId(spot.id);
                          }
                        }}
                      />
                    </g>
                  );
                })}
              </svg>
            </div>

            <p className="text-[11px] text-[#9e9787] mt-3 italic text-center">
              Click or Tab through star pins to inspect structural details.
            </p>
          </div>

          {/* Side Explanation Detail Card */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#10121a] border border-[#2d3244] p-6 rounded-sm shadow-xl min-h-[440px]">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#1f2333]">
                <span className="text-xs font-serif uppercase tracking-widest text-[#b07512]">
                  {activeTab === "plan" ? "Plan Element" : "Superstructure Register"}
                </span>
                <span className="text-[11px] text-[#e8c36a] font-mono px-2 py-0.5 bg-[#1f2333] rounded-xs border border-[#2d3244]">
                  Active Hotspot
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif text-[#ede7de]">
                {currentHotspot.name}
              </h3>
              <p className="font-kannada text-sm text-[#e8c36a] mt-0.5 mb-4">
                {currentHotspot.kannadaName}
              </p>

              <div className="space-y-4 text-sm text-[#c4bba8] leading-relaxed">
                <div>
                  <h4 className="text-[11px] font-serif uppercase tracking-widest text-[#9e9787] mb-1">
                    Architectural Grammar
                  </h4>
                  <p>{currentHotspot.summary}</p>
                </div>

                <div className="border-l-2 border-[#b07512]/60 pl-3 py-0.5">
                  <h4 className="text-[11px] font-serif uppercase tracking-widest text-[#9e9787] mb-0.5">
                    Liturgical & Spatial Function
                  </h4>
                  <p className="text-xs text-[#9e9787]">{currentHotspot.classicalRole}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#1c2030]">
              <span className="text-[10px] font-serif uppercase tracking-widest text-[#6b665c] block mb-1">
                Canonical Exemplars in Karnataka:
              </span>
              <p className="text-xs text-[#ede7de] font-medium font-serif">
                {currentHotspot.examples}
              </p>
            </div>
          </div>
        </div>

        {/* Text-List Accessible Alternative */}
        {showTextList && (
          <div
            id="architecture-text-list"
            className="mt-8 bg-[#0b0c12] border border-[#2d3244] p-6 sm:p-8 rounded-sm shadow-inner"
          >
            <h3 className="text-lg font-serif text-[#ede7de] mb-4 flex items-center gap-2">
              <StarIcon className="w-4 h-4 text-[#b07512]" />
              Comprehensive Architectural Glossary (All Elements)
            </h3>

            <dl className="grid grid-cols-1 md:grid-cols-2 gap-6 divide-y md:divide-y-0 divide-[#1f2333]">
              {[...PLAN_HOTSPOTS, ...ELEVATION_HOTSPOTS].map((item) => (
                <div key={item.id} className="pt-4 md:pt-0">
                  <dt className="font-serif text-[#ede7de] text-base font-medium flex items-baseline gap-2">
                    <span>{item.name}</span>
                    <span className="font-kannada text-xs text-[#e8c36a]">{item.kannadaName}</span>
                  </dt>
                  <dd className="text-xs text-[#9e9787] mt-1 leading-relaxed">
                    {item.summary}
                  </dd>
                  <dd className="text-[11px] text-[#6b665c] mt-1 font-serif">
                    Examples: {item.examples}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>
    </section>
  );
}
