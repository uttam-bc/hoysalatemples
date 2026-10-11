export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface GraphNode extends GeoPoint {
  id: string;
  slug: string;
  name?: string;
  nameKannada?: string;
  [key: string]: unknown;
}

export interface GraphLink {
  fromId: string;
  toId: string;
  type: "ring" | "cross";
  distanceKm: number;
}

export interface NeighborResult<T extends GraphNode = GraphNode> {
  node: T;
  type: "ring" | "cross";
  distanceKm: number;
}

const EARTH_RADIUS_KM = 6371;

function toRadians(deg: number): number {
  return (deg * Math.PI) / 180;
}

/**
 * Calculates the great-circle distance between two points on the Earth's surface (in kilometers).
 */
export function haversine(a: GeoPoint, b: GeoPoint): number {
  const dLat = toRadians(b.lat - a.lat);
  const dLng = toRadians(b.lng - a.lng);
  const lat1 = toRadians(a.lat);
  const lat2 = toRadians(b.lat);

  const sinDlat = Math.sin(dLat / 2);
  const sinDlng = Math.sin(dLng / 2);

  const h =
    sinDlat * sinDlat +
    Math.cos(lat1) * Math.cos(lat2) * sinDlng * sinDlng;

  const c = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(Math.max(0, 1 - h)));
  return Math.round(EARTH_RADIUS_KM * c * 100) / 100;
}

/**
 * Calculates the total length of a circular tour.
 */
export function tourDistance<T extends GraphNode>(tour: T[]): number {
  if (tour.length < 2) return 0;
  let total = 0;
  for (let i = 0; i < tour.length; i++) {
    const next = (i + 1) % tour.length;
    total += haversine(tour[i], tour[next]);
  }
  return total;
}

/**
 * Builds a closed ring of nodes using Nearest-Neighbour followed by 2-opt crossing reduction.
 * Each node is visited exactly once in the resulting ordered ring.
 */
export function buildRing<T extends GraphNode>(nodes: T[]): T[] {
  if (nodes.length <= 2) {
    return [...nodes];
  }

  // 1. Greedy Nearest-Neighbour tour starting at the first node
  const unvisited = [...nodes.slice(1)];
  const tour: T[] = [nodes[0]];

  while (unvisited.length > 0) {
    const current = tour[tour.length - 1];
    let bestIdx = 0;
    let bestDist = Infinity;

    for (let i = 0; i < unvisited.length; i++) {
      const dist = haversine(current, unvisited[i]);
      if (dist < bestDist) {
        bestDist = dist;
        bestIdx = i;
      }
    }

    tour.push(unvisited[bestIdx]);
    unvisited.splice(bestIdx, 1);
  }

  // 2. 2-opt crossing reduction
  const n = tour.length;
  let improved = true;
  let iterations = 0;
  const maxIterations = 200;

  while (improved && iterations < maxIterations) {
    improved = false;
    iterations++;

    for (let i = 0; i < n - 1; i++) {
      for (let j = i + 2; j < n; j++) {
        // Do not compare adjacent wrapping edge when i=0 and j=n-1
        if (i === 0 && j === n - 1) continue;

        const a = tour[i];
        const b = tour[(i + 1) % n];
        const c = tour[j];
        const d = tour[(j + 1) % n];

        const currentDist = haversine(a, b) + haversine(c, d);
        const newDist = haversine(a, c) + haversine(b, d);

        if (newDist < currentDist - 1e-4) {
          // Reverse segment from i + 1 to j
          const segment = tour.slice(i + 1, j + 1).reverse();
          tour.splice(i + 1, segment.length, ...segment);
          improved = true;
        }
      }
    }
  }

  return tour;
}

/**
 * Builds directed/undirected ring links for the ordered ring.
 * Closed ring: (0 -> 1, 1 -> 2, ..., (n-1) -> 0).
 */
export function buildRingLinks<T extends GraphNode>(ring: T[]): GraphLink[] {
  if (ring.length <= 1) return [];
  if (ring.length === 2) {
    const d = haversine(ring[0], ring[1]);
    return [
      { fromId: ring[0].id, toId: ring[1].id, type: "ring", distanceKm: d },
      { fromId: ring[1].id, toId: ring[0].id, type: "ring", distanceKm: d },
    ];
  }

  const links: GraphLink[] = [];
  for (let i = 0; i < ring.length; i++) {
    const next = (i + 1) % ring.length;
    links.push({
      fromId: ring[i].id,
      toId: ring[next].id,
      type: "ring",
      distanceKm: haversine(ring[i], ring[next]),
    });
  }
  return links;
}

/**
 * Adds 1–2 nearby non-adjacent cross-links per node without duplicate edges.
 */
export function addCrossLinks<T extends GraphNode>(
  ring: T[],
  maxPerNode = 2
): GraphLink[] {
  const n = ring.length;
  if (n < 4) {
    // With 3 or fewer nodes, all nodes are already adjacent in a closed ring.
    return [];
  }

  const existingPairs = new Set<string>();

  // Mark all ring adjacent pairs so cross links cannot duplicate ring edges
  for (let i = 0; i < n; i++) {
    const next = (i + 1) % n;
    const key = [ring[i].id, ring[next].id].sort().join("<->");
    existingPairs.add(key);
  }

  const crossLinks: GraphLink[] = [];
  const nodeCrossCount = new Map<string, number>();

  for (let i = 0; i < n; i++) {
    const u = ring[i];
    const prev = ring[(i - 1 + n) % n];
    const next = ring[(i + 1) % n];

    // Candidate nodes must not be u itself or its ring neighbors
    const candidates = ring
      .filter((v) => v.id !== u.id && v.id !== prev.id && v.id !== next.id)
      .map((v) => ({
        node: v,
        dist: haversine(u, v),
      }))
      .sort((a, b) => a.dist - b.dist);

    let addedForNode = 0;
    for (const cand of candidates) {
      if (addedForNode >= maxPerNode) break;

      const v = cand.node;
      const pairKey = [u.id, v.id].sort().join("<->");

      if (!existingPairs.has(pairKey)) {
        existingPairs.add(pairKey);
        crossLinks.push({
          fromId: u.id,
          toId: v.id,
          type: "cross",
          distanceKm: cand.dist,
        });
        addedForNode++;
        nodeCrossCount.set(u.id, (nodeCrossCount.get(u.id) ?? 0) + 1);
        nodeCrossCount.set(v.id, (nodeCrossCount.get(v.id) ?? 0) + 1);
      }
    }
  }

  return crossLinks;
}

/**
 * Returns connected neighbors (ring and cross) for a given temple slug.
 */
export function getNeighbors<T extends GraphNode>(
  slug: string,
  nodes: T[],
  links: GraphLink[]
): NeighborResult<T>[] {
  const target = nodes.find((n) => n.slug === slug);
  if (!target) return [];

  const nodeMap = new Map<string, T>(nodes.map((n) => [n.id, n]));
  const seenNeighborIds = new Set<string>();
  const neighbors: NeighborResult<T>[] = [];

  for (const link of links) {
    let neighborId: string | null = null;
    if (link.fromId === target.id) {
      neighborId = link.toId;
    } else if (link.toId === target.id) {
      neighborId = link.fromId;
    }

    if (neighborId && neighborId !== target.id && !seenNeighborIds.has(neighborId)) {
      seenNeighborIds.add(neighborId);
      const neighborNode = nodeMap.get(neighborId);
      if (neighborNode) {
        neighbors.push({
          node: neighborNode,
          type: link.type,
          distanceKm: link.distanceKm,
        });
      }
    }
  }

  return neighbors.sort((a, b) => a.distanceKm - b.distanceKm);
}
