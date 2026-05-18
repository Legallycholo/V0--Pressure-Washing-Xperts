import { commercialServices, residentialServices } from "@/data/navigation"
import type { BreadcrumbItem } from "@/lib/seo/json-ld-builders"

export interface MarketingRouteDefinition {
  title: string
  description: string
  breadcrumbs: BreadcrumbItem[]
  /** When set, emits `Service` JSON-LD (service detail pages only). */
  service?: { name: string; description: string }
}

function clip(s: string, max = 158): string {
  const t = s.trim()
  if (t.length <= max) return t
  return `${t.slice(0, max - 1).trimEnd()}…`
}

const RES_HUB = "/services/residential"
const COM_HUB = "/services/commercial"

function def(
  title: string,
  description: string,
  breadcrumbs: BreadcrumbItem[],
  service?: { name: string; description: string }
): MarketingRouteDefinition {
  return { title, description, breadcrumbs, service }
}

function buildFromNav(
  items: typeof residentialServices,
  segmentLabel: string,
  hubPath: string
): Record<string, MarketingRouteDefinition> {
  const out: Record<string, MarketingRouteDefinition> = {}
  for (const s of items) {
    out[s.href] = def(
      `${s.label} | ${segmentLabel} | Pressure Washing Xperts`,
      clip(s.summary ?? ""),
      [
        { name: "Home", path: "/" },
        { name: segmentLabel, path: hubPath },
        { name: s.label, path: s.href },
      ],
      { name: s.label, description: (s.summary ?? "").trim() }
    )
  }
  return out
}

const manualCommercial: Record<string, MarketingRouteDefinition> = {
  "/services/commercial/apartment-complexes": def(
    "Apartment Complex Pressure Washing | Commercial | Pressure Washing Xperts",
    "Breezeways, parking, pool decks, and building exteriors for Metro Atlanta apartments—scheduled to minimize disruption for residents and onsite staff.",
    [
      { name: "Home", path: "/" },
      { name: "Commercial Services", path: COM_HUB },
      { name: "Apartment Complexes", path: "/services/commercial/apartment-complexes" },
    ],
    {
      name: "Apartment complex pressure washing",
      description:
        "Exterior and common-area washing for multifamily communities in the Atlanta metro, including flatwork, breezeways, and building faces with HOA-friendly communication.",
    }
  ),
  "/services/commercial/office-buildings": def(
    "Office Building Exterior Washing | Commercial | Pressure Washing Xperts",
    "Entries, signage, walks, and facades for professional buildings—soft wash or pressure matched to cladding so your property looks maintained year-round.",
    [
      { name: "Home", path: "/" },
      { name: "Commercial Services", path: COM_HUB },
      { name: "Office Buildings", path: "/services/commercial/office-buildings" },
    ],
    {
      name: "Office building pressure washing",
      description:
        "Day or off-hours exterior cleaning for offices across Metro Atlanta, focused on first impressions, glass surrounds, and high-traffic walks without careless overspray.",
    }
  ),
  "/services/commercial/government-complexes": def(
    "Government & Civic Building Washing | Commercial | Pressure Washing Xperts",
    "Municipal exteriors, civic centers, and public-facing walks cleaned with clear access planning and documentation-friendly scheduling in the Atlanta area.",
    [
      { name: "Home", path: "/" },
      { name: "Commercial Services", path: COM_HUB },
      { name: "Government Complexes", path: "/services/commercial/government-complexes" },
    ],
    {
      name: "Government complex pressure washing",
      description:
        "Exterior washing for public facilities and campuses with attention to pedestrian traffic, parking flows, and durable surfaces that see heavy seasonal use.",
    }
  ),
  "/services/commercial/hotels-hospitality": def(
    "Hotel & Hospitality Exterior Cleaning | Commercial | Pressure Washing Xperts",
    "Porte-cochères, arrivals, loading zones, and walks kept guest-ready—night and weekend scheduling available for hospitality sites across Metro Atlanta.",
    [
      { name: "Home", path: "/" },
      { name: "Commercial Services", path: COM_HUB },
      { name: "Hotels & Hospitality", path: "/services/commercial/hotels-hospitality" },
    ],
    {
      name: "Hotel and hospitality pressure washing",
      description:
        "Exterior cleaning tailored to hotels and venues: entries, drive lanes, patios, and service courts washed with minimal interference to operations and arrivals.",
    }
  ),
  "/services/commercial/gas-stations": def(
    "Gas Station & Convenience Store Washing | Commercial | Pressure Washing Xperts",
    "Fuel islands, pump pads, and forecourts cleaned to lift oil film and tire marks—improving appearance and traction for busy Metro Atlanta locations.",
    [
      { name: "Home", path: "/" },
      { name: "Commercial Services", path: COM_HUB },
      { name: "Gas Stations", path: "/services/commercial/gas-stations" },
    ],
    {
      name: "Gas station pressure washing",
      description:
        "Concrete and canopy-area washing for gas stations and C-stores, targeting petroleum staining and rubber buildup with methods suited to high-liability zones.",
    }
  ),
  "/services/commercial/awning-cleaning": def(
    "Commercial Awning Cleaning | Commercial | Pressure Washing Xperts",
    "Fabric and vinyl awnings brightened for retail and restaurant entrances—gentle methods that respect seams, graphics, and signage across Metro Atlanta.",
    [
      { name: "Home", path: "/" },
      { name: "Commercial Services", path: COM_HUB },
      { name: "Awning Cleaning", path: "/services/commercial/awning-cleaning" },
    ],
    {
      name: "Commercial awning cleaning",
      description:
        "Low-pressure awning and valance cleaning to remove pollution, pollen, and organic growth so branded entrances read crisp from the sidewalk and parking.",
    }
  ),
  "/services/commercial/parking-decks": def(
    "Parking Deck & Garage Washing | Commercial | Pressure Washing Xperts",
    "Multi-level decks and ramps washed for oil, rubber, and seasonal film—scoped for drainage, traffic control, and off-peak scheduling in Metro Atlanta.",
    [
      { name: "Home", path: "/" },
      { name: "Commercial Services", path: COM_HUB },
      { name: "Parking Decks", path: "/services/commercial/parking-decks" },
    ],
    {
      name: "Parking deck pressure washing",
      description:
        "Structured cleaning for structured parking: level slabs, ramps, and tire walls where exhaust residue and leaks accumulate, with attention to environmental discharge.",
    }
  ),
  "/services/commercial/hoa-services": def(
    "HOA & Community Exterior Cleaning | Commercial | Pressure Washing Xperts",
    "Recurring plans for clubhouses, pool decks, entries, and flatwork so communities pass inspections and keep curb appeal consistent across Metro Atlanta.",
    [
      { name: "Home", path: "/" },
      { name: "Commercial Services", path: COM_HUB },
      { name: "HOA Services", path: "/services/commercial/hoa-services" },
    ],
    {
      name: "HOA pressure washing services",
      description:
        "HOA-focused exterior washing: model homes, amenity buildings, mail kiosks, and common walks on routes designed for minimal resident inconvenience.",
    }
  ),
  "/services/commercial/building-washing": def(
    "Commercial Pressure Washing | Ellenwood, GA & Metro Atlanta | Pressure Washing Xperts",
    "Commercial building washing and exterior cleaning in Ellenwood, GA and Metro Atlanta. Storefronts, office buildings, and apartment complexes. Licensed & insured.",
    [
      { name: "Home", path: "/" },
      { name: "Commercial Services", path: COM_HUB },
      { name: "Commercial Building Washing", path: "/services/commercial/building-washing" },
    ],
    {
      name: "Commercial building washing in Metro Atlanta",
      description:
        "Facades, entries, and signage washed with soft wash or pressure chosen for your cladding and traffic, for businesses across Ellenwood, GA and Metro Atlanta.",
    }
  ),
}

const manualResidential: Record<string, MarketingRouteDefinition> = {
  "/services/residential/house-washing": def(
    "House Washing Near Me in Ellenwood & Atlanta, GA | Pressure Washing Xperts",
    "Professional house washing near you in Ellenwood, GA and Metro Atlanta. We soft wash and pressure wash vinyl siding, brick, stucco, and painted surfaces. Call (800) 451-7213 for a free quote.",
    [
      { name: "Home", path: "/" },
      { name: "Residential Services", path: RES_HUB },
      { name: "House Washing", path: "/services/residential/house-washing" },
    ],
    {
      name: "House washing in Ellenwood, GA",
      description:
        "Exterior house washing and soft wash for vinyl siding, brick, stucco, and painted surfaces — removing mold, mildew, and algae across Ellenwood, GA and Metro Atlanta.",
    }
  ),
  "/services/residential/driveways-sidewalks": def(
    "Driveway Cleaning Near Me in Ellenwood & Atlanta, GA | Pressure Washing Xperts",
    "Professional driveway cleaning and power washing near you in Ellenwood, GA and Metro Atlanta. We remove oil stains, dirt, mold, and mildew from driveways, sidewalks, and walkways. Call (800) 451-7213 for a free quote.",
    [
      { name: "Home", path: "/" },
      { name: "Residential Services", path: RES_HUB },
      { name: "Driveways & Sidewalks", path: "/services/residential/driveways-sidewalks" },
    ],
    {
      name: "Driveway cleaning and power washing in Ellenwood, GA",
      description:
        "Professional driveway cleaning and sidewalk pressure washing in Ellenwood, GA and Metro Atlanta — removing oil stains, dirt, mold, and mildew from concrete surfaces.",
    }
  ),
  "/services/residential/roof-soft-washing": def(
    "Roof Cleaning Near Me in Ellenwood & Atlanta, GA | Pressure Washing Xperts",
    "Professional roof cleaning near you in Ellenwood, GA and Metro Atlanta. Safe low-pressure soft wash roof cleaning removes algae, moss, lichen, and black streaks without damaging shingles. Serving Atlanta, Alpharetta, McDonough, and surrounding areas. Call (800) 451-7213 for a free quote.",
    [
      { name: "Home", path: "/" },
      { name: "Residential Services", path: RES_HUB },
      { name: "Roof Soft Washing", path: "/services/residential/roof-soft-washing" },
    ],
    {
      name: "Roof cleaning in Ellenwood, GA",
      description:
        "Safe low-pressure soft wash roof cleaning in Ellenwood, GA and Metro Atlanta — removes algae, moss, lichen, and black streaks without damaging asphalt shingles.",
    }
  ),
  "/services/residential/residential-properties": def(
    "Residential Pressure Washing Near Me in Ellenwood & Atlanta, GA | Pressure Washing Xperts",
    "Expert residential pressure washing services near you in Ellenwood, GA and Metro Atlanta. Full exterior cleaning including house washing, driveway cleaning, roof cleaning, gutter cleaning, and soft washing. Call (800) 451-7213.",
    [
      { name: "Home", path: "/" },
      { name: "Residential Services", path: RES_HUB },
      { name: "Residential Properties", path: "/services/residential/residential-properties" },
    ],
    {
      name: "Residential pressure washing in Ellenwood, GA",
      description:
        "Full exterior residential pressure washing in Ellenwood, GA and Metro Atlanta — house washing, driveway cleaning, roof cleaning, gutter cleaning, and soft washing in one plan.",
    }
  ),
  "/services/residential/decks-fences": def(
    "Deck & Fence Cleaning | Ellenwood, GA & Metro Atlanta | Pressure Washing Xperts",
    "Deck and fence cleaning in Ellenwood, GA and Metro Atlanta. Prep wood, composite, and vinyl rails and boards for staining or sealing. Licensed & insured.",
    [
      { name: "Home", path: "/" },
      { name: "Residential Services", path: RES_HUB },
      { name: "Decks & Fences", path: "/services/residential/decks-fences" },
    ],
    {
      name: "Deck and fence cleaning in Ellenwood, GA",
      description:
        "Wood, composite, and vinyl deck and fence cleaning so outdoor spaces look maintained and hold finish longer across Metro Atlanta.",
    }
  ),
}

export const MARKETING_ROUTE_SEO: Record<string, MarketingRouteDefinition> = {
  "/roof-cleaning": def(
    "Roof Cleaning Near Me in Ellenwood & Atlanta, GA | Pressure Washing Xperts",
    "Professional roof cleaning service near you in Ellenwood, GA and Metro Atlanta. Soft wash roof cleaning removes black streaks, algae, and moss without damaging shingles. Licensed & insured. Free quote.",
    [
      { name: "Home", path: "/" },
      { name: "Roof Cleaning", path: "/roof-cleaning" },
    ],
    {
      name: "Roof Cleaning in Ellenwood, GA",
      description:
        "Professional soft wash roof cleaning service in Ellenwood, GA and Metro Atlanta. Safe low-pressure treatment removes black streaks, algae, and moss without damaging asphalt shingles.",
    }
  ),
  "/power-washing": def(
    "Power Washing Near Me in Ellenwood & Atlanta, GA | Pressure Washing Xperts",
    "Professional power washing service near you in Ellenwood, GA and Metro Atlanta. Power washing service for driveways, concrete, decks, and building exteriors. Licensed & insured. Free quote.",
    [
      { name: "Home", path: "/" },
      { name: "Power Washing", path: "/power-washing" },
    ],
    {
      name: "Power Washing in Ellenwood, GA",
      description:
        "Professional power washing service in Ellenwood, GA and Metro Atlanta. High-pressure cleaning for driveways, sidewalks, patios, and commercial surfaces that need heavy buildup removed.",
    }
  ),
  "/soft-washing": def(
    "Soft Washing Services in Ellenwood & Atlanta, GA | Pressure Washing Xperts",
    "Professional soft washing service in Ellenwood, GA and Metro Atlanta. Soft wash near you for roofs, siding, and delicate surfaces. Low-pressure treatment kills algae and mold at the root. Free quote.",
    [
      { name: "Home", path: "/" },
      { name: "Soft Washing", path: "/soft-washing" },
    ],
    {
      name: "Soft Washing in Ellenwood, GA",
      description:
        "Low-pressure soft washing service in Ellenwood, GA and Metro Atlanta. Safe chemical treatment for roofs, siding, stucco, and other surfaces that can't handle high-pressure washing.",
    }
  ),
  "/privacy": def(
    "Privacy Policy | Pressure Washing Xperts",
    "How Pressure Washing Xperts collects, uses, and protects information when you browse our site or submit a quote request in Metro Atlanta.",
    [
      { name: "Home", path: "/" },
      { name: "Privacy Policy", path: "/privacy" },
    ]
  ),
  "/thank-you": def(
    "Thank You | Quote Request Received | Pressure Washing Xperts",
    "Your free quote request was received. Pressure Washing Xperts serves Ellenwood, GA and Metro Atlanta—we will follow up shortly.",
    [
      { name: "Home", path: "/" },
      { name: "Thank You", path: "/thank-you" },
    ]
  ),
  "/service-areas": def(
    "Service Areas | Metro Atlanta Pressure Washing | Pressure Washing Xperts",
    "Cities and neighborhoods we serve across Metro Atlanta—from intown to northern suburbs—with localized pages for exterior and flatwork cleaning.",
    [
      { name: "Home", path: "/" },
      { name: "Service Areas", path: "/service-areas" },
    ]
  ),
  "/services/residential": def(
    "Residential Pressure Washing & Soft Washing | Pressure Washing Xperts",
    "House washing, roofs, driveways, decks, and more for Atlanta-area homes—soft wash where it protects paint and shingles, pressure where concrete needs it.",
    [
      { name: "Home", path: "/" },
      { name: "Residential Services", path: RES_HUB },
    ]
  ),
  "/services/commercial": def(
    "Commercial Pressure Washing | Retail, Offices & HOAs | Pressure Washing Xperts",
    "Building washing, parking areas, storefronts, and fleet-ready plans for businesses across Metro Atlanta—scheduled around traffic and operations.",
    [
      { name: "Home", path: "/" },
      { name: "Commercial Services", path: COM_HUB },
    ]
  ),
  "/about/we-do-xpert": def(
    "We Do Xpert | Our Standard | Pressure Washing Xperts",
    "What “Xpert” means for your property: thorough prep, honest scopes, and finishes you can walk with pride—serving Metro Atlanta homeowners and businesses.",
    [
      { name: "Home", path: "/" },
      { name: "We Do Xpert", path: "/about/we-do-xpert" },
    ]
  ),
  "/about/pressure-vs-soft-washing": def(
    "Pressure Washing vs Soft Washing | Pressure Washing Xperts",
    "When high-pressure flatwork cleaning makes sense versus low-pressure soft washing for siding and roofs—plain-language guidance for Georgia homeowners.",
    [
      { name: "Home", path: "/" },
      { name: "Pressure vs Soft Washing", path: "/about/pressure-vs-soft-washing" },
    ]
  ),
  "/gallery": def(
    "Project Gallery | Pressure Washing Xperts",
    "Residential and commercial results from Pressure Washing Xperts across Metro Atlanta—siding, concrete, decks, and storefronts before and after cleaning.",
    [
      { name: "Home", path: "/" },
      { name: "Gallery", path: "/gallery" },
    ]
  ),
  ...buildFromNav(residentialServices, "Residential Services", RES_HUB),
  ...manualResidential,
  ...buildFromNav(commercialServices, "Commercial Services", COM_HUB),
  ...manualCommercial,
}

export function getMarketingRoute(pathname: string): MarketingRouteDefinition | undefined {
  const key = pathname.endsWith("/") && pathname !== "/" ? pathname.slice(0, -1) : pathname
  return MARKETING_ROUTE_SEO[key]
}
