import {
  getServiceAreasForNavigation,
  getTopServiceAreas,
} from "@/data/service-areas"

export interface NavLinkItem {
  href: string
  label: string
  /** One line for hub cards; surfaces and outcome focused. */
  summary?: string
}

export const residentialServices: NavLinkItem[] = [
  {
    href: "/services/residential/house-washing",
    label: "House Washing Services",
    summary:
      "Soft washing for vinyl, brick, and painted siding so mold and algae lift off without tearing trim or forcing water behind boards.",
  },
  {
    href: "/services/residential/decks-fences",
    label: "Decks and Fences",
    summary:
      "Wood, composite, and vinyl rails and boards cleaned so outdoor spaces look maintained and hold finish longer.",
  },
  {
    href: "/services/residential/driveways-sidewalks",
    label: "Driveways and Sidewalks",
    summary:
      "Flat concrete washed with surface cleaners so oil, algae, and tire marks come up evenly without streaks.",
  },
  {
    href: "/services/residential/roof-soft-washing",
    label: "Roof Soft Washing",
    summary:
      "Low-pressure treatment for shingles that kills algae and black streaks at the root without stripping granules.",
  },
  {
    href: "/services/residential/brick-stone-masonry",
    label: "Brick, Stone & Masonry",
    summary:
      "Patios, walks, and walls cleaned with pressure matched to stone and mortar so color returns without acid damage.",
  },
  {
    href: "/services/residential/gutters",
    label: "Gutters",
    summary:
      "Debris out, downspouts flowing, less risk of fascia rot and foundation splash-back.",
  },
  {
    href: "/services/residential/curbing",
    label: "Curbing",
    summary:
      "Street-facing curb and sidewalk panels brightened fast for listings, HOA checks, or everyday pride.",
  },
  {
    href: "/services/residential/carpet-cleaning",
    label: "Carpet Cleaning",
    summary:
      "Traffic lanes and embedded soil lifted with methods matched to fiber so rooms feel lighter and carpets last longer.",
  },
  {
    href: "/services/residential/indoor-air",
    label: "Indoor Air Quality",
    summary:
      "Vents and duct surfaces cleaned so your HVAC moves less dust through the rooms where your family lives.",
  },
  {
    href: "/services/residential/odor-removal",
    label: "Odor Removal",
    summary:
      "Pet, smoke, and mildew treated at the source in carpet, pad, and hard surfaces instead of covering with perfume.",
  },
  {
    href: "/services/residential/residential-properties",
    label: "Residential Properties",
    summary:
      "Roof to driveway in one plan: one crew, one quote, one visit for full exterior refresh.",
  },
  {
    href: "/services/residential/stain-cleaning",
    label: "Stain Cleaning",
    summary:
      "Rust, oil, paint, and organic marks on concrete and pavers targeted with chemistry plus pressure for a full lift.",
  },
  {
    href: "/services/residential/tile-and-grout-cleaning",
    label: "Tile & Grout Cleaning",
    summary:
      "Grout lines deep cleaned and optional sealing so kitchens and baths look brighter between regular mopping.",
  },
  {
    href: "/services/residential/upholstery-cleaning",
    label: "Upholstery Cleaning",
    summary:
      "Sofas and chairs cleaned by fabric type with faster dry times and stain focus where you need it.",
  },
]

export const commercialServices: NavLinkItem[] = [
  {
    href: "/services/commercial/building-washing",
    label: "Commercial Building Washing",
    summary:
      "Facades, entries, and signage washed with soft wash or pressure chosen for your cladding and traffic.",
  },
  {
    href: "/services/commercial/parking-lots-garages",
    label: "Parking Lots & Garages",
    summary:
      "Oil, rubber, and organic film off asphalt and concrete with scheduling that fits nights or weekends.",
  },
  {
    href: "/services/commercial/storefronts",
    label: "Storefronts",
    summary:
      "Glass, metal, painted panels, and walks cleaned so the first impression matches how you run the business.",
  },
  {
    href: "/services/commercial/graffiti-removal",
    label: "Graffiti Removal",
    summary:
      "Fast response on tags so spray paint and marker lift before they bond into brick, metal, or coated walls.",
  },
  {
    href: "/services/commercial/dumpster-pads",
    label: "Dumpster Pads",
    summary:
      "Grease and food waste off pads and enclosures so odors drop and inspections are easier to pass.",
  },
  {
    href: "/services/commercial/fleet-washing",
    label: "Fleet Washing",
    summary:
      "Vans, box trucks, and trailers cleaned on a schedule that keeps your brand sharp between routes.",
  },
  {
    href: "/services/commercial/glass-mirror-cleaning",
    label: "Glass & Mirror Cleaning",
    summary:
      "Streak-free commercial glass from lobby height to multi-story facades, including mineral spots and droppings.",
  },
  {
    href: "/services/commercial/commercial-gutter-cleaning",
    label: "Commercial Gutter Cleaning",
    summary:
      "Long runs and heavy volume cleared with flow checks so roof drains move water away from the building.",
  },
  {
    href: "/services/commercial/rooftop-skylight-cleaning",
    label: "Rooftop & Skylight Cleaning",
    summary:
      "Skylights, curbs, and equipment pads cleaned with low pressure safe around mechanicals.",
  },
]

export const aboutLinks: NavLinkItem[] = [
  { href: "/about/we-do-xpert", label: "We do Xpert" },
  { href: "/about/pressure-vs-soft-washing", label: "Pressure Washing vs. Soft Washing" },
  { href: "/gallery", label: "Gallery" },
]

export const quickLinks: NavLinkItem[] = [
  { href: "/services/residential", label: "Residential Services" },
  { href: "/services/commercial", label: "Commercial Services" },
  { href: "/service-areas", label: "Service Areas" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contact", label: "Contact" },
]

export const headerServiceAreaLinks: NavLinkItem[] = getServiceAreasForNavigation().map((area) => ({
  href: `/service-areas/${area.slug}`,
  label: `${area.cityName}, ${area.stateCode}`,
}))

export const footerTopServiceAreaLinks: NavLinkItem[] = getTopServiceAreas(8).map((area) => ({
  href: `/service-areas/${area.slug}`,
  label: `${area.cityName}, ${area.stateCode}`,
}))

