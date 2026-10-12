import { haversine, type GraphNode } from "./graph";
import type { TempleDetailData } from "./temple-data";

export const ROAD_FACTOR = 1.3;

export interface RouteOptions {
  startSlug: string;
  stopCount: number; // 3 to 5
  regionFilter?: string | null;
}

export interface RouteStep {
  stopNumber: number;
  temple: TempleDetailData;
  stepDistanceKm: number; // Approximate road distance (haversine * 1.3)
  cumulativeDistanceKm: number;
}

export interface RoutePlan {
  steps: RouteStep[];
  totalDistanceKm: number;
  googleMapsUrl: string;
}

export interface RouteCalculationResult {
  primaryRoute: RoutePlan;
  alternativeRoute: RoutePlan | null;
}

/**
 * Calculates road distance between two coordinates using the 1.3 road curvature factor.
 */
export function approximateRoadDistance(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number }
): number {
  const direct = haversine(a, b);
  return Math.round(direct * ROAD_FACTOR * 10) / 10;
}

/**
 * Builds a valid Google Maps directions URL for the ordered waypoints.
 */
export function buildGoogleMapsUrl(temples: TempleDetailData[]): string {
  if (temples.length < 2) return "";

  const origin = temples[0];
  const destination = temples[temples.length - 1];
  const waypoints = temples.slice(1, -1);

  let url = `https://www.google.com/maps/dir/?api=1&origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}&travelmode=driving`;

  if (waypoints.length > 0) {
    const waypointsParam = waypoints
      .map((w) => `${w.lat},${w.lng}`)
      .join("|");
    url += `&waypoints=${encodeURIComponent(waypointsParam)}`;
  }

  return url;
}

/**
 * Helper to construct a RoutePlan from an ordered list of temples.
 */
function createRoutePlan(orderedTemples: TempleDetailData[]): RoutePlan {
  let cumulative = 0;
  const steps: RouteStep[] = [];

  for (let i = 0; i < orderedTemples.length; i++) {
    const temple = orderedTemples[i];
    let stepDist = 0;

    if (i > 0) {
      const prev = orderedTemples[i - 1];
      stepDist = approximateRoadDistance(
        { lat: prev.lat, lng: prev.lng },
        { lat: temple.lat, lng: temple.lng }
      );
      cumulative += stepDist;
    }

    steps.push({
      stopNumber: i + 1,
      temple,
      stepDistanceKm: stepDist,
      cumulativeDistanceKm: Math.round(cumulative * 10) / 10,
    });
  }

  return {
    steps,
    totalDistanceKm: Math.round(cumulative * 10) / 10,
    googleMapsUrl: buildGoogleMapsUrl(orderedTemples),
  };
}

/**
 * Computes primary and alternative route itineraries given start, stop count, and optional region filter.
 */
export function computeRoute(
  allTemples: TempleDetailData[],
  options: RouteOptions
): RouteCalculationResult {
  const { startSlug, stopCount, regionFilter } = options;
  const targetStops = Math.min(Math.max(stopCount, 3), 5);

  const startTemple = allTemples.find((t) => t.slug === startSlug) || allTemples[0];
  if (!startTemple) {
    return {
      primaryRoute: { steps: [], totalDistanceKm: 0, googleMapsUrl: "" },
      alternativeRoute: null,
    };
  }

  // Filter candidates by region if requested and enough candidates exist in region
  let candidates = allTemples.filter((t) => t.slug !== startTemple.slug);
  if (regionFilter && regionFilter !== "all") {
    const regional = candidates.filter(
      (t) => t.region.toLowerCase() === regionFilter.toLowerCase()
    );
    if (regional.length >= targetStops - 1) {
      candidates = regional;
    }
  }

  // 1. Primary Route: Greedy nearest-neighbour from start
  const primaryOrder: TempleDetailData[] = [startTemple];
  const unvisitedPrimary = [...candidates];

  while (primaryOrder.length < targetStops && unvisitedPrimary.length > 0) {
    const current = primaryOrder[primaryOrder.length - 1];
    let bestIdx = 0;
    let bestDist = Infinity;

    for (let i = 0; i < unvisitedPrimary.length; i++) {
      const dist = haversine(
        { lat: current.lat, lng: current.lng },
        { lat: unvisitedPrimary[i].lat, lng: unvisitedPrimary[i].lng }
      );
      if (dist < bestDist) {
        bestDist = dist;
        bestIdx = i;
      }
    }

    primaryOrder.push(unvisitedPrimary[bestIdx]);
    unvisitedPrimary.splice(bestIdx, 1);
  }

  const primaryPlan = createRoutePlan(primaryOrder);

  // 2. Alternative Route: Picks the 2nd closest candidate at the first step if possible
  let alternativePlan: RoutePlan | null = null;
  const unvisitedAlt = [...candidates];

  if (unvisitedAlt.length >= 2) {
    // Sort all candidates by distance to start
    unvisitedAlt.sort(
      (a, b) =>
        haversine({ lat: startTemple.lat, lng: startTemple.lng }, { lat: a.lat, lng: a.lng }) -
        haversine({ lat: startTemple.lat, lng: startTemple.lng }, { lat: b.lat, lng: b.lng })
    );

    // Pick 2nd nearest candidate as the first hop
    const altOrder: TempleDetailData[] = [startTemple, unvisitedAlt[1]];
    unvisitedAlt.splice(1, 1); // Remove 2nd nearest
    // Also remove the primary first hop if candidate count allows diversity
    const remaining = unvisitedAlt;

    while (altOrder.length < targetStops && remaining.length > 0) {
      const current = altOrder[altOrder.length - 1];
      let bestIdx = 0;
      let bestDist = Infinity;

      for (let i = 0; i < remaining.length; i++) {
        const dist = haversine(
          { lat: current.lat, lng: current.lng },
          { lat: remaining[i].lat, lng: remaining[i].lng }
        );
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = i;
        }
      }

      altOrder.push(remaining[bestIdx]);
      remaining.splice(bestIdx, 1);
    }

    if (altOrder.length >= 3) {
      alternativePlan = createRoutePlan(altOrder);
    }
  }

  return {
    primaryRoute: primaryPlan,
    alternativeRoute: alternativePlan,
  };
}
