/**
 * Display name per service route. Drives the title tag, H1, meta description, and the
 * "hardest-working pressure washer" intro sentence on every service page.
 */
export const SERVICE_NAMES = {
  "/roof-cleaning": "Roof Cleaning",
  "/power-washing": "Power Washing",
  "/soft-washing": "Soft Washing",

  "/services/residential": "Residential Pressure Washing Services",
  "/services/residential/house-washing": "House Washing",
  "/services/residential/decks-fences": "Deck and Fence Cleaning",
  "/services/residential/driveways-sidewalks": "Driveway Cleaning",
  "/services/residential/roof-soft-washing": "Roof Soft Washing",
  "/services/residential/brick-stone-masonry": "Brick and Stone Cleaning",
  "/services/residential/gutters": "Gutter Cleaning",
  "/services/residential/curbing": "Curb Cleaning",
  "/services/residential/carpet-cleaning": "Carpet Cleaning",
  "/services/residential/indoor-air": "Air Duct and Vent Cleaning",
  "/services/residential/odor-removal": "Odor Removal",
  "/services/residential/residential-properties": "Whole-Home Exterior Cleaning",
  "/services/residential/stain-cleaning": "Concrete Stain Removal",
  "/services/residential/tile-and-grout-cleaning": "Tile and Grout Cleaning",
  "/services/residential/upholstery-cleaning": "Upholstery Cleaning",
  "/services/residential/red-clay-removal": "Red Clay Removal",
  "/services/residential/post-construction-cleanup": "Post-Construction Cleanup",
  "/services/residential/rv-cleaning": "RV Cleaning",
  "/services/residential/tiny-house-cleaning": "Tiny House Cleaning",
  "/services/residential/window-cleaning": "Window Cleaning",
  "/services/residential/pool-deck-screen-enclosure-cleaning": "Pool Deck and Screen Enclosure Cleaning",
  "/services/residential/solar-panel-cleaning": "Solar Panel Cleaning",
  "/services/residential/4-wheelers-cleaning": "ATV and 4-Wheeler Washing",

  "/services/commercial": "Commercial Pressure Washing Services",
  "/services/commercial/truck-washing": "Commercial Truck Washing",
  "/services/commercial/building-washing": "Commercial Building Washing",
  "/services/commercial/parking-lots-garages": "Parking Lot and Garage Cleaning",
  "/services/commercial/storefronts": "Storefront Washing",
  "/services/commercial/graffiti-removal": "Graffiti Removal",
  "/services/commercial/dumpster-pads": "Dumpster Pad Cleaning",
  "/services/commercial/fleet-washing": "Fleet Washing",
  "/services/commercial/glass-mirror-cleaning": "Commercial Glass and Mirror Cleaning",
  "/services/commercial/rooftop-skylight-cleaning": "Rooftop and Skylight Cleaning",
  "/services/commercial/commercial-gutter-cleaning": "Commercial Gutter Cleaning",
  "/services/commercial/apartment-complexes": "Apartment Complex Pressure Washing",
  "/services/commercial/office-buildings": "Office Building Washing",
  "/services/commercial/government-complexes": "Government Building Washing",
  "/services/commercial/hotels-hospitality": "Hotel Exterior Cleaning",
  "/services/commercial/gas-stations": "Gas Station Pressure Washing",
  "/services/commercial/awning-cleaning": "Awning Cleaning",
  "/services/commercial/parking-decks": "Parking Deck Washing",
  "/services/commercial/hoa-services": "HOA Pressure Washing",
  "/services/commercial/red-clay-removal": "Commercial Red Clay Removal",
  "/services/commercial/post-construction-cleanup": "Commercial Post-Construction Cleanup",
} as const satisfies Record<string, string>

export type ServicePath = keyof typeof SERVICE_NAMES

/** Lowercases a service name for mid-sentence use, keeping acronyms like RV, HOA, ATV. */
export function serviceNameInline(name: string): string {
  return name
    .split(" ")
    .map((word) => (/^[A-Z0-9]{2,}$/.test(word) ? word : word.toLowerCase()))
    .join(" ")
}

export function serviceSeoTitle(name: string): string {
  return `${name} in Ellenwood, GA | Hardest-Working Pressure Washer`
}

export function serviceSeoDescription(name: string): string {
  return `Need ${serviceNameInline(name)} in Ellenwood, GA? Pressure Washing Xperts is the hardest-working pressure washer in Ellenwood, GA. See how we do it.`
}
