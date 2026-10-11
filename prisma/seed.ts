import { PrismaClient } from "@prisma/client";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { templeSeedFileSchema } from "../lib/schemas";
import { buildRing, buildRingLinks, addCrossLinks } from "../lib/graph";

const prisma = new PrismaClient();

async function main() {
  const raw = readFileSync(join(process.cwd(), "data", "temples.seed.json"), "utf8");
  const parsed = templeSeedFileSchema.parse(JSON.parse(raw));

  // Seed-only JSON. Live pages must read Postgres, not this file.
  const createdRows = [];

  for (const temple of parsed.temples) {
    const { images = [], ...fields } = temple;

    const row = await prisma.temple.upsert({
      where: { slug: fields.slug },
      create: {
        slug: fields.slug,
        name: fields.name,
        nameKannada: fields.nameKannada,
        town: fields.town,
        district: fields.district,
        region: fields.region,
        lat: fields.lat,
        lng: fields.lng,
        yearBuilt: fields.yearBuilt,
        century: fields.century,
        patron: fields.patron,
        deity: fields.deity,
        unescoStatus: fields.unescoStatus,
        summary: fields.summary,
        history: fields.history,
        architecture: fields.architecture,
        visitInfo: fields.visitInfo,
        ringOrder: fields.ringOrder,
        summaryKannada: fields.summaryKannada ?? null,
        historyKannada: fields.historyKannada ?? null,
      },
      update: {
        name: fields.name,
        nameKannada: fields.nameKannada,
        town: fields.town,
        district: fields.district,
        region: fields.region,
        lat: fields.lat,
        lng: fields.lng,
        yearBuilt: fields.yearBuilt,
        century: fields.century,
        patron: fields.patron,
        deity: fields.deity,
        unescoStatus: fields.unescoStatus,
        summary: fields.summary,
        history: fields.history,
        architecture: fields.architecture,
        visitInfo: fields.visitInfo,
        ringOrder: fields.ringOrder,
        summaryKannada: fields.summaryKannada ?? null,
        historyKannada: fields.historyKannada ?? null,
      },
    });

    createdRows.push(row);

    await prisma.templeImage.deleteMany({ where: { templeId: row.id } });

    if (images.length > 0) {
      await prisma.templeImage.createMany({
        data: images.map((image) => ({
          templeId: row.id,
          url: image.url,
          alt: image.alt,
          credit: image.credit,
          order: image.order,
          isHero: image.isHero,
        })),
      });

      const hero = await prisma.templeImage.findFirst({
        where: { templeId: row.id, isHero: true },
        orderBy: { order: "asc" },
      });

      await prisma.temple.update({
        where: { id: row.id },
        data: { heroImageId: hero?.id ?? null },
      });
    }
  }

  // Compute ringOrder and graph links dynamically
  const ring = buildRing(createdRows);
  for (let i = 0; i < ring.length; i++) {
    await prisma.temple.update({
      where: { id: ring[i].id },
      data: { ringOrder: i + 1 },
    });
  }

  const ringLinks = buildRingLinks(ring);
  const crossLinks = addCrossLinks(ring, 2);
  const allLinks = [...ringLinks, ...crossLinks];

  await prisma.templeLink.deleteMany({});
  for (const link of allLinks) {
    await prisma.templeLink.create({
      data: {
        fromId: link.fromId,
        toId: link.toId,
        type: link.type,
      },
    });
  }

  console.log(
    `Seeded ${parsed.temples.length} temples with closed ring of ${ringLinks.length} edges and ${crossLinks.length} cross-links.`
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
