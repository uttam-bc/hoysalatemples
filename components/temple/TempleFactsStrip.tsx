import React from "react";
import type { TempleDetailData } from "@/lib/temple-data";

interface TempleFactsStripProps {
  temple: TempleDetailData;
}

export function TempleFactsStrip({ temple }: TempleFactsStripProps) {
  // Built year & century display
  const periodText = temple.century.includes("Century")
    ? `${temple.yearBuilt} (${temple.century})`
    : `${temple.yearBuilt} (${temple.century} Century)`;

  // UNESCO status formatting: only includes 2023 if present in source data
  const has2023InSource = temple.unescoStatus.includes("2023");
  const unescoDisplay = has2023InSource
    ? temple.unescoStatus
    : temple.unescoStatus.replace(/2023/g, "").trim();

  const facts = [
    {
      label: "Consecration",
      kannadaLabel: "ನಿರ್ಮಾಣ ಕಾಲ",
      value: periodText,
    },
    {
      label: "Royal Patron",
      kannadaLabel: "ಪೋಷಕರು",
      value: temple.patron,
    },
    {
      label: "Sanctum Deity",
      kannadaLabel: "ಪ್ರಧಾನ ದೈವ",
      value: temple.deity,
    },
    {
      label: "Territory",
      kannadaLabel: "ಸ್ಥಳ",
      value: `${temple.town}, ${temple.district}`,
    },
    {
      label: "UNESCO Heritage",
      kannadaLabel: "ವಿಶ್ವ ಪರಂಪರೆ",
      value: unescoDisplay,
      highlight: unescoDisplay.toLowerCase().includes("inscribed"),
    },
  ];

  return (
    <section
      aria-label="Sanctuary facts"
      className="w-full relative z-20 -mt-10 mb-12 sm:mb-16"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Carved-lintel frame */}
        <div className="bg-[#10121a]/95 backdrop-blur-md border border-[#2d3244] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_12px_32px_-8px_rgba(0,0,0,0.85)] rounded-sm p-4 sm:p-6 lg:p-7 relative overflow-hidden">
          {/* Subtle top chiselled groove */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#b07512]/60 to-transparent" />

          {/* 2-column on mobile, 5-column on desktop */}
          <dl className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6 divide-y md:divide-y-0 divide-[#1f2333]/80">
            {facts.map((fact, index) => {
              const isLastOnOdd =
                index === facts.length - 1 && facts.length % 2 !== 0;

              return (
                <div
                  key={fact.label}
                  className={`pt-3 md:pt-0 ${
                    index < 2 ? "pt-0" : ""
                  } ${
                    isLastOnOdd ? "col-span-2 md:col-span-1" : "col-span-1"
                  } flex flex-col justify-between`}
                >
                  <dt className="text-[11px] sm:text-xs font-serif uppercase tracking-widest text-[#9e9787] mb-1 flex items-baseline gap-1.5 flex-wrap">
                    <span>{fact.label}</span>
                    <span className="font-kannada text-[10px] text-[#6b665c] normal-case tracking-normal">
                      · {fact.kannadaLabel}
                    </span>
                  </dt>
                  <dd
                    className={`text-sm sm:text-base font-medium leading-snug ${
                      fact.highlight
                        ? "text-[#e8c36a] drop-shadow-[0_1px_4px_rgba(176,117,18,0.3)]"
                        : "text-[#ede7de]"
                    }`}
                  >
                    {fact.value}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </div>
    </section>
  );
}
