# RESEND_SETUP_STEP_BY_STEP.md

Implementation walk-through for **automatic new-lead email notifications via Resend**, using the architecture agreed in
`docs/plans/IMPLEMENTATION_PLAN_MESSAGE.md` §4.

> **Do not start this doc until §1, §2, and §3 of `IMPLEMENTATION_PLAN_MESSAGE.md` are all ✅ done** — this flow assumes the new
> `approx_sqft_estimate`, `approx_sq_footage`, `rough_price_estimate`, and `rough_price_version` columns are live on
> `public.leads` and that the broken legacy trigger/function has been dropped.

Status convention: `[ ]` = not done, `[x]` = done, `[~]` = in progress.

---

## 0. What we're building

```
public.leads INSERT
   └──(Supabase Database Webhook, async, retried)──► Edge Function: notify-new-lead
                                                         │
                                                         ├── Verifies x-webhook-secret
                                                         ├── Formats the row as HTML + plaintext
                                                         ├── Attaches the raw JSON payload
                                                         └── POST https://api.resend.com/emails
```

### Locked decisions (from the plan's open questions)

| Question | Answer |
| --- | --- |
| Recipient (initial test) | `dariel@tanygrowth.com` |
| From address | `dariel@tanygrowth.com` (domain `tanygrowth.com` already verified in Resend) |
| Body format | **HTML + plaintext** — better deliverability and accessible in every mail client |
| Attachments | Include the raw JSON payload (`lead-<id>.json`) so ops has an auditable copy even if the HTML renders poorly |
| Subject line | Exactly `new lead submission` |
| Transport | Supabase Database Webhook → Edge Function → Resend (**not** a pg trigger; not an inline call inside `/api/leads`) |

---

## 1. Pre-flight (inside this repo)

- [ ] Confirm on the Supabase remote:
  - [ ] `public.leads` has the full column list in `README.md` → "`public.leads` columns".
  - [ ] `select proname from pg_proc where proname = 'notify_resend_new_lead';` returns **zero rows**.
  - [ ] `select tgname from pg_trigger where tgrelid = 'public.leads'::regclass and not tgisinternal;` returns **zero rows**.
- [ ] Create a local scratch folder for the edge function:
  - [ ] `supabase/functions/notify-new-lead/index.ts` — the function.
  - [ ] `supabase/functions/notify-new-lead/deno.json` — only if we end up pinning a Deno std version.
- [ ] `.env.example` updated with the four new secret names (see §2.3) — never commit real values.

---

## 2. Resend account setup (one-time, outside the repo)

### 2.1 Verify / confirm the sending domain

- [ ] Log into `https://resend.com` → **Domains**.
- [ ] Confirm `tanygrowth.com` is listed as **Verified** (SPF + DKIM green).
  - If not verified yet, add the DNS records Resend shows; wait for green checks before proceeding.

### 2.2 Create (or re-use) a scoped API key

- [ ] Resend → **API Keys** → **Create API Key**.
  - **Name:** `pressure-washing-xperts · lead-webhook`
  - **Permission:** `Sending access` (just `emails:send`).
  - **Domain:** `tanygrowth.com` (scope the key — do not use full-access keys in the edge function).
- [ ] Copy the key (starts with `re_...`). **Store it only in Supabase secrets (§3.3) — never in the repo.**

### 2.3 Names for the secrets we'll set in Supabase

| Name | Value |
| --- | --- |
| `RESEND_API_KEY` | The `re_...` key from §2.2 |
| `RESEND_FROM` | `Pressure Washing Xperts <dariel@tanygrowth.com>` |
| `LEAD_NOTIFICATION_TO` | `dariel@tanygrowth.com` (comma-separated once we go wider) |
| `LEAD_WEBHOOK_SECRET` | A fresh random string — generate with `openssl rand -hex 24` |

---

## 3. Supabase Edge Function: `notify-new-lead`

### 3.1 Create the function locally

- [ ] Install the Supabase CLI if you don't have it: `npm i -g supabase` (or use the Homebrew/Scoop install).
- [ ] From the repo root:
  ```bash
  supabase functions new notify-new-lead
  ```
  This scaffolds `supabase/functions/notify-new-lead/index.ts`.

### 3.2 Function responsibilities (plan only — code in next pass)

1. **Auth gate:** return `401` unless `req.headers.get("x-webhook-secret") === Deno.env.get("LEAD_WEBHOOK_SECRET")`.
2. **Parse body:** the Supabase webhook POSTs `{ type: "INSERT", table: "leads", record: { …lead… }, schema: "public", old_record: null }`. We only care about `record`.
3. **Format payload:**
   - Subject: `new lead submission` (literal — requirement).
   - HTML: a minimal, inlined-style table — one row per column from `record`, with `null`s rendered as `—` and timestamps rendered as `created_at` (UTC, ISO) + `created_at` (America/New_York, human-readable).
   - Plaintext: a `key: value` dump of the same columns, separated by `\n`, for clients that don't render HTML.
   - Attachment: `lead-<record.id>.json` — `JSON.stringify(record, null, 2)` base64-encoded in the Resend request.
4. **Send via Resend** (POST `https://api.resend.com/emails`):
   ```json
   {
     "from": "<RESEND_FROM>",
     "to": ["<LEAD_NOTIFICATION_TO split on comma>"],
     "subject": "new lead submission",
     "html": "<rendered html>",
     "text": "<plaintext>",
     "attachments": [
       {
         "filename": "lead-<id>.json",
         "content": "<base64 JSON>"
       }
     ]
   }
   ```
5. **Never fail the webhook:** if Resend returns non-2xx, log the error but return `200` so Supabase doesn't retry forever. If auth fails, return `401`. If the payload is malformed, return `400`.

### 3.3 Set project secrets (one-time)

- [ ] In the repo root:
  ```bash
  supabase secrets set \
    RESEND_API_KEY=re_... \
    "RESEND_FROM=Pressure Washing Xperts <dariel@tanygrowth.com>" \
    LEAD_NOTIFICATION_TO=dariel@tanygrowth.com \
    LEAD_WEBHOOK_SECRET=$(openssl rand -hex 24)
  ```
- [ ] Confirm: `supabase secrets list` — all four should appear.

### 3.4 Deploy the function

- [ ] `supabase functions deploy notify-new-lead --project-ref uljtanpaligqwqtojhdt`
- [ ] Quick smoke test with curl (from a terminal that can reach the internet — fill in the secret and project ref):
  ```bash
  curl -i https://uljtanpaligqwqtojhdt.supabase.co/functions/v1/notify-new-lead \
    -H "content-type: application/json" \
    -H "x-webhook-secret: $LEAD_WEBHOOK_SECRET" \
    -d '{"type":"INSERT","table":"leads","schema":"public","record":{"id":-1,"full_name":"Smoke Test","email":"smoke@example.com","phone":"555-0100","city":"Atlanta","state":"GA","zip":"30301","message":"smoke","how_heard":"search","selected_offer":"none","submission_type":"smoke","approx_sqft_estimate":"1500_2500","approx_sq_footage":"1,500–2,500 sq ft","rough_price_estimate":325,"rough_price_version":"v1_2026_04_floor250","utm_source":null,"utm_medium":null,"utm_campaign":null,"page_path":null,"created_at":"2026-04-24T00:00:00Z"},"old_record":null}'
  ```
- [ ] Expected: `200`, and `dariel@tanygrowth.com` receives an email titled `new lead submission` with the smoke-test attachment.

---

## 4. Supabase Database Webhook (fires the function on every INSERT)

- [ ] Supabase Studio → **Database → Webhooks → Create a new hook**.
- [ ] Settings:
  - **Name:** `lead_insert_to_resend`
  - **Table:** `public.leads`
  - **Events:** `INSERT` only (no update/delete).
  - **Type:** `HTTP Request`.
  - **HTTP Method:** `POST`.
  - **URL:** `https://uljtanpaligqwqtojhdt.supabase.co/functions/v1/notify-new-lead`
  - **HTTP Headers:**
    - `content-type: application/json`
    - `x-webhook-secret: <same value as the LEAD_WEBHOOK_SECRET secret>`
  - **HTTP Params:** none.
  - **Timeout:** 5000 ms (default is fine).
- [ ] Save.

---

## 5. End-to-end verification

- [ ] From a browser on the production (or preview) URL, submit **one lead from each entry point** (hero form, contact page form).
- [ ] Each submission:
  - [ ] Returns `200` from `/api/leads`.
  - [ ] Appears as a new row in Supabase Studio → **Table editor → leads** with `approx_sq_footage` populated.
  - [ ] Within ~30 seconds, sends exactly one email to `dariel@tanygrowth.com` with:
    - Subject `new lead submission`.
    - HTML body listing every column of the new row.
    - Attachment `lead-<id>.json` with the raw record.
- [ ] Supabase Studio → **Database → Webhooks → lead_insert_to_resend → Logs**: every firing shows HTTP `200` from the edge function.
- [ ] Intentionally break the webhook (temporarily set the wrong `x-webhook-secret`) and submit a lead:
  - [ ] Insert **still succeeds**.
  - [ ] Edge function returns `401`.
  - [ ] No email is sent.
  - [ ] Restore the correct secret; next submission emails normally.

---

## 6. Rollback plan

- [ ] To pause notifications without touching inserts: Studio → **Database → Webhooks → lead_insert_to_resend** → toggle **Enabled** off.
- [ ] To remove the function entirely: `supabase functions delete notify-new-lead --project-ref uljtanpaligqwqtojhdt`.
- [ ] To rotate the Resend key: regenerate in Resend dashboard, `supabase secrets set RESEND_API_KEY=re_new_...`, redeploy.
- [ ] To widen the recipient list: `supabase secrets set LEAD_NOTIFICATION_TO=dariel@tanygrowth.com,ops@pressurewashingxperts.com` — no redeploy needed, edge function reads from `Deno.env` on each invocation.

---

## 7. Follow-ups / nice-to-haves (out of scope for the first ship)

- [ ] Swap the `x-webhook-secret` header for a signed JWT so we can rotate Resend/webhook secrets independently.
- [ ] Add a basic rate limit inside the edge function (e.g. reject >10 requests / 10s from the same source IP) in case the webhook ever loops.
- [ ] Surface `rough_price_estimate` and the selected offer title inline in the email header so ops can triage without opening the attachment.
- [ ] Send a separate low-priority digest to a mailbox like `leads-archive@…` with a daily CSV export — keep `dariel@tanygrowth.com` focused on real-time triage.

---

## 8. Pass criteria (copied from `IMPLEMENTATION_PLAN_MESSAGE.md` §4)

- [ ] Inserting a row (from the site or Studio) delivers an email within ~30s containing every column of that row.
- [ ] Disabling the webhook stops emails but inserts still succeed.
- [ ] Resend API failures do not roll back or delay the insert.
