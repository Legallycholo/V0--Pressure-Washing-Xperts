# SEO, AEO & GEO — Implementation Plan

**Status:** Planning only (no implementation in this document)  
**Last plan revision:** 2026-04-17  
**Out of scope for this phase:** Blog, news, or standalone “articles” routes. Educational URLs that already exist (e.g. about pages) stay as normal pages with metadata + schema, not `Article` type.

---

## 1. Goals

| Track | Intent |
|--------|--------|
| **SEO** | Unique, accurate titles and descriptions per URL; crawlable discovery via sitemap and `robots.txt`; rich results where appropriate; consistent canonical and social previews. |
| **AEO (Answer Engine Optimization)** | Clear, quotable answers (especially FAQs); structured FAQ data aligned with visible copy; sensible heading hierarchy and direct first sentences. |
| **GEO (Generative Engine Optimization)** | Explicit entity signals (business name, location, services, service area); trustworthy `Organization` / `LocalBusiness` graphs; accurate NAP alignment with `data/site.ts`. |

---

## 2. Current state (baseline)

- **Home FAQ:** `components/sections/FAQ.tsx` is already rendered on the landing page (`app/page.tsx`). It currently holds **eight** Q&A pairs. Target: **ten** relevant FAQs (extend, do not duplicate the section).
- **Footer:** `components/layout/Footer.tsx` — bottom bar has copyright only; **no** visible “last updated” line yet.
- **Metadata:** Exported `metadata` / `generateMetadata` only in `app/layout.tsx`, `app/gallery/layout.tsx`, and `app/service-areas/[city]/page.tsx`. Most routes are **`"use client"`** pages, so they **inherit the root document title** unless a parent **server** `layout.tsx` supplies route-level metadata.
- **JSON-LD:** None detected in the codebase today.
- **Sitemap / robots:** No `app/sitemap.ts` (or `sitemap.xml`) and no `app/robots.ts` or `public/robots.txt` in the repo snapshot used for this plan.

---

## 3. SPA-like caveat — recommended approach (for now)

The site is **Next.js App Router**, not a hosted separate SPA, but **many pages are client components** for interactivity (quote scroll, etc.). Next.js **does not allow** exporting `metadata` from those files.

**Recommended short-term pattern (minimal churn, maximum coverage):**

1. **Per-segment or per-route server `layout.tsx` files** that wrap existing client `page.tsx` files unchanged. Those layouts are **Server Components** by default: they can export `metadata` or `generateMetadata` and render `{children}` only.
2. **Group layouts** where many siblings share one template (e.g. all `app/services/residential/*/page.tsx` under `app/services/residential/layout.tsx` with `generateMetadata` reading slug from `segment` / URL — exact API depends on Next version; if dynamic metadata from segment is awkward, use **one small layout per leaf** generated or hand-maintained from the same inventory as the sitemap).
3. **JSON-LD:** Prefer **inline `<script type="application/ld+json">` in the same server layout** (or a tiny dedicated server component imported by that layout) so JSON-LD is not duplicated inside client bundles and stays easy to audit.
4. **Do not convert** large client pages to server components unless there is a separate need; **layouts as shells** preserve current UX while fixing SEO metadata and structured data.

**Later optional hardening:** Thin server `page.tsx` that imports a client `HomePageClient` (or similar) if you want metadata colocated with the route file; layouts remain the fastest win.

---

## 4. Implementation phases

### Phase A — On-page (landing + trust)

| Step | Action | Primary files / notes |
|------|--------|------------------------|
| A.1 | **Confirm FAQ section** on home: already present; **expand to 10 FAQs** with pressure-washing / soft-wash / Metro Atlanta relevance (pricing bands, safety, prep, insurance, scheduling, commercial vs residential, environmental, “how long,” warranties if applicable — only factual claims). | `components/sections/FAQ.tsx`, optional copy review in `docs/plans/COPY_PLAN.md` if you keep plans in sync |
| A.2 | **Visible “Last updated”** in footer (e.g. “Site content last updated: Month D, YYYY”). Use a **single exported constant** (ISO date string) in a small data module so updates are intentional and match any future `lastmod` policy. | New or existing under `data/` (e.g. extend `data/site.ts` or add `data/site-content-version.ts`), `components/layout/Footer.tsx` |
| A.3 | **No new articles** this phase; skip `Article` / `BlogPosting` schema and any `/blog` route work. | — |

**AEO note for FAQ copy:** First sentence = direct answer; following sentences = nuance. Keep homepage FAQ and any future `FAQPage` JSON-LD **identical** in Q/A text.

---

### Phase B — JSON-LD (all agreed types except Article)

Implement **after** FAQ text is stable and NAP/service list is agreed (reduces churn).

| Type | Where | Notes |
|------|--------|--------|
| **Organization** | Root or global layout | Legal name, URL, logo if stable URL exists, `sameAs` only for real profiles (omit or empty until URLs exist — avoid placeholder socials). |
| **LocalBusiness** (or more specific subtype if justified) | Root or shared layout | Address and phone **must match** footer and `data/site.ts`; geo tied to real service area; opening hours only if verified. |
| **WebSite** | Root | `url` + `name`; include `potentialAction` / `SearchAction` **only** if you add real on-site search — otherwise omit per Google guidelines. |
| **FAQPage** | Home layout (server) | Exactly the 10 visible FAQ items from `FAQ.tsx` (consider **single shared data module** `data/home-faq.ts` consumed by both UI and JSON-LD). |
| **BreadcrumbList** | Server layouts for nested routes | Home → section → leaf (and commercial/residential hubs as middle crumb). Match visible breadcrumbs if you add them later; if no UI breadcrumbs, schema-only is still valid but keep hierarchy honest. |
| **Service** | Per service leaf layout (or page shell) | One `Service` (or item list) per URL: `name`, `description`, `provider` → Organization, `areaServed` where relevant. |

**Validation:** Google Rich Results Test / Schema.org validator on home + one residential leaf + one commercial leaf + one city page.

---

### Phase C — Metadata (all working pages)

**Inventory:** Every `app/**/page.tsx` that represents a public marketing URL (including gallery, about, privacy, service hubs, all service leaves, service-areas index, all city pages, `about/we-do-xpert`, commercial/residential landing pages).

| Step | Action |
|------|--------|
| C.1 | Maintain a **route checklist** (spreadsheet or markdown table) with columns: path, title, description, canonical notes, OG image strategy. |
| C.2 | Add **server `layout.tsx`** (or `generateMetadata` where dynamic) for each segment lacking metadata today. **Extend** city pages: add `openGraph`, `twitter`, `alternates.canonical` using env-based site URL. |
| C.3 | **Root `app/layout.tsx`:** broaden defaults (`metadataBase`, default `description`, OG/Twitter fallbacks) so children without overrides still look acceptable. |
| C.4 | **Canonical base URL:** `NEXT_PUBLIC_SITE_URL` (or equivalent) in `.env.example` and Vercel env; use in `metadataBase` and sitemap/robots. |

**Description guidelines:** Unique per URL, 110–160 characters where possible, primary keyword + location where relevant for local pages.

---

### Phase D — Sitemap (full map of working pages)

| Step | Action |
|------|--------|
| D.1 | Add **`app/sitemap.ts`** (Next.js metadata route) returning **all** indexable absolute URLs. |
| D.2 | **Sources of truth:** (1) static paths from inventory; (2) city slugs from the same module used by `generateStaticParams` in `app/service-areas/[city]/page.tsx` (`serviceAreaContent` / `getServiceAreaBySlug` from `data/service-areas.ts`). |
| D.3 | **`lastmod`:** Prefer file or content-driven dates only where reliable; otherwise omit `lastmod` rather than fabricate. Optionally tie **global** `lastmod` to the same “site content last updated” constant from Phase A for non-dynamic URLs (document the policy). |
| D.4 | **`changeFrequency` / `priority`:** Optional; keep conservative and consistent if used. |

---

### Phase E — `robots.txt` (recommended)

| Step | Action |
|------|--------|
| E.1 | Add **`app/robots.ts`** that allows all public marketing crawlers by default on production. |
| E.2 | **`sitemap`:** Absolute URL to `/sitemap.xml` (derived from `NEXT_PUBLIC_SITE_URL`). |
| E.3 | **`host`:** Optional; set only if it matches real canonical host. |
| E.4 | **Staging / preview:** If preview deployments should not be indexed, use env-based rules (disallow all on non-production) — align with Vercel preview URL strategy. |

---

## 5. Dependency order (recommended execution)

1. **Phase A** (FAQ count + copy, footer last updated + shared date constant)  
2. **Phase C** foundations: env URL + root `metadataBase` / defaults  
3. **Phase C** per-route layouts + checklist completion  
4. **Phase B** JSON-LD (shared FAQ data first, then global entities, then per-route Service + BreadcrumbList)  
5. **Phase D** sitemap  
6. **Phase E** robots  
7. **Post-ship:** Search Console + Bing Webmaster — submit sitemap, monitor coverage and rich results.

---

## 6. Acceptance criteria (definition of done)

- [ ] Home shows **10** FAQs in the existing FAQ section; copy is accurate and aligned with any `FAQPage` JSON-LD.
- [ ] Footer shows a **visible** last-updated date sourced from one shared constant.
- [ ] Every public **working** route has **unique** `title` and `description` (and canonical/OG where specified in checklist).
- [ ] JSON-LD present for **Organization**, **LocalBusiness**, **WebSite** (no fake `SearchAction`), **FAQPage** on home, **BreadcrumbList** on nested indexable routes, **Service** on service leaf URLs — **no** `Article` / blog types this phase.
- [ ] `sitemap.xml` lists **all** intended indexable URLs including all city and service pages.
- [ ] `robots.txt` references the sitemap; preview/staging behavior documented and env-driven if applicable.
- [ ] No regression to client-side navigation or existing quote/CTA behavior.

---

## 7. Risks and mitigations

| Risk | Mitigation |
|------|------------|
| FAQ JSON-LD drifts from UI | Single `data/home-faq.ts` (or similar) imported by `FAQ.tsx` and home layout JSON-LD. |
| Social placeholders in footer | Do not put fake `sameAs` URLs in Organization schema until real. |
| Duplicate titles across service leaves | Layout-per-route or dynamic `generateMetadata` keyed by slug + central copy map (extend pattern used for cities in `data/service-areas.ts`). |
| Wrong domain in canonical/sitemap | Single env var; document in README / internal wiki only if you already document env elsewhere (user asked not to expand docs beyond this file unless needed). |

---

## 8. Files likely touched (implementation reference)

| Area | Files (expected) |
|------|------------------|
| FAQ | `components/sections/FAQ.tsx`, new `data/home-faq.ts` (recommended) |
| Footer | `components/layout/Footer.tsx`, `data/site.ts` or new version constant |
| Metadata | New `app/**/layout.tsx` files across segments; updates to `app/layout.tsx`, `app/gallery/layout.tsx`, `app/service-areas/[city]/page.tsx` |
| JSON-LD | Same new layouts or `components/seo/*` server-only components imported by layouts |
| Sitemap / robots | `app/sitemap.ts`, `app/robots.ts` |
| Config | `.env.example`, deployment env for `NEXT_PUBLIC_SITE_URL` |

---

## 9. Explicit non-goals (this phase)

- New **articles** section, CMS blog, or `Article` / `BlogPosting` schema.
- Major refactors of client pages to server components (use layout shells instead).
- Automated “freshness” updates without real content changes.

---

*End of plan.*
