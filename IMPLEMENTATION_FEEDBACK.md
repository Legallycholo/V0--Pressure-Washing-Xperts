# Implementation Plan: UI/UX Feedback

## Summary
This plan covers frontend UI/UX improvements across homepage sections, shared templates, and custom pages while preserving all backend, API, and data-fetching behavior. The implementation is centralized in shared components first so fixes propagate to all service and city pages consistently. After structural/mobile fixes, copy reduction and visual process storytelling updates are applied across all sections.

## Change Log by Feedback Item

### 1. Mobile Responsiveness
**Files affected:**
- `components/sections/Hero.tsx` - lines 154-203: simplify above-the-fold content stack and mobile spacing.
- `components/sections/Hero.tsx` - lines 205-477: reduce mobile form density and prevent long hero scroll trap.
- `components/layout/Header.tsx` - lines 293-444: improve mobile menu spacing and touch target consistency.
- `components/layout/FloatingCallButton.tsx` - lines 26-33: adjust fixed bar position and mobile safe-area behavior.
- `components/layout/FloatingCallButton.tsx` - lines 36-63: enforce non-overlapping touch targets for call/quote actions.
- `components/layout/ExitIntentPopup.tsx` - lines 294-327: constrain modal sizing for small screens and safe viewport fit.
- `components/layout/ExitIntentPopup.tsx` - lines 443-461: reposition reopen chip to avoid overlap with fixed CTA bar.
- `components/sections/BeforeAfterSlider.tsx` - lines 151-157 and 212-218: remove scroll-hostile interaction (`touch-none`) and preserve natural vertical scroll.
- `components/sections/Services.tsx` - lines 76-135: improve card spacing and touch readability on mobile.
- `components/sections/Testimonials.tsx` - lines 239-287: adjust controls for in-viewport positioning and better thumb reach.
- `components/sections/Gallery.tsx` - lines 242-305: improve tile interaction accessibility and touch ergonomics.
- `components/sections/Gallery.tsx` - lines 287-289: increase tiny chip text readability on narrow viewports.
- `components/templates/ServicePageTemplate.tsx` - lines 112-147: tighten hero text and CTA spacing on small screens.
- `components/templates/ServicePageTemplate.tsx` - lines 150-258: rebalance benefit/media columns for mobile-first flow.
- `components/templates/ServiceAreaPageTemplate.tsx` - lines 23-73: optimize hero stacking and spacing at `<768px`.
- `components/templates/ServiceAreaPageTemplate.tsx` - lines 147-175: improve card grid reflow and spacing on mobile.
- `components/templates/ServiceCategoryHubTemplate.tsx` - lines 28-56 and 59-99: tune hero and hub card responsiveness.
- `app/about/we-do-xpert/page.tsx` - lines 21-137: fix custom-page spacing and card stack for mobile.
- `app/about/pressure-vs-soft-washing/page.tsx` - lines 20-146: improve 2-column comparison reflow to mobile.
- `app/service-areas/page.tsx` - lines 23-101: tighten custom hero/grid spacing and tap comfort.
- `app/globals.css` - lines 283-302 and new utility block additions: shared offset/touch/mobile helper utilities.

**Implementation approach:** Perform a strict `<768px` audit section-by-section, normalize spacing/typography, enforce 44px minimum touch targets for controls, and resolve interaction patterns that interrupt natural mobile scroll.
**Priority:** High
**Dependencies:** Must be completed before popup, floating widget, and hero polish to prevent repeated breakpoint rework.

---

### 2. Hero Section
**Files affected:**
- `components/sections/Hero.tsx` - lines 136-203: reduce hero to one headline, one subheading sentence, and one primary CTA.
- `components/sections/Hero.tsx` - lines 140-152: replace heavy layered decorative treatment with cleaner image-led composition.
- `components/sections/Hero.tsx` - lines 205-477: remove/relocate competing in-hero form block from first-screen mobile focus.
- `components/sections/Hero.tsx` - lines 154-155 and section wrapper classes: set mobile hero height target to 85-90vh.
- `app/globals.css` - new hero utility classes for height, overlay balance, and mobile visual isolation.

**Implementation approach:** Make hero the single focal point on mobile using an impactful pressure-washing image (project asset if available, else high-quality Unsplash URL), concise copy, and one CTA. Ensure next-section content does not appear prematurely in the initial mobile viewport.
**Priority:** High
**Dependencies:** Depends on mobile baseline (Item 1). Should be done before global copy trim (Item 6) to avoid duplicate copy edits.

---

### 3. Popup / Modal
**Files affected:**
- `components/layout/ExitIntentPopup.tsx` - lines 340-388: compress popup text to max two lines (one hook + one CTA support line).
- `components/layout/ExitIntentPopup.tsx` - lines 411-420: strengthen CTA prominence (size, contrast, visual hierarchy).
- `components/layout/ExitIntentPopup.tsx` - lines 329-338 and 430-437: make close control more obvious and fully accessible.
- `components/layout/ExitIntentPopup.tsx` - lines 294-327: ensure modal container does not obscure key page actions/content.
- `components/layout/ExitIntentPopup.tsx` - lines 446-461: ensure reopen chip does not conflict with floating CTA/mobile controls.

**Implementation approach:** Keep existing trigger mechanism intact but redesign modal content hierarchy for brevity and action clarity, with a strong CTA and explicit close affordance.
**Priority:** High
**Dependencies:** Requires Item 4 stacking/position policy so final modal placement is conflict-free.

---

### 4. Floating Button / Widget
**Files affected:**
- `components/layout/FloatingCallButton.tsx` - lines 26-33: adjust fixed position (`bottom`, safe-area padding, visibility rules) on mobile.
- `components/layout/FloatingCallButton.tsx` - lines 36-63: verify call/quote controls remain non-overlapping and fully tappable on all breakpoints.
- `components/layout/ExitIntentPopup.tsx` - line 446 and reopen chip block (446-461): align chip vertical position with floating bar.
- `components/layout/Header.tsx` - lines 90-93 and 444: confirm z-index and fixed-header interaction with mobile floating controls.

**Implementation approach:** Define one consistent fixed-element stacking policy. If overlap remains on small screens, hide lower-priority floating/reopen widget on mobile (`md` breakpoint strategy) so no interactive controls overlap.
**Priority:** High
**Dependencies:** Depends on Item 1 responsive pass; should precede final popup UX polish (Item 3).

---

### 5. Process / Steps Sections
**Files affected:**
- `components/templates/ServicePageTemplate.tsx` - lines 95-107: normalize process step data for visual-first presentation.
- `components/templates/ServicePageTemplate.tsx` - lines 262-287: replace plain step cards with connected numbered icon cards/timeline treatment.
- `components/templates/ServiceAreaPageTemplate.tsx` - lines 207-223: convert city process section into visual stepper with connectors.
- `components/templates/ServiceAreaPageTemplate.tsx` - lines 178-205: pair process storytelling with relevant before/after visual context where available.
- `app/globals.css` - add connector/step reveal utility styles and lightweight transition classes.

**Implementation approach:** Implement shared template-level stepper design so all service and service-area pages inherit the improved visual storytelling automatically. Use CSS transitions and native Intersection Observer only (no new npm packages).
**Priority:** Medium-High
**Dependencies:** Depends on Item 1 mobile layout baseline and Item 6 copy trims for concise step text.

---

### 6. Global Text Reduction
**Files affected:**
- `components/sections/Services.tsx` - lines 70-72, 118-120, 159-161: compress body copy and support text.
- `components/sections/BeforeAfter.tsx` - lines 78-80 and 102-103: tighten descriptive copy.
- `components/sections/WhyChooseUs.tsx` - lines 18-68 and 110-130: reduce repetitive feature descriptions.
- `components/sections/Offers.tsx` - lines 28-31, 85-99, 120-131: trim offer body/terms and long footer disclaimer.
- `components/sections/FAQ.tsx` - lines 11-51 and 70-72: shorten long answers to concise 1-2 sentence versions.
- `components/layout/Footer.tsx` - lines 37-40: shorten brand description block.
- `components/templates/ServiceCategoryHubTemplate.tsx` - lines 35, 64-66, 90-92: compress hub support text.
- `components/templates/ServicePageTemplate.tsx` - lines 122-124, 234-236, 269-271, 296-299: reduce template body copy blocks.
- `components/templates/ServiceAreaPageTemplate.tsx` - lines 44-50, 153-155, 184-186, 271: tighten city-page supporting copy.
- `app/about/we-do-xpert/page.tsx` - lines 43-53 and 113-115: shorten story and CTA body paragraphs.
- `app/about/pressure-vs-soft-washing/page.tsx` - lines 46-92 and 103-107: shorten explanatory text.
- `app/about/pressure-vs-soft-washing/page.tsx` - lines 50-56 and 78-84: trim 5-item bullet blocks to top 3 impact points.
- `app/service-areas/page.tsx` - lines 32-34, 59-61, 92-93: punchier section descriptions.
- `app/services/residential/page.tsx` - line 19: tighten residential hub description.
- `app/services/commercial/page.tsx` - line 19: tighten commercial hub description.
- `app/services/residential/house-washing/page.tsx` - lines 21-30: trim long service description and reduce benefits list to top 3.
- `app/services/residential/brick-stone-masonry/page.tsx` - lines 21-30: trim service copy and reduce benefits list.
- `app/services/residential/carpet-cleaning/page.tsx` - lines 20-29: trim service copy and reduce benefits list.
- `app/services/residential/curbing/page.tsx` - lines 21-30: trim service copy and reduce benefits list.
- `app/services/residential/decks-fences/page.tsx` - lines 21-30: trim service copy and reduce benefits list.
- `app/services/residential/driveways-sidewalks/page.tsx` - lines 21-30: trim service copy and reduce benefits list.
- `app/services/residential/gutters/page.tsx` - lines 21-30: trim service copy and reduce benefits list.
- `app/services/residential/indoor-air/page.tsx` - lines 20-29: trim service copy and reduce benefits list.
- `app/services/residential/odor-removal/page.tsx` - lines 20-29: trim service copy and reduce benefits list.
- `app/services/residential/residential-properties/page.tsx` - lines 20-29: trim service copy and reduce benefits list.
- `app/services/residential/roof-soft-washing/page.tsx` - lines 20-29: trim service copy and reduce benefits list.
- `app/services/residential/stain-cleaning/page.tsx` - lines 20-29: trim service copy and reduce benefits list.
- `app/services/residential/tile-and-grout-cleaning/page.tsx` - lines 20-29: trim service copy and reduce benefits list.
- `app/services/residential/upholstery-cleaning/page.tsx` - lines 20-29: trim service copy and reduce benefits list.
- `app/services/commercial/apartment-complexes/page.tsx` - lines 20-29: trim service copy and reduce benefits list.
- `app/services/commercial/awning-cleaning/page.tsx` - lines 20-29: trim service copy and reduce benefits list.
- `app/services/commercial/building-washing/page.tsx` - lines 20-29: trim service copy and reduce benefits list.
- `app/services/commercial/commercial-gutter-cleaning/page.tsx` - lines 20-29: trim service copy and reduce benefits list.
- `app/services/commercial/dumpster-pads/page.tsx` - lines 20-29: trim service copy and reduce benefits list.
- `app/services/commercial/fleet-washing/page.tsx` - lines 20-29: trim service copy and reduce benefits list.
- `app/services/commercial/gas-stations/page.tsx` - lines 20-29: trim service copy and reduce benefits list.
- `app/services/commercial/glass-mirror-cleaning/page.tsx` - lines 20-29: trim service copy and reduce benefits list.
- `app/services/commercial/government-complexes/page.tsx` - lines 20-29: trim service copy and reduce benefits list.
- `app/services/commercial/graffiti-removal/page.tsx` - lines 20-29: trim service copy and reduce benefits list.
- `app/services/commercial/hoa-services/page.tsx` - lines 20-29: trim service copy and reduce benefits list.
- `app/services/commercial/hotels-hospitality/page.tsx` - lines 20-29: trim service copy and reduce benefits list.
- `app/services/commercial/office-buildings/page.tsx` - lines 20-29: trim service copy and reduce benefits list.
- `app/services/commercial/parking-decks/page.tsx` - lines 20-29: trim service copy and reduce benefits list.
- `app/services/commercial/parking-lots-garages/page.tsx` - lines 20-29: trim service copy and reduce benefits list.
- `app/services/commercial/rooftop-skylight-cleaning/page.tsx` - lines 20-29: trim service copy and reduce benefits list.
- `app/services/commercial/storefronts/page.tsx` - lines 20-29: trim service copy and reduce benefits list.

**Implementation approach:** Keep headings, CTA labels, and form labels unchanged. Reduce body text blocks over 3 sentences to 2 max and trim any 5+ bullet list to the top 3 highest-impact points.
**Priority:** Medium-High
**Dependencies:** Execute after Hero (Item 2) and alongside Process update (Item 5) to avoid rewriting text twice.

---

## Implementation Order
1. Mobile baseline pass (`globals.css`, shared component breakpoints, touch target sizing, scroll safety) to stabilize all viewports first.
2. Hero redesign in `components/sections/Hero.tsx` (image-led, simplified copy, 85-90vh mobile treatment).
3. Floating button and overlay conflict resolution (`FloatingCallButton`, `ExitIntentPopup`, header z-index interactions).
4. Popup content/UX refinement (`ExitIntentPopup`) after fixed-position conflicts are solved.
5. Process/storytelling visual upgrade in shared templates (`ServicePageTemplate`, `ServiceAreaPageTemplate`) for system-wide effect.
6. Global copy reduction across homepage sections, custom pages, hubs, and all service leaf pages.
7. Final QA checklist by page group and viewport (home, about, hubs, service leaves, city pages, gallery, privacy) to confirm no overlap or responsiveness regressions.

## Files That Will NOT Be Touched
- `app/api/leads/route.ts` - API route out of scope.
- `lib/submitLead.ts` - lead submission service layer out of scope.
- `lib/leadAnalytics.ts` - analytics submission tracking out of scope.
- `utils/supabase/client.ts` - data layer client out of scope.
- `utils/supabase/server.ts` - server data access out of scope.
- `utils/supabase/admin.ts` - admin data access out of scope.
- `utils/supabase/middleware.ts` - auth/session middleware bridge out of scope.
- `middleware.ts` - request middleware out of scope.
- Any other backend/server-action/data-fetch implementation file not listed in the frontend component/page/style scope above remains unchanged.

## Bonus Finding
- `components/layout/Footer.tsx` - lines 124-130: social badges are styled as clickable controls but are non-functional placeholder elements, which creates UX confusion and trust friction.
