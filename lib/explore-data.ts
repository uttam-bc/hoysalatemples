import { prisma } from "./db";
import seedData from "../data/temples.seed.json";
import { buildRing, buildRingLinks, addCrossLinks, haversine } from "./graph";
import { projectCoordinates, defaultKarnatakaProjection } from "./map";
import type { MapTemple, MapLink, ExploreData } from "@/components/map/types";

/**
 * Loads and projects temple sanctuaries and graph links for the Explore Map.
 * Reads PostgreSQL via Prisma first; falls back to seed data if database is not configured.
 */
export async function getExploreData(): Promise<ExploreData> {
  let rawTemples: {
    id: string;
    slug: string;
    name: string;
    nameKannada: string;
    town: string;
    district: string;
    region: string;
    lat: number;
    lng: number;
    yearBuilt: string;
    century: string;
    patron: string;
    deity: string;
    unescoStatus: string;
    ringOrder: number;
  }[] = [];

  let rawLinks: {
    fromId: string;
    toId: string;
    type: "ring" | "cross";
  }[] = [];

  try {
    if (process.env.DATABASE_URL) {
      const dbTemples = await prisma.temple.findMany({
        orderBy: { ringOrder: "asc" },
      });

      const dbLinks = await prisma.templeLink.findMany();

      if (dbTemples.length > 0) {
        rawTemples = dbTemples.map((t) => ({
          id: t.id,
          slug: t.slug,
          name: t.name,
          nameKannada: t.nameKannada,
          town: t.town,
          district: t.district,
          region: t.region,
          lat: t.lat,
          lng: t.lng,
          yearBuilt: t.yearBuilt,
          century: t.century,
          patron: t.patron,
          deity: t.deity,
          unescoStatus: t.unescoStatus,
          ringOrder: t.ringOrder,
        }));

        rawLinks = dbLinks.map((l) => ({
          fromId: l.fromId,
          toId: l.toId,
          type: l.type as "ring" | "cross",
        }));
      }
    }
  } catch (error) {
    console.warn("Prisma query failed, using static fallback:", error);
  }

  // Fallback to computed graph from seed data if DB is empty or disconnected
  if (rawTemples.length === 0) {
    const seedTemples = seedData.temples.map((t, idx) => ({
      id: `temple-${idx + 1}`,
      slug: t.slug,
      name: t.name,
      nameKannada: t.nameKannada,
      town: t.town,
      district: t.district,
      region: t.region,
      lat: t.lat,
      lng: t.lng,
      yearBuilt: t.yearBuilt,
      century: t.century,
      patron: t.patron,
      deity: t.deity,
      unescoStatus: t.unescoStatus,
      ringOrder: 0,
    }));

    const ring = buildRing(seedTemples);
    ring.forEach((t, i) => {
      t.ringOrder = i + 1;
    });

    rawTemples = ring;

    const ringEdges = buildRingLinks(ring);
    const crossEdges = addCrossLinks(ring, 2);
    rawLinks = [...ringEdges, ...crossEdges];
  }

  // Project coordinates for all temples
  const templeMap = new Map<string, MapTemple>();
  const temples: MapTemple[] = [];

  for (const t of rawTemples) {
    const coords = projectCoordinates(t.lng, t.lat, defaultKarnatakaProjection);
    const mapped: MapTemple = {
      ...t,
      x: coords ? coords[0] : 0,
      y: coords ? coords[1] : 0,
    };
    temples.push(mapped);
    templeMap.set(t.id, mapped);
  }

  // Map links with projected endpoint coordinates and distances
  const links: MapLink[] = [];
  for (const l of rawLinks) {
    const fromTemple = templeMap.get(l.fromId);
    const toTemple = templeMap.get(l.toId);

    if (fromTemple && toTemple) {
      links.push({
        fromId: l.fromId,
        toId: l.toId,
        type: l.type,
        distanceKm: haversine(
          { lat: fromTemple.lat, lng: fromTemple.lng },
          { lat: toTemple.lat, lng: toTemple.lng }
        ),
        x1: fromTemple.x,
        y1: fromTemple.y,
        x2: toTemple.x,
        y2: toTemple.y,
      });
    }
  }

  return { temples, links };
}
