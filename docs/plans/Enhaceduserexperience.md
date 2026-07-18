# Enhaceduserexperience.md - Site-Wide UX Refresh Implementation Plan

A "mini relook" for every existing page. Same brand colors, same copy, new feel. The goal is ROI: more quote form submissions and calls per visitor. Do not begin implementation until this plan is confirmed.

---

## 1. Context and Goals

The homepage already feels alive: framer-motion scroll reveals (`components/motion/Reveal.tsx`), animated counters (`components/motion/CountUp.tsx`), stacked cards (`components/motion/StackCards.tsx`), social proof, and a rich section rhythm. But the moment a visitor clicks into any other page (34+ service leaf pages, hubs, service areas, about, gallery, contact) the site goes static. Sections pop in with no motion, cards have flat hover states, and the visual energy drops.

**Goal:** when a user lands anywhere on the site, every page should feel like the homepage's more polished sibling. Familiar, same brand, but noticeably fresher.

**ROI definition:** more visitors reaching the quote form or tapping the call button. Every change below either adds perceived quality (trust) or shortens the path to a CTA (conversion).

**Hard constraints (non-negotiable):**
- Keep all existing brand colors and tokens in `app/globals.css`. No new palette.
- Keep all existing copy. No rewrites. Any NEW microcopy (aria labels, button labels) follows `docs/plans/IMPLEMENTATION_SERVICE_PAGES_COPYWRITING.md`: no em dashes, benefit-first, short active sentences.
- Every animation must respect `prefers-reduced-motion`. The `Reveal` primitives already do this; reuse them instead of writing new observers.
- No new npm dependencies. framer-motion 12 and tw-animate-css are already installed.
- Never use inline `style={{ opacity: 0 }}` (this caused the invisible-content bug documented in `docs/plans/COPY_PLAN.md` Step 1).

---

## 2. Existing Building Blocks (reuse, do not reinvent)

| Asset | File | Use for |
|---|---|---|
| `Reveal`, `RevealGroup`, `RevealItem` | `components/motion/Reveal.tsx` | Scroll-in for every section on every page |
| `CountUp` | `components/motion/CountUp.tsx` | Stats anywhere numbers appear |
| `StackCards` | `components/motion/StackCards.tsx` | Optional: hub page card treatments |
| `BeforeAfterSlider` | `components/sections/BeforeAfterSlider.tsx` | More before/after proof across pages |
| `SocialProofBar` | `components/sections/SocialProofBar.tsx` | Trust strip on interior pages |
| CSS keyframes (`fade-in-up`, `pulse-glow`, `water-beam`, `step-reveal`, `ps-marquee`) | `app/globals.css` | Accents; already reduced-motion guarded |
| `FloatingCallButton` | `components/layout/FloatingCallButton.tsx` | Already on all pages; enhance, do not replace |

---

## 3. Phase A - Template-Level Refresh (highest leverage, touches 30+ pages at once)

### A1. `components/templates/ServicePageTemplate.tsx` (all 34 service leaf pages)
- Wrap Hero heading, description, and CTA row in staggered `Reveal` (delay 0 / 0.1 / 0.2).
- Benefits list: convert to `RevealGroup` + `RevealItem` so items cascade in.
- Benefits media block (before/after slider, split images, single image): `Reveal` with a slight scale-in (y: 24). Add a soft hover lift (`hover:-translate-y-1 hover:shadow-xl transition`) on media cards.
- Process section: reveal the 4 steps with stagger; add a connecting line or step-number pulse using the existing `step-reveal` keyframe.
- CTA section: add the existing `pulse-glow` accent to the primary button and a `Reveal` on entry.
- Add a slim trust strip (reuse `SocialProofBar` or a compact variant) between Benefits and Process. Copy comes from existing homepage strings only.

### A2. `components/templates/ServiceCategoryHubTemplate.tsx` (residential + commercial hubs)
- Card grid becomes `RevealGroup`; each card `RevealItem`.
- Card hover: image/icon zoom (scale 1.03), border glow with existing brand yellow token, arrow slide on the link.
- Add a count-up stat row at the top (jobs completed, cities served) reusing `CountUp` and the homepage's numbers.

### A3. `components/templates/ServiceAreaPageTemplate.tsx` (24+ service area pages)
- Same treatment: staggered reveals per section, hover states on any card/list, CTA glow.

**Verification for Phase A:** one template edit must visibly change house-washing, red-clay-removal, the hubs, and ellenwood service-area pages. Spot-check 3 of each.

---

## 4. Phase B - Global Chrome (every page)

### B1. `components/layout/Header.tsx`
- Add a scrolled state: after ~24px scroll, header gains backdrop blur, subtle shadow, and slightly compressed height (CSS transition, no copy changes).
- Dropdown menus: fade/slide-in on open (tw-animate-css utilities), highlight the active route.
- Mobile menu: staggered item entrance.

### B2. `components/layout/Footer.tsx`
- `Reveal` on column entry; hover underline slide on links (CSS only).

### B3. `components/layout/FloatingCallButton.tsx`
- Keep behavior. Add an idle "breath" using the existing `float-cta-ring` keyframe if not already applied on interior pages, and make sure it appears after first scroll rather than instantly (less banner blindness, higher tap rate).

### B4. Page transition polish
- Add a lightweight route-level fade: wrap `{children}` in `app/layout.tsx` (or a client segment wrapper) with a 150-200ms opacity/translate mount transition via framer-motion. Must be subtle; skip entirely under reduced motion.

---

## 5. Phase C - Non-Template Pages

Apply the same Reveal + hover treatment individually to pages that do not use the three templates:

- `app/roof-cleaning/`, `app/power-washing/`, `app/soft-washing/` (top-level service pages)
- `app/about/we-do-xpert/`, `app/about/pressure-vs-soft-washing/`
- `app/gallery/` - add hover zoom on tiles, staggered grid reveal, and a lightbox entrance animation if one exists.
- `app/contact/` - reveal the form card; add focus-ring polish and input transition states to `components/ContactForm.tsx` (visual only, no logic changes).
- `app/service-areas/` (index) - card grid stagger like the hubs.
- `app/thank-you/` - reuse the existing `success-pop-in` keyframe for the confirmation.
- `app/privacy/` - Reveal on headings only. Keep it quiet.

---

## 6. Phase D - ROI / Conversion Layer

- **Quote path shortening:** on every interior page, the primary CTA already routes to the home quote section via `useGoToHomeQuoteSection`. Verify the scroll lands with the form focused; add a brief highlight pulse on the form card when arrived at (attention anchor, existing keyframes).
- **Sticky mobile CTA:** confirm `FloatingCallButton` never overlaps the CTA sections; add a second compact "Get a Quote" pill next to it on mobile if spacing allows.
- **Proof density:** reuse `BeforeAfterSlider` with existing gallery assets on the hubs (one slider per hub, images already in `public/`). Before/after is the highest-converting asset type this business has.
- **Analytics:** ensure CTA clicks fire through the existing `VisitorN8nTracker` / `UTMCapture` plumbing so the refresh's ROI is measurable. Add event names for: floating call tap, template CTA click, quote form reached, quote form submitted. No new vendors.

---

## 7. Assets Already In Place (from this session)

The four red clay photos the owner provided are saved and wired:

- `public/residential-services/red-clay-removal-before.png` / `red-clay-removal-after.png` - used by `residentialRedClayRemovalMedia` in `data/residential-service-media.ts` (before/after slider on the residential page).
- `public/commercial-services/red-clay-removal-before.png` / `red-clay-removal-after.png` - used inline in `app/services/commercial/red-clay-removal/page.tsx` (before/after slider).

These two pages are the newest and should be included in Phase A spot-checks. The originals also sit in the session scratchpad as `attached-1..4.jpeg` if re-exports are needed.

Optional asset task: the PNGs are 1.4-2.5 MB each. Recompress with sharp (already a dependency) or convert to WebP/optimized PNG at max 1600px wide to protect page speed. Next/Image will handle responsive sizing either way.

---

## 8. Execution Order

| Step | Scope | Files |
|---|---|---|
| 1 | ServicePageTemplate refresh | `components/templates/ServicePageTemplate.tsx` |
| 2 | Hub + ServiceArea templates | `components/templates/ServiceCategoryHubTemplate.tsx`, `ServiceAreaPageTemplate.tsx` |
| 3 | Header scrolled state + menus | `components/layout/Header.tsx` |
| 4 | Footer + FloatingCallButton | `components/layout/Footer.tsx`, `FloatingCallButton.tsx` |
| 5 | Route transition wrapper | `app/layout.tsx` + small client component |
| 6 | Non-template pages | Phase C list above |
| 7 | Conversion layer + analytics events | Phase D list above |
| 8 | Image optimization pass | `public/*-services/red-clay-*.png` |

Each step is independently shippable. Commit per step.

## 9. Verification

1. `pnpm build` passes after every step (metadata lookups throw at build time if a route breaks).
2. `pnpm dev`: walk one page of each type (home, service leaf, hub, service area, about, gallery, contact, thank-you) at desktop and mobile widths. Confirm sections reveal on scroll, nothing is stuck invisible, and hovers feel consistent.
3. Toggle "Reduce motion" in macOS System Settings and re-walk the same pages: all content must render immediately with zero motion.
4. Lighthouse on `/`, one leaf page, and one hub: performance and CLS must not regress (animations must not cause layout shift; only transform/opacity).
5. Submit the quote form once end-to-end to confirm the conversion path still works after the scroll/focus changes.
