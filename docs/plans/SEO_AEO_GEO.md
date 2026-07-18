# SEO, AEO & GEO — Action Plan

**Status:** Foundation shipped. This doc now tracks the *remaining* work.
**Last revised:** 2026-07-18
**Owner split:** each task is tagged **[CODE]** (Claude implements in-repo), **[MCP]** (Claude runs via Google Search Console / GA4 MCP once re-authenticated), or **[MANUAL]** (only the business owner can do it — GBP, reviews, credentials).

> **Note:** An earlier version of this file assumed no JSON-LD, sitemap, robots, or per-route metadata existed. All of that is now implemented (see §2). Do not act on the pre-2026-07 baseline.

---

## 1. Definitions

| Track | Intent |
|-------|--------|
| **SEO** | Classic organic ranking: crawlable, unique titles/descriptions, structured data, canonical + sitemap. |
| **AEO** (Answer Engine Optimization) | Being the quoted answer in Google AI Overviews, featured snippets, and assistants. Driven by clear Q&A copy + `FAQPage` schema that matches the visible text. |
| **GEO** (Generative / Geographic) | Two senses that both apply here: (a) *Generative* engines (ChatGPT, Perplexity, Gemini) citing the business; (b) *Geographic* local ranking — the Google Map Pack for "pressure washing near me." Both hinge on consistent entity + NAP signals and, for the map pack, **Google Business Profile**. |

---

## 2. Current baseline (already shipped — do not redo)

Verified in-repo on 2026-07-18:

- **Metadata:** every marketing route has unique title/description/canonical via `data/marketing-route-seo.ts` + `lib/seo/create-marketing-route-layout.tsx` (build *fails* if a route is missing an entry).
- **JSON-LD emitted today** (`lib/seo/json-ld-builders.ts`): `Organization`, `LocalBusiness` (with `geo`, `priceRange`, `openingHoursSpecification`, `areaServed`, `OfferCatalog`), `WebSite`, `FAQPage` (from shared `data/home-faq.ts`), `BreadcrumbList`, and per-leaf `Service`.
- **Sitemap:** `app/sitemap.ts` auto-lists every route in `MARKETING_ROUTE_SEO` (services 0.8, cities 0.75, home 1.0) with `lastmod`.
- **robots:** `app/robots.ts` allows production, disallows Vercel preview, links the sitemap.
- **Analytics:** GA4 `G-EK4M4BMN05` + Google Ads `AW-18151841356` load site-wide (`app/layout.tsx`).
- **Footer:** visible "content last updated" date from a shared constant.
- **Coverage:** ~34 service pages + ~24 city pages + hubs, all in the sitemap.

This is a strong foundation. The gaps below are refinements, not missing basics.

---

## 3. Open technical items — [CODE] (Claude can implement on request)

Ordered by impact. None are started; all are safe, small changes.

### 3.1 Deduplicate the LocalBusiness entity — ✅ **DONE (2026-07-18)**
There used to be **two** LocalBusiness JSON-LD blocks on every page (a thin inline one in `app/layout.tsx` and the rich one from `buildGlobalJsonLdGraph()`). The inline block was removed; the rich graph in `lib/seo/json-ld-builders.ts` is now the single source. Verified in rendered HTML: exactly **1** each of LocalBusiness / Organization / WebSite.

### 3.2 Add `sameAs` (real social/citation profiles) — **high priority for GEO**
No `sameAs` anywhere today, and the footer shows non-functional FB/IG/YT/TW placeholders. Once real profile URLs exist (see §5.4), add them to the `Organization`/`LocalBusiness` graph and wire the footer icons to them. Strengthens entity trust for both Google and generative engines. **Blocked on [MANUAL] delivering real URLs.**

### 3.3 `aggregateRating` — **do carefully**
Footer advertises "5.0 · 32+ Reviews" but no `aggregateRating` schema exists, so no star rich-result. Adding it can surface stars in search **only if** backed by genuine, verifiable reviews; self-serving ratings without a real source violate Google policy and risk a manual action. **Recommended:** source the rating/count from real Google reviews and keep the number in one constant so schema and footer never drift. **Blocked on [MANUAL] confirming the real, current numbers + source.**

### 3.4 AEO hardening of FAQ copy — **medium**
`FAQPage` schema already mirrors `data/home-faq.ts`. To win AI Overviews / snippets: make the **first sentence of each answer a direct, standalone answer** (then nuance), keep questions phrased the way people actually search ("How much does pressure washing cost in Atlanta?"), and consider adding 2–3 city-level FAQs to the highest-traffic city pages. Keep visible copy and schema identical. (Follows the no-em-dash copy rules in `docs/plans/IMPLEMENTATION_SERVICE_PAGES_COPYWRITING.md`.)

### 3.5 Per-city / per-service unique OG images — **low, nice-to-have**
Give high-value pages distinct social preview images (e.g. the new red-clay before/afters) instead of the site default. Improves CTR from social + rich cards.

### 3.6 Internal linking pass — **low/medium**
Add contextual links between related services (e.g. red-clay-removal ↔ driveways ↔ house-washing) and from city pages to the top services. Spreads authority and helps crawl depth. Data-driven via `data/navigation.ts` relationships.

---

## 4. Search Console & GA4 tasks — [MCP] (Claude runs these directly)

**Access status (2026-07-18):** the Google Search Console + GA4 MCP is connected but the OAuth token is **expired** (`invalid_grant` / reauth required). **Action for you:** re-authenticate the "ga4-analytics" connector (or `/mcp` in an interactive session). **Once re-authed, Claude can run all of the following without further help:**

| # | Task | Tool |
|---|------|------|
| 4.1 | Confirm which GSC property covers the live domain (`pressurewashingxpert.com` vs `sc-domain:`) | `gsc_list_sites` |
| 4.2 | Submit / confirm the sitemap (`/sitemap.xml`) | `gsc_submit_sitemap`, `gsc_list_sitemaps` |
| 4.3 | Pull top queries, pages, CTR, and average position (baseline + ongoing) | `gsc_search_analytics` |
| 4.4 | Inspect index status of new/key URLs (both red-clay pages, hubs, top cities) | `gsc_inspect_url`, `indexing_status` |
| 4.5 | Identify "striking distance" keywords (positions 5–20) to prioritize on-page work | `gsc_search_analytics` (dimension: query, filter by position) |
| 4.6 | GA4: which pages convert (quote-form + call events), traffic by source/city | `get_account_summaries`, `run_report` |

**First run once re-authed:** 4.1 → 4.2 → 4.4 for the two new red-clay URLs → 4.3 for a 3-month query baseline. Claude will report findings and fold them back into §3 priorities.

---

## 5. Google Business Profile & off-site — [MANUAL] (owner only; Claude can't access GBP)

GBP is the **single biggest lever** for local/map-pack ranking and is not code — it lives in your Google account. Step by step:

### 5.1 Claim & verify
- Claim/verify the profile for **Pressure Washing Xperts**, Ellenwood GA (2193 Gateway Trl, 30294). Complete 100% of fields.

### 5.2 Categories & services
- Primary category: **Pressure Washing Service**. Add secondaries you actually offer (Gutter Cleaning Service, Building Cleaning, etc.).
- Add each service as a GBP "Service" with a short description (mirror the site's service list, incl. Red Clay Removal).
- Set the **service-area** cities to match your 24 city pages.

### 5.3 Reviews — the dominant map-pack factor
- Get the "32+ reviews" onto **Google** specifically; respond to every one.
- Ask customers to name the **service + city** in the review ("driveway cleaning in Stockbridge") — that keyword-in-review signal ranks.
- Set up a short review-request link/QR to hand out after jobs.

### 5.4 Photos, posts & social
- Post weekly (offers + before/after — use the new red-clay photos), geotag/caption by city.
- Create real Facebook / Instagram / YouTube profiles, then hand the URLs to Claude for §3.2 (`sameAs` + footer links).

### 5.5 Citations & NAP consistency
- List identical **Name / Address / Phone** on Yelp, BBB, Nextdoor, Angi, Bing Places. Any mismatch (incl. the singular/plural "Xpert(s)" domain — see §5.6) dilutes local ranking.

### 5.6 Domain — ✅ **RESOLVED (2026-07-18)**
Canonical domain is **`pressurewashingxpert.com`** (singular). The brand name "Pressure Washing Xperts" (plural) and the email `pressurewashingxperts@gmail.com` (plural) are intentional and stay as-is. Code already uses the singular host (`data/site.ts` → `https://www.pressurewashingxpert.com`); no stray plural-domain references exist. **[MANUAL] one verification left:** confirm whether the live site serves **www** or **non-www**, and that `NEXT_PUBLIC_SITE_URL` in Vercel matches that exact host — a www/non-www mismatch would split canonical signals. Make sure GBP + all citations use the same host.

---

## 6. GEO / generative-engine visibility — [CODE] + [MANUAL]

To be cited by ChatGPT / Perplexity / Gemini and AI Overviews:
- **[CODE]** Keep entity schema clean and singular (fixes in §3.1–3.3 directly help).
- **[CODE]** Ensure key facts (service area, phone, hours, what's cleaned) appear as plain crawlable text, not only in images.
- **[MANUAL]** Off-site mentions (citations, reviews, local press/directories) are what generative engines synthesize from — §5 feeds this directly.

---

## 7. Recommended execution order

1. **[MANUAL]** Re-auth the Google connector → unblocks all of §4.
2. **[MCP]** Baseline pull (§4.1–4.4): property, sitemap, index status of new pages, current queries.
3. **[CODE]** §3.1 dedupe LocalBusiness (safe, high impact) — ship immediately.
4. **[MANUAL]** §5.6 domain decision + §5.4 real social URLs → unblocks **[CODE]** §3.2 `sameAs` and §3.3 `aggregateRating`.
5. **[CODE]** §3.4 AEO FAQ tightening + §3.6 internal links.
6. **[MANUAL]** §5 GBP completion + review drive (ongoing; highest ROI for local).
7. **[MCP]** Recurring monthly: §4.3/4.5 query + striking-distance report to steer new content.

---

## 8. What Claude can do right now vs. what it's waiting on

- **Done this session:** §3.1 (LocalBusiness dedupe) and §5.6 (domain confirmed singular). §3.4 FAQ copy was reviewed and is already AEO-solid (each answer leads with a direct sentence) — no change needed.
- **Waiting on you (GSC/GA4):** all of §4. Owner has stated GSC access can't be shared via MCP this session, so these stay owner-run in the Search Console UI (submit sitemap, watch coverage, pull query report).
- **Waiting on you (assets):** §3.2 needs real social profile URLs; §3.3 `aggregateRating` is **not recommended** for LocalBusiness (Google no longer shows self-serving star ratings from your own site, and it risks a policy flag) — leave it off unless surfacing third-party review widgets.
- **Cannot do (no access):** §5 GBP, reviews, citations — these are yours; Claude can draft copy, review-request text, and GBP service descriptions on request.
- **Small polish available on request:** the footer's `FB / IG / YT / TW` badges are non-functional placeholders — either wire them to real profiles (once created) or remove them so nothing on the site looks unfinished.

---

*End of plan.*
