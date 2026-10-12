import React from "react";
import { StarIcon } from "@/components/ui/StarIcon";

export function ArchitecturalPrimer() {
  const concepts = [
    {
      title: "Soapstone (Chloritic Schist)",
      kannadaTitle: "ಬಳಪದ ಕಲ್ಲು",
      category: "Medium & Material",
      description:
        "Unlike the hard granites used by the Cholas or Pallavas, Hoysala artisans sculpted in fine-grained chloritic schist (soapstone). Relatively soft when freshly quarried, it hardens over decades upon atmospheric oxidation, allowing jewel-like undercut details, deep relief friezes, and gossamer-fine jewellery on statues.",
      note: "Quarried locally from metamorphic belts across Hassan and Shivamogga.",
    },
    {
      title: "The Vesara Style",
      kannadaTitle: "ವೇಸರ ಶೈಲಿ",
      category: "Stylistic Synthesis",
      description:
        "The Hoysalas perfected the Vesara (hybrid) tradition, blending the stepped horizontal tiers of southern Dravida architecture with the curvilinear, ribbed vertical emphasis of northern Nagara shrines. The result is a uniquely compact, jewel-like silhouette with dramatic shadows.",
      note: "Evolved from Western Chalukyan prototypes developed at Aihole and Pattadakal.",
    },
    {
      title: "Shrine Configurations",
      kannadaTitle: "ಕೂಟ ವಿನ್ಯಾಸ",
      category: "Sanctum Typology",
      description:
        "Temples are categorised by the number of radiating vimanas (sanctums): Ekakuta (single shrine, e.g. Belur), Dvikuta (paired shrines facing a shared court, e.g. Halebidu), and Trikuta (triple shrines connected to a central hall, e.g. Somanathapura). Rare examples extend to Chatushkuta (four) or Panchakuta (five).",
      note: "TODO: verify chronological progression of multi-shrine typologies.",
    },
    {
      title: "Lathe-Turned Pillars",
      kannadaTitle: "ತಿರುಗಣೆ ಕಂಬಗಳು",
      category: "Hall Architecture",
      description:
        "The navaranga (pillared closed hall) features monolithic soapstone pillars turned on mechanical water- or animal-powered lathes. Artisans ground them against abrasive sand to produce circular, bell-shaped profiles, flared abaci, and disc mouldings with mirror-smooth, light-reflecting surfaces.",
      note: "Central four pillars typically stand on a raised central natyamandapa (dance platform).",
    },
    {
      title: "Madanikas (Bracket Figures)",
      kannadaTitle: "ಮದನಿಕೆಯರು / ಸಾಲಭಂಜಿಕೆಯರು",
      category: "Figurative Sculpture",
      description:
        "Cantilevered beneath the eaves and on the pillar capitals are madanikas (salabhanjikas)—sculpted celestial maidens in graceful tribhanga (three-bend) stances. They portray dancers, musicians, drummers, and hunters, frequently signed on their stone pedestals by celebrated sculptors like Ruvari Mallitamma and Dasoja.",
      note: "Belur's Chennakeshava temple preserves 38 external and 4 interior madanika brackets.",
    },
    {
      title: "Jali (Perforated Screens)",
      kannadaTitle: "ಜಾಲಂಧ್ರ",
      category: "Interior Lighting",
      description:
        "Hoysala inner sanctums rely on pierced stone latticework screens (jali or perforated stone windows) set between outer wall pillars. They diffuse the intense tropical Karnataka sunshine into subtle beams of lamplight, illuminating the central dance floor while keeping sanctums cool and mysterious.",
      note: "Varieties range from geometric star grids to miniature puranic relief panels.",
    },
  ];

  return (
    <section aria-label="Architectural fundamentals" className="w-full mb-16 sm:mb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-2 mb-3 text-xs font-serif uppercase tracking-widest text-[#b07512]">
          <StarIcon className="w-3.5 h-3.5 text-[#b07512]" />
          <span>Foundations & Grammar</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-serif text-[#ede7de] mb-4">
          The Anatomy of Hoysala Stonecraft
        </h2>
        <p className="text-sm sm:text-base text-[#9e9787] max-w-2xl mb-10 leading-relaxed">
          From chloritic schist quarries to lathe-turned mirror pillars, the Hoysalas developed an architectural vocabulary distinct from any other dynasty on the subcontinent.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {concepts.map((item) => (
            <div
              key={item.title}
              className="bg-[#10121a] border border-[#2d3244] hover:border-[#b07512]/60 p-6 rounded-sm flex flex-col justify-between transition-colors shadow-lg group"
            >
              <div>
                <div className="text-[11px] font-serif uppercase tracking-widest text-[#b07512] mb-1">
                  {item.category}
                </div>
                <h3 className="text-lg font-serif text-[#ede7de] group-hover:text-[#e8c36a] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs font-kannada text-[#9e9787] mt-0.5 mb-3">
                  {item.kannadaTitle}
                </p>
                <p className="text-sm text-[#c4bba8] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#1c2030] text-[11px] text-[#9e9787] italic">
                {item.note}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
