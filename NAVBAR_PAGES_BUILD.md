# Navbar Pages Implementation Plan

This document outlines the step-by-step strategy to resolve all 8 missing or broken pages identified in the recent service page audit. 

## 1. Approach Decision for Each ❌ Page

| Section | Page Name | Target Route | Strategy | Details |
|---|---|---|---|---|
| Commercial | Commercial Building Washing | `/services/commercial/building-washing` | **Strategy A** | Rename folder `commercial-buildings` → `building-washing` |
| Commercial | Parking Lots & Garages | `/services/commercial/parking-lots-garages` | **Strategy B** | Create new page |
| Commercial | Storefronts | `/services/commercial/storefronts` | **Strategy B** | Create new page |
| Commercial | Dumpster Pads | `/services/commercial/dumpster-pads` | **Strategy B** | Create new page |
| Commercial | Fleet Washing | `/services/commercial/fleet-washing` | **Strategy A** | Rename folder `fleet-wash` → `fleet-washing` |
| Industrial | Industrial Equipment Washing | `/services/industrial/equipment-washing` | **Strategy A** | Rename folder `warehouses` → `equipment-washing` |
| Industrial | Warehouse Exteriors | `/services/industrial/warehouse-exteriors` | **Strategy B** | Create new page |
| Service Areas | Service Areas (main) | `/service-areas` | **Strategy B** | Create new page |

---

## 2. Full File List

### Rename Operations (Strategy A)
- **Rename:** `app/services/commercial/commercial-buildings/page.tsx` → `app/services/commercial/building-washing/page.tsx`
- **Rename:** `app/services/commercial/fleet-wash/page.tsx` → `app/services/commercial/fleet-washing/page.tsx`
- **Rename:** `app/services/industrial/warehouses/page.tsx` → `app/services/industrial/equipment-washing/page.tsx`

### New Files Created (Strategy B)
- **New File:** `app/services/commercial/parking-lots-garages/page.tsx` (Page Component)
- **New File:** `app/services/commercial/storefronts/page.tsx` (Page Component)
- **New File:** `app/services/commercial/dumpster-pads/page.tsx` (Page Component)
- **New File:** `app/services/industrial/warehouse-exteriors/page.tsx` (Page Component)
- **New File:** `app/service-areas/page.tsx` (Page Component)

---

## 3. Page Structure for All New Pages

For every new service page being built, the following standard template structure will be used to maintain consistency with existing residential service pages.

**[1] HERO SECTION**
- Dark navy gradient background
- H1: Page title
- Subtitle: 1–2 sentence description
- Two CTA buttons: `[Get a Free Quote]` and `[Call/Text: (800)-451-7213]`

**[2] WHY CHOOSE US**
- H2: "Why Choose Our [Service Name] Service?"
- 5–7 bullet points with circular checkmark icons (reusing existing icon components/styles)
- Right column: Reused mascot image asset

**[3] HOW IT WORKS / WHAT WE CLEAN**
- H2 relevant to the service
- Short informative paragraph
- 2–3 feature highlight cards matching the existing modular card style

**[4] CTA BANNER**
- Full-width banner: "Ready to Get Started?"
- `[Get a Free Quote]` styled button

**[5] FOOTER**
- Importing and rendering the global `<Footer />` component

---

## 4. Content Spec Per New Page

### Commercial Building Washing (`/services/commercial/building-washing`)
*Note: This is a rename item, but content updates may be required locally to reflect the accurate title/subtitle structure.*
- **H1:** Commercial Building Washing
- **Subtitle:** Professional exterior cleaning for offices, retail centers & commercial properties across Metro Atlanta.
- **Bullets:** Removes mold, mildew & environmental staining · Safe for brick, stucco, EIFS & metal panels · Soft wash or pressure wash by surface type · Enhances tenant satisfaction & curb appeal · Licensed, bonded & insured · Flexible scheduling including nights & weekends

### Parking Lots & Garages (`/services/commercial/parking-lots-garages`)
- **H1:** Parking Lot & Garage Cleaning
- **Subtitle:** Restore the appearance and safety of your parking areas with professional pressure washing.
- **Bullets:** Removes oil, grease & tire marks · Deep cleans concrete & asphalt surfaces · Improves safety and curb appeal · Night or weekend scheduling available · Commercial-grade surface cleaning equipment · Serving Metro Atlanta businesses

### Storefronts (`/services/commercial/storefronts`)
- **H1:** Storefront Washing
- **Subtitle:** Make a strong first impression with a clean, professional-looking storefront.
- **Bullets:** Removes grime, mold & atmospheric buildup · Safe for glass, metal & painted surfaces · Soft wash method for delicate finishes · Quick turnaround to minimize business disruption · Enhances customer-facing appearance · Licensed & insured professionals

### Dumpster Pads (`/services/commercial/dumpster-pads`)
- **H1:** Dumpster Pad Cleaning
- **Subtitle:** Eliminate grease, waste buildup, and odors from your commercial dumpster area.
- **Bullets:** Removes grease, waste residue & organic buildup · Eliminates foul odors at the source · Pressure washing + commercial degreaser treatment · Helps maintain health code compliance · Scheduled maintenance plans available · Fast, discreet service

### Fleet Washing (`/services/commercial/fleet-washing`)
*Note: Rename item.*
- **H1:** Fleet Washing
- **Subtitle:** Keep your commercial vehicles clean and professional-looking with our on-site fleet washing service.
- **Bullets:** Cleans trucks, vans & commercial vehicles · On-site service at your facility · Removes road grime, chemicals & buildup · Protects paint, decals & vehicle surfaces · Flexible scheduling for fleets of any size · Available nights & weekends

### Industrial Equipment Washing (`/services/industrial/equipment-washing`)
*Note: Rename item.*
- **H1:** Industrial Equipment Washing
- **Subtitle:** Heavy-duty exterior cleaning for large machinery, equipment, and industrial assets.
- **Bullets:** Removes grease, oil & industrial residue · Safe for steel, aluminum & coated surfaces · High-pressure & hot water systems available · Helps meet safety & facility inspection standards · On-site service at your location · Licensed, bonded & insured

### Warehouse Exteriors (`/services/industrial/warehouse-exteriors`)
- **H1:** Warehouse Exterior Washing
- **Subtitle:** Professional large-scale exterior cleaning for warehouses, distribution centers, and industrial facilities.
- **Bullets:** Cleans large building facades & dock areas · Removes mold, algae & environmental staining · Safe for metal panels, concrete block & masonry · Soft wash or high-pressure by surface type · Commercial-grade equipment handles any scale · Serving Metro Atlanta industrial properties

### Service Areas (`/service-areas`)
- **H1:** Our Service Areas
- **Subtitle:** Pressure Washing Xperts proudly serves residential, commercial, and industrial properties across Metro Atlanta and surrounding communities.
- **Layout Note:** This page deviates from the service template. It features a list/grid of city/area cards followed by a CTA at the bottom. Layout parallels the structure on `prolinepressurewash.com/service-areas`.

---

## 5. Router / Config Changes
In Next.js App Router, routing is declarative based on directory trees. By carrying out the folder renames and creating the new folder paths inside the `app/` directory, Next.js handles route registration automatically. No central router config file exists or requires modification for these standard pages. Redirects from legacy/unused services URLs are not essential as they are no longer linked, but keeping it simple relies cleanly on App router directory modifications.

---

## 6. Build Order
1. **Slug Fixes (Strategy A):** Execute the 3 directory folder renames.
2. **Commercial New Pages (Strategy B):** Create `Parking Lots & Garages`, `Storefronts`, and `Dumpster Pads` applying the standard structural layout.
3. **Industrial New Page (Strategy B):** Create `Warehouse Exteriors` utilizing the standard layout.
4. **Service Areas Build (Strategy B):** Create the unique grid-based `Service Areas` directory and page.
5. **Content Tuning:** Inject the specific required headers/bullets into the 3 newly-renamed folders to ensure they match up perfectly.
6. **Final Check:** Navigate to every route from the navbar and confirm no 404s.

---

## 7. Do Not Touch List
- `components/Header.tsx` (Navbar is stable)
- `components/Footer.tsx` (Footer is stable and large/scaled properly)
- `app/globals.css`
- Any `app/services/residential/*` route or file
- `app/about/*` routing or files
- Any pre-existing ui components in `components/ui/*` contained outside the immediate page builds
- Any legacy images in `public/images/`
