# Pressure Washing Xperts

Marketing website for **Pressure Washing Xperts**—a residential and commercial pressure washing business. The site covers service pages, service areas, gallery, about content, and lead capture (quote/contact flows).

The UI was originally bootstrapped with [v0](https://v0.app); this repo is the Next.js application you extend and deploy.

## Stack

| Layer | Technology |
| --- | --- |
| Framework | [Next.js](https://nextjs.org) 16 (App Router) |
| UI | [React](https://react.dev) 19, TypeScript |
| Styling | [Tailwind CSS](https://tailwindcss.com) 4, PostCSS |
| Components | [Radix UI](https://www.radix-ui.com) primitives, [class-variance-authority](https://cva.style), [Lucide](https://lucide.dev) icons |
| Database (leads) | [Supabase](https://supabase.com) Postgres (`public.leads`; inserts via `/api/leads` using service role when set, falling back to SSR anon + RLS) |
| Hosting / observability | [Vercel](https://vercel.com) — [Analytics](https://vercel.com/analytics), [Speed Insights](https://vercel.com/docs/speed-insights) |

Package manager: **pnpm** (see `packageManager` in `package.json`).

## Prerequisites

- Node.js compatible with Next.js 16 (current LTS recommended)
- [pnpm](https://pnpm.io) installed globally, or use `corepack enable` and the repo’s pinned version

## Getting started

Install dependencies and run the dev server:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). Edit files under `app/` and `components/`; the app hot-reloads.

Other scripts:

```bash
pnpm build    # production build
pnpm start    # run production server locally
pnpm lint     # ESLint
```

Gallery import (one-off tooling):

```bash
pnpm import:wix-gallery
```

## Project layout (short)

- `app/` — routes: home, `services/` (residential & commercial), `service-areas/`, `gallery/`, `about/`
- `supabase/migrations/` — database migrations (e.g. `public.leads`)
- `components/` — layout, sections, UI primitives
- `data/` — static content helpers (e.g. offers)
- `scripts/` — Node utilities (e.g. gallery import)

## Environment & lead capture

Quote and contact forms (`components/sections/Hero.tsx`, `components/sections/ContactQuoteForm.tsx`) call `submitLeadRequest()` in [`lib/submitLead.ts`](lib/submitLead.ts), which `POST`s to [`/api/leads`](app/api/leads/route.ts). The API route validates the payload, computes a rough price estimate, and inserts a row into `public.leads` using the Supabase **service role** when available, otherwise falling back to the SSR **anon** client + the `Allow anonymous inserts on leads` RLS policy.

Copy [`.env.example`](.env.example) to `.env.local` and set:

| Variable | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL (Settings → API). |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` or `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes* | Public Supabase key (publishable preferred; anon key supported for legacy projects). |
| `SUPABASE_SERVICE_ROLE_KEY` | Optional | Server-only bypass for lead inserts. When set, the API route writes with the service role and skips the anon/RLS path. Never expose to the browser. |

\* Required unless you exclusively rely on `SUPABASE_SERVICE_ROLE_KEY` for writes.

### `public.leads` columns

The API route expects the following columns on `public.leads` (see [`supabase/migrations/`](supabase/migrations/)):

`id, created_at, full_name, email, phone, city, state, zip, message, how_heard, selected_offer, submission_type, page_path, approx_sqft_estimate, approx_sq_footage, rough_price_estimate, rough_price_version`.

Apply the migrations to your Supabase project (SQL Editor, Supabase CLI `db push`, or the Supabase MCP `apply_migration` tool) before the first lead submission — the route no longer carries a legacy-schema fallback.

## Deployment

Pushes to `main` are intended to deploy on Vercel (as with the original v0-linked workflow). Set `NEXT_PUBLIC_SUPABASE_URL` and either `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (recommended) or `NEXT_PUBLIC_SUPABASE_ANON_KEY`; optionally set `SUPABASE_SERVICE_ROLE_KEY` for server-side fallback writes.

## Design / v0

Continue iterating in v0 if you use that workflow: [Continue working on v0 →](https://v0.app/chat/projects/prj_p5HKcvkCx7Pb7Uye2y5OC25Al0J9)

<a href="https://v0.app/chat/api/kiro/clone/Legallycholo/V0--Pressure-Washing-Xperts" alt="Open in Kiro"><img src="https://pdgvvgmkdvyeydso.public.blob.vercel-storage.com/open%20in%20kiro.svg?sanitize=true" /></a>
