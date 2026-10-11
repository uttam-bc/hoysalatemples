import { describe, it, expect } from "vitest";
import {
  haversine,
  buildRing,
  buildRingLinks,
  addCrossLinks,
  getNeighbors,
  type GraphNode,
} from "./graph";
import seedData from "../data/temples.seed.json";

describe("graph algorithms", () => {
  const dummyTemples: GraphNode[] = [
    { id: "t1", slug: "t1", lat: 13.16, lng: 75.86 },
    { id: "t2", slug: "t2", lat: 13.21, lng: 75.99 },
    { id: "t3", slug: "t3", lat: 12.27, lng: 76.90 },
    { id: "t4", slug: "t4", lat: 13.31, lng: 76.06 },
  ];

  const thirteenTemples: GraphNode[] = seedData.temples.map((t, index) => ({
    id: `temple-${index + 1}`,
    slug: t.slug,
    name: t.name,
    lat: t.lat,
    lng: t.lng,
  }));

  describe("haversine()", () => {
    it("returns 0 for identical points", () => {
      const p = { lat: 13.1629, lng: 75.8606 };
      expect(haversine(p, p)).toBe(0);
    });

    it("calculates accurate distance between Belur and Halebidu (~15-18 km)", () => {
      const belur = { lat: 13.1629, lng: 75.8606 };
      const halebidu = { lat: 13.2124, lng: 75.9911 };
      const dist = haversine(belur, halebidu);
      expect(dist).toBeGreaterThan(14);
      expect(dist).toBeLessThan(18);
    });
  });

  describe("buildRing() and ring links for n = 1, 2, 3, 13", () => {
    it("handles n = 1 correctly", () => {
      const nodes = [dummyTemples[0]];
      const ring = buildRing(nodes);
      expect(ring).toHaveLength(1);
      expect(ring[0].id).toBe(nodes[0].id);

      const links = buildRingLinks(ring);
      expect(links).toHaveLength(0);
    });

    it("handles n = 2 correctly", () => {
      const nodes = dummyTemples.slice(0, 2);
      const ring = buildRing(nodes);
      expect(ring).toHaveLength(2);

      const nodeIds = ring.map((n) => n.id);
      expect(new Set(nodeIds).size).toBe(2);

      const links = buildRingLinks(ring);
      expect(links).toHaveLength(2);
      expect(links[0].fromId).toBe(nodes[0].id);
      expect(links[0].toId).toBe(nodes[1].id);
    });

    it("handles n = 3: visits every node once and closes the ring", () => {
      const nodes = dummyTemples.slice(0, 3);
      const ring = buildRing(nodes);
      expect(ring).toHaveLength(3);

      const visitedSet = new Set(ring.map((n) => n.id));
      expect(visitedSet.size).toBe(3);

      const links = buildRingLinks(ring);
      expect(links).toHaveLength(3);
      // Verify closed ring: last connects to first
      expect(links[links.length - 1].toId).toBe(ring[0].id);

      // Verify no duplicate edges
      const edgeKeys = new Set(links.map((l) => `${l.fromId}->${l.toId}`));
      expect(edgeKeys.size).toBe(3);
    });

    it("handles n = 13: visits every temple exactly once in a closed ring", () => {
      expect(thirteenTemples).toHaveLength(13);
      const ring = buildRing(thirteenTemples);

      expect(ring).toHaveLength(13);

      // 1. Every node visited once
      const visitedIds = ring.map((n) => n.id);
      const uniqueIds = new Set(visitedIds);
      expect(uniqueIds.size).toBe(13);
      for (const t of thirteenTemples) {
        expect(uniqueIds.has(t.id)).toBe(true);
      }

      // 2. Closed ring links
      const ringLinks = buildRingLinks(ring);
      expect(ringLinks).toHaveLength(13);
      expect(ringLinks[12].toId).toBe(ring[0].id);

      // Verify each node appears exactly once as fromId and once as toId
      const fromIds = new Set(ringLinks.map((l) => l.fromId));
      const toIds = new Set(ringLinks.map((l) => l.toId));
      expect(fromIds.size).toBe(13);
      expect(toIds.size).toBe(13);

      // 3. No duplicate edges
      const linkKeys = new Set(ringLinks.map((l) => `${l.fromId}->${l.toId}`));
      expect(linkKeys.size).toBe(13);
    });
  });

  describe("addCrossLinks() and getNeighbors()", () => {
    it("returns no cross-links for n <= 3", () => {
      const ring = buildRing(dummyTemples.slice(0, 3));
      const cross = addCrossLinks(ring);
      expect(cross).toHaveLength(0);
    });

    it("adds non-adjacent cross-links with NO duplicates for n = 13", () => {
      const ring = buildRing(thirteenTemples);
      const ringLinks = buildRingLinks(ring);
      const crossLinks = addCrossLinks(ring, 2);

      expect(crossLinks.length).toBeGreaterThan(0);

      // Verify no duplicate undirected edges across cross links
      const seenPairs = new Set<string>();
      for (const cl of crossLinks) {
        const pairKey = [cl.fromId, cl.toId].sort().join("<->");
        expect(seenPairs.has(pairKey)).toBe(false);
        seenPairs.add(pairKey);
      }

      // Verify no cross link duplicates an adjacent ring edge
      const ringPairs = new Set(
        ringLinks.map((rl) => [rl.fromId, rl.toId].sort().join("<->"))
      );
      for (const cl of crossLinks) {
        const pairKey = [cl.fromId, cl.toId].sort().join("<->");
        expect(ringPairs.has(pairKey)).toBe(false);
      }
    });

    it("retrieves neighbors correctly using getNeighbors()", () => {
      const ring = buildRing(thirteenTemples);
      const ringLinks = buildRingLinks(ring);
      const crossLinks = addCrossLinks(ring);
      const allLinks = [...ringLinks, ...crossLinks];

      const firstSlug = ring[0].slug;
      const neighbors = getNeighbors(firstSlug, ring, allLinks);

      expect(neighbors.length).toBeGreaterThanOrEqual(2);
      // Ring neighbors should be present
      const ringNeighbors = neighbors.filter((n) => n.type === "ring");
      expect(ringNeighbors.length).toBeGreaterThanOrEqual(1);

      // Target itself shouldn't be in neighbors
      expect(neighbors.some((n) => n.node.slug === firstSlug)).toBe(false);
    });
  });
});
