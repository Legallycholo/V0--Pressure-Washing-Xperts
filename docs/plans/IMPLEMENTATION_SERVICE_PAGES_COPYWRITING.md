# IMPLEMENTATION_SERVICE_PAGES_COPYWRITING.md

Complete implementation plan for all service page copywriting, section gaps, and supporting TODO items. Do not begin implementation until this plan is confirmed.

---

## 1. Copywriting Voice and Style Reference

All copy across service pages must match the homepage voice exactly. Before writing or editing a single line, internalize these rules.

**Rules (non-negotiable):**
- No em dashes. Use a comma, a period, or rewrite the sentence.
- No "comprehensive," "expert," "professional," or "expert" as the first word of a sentence or description. Use them sparingly as adjectives only.
- Benefit-first framing. Lead with what the customer gets, not what the company does.
- Short sentences. Active voice. No passive constructions like "is designed to" or "can be used."
- No filler openers: "Whether you are..." or "When it comes to..." or "At Pressure Washing Xperts..."
- Specifics beat generics. Name the surface, the outcome, or the mechanism.

**Homepage voice examples to emulate:**
- "Restore your home or business with safe, effective exterior cleaning. Industry-proven techniques that protect your property and boost curb appeal." (Hero description)
- "Soft wash and pressure washing chosen for your surfaces and environment." (WhyChooseUs)
- "Straightforward quotes so you know what to expect before we start." (WhyChooseUs)
- "A team that shows up on time and treats your property with respect." (WhyChooseUs)
- "Removes mold, mildew, and algae at the root without blasting the surface." (FAQ)

**Tone test:** Read the copy out loud. If it sounds like marketing brochure language or could belong to any cleaning company, rewrite it until it sounds like something a knowledgeable owner would say to a homeowner.

---

## 2. Template Architecture (How Pages Are Built)

Every service leaf page renders `ServicePageTemplate` from `components/templates/ServicePageTemplate.tsx`. Understanding the props is essential before writing copy.

**Sections the template renders, in order:**

| Section | Customizable via Props | Current Default |
|---|---|---|
| Hero | `title`, `description`, `category` | None |
| Benefits | `benefits[]`, right-side media | 6 generic items, no media |
| Process | HARDCODED | 4 steps: Contact, Assessment, Service, Satisfaction |
| CTA | HARDCODED | "Ready to Transform Your Property?" |

**Right-side media options (mutually exclusive, priority order):**
1. `benefitsAside="contactForm"` -- replaces media column with the contact quote form card
2. Before/After slider: `beforeSrc`, `afterSrc`, `beforeAlt`, `afterAlt`, `comparisonLabel`
3. Split grid (2 images): `splitImages` array with `src` + `alt`
4. Single image: `imageSrc`, `imageAlt`
5. Fallback: gradient placeholder with "Service Image Placeholder" text

**What this means for the plan:** All copy work is in `title`, `description`, and `benefits`. Media work is in assigning the correct prop set. The process and CTA sections are static across all pages and will be addressed in Phase 2 (template extension, separate plan).

---

## 3. Full Service Page Inventory and Status

### Status Key
- **PLACEHOLDER** -- one-line generic description, no custom benefits, falls back to default template benefits and gradient placeholder
- **PARTIAL** -- has custom benefits and/or media but description is thin or benefits are too short
- **MODERATE** -- solid description and benefits but could be sharper; media assigned
- **COMPLETE** -- strong copy, meaningful benefits, media assigned

### 3A. Residential Service Pages (15 pages)

| Route | File | Status | Title | Description Quality | Benefits | Media |
|---|---|---|---|---|---|---|
| `/services/residential/house-washing` | `house-washing/page.tsx` | MODERATE | House Washing Services | Good, 2 sentences | 6 custom | `imageSrc` (house-washing-01.png) |
| `/services/residential/decks-fences` | `decks-fences/page.tsx` | PARTIAL | Decks and Fences | Needs check | Needs check | `splitImages` |
| `/services/residential/driveways-sidewalks` | `driveways-sidewalks/page.tsx` | PARTIAL | Driveways and Sidewalks | Needs check | Needs check | `splitImages` |
| `/services/residential/roof-soft-washing` | `roof-soft-washing/page.tsx` | MODERATE | Roof Soft Washing | Good, 2 sentences | 6 custom | `contactForm` aside |
| `/services/residential/brick-stone-masonry` | `brick-stone-masonry/page.tsx` | PARTIAL | Brick, Stone & Masonry | Needs check | Needs check | Before/After slider |
| `/services/residential/gutters` | `gutters/page.tsx` | PARTIAL | Gutters | Needs check | Needs check | Before/After slider |
| `/services/residential/curbing` | `curbing/page.tsx` | PARTIAL | Curbing | Needs check | Needs check | Before/After slider |
| `/services/residential/carpet-cleaning` | `carpet-cleaning/page.tsx` | MODERATE | Carpet Cleaning | Good, 2 sentences | 6 custom | `contactForm` aside |
| `/services/residential/indoor-air` | `indoor-air/page.tsx` | PARTIAL | Indoor Air Quality | Needs check | Needs check | `contactForm` aside |
| `/services/residential/odor-removal` | `odor-removal/page.tsx` | PARTIAL | Odor Removal | Needs check | Needs check | `contactForm` aside |
| `/services/residential/residential-properties` | `residential-properties/page.tsx` | PARTIAL | Residential Properties | Needs check | Needs check | `contactForm` aside |
| `/services/residential/stain-cleaning` | `stain-cleaning/page.tsx` | PARTIAL | Stain Cleaning | Needs check | Needs check | `contactForm` aside |
| `/services/residential/tile-and-grout-cleaning` | `tile-and-grout-cleaning/page.tsx` | PARTIAL | Tile & Grout Cleaning | Needs check | Needs check | `contactForm` aside |
| `/services/residential/upholstery-cleaning` | `upholstery-cleaning/page.tsx` | PARTIAL | Upholstery Cleaning | Needs check | Needs check | `contactForm` aside |
| `/services/residential` (hub) | `residential/page.tsx` | MODERATE | Residential Services Hub | Hub template, acceptable | N/A | N/A |

### 3B. Commercial Service Pages (18 pages)

Pages **in the main navigation** (9 leaf pages + hub):

| Route | File | Status | Title | Description Quality | Benefits | Media |
|---|---|---|---|---|---|---|
| `/services/commercial/building-washing` | `building-washing/page.tsx` | MODERATE | Commercial Building Washing | Good, 1 sentence | 6 custom | `imageSrc` |
| `/services/commercial/parking-lots-garages` | `parking-lots-garages/page.tsx` | MODERATE | Parking Lot & Garage Cleaning | Good, 1 sentence | 6 custom | `imageSrc` |
| `/services/commercial/storefronts` | `storefronts/page.tsx` | MODERATE | Storefront Washing | Decent, 1 sentence | 6 custom | `imageSrc` |
| `/services/commercial/graffiti-removal` | `graffiti-removal/page.tsx` | PLACEHOLDER | Graffiti Removal Services | Generic 1 phrase | None (uses defaults) | `contactForm` aside |
| `/services/commercial/dumpster-pads` | `dumpster-pads/page.tsx` | PARTIAL | Dumpster Pad Cleaning | Needs check | Needs check | `contactForm` aside |
| `/services/commercial/fleet-washing` | `fleet-washing/page.tsx` | PARTIAL | Fleet Washing | Needs check | Needs check | `contactForm` aside |
| `/services/commercial/glass-mirror-cleaning` | `glass-mirror-cleaning/page.tsx` | PARTIAL | Glass & Mirror Cleaning | Needs check | Needs check | `contactForm` aside |
| `/services/commercial/commercial-gutter-cleaning` | `commercial-gutter-cleaning/page.tsx` | PARTIAL | Commercial Gutter Cleaning | Needs check | Needs check | `contactForm` aside |
| `/services/commercial/rooftop-skylight-cleaning` | `rooftop-skylight-cleaning/page.tsx` | PARTIAL | Rooftop & Skylight Cleaning | Needs check | Needs check | `contactForm` aside |
| `/services/commercial` (hub) | `commercial/page.tsx` | MODERATE | Commercial Services Hub | Hub template, acceptable | N/A | N/A |

Pages **not in main navigation** (exist as routes, not in `commercialServices` nav array):

| Route | File | Status | Title | Description Quality | Benefits | Media |
|---|---|---|---|---|---|---|
| `/services/commercial/apartment-complexes` | `apartment-complexes/page.tsx` | PLACEHOLDER | Apartment Complex Cleaning | 1 generic phrase | None (uses defaults) | None (gradient) |
| `/services/commercial/awning-cleaning` | `awning-cleaning/page.tsx` | PLACEHOLDER | Awning Cleaning Services | 1 generic phrase | None (uses defaults) | None (gradient) |
| `/services/commercial/gas-stations` | `gas-stations/page.tsx` | PLACEHOLDER | Gas Station Cleaning | 1 generic phrase | None (uses defaults) | None (gradient) |
| `/services/commercial/government-complexes` | `government-complexes/page.tsx` | PLACEHOLDER | Government Complex Cleaning | 1 generic phrase | None (uses defaults) | None (gradient) |
| `/services/commercial/hoa-services` | `hoa-services/page.tsx` | PLACEHOLDER | HOA Services | 1 generic phrase | None (uses defaults) | None (gradient) |
| `/services/commercial/hotels-hospitality` | `hotels-hospitality/page.tsx` | PLACEHOLDER | Hotels & Hospitality Cleaning | 1 generic phrase | None (uses defaults) | None (gradient) |
| `/services/commercial/office-buildings` | `office-buildings/page.tsx` | PLACEHOLDER | Office Building Pressure Washing | 1 generic phrase | None (uses defaults) | None (gradient) |
| `/services/commercial/parking-decks` | `parking-decks/page.tsx` | PLACEHOLDER | Parking Deck Cleaning | 1 generic phrase | None (uses defaults) | None (gradient) |

**Note on non-nav commercial pages:** These 8 pages exist and are reachable by direct URL. They should still have real copy so they rank and convert if discovered. Adding them to the nav or adding cross-links is a separate navigation decision and out of scope for this plan.

---

## 4. Per-Page Copywriting Direction

### 4A. What Each Page Needs

Every page needs these three things audited and populated:
1. `description` -- the hero sub-headline paragraph under the `h1`
2. `benefits` -- the 6-item checklist in the benefits column (left side)
3. Media assignment -- right side of the benefits section

The following sections provide exact copy for each page that currently has placeholder or thin content. Pages marked MODERATE are included with refinement notes. Pages marked PARTIAL where content was not fully verified should be audited first before applying copy; use the copywriting direction here as a baseline.

---

### 4B. Residential Pages -- Copy Direction

#### house-washing (MODERATE -- refine description)

Current description: "Professional exterior house washing to restore your home's beauty. We use soft washing techniques to safely remove dirt, mold, mildew, and stains without damaging your siding or paint."

Refinement (optional, current is acceptable):
- Tighten the second sentence to be more specific about surfaces handled
- Consider: "Soft washing for vinyl, hardboard, brick, and painted siding. Safe pressure settings remove mold, mildew, and weathering without damaging your exterior."

Current benefits (acceptable, no change required):
- "Soft washing for delicate surfaces"
- "Removes mold, mildew, and algae"
- "Eco-friendly cleaning solutions"
- "Protects your home's exterior"
- "Increases curb appeal"
- "Licensed & insured professionals"

Media: `residentialHouseWashingMedia` spread already applied. No change.

---

#### decks-fences (PARTIAL -- audit then apply if needed)

If description is one short sentence, replace with:

```
description="Decks and fences take the worst of Georgia's weather. Mold, mildew, and algae build up fast on wood, composite, and vinyl surfaces. We restore the look and extend the life of your outdoor structures without stripping the finish."
```

If benefits are missing or generic, replace with:
```
benefits={[
  "Safe for wood, composite & vinyl surfaces",
  "Removes mold, algae & weathered gray discoloration",
  "Preserves finish before re-staining or sealing",
  "Cleans fence boards, rails & post bases",
  "Eco-friendly solutions safe for landscaping",
  "Licensed & insured professionals"
]}
```

Media: `residentialDecksFencesMedia` split images already applied. No change.

---

#### driveways-sidewalks (PARTIAL -- audit then apply if needed)

If description is thin, replace with:

```
description="Concrete driveways and sidewalks hold oil stains, tire marks, and green algae that make your property look neglected. We use commercial-grade surface cleaners to blast years of buildup off flat concrete in a single visit."
```

If benefits are missing or generic, replace with:
```
benefits={[
  "Commercial surface cleaner for flat concrete",
  "Removes oil, rust, tire marks & algae",
  "Covers driveways, walkways & steps",
  "Improves traction and appearance",
  "No streaking from inconsistent wand technique",
  "Licensed & insured professionals"
]}
```

Media: `residentialDrivewaysSidewalksMedia` split images already applied. No change.

---

#### roof-soft-washing (MODERATE -- refine benefits)

Current description is good. Current benefits are acceptable but generic. Optionally sharpen:

```
benefits={[
  "Low-pressure soft wash safe for asphalt shingles",
  "Kills algae and moss at the root, not just the surface",
  "Removes black streak staining (Gloeocapsa magma)",
  "Extends shingle life by eliminating damaging organisms",
  "Manufacturer-compatible cleaning methods",
  "Licensed & insured professionals"
]}
```

Media: `benefitsAside="contactForm"` already applied. No change.

---

#### brick-stone-masonry (PARTIAL -- audit then apply)

If description is thin, replace with:

```
description="Brick, natural stone, and masonry are porous surfaces that collect mold, efflorescence, and embedded grime over time. We clean and restore masonry without acid etching or high-pressure damage to mortar joints."
```

If benefits are missing or generic, replace with:
```
benefits={[
  "Safe pressure for brick, stone & mortar joints",
  "Removes efflorescence, mold & green algae",
  "No acid wash methods that damage surface",
  "Restores natural stone color and texture",
  "Covers patios, walkways & retaining walls",
  "Licensed & insured professionals"
]}
```

Media: Before/After slider already applied via `residentialBrickStoneMasonryMedia`. No change.

---

#### gutters (PARTIAL -- audit then apply)

If description is thin, replace with:

```
description="Clogged gutters cause water backup, fascia damage, and foundation erosion. We flush gutters and downspouts, remove debris, and leave your drainage running the way it should."
```

If benefits are missing or generic, replace with:
```
benefits={[
  "Removes leaves, debris & shingle granule buildup",
  "Flushes downspouts to confirm full drainage",
  "Prevents fascia rot and foundation water damage",
  "Available as standalone or combined with house wash",
  "Safe ladder handling and gutter-safe cleaning method",
  "Licensed & insured professionals"
]}
```

Media: Before/After slider already applied via `residentialGuttersMedia`. No change.

---

#### curbing (PARTIAL -- audit then apply)

If description is thin, replace with:

```
description="Street-facing curbs, gutters, and sidewalks are the first thing visitors see. We clean residential curbing and sidewalk panels to remove algae, dirt, and traffic staining quickly and without damage."
```

If benefits are missing or generic, replace with:
```
benefits={[
  "Restores concrete curb and sidewalk appearance",
  "Removes algae, dirt & road film from panels",
  "Improves neighborhood curb appeal before selling",
  "Safe for painted curbs and adjacent landscaping",
  "Quick service, usually completed in under an hour",
  "Licensed & insured professionals"
]}
```

Media: Before/After slider already applied via `residentialCurbingMedia`. No change.

---

#### carpet-cleaning (MODERATE -- current copy is solid)

Current description: "Deep carpet cleaning for homeowners who want fresher rooms and longer carpet life. We lift embedded dirt, allergens, and traffic patterns using methods suited to your fiber type and home."

Current benefits are acceptable. No change required.

Media: `benefitsAside="contactForm"` already applied. No change.

---

#### indoor-air (PARTIAL -- audit then apply)

If description is thin, replace with:

```
description="Indoor air quality affects your family's health every day. We remove dust, allergens, and contaminants from air vents, ductwork, and surfaces so your HVAC circulates clean air instead of recycling buildup."
```

If benefits are missing or generic, replace with:
```
benefits={[
  "Cleans air vents, returns & ductwork surfaces",
  "Reduces airborne allergens and dust circulation",
  "Improves HVAC efficiency after cleaning",
  "Safe for residential HVAC systems",
  "Helps households with allergies or respiratory conditions",
  "Licensed & insured professionals"
]}
```

Media: `benefitsAside="contactForm"` already applied. No change.

---

#### odor-removal (PARTIAL -- audit then apply)

If description is thin, replace with:

```
description="Some odors do not go away with surface cleaning. Pet accidents, smoke, mildew, and organic waste embed into flooring, fabric, and walls. We treat and eliminate odors at the source rather than masking them."
```

If benefits are missing or generic, replace with:
```
benefits={[
  "Targets pet, smoke, mildew & organic odors",
  "Treats source material, not just the surface",
  "Safe for carpets, upholstery & hard surfaces",
  "No heavy perfume masking agents",
  "Residential and commercial applications",
  "Licensed & insured professionals"
]}
```

Media: `benefitsAside="contactForm"` already applied. No change.

---

#### residential-properties (PARTIAL -- audit then apply)

If description is thin, replace with:

```
description="Complete exterior cleaning for residential properties. We handle every surface from roof to driveway so you get one crew, one quote, and one visit instead of coordinating multiple contractors."
```

If benefits are missing or generic, replace with:
```
benefits={[
  "Roof soft washing, house washing & driveway cleaning",
  "Single visit for multiple exterior surfaces",
  "Consistent technique across all property surfaces",
  "Great for pre-listing prep or spring maintenance",
  "Flexible scheduling for occupied homes",
  "Licensed & insured professionals"
]}
```

Media: `benefitsAside="contactForm"` already applied. No change.

---

#### stain-cleaning (PARTIAL -- audit then apply)

If description is thin, replace with:

```
description="Rust, oil, paint, and organic stains on driveways, patios, and walkways are stubborn. We use targeted stain treatment products and pressure washing together to remove the stain without damaging the underlying surface."
```

If benefits are missing or generic, replace with:
```
benefits={[
  "Treats rust, oil, paint & organic staining",
  "Surface-specific products to avoid substrate damage",
  "Works on concrete, pavers, brick & stone",
  "Better results than pressure washing alone",
  "Stain pre-treatment before full surface wash",
  "Licensed & insured professionals"
]}
```

Media: `benefitsAside="contactForm"` already applied. No change.

---

#### tile-and-grout-cleaning (PARTIAL -- audit then apply)

If description is thin, replace with:

```
description="Grout lines trap dirt and bacteria that mopping does not reach. We deep clean tile and grout with hot water extraction and grout-specific detergents to restore brightness and sanitation to kitchen, bathroom, and entryway floors."
```

If benefits are missing or generic, replace with:
```
benefits={[
  "Hot water extraction for deep grout cleaning",
  "Removes embedded soil, mold & discoloration",
  "Safe for ceramic, porcelain & natural stone tile",
  "Covers kitchen, bathroom, entryway & laundry areas",
  "Optional grout sealing to protect results",
  "Licensed & insured professionals"
]}
```

Media: `benefitsAside="contactForm"` already applied. No change.

---

#### upholstery-cleaning (PARTIAL -- audit then apply)

If description is thin, replace with:

```
description="Sofas, chairs, and fabric headboards collect body oils, pet dander, and odors that vacuuming cannot remove. We clean upholstered furniture using methods that match the fabric type and leave it dry faster."
```

If benefits are missing or generic, replace with:
```
benefits={[
  "Safe for most residential upholstery fabrics",
  "Removes body oils, pet dander & embedded soil",
  "Faster drying than steam-only methods",
  "Treats visible stains before full upholstery clean",
  "Works on sofas, chairs, cushions & fabric headboards",
  "Licensed & insured professionals"
]}
```

Media: `benefitsAside="contactForm"` already applied. No change.

---

### 4C. Commercial Pages -- Copy Direction (In-Nav Pages)

#### building-washing (MODERATE -- description could be more specific)

Current description: "Professional exterior cleaning for offices, retail centers & commercial properties across Metro Atlanta."

Refined description:
```
description="Mold, atmospheric staining, and pollution leave commercial facades looking run down fast. We pressure wash or soft wash office buildings, retail centers, and commercial properties across Metro Atlanta using the method that suits the surface."
```

Current benefits are solid. No change required.

Media: `imageSrc` already applied. No change.

---

#### parking-lots-garages (MODERATE -- solid, minor refinement optional)

Current description: "Restore the appearance and safety of your parking areas with professional pressure washing."

Refined description:
```
description="Oil stains, tire marks, and organic buildup on parking surfaces create both appearance and liability problems. We deep clean asphalt and concrete parking lots and garages using commercial surface cleaning equipment with night or weekend scheduling."
```

Current benefits are solid. No change required.

Media: `imageSrc` already applied. No change.

---

#### storefronts (MODERATE -- solid, minor refinement optional)

Current description: "Make a strong first impression with a clean, professional-looking storefront."

Refined description:
```
description="Customers make a judgment about your business before they walk through the door. We clean storefront glass, metal, painted surfaces, and entry areas to keep your first impression sharp and consistent."
```

Current benefits are solid. No change required.

Media: `imageSrc` already applied. No change.

---

#### graffiti-removal (PLACEHOLDER -- needs full replacement)

Replace description and add benefits:

```
description="Graffiti left on your building invites more. We respond quickly to remove spray paint, marker, and tagging from brick, concrete, metal, and painted surfaces before the stain sets and becomes permanent."
```

```
benefits={[
  "Fast response to limit stain penetration time",
  "Works on brick, concrete, metal & painted surfaces",
  "Graffiti-specific agents that protect the substrate",
  "Surface restoration after removal where needed",
  "Discreet service to minimize public attention",
  "Licensed & insured professionals"
]}
```

Media: `benefitsAside="contactForm"` already applied. Keep as-is.

---

#### dumpster-pads (PARTIAL -- audit then apply)

If description is thin, replace with:

```
description="Dumpster enclosures and concrete pads accumulate grease, food waste, and biological growth that create odors and health violations. We pressure wash dumpster pads with commercial-grade degreasers so the area stays compliant and sanitary."
```

If benefits are missing or generic, replace with:
```
benefits={[
  "Removes grease, food waste & biological buildup",
  "Commercial degreaser application before wash",
  "Eliminates odors at the source, not just the surface",
  "Helps maintain health and municipal compliance",
  "Recurring service programs available",
  "Licensed & insured professionals"
]}
```

Media: `benefitsAside="contactForm"` already applied. No change.

---

#### fleet-washing (PARTIAL -- audit then apply)

If description is thin, replace with:

```
description="Clean vehicles reflect a company that takes its work seriously. We wash commercial fleets including box trucks, service vehicles, trailers, and vans on a schedule that keeps your brand looking sharp between routes."
```

If benefits are missing or generic, replace with:
```
benefits={[
  "Handles box trucks, vans, trailers & service vehicles",
  "Removes road grime, diesel exhaust & bug debris",
  "Scheduled fleet programs with consistent turnaround",
  "On-site washing at your lot or facility",
  "Safe for vehicle graphics, decals & painted surfaces",
  "Licensed & insured professionals"
]}
```

Media: `benefitsAside="contactForm"` already applied. No change.

---

#### glass-mirror-cleaning (PARTIAL -- audit then apply)

If description is thin, replace with:

```
description="Glass building facades, lobby mirrors, and storefront windows require streak-free cleaning with the right squeegee technique and products. We handle commercial glass and mirror cleaning from ground level to multi-story applications."
```

If benefits are missing or generic, replace with:
```
benefits={[
  "Streak-free results on commercial glass",
  "Handles single-story to multi-story applications",
  "Safe for tempered, laminated & treated glass",
  "Removes mineral deposits, bird droppings & film buildup",
  "Lobby mirrors and interior glass included",
  "Licensed & insured professionals"
]}
```

Media: `benefitsAside="contactForm"` already applied. No change.

---

#### commercial-gutter-cleaning (PARTIAL -- audit then apply)

If description is thin, replace with:

```
description="Commercial gutter systems carry far more volume than residential gutters. Blockages cause roof ponding, fascia damage, and interior leaks. We flush and clear commercial gutters and downspouts on a schedule that prevents those problems."
```

If benefits are missing or generic, replace with:
```
benefits={[
  "Clears blockages from commercial gutter runs",
  "Flushes downspouts and confirms drainage flow",
  "Prevents roof ponding and fascia deterioration",
  "Available as standalone or with building wash",
  "Documentation of service available on request",
  "Licensed & insured professionals"
]}
```

Media: `benefitsAside="contactForm"` already applied. No change.

---

#### rooftop-skylight-cleaning (PARTIAL -- audit then apply)

If description is thin, replace with:

```
description="Rooftop HVAC equipment pads, mechanical areas, and skylights collect debris, bird droppings, and algae that reduce light transmission and create maintenance headaches. We clean these areas safely without damaging mechanical components."
```

If benefits are missing or generic, replace with:
```
benefits={[
  "Safe cleaning around rooftop HVAC units and curbs",
  "Restores skylight and glazing light transmission",
  "Removes bird droppings, algae & debris buildup",
  "Low-pressure method for fragile skylight frames",
  "Coordination with facility maintenance teams",
  "Licensed & insured professionals"
]}
```

Media: `benefitsAside="contactForm"` already applied. No change.

---

### 4D. Commercial Pages -- Copy Direction (Non-Nav Pages)

These 8 pages exist at routable URLs but are not linked in the main navigation. They still need real copy.

---

#### apartment-complexes (PLACEHOLDER -- full replacement)

```
description="Apartment communities have high-visibility common areas that residents judge daily. We pressure wash breezeways, pool decks, dumpster enclosures, parking areas, and building exteriors for multi-family properties across Metro Atlanta."
```

```
benefits={[
  "Handles multi-building and campus-wide properties",
  "Cleans breezeways, pool decks & common areas",
  "Dumpster pad and enclosure degreasing included",
  "Removes mold, atmospheric staining & tire marks",
  "Maintenance programs with recurring scheduling",
  "Licensed, bonded & insured"
]}
```

Media: Assign `benefitsAside="contactForm"` (no current image asset; contactForm is the right default until a commercial property image is available).

---

#### awning-cleaning (PLACEHOLDER -- full replacement)

```
description="Fabric, vinyl, and metal awnings collect mold, bird droppings, and environmental film quickly. We clean commercial awnings with low-pressure methods that remove buildup without damaging the material or pulling stitching."
```

```
benefits={[
  "Safe for fabric, vinyl & metal awning types",
  "Removes mold, mildew & bird droppings",
  "Restores color without fading from high pressure",
  "Extends awning lifespan with proper cleaning",
  "Quick service to minimize business disruption",
  "Licensed & insured professionals"
]}
```

Media: Assign `benefitsAside="contactForm"`.

---

#### gas-stations (PLACEHOLDER -- full replacement)

```
description="Gas station forecourts, canopies, and fuel islands take a daily beating from fuel spills, tire marks, and foot traffic. We clean the full site from pump island to building exterior so your location meets brand standards and stays safe for customers."
```

```
benefits={[
  "Fuel spill and grease removal from forecourt concrete",
  "Canopy underside and overhead structure cleaning",
  "Rubber mark removal from pump lane surfaces",
  "Reduces slip hazard from organic buildup",
  "Night or early morning scheduling available",
  "Licensed & insured for commercial fuel sites"
]}
```

Media: Assign `benefitsAside="contactForm"`.

---

#### government-complexes (PLACEHOLDER -- full replacement)

```
description="Government buildings and municipal facilities require thorough, dependable cleaning on a schedule. We service courthouses, civic centers, public parking areas, and government-owned buildings with consistent results and documentation available on request."
```

```
benefits={[
  "Experience with municipal and civic property types",
  "Parking lots, walkways & building exteriors covered",
  "Scheduled maintenance programs with service records",
  "Fully licensed, bonded & insured",
  "Reliable crew with consistent on-time scheduling",
  "Documentation available for compliance review"
]}
```

Media: Assign `benefitsAside="contactForm"`.

---

#### hoa-services (PLACEHOLDER -- full replacement)

```
description="HOA boards are responsible for the appearance standards their community expects. We clean entry monuments, sidewalks, pool decks, fences, and common area surfaces on a schedule that aligns with your HOA maintenance calendar."
```

```
benefits={[
  "Entry monument, signage & common area cleaning",
  "Pool deck, fence & sidewalk restoration",
  "Recurring maintenance programs for HOA budgets",
  "Safe for landscaping and residential surroundings",
  "Flexible scheduling around community events",
  "Licensed & insured with a consistent crew"
]}
```

Media: Assign `benefitsAside="contactForm"`.

---

#### hotels-hospitality (PLACEHOLDER -- full replacement)

```
description="Hotel guests form an impression of your property before they reach the front desk. We clean building exteriors, entry drives, pool decks, porte-cocheres, and loading areas so every arrival looks like a property that cares."
```

```
benefits={[
  "Building facade and exterior surface washing",
  "Pool deck, patio & terrace restoration",
  "Entry drive and parking area cleaning",
  "Removes staining from high-traffic entry surfaces",
  "Early morning scheduling to avoid guest impact",
  "Licensed & insured for hospitality properties"
]}
```

Media: Assign `benefitsAside="contactForm"`.

---

#### office-buildings (PLACEHOLDER -- full replacement)

```
description="Your building exterior communicates as much about your business as your lobby does. We pressure wash office building facades, parking structures, entryways, and dumpster areas so your property reflects the quality of the tenants inside."
```

```
benefits={[
  "Removes environmental staining from building facades",
  "Parking garage and structure surface cleaning",
  "Entryway, plaza & lobby exterior restoration",
  "Safe for glass, brick, metal & stucco cladding",
  "Night and weekend scheduling available",
  "Licensed & insured for commercial properties"
]}
```

Media: Assign `benefitsAside="contactForm"`.

---

#### parking-decks (PLACEHOLDER -- full replacement)

```
description="Parking structures collect oil, tire rubber, bird droppings, and concrete dust faster than any flat lot. We pressure wash decks, ramps, stairwells, and drive surfaces to improve safety and appearance without shutting down access."
```

```
benefits={[
  "Removes oil, grease & tire marks from deck surfaces",
  "Cleans ramps, stairwells & structural columns",
  "Improves lane marking visibility after cleaning",
  "Reduces slip hazard from organic growth",
  "Night and off-peak scheduling to maintain access",
  "Commercial-grade surface washing equipment"
]}
```

Media: Assign `benefitsAside="contactForm"`.

---

## 5. Resolved TODO Items

All 8 TODO strings live in `data/service-areas.ts` (lines 165-172) inside the `createServiceAreaContent()` factory. They are placeholder string values on the `ServiceAreaPageContent` interface and are not rendered in the current `ServiceAreaPageTemplate`. However, they document outstanding work that needs to be completed before city pages are production-ready.

### TODO: `heroImagePlaceholder` (line 165)
**Item:** Replace with finalized city hero asset.

**Resolution path:** For each of the 16 city pages (Atlanta through Tucker), source or commission a hero image of a recognizable neighborhood, street, or commercial area in that city. Store images under `public/service-areas/{city-slug}/hero.jpg`. Update `ServiceAreaPageTemplate` to accept an optional `heroImageSrc` prop and render it in the hero section. Until images are available, the dark gradient hero used by `ServicePageTemplate` is an acceptable fallback.

### TODO: `cityMapPlaceholder` (line 166)
**Item:** Replace with finalized city coverage map or static map image.

**Resolution path:** Source a static map screenshot or commission a vector map showing service coverage radius for each city. Alternatively, embed a Google Maps static API tile (requires API key). Store under `public/service-areas/{city-slug}/map.png`. The `ServiceAreaPageTemplate` should render this in a "Coverage Area" section below the trust points.

### TODO: `beforeAfterGalleryPlaceholder` (line 167)
**Item:** Replace with city-specific before/after gallery assets.

**Resolution path:** The repo already has 12 before/after pairs under `public/gallery/wix-before-after/`. Tag each pair with the city where the job was performed. Create a city-to-pairs mapping in `data/gallery.ts` or a new `data/city-gallery.ts` file. The `ServiceAreaPageTemplate` can then render a filtered `BeforeAfterSlider` or gallery grid using the city-matched pairs. Until tagged, continue using the general gallery assets on all city pages.

### TODO: `cityServiceProofPlaceholder` (line 168)
**Item:** Add city-specific review/testimonial proof points.

**Resolution path:** The 6 real testimonials in `Testimonials.tsx` are all from Atlanta, GA. As city-specific jobs are completed, collect reviews attributed to the specific city. Create a `data/city-testimonials.ts` structure that maps city slugs to 1-3 testimonials. The `ServiceAreaPageTemplate` can render a simplified 1-2 card testimonial block for each city page. Until city-specific reviews exist, surface the best 2 general reviews with "Atlanta Metro" as the location.

### TODO: `leadFormPlaceholder` (line 169)
**Item:** Connect contact form to database-backed submission flow.

**Resolution path:** The `ContactQuoteForm`, `Hero` form, and `ContactQuoteFormCard` all use a `handleSubmit` that logs to console and simulates a 1200ms delay. No actual submission occurs. This needs a backend endpoint or third-party form provider. Options:
- Vercel Postgres or Neon: store submissions in a `leads` table, POST to an API route
- Formspree or Resend: no-code/low-code alternative requiring only an API key
- This is a separate implementation task. Priority: resolve before launching paid traffic.

### TODO: `trackingPlaceholder` (line 170)
**Item:** Add analytics/UTM tracking strategy for city page CTAs.

**Resolution path:** City pages should append UTM parameters to quote form submissions (`utm_source=city-page&utm_medium=organic&utm_campaign={city-slug}`). Additionally, fire a custom `lead_form_submit` event to Google Analytics 4 or Vercel Analytics on form submission. The `ctaInteraction.ts` file already handles press animation; add the tracking call alongside it. This is a separate implementation task.

### TODO: `serviceAvailabilityPlaceholder` (line 171)
**Item:** Define city scheduling windows and response-time details.

**Resolution path:** Add a `serviceAvailability` field to `ServiceAreaPageContent` with real copy per city (e.g., "We typically serve Alpharetta on Tuesdays and Thursdays. Same-week appointments available."). This information comes from the owner. Once defined, render it in the city page near the quote CTA. Until then, use a generic "Same-week appointments available in most cases" fallback.

### TODO: `lastUpdatedPlaceholder` (line 172)
**Item:** Add content revision timestamp policy.

**Resolution path:** Add a `lastUpdated` ISO date string to each city entry in `CITY_DEFINITIONS`. Render it as a small footer note on the city page ("Content reviewed April 2026"). Establish a policy: review and update city page content every 6 months or after any major service offering change. This is a low-priority housekeeping item.

---

## 6. Template Enhancement Needed (Phase 2)

The `ServicePageTemplate` has two hardcoded sections that are identical across all 33 leaf pages. These cannot be customized without template changes:

### 6A. Process Section (lines 224-239 in ServicePageTemplate.tsx)
Hardcoded to 4 steps: "Contact Us / Reach out for a free quote", "Assessment / We evaluate your needs", "Service / Professional cleaning", "Satisfaction / Guaranteed results".

**Recommended enhancement:** Add an optional `processSteps?: Array<{ step: string; title: string; desc: string }>` prop. When omitted, fall through to the current defaults. This lets each page tell a more specific story (e.g., graffiti removal shows "Assess Damage / Identify paint type and substrate" as step 1).

### 6B. CTA Section (lines 245-274 in ServicePageTemplate.tsx)
Hardcoded to "Ready to Transform Your Property?" headline and "Get your free quote today and experience the Pressure Washing Xperts difference." subline.

**Recommended enhancement:** Add optional `ctaHeadline?: string` and `ctaSubline?: string` props. When omitted, use current defaults. This allows surface-specific calls to action (e.g., roof soft washing: "Protect your shingles before the next rainy season.").

These are Phase 2 items. Do not block Phase 1 (copy population) on these changes.

---

## 7. Shared Components Notes

### Existing shared components to reuse (do not recreate):
- `ServicePageTemplate` -- already the single template for all leaf pages; extend with Phase 2 props, do not fork
- `BeforeAfterSlider` -- already works; reuse for all pages with before/after media pairs
- `ContactQuoteFormCard` -- already embedded via `benefitsAside="contactForm"`; no changes needed for copy work
- `data/residential-service-media.ts` -- central media config for residential pages; add new entries here rather than inline in page files

### Data file to expand (`data/residential-service-media.ts`):
Currently only contains residential media. When commercial service images become available, create `data/commercial-service-media.ts` using the same pattern. Do not inline image paths directly in page files.

### Do not create new shared components for this phase:
The copy work is entirely contained in props passed to `ServicePageTemplate`. No new components are needed for Phase 1. Phase 2 enhancements (process steps, FAQ) will introduce a `ServiceFAQ` component and updated template props, but that is a separate plan.

---

## 8. Recommended Implementation Order

Work in this sequence. Each group can be executed in a single auto-mode session.

### Group 1: Full Placeholder Commercial Pages (highest urgency, most visible gaps)
These pages render the default generic template benefits and have no media. They are the worst-performing pages.

1. `graffiti-removal` -- add description + benefits (benefitsAside already set)
2. `apartment-complexes` -- add description + benefits + `benefitsAside="contactForm"`
3. `awning-cleaning` -- add description + benefits + `benefitsAside="contactForm"`
4. `gas-stations` -- add description + benefits + `benefitsAside="contactForm"`
5. `government-complexes` -- add description + benefits + `benefitsAside="contactForm"`
6. `hoa-services` -- add description + benefits + `benefitsAside="contactForm"`
7. `hotels-hospitality` -- add description + benefits + `benefitsAside="contactForm"`
8. `office-buildings` -- add description + benefits + `benefitsAside="contactForm"`
9. `parking-decks` -- add description + benefits + `benefitsAside="contactForm"`

### Group 2: Partial In-Nav Commercial Pages (second priority, in main navigation)
These are linked from the nav header so they receive traffic.

10. `dumpster-pads` -- audit + update description and benefits if thin
11. `fleet-washing` -- audit + update description and benefits if thin
12. `glass-mirror-cleaning` -- audit + update description and benefits if thin
13. `commercial-gutter-cleaning` -- audit + update description and benefits if thin
14. `rooftop-skylight-cleaning` -- audit + update description and benefits if thin

### Group 3: MODERATE Commercial Pages (refinement pass)

15. `building-washing` -- refine description to be more specific
16. `parking-lots-garages` -- refine description to be more specific
17. `storefronts` -- refine description to be more specific

### Group 4: Partial Residential Pages (audit and update)

18. `decks-fences` -- audit + apply direction from section 4B
19. `driveways-sidewalks` -- audit + apply direction from section 4B
20. `brick-stone-masonry` -- audit + apply direction from section 4B
21. `gutters` -- audit + apply direction from section 4B
22. `curbing` -- audit + apply direction from section 4B
23. `indoor-air` -- audit + apply direction from section 4B
24. `odor-removal` -- audit + apply direction from section 4B
25. `residential-properties` -- audit + apply direction from section 4B
26. `stain-cleaning` -- audit + apply direction from section 4B
27. `tile-and-grout-cleaning` -- audit + apply direction from section 4B
28. `upholstery-cleaning` -- audit + apply direction from section 4B

### Group 5: MODERATE Residential Pages (optional refinement)

29. `house-washing` -- optional description refinement
30. `carpet-cleaning` -- no change needed, already solid
31. `roof-soft-washing` -- optional benefits sharpening

### Group 6: Template Enhancements (Phase 2, separate session)

32. Add `processSteps` prop to `ServicePageTemplate`
33. Add `ctaHeadline` / `ctaSubline` props to `ServicePageTemplate`
34. Add per-service process steps to each page file

### Group 7: City Page TODOs (Phase 3, separate session)

35. Connect contact form to real backend submission endpoint
36. Add UTM and analytics tracking to form submissions
37. Source or commission city hero images
38. Add city-specific testimonials as they become available
39. Define city scheduling windows per owner guidance
40. Add `lastUpdated` timestamp to city page data

---

## 9. Completion Checklist

Check off each page as copy work is confirmed complete (description, benefits, and media all correct).

### Residential Leaf Pages
- [x] `house-washing` -- description refined, benefits confirmed, media: imageSrc
- [x] `decks-fences` -- description confirmed, benefits confirmed, media: splitImages
- [x] `driveways-sidewalks` -- description confirmed, benefits confirmed, media: splitImages
- [x] `roof-soft-washing` -- description confirmed, benefits sharpened, media: contactForm aside
- [x] `brick-stone-masonry` -- description confirmed, benefits confirmed, media: before/after
- [x] `gutters` -- description confirmed, benefits confirmed, media: before/after
- [x] `curbing` -- description confirmed, benefits confirmed, media: before/after
- [x] `carpet-cleaning` -- description confirmed, benefits confirmed, media: contactForm aside
- [x] `indoor-air` -- description replaced, benefits added, media: contactForm aside
- [x] `odor-removal` -- description replaced, benefits added, media: contactForm aside
- [x] `residential-properties` -- description replaced, benefits added, media: contactForm aside
- [x] `stain-cleaning` -- description replaced, benefits added, media: contactForm aside
- [x] `tile-and-grout-cleaning` -- description replaced, benefits added, media: contactForm aside
- [x] `upholstery-cleaning` -- description replaced, benefits added, media: contactForm aside

### Commercial Leaf Pages (In Nav)
- [x] `building-washing` -- description refined, benefits confirmed, media: imageSrc
- [x] `parking-lots-garages` -- description refined, benefits confirmed, media: imageSrc
- [x] `storefronts` -- description refined, benefits confirmed, media: imageSrc
- [x] `graffiti-removal` -- description replaced, benefits added, media: contactForm aside
- [x] `dumpster-pads` -- description confirmed/replaced, benefits confirmed/added, media: contactForm aside
- [x] `fleet-washing` -- description confirmed/replaced, benefits confirmed/added, media: contactForm aside
- [x] `glass-mirror-cleaning` -- description confirmed/replaced, benefits confirmed/added, media: contactForm aside
- [x] `commercial-gutter-cleaning` -- description confirmed/replaced, benefits confirmed/added, media: contactForm aside
- [x] `rooftop-skylight-cleaning` -- description confirmed/replaced, benefits confirmed/added, media: contactForm aside

### Commercial Leaf Pages (Non-Nav)
- [x] `apartment-complexes` -- description replaced, benefits added, benefitsAside added
- [x] `awning-cleaning` -- description replaced, benefits added, benefitsAside added
- [x] `gas-stations` -- description replaced, benefits added, benefitsAside added
- [x] `government-complexes` -- description replaced, benefits added, benefitsAside added
- [x] `hoa-services` -- description replaced, benefits added, benefitsAside added
- [x] `hotels-hospitality` -- description replaced, benefits added, benefitsAside added
- [x] `office-buildings` -- description replaced, benefits added, benefitsAside added
- [x] `parking-decks` -- description replaced, benefits added, benefitsAside added

### Hub Pages
- [x] `residential` hub -- description and service list confirmed
- [x] `commercial` hub -- description and service list confirmed

### Template Enhancements (Phase 2)
- [x] `ServicePageTemplate` -- `processSteps` prop added and wired
- [x] `ServicePageTemplate` -- `ctaHeadline` / `ctaSubline` props added and wired
- [x] Per-page process steps written and applied to all leaf pages

### City Page TODOs (Phase 3)
- [x] Contact form connected to real submission backend
- [x] UTM and analytics tracking on form submits
- [x] City hero images sourced and applied (16 cities) -- each city uses `heroImageSrc` / `heroImageAlt` from existing `public/gallery/wix-before-after` assets in `data/service-areas.ts` until city-specific photos ship. Service leaf pages keep the gradient hero plus benefits-column media per `ServicePageTemplate` (no separate photo hero).
- [x] City-specific testimonials added as available
- [x] City scheduling windows defined and added to data
- [x] `lastUpdated` timestamp policy and dates added to city data
- [x] City before/after gallery assets tagged and mapped by city

---

*Plan created: April 2026. Do not implement until confirmed.*
