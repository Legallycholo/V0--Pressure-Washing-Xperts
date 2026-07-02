# Implementation Plan: 2026 UX/UI Modernization

Grounded in `audit.md`. Order chosen so copy (zero-risk) lands first, then motion, then polish. Every phase keeps existing branding, tokens, and business identity. No new dependencies.

---

## Phase 1: Copy humanization (zero visual risk)

**Objective:** Every piece of user-facing text sounds like the owner wrote it. No em dashes anywhere.

**Components affected:**
- `google_ads_final_template.md` (RSA headlines/descriptions rewritten within char limits)
- `data/marketing-route-seo.ts`, `data/home-faq.ts`, `data/modalCopy.ts`
- `components/sections/*` (ContactSection, WhyChooseUs, Services)
- `components/templates/ServicePageTemplate.tsx`, `ServiceAreaPageTemplate.tsx`
- `components/ContactForm.tsx`
- `app/(home)/page.tsx`, `app/(home)/layout.tsx`, service pages, about pages, soft-washing, roof-cleaning, power-washing, thank-you, privacy
- `app/api/leads/route.ts`, `app/api/active-lead/route.ts` (email placeholder cells: em dash -> "N/A")

**Complexity:** Low (mechanical) + Medium (rewrites must stay natural and keep SEO keywords).
**Dependencies:** none.
**Notes:** Ad copy re-verified against Google Ads limits programmatically after rewrite. En dashes in numeric ranges (7-10am, $8-$12) may become hyphens for consistency; only em dashes are banned outright.

## Phase 2: Motion foundation

**Objective:** One motion voice: calm decel curve, transform/opacity only, viewport-triggered.

**Components affected:**
- `components/motion/StackCards.tsx` (new): sticky stacking-card primitives with scroll-linked scale/dim of covered cards; reduced-motion renders a plain list.
- `components/sections/Services.tsx`: core six services become the stacked scroll story on all breakpoints (CSS sticky works on touch). Primary/supporting cards switch from mount-time CSS animation to viewport `Reveal`.
- `components/sections/Gallery.tsx`: swap `animate-fade-in-up` section wrappers to `Reveal`.

**Complexity:** Medium-High.
**Dependencies:** Phase 1 merged (copy inside cards is final).
**Notes:** No scroll listeners; `useScroll` + `useTransform` on refs only. Stick offsets account for fixed header (`--header-offset-*`).

## Phase 3: Testimonials ergonomics

**Objective:** Carousel that feels native on a phone and is polite to assistive tech.

**Components affected:** `components/sections/Testimonials.tsx`

- Swipe/drag to change slides on mobile (framer drag with elastic constraints)
- Pause auto-advance on hover, focus, and touch; resume after idle
- `aria-live="polite"` region; slide position announced
- Keep 5-star yellow (convention); align badge chip to cyan accent

**Complexity:** Medium. **Dependencies:** none.

## Phase 4: Hero and trust surface polish

**Objective:** Sharpen the first four seconds.

**Components affected:** `components/sections/Hero.tsx`, `components/sections/SocialProofBar.tsx`

- Eyebrow no longer duplicates H1 (becomes location + licensing line)
- Trust pills: emoji -> lucide icons (Star, ShieldCheck, Clock)
- SocialProofBar: emoji -> lucide icons, consistent sizing

**Complexity:** Low. **Dependencies:** none.

## Phase 5: Rhythm + consistency pass

**Objective:** Consistent vertical rhythm and spacing on the homepage.

**Components affected:** homepage sections (`py-12`/`py-14` variants -> `py-14 sm:py-16 lg:py-20`), FAQ/Contact section headers aligned to the same header pattern.

**Complexity:** Low. **Dependencies:** Phases 2-4 (avoid rebasing over moving files).

## Phase 6: Verification

- `pnpm build` + `pnpm lint` green
- Grep proves zero em dashes in user-facing copy
- Ads template char-count script re-run (all pass)
- Manual viewport walk at 375px, 768px, 1280px via dev server
- Reduced-motion spot check (emulate `prefers-reduced-motion`)
- Update `checklist.md`, commit to `claude/google-ads-config-setup-82m0zh` (PR #11)
