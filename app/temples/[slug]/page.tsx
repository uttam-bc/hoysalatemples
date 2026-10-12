import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getTempleBySlug,
  getAllTempleSlugs,
} from "@/lib/temple-data";
import { TempleHero } from "@/components/temple/TempleHero";
import { TempleFactsStrip } from "@/components/temple/TempleFactsStrip";
import { TempleSummarySection } from "@/components/temple/TempleSummarySection";
import { TempleGallery } from "@/components/temple/TempleGallery";
import { TempleHistory } from "@/components/temple/TempleHistory";
import { ArchitectureHighlights } from "@/components/temple/ArchitectureHighlights";
import { VisitingPanel } from "@/components/temple/VisitingPanel";
import { TempleNeighbors } from "@/components/temple/TempleNeighbors";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllTempleSlugs();
  return slugs.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = await getTempleBySlug(slug);

  if (!result) {
    return {
      title: "Sanctuary Not Found | Hoysala Temples",
      description: "The requested sanctuary was not found in the Hoysala network.",
    };
  }

  const { temple } = result;
  const heroImg = temple.images.find((img) => img.isHero) || temple.images[0];
  const imageUrl =
    heroImg?.url && (heroImg.url.startsWith("http") || heroImg.url.startsWith("/"))
      ? heroImg.url
      : "/placeholders/temple-dusk-placeholder.svg";

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hoysalatemples.online";

  return {
    title: `${temple.name} (${temple.nameKannada}) | Hoysala Temples`,
    description: temple.summary,
    alternates: {
      canonical: `${siteUrl}/temples/${temple.slug}`,
    },
    openGraph: {
      title: `${temple.name} — ${temple.town}, Karnataka`,
      description: temple.summary,
      url: `${siteUrl}/temples/${temple.slug}`,
      siteName: "Hoysala Temples",
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: imageUrl,
          alt: heroImg?.alt || temple.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${temple.name} — ${temple.town}, Karnataka`,
      description: temple.summary,
      images: [imageUrl],
    },
  };
}

export default async function TempleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const result = await getTempleBySlug(slug);

  if (!result) {
    notFound();
  }

  const { temple, neighbors, nextRingTemple, connectedLinks } = result;
  const heroImage = temple.images.find((img) => img.isHero) || temple.images[0] || null;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hoysalatemples.online";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["TouristAttraction", "HistoricalSite", "Place"],
    name: temple.name,
    alternateName: temple.nameKannada,
    description: temple.summary,
    url: `${siteUrl}/temples/${temple.slug}`,
    geo: {
      "@type": "GeoCoordinates",
      latitude: temple.lat,
      longitude: temple.lng,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: temple.town,
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
    image: heroImage ? [heroImage.url] : [],
    isAccessibleForFree: true,
    publicAccess: true,
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Year Built",
        value: temple.yearBuilt,
      },
      {
        "@type": "PropertyValue",
        name: "Century",
        value: temple.century,
      },
      {
        "@type": "PropertyValue",
        name: "Patron Dynasty",
        value: temple.patron,
      },
      {
        "@type": "PropertyValue",
        name: "Deity",
        value: temple.deity,
      },
      {
        "@type": "PropertyValue",
        name: "Heritage Status",
        value: temple.unescoStatus,
      },
    ],
  };

  return (
    <main id="main" className="min-h-screen bg-[#0b0c12] text-[#ede7de]">
      {/* Structured Data (JSON-LD) for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Full-bleed priority hero */}
      <TempleHero temple={temple} heroImage={heroImage} />

      {/* 2. Carved-lintel facts strip */}
      <TempleFactsStrip temple={temple} />

      {/* 3. Summary pull-quote + mini Karnataka map */}
      <TempleSummarySection
        temple={temple}
        connectedLinks={connectedLinks}
      />

      {/* 4. Horizontal scroll-snap gallery with custom lightbox */}
      <TempleGallery images={temple.images} templeName={temple.name} />

      {/* 5. History long-form with drop cap */}
      <TempleHistory
        history={temple.history}
        historyKannada={temple.historyKannada}
        templeName={temple.name}
      />

      {/* 6. Numbered architecture highlights with motif icons */}
      <ArchitectureHighlights
        highlights={temple.architecture}
        templeName={temple.name}
      />

      {/* 7. Visiting panel */}
      <VisitingPanel
        visitInfo={temple.visitInfo}
        town={temple.town}
        district={temple.district}
        region={temple.region}
      />

      {/* 8. Nearby graph neighbors and next ring temple */}
      <TempleNeighbors
        neighbors={neighbors}
        nextRingTemple={nextRingTemple}
        currentTempleName={temple.name}
      />
    </main>
  );
}
