import type { MetadataRoute } from "next";
import { getAllTempleSlugs } from "@/lib/temple-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hoysalatemples.online";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/architecture`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/timeline`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/plan`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  try {
    const templeSlugs = await getAllTempleSlugs();
    const templeRoutes: MetadataRoute.Sitemap = templeSlugs.map((item) => ({
      url: `${baseUrl}/temples/${item.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    }));

    return [...staticRoutes, ...templeRoutes];
  } catch (error) {
    console.error("Failed to build temple sitemap routes:", error);
    return staticRoutes;
  }
}
