# IMPLEMENTATION FINAL PLAN — Pressure Washing Xperts Go-Live

## Stack context (confirmed)

| Layer | Detail |
| --- | --- |
| Frontend | Next.js 16 (App Router), React 19, TypeScript |
| Lead capture | [`lib/submitLead.ts`](lib/submitLead.ts) → Supabase browser client → insert into `public.leads` (anon key + RLS insert policy) |
| Database | Supabase Postgres — project `uljtanpaligqwqtojhdt` (“Pressure Contacts”) |
| Deployment | Vercel — project `v0-pressure-washing-xperts` |

---

## Already Working--- brand new push into github

- Next.js 16 App Router; [`lib/submitLead.ts`](lib/submitLead.ts) validates and inserts into [`public.leads`](supabase/migrations/20260412120000_create_leads.sql) via `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- UI: success state (“Thank You!”) and error state (`submitError`) on [`components/sections/ContactQuoteForm.tsx`](components/sections/ContactQuoteForm.tsx) and [`components/sections/Hero.tsx`](components/sections/Hero.tsx); HTML5 `required` on fields.
- Vercel: production deployments **READY** for `v0-pressure-washing-xperts`; primary domain includes `v0-pressure-washing-xperts.vercel.app`.
- Favicon/icons in [`app/layout.tsx`](app/layout.tsx).
- [`next/image`](components/sections/Gallery.tsx) used in key sections; [`.gitignore`](.gitignore) excludes `.env*.local`; no API keys committed in source.
- Repo migration [`supabase/migrations/20260412120000_create_leads.sql`](supabase/migrations/20260412120000_create_leads.sql) defines `public.leads` (uuid `id`, `name`, nullable optional fields, RLS + anon insert).

---

## CRITICAL — Must Fix Before Launch

### Database: apply `leads` migration

- **Problem:** Inserts target **`public.leads`**. If that table does not exist or column names/types differ, submissions fail.
- **File(s):** [`supabase/migrations/20260412120000_create_leads.sql`](supabase/migrations/20260412120000_create_leads.sql); [`README.md`](README.md).
- **Solution:** Apply the migration to Supabase (CLI `db push`, SQL Editor, or linked workflow). If an older `leads` or `Contact_form` table exists, reconcile schema (columns: `name`, `email`, `phone`, optional fields as in migration) before go-live.

### Production environment variables

- **Problem:** Missing `NEXT_PUBLIC_SUPABASE_URL` or `NEXT_PUBLIC_SUPABASE_ANON_KEY` prevents inserts; the app shows a neutral error to users.
- **File(s):** Vercel project → Settings → Environment Variables; local `.env.local` (gitignored). See [`.env.example`](.env.example).
- **Solution:** Set **`NEXT_PUBLIC_SUPABASE_URL`** and **`NEXT_PUBLIC_SUPABASE_ANON_KEY`** on Vercel (Production and Preview as needed).

### Vercel ↔ Supabase native integration

- **Problem:** A linked Supabase integration can inject or conflict with manually set environment variables.
- **File(s):** N/A (Vercel dashboard).
- **Solution:** Under **Integrations**, align injected vars with the names above or set them manually from **Supabase → Project Settings → API**.

### RLS on `leads`

- **Requirement:** RLS enabled with an **`insert` policy for role `anon`** (see migration) so browser submissions with the anon key succeed.

---

## IMPORTANT — Should Fix Before Launch

### SEO / social metadata

- **Problem:** Root [`app/layout.tsx`](app/layout.tsx) had **no** `description` or Open Graph / Twitter image metadata.
- **File(s):** [`app/layout.tsx`](app/layout.tsx); optional per-route `metadata`.
- **Solution:** Add `metadata.description`, `openGraph` (including `images`), and Twitter card fields; place a dedicated OG image under `public/`.

### Privacy policy

- **Problem:** Forms collect PII; no privacy page was present in the app routes at audit time.
- **File(s):** New route (e.g. `app/privacy/page.tsx`); [`components/layout/Footer.tsx`](components/layout/Footer.tsx) or similar for the link.
- **Solution:** Publish a privacy policy (what is collected, why, retention, contact) and link it in the footer before go-live.

---

## NICE TO HAVE — Can Fix Post-Launch

- Normalize `tel:` link formats site-wide (`800-451-7213` vs `18004517213` — same number, different href styles).
- Audit any remaining `<img>` usage for `next/image` and LCP.
- Confirm in Vercel why project metadata may show `live: false` while deployments are READY and domains resolve.

---

## Contact Form Flow (Confirmed)

| Item | Detail |
| --- | --- |
| **Component File** | [`components/sections/ContactQuoteForm.tsx`](components/sections/ContactQuoteForm.tsx) (modal + inline); [`components/sections/Hero.tsx`](components/sections/Hero.tsx) (hero form); [`components/sections/ContactQuoteFormCard.tsx`](components/sections/ContactQuoteFormCard.tsx) |
| **Fields Collected** | `fullName`, `email`, `phone`, `city`, `state`, `zip`, `message`, `howHeard`, `selectedOffer` (quote flows; Hero sends empty string), plus `submissionType`, `utm_source` / `utm_medium` / `utm_campaign`, `pagePath` |
| **Submits Via** | [`lib/submitLead.ts`](lib/submitLead.ts) → Supabase `.from("leads").insert(...)` |
| **Supabase Table** | **`public.leads`** — must match migration |
| **RLS** | Anon **insert** policy required for browser flow |
| **User Success Message** | **Yes** |
| **Email Notification** | **No** (removed; view leads in Supabase Table Editor) |

---

## Exact Implementation Order

1. Disconnect or align Vercel–Supabase native integration (if installed); confirm env vars are correct.
2. **Fix database:** Apply [`supabase/migrations/20260412120000_create_leads.sql`](supabase/migrations/20260412120000_create_leads.sql) or reconcile existing tables.
3. Set **`NEXT_PUBLIC_SUPABASE_URL`** and **`NEXT_PUBLIC_SUPABASE_ANON_KEY`** in Vercel (and `.env.local` for local dev).
4. Run one end-to-end test (submit form → row in Supabase).
5. Add **privacy policy** page and footer link.
6. Add **metadata**, **Open Graph**, and **og:image** in [`app/layout.tsx`](app/layout.tsx).
7. Final smoke test on the production URL.

---

*Updated after Supabase-only lead capture refactor.*
