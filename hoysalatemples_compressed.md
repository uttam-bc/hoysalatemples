# hoysalatemples — Project Prompt

Build a responsive, accessible showcase of Hoysala temples in Karnataka. Stack: Next.js App Router, strict TypeScript, Tailwind, Framer Motion, d3-geo + inline SVG (no Google Maps/Leaflet/Mapbox), Prisma/Postgres on Neon, Zod, Vercel Blob. Deploy to Vercel. Use `next/image`; support keyboard navigation, alt text and `prefers-reduced-motion`.

## Workflow
Follow the phases in order. When a phase says **plan first / wait for approval**, provide only that plan and stop. Otherwise give the requested short plan before implementation. Do not build future-phase features early. Never invent facts or image URLs; mark uncertain content `TODO: verify` and use clearly labelled placeholders. Keep code modular, commented, tested where specified, and avoid unused dependencies.

## Design: “Stone and lamplight”
Dark, warm, tactile soapstone-at-dusk aesthetic, not SaaS, gradients or glassmorphism. Tokens: night indigo-charcoal (950/900/800), soapstone grey-green (5 steps), lamp ochre/saffron (400/500/600 + glow), bone off-white + muted text. Subtle inline-SVG stone grain; carved-in/out shadows; small chiseled radii; deliberate easing/durations, no bouncy springs. Fonts via `next/font`: Cormorant Garamond or Cinzel display, Source Sans 3 or Figtree body, Noto Serif Kannada (`font-kannada`). Fluid h1-h4/body/caption scale and small-caps labels. Custom lamp selection/focus, scrollbar, smooth scroll and global reduced-motion handling. Motifs: stellate stars, makara torana, lathe-turned pillars, tiered shrines and jali; create reusable SVG motifs.

## Data / seed
Seed these 13 temples: Chennakeshava (Belur), Hoysaleswara (Halebidu), Chennakesava (Somanathapura), Lakshminarasimha (Javagal), Veera Narayana (Belavadi), Amrutesvara (Amruthapura), Lakshmi Devi (Doddagaddavalli), Ishvara (Arasikere), Brahmeshvara (Kikkeri), Chennakesava (Aralaguppe), Lakshminarayana (Hosaholalu), Mallikarjuna (Basaralu), Buchesvara (Koravangala).

Live source is PostgreSQL/Neon via Prisma; `temples.json`/`temples.seed.json` is seed-only. Models:
- `Temple`: id, unique slug, name, nameKannada, town, district, region, lat, lng, yearBuilt, century, patron, deity, unescoStatus, summary, history, architecture String[], visitInfo, heroImageId, ringOrder, createdAt, updatedAt; optionally summaryKannada/historyKannada nullable.
- `TempleImage`: id, templeId, url, alt, credit, order, isHero.
- `TempleLink`: fromId, toId, type (`ring`|`cross`).
Use shared Zod schema in `/lib/schemas.ts`, Prisma singleton `/lib/db.ts`, seed `/prisma/seed.ts`, source data `/data/temples.seed.json`. Only fill facts/coordinates/town/district when confident; otherwise `TODO: verify`. Each seed summary must be unique, explicitly marked draft; all image URLs must be clearly labelled placeholders. Never share descriptions between temple pages.

## Phase 1 — Foundation only
Do not build the hero, map or real pages. Start with a 10-line plan, then implement:
1. Next.js App Router, strict TS, Tailwind, ESLint, Prettier.
2. Install only: `framer-motion`, `d3-geo`, `zod`, `prisma`, `@prisma/client` (later phases may add dependencies they explicitly require).
3. Folders: `/app`, `/components/{ui,hero,map,temple}`, `/lib`, `/data`, `/prisma`, `/public`.
4. Define design tokens in CSS variables and Tailwind config; include motion, spacing, radius and carved-shadow tokens.
5. Fonts and fluid type scale as above.
6. Global styles: dark theme, low-opacity inline `feTurbulence` grain, selection/focus/scrollbar, smooth scroll, reduced-motion.
7. UI kit: primary/ghost `Button`, `SectionHeading` with stellate divider, `Container`, reusable 8-point `StarIcon`.
8. Prisma schema + shared Zod schema + DB singleton.
9. Seed script, `.env.example` (`DATABASE_URL` only), scripts `db:push`, `db:seed`, `db:studio`.
10. Temporary `/app/page.tsx` displays tokens, type, buttons and star; README local setup in 5 steps.
Done: `npm run dev` shows showcase; `npx prisma db push && npm run db:seed` seeds DB; `npm run build` passes.

## Phase 2 — Hero only; approval gate
First show (a) SVG layer tree with one-line purpose per layer and (b) scroll-animation timeline. Wait for approval before code. Build only the first 100vh home hero and its scroll transition; leave `<section id="explore">` empty.

Hero: a carved temple entrance fills viewport, as if visitors walk through it. Layers back-to-front:
1. Dusk sky (indigo to faint ochre horizon) + tiny stars.
2. Warm inner light with subtle irregular opacity/scale flicker every 4–7s.
3. 8-point stellate reveal mask showing a placeholder temple photo (`next/image`), slow zoom, h1 “Hoysala Temples” and Kannada “ಹೊಯ್ಸಳ ದೇವಾಲಯಗಳು”.
4. Two tall lathe-turned pillar columns with ring mouldings, bulbous and tapering forms.
5. Makara torana lintel/arch with kirtimukha, scrolling foliage and 3 tiers of miniature shrines.
6. Sparse, slow bone-colored dust particles; keep lightweight/lazy-loaded.

Carved, not flat: SVG filters (`feDiffuseLighting`/`feSpecularLighting` or low-intensity `feTurbulence`/`feDisplacementMap`), inner shadows, tier occlusion, ochre rim-light and subtle irregularity. Define motifs once in `<defs>` and reuse with `<use>`. No raster carving.

Animation (`useScroll`/`useTransform`): ~200vh wrapper, sticky 100vh stage. 0–60%: pillars move outward at different rates, arch lifts, frame scales 1→1.6, star window expands/light floods viewport. 60–100%: flood fades into background and Explore emerges. Stagger title letters on load; fade title during opening; pulsing stellate “scroll to enter” cue. Animate only transform/opacity where possible; use `will-change` sparingly. Reduced-motion: static doorway, no parallax/flicker, normal scroll. Mobile <768px: simplified arch + 2 pillars, fewer layers and shorter scroll. Decorative SVG `aria-hidden`; title is real h1. Done when depth reads clearly, scroll opening is smooth and Lighthouse impact is minimal; then list 3 tweakable constants (depth, speed, flicker).

## Phase 3 — Explore graph map
Give a short plan, then implement. Use real Karnataka boundary GeoJSON from an open dataset (geoBoundaries, DataMeet or Natural Earth admin-1), save `/data/karnataka.geo.json`, simplify to <60 KB, document source/license in README. Render responsive inline SVG using d3-geo (`geoMercator` + `fitSize`), thin ochre outline, subtly lighter fill, faint grain and optional district hints. Temple positions use real lat/lng and the same exported projection in `/lib/map.ts` for admin reuse.

Graph logic in `/lib/graph.ts`, server-side and unit-tested with Vitest:
- `haversine()`, `buildRing()` (nearest-neighbour tour + 2-opt crossing reduction), `addCrossLinks()` (1–2 nearby non-adjacent links/node, no duplicates), `getNeighbors(slug)`.
- Ring visits each temple exactly once and closes; store `ringOrder` and `TempleLink` rows in DB, computed by seed, never hard-code edges in UI.
- Tests: every node once, closed ring, no duplicate edges, n=1,2,3,13.

Nodes: reuse 8-point star geometry, 14–18px, thin ochre stroke/dark center. States: idle dim bone; hover/focus ochre fill + soft SVG glow + scale 1.4; active-neighbor ochre outline; dimmed opacity .25. Ring edges thin ochre ~50%; cross-links thinner dashed bone ~25%. On first intersection, draw ring edges sequentially with `stroke-dashoffset` like a kolam thread, then fade in cross-links. Hover highlights connected edges with travelling glow and dims others; leaving restores.

Interaction: custom smart-positioned tooltip with English/Kannada names, town, year and tiny thumbnail. Click/Enter triggers star-iris wipe then navigates to `/temples/[slug]` with `next/link` prefetch. Keyboard: Tab in ring order, arrows to connected neighbors, Enter opens, visible focus. Filters by region (Hassan, Mysuru, Tumakuru, Chikkamagaluru, Mandya, Shivamogga) and century; dim nonmatches, don't remove; Reset button. Mobile: tap once selects/shows tooltip, second opens; no pinch zoom; scrollable temple-list fallback. Heading “Explore”/“ಅನ್ವೇಷಿಸಿ”, intro, stellate divider, legend (ring/cross-link/star); seamless hero transition. Interactive layer only is client component; fetch data in server component and pass props. Reduced-motion shows edges instantly, no travelling glow. Done: all 13 correctly placed on real boundary; closed ring/cross-links, hover/keyboard/click and tests work.

## Phase 4 — Temple detail `/temples/[slug]`
Plan briefly, then implement. Server component reads Prisma; `generateStaticParams` for all slugs; ISR with `revalidateTag("temples")`; `generateMetadata` per temple (title, description, OG hero image); `notFound()` for unknown slugs.
Page sections:
1. Full-bleed priority `next/image` hero, bottom scrim, English + Kannada names, town/district, breadcrumb Home/Explore/Temple, subtle slow zoom.
2. Carved-lintel facts strip: built year/century, patron, location, deity, UNESCO status; 2023 date only if source data contains it. Mobile: 2-column grid.
3. Summary pull-quote + mini Karnataka map highlighting temple and graph connections.
4. Horizontal swipe/drag, scroll-snap gallery with captions/alt/credits, arrows and lightbox.
5. History long-form with drop cap, max measure 65ch.
6. Numbered architecture highlights with motif icons (star plan, frieze, madanika, lathe pillar); generic star fallback.
7. Visiting panel; never invent times, display `TODO: verify`.
8. Nearby graph neighbors (2–3 cards with image/name/haversine distance) and next ring temple link with star-iris transition.
Custom lightbox: scale/fade from thumbnail, focus trap, Esc/backdrop/close, arrow keys/swipe, caption/credit, counter, adjacent-image preload, focus restore, body-scroll lock, `aria-modal`/labels. Images: `next/image`, correct `sizes`, blur placeholder, lazy except hero; handle zero images with decorative stone panel; always show image credit/license. Data comes only from DB; unique text/images per temple. Reduced-motion respected. Done: all 13 pages, accessible touch/keyboard lightbox, no layout shift.

## Phase 5 — Four features; plan first and pause after each
Build in order A–D; after each, stop for review.
**A. `/architecture`**: factual intro to stellate plans, soapstone, Vesara, lathe-turned pillars, friezes, madanikas/salabhanjikas, jali, ekakuta/trikuta. Interactive SVG stellate plan + simplified elevation with keyboard-accessible star hotspots and side explanations; provide text-list alternative. Explain frieze bands (elephants, horsemen, scrollwork, epics, swans/makaras) with simple SVGs. Uncertain facts `TODO: verify`.
**B. Timeline** (`/timeline` or architecture section): vertical Hoysala timeline (origins, Vishnuvardhana, Ballala II, Narasimha III, temple foundations, decline); temple entries from DB link to pages. Scroll-drawn line/fade-in entries/star era markers. Dates only from `/data/timeline.json`; uncertainty `TODO: verify`.
**C. `/plan` route planner**: choose start, 3–5 stops, optional region. Use graph neighbors, greedy nearest-neighbour along ring, show alternatives. Map highlights numbered-star path; list distances = haversine × 1.3 road factor, labelled approximate. Actions: Google Maps directions URL from coordinates, copy route, share query-string URL. Logic `/lib/route.ts`, unit tests.
**D. EN/ಕನ್ನಡ toggle**: UI strings `/messages/en.json`, `/messages/kn.json`; choose lightweight custom context or `next-intl` and explain choice. Carved `EN | ಕನ್ನಡ` navbar toggle; persist cookie and set `<html lang>`. Add nullable `summaryKannada`/`historyKannada` migration. No machine translation: missing Kannada content falls back to English with “English only” tag. Apply Noto Serif Kannada and increased line-height when `lang=kn`.
Done: all work on mobile/desktop; route tests pass. Navbar links: Explore, Architecture, Timeline, Plan a route; never Admin.

## Phase 6 — Production polish; no new features
1. Mobile test at 360/390/768/1024/1440px; fix overflow, ensure 44px tap targets, carved collapsible navbar, no horizontal scroll; verify hero/map fallbacks.
2. Accessibility: keyboard flow, focus, skip link, landmarks/headings, alt text, map/lightbox ARIA, AA contrast, reduced-motion audit for all animations.
3. SEO: metadata/canonical/`metadataBase`; temple OG/Twitter images via `next/og` `ImageResponse` (stone background, English/Kannada name, star, town, hero photo if present); `sitemap.ts`, `robots.ts` disallow `/admin`, JSON-LD `TouristAttraction`/`Place` with coordinates, favicon/app icons, theme color.
4. Performance: mobile Lighthouse targets Performance 90+, Accessibility 95+, SEO 100, CLS <0.05. Consider font subsets/preload, lazy below-fold, dynamic map/lightbox imports, AVIF/WebP, remove unused deps, `@next/bundle-analyzer`, cache headers. Report before/after audit values; don't fabricate results.
5. Error/empty states: branded 404/error (closed carved door), stone skeletons, no-image/no-temple states.
6. Security headers in `next.config` (CSP, X-Frame-Options, Referrer-Policy, Permissions-Policy); ensure no secrets committed, `.env` gitignored, `/admin` noindex.
7. Vercel deploy: `postinstall: prisma generate`; build runs `prisma migrate deploy`. README steps: push GitHub, import Vercel, connect Neon/Vercel Storage and Vercel Blob, set env vars, seed once, custom domain. Env vars: `DATABASE_URL`, `ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH`, `SESSION_SECRET`, `BLOB_READ_WRITE_TOKEN`. Include prelaunch checklist.
Done: production build passes and README enables clean deployment.

## Admin — Single owner
Switch live source to Neon Postgres/Prisma; JSON seed only. Upload images to Vercel Blob. Public pages read DB and call `revalidatePath`/`revalidateTag` after admin edits.

**Auth:** one user, no signup/OAuth. Env-only `ADMIN_USERNAME`, bcrypt `ADMIN_PASSWORD_HASH`, `SESSION_SECRET`; never hardcode secrets. `npm run hash-password` prints bcrypt hash; document local/Vercel setup. `/admin/login` server action verifies username + bcrypt (constant-time where applicable), sets signed JWT via `jose` in httpOnly, secure, sameSite=lax cookie for 7 days; logout action. Rate-limit login to 5 failures/IP/15 min; generic “Invalid credentials”. Middleware protects `/admin/*`; every mutation/upload independently verifies server session. No public admin link.

**UI:** custom stone-and-lamplight admin, not generic dashboard. `/admin` temple table (thumbnail/name/town/year/edit/delete); `/admin/temples/new` and `/admin/temples/[id]/edit` share React Hook Form + Zod form. All temple fields; editable slug auto-generated from name. Set lat/lng by clicking reusable Karnataka SVG projection map or manual numeric fields. Multi-image drag/drop upload, previews, per-image alt/credit, reorder, delete, choose hero; JPEG/PNG/WebP only, max 5 MB, resize/optimize. Delete confirmation; remove deleted temple images from Blob. Success/error toasts and “View on site” link.

**Graph updates** (`/lib/graph.ts`, unit-tested): keep closed ordered ring + cross-links. Create: cheapest insertion by added haversine distance, then up to 2 nearest non-adjacent cross-links. Edit coordinates: remove/reinsert. Delete: remove node, reconnect ring neighbors, clean cross-links. Form allows manual cross-link override. Explore and Nearby/Next read DB graph and update immediately after save.

**Admin build order:** show plan + file list first; then (1) DB + seed, (2) auth, (3) graph logic/tests, (4) CRUD UI, (5) image upload, (6) revalidation/polish. Include Prisma migration, seed, safe `.env.example`, and README admin setup/Vercel env vars.
