"use client";

/** Sparse bone dust — CSS-only transforms, few nodes, client-only. */
const PARTICLES = Array.from({ length: 16 }, (_, i) => ({
  left: `${(i * 19 + 7) % 94}%`,
  bottom: `${(i * 11) % 40}%`,
  size: 1 + (i % 3),
  duration: `${16 + (i % 8)}s`,
  delay: `${(i * 0.9) % 10}s`,
  drift: `${(i % 2 === 0 ? 10 : -8) + (i % 5)}px`,
}));

export function HeroDust() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="hero-dust-mote absolute rounded-full bg-bone/70"
          style={{
            left: p.left,
            bottom: p.bottom,
            width: p.size,
            height: p.size,
            animationDuration: p.duration,
            animationDelay: p.delay,
            ["--dust-drift" as string]: p.drift,
          }}
        />
      ))}
    </div>
  );
}
