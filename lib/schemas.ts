import { z } from "zod";

export const templeLinkTypeSchema = z.enum(["ring", "cross"]);

export const templeImageSchema = z.object({
  id: z.string().optional(),
  templeId: z.string().optional(),
  url: z.string().min(1),
  alt: z.string().min(1),
  credit: z.string().min(1),
  order: z.number().int().nonnegative(),
  isHero: z.boolean(),
});

export const templeSchema = z.object({
  id: z.string().optional(),
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  name: z.string().min(1),
  nameKannada: z.string().min(1),
  town: z.string().min(1),
  district: z.string().min(1),
  region: z.string().min(1),
  lat: z.number().gte(-90).lte(90),
  lng: z.number().gte(-180).lte(180),
  yearBuilt: z.string().min(1),
  century: z.string().min(1),
  patron: z.string().min(1),
  deity: z.string().min(1),
  unescoStatus: z.string().min(1),
  summary: z.string().min(1),
  history: z.string().min(1),
  architecture: z.array(z.string().min(1)),
  visitInfo: z.string().min(1),
  heroImageId: z.string().nullable().optional(),
  ringOrder: z.number().int().nonnegative(),
  summaryKannada: z.string().nullable().optional(),
  historyKannada: z.string().nullable().optional(),
  images: z.array(templeImageSchema).optional(),
});

export const templeLinkSchema = z.object({
  fromId: z.string().min(1),
  toId: z.string().min(1),
  type: templeLinkTypeSchema,
});

export const templeSeedFileSchema = z.object({
  temples: z.array(templeSchema),
});

export type TempleInput = z.infer<typeof templeSchema>;
export type TempleImageInput = z.infer<typeof templeImageSchema>;
export type TempleLinkInput = z.infer<typeof templeLinkSchema>;
