# Hoysala Temples (ಹೊಯ್ಸಳ ದೇವಾಲಯಗಳು)

> **Live Domain**: [hoysalatemples.online](https://hoysalatemples.online)  
> **Author**: Independently developed by **UTTAM B C** ([LinkedIn](https://www.linkedin.com/in/uttam-b-c-573123290) • [Instagram](https://www.instagram.com/uttam.b.c/) • [Email](mailto:uttam_bc@yahoo.com))

An authentic, tactile digital sanctuary dedicated to the masterworks of medieval Hoysala architecture (12th–13th century CE) in Karnataka, India. Built with a bespoke **"Stone and lamplight"** aesthetic evoking chloritic soapstone sanctums illuminated by warm oil lamps.

---

## 🏛️ Features

1. **Carved Doorway Entrance Hero (`/`)**
   - Immersive parallax scroll through a traditional temple entrance with lathe-turned pillars, makara torana lintel, and glowing dusk sky.
   - Expanding 8-point stellate window revealing the sacred sanctum.
   - Staggered serif typography with bilingual English and Kannada titles.

2. **Karnataka D3-Geo Sacred Ring Map (`/#explore`)**
   - Precise vector cartography rendered using `d3-geo` Mercator projection (<60 KB GeoJSON).
   - Topological closed ring circuit connecting all 13 historic sanctuaries with 2-opt crossing reduction and cross-links.
   - Interactive star nodes with smart-positioned tooltips, region/century filtering, and mobile fallback list.

3. **Temple Sanctuaries (`/temples/[slug]`)**
   - Full-bleed hero visuals with historical facts strip (patron dynasty, year built, deity, UNESCO World Heritage status).
   - Interactive touch-friendly scroll-snap gallery with full-screen Lightbox (keyboard navigation, zoom, credits, captions).
   - Architectural deep-dive with motif icons (stellate plans, lathe pillars, madanika sculptures, narrative friezes).
   - Drop-cap longform histories in English and Kannada.
   - Connected neighbors with haversine distance calculations and star-iris transitions.

4. **Architecture & Stonecraft Explorer (`/architecture`)**
   - Interactive 16-point Stellate Plan SVG diagram with clickable hotspot callouts.
   - 6-Tier frieze breakdown explaining the horizontal relief bands (elephants, horsemen, scrollwork, epics, swans, makaras).
   - Visual architectural primer on chloritic schist (soapstone), lathe-turned pillars, and Vesara stylistic synthesis.

5. **Dynastic Timeline (`/timeline`)**
   - Continuous 350-year chronology (1000–1343 CE) across five distinct epochs.
   - Scroll-drawn central spine connecting landmark royal reigns (Vishnuvardhana, Ballala II, Narasimha III) directly to surviving temple foundations.

6. **Pilgrimage Circuit Planner (`/plan`)**
   - Interactive circuit builder for 3 to 5 temple stops with greedy nearest-neighbor ordering.
   - Road distance estimation using a 1.3× winding road factor.
   - One-click Google Maps directions URL generator and route link sharing.

7. **Bilingual & Dual-Theme Experience**
   - Seamless **EN / ಕನ್ನಡ** toggle with native `Noto Serif Kannada` typography and typography adaptations.
   - **Soapstone at Dusk (Dark Mode)** and **Soapstone at Dawn (Light Mode)** tactile stone palettes.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router, Turbopack, Server Components)
- **Language**: Strict TypeScript 5
- **Styling**: Tailwind CSS v4 with custom stone tokens
- **Animation**: Framer Motion
- **Cartography**: D3-geo + custom inline SVG
- **Database & ORM**: PostgreSQL (Neon Serverless) via Prisma ORM
- **Testing**: Vitest (16 unit tests for graph and route algorithms)
- **Deployment**: Vercel Edge Network

---

## 🚀 Local Development Setup

### 1. Prerequisites
- Node.js 20+ and npm
- PostgreSQL database (or free [Neon](https://neon.tech) serverless account)

### 2. Clone and Install
```bash
git clone https://github.com/uttam-bc/hoysalatemples.git
cd hoysalatemples
npm install
```

### 3. Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Update `DATABASE_URL` with your PostgreSQL connection string:
```env
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### 4. Push Schema & Seed Database
```bash
npm run db:push
npm run db:seed
```
This loads all 13 verified Hoysala temple records with coordinates, architectural highlights, visitor information, and full-resolution Wikimedia Commons imagery.

### 5. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Run Unit Tests & Build
```bash
npm test
npm run build
```

---

## 🌐 Vercel Production Deployment

### 1. Import Repository
1. Push your repository to GitHub.
2. Go to the [Vercel Dashboard](https://vercel.com/new) and click **Add New > Project**.
3. Select the `hoysalatemples` repository.

### 2. Configure Environment Variables
In the Vercel project settings, configure the following environment variables:

| Variable | Description | Example |
| :--- | :--- | :--- |
| `DATABASE_URL` | Neon Postgres Connection String | `postgresql://...neon.tech/neondb?sslmode=require` |
| `NEXT_PUBLIC_SITE_URL` | Production domain | `https://hoysalatemples.online` |

### 3. Build & Output Settings
- **Framework Preset**: Next.js
- **Build Command**: `next build` (Prisma client generates automatically via `postinstall` script)
- **Install Command**: `npm install`

### 4. Seed Production Database (One-time)
From your local terminal, point to your production `DATABASE_URL` or use Vercel CLI / Neon Console to run:
```bash
npx prisma db push
npm run db:seed
```

### 5. Custom Domain Setup (`hoysalatemples.online`)
1. In your Vercel Project, navigate to **Settings > Domains**.
2. Add `hoysalatemples.online` and `www.hoysalatemples.online`.
3. Configure your DNS provider with the recommended records:
   - **A Record**: `@` → `76.76.21.21`
   - **CNAME Record**: `www` → `cname.vercel-dns.com`
4. Wait for SSL certificate provisioning (handled automatically by Vercel Let's Encrypt).

---

## 📋 Prelaunch Checklist

- [x] **Strict TypeScript & Build**: Zero build errors, all 19 static/SSG routes pre-rendered.
- [x] **Unit Testing**: Vitest test suite passes (16/16 tests passing).
- [x] **SEO**:
  - OpenGraph / Twitter dynamic images (`next/og` `ImageResponse`) for root and all 13 temple pages.
  - Dynamic `sitemap.xml` with all temple URLs.
  - `robots.txt` disallowing `/admin`.
  - JSON-LD Structured Data (`TouristAttraction`, `Place`, `HistoricalSite`) on every temple page.
  - Canonical link tags and search engine crawler directives.
- [x] **Security Headers**:
  - `Content-Security-Policy`
  - `X-Frame-Options: DENY`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- [x] **Branded Error Handling**:
  - Custom stone-and-lamplight `404 Not Found` page with link back to Sacred Ring.
  - Custom `error.tsx` client error boundary with recovery action.
- [x] **Responsive & Accessibility**:
  - 44px minimum tap target sizes on interactive buttons and navigation drawers.
  - `skip-link` pointing directly to `#main`.
  - WCAG AA color contrast across both Dusk and Dawn themes.
  - `prefers-reduced-motion` global animations disable.

---

## 📜 License & Credits

- **Author**: Independently developed by **UTTAM B C**
- **Domain**: [hoysalatemples.online](https://hoysalatemples.online)
- **GeoJSON Cartography**: Derived from OpenStreetMap / Nominatim boundary datasets under Open Database License (ODbL) 1.0.
- **Imagery**: Curated and attributed under Creative Commons licenses from Wikimedia Commons contributors.
- **Copyright**: © 2026 hoysalatemples.online. All rights reserved.
