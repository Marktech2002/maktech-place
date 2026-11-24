# Yaqub Tawab Olamilekan — Portfolio

Personal portfolio and playground of **Yaqub Tawab Olamilekan** (Alara) — Software & Creative Engineer based in Lagos, Nigeria, building backend systems for payments, messaging, and web applications.

## What's Inside

- **Work (`/work`)** — Selected projects, engineering experience, and essays:
  - **Projects:** StudyWithBash, Wholesale ERP, SIWES e-logbook, Barbing Salon Platform, OPay-inspired backend API, E-Commerce API
  - **Experience:** Weeshr App, Unee App, Interchat, Fatherland Foundation, BigFix Technologies
  - **Writing:** *Beyond the Piles of Refuse: Waste Collection in Lagos*, *The Drain in the Frame*
- **Stamps (`/stamps`)** — Interactive digital stamp collection and typography studies
- **Sketchbook (`/sketchbook`)** — Space for visual experiments and early ideas
- **Shop & Playground (`/shop`, `/playground`)** — Draggable stickers, themes, and interactive demos

## Links

- **GitHub:** [github.com/Marktech2002](https://github.com/Marktech2002)
- **X / Twitter:** [x.com/D_maktech](https://x.com/D_maktech)
- **LinkedIn:** [linkedin.com/in/yaqub-tawab-olamilekan-44965427b](https://ng.linkedin.com/in/yaqub-tawab-olamilekan-44965427b)
- **Instagram:** [instagram.com/yaqubtawab](https://www.instagram.com/yaqubtawab/)

---

## Development & Deployment

This app uses **pnpm** (see `packageManager` in `package.json`) and deploys to Cloudflare Workers through Alchemy and OpenNext.

Alchemy provisions the Worker, D1 database, R2 sketch bucket, and Cloudflare Images binding. The `IMAGES` binding is required for OpenNext/Cloudflare `next/image` optimization, so Cloudflare Images must be enabled on the Cloudflare account before deploying. Production sets `NEXT_PUBLIC_IMAGE_EDGE=1`, which switches `next/image` to `image-loader.ts` and serves images from edge-cached `/cdn-cgi/image` (requires transformations enabled on the zone). Previews and dev use the default loader, so `/_next/image` is served by OpenNext through the `IMAGES` binding.

Install dependencies:

```sh
pnpm install
```

Run the local Cloudflare dev environment:

```sh
pnpm dev
```

Build and deploy (use `pnpm run deploy`, since `pnpm deploy` is a built-in pnpm command):

```sh
pnpm build
pnpm run deploy
```

## Database Migrations

D1 schema changes are defined in `src/db/schema.ts` and generated with Drizzle Kit:

```sh
pnpm db:generate
```

Apply migrations locally:

```sh
pnpm db:migrate:local
```

Apply migrations to Cloudflare:

```sh
pnpm db:migrate:remote
```
