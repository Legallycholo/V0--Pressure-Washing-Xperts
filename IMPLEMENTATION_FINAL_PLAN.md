# IMPLEMENTATION FINAL PLAN — Pressure Washing Xperts Go-Live

## Stack context (confirmed)

| Layer | Detail |
| --- | --- |
| Frontend | Next.js 16 (App Router), React 19, TypeScript |
| Lead API | `POST /api/leads` — [`app/api/leads/route.ts`](app/api/leads/route.ts) |
| Database | Supabase Postgres — project `uljtanpaligqwqtojhdt` (“Pressure Contacts”) |
| Deployment | Vercel — project `v0-pressure-washing-xperts` |

---

## Already Working

- Next.js 16 App Router; client [`lib/submitLead.ts`](lib/submitLead.ts) → server [`app/api/leads/route.ts`](app/api/leads/route.ts); server-side validation and optional Resend email.
- UI: success state (“Thank You!”) and error state (`submitError`) on [`components/sections/ContactQuoteForm.tsx`](components/sections/ContactQuoteForm.tsx) and [`components/sections/Hero.tsx`](components/sections/Hero.tsx); HTML5 `required` on fields.
- Vercel: production deployments **READY** for `v0-pressure-washing-xperts`; primary domain includes `v0-pressure-washing-xperts.vercel.app`.
- Favicon/icons in [`app/layout.tsx`](app/layout.tsx).
- [`next/image`](components/sections/Gallery.tsx) used in key sections; [`.gitignore`](.gitignore) excludes `.env*.local`; no API keys committed in source.
- Repo migration [`supabase/migrations/20260412120000_create_leads.sql`](supabase/migrations/20260412120000_create_leads.sql) defines the **intended** `public.leads` table (not yet applied to the remote Supabase project at audit time).

---

## CRITICAL — Must Fix Before Launch

### Database: `leads` missing; `Contact_form` incomplete

- **Problem:** The API inserts into **`public.leads`** (`.from("leads")`). The live Supabase project only had **`public.Contact_form`** with columns **`id`** and **`created_at`**. There was **no `leads` table** — inserts fail once env vars are configured. `Contact_form` did not match the payload (`full_name`, `email`, `phone`, etc.).
- **File(s):** [`app/api/leads/route.ts`](app/api/leads/route.ts); [`supabase/migrations/20260412120000_create_leads.sql`](supabase/migrations/20260412120000_create_leads.sql); optionally [`README.md`](README.md).
- **Solution (choose one):**
  - **A — Minimal code change:** Apply the existing migration to Supabase (CLI `db push`, SQL Editor, or MCP migration) so **`public.leads`** exists and matches the route. Optionally remove or repurpose unused `Contact_form` after review.
  - **B — Match table name `Contact_form`:** Add all required columns to `Contact_form`, then change `.from("leads")` to `.from("Contact_form")` with correct PostgREST table name/casing.

### Production environment variables

- **Problem:** If `SUPABASE_URL` or `SUPABASE_SERVICE_ROLE_KEY` are missing, the API returns **503**. Email notifications are skipped without Resend configuration.
- **File(s):** Vercel project → Settings → Environment Variables; local `.env.local` (gitignored).
- **Solution:** Set **`SUPABASE_URL`**, **`SUPABASE_SERVICE_ROLE_KEY`**, **`RESEND_API_KEY`**, **`RESEND_FROM_EMAIL`**, and optionally **`LEAD_NOTIFICATION_EMAIL`** on Vercel (Production and Preview as needed). Per product decision: add **`NEXT_PUBLIC_SUPABASE_URL`** and **`NEXT_PUBLIC_SUPABASE_ANON_KEY`** only if you add a **browser** Supabase client; the current lead path is **server-only** and does not require them.

### Vercel ↔ Supabase native integration

- **Problem:** A linked Supabase integration can inject or conflict with manually set environment variables.
- **File(s):** N/A (Vercel dashboard).
- **Solution:** Under **Integrations**, disconnect the Supabase integration if present; set Supabase URL and keys manually from **Supabase → Project Settings → API**.

### RLS on `Contact_form` (context)

- **Problem:** `Contact_form` had **RLS enabled** with **no policies** — that blocks **anonymous** direct inserts from the browser. The **`/api/leads`** route uses the **service role**, which **bypasses RLS**, so anon INSERT policy is **not required** for the current server-side flow unless you later submit from the client with the anon key.

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

### README vs live schema

- **Problem:** [`README.md`](README.md) documents `public.leads`; the dashboard had emphasized `Contact_form` — easy to confuse operators.
- **File(s):** [`README.md`](README.md).
- **Solution:** After the schema decision (A or B above), update the README so it matches production.

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
| **Submits Via** | [`lib/submitLead.ts`](lib/submitLead.ts) → **`POST /api/leads`** — not direct Supabase from the browser |
| **Supabase Table** | Coded as **`public.leads`**; remote DB had only **`Contact_form`** until aligned — **must match after migration** |
| **RLS INSERT Policy (anon on `Contact_form`)** | **No** (at audit); not required for service-role `/api/leads` inserts |
| **User Success Message** | **Yes** |
| **Email Notification** | **Yes** (Resend), when `RESEND_API_KEY` and `RESEND_FROM_EMAIL` are set |

---

## Exact Implementation Order

1. Disconnect Vercel–Supabase native integration (if installed); confirm env vars are manually controlled.
2. **Fix database:** Apply [`supabase/migrations/20260412120000_create_leads.sql`](supabase/migrations/20260412120000_create_leads.sql) **or** extend `Contact_form` and update [`app/api/leads/route.ts`](app/api/leads/route.ts) `.from(...)` accordingly.
3. Set **`SUPABASE_URL`** and **`SUPABASE_SERVICE_ROLE_KEY`** in Vercel (and locally for dev). Add **`NEXT_PUBLIC_SUPABASE_*`** only if adding a client-side Supabase integration later.
4. Configure **Resend** env vars; run one end-to-end test (submit form → row in Supabase → email received).
5. Add **privacy policy** page and footer link.
6. Add **metadata**, **Open Graph**, and **og:image** in [`app/layout.tsx`](app/layout.tsx).
7. (Optional) If `Contact_form` is obsolete after migration, document removal or archival; add anon RLS policy **only** if switching to browser-side inserts with the anon key.
8. Final smoke test on the production URL.

---

*Generated from pre-launch audit. Execution of these steps is separate — no application code was changed in the commit that adds this file.*
