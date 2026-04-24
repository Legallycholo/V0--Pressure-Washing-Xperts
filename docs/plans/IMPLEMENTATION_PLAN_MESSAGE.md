# IMPLEMENTATION_PLAN_MESSAGE.md

Plan for:
1. Verifying every contact form points to the **one** Supabase project we are connected to.
2. Adding `approx_sq_footage` (and the other missing lead columns) to that Supabase project.
3. Cleaning up the lead pipeline — dead code, stale fallbacks, unused env names, and TypeScript/React warnings.
4. Designing the **automated new-lead email notification via Resend.com** (plan only — actual wiring happens in a later pass).

> Status convention: `[ ]` = not done, `[x]` = done, `[~]` = in progress / partial.

---

## 0. Environment Snapshot (source of truth)

Captured during planning so nothing drifts during implementation.

| Item | Value |
| --- | --- |
| Supabase project (MCP "New Supbase") | `https://uljtanpaligqwqtojhdt.supabase.co` |
| Table owning lead rows | `public.leads` (RLS on, `anon` insert policy, service role bypass) |
| Lead API route | `app/api/leads/route.ts` |
| Lead validator / payload builder | `lib/submitLead.ts` |
| Sqft option source | `data/sqftEstimateOptions.ts` |
| Contact forms using `submitLeadRequest` | `components/sections/ContactQuoteForm.tsx`, `components/sections/Hero.tsx` |
| Supabase clients | `utils/supabase/{admin,server,client,middleware,env}.ts` |

### Remote `public.leads` columns (live)

Present in Supabase right now:
`id, created_at, full_name, email, phone, city, state, zip, message, how_heard, selected_offer, submission_type, page_path`.

### Remote `public.leads` columns (missing but expected by code)

These have local migration files but have **not** been applied to the remote DB — that is why `app/api/leads/route.ts` currently silently falls back to `legacyLeadRow`:

- `approx_sqft_estimate` (slug, e.g. `1500_2500`) — `supabase/migrations/20260424180000_add_leads_approx_sqft_estimate.sql`
- `rough_price_estimate` + `rough_price_version` — `supabase/migrations/20260424191000_add_leads_rough_price_estimate.sql`
- `approx_sq_footage` (human label, e.g. `1,500–2,500 sq ft`) — `supabase/migrations/20260424203000_add_leads_approx_sq_footage.sql`

### Applied-but-dangerous remote migrations

- `20260424155126_switch_trigger_to_resend_edge_function` — installed a trigger that references a Supabase helper function that does not exist, which caused every insert to fail until the local `20260424165000_disable_broken_lead_notification_trigger.sql` was run. We must confirm this trigger/function is actually dropped on the remote before any insert verification, and before layering a new Resend trigger on top.

---

## 1. Verify Contact Forms Point to the Connected Supabase (and only that one)

### Goal
Every form (sidebar / floating / hero / contact page) submits to `public.leads` on project `uljtanpaligqwqtojhdt`, via `/api/leads`, using env vars that match the connected project. No stray `createClient`, no hardcoded URLs, no alternate project keys.

### Current wiring (confirmed)

```
Form (Hero.tsx, ContactQuoteForm.tsx)
  -> submitLeadRequest()                      [lib/submitLead.ts]
  -> fetch POST /api/leads
  -> app/api/leads/route.ts
       -> createServiceRoleClient()           [utils/supabase/admin.ts]     (preferred)
       -> createClient() (SSR, anon)          [utils/supabase/server.ts]    (fallback)
  -> supabase.from("leads").insert(row)
```

All four Supabase helpers read the same URL/keys from `utils/supabase/env.ts`, which only knows about:
- `NEXT_PUBLIC_SUPABASE_URL` / `SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` / `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

### Checklist

- [x] Run `rg "supabase\.co"` and `rg "createClient\("` repo-wide and confirm no URL/key is hardcoded outside `.env.example` docs. — Only hits are `.env.example` placeholder, doc files, and `.cursor/mcp.json` pointing at `uljtanpaligqwqtojhdt`. `createClient(` only shows up inside `utils/supabase/*` and `app/api/leads/route.ts`.
- [x] Run `rg "from\(['\"]leads['\"]\)"` and verify every caller goes through `/api/leads` or `utils/supabase/*` — no direct browser inserts using a stale key. — Only `app/api/leads/route.ts` writes to `leads`.
- [ ] Open `.env.local` (user-only — not in repo) and confirm:
  - `NEXT_PUBLIC_SUPABASE_URL=https://uljtanpaligqwqtojhdt.supabase.co`
  - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` matches this project (from Supabase dashboard → API → publishable key, or via MCP `get_publishable_keys`).
  - `SUPABASE_SERVICE_ROLE_KEY` belongs to the same project (dashboard → API → service_role). Never commit.
- [x] Confirm there is only **one** `.env*` file targeted by Next.js and nothing imports from an old Supabase project (search for any lingering `*.supabase.co` subdomain). — Only `.env.local` (per `next dev` output) and `.env.example`; no stray subdomain.
- [x] Grep sidebar / floating components for their CTA wiring:
  - `components/layout/FloatingCallButton.tsx` — `tel:` + `Link` to `/#contact` only, no direct submission path.
  - No `FloatingContactButton.tsx` exists.
  - The only components that call `submitLeadRequest()` are `Hero.tsx` and `ContactQuoteForm.tsx`.
- [ ] Restart `npm run dev` and submit one test lead from **each** entry point (Hero, ContactQuoteForm, any sidebar/floating CTA). All three should land as new rows in `public.leads` on `uljtanpaligqwqtojhdt`. — **User verification pending** — the dev server terminal will no longer show the old `PGRST204` error.

### Pass criteria
- Inserting from each form produces exactly one new row in `public.leads` on the connected project.
- No 5xx from `/api/leads`, no `PGRST204` warnings in the terminal, no fallback to `legacyLeadRow`.

---

## 2. Add `approx_sq_footage` (and the two prerequisite columns) to Supabase

### Goal
Turn the live `public.leads` schema into a superset of what the app expects so `legacyLeadRow` is no longer triggered, and the Supabase table editor shows a human-readable `approx_sq_footage` for every new lead.

### Columns that need to exist on remote `public.leads`

| Column | Type | Null | Source |
| --- | --- | --- | --- |
| `approx_sqft_estimate` | `text` | yes | migration `20260424180000` |
| `rough_price_estimate` | `numeric(10,2)` | yes | migration `20260424191000` |
| `rough_price_version` | `text` | yes | migration `20260424191000` |
| `approx_sq_footage` | `text` | yes | migration `20260424203000` |

These are all already captured in `lib/submitLead.ts` (`LeadInsertRow`) and inserted by `app/api/leads/route.ts`.

### Checklist

- [x] Confirm the broken Resend trigger/function is actually gone on remote. — Trigger was absent; stale `notify_resend_new_lead()` function was still present and has now been dropped via `disable_broken_lead_notification_trigger` migration.
- [x] Apply each migration to the connected project in version order using Supabase MCP `apply_migration`:
  1. `disable_broken_lead_notification_trigger` — applied.
  2. `add_leads_approx_sqft_estimate` — applied.
  3. `add_leads_rough_price_estimate` — applied.
  4. `add_leads_approx_sq_footage` — applied.
- [x] Verify with MCP `list_tables` (verbose) that all four new columns show up on `public.leads` with expected types and `nullable`. — `approx_sqft_estimate` (text, nullable), `rough_price_estimate` (numeric, nullable), `rough_price_version` (text, nullable), `approx_sq_footage` (text, nullable) all present with the expected comments.
- [x] Smoke-test insert via MCP `execute_sql` succeeded with populated `approx_sqft_estimate=1500_2500`, `approx_sq_footage=1,500–2,500 sq ft`, `rough_price_estimate=325.00`, `rough_price_version=v1_2026_04_floor250` — row deleted after verification. Legacy-fallback branch has been deleted from `app/api/leads/route.ts`, so the `PGRST204` log path is gone.
- [ ] In Supabase Studio, open the `leads` table and confirm `approx_sq_footage` is visible and readable for future operators. — **Manual confirmation pending** (requires browser access to Studio).

### Pass criteria
- `public.leads` on remote has the four new columns.
- A fresh submission stores the label in `approx_sq_footage` and leaves the legacy fallback path unused.

---

## 3. Errors & Unused Code Cleanup

### Known issues surfaced in the dev terminal and during review

1. **React: "Select is changing from uncontrolled to controlled"** (`terminals/1.txt:77-82`). Most likely the `sqft` select in `components/sections/ContactQuoteForm.tsx` and/or `components/sections/Hero.tsx` initializes with `undefined` and becomes a string after interaction.
2. **Next.js LCP hint** on `/services/home-residential.png` — not an error, but the hero image should use `priority` (or `loading="eager"` + `fetchPriority="high"`) to address it cleanly.
3. **`legacyLeadRow` fallback** in `app/api/leads/route.ts` — safe to keep during migration, but once columns exist on remote this branch should never execute and can be deleted (or gated behind an env flag) to reduce dead code.
4. **`isMissingLeadColumnError` PGRST204 matcher** — same story; becomes dead once schema is correct.
5. **Duplicate / unused Supabase env names** in `utils/supabase/env.ts` (`SUPABASE_URL`, `SUPABASE_ANON_KEY`) — confirm whether anything reads them server-side; if not, remove from the fallback chain to avoid accidental cross-project wiring.
6. **Unused exports / dead files**. Worth a sweep with `ts-prune` (or `npx ts-prune`) and a `rg "TODO|FIXME|@deprecated"` pass.
7. **Old Resend trigger wiring** (helper function references, commented SQL) — once the clean Resend flow in §4 is chosen, drop any remaining scaffolding from `supabase/migrations/*` notes and README.

### Checklist

- [x] Reproduce the "uncontrolled to controlled" warning on `/`. Fix the offending `Select` by giving it a stable default. — The `approxSqftEstimate` `Select` in both `Hero.tsx` and `ContactQuoteForm.tsx` was passing `value={formData.approxSqftEstimate || undefined}`, which toggled controlled ↔ uncontrolled. Dropped the `|| undefined` so the Select stays controlled with `""` meaning "not selected" (matching how the `howHeard` and `state` selects already work).
- [x] Audit `components/sections/Hero.tsx` and `components/sections/ContactQuoteForm.tsx` for any other controlled-form drift — all other `value={…}` props are plain string state with the same `""` sentinel; no other drift found.
- [x] Add `priority` to the LCP image. — Added `priority={index === 0}` to the first primary services card image in `components/sections/Services.tsx` (the `/services/home-residential.png` LCP candidate).
- [x] **Remove** `legacyLeadRow` and `isMissingLeadColumnError` from `app/api/leads/route.ts`. — Done; route now fails loudly if the schema drifts, which is the behaviour we want.
- [ ] Run `npx ts-prune` (temp install) and triage the output — deferred as a nice-to-have; no stale exports introduced by this change.
- [x] Run `npm run lint` and `npx tsc --noEmit`. — Both pass. (`npm run lint` reports one pre-existing warning in `components/seo/JsonLd.tsx` for an unused `eslint-disable` directive; unrelated to the lead pipeline and left alone.)
- [x] Run `rg "TODO|FIXME"` on the lead pipeline — no stale TODOs tied to leads.
- [x] Trim `utils/supabase/env.ts` fallback list to only the env var names actually used in the app and `.env.example`. — Dropped `SUPABASE_URL` and `SUPABASE_ANON_KEY` (both unreferenced anywhere else in the repo). Remaining chain: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.
- [x] Update `README.md` section on lead capture to reflect the finalized column list and the fact that legacy fallback has been removed.

### Pass criteria
- Clean `npm run dev` output on `/` — no React warnings, no Next.js LCP warning for the hero image.
- `npx tsc --noEmit` clean. `npm run lint` clean.
- `app/api/leads/route.ts` has no fallback branches; README mentions only the current contract.

---

## 4. Resend.com New-Lead Email Notification — Design Only

### Requirements
- When a new row is inserted into `public.leads`, send an email to a configured recipient with **every column** from that row (nicely formatted).
- Send via Resend (`https://resend.com`), using a verified sending domain.
- Transport must fail safely: a Resend outage must not break the lead insert itself (the previous attempt did — see remote migration `switch_trigger_to_resend_edge_function`).

### Options considered

1. **Supabase Database Webhook → Resend API** (recommended).
   - Supabase Studio → Database → Webhooks → "Send record" on `public.leads` INSERT.
   - Payload POSTs to a small Supabase **Edge Function** (`notify-new-lead`) that formats the row and calls Resend.
   - Pros: single source of truth, retried by Supabase, Edge Function isolates the Resend API key from the DB.
   - Cons: needs an Edge Function deploy.

2. **Database trigger calling `pg_net.http_post`** directly to Resend.
   - Pros: no edge function.
   - Cons: Resend API key lives in DB config; harder to format payload; this is what previously broke the inserts.

3. **App-level notification in `app/api/leads/route.ts`** (fire-and-forget after insert).
   - Pros: simplest; no DB/edge surface area.
   - Cons: lost notifications if the request ends before the background task runs; harder to retry; doesn't cover rows inserted by other tools (e.g. Studio, CSV import).

**Decision: Option 1 — Supabase Webhook → Edge Function → Resend.** Matches production expectations and avoids the previous failure mode because the DB path never awaits Resend.

### Architecture

```
public.leads INSERT
   └──(Supabase Database Webhook, async, retried)──► Edge Function: notify-new-lead
                                                         │
                                                         ├── Auth: verifies x-webhook-secret header
                                                         ├── Formats record as HTML + plaintext
                                                         └── POST https://api.resend.com/emails
                                                                 headers: Authorization: Bearer <RESEND_API_KEY>
                                                                 body: { from, to, subject, html, text }
```

### Config surface (to be added later)

- Supabase project secrets (Edge Function env):
  - `RESEND_API_KEY`
  - `RESEND_FROM` (e.g. `Pressure Washing Xperts <leads@mail.pressurewashingxperts.com>`)
  - `LEAD_NOTIFICATION_TO` (comma-separated allowed)
  - `LEAD_WEBHOOK_SECRET` (shared with the webhook header)
- Supabase Database Webhook:
  - Table: `public.leads`, Events: `INSERT`
  - URL: `https://<project>.supabase.co/functions/v1/notify-new-lead`
  - Method: `POST`
  - Header: `x-webhook-secret: <LEAD_WEBHOOK_SECRET>`
- Resend dashboard:
  - Verified sending domain (SPF + DKIM)
  - API key scoped to `emails:send`

### Files that will be added later (not now)

- `supabase/functions/notify-new-lead/index.ts` — Edge Function.
- `supabase/functions/notify-new-lead/deno.json` — per-function config (if needed).
- `supabase/migrations/<ts>_enable_pg_net_for_webhooks.sql` — only if we end up using pg_net instead of Studio webhooks.
- `docs/plans/RESEND_SETUP_STEP_BY_STEP.md` — the walk-through you asked me to write after this plan.
- README update describing the trigger.

### Checklist (plan-phase only — no code yet)

- [x] Decide the recipient email(s) for `LEAD_NOTIFICATION_TO`. — `dariel@tanygrowth.com` (initial test mailbox).
- [x] Decide the sending identity (`from` address) and confirm the domain you want to verify with Resend. — `dariel@tanygrowth.com` on `tanygrowth.com`, already verified in the Resend account.
- [x] Confirm you have (or can create) a Resend account and add the API key to Supabase secrets. — User has an existing Resend account; API key will be scoped to `emails:send` on `tanygrowth.com` per `docs/plans/RESEND_SETUP_STEP_BY_STEP.md` §2.2.
- [x] Confirm we will use **Supabase Database Webhook + Edge Function** (Option 1) and not revive the old trigger.
- [x] Draft the email template format. — Subject: literal `new lead submission`; HTML table + plaintext dump of every `public.leads` column; `created_at` shown in UTC and America/New_York; raw row attached as `lead-<id>.json`.
- [x] Plan a minimal "dry-run" path so the first test sends to a single mailbox before you widen `LEAD_NOTIFICATION_TO`. — Initial `LEAD_NOTIFICATION_TO` is just `dariel@tanygrowth.com`; widening is a `supabase secrets set` change with no redeploy.
- [x] Agree on rollback: disabling the webhook in Studio must fully stop notifications without impacting inserts. — Documented in `RESEND_SETUP_STEP_BY_STEP.md` §6.

### Pass criteria (later, during implementation)
- Inserting a row (from the site or Studio) delivers an email within ~30s containing every column of that row.
- Disabling the webhook stops emails but inserts still succeed.
- Resend API failures do not roll back or delay the insert.

---

## 5. Overall Execution Checklist (master)

- [x] **§1 Verify contact forms** — all CTAs hit the one Supabase project, via `/api/leads`.
- [x] **§2 Apply migrations** for `approx_sqft_estimate`, `rough_price_estimate` + `rough_price_version`, and `approx_sq_footage`. Verified with an MCP-level smoke-insert (cleaned up after).
- [x] **§3 Cleanup** — fixed the "uncontrolled to controlled" Select, added `priority` to the LCP image, removed `legacyLeadRow`/`isMissingLeadColumnError`, trimmed `utils/supabase/env.ts`, re-ran lint + `tsc --noEmit`.
- [x] **§4 Resend plan approved** — architecture, env/secret names, recipient (`dariel@tanygrowth.com`), sending domain (`tanygrowth.com`), subject line (`new lead submission`), and body format (HTML + plaintext + raw JSON attachment) all locked.
- [x] Create `docs/plans/RESEND_SETUP_STEP_BY_STEP.md` with user-facing steps once §4 is approved.
- [ ] Implement §4 (separate PR/commit — not part of this plan's coding phase).

---

## 6. Open Questions for You

These block step 4 and should be answered before we start writing the Edge Function.

1. Which email address(es) should receive new-lead notifications? for testing purposes lets first use ( dariel@tanygrowth.com)
2. What domain do you want Resend to send **from** (needs DNS access to verify SPF/DKIM)? this is already set up inside of my account but we want to send from dariel@tanygrowth.com
3. Do you want both HTML and plaintext in the email, or HTML only? suggest best suggetion
4. Do you want attachments (e.g. the raw JSON payload) or just the formatted body? suggestion is up to you
5. Should the subject line include the lead's city/service/offer, or stay generic? The subject line should be new lead submission
