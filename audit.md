# Site Audit: Pressure Washing Xperts (2026 Modernization)

Audit date: July 2, 2026
Stack: Next.js 16 App Router, React 19, Tailwind 4, framer-motion 12, shadcn/ui.
Theme: "Power Shift" (dark navy + electric cyan). Brand tokens are healthy and centralized in `app/globals.css` and `data/site.ts`.

Overall: the foundation is strong. The theme is coherent, reduced-motion support is unusually good, and the conversion layout (phone-first hero, floating call button, multi-step form) is sound. The gaps are copy quality, scroll-motion depth, carousel ergonomics, and a handful of consistency drifts.

---

## 1. Copywriting

### 1.1 Em dashes everywhere
- **Problem:** 80+ em dashes in user-facing copy across ~30 files (sections, templates, SEO descriptions, FAQ data, service pages, the Google Ads template). The "clause — clause" pattern repeats so often it reads machine-generated.
- **Why it matters:** Repetitive punctuation rhythm is the single strongest AI-writing tell. Home service customers trust plain talk.
- **Fix:** Remove every em dash. Use commas, periods, or restructure. Vary sentence openings while doing it.
- **Priority: HIGH**

### 1.2 Hero eyebrow duplicates the H1
- **Problem:** The eyebrow reads "Metro Atlanta's Pressure Washing Xperts" and the H1 directly below says the identical phrase.
- **Why it matters:** Wasted above-the-fold line; reads like a template slot nobody filled in.
- **Fix:** Eyebrow becomes a differentiated trust line ("Licensed & Insured · Ellenwood, GA").
- **Priority: HIGH**

### 1.3 Emoji as iconography
- **Problem:** Hero trust pills and SocialProofBar stats use raw emoji (⭐ ✅ 📞 🏠 📅). Rendering varies by platform and reads low-budget next to the lucide icon system used everywhere else.
- **Fix:** Replace with lucide icons in the brand cyan.
- **Priority: MEDIUM**

### 1.4 Google Ads template copy
- **Problem:** Several RSA headlines/descriptions use em dashes ("Call Now — We Answer Fast").
- **Fix:** Rewrite within character limits, re-verify counts programmatically.
- **Priority: HIGH**

## 2. Motion

### 2.1 No scroll-linked depth anywhere
- **Problem:** All motion is one-shot fade/slide reveals. No pinned sections, no stacking cards, no scroll-linked transforms. Site feels flat relative to 2026 expectations (n8n, Stripe, Apple product pages).
- **Fix:** Add a stacking-card scroll experience to the core Services list: CSS `position: sticky` stacking with scroll-linked scale/dim on the card being covered. CSS-first so it stays cheap; framer-motion `useScroll` only for the scale layer. Full reduced-motion fallback.
- **Priority: HIGH**

### 2.2 Mount-time animations firing off-screen
- **Problem:** `animate-fade-in-up` (CSS, mount-triggered) is used on Services primary cards and Gallery sections that sit below the fold. The animation completes before the user ever scrolls there.
- **Fix:** Replace with the existing viewport-triggered `Reveal` primitives.
- **Priority: MEDIUM**

### 2.3 Easing/duration drift
- **Problem:** CSS keyframes use `ease-out` 0.4-0.6s while framer components use cubic-bezier(0.22,1,0.36,1). Two motion voices.
- **Fix:** Standardize on the cubic-bezier curve (calm, Apple-like decel) for new work; leave legacy utility keyframes but stop spreading them.
- **Priority: LOW**

## 3. Testimonials carousel

- **Problems:**
  - No touch/swipe support on mobile (arrows only, below the card).
  - Auto-advances every 5s with no `aria-live`, so screen readers get nothing and sighted users can have text swapped mid-read.
  - Desktop shows 3 cards but the center card scale trick reflows text (min-h hack present).
- **Fix:** framer-motion drag/swipe on mobile, pause auto-play on hover/touch/focus, `aria-live="polite"`, keep yellow stars (correct convention) but align badge accents to cyan.
- **Priority: HIGH (mobile UX + a11y)**

## 4. Visual consistency

- Section vertical rhythm drifts: `py-12`, `py-14`, `py-14 lg:py-16` across sibling sections. Standardize to `py-14 sm:py-16 lg:py-20` scale on the homepage.  **Priority: MEDIUM**
- Radius language is mostly `rounded-xl`/`rounded-2xl` (fine). Header dropdowns force `rounded-none` (intentional, leave).
- `brand-yellow` token actually renders cyan (theme remap). Confusing for maintainers but functioning; do not rename mid-flight. Documented here instead.

## 5. Accessibility

Good news: `prefers-reduced-motion` handling is thorough (both CSS and useReducedMotion), form has progressbar semantics, footer uses native `details`, touch targets on mobile controls are 44px.

Gaps:
- Carousel lacks `aria-live` and pause affordance (WCAG 2.2.2 Pause, Stop, Hide applies to the 5s auto-advance).
- Hero decorative beam and glows correctly `aria-hidden`; keep it that way in new work.
- Some interactive cards nest a link plus a separate tel anchor; tab order is fine, but ensure new stacked cards keep a single primary link with the phone CTA as a sibling.

## 6. Mobile

- Hero is phone-first (correct for this business), floating call bar with safe-area padding is present.
- Stats bar auto-marquee on mobile: acceptable, has reduced-motion off switch.
- Main gaps: carousel swipe (above), and ensuring the new stacking cards use comfortable `top` offsets so stacked headers stay visible on small screens.

## 7. Performance

- Hero image uses `next/image` with `priority` + blur placeholder. Good LCP hygiene.
- New scroll effects must avoid scroll listeners: use CSS sticky + framer `useScroll` (rAF-batched, transform/opacity only, no layout properties).
- No new JS dependencies required for any planned work.

## 8. SEO

- Metadata layer (`marketing-route-seo.ts`) is centralized and complete; sitemap and JSON-LD builders present. No structural SEO work needed in this pass. Copy rewrites must preserve keywords (house washing, roof soft wash, driveway cleaning, commercial, city names).
