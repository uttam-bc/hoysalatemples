/**
 * Tweakable hero motion. Depth = travel/scale strength, openingEnd = when
 * the doorway is fully open (rest of scroll fades the flood into Explore),
 * flicker range = inner-lamp irregular pulse (seconds).
 */
export const HERO = {
  depth: 1,
  openingEnd: 0.6,
  flickerMin: 4,
  flickerMax: 7,
} as const;

export const HERO_PLACEHOLDER_IMAGE = "/placeholders/temple-dusk-placeholder.svg";
