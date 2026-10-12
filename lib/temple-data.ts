import { prisma } from "./db";
import seedData from "../data/temples.seed.json";
import {
  buildRing,
  buildRingLinks,
  addCrossLinks,
  getNeighbors,
  haversine,
  type GraphNode,
} from "./graph";
import type { TempleInput } from "./schemas";

export interface TempleDetailImage {
  id?: string;
  url: string;
  alt: string;
  credit: string;
  order: number;
  isHero: boolean;
}

export interface TempleDetailData extends GraphNode {
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
  summary: string;
  history: string;
  architecture: string[];
  visitInfo: string;
  heroImageId?: string | null;
  ringOrder: number;
  summaryKannada?: string | null;
  historyKannada?: string | null;
  images: TempleDetailImage[];
}

export interface TempleNeighborItem {
  slug: string;
  name: string;
  nameKannada: string;
  town: string;
  district: string;
  distanceKm: number;
  type: "ring" | "cross";
  heroImage?: TempleDetailImage | null;
}

export interface NextRingTempleItem {
  slug: string;
  name: string;
  nameKannada: string;
  town: string;
  ringOrder: number;
}

export interface TempleDetailResult {
  temple: TempleDetailData;
  neighbors: TempleNeighborItem[];
  nextRingTemple: NextRingTempleItem | null;
  connectedLinks: {
    targetLng: number;
    targetLat: number;
    type: "ring" | "cross";
    targetName: string;
  }[];
}

/**
 * Returns all temple slugs for generateStaticParams.
 */
export async function getAllTempleSlugs(): Promise<{ slug: string }[]> {
  try {
    if (process.env.DATABASE_URL) {
      const dbTemples = await prisma.temple.findMany({
        select: { slug: true },
      });
      if (dbTemples.length > 0) {
        return dbTemples;
      }
    }
  } catch (error) {
    console.warn("Prisma getAllTempleSlugs failed, falling back to seed data:", error);
  }

  return seedData.temples.map((t) => ({ slug: t.slug }));
}

export async function getAllTemples(): Promise<TempleDetailData[]> {
  const { temples } = await loadFullDataset();
  return temples;
}

/**
 * Internal helper to load full dataset of temples with ring & links.
 */
async function loadFullDataset(): Promise<{
  temples: TempleDetailData[];
  ring: TempleDetailData[];
  links: { fromId: string; toId: string; type: "ring" | "cross"; distanceKm: number }[];
}> {
  let temples: TempleDetailData[] = [];
  let links: { fromId: string; toId: string; type: "ring" | "cross"; distanceKm: number }[] = [];

  try {
    if (process.env.DATABASE_URL) {
      const dbTemples = await prisma.temple.findMany({
        include: { images: { orderBy: { order: "asc" } } },
        orderBy: { ringOrder: "asc" },
      });

      const dbLinks = await prisma.templeLink.findMany();

      if (dbTemples.length > 0) {
        temples = dbTemples.map((t) => ({
          ...t,
          architecture: t.architecture,
          images: t.images.map((img) => ({
            id: img.id,
            url: img.url,
            alt: img.alt,
            credit: img.credit,
            order: img.order,
            isHero: img.isHero,
          })),
        }));

        const idMap = new Map<string, TempleDetailData>(temples.map((t) => [t.id, t]));
        links = dbLinks.map((l) => {
          const from = idMap.get(l.fromId);
          const to = idMap.get(l.toId);
          const distance =
            from && to ? haversine({ lat: from.lat, lng: from.lng }, { lat: to.lat, lng: to.lng }) : 0;
          return {
            fromId: l.fromId,
            toId: l.toId,
            type: l.type as "ring" | "cross",
            distanceKm: distance,
          };
        });
      }
    }
  } catch (error) {
    console.warn("Prisma loadFullDataset failed, falling back to seed data:", error);
  }

  if (temples.length === 0) {
    const rawSeed = seedData.temples as TempleInput[];
    const rawList: TempleDetailData[] = rawSeed.map((t, idx) => ({
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
      summary: t.summary,
      history: t.history,
      architecture: t.architecture,
      visitInfo: t.visitInfo,
      heroImageId: t.heroImageId ?? null,
      ringOrder: t.ringOrder ?? idx + 1,
      summaryKannada: t.summaryKannada ?? null,
      historyKannada: t.historyKannada ?? null,
      images: (t.images ?? []).map((img, imgIdx) => ({
        id: `img-${idx + 1}-${imgIdx}`,
        url: img.url,
        alt: img.alt,
        credit: img.credit,
        order: img.order,
        isHero: img.isHero,
      })),
    }));

    const computedRing = buildRing(rawList);
    computedRing.forEach((t, i) => {
      t.ringOrder = i + 1;
    });

    const ringEdges = buildRingLinks(computedRing);
    const crossEdges = addCrossLinks(computedRing, 2);

    return {
      temples: rawList,
      ring: computedRing,
      links: [...ringEdges, ...crossEdges],
    };
  }

  // If temples came from DB, sort by ringOrder
  const sortedRing = [...temples].sort((a, b) => a.ringOrder - b.ringOrder);
  return {
    temples,
    ring: sortedRing,
    links,
  };
}

/**
 * Loads a single temple's full data, graph neighbors, next ring sanctuary, and connected coords.
 */
export async function getTempleBySlug(slug: string): Promise<TempleDetailResult | null> {
  const { temples, ring, links } = await loadFullDataset();

  const temple = temples.find((t) => t.slug === slug);
  if (!temple) {
    return null;
  }

  // Compute graph neighbors (ring + cross links)
  const graphNodes: GraphNode[] = temples.map((t) => ({
    id: t.id,
    slug: t.slug,
    lat: t.lat,
    lng: t.lng,
    name: t.name,
    nameKannada: t.nameKannada,
  }));

  const neighborResults = getNeighbors(slug, graphNodes, links);

  // Map neighbor details (up to 3 closest)
  const templeMap = new Map<string, TempleDetailData>(temples.map((t) => [t.slug, t]));
  const neighbors: TempleNeighborItem[] = neighborResults.slice(0, 3).map((n) => {
    const full = templeMap.get(n.node.slug);
    const heroImg = full?.images.find((img) => img.isHero) || full?.images[0] || null;

    return {
      slug: n.node.slug,
      name: full?.name || (n.node.name as string),
      nameKannada: full?.nameKannada || (n.node.nameKannada as string),
      town: full?.town || "",
      district: full?.district || "",
      distanceKm: n.distanceKm,
      type: n.type,
      heroImage: heroImg,
    };
  });

  // Determine next temple in the closed ring
  let nextRingTemple: NextRingTempleItem | null = null;
  if (ring.length > 1) {
    const currentIndex = ring.findIndex((t) => t.slug === slug);
    if (currentIndex !== -1) {
      const nextIndex = (currentIndex + 1) % ring.length;
      const next = ring[nextIndex];
      nextRingTemple = {
        slug: next.slug,
        name: next.name,
        nameKannada: next.nameKannada,
        town: next.town,
        ringOrder: next.ringOrder,
      };
    }
  }

  // Connected coordinates for the mini map
  const connectedLinks = neighborResults.map((n) => {
    const full = templeMap.get(n.node.slug);
    return {
      targetLng: full?.lng ?? n.node.lng,
      targetLat: full?.lat ?? n.node.lat,
      type: n.type,
      targetName: full?.name ?? (n.node.name as string),
    };
  });

  return {
    temple,
    neighbors,
    nextRingTemple,
    connectedLinks,
  };
}
