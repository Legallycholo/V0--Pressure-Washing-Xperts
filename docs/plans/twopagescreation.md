# Two New Service Pages: RV Cleaning & Tiny House Cleaning

## 0. Decisions locked in

- **Placement**: New leaf pages under `/services/residential/`, matching the pattern used for every recently-added service (red-clay-removal, post-construction-cleanup). URLs:
  - `/services/residential/rv-cleaning`
  - `/services/residential/tiny-house-cleaning`
- **Scope**: Exterior wash **+ interior cleaning** for both services (broader than most existing pages, which are exterior-only). Copy, benefits, and process steps reflect both halves of the job.
- **Before/after hero image**: Stays **exterior** for both pages. Every before/after pair on the site today is an outdoor shot, and the realism cues the user wants (matching clouds, sun angle, a photographer's shadow) only make sense outdoors. Interior work is sold through the benefits list and process steps, not the comparison slider.
- **Business context baked into copy**: Ellenwood, GA / Metro Atlanta service area, soft-wash-first brand voice, phone (800) 451-7213.

## 1. Reference pattern (from `post-construction-cleanup`)

Every leaf service page is four coordinated pieces:

1. `app/services/residential/<slug>/page.tsx` — client page using `ServicePageTemplate`, pulls process copy from `getServiceLeafCopy(slug)` and media from `data/residential-service-media.ts`.
2. `app/services/residential/<slug>/layout.tsx` — one-liner using `marketingRouteExports("/services/residential/<slug>")` for metadata + JSON-LD.
3. `data/service-leaf-meta.ts` — adds a `SERVICE_LEAF_COPY[slug]` entry (4 process steps + CTA headline/subline).
4. `data/residential-service-media.ts` — adds a `residential<Name>Media` export with `beforeSrc`/`afterSrc`/`beforeAlt`/`afterAlt`/`comparisonLabel`.

Two more files register the page site-wide:

5. `data/navigation.ts` — add to `residentialServices[]` (drives header mega-menu, footer, and the `/services/residential` hub grid).
6. `data/marketing-route-seo.ts` — add a `manualResidential` entry (title tag, meta description, breadcrumbs, `Service` JSON-LD). This also makes the page appear in `app/sitemap.ts` automatically (it iterates `MARKETING_ROUTE_SEO`).

No other file needs manual edits — sitemap, hub page, and nav are all data-driven off these two files.

## 2. New files to create

- `app/services/residential/rv-cleaning/page.tsx`
- `app/services/residential/rv-cleaning/layout.tsx`
- `app/services/residential/tiny-house-cleaning/page.tsx`
- `app/services/residential/tiny-house-cleaning/layout.tsx`

## 3. Files to edit

- `data/service-leaf-meta.ts` — add `rv-cleaning` and `tiny-house-cleaning` entries.
- `data/residential-service-media.ts` — add `residentialRvCleaningMedia` and `residentialTinyHouseCleaningMedia` (image paths under `/residential-services/`).
- `data/navigation.ts` — add both to `residentialServices[]`.
- `data/marketing-route-seo.ts` — add both to `manualResidential`.

## 4. Image assets (to be dropped in manually after generation)

Path convention matches existing pairs (`public/residential-services/<slug>-before.png` / `-after.png`):

- `public/residential-services/rv-cleaning-before.png`
- `public/residential-services/rv-cleaning-after.png`
- `public/residential-services/tiny-house-cleaning-before.png`
- `public/residential-services/tiny-house-cleaning-after.png`

**Format**: PNG, landscape, ~16:9 (existing pairs run 1600–1950px wide at ~1.6–1.77 aspect ratio — target something in that range, e.g. 1600×900 or 1536×864). The comparison slider (`BeforeAfterSlider`) renders both images in a fixed `aspect-video` box with `object-cover`, so exact pixel size isn't critical as long as the aspect ratio is close and the main subject is centered.

**Prompts**: Claude will provide all 4 image-generation prompts in chat (not in this file) — one before/after pair per page, for you to run through ChatGPT/Gemini/whatever image model you prefer. Once generated, hand the 4 files back and Claude will place them at the paths above and wire up the alt text.

**Current state**: The 4 paths above currently hold **clearly-labeled 1600×900 placeholder PNGs** ("PLACEHOLDER — replace with generated photo") so the pages render complete and the layout is reviewable. Without them the comparison slider stays hidden behind a dark box, because `BeforeAfterSlider` only fades the pair in once both images fire `onLoad`. **These must be overwritten with the real generated photos before this ships to production.**

## 5. Draft page copy

### RV Cleaning — `/services/residential/rv-cleaning`

- **Title (H1)**: "RV Cleaning Near Me in Ellenwood & Atlanta, GA"
- **Hero description**: "Road film, oxidized fiberglass, and black streaks age the outside; dust, pet hair, and travel grime build up inside. We soft wash the exterior and detail the cabin so your RV is camp-ready inside and out. Serving Ellenwood, GA and Metro Atlanta."
- **Benefits**:
  - Exterior soft wash safe for decals, graphics & fiberglass
  - Interior cabin cleaning: floors, surfaces & upholstery
  - Roof, awning & undercarriage rinse included
- **Process steps**:
  1. Walk the rig with you — We note decals, slide-outs, awnings, and which interior areas need attention.
  2. Wash exterior top to bottom — Roof, siding, and awning get pressure matched to fiberglass, aluminum, and graphics.
  3. Detail the cabin — Floors, counters, and upholstery are wiped down, vacuumed, and refreshed.
  4. Final walkthrough — You check inside and out before we pack up.
- **CTA headline / subline**: "Get your RV road-ready, inside and out." / "Book a wash and cabin refresh before your next trip or before storage."
- **Nav summary** (mega-menu / hub card): "Exterior soft wash plus interior cabin cleaning for RVs and campers — roofs, awnings, floors, and upholstery refreshed before your next trip."
- **Meta description**: "Professional RV cleaning near you in Ellenwood, GA and Metro Atlanta. Exterior soft wash for roofs, siding, and awnings plus interior cabin cleaning for floors, surfaces, and upholstery. Call (800) 451-7213 for a free quote."
- **Service JSON-LD**: name "RV cleaning in Ellenwood, GA"; description "Exterior soft wash and interior cabin cleaning for RVs and campers across Ellenwood, GA and Metro Atlanta, covering roofs, awnings, siding, floors, and upholstery."
- **Before/after alt text**: before — "Travel trailer RV in a Georgia driveway with black streaking, oxidized fiberglass, and road grime on the exterior"; after — "Same RV with exterior washed clean, black streaks and road grime removed"; comparisonLabel — "RV exterior cleaning"

### Tiny House Cleaning — `/services/residential/tiny-house-cleaning`

- **Title (H1)**: "Tiny House Cleaning Near Me in Ellenwood & Atlanta, GA"
- **Hero description**: "Georgia pollen and humidity build up fast outside; a small footprint means every surface inside shows dust and grime quickly too. We soft wash the exterior and clean the interior top to bottom so your tiny home feels as sharp as it's built. Serving Ellenwood, GA and Metro Atlanta."
- **Benefits**:
  - Exterior soft wash safe for wood, metal & composite siding
  - Interior deep clean: floors, surfaces & windows
  - Trailer frame & skirting rinse on wheeled units
- **Process steps**:
  1. Review the whole home — We note siding type, trim, and which interior rooms need the most attention.
  2. Wash exterior roof to base — Pollen film, mildew, and algae lift without forcing water behind panels.
  3. Clean the interior — Floors, counters, windows, and fixtures get detailed in every compact room.
  4. Final walkthrough — You check every side and every room before we leave.
- **CTA headline / subline**: "Keep your tiny home looking as sharp as it's built." / "Ask about seasonal visits to stay ahead of Georgia pollen, humidity, and everyday dust."
- **Nav summary**: "Exterior soft wash plus interior deep cleaning for tiny homes — siding, roofing, skirting, floors, and fixtures refreshed room by room."
- **Meta description**: "Professional tiny house cleaning near you in Ellenwood, GA and Metro Atlanta. Exterior soft wash for siding and roofing plus interior deep cleaning for floors, surfaces, and windows. Call (800) 451-7213 for a free quote."
- **Service JSON-LD**: name "Tiny house cleaning in Ellenwood, GA"; description "Exterior soft wash and interior deep cleaning for tiny homes across Ellenwood, GA and Metro Atlanta, covering siding, roofing, skirting, floors, and fixtures."
- **Before/after alt text**: before — "Small Georgia tiny home on a wooded lot with pollen film, mildew streaking, and dirt on the siding and skirting"; after — "Same tiny home with siding, roofing, and skirting clean after exterior soft washing"; comparisonLabel — "tiny house exterior cleaning"

`contentRevised`: set both pages to `"July 2026"` (matches recent pages' convention of stamping the month work landed).

## 6. Build steps (steps 1–7 complete; step 8 pending your images)

1. Add `rv-cleaning` and `tiny-house-cleaning` entries to `SERVICE_LEAF_COPY` in `data/service-leaf-meta.ts`.
2. Add `residentialRvCleaningMedia` and `residentialTinyHouseCleaningMedia` to `data/residential-service-media.ts` (image paths only — files land in step 8).
3. Create the 2 page/layout file pairs under `app/services/residential/`.
4. Add both services to `residentialServices` in `data/navigation.ts`.
5. Add both to `manualResidential` in `data/marketing-route-seo.ts`.
6. Run `pnpm build` (or `pnpm lint` + `pnpm dev`) to confirm the new routes compile, appear on `/services/residential`, in the header mega-menu, footer, and `/sitemap.xml`, with no missing-image runtime errors (Next.js `Image` will 404 gracefully in dev but should be fixed before shipping).
7. Manually visit both new pages in a browser to confirm layout matches existing service pages, before/after slider drag works, and CTA buttons open the quote form / dial the phone number correctly.
8. Once you generate the 4 images and send them back, drop them into `public/residential-services/` at the paths in Section 4, verify aspect ratio/crop looks right in the slider, and commit.

## 7. Open follow-ups (not blocking, flag if you want them addressed later)

- Should RV cleaning and Tiny house cleaning also get **commercial** counterparts (e.g., RV dealership lots, tiny-home rental communities)? Not in scope for this pass — can add later following the same `manualCommercial` pattern.
- No dedicated `/gallery` before/after entries are being added for these two services in this pass; can be added by pulling the same image pair into `data/gallery.ts` if you want them in the general gallery too.
