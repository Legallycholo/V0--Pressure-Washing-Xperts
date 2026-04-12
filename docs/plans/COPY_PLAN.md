# COPY_PLAN.md - Pressure Washing Xperts CRO Implementation

Step-by-step file-by-file instructions. Execute in the order listed.
No new npm dependencies required.

---

## STEP 1 - Fix: Remove Invisible Content Bug

### Files: `components/Services.tsx` and `components/TrustBadges.tsx`

Both files have cards/items that use `style={{ opacity: 0 }}` inline combined with CSS animation classes. Because `opacity: 0` is set as an inline style (highest CSS specificity), elements that have already animated or are reduced-motion will remain invisible to the user permanently.

**In `components/Services.tsx`** - find and remove `style={{ opacity: 0 }}` from the primary service card `<div>`:

```tsx
// BEFORE (line ~83):
className={`group relative rounded-xl overflow-hidden transition-all duration-300 cursor-pointer animate-fade-in-up stagger-${index + 1}`}
style={{ opacity: 0 }}

// AFTER - remove style prop entirely:
className={`group relative rounded-xl overflow-hidden transition-all duration-300 cursor-pointer animate-fade-in-up stagger-${index + 1}`}
```

**In `components/TrustBadges.tsx`** - find and remove `style={{ opacity: 0 }}` from the badge `<div>`:

```tsx
// BEFORE (line ~34):
className={`flex flex-col items-center text-center animate-fade-in-up stagger-${index + 1}`}
style={{ opacity: 0 }}

// AFTER - remove style prop entirely:
className={`flex flex-col items-center text-center animate-fade-in-up stagger-${index + 1}`}
```

---

## STEP 2 - Fix: Broken Tailwind Color Tokens in Service Areas Page

### File: `app/globals.css`

The file `app/service-areas/page.tsx` uses Tailwind classes `bg-navy`, `text-navy`, `hover:text-navy`, `bg-brand`, `text-brand`, `hover:text-brand`, `bg-brand-light`, `border-brand`, `navy-light` - none of which exist in the current `@theme` block and silently produce no CSS output in Tailwind v4.

Add the following tokens inside the `@theme inline { ... }` block in `app/globals.css`, immediately after the existing brand color entries:

```css
/* Aliases used in service-areas/page.tsx */
--color-navy: var(--brand-blue-dark);        /* #0f172a */
--color-navy-light: var(--brand-blue);       /* #1e3a5f */
--color-brand: var(--brand-yellow);          /* #fbbf24 */
--color-brand-light: var(--brand-yellow-dark); /* #f59e0b */
```

Place these inside the existing `@theme inline { }` block right after line:
```css
--color-brand-silver: var(--brand-silver);
```

---

## STEP 3 - Add Secondary "Get a Free Quote" CTA to Hero

### File: `components/Hero.tsx`

Find the CTA button row (currently lines ~126–134). Add a second button **without touching the h1 or any text above it**:

```tsx
// BEFORE (single button):
<div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
  <Button
    asChild
    size="lg"
    className="w-full sm:w-auto bg-brand-yellow text-brand-blue-dark font-bold text-lg px-8 py-6 hover:bg-brand-yellow-dark transition-all duration-300 shadow-lg"
  >
    <a href="tel:800-451-7213">Call now</a>
  </Button>
</div>

// AFTER (two buttons):
<div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
  <Button
    asChild
    size="lg"
    className="w-full sm:w-auto bg-brand-yellow text-brand-blue-dark font-bold text-lg px-8 py-6 hover:bg-brand-yellow-dark transition-all duration-300 shadow-lg"
  >
    <a href="tel:800-451-7213">Call now</a>
  </Button>
  <Button
    type="button"
    onClick={onOpenQuoteForm}
    size="lg"
    className="w-full sm:w-auto bg-transparent border-2 border-white/50 text-white font-semibold text-lg px-8 py-6 hover:bg-white/10 hover:border-white transition-all duration-300"
  >
    Get a Free Quote
  </Button>
</div>
```

---

## STEP 4 - Deploy `TrustBadges` Component (Currently Unused)

### File: `app/page.tsx`

Add the import and place `<TrustBadges />` between `<Hero>` and `<Services>`.

**Add import** (with the other component imports at the top):
```tsx
import { TrustBadges } from "@/components/TrustBadges"
```

**Update the `<main>` block** to insert `<TrustBadges />`:
```tsx
<main>
  <Hero onOpenQuoteForm={openQuoteForm} />
  <TrustBadges />                          {/* NEW */}
  <Services onOpenQuoteForm={openQuoteForm} />
  ...
</main>
```

---

## STEP 5 - Create `StatsBar` Component

### New file: `components/StatsBar.tsx`

Create this file from scratch. It renders a compact, dark horizontal band of four aggregate proof stats using only existing color tokens.

```tsx
import { Briefcase, Star, CalendarCheck, MapPin } from "lucide-react"

const stats = [
  { icon: Star,          value: "5.0 ★",   label: "Google & Groupon Rating" },
  { icon: Briefcase,     value: "500+",     label: "Jobs Completed"          },
  { icon: CalendarCheck, value: "15+",      label: "Years in Business"       },
  { icon: MapPin,        value: "25+",      label: "Metro Atlanta Cities"    },
]

export function StatsBar() {
  return (
    <section aria-label="Company statistics" className="bg-brand-blue py-8 border-y border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center gap-2">
              <stat.icon className="size-6 text-brand-yellow" aria-hidden />
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-sm text-white/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## STEP 6 - Reorder Homepage Sections for CRO

### File: `app/page.tsx`

**Add `StatsBar` import** (with other imports at the top):
```tsx
import { StatsBar } from "@/components/StatsBar"
```

**Replace the current `<main>` block** with the CRO-optimized order below.
The only change is ordering + two new insertions (`TrustBadges` from Step 4, `StatsBar` from Step 5):

```tsx
<main>
  <Hero onOpenQuoteForm={openQuoteForm} />
  <TrustBadges />
  <StatsBar />
  <Services onOpenQuoteForm={openQuoteForm} />
  <BeforeAfter onOpenQuoteForm={openQuoteForm} />
  <WhyChooseUs onOpenQuoteForm={openQuoteForm} />
  <Gallery variant="teaser" />
  <Testimonials />
  <Offers onOpenQuoteForm={openQuoteForm} />
  <FAQ onOpenQuoteForm={openQuoteForm} />
  <ContactSection />
</main>
```

**Rationale for each move:**
- `TrustBadges` + `StatsBar` immediately after hero = above-fold trust before any service pitch
- `BeforeAfter` before `WhyChooseUs` = visual proof before feature claims
- `Testimonials` before `Offers` = credibility established before the hard sell

---

## STEP 7 - Replace Placeholder Testimonials with Real Reviews

### File: `components/Testimonials.tsx`

#### 7a. Update the testimonial type to include `source`

Add `source: string` to the type used by the array. If it is an inline type, update the object shape:

```ts
// Add source field to each testimonial object
{
  id: number
  name: string
  location: string
  rating: number
  text: string
  service: string
  source: string   // NEW FIELD
}
```

#### 7b. Replace the entire `testimonials` array (lines 6–55) with real reviews

```ts
const testimonials = [
  {
    id: 1,
    name: "Giselle",
    location: "Atlanta, GA",
    rating: 5,
    text: "Arthur did an amazing job! My house looks brand new! He did a walk through with me and fully explained what to expect. Will definitely use his services again. Try him! You won't regret it.",
    service: "House Washing",
    source: "Groupon · Top Reviewer",
  },
  {
    id: 2,
    name: "Jasmin",
    location: "Atlanta, GA",
    rating: 5,
    text: "Arthur was prompt and professional. He did an amazing job pressure washing my home and patio area. Will definitely use him again!",
    service: "House & Patio Washing",
    source: "Google · Top Reviewer",
  },
  {
    id: 3,
    name: "Keera",
    location: "Atlanta, GA",
    rating: 5,
    text: "Great communication and speedy service! Worked diligently around our home and has it looking brand new. Most definitely recommend!",
    service: "Residential Cleaning",
    source: "Groupon · Verified Review",
  },
  {
    id: 4,
    name: "Lynette",
    location: "Atlanta, GA",
    rating: 5,
    text: "Art did an amazing job on the house. He was thorough and on time. My house looks as good as the day we moved in.",
    service: "House Washing",
    source: "Google · Verified Review",
  },
  {
    id: 5,
    name: "Ben",
    location: "Atlanta, GA",
    rating: 5,
    text: "Was able to come to do the job very quickly, great service and will use again!",
    service: "Pressure Washing",
    source: "Google · Verified Review",
  },
  {
    id: 6,
    name: "Yvonne",
    location: "Atlanta, GA",
    rating: 5,
    text: "Great service.",
    service: "Residential Cleaning",
    source: "Groupon · Verified Review",
  },
]
```

#### 7c. Update the section header to show aggregate rating

Find the section header block (lines ~99–109) and replace the sub-paragraph:

```tsx
// BEFORE:
<p className="mt-4 text-white/70 max-w-2xl mx-auto text-lg">
  {"Don't just take our word for it. Here's what our satisfied customers have to say about our services."}
</p>

// AFTER:
<p className="mt-4 text-white/70 max-w-2xl mx-auto text-lg">
  {"Don't just take our word for it."} Rated{" "}
  <span className="text-brand-yellow font-semibold">5.0 ★</span> across{" "}
  <span className="text-white font-semibold">32+ verified reviews</span>{" "}
  on Google &amp; Groupon.
</p>
```

#### 7d. Render `source` in the card author block

In both the desktop card (lines ~140–149) and mobile card (lines ~178–189), add the `source` line below the location text:

```tsx
// BEFORE (author block):
<div>
  <p className="font-semibold text-white">{testimonial.name}</p>
  <p className="text-white/60 text-sm">{testimonial.location}</p>
</div>

// AFTER:
<div>
  <p className="font-semibold text-white">{testimonial.name}</p>
  <p className="text-white/60 text-sm">{testimonial.location}</p>
  <p className="text-white/40 text-xs mt-0.5">{testimonial.source}</p>
</div>
```

Apply this to **both** the desktop card author block and the mobile card author block.

---

## STEP 8 - Replace Placeholder FAQ Answers

### File: `components/FAQ.tsx`

All 8 FAQ answers currently start with `"Placeholder answer - "`. Replace the entire `faqs` array (lines 11–44) with copy that reads as professional business content:

```ts
const faqs = [
  {
    question: "What types of surfaces can you pressure wash?",
    answer:
      "We clean concrete driveways, brick walkways, wooden decks, vinyl and hardboard siding, asphalt, stone patios, fences, and roof shingles. Every surface gets the right pressure setting and cleaning solution to avoid damage while delivering a deep clean.",
  },
  {
    question: "How much does pressure washing cost?",
    answer:
      "Pricing depends on the surface type, square footage, and level of buildup. A driveway typically starts around $100–$150; a full house exterior ranges from $200–$500 depending on size. We provide free, no-obligation quotes so you know exactly what to expect before we begin.",
  },
  {
    question: "Is pressure washing safe for my property?",
    answer:
      "Yes. Our technicians are trained to dial in the right PSI for each surface. For roofs, painted siding, and stucco we switch to soft washing - a low-pressure method using biodegradable solutions that kills mold and mildew at the root without blasting the surface.",
  },
  {
    question: "How often should I have my property pressure washed?",
    answer:
      "Most homes benefit from an annual cleaning. Properties near tree cover, in high-humidity areas, or with heavy foot traffic - like commercial storefronts and parking lots - may need service every 6 months. We can recommend a maintenance schedule during your free estimate.",
  },
  {
    question: "Do I need to be home during the service?",
    answer:
      "Not necessarily. We just need access to an outdoor water spigot and the areas being cleaned. That said, we always recommend a quick walkthrough before we start so we can note any specific concerns - cracked concrete, sensitive plants, parked vehicles, etc.",
  },
  {
    question: "What is soft washing and when do you use it?",
    answer:
      "Soft washing uses low pressure (under 500 PSI) combined with a biodegradable cleaning solution to remove algae, mold, lichen, and mildew. We use it on roofs, stucco, EIFS, cedar shake, and painted surfaces where high-pressure water could cause damage.",
  },
  {
    question: "Are your cleaning solutions environmentally friendly?",
    answer:
      "Yes. We use biodegradable, plant-safe detergents wherever possible. Before we rinse, we wet down nearby landscaping to dilute any runoff. We follow PWNA best practices for chemical handling and disposal.",
  },
  {
    question: "How do I prepare for my pressure washing appointment?",
    answer:
      "Move any patio furniture, potted plants, and vehicles away from the work area. Close all windows and doors. We'll handle the rest - setup, cleaning, rinse-down, and cleanup - and leave your property looking fresh.",
  },
]
```

---

## Execution Order & Dependency Summary

| Step | File(s) | Action | New Deps? |
|------|---------|--------|-----------|
| 1 | `Services.tsx`, `TrustBadges.tsx` | Remove `style={{ opacity: 0 }}` | None |
| 2 | `app/globals.css` | Add 4 missing color tokens | None |
| 3 | `Hero.tsx` | Add secondary CTA button | None |
| 4 | `app/page.tsx` | Import + use `TrustBadges` | None |
| 5 | `components/StatsBar.tsx` | Create new component | None |
| 6 | `app/page.tsx` | Import `StatsBar`, reorder sections | None |
| 7 | `Testimonials.tsx` | Replace all 6 testimonials + header + source field | None |
| 8 | `FAQ.tsx` | Replace all 8 placeholder answers | None |

**Total files modified:** 7  
**Total files created:** 1 (`components/StatsBar.tsx`)
