# IMPLEMENTATION FINAL PLAN -- Pressure Washing Xperts Go-Live

## Stack

| Layer | Detail |
| --- | --- |
| Frontend | Next.js 16.2 (App Router / Turbopack), React 19, TypeScript |
| Lead capture | [`lib/submitLead.ts`](lib/submitLead.ts) -> `createBrowserClient` -> PostgREST insert into `public.leads` |
| Database | Supabase Postgres -- project `uljtanpaligqwqtojhdt` ("Pressure Contacts"), region us-east-2 |
| Hosting | Vercel -- project `v0-pressure-washing-xperts` |
| Auth | None (public site; anon key with RLS insert-only policy) |

---

## Current Status (verified via Supabase MCP, April 12 2026)

- `.env.local` has correct `NEXT_PUBLIC_SUPABASE_URL`, legacy JWT `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY`.
- `public.leads` table exists, RLS enabled, single `PERMISSIVE INSERT` policy for role `anon` with `WITH CHECK (true)`.
- Dev server (terminal 15) was restarted and is loading `.env.local`.
- No API routes -- form submission is entirely browser-side via `@supabase/ssr` `createBrowserClient`.
- Two form entry points: [`components/sections/Hero.tsx`](components/sections/Hero.tsx) and [`components/sections/ContactQuoteForm.tsx`](components/sections/ContactQuoteForm.tsx).

---

## ISSUES FOUND

### CRITICAL -- Blocks submissions or deployment

| # | Issue | Where | Detail |
|---|-------|-------|--------|
| C1 | **Schema drift: `id` column type** | [`supabase/migrations/20260412120000_create_leads.sql`](supabase/migrations/20260412120000_create_leads.sql) line 3 | Migration defines `id uuid primary key default gen_random_uuid()`. Live database has `id bigint generated always as identity`. If the migration is ever re-applied (branch reset, new environment), schema will not match app expectations. Fix: update migration to match live DB. |
| C2 | **Vercel production env vars not set** | Vercel dashboard | `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` must be set for Production + Preview environments on Vercel. Without them, deployed site will show "Submission is temporarily unavailable" to every visitor. |
| C3 | **End-to-end submission not yet verified** | Browser -> Supabase | Must confirm a real form fill reaches the `leads` table after the `.env.local` fix + server restart. |

### IMPORTANT -- Should fix before launch

| # | Issue | Where | Detail |
|---|-------|-------|--------|
| I1 | **No `description` or Open Graph metadata** | [`app/layout.tsx`](app/layout.tsx) lines 7-26 | `metadata` has `title` and `icons` only. Search engines and social shares will have no description, no OG image, no Twitter card. Fix: add `description`, `openGraph`, and `twitter` fields. |
| I2 | **No privacy policy page** | No `app/privacy/` route exists | Forms collect PII (name, email, phone, address). A privacy policy page linked from the footer is expected before collecting user data at scale. |
| I3 | **Weak email validation** | [`lib/submitLead.ts`](lib/submitLead.ts) line 29 | `validate()` only checks `includes("@")`. Strings like `"@"` or `"a@"` pass. Fix: use a basic regex for `user@domain.tld`. |
| I4 | **`next.config.mjs` deprecation warning** | Dev server output | `experimental.turbo` is unrecognized in Next.js 16.2. Should be renamed to `turbopack` at the config root per the migration guide. Non-blocking but noisy and may cause issues on Vercel builds. |

### NICE TO HAVE -- Can fix post-launch

| # | Issue | Where | Detail |
|---|-------|-------|--------|
| N1 | Inconsistent `tel:` href formats | Various components | `800-451-7213` vs `18004517213` -- same number, different href styles across files. |
| N2 | Unused server-side Supabase client | [`utils/supabase/server.ts`](utils/supabase/server.ts) | File exists but nothing imports it. Can be removed or reserved for future admin features. |
| N3 | No spam / rate-limit protection | [`lib/submitLead.ts`](lib/submitLead.ts) | Direct browser-to-Supabase with no throttling. Consider adding a simple honeypot field or moving submission through a Next.js API route with rate limiting post-launch. |

---

## IMPLEMENTATION ORDER

### Phase 1: Make submissions work (C1-C3)

**Step 1 -- Fix migration schema drift (C1)**

File: [`supabase/migrations/20260412120000_create_leads.sql`](supabase/migrations/20260412120000_create_leads.sql)

Change line 3 from:
```sql
id uuid primary key default gen_random_uuid(),
```
to:
```sql
id bigint generated always as identity primary key,
```

This aligns the migration with the live database so future branch resets or new environments create the correct schema.

**Step 2 -- End-to-end test (C3)**

1. Open `http://localhost:3000` in the browser.
2. Fill out the Hero form with test data and submit.
3. Confirm "Thank You!" success state appears (no red error banner).
4. Verify via Supabase MCP: `SELECT id, full_name, email, created_at FROM public.leads ORDER BY created_at DESC LIMIT 3;`
5. If submission still fails, check the browser console for the `[submitLead]` error log and the specific Supabase error code.

**Step 3 -- Set Vercel production env vars (C2)**

In Vercel dashboard (Settings -> Environment Variables), add:
- `NEXT_PUBLIC_SUPABASE_URL` = `https://uljtanpaligqwqtojhdt.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = the legacy JWT anon key (same value as `.env.local` line 2)

Set for environments: **Production** and **Preview**. Trigger a redeployment afterward.

### Phase 2: Pre-launch hardening (I1-I4)

**Step 4 -- Improve email validation (I3)**

File: [`lib/submitLead.ts`](lib/submitLead.ts)

Replace line 29:
```typescript
if (!payload.email?.includes("@")) {
```
with a regex check:
```typescript
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email ?? "")) {
```

**Step 5 -- Add SEO metadata (I1)**

File: [`app/layout.tsx`](app/layout.tsx)

Add `description`, `openGraph`, and `twitter` to the existing `metadata` export:
- `description`: "Professional pressure washing and soft wash cleaning in Atlanta. Licensed, insured, 14+ years experience. Free estimates."
- `openGraph.title`, `openGraph.description`, `openGraph.type: "website"`, `openGraph.images` (add an OG image to `public/`)
- `twitter.card: "summary_large_image"`

**Step 6 -- Add privacy policy page (I2)**

- Create `app/privacy/page.tsx` with a basic policy covering: what data is collected, purpose, retention, no third-party sharing, contact info.
- Add a "Privacy Policy" link in the site footer.

**Step 7 -- Fix next.config.mjs warning (I4)**

Rename `experimental.turbo` key to the top-level `turbopack` key per Next.js 16 migration guide to silence the config warning.

### Phase 3: Deploy and verify

**Step 8 -- Production build test**

```bash
npm run build && npm start
```

Submit a test lead on `http://localhost:3000` using the production build. Confirm the row appears in Supabase.

**Step 9 -- Deploy to Vercel**

Push to the main branch (or trigger a manual deploy). After deployment:
1. Visit the production URL.
2. Submit a test lead.
3. Verify the row in Supabase.
4. Check that OG metadata renders (use https://cards-dev.twitter.com/validator or similar).

---

## FILES INVOLVED

| File | Role in submission pipeline |
|------|-----------------------------|
| [`lib/submitLead.ts`](lib/submitLead.ts) | Validation + Supabase insert |
| [`utils/supabase/client.ts`](utils/supabase/client.ts) | `createBrowserClient` factory |
| [`components/sections/Hero.tsx`](components/sections/Hero.tsx) | Hero form UI + submit handler |
| [`components/sections/ContactQuoteForm.tsx`](components/sections/ContactQuoteForm.tsx) | Inline/modal quote form UI + submit handler |
| [`components/sections/ContactQuoteFormCard.tsx`](components/sections/ContactQuoteFormCard.tsx) | Wraps `ContactQuoteForm` with `?offer=` support |
| [`supabase/migrations/20260412120000_create_leads.sql`](supabase/migrations/20260412120000_create_leads.sql) | Table DDL + RLS policy |
| [`lib/leadAnalytics.ts`](lib/leadAnalytics.ts) | Post-success Vercel Analytics tracking |
| [`app/layout.tsx`](app/layout.tsx) | Root metadata (SEO fix target) |
| `.env.local` | Local environment variables (gitignored) |

---

*Plan finalized April 12, 2026. Do not code until this plan is approved.*
