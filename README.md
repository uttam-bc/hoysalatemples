# Hoysala Temples
#### new changes
Responsive showcase of Hoysala temples in Karnataka. Phase 1 is foundation only (tokens, UI kit, Prisma seed). Live data is PostgreSQL via Prisma; `data/temples.seed.json` is seed-only.

## Local setup

1. Copy `.env.example` to `.env` and set `DATABASE_URL` to a Neon (or local) Postgres connection string.
2. Run `npm install`.
3. Run `npx prisma db push && npm run db:seed` to create tables and load the 13 draft temples.
4. Run `npm run dev` and open [http://localhost:3000](http://localhost:3000) for the token showcase.
5. Run `npm run build` to confirm the production build.

Optional: `npm run db:studio` opens Prisma Studio.

## Notes

- Karnataka GeoJSON (`/data/karnataka.geo.json`): Derived from OpenStreetMap / Nominatim administrative boundary data, simplified using Douglas-Peucker to <60 KB (50 KB). Released under Open Database License (ODbL) 1.0.
