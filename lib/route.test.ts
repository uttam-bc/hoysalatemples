import { describe, it, expect } from "vitest";
import {
  approximateRoadDistance,
  buildGoogleMapsUrl,
  computeRoute,
  ROAD_FACTOR,
} from "./route";
import type { TempleDetailData } from "./temple-data";
import seedData from "../data/temples.seed.json";

describe("Route Planner Logic (/lib/route.ts)", () => {
  const dummyTemples: TempleDetailData[] = (seedData.temples as any[]).map((t, idx) => ({
    ...t,
    id: `t-${idx + 1}`,
    ringOrder: idx + 1,
    architecture: t.architecture,
    images: (t.images || []).map((img: any, i: number) => ({
      id: `img-${i}`,
      url: img.url,
      alt: img.alt,
      credit: img.credit,
      order: img.order,
      isHero: img.isHero,
    })),
  }));

  it("applies the 1.3 road factor correctly to haversine distance", () => {
    const a = { lat: 13.1629, lng: 75.8606 }; // Belur
    const b = { lat: 13.2124, lng: 75.9911 }; // Halebidu
    const roadDist = approximateRoadDistance(a, b);
    expect(roadDist).toBeGreaterThan(0);
    expect(ROAD_FACTOR).toBe(1.3);
  });

  it("builds a valid Google Maps directions URL with coordinates and waypoints", () => {
    const subset = dummyTemples.slice(0, 4);
    const url = buildGoogleMapsUrl(subset);
    expect(url).toContain("https://www.google.com/maps/dir/");
    expect(url).toContain("api=1");
    expect(url).toContain(`origin=${subset[0].lat},${subset[0].lng}`);
    expect(url).toContain(`destination=${subset[subset.length - 1].lat},${subset[subset.length - 1].lng}`);
    expect(url).toContain("travelmode=driving");
  });

  it("computes a primary route respecting 3 stops", () => {
    const result = computeRoute(dummyTemples, {
      startSlug: "chennakeshava-belur",
      stopCount: 3,
    });

    expect(result.primaryRoute.steps).toHaveLength(3);
    expect(result.primaryRoute.steps[0].temple.slug).toBe("chennakeshava-belur");
    expect(result.primaryRoute.steps[0].stopNumber).toBe(1);
    expect(result.primaryRoute.steps[0].stepDistanceKm).toBe(0);
    expect(result.primaryRoute.totalDistanceKm).toBeGreaterThan(0);
  });

  it("computes a primary route respecting 5 stops", () => {
    const result = computeRoute(dummyTemples, {
      startSlug: "hoysaleswara-halebidu",
      stopCount: 5,
    });

    expect(result.primaryRoute.steps).toHaveLength(5);
    expect(result.primaryRoute.steps[0].temple.slug).toBe("hoysaleswara-halebidu");
    expect(result.primaryRoute.steps[4].stopNumber).toBe(5);
  });

  it("clamps stopCount to a minimum of 3 and a maximum of 5", () => {
    const low = computeRoute(dummyTemples, {
      startSlug: "chennakesava-somanathapura",
      stopCount: 1,
    });
    expect(low.primaryRoute.steps).toHaveLength(3);

    const high = computeRoute(dummyTemples, {
      startSlug: "chennakesava-somanathapura",
      stopCount: 10,
    });
    expect(high.primaryRoute.steps).toHaveLength(5);
  });

  it("generates an alternative route distinct from primary route", () => {
    const result = computeRoute(dummyTemples, {
      startSlug: "chennakeshava-belur",
      stopCount: 4,
    });

    expect(result.alternativeRoute).not.toBeNull();
    if (result.alternativeRoute) {
      expect(result.alternativeRoute.steps).toHaveLength(4);
      expect(result.alternativeRoute.steps[0].temple.slug).toBe("chennakeshava-belur");
      // The second stop in alternative should differ from primary
      expect(result.alternativeRoute.steps[1].temple.slug).not.toBe(
        result.primaryRoute.steps[1].temple.slug
      );
    }
  });

  it("filters candidate temples by region when sufficient stops exist", () => {
    const result = computeRoute(dummyTemples, {
      startSlug: "chennakeshava-belur",
      stopCount: 3,
      regionFilter: "Hassan",
    });

    expect(result.primaryRoute.steps).toHaveLength(3);
    result.primaryRoute.steps.forEach((step) => {
      expect(step.temple.region.toLowerCase()).toBe("hassan");
    });
  });
});
