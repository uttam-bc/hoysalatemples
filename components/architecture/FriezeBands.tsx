import React from "react";
import { StarIcon } from "@/components/ui/StarIcon";

interface FriezeTier {
  position: string;
  sanskritName: string;
  kannadaName: string;
  motifName: string;
  significance: string;
  artisticDetail: string;
  svgIcon: React.ReactNode;
}

export function FriezeBands() {
  const tiers: FriezeTier[] = [
    {
      position: "Tier 1 (Lowest Baseline)",
      sanskritName: "Gajathara (गजथर)",
      kannadaName: "ಆನೆಗಳ ಸಾಲು (ಗಜ)",
      motifName: "Elephants",
      significance: "Structural stability, cosmic endurance, and grounded earthly strength.",
      artisticDetail:
        "Thousands of elephants march clockwise along the jagati platform. In masterworks like Halebidu, no two elephants among over 1,200 figures share an identical stance—some charge, others battle, trumpet, or browse foliage.",
      svgIcon: (
        <svg viewBox="0 0 48 48" className="w-8 h-8 text-[#e8c36a]" role="img" aria-label="Elephant frieze motif">
          {/* Stylized elephant profile */}
          <path
            d="M12 28 C12 22, 16 16, 26 16 C34 16, 38 20, 39 26 L41 29 C42 32, 40 35, 37 35 L37 40 L33 40 L33 33 L27 33 L27 40 L23 40 L23 32 L19 32 L19 40 L15 40 L15 32 C13 32, 12 30, 12 28 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Trunk and ear */}
          <path d="M14 24 C10 24, 7 28, 8 34 C8 37, 11 37, 12 35" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M21 19 C18 20, 17 24, 19 26" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="16" cy="22" r="1.5" fill="currentColor" />
        </svg>
      ),
    },
    {
      position: "Tier 2",
      sanskritName: "Ashvathara (अश्वथर)",
      kannadaName: "ಕುದುರೆಗಳ ಸಾಲು (ಅಶ್ವ)",
      motifName: "Charging Cavalry",
      significance: "Martial agility, royal expedition, and sovereign velocity.",
      artisticDetail:
        "Armed royal horsemen with bridles and stirrups galloping in battle formation, representing the Hoysala Empire's mobile frontier cavalry.",
      svgIcon: (
        <svg viewBox="0 0 48 48" className="w-8 h-8 text-[#e8c36a]" role="img" aria-label="Cavalry frieze motif">
          {/* Leaping horse profile */}
          <path
            d="M10 32 L15 26 L22 24 L27 18 L32 16 L37 20 L35 24 L30 25 L34 32 L38 30 L40 33 L32 38 L25 33 L18 34 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Rider */}
          <circle cx="28" cy="14" r="2.5" fill="currentColor" />
          <line x1="28" y1="17" x2="27" y2="23" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
    },
    {
      position: "Tier 3",
      sanskritName: "Latathara / Patrakari (लताथर)",
      kannadaName: "ಲತಾ / ಬಳ್ಳಿಗಳ ಸಾಲು",
      motifName: "Floral Scrollwork",
      significance: "Fertile cosmic abundance, sacred vegetation, and rhythmic continuity.",
      artisticDetail:
        "Meandering serpentine creeper vines with deeply undercut leaves, buds, and miniature birds nested within the foliage loops.",
      svgIcon: (
        <svg viewBox="0 0 48 48" className="w-8 h-8 text-[#e8c36a]" role="img" aria-label="Foliage scrollwork motif">
          <path
            d="M6 24 C10 14, 18 14, 22 24 C26 34, 34 34, 38 24 C40 18, 44 20, 46 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="14" cy="19" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="30" cy="29" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      position: "Tier 4 (Widest Relief)",
      sanskritName: "Katha / Purana (कथा)",
      kannadaName: "ಪುರಾಣ ಕಥಾನಕಗಳು",
      motifName: "Epic Narratives",
      significance: "Sacred storytelling: Ramayana, Mahabharata, and Bhagavata Purana.",
      artisticDetail:
        "Devotees performing pradakshina read the epics scene-by-scene: Arjuna shooting the fish-target, Rama conquering Ravana, and Krishna uplifting Mount Govardhana.",
      svgIcon: (
        <svg viewBox="0 0 48 48" className="w-8 h-8 text-[#e8c36a]" role="img" aria-label="Epic narrative motif">
          {/* Bow and arrow of epic warfare */}
          <path d="M12 10 C24 14, 24 34, 12 38" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="12" y1="10" x2="12" y2="38" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" />
          <line x1="8" y1="24" x2="38" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <polygon points="38,21 44,24 38,27" fill="currentColor" />
        </svg>
      ),
    },
    {
      position: "Tier 5",
      sanskritName: "Makarathara (मकरथर)",
      kannadaName: "ಮಕರ ಸಾಲು",
      motifName: "Mythic Makaras",
      significance: "Apotropaic protection; composite aquatic guardians deflecting malevolence.",
      artisticDetail:
        "Fantastic mythical beasts blending the trunk of an elephant, jaws of a crocodile, tusks of a wild boar, and scrolling peacock tail feathers.",
      svgIcon: (
        <svg viewBox="0 0 48 48" className="w-8 h-8 text-[#e8c36a]" role="img" aria-label="Makara guardian motif">
          <path
            d="M10 28 C8 24, 14 18, 22 20 C28 22, 34 16, 40 22 C42 25, 38 32, 30 30 C22 28, 16 34, 10 28 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          {/* Floriated tail plumes */}
          <path d="M38 20 C42 16, 44 24, 40 28" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="16" cy="22" r="1.5" fill="currentColor" />
        </svg>
      ),
    },
    {
      position: "Tier 6 (Crowning Band)",
      sanskritName: "Hamsathara (हंसथर)",
      kannadaName: "ಹಂಸಗಳ ಸಾಲು",
      motifName: "Sacred Swans",
      significance: "Spiritual discernment (viveka), purity, and celestial ascent.",
      artisticDetail:
        "Procession of sacred hamsas carrying pearl necklaces in their beaks, marking the transition from secular basement to the divine wall sculptures above.",
      svgIcon: (
        <svg viewBox="0 0 48 48" className="w-8 h-8 text-[#e8c36a]" role="img" aria-label="Hamsa swan motif">
          <path
            d="M12 28 C16 34, 30 34, 36 28 C39 24, 36 20, 32 20 L24 20 C22 16, 22 12, 26 10 C28 9, 29 11, 28 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="26" cy="12" r="1" fill="currentColor" />
          {/* Pearl in beak */}
          <circle cx="29" cy="14" r="1.5" fill="currentColor" />
        </svg>
      ),
    },
  ];

  return (
    <section aria-label="Narrative frieze registers" className="w-full mb-16 sm:mb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-2 mb-3 text-xs font-serif uppercase tracking-widest text-[#b07512]">
          <StarIcon className="w-3.5 h-3.5 text-[#b07512]" />
          <span>Sculptural Progression</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-serif text-[#ede7de] mb-4">
          The Continuous Horizontal Frieze Tiers
        </h2>
        <p className="text-sm sm:text-base text-[#9e9787] max-w-2xl mb-10 leading-relaxed">
          Encompassing every star point of the lower plinth, these horizontal narrative registers read from the ground upward like a stone scroll of cosmic creation.
        </p>

        <div className="space-y-4">
          {tiers.map((tier, idx) => (
            <div
              key={tier.motifName}
              className="bg-[#10121a] border border-[#2d3244] hover:border-[#b07512]/60 p-5 sm:p-6 rounded-sm transition-colors shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex items-start gap-4 sm:gap-6 flex-1">
                {/* SVG Motif Badge */}
                <div className="shrink-0 p-3 bg-[#0b0c12] border border-[#1f2333] rounded-sm flex items-center justify-center">
                  {tier.svgIcon}
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-serif tracking-wider">
                    <span className="text-[#b07512] font-semibold">{tier.position}</span>
                    <span className="text-[#4a5068]">•</span>
                    <span className="text-[#9e9787] font-mono text-[11px]">{tier.sanskritName}</span>
                    <span className="text-[#4a5068]">•</span>
                    <span className="font-kannada text-[#6b665c] text-[11px]">{tier.kannadaName}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-serif text-[#ede7de]">
                    {tier.motifName}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#c4bba8] max-w-2xl leading-relaxed">
                    {tier.artisticDetail}
                  </p>
                </div>
              </div>

              {/* Symbolic significance pill */}
              <div className="md:w-64 shrink-0 bg-[#0b0c12] border border-[#1c2030] p-3 rounded-xs text-[11px] text-[#9e9787]">
                <span className="text-[#e8c36a] font-serif uppercase tracking-wider block mb-0.5">
                  Cosmic Symbolism:
                </span>
                {tier.significance}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
