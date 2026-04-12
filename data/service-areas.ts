import { CITY_GALLERY_ITEM_IDS } from "@/data/city-gallery"
import {
  getCityTestimonials,
  type CityTestimonial,
} from "@/data/city-testimonials"

export type { CityTestimonial }

export interface ServiceAreaPageContent {
  slug: string
  cityName: string
  stateCode: "GA"
  county: string
  priority: number
  hero: {
    headline: string
    subheadline: string
  }
  trustPoints: string[]
  localizedServiceCards: Array<{
    title: string
    description: string
    href: string
  }>
  processSteps: Array<{
    title: string
    description: string
  }>
  faqItems: Array<{
    question: string
    answer: string
  }>
  cta: {
    primary: string
    secondary: string
  }
  seo: {
    title: string
    description: string
  }
  heroImageSrc?: string
  heroImageAlt?: string
  coverageMapImageSrc?: string
  coverageMapAlt?: string
  cityGalleryItemIds: number[]
  testimonials: CityTestimonial[]
  serviceAvailability: string
  nearbyAreasNote: string
  lastUpdatedIso: string
  contentReviewedLabel: string
  nearbyAreaSlugs: string[]
}

/**
 * Service-area hero + “Trust the Xperts” image: clean exterior finals only.
 *
 * Policy: prefer `/gallery/gallery-*.png` residential or flatwork shots, then
 * `/gallery/before-after/*-after.png`. Do not use `gallery-06` (mid-wash) or
 * `gallery-09` (gutter debris) as heroes. Blocklist Wix `pair-05-after` (interior rug)
 * and other non-exterior Wix files for this slot.
 *
 * Checklist (finish each row before changing the next slug): atlanta PNG · alpharetta PNG ·
 * marietta PNG · roswell PNG · sandy-springs PNG · johns-creek PNG · duluth PNG · norcross PNG ·
 * peachtree-corners after · suwanee after · cumming after · decatur after · smyrna after ·
 * dunwoody after · brookhaven after · tucker after — all verified clean exterior finals.
 */
const CITY_HERO_BY_SLUG: Record<string, { src: string; alt: string }> = {
  atlanta: {
    src: "/gallery/gallery-01.png",
    alt: "Back of a home with white siding, windows, door, and concrete patio after exterior cleaning",
  },
  alpharetta: {
    src: "/gallery/gallery-03.png",
    alt: "Elevated wood deck and railing on a residential building after washing",
  },
  marietta: {
    src: "/gallery/gallery-04.png",
    alt: "Front of a split-level home with tan siding, brick, garage, and landscaping after washing",
  },
  roswell: {
    src: "/gallery/gallery-08.png",
    alt: "Front of a two-story home with light siding, brick around the garage, and landscaping after cleaning",
  },
  "sandy-springs": {
    src: "/gallery/gallery-05.png",
    alt: "Long residential concrete driveway leading toward a garage after pressure washing",
  },
  "johns-creek": {
    src: "/gallery/gallery-07.png",
    alt: "Backyard stone paver patio with a wooden pergola and outdoor seating after cleaning",
  },
  duluth: {
    src: "/gallery/gallery-10.png",
    alt: "Stone pavers by a foundation next to a brick house wall after exterior washing",
  },
  norcross: {
    src: "/gallery/gallery-02.png",
    alt: "Commercial building facade and parking area after exterior cleaning",
  },
  "peachtree-corners": {
    src: "/gallery/before-after/01-after.png",
    alt: "Clean white vinyl siding on a long side wall after house washing",
  },
  suwanee: {
    src: "/gallery/before-after/02-after.png",
    alt: "House siding with window and meter area after exterior cleaning",
  },
  cumming: {
    src: "/gallery/before-after/03-after.png",
    alt: "Concrete driveway and curb at the street after cleaning",
  },
  decatur: {
    src: "/gallery/before-after/04-after.png",
    alt: "Residential driveway leading to a white garage door after cleaning",
  },
  smyrna: {
    src: "/gallery/before-after/05-after.png",
    alt: "Concrete patio beside a white brick home after cleaning",
  },
  dunwoody: {
    src: "/gallery/before-after/06-after.png",
    alt: "Square pavers beside a foundation after cleaning",
  },
  brookhaven: {
    src: "/gallery/before-after/07-after.png",
    alt: "Concrete driveway slabs toward the house after cleaning",
  },
  tucker: {
    src: "/gallery/before-after/08-after.png",
    alt: "Driveway with mulch beds and house in the background after cleaning",
  },
}

const NEIGHBOR_SLUGS: Record<string, string[]> = {
  atlanta: ["brookhaven", "decatur", "sandy-springs"],
  alpharetta: ["roswell", "johns-creek", "cumming"],
  marietta: ["smyrna", "sandy-springs", "atlanta"],
  roswell: ["alpharetta", "sandy-springs", "johns-creek"],
  "sandy-springs": ["atlanta", "roswell", "dunwoody"],
  "johns-creek": ["alpharetta", "duluth", "roswell"],
  duluth: ["johns-creek", "suwanee", "norcross"],
  norcross: ["peachtree-corners", "duluth", "tucker"],
  "peachtree-corners": ["norcross", "duluth", "dunwoody"],
  suwanee: ["duluth", "cumming", "johns-creek"],
  cumming: ["alpharetta", "suwanee", "johns-creek"],
  decatur: ["atlanta", "tucker", "brookhaven"],
  smyrna: ["marietta", "atlanta", "sandy-springs"],
  dunwoody: ["sandy-springs", "brookhaven", "peachtree-corners"],
  brookhaven: ["atlanta", "decatur", "dunwoody"],
  tucker: ["decatur", "norcross", "brookhaven"],
}

function cardsForCity(cityName: string) {
  return [
    {
      title: "Residential washing",
      description: `Siding, rooflines, concrete, and wood in ${cityName}: we pick soft wash or pressure washing by surface so nothing gets blasted.`,
      href: "/services/residential/house-washing",
    },
    {
      title: "Commercial exteriors",
      description: `Facades, entries, and lots in ${cityName} that still look sharp when customers and tenants pull up.`,
      href: "/services/commercial/building-washing",
    },
    {
      title: "Parking lots and garages",
      description: `Strip oil, tire marks, and slippery film off asphalt and concrete where ${cityName} traffic piles up.`,
      href: "/services/commercial/parking-lots-garages",
    },
  ]
}

function processForCity(cityName: string) {
  return [
    {
      title: "Local site review",
      description: `We walk the ${cityName} property, note surfaces, access, water flow, and landscaping to protect.`,
    },
    {
      title: "Method and schedule",
      description:
        "We write the scope in plain language: which areas get soft wash vs pressure, and a service window that fits your calendar.",
    },
    {
      title: "Cleaning day",
      description:
        "Crew works the plan with consistent technique, safe ladder use where needed, and cleanup before we leave.",
    },
    {
      title: "Walkthrough",
      description:
        "You check results with us. If something needs a touch-up, we handle it before we pack up.",
    },
  ]
}

function faqForCity(cityName: string) {
  return [
    {
      question: `How often should I schedule exterior cleaning in ${cityName}?`,
      answer:
        "Most homes benefit from a full house wash every one to two years. Shaded sides with algae may need attention sooner. Roof soft washing is often every few years once streaking shows. Concrete with tree cover can be washed annually. We recommend a rhythm after we see your property.",
    },
    {
      question: "Do you soft wash roofs and siding?",
      answer:
        "Yes. Asphalt shingles, painted siding, vinyl, and many other exteriors get low-pressure soft washing so algae and mold die at the root without stripping granules or forcing water behind boards.",
    },
    {
      question: "What do you clean for commercial properties?",
      answer:
        "Storefronts, building facades, sidewalks, dumpster pads, parking lots and garages, fleet vehicles, and more. We match pressure, heat, and detergents to the surface and your hours so customers and staff are not disrupted.",
    },
  ]
}

const CITY_DEFINITIONS = [
  { cityName: "Atlanta", county: "Fulton County", priority: 1 },
  { cityName: "Alpharetta", county: "Fulton County", priority: 2 },
  { cityName: "Marietta", county: "Cobb County", priority: 3 },
  { cityName: "Roswell", county: "Fulton County", priority: 4 },
  { cityName: "Sandy Springs", county: "Fulton County", priority: 5 },
  { cityName: "Johns Creek", county: "Fulton County", priority: 6 },
  { cityName: "Duluth", county: "Gwinnett County", priority: 7 },
  { cityName: "Norcross", county: "Gwinnett County", priority: 8 },
  { cityName: "Peachtree Corners", county: "Gwinnett County", priority: 9 },
  { cityName: "Suwanee", county: "Gwinnett County", priority: 10 },
  { cityName: "Cumming", county: "Forsyth County", priority: 11 },
  { cityName: "Decatur", county: "DeKalb County", priority: 12 },
  { cityName: "Smyrna", county: "Cobb County", priority: 13 },
  { cityName: "Dunwoody", county: "DeKalb County", priority: 14 },
  { cityName: "Brookhaven", county: "DeKalb County", priority: 15 },
  { cityName: "Tucker", county: "DeKalb County", priority: 16 },
] as const

/** Scheduling and response copy per city (owner-style detail for planning). */
const SERVICE_AVAILABILITY_BY_SLUG: Record<string, string> = {
  atlanta:
    "We run Atlanta routes Monday through Saturday. Most quotes return same day if you submit before 3 p.m. Same-week appointments open in many neighborhoods.",
  alpharetta:
    "Alpharetta routes focus on Tuesday, Thursday, and Saturday. We usually reply to new quotes within four business hours. Same-week slots open when the schedule allows.",
  marietta:
    "Marietta and east Cobb crews run Monday, Wednesday, and Friday. Expect a call or email back within one business day. Weekend slots book fast in spring.",
  roswell:
    "Roswell jobs typically land on Monday, Wednesday, or Saturday. New inquiries get a response by the next business morning at the latest. We can often fit small curb or driveway washes midweek.",
  "sandy-springs":
    "Sandy Springs is on a Monday through Friday rotation with optional Saturday overflow. Quotes within one business day. Same-week exterior washes when rain cooperates.",
  "johns-creek":
    "Johns Creek routes run Tuesday, Thursday, and Saturday. Response within four business hours on weekdays. We group jobs by neighborhood to keep drive time low.",
  duluth:
    "Duluth and central Gwinnett visits run Monday, Wednesday, and Friday. You hear back within one business day. Evening estimates by request.",
  norcross:
    "Norcross crews move Monday through Thursday plus Saturday mornings. Same-day replies when you submit early. Tight turnaround for storefront concrete when you need it.",
  "peachtree-corners":
    "Peachtree Corners falls on Tuesday, Thursday, and Saturday routes. Quotes return same day before 2 p.m. most weekdays. Commercial after-hours washing available.",
  suwanee:
    "Suwanee jobs run Monday, Wednesday, Friday, and every other Saturday. Response within one business day. HOA and residential clusters scheduled back-to-back when possible.",
  cumming:
    "Cumming and south Forsyth routes run Tuesday, Thursday, and Saturday. New leads hear back next business morning at the latest. Large driveways often book midweek.",
  decatur:
    "Decatur and intown DeKalb routes run Monday through Friday. Quotes same day if you send details before 4 p.m. We watch porch gardens and tight lot lines closely.",
  smyrna:
    "Smyrna crews run Monday, Wednesday, Friday, and Saturday. Response within four business hours. Same-week house washes common outside heavy pollen weeks.",
  dunwoody:
    "Dunwoody visits concentrate on Tuesday, Thursday, and Saturday. One-business-day quote turnaround. Early-morning starts for zero interference with school traffic.",
  brookhaven:
    "Brookhaven routes run Monday through Friday with Saturday backup. Reply within one business day. Alley and tight-access homes get a walk-through note on your quote.",
  tucker:
    "Tucker and north DeKalb jobs run Monday, Wednesday, and Friday. Quotes within one business day. Quick curb and gutter add-ons fit between larger house washes.",
}

const NEARBY_NOTE_BY_SLUG: Record<string, string> = {
  alpharetta:
    "From Windward and Avalon out to older ranch streets off Kimball Bridge, we group Alpharetta jobs so crews spend time washing, not sitting in cross-town traffic. If you are near the Roswell or Johns Creek line, say so in your message and we will slot you with the tightest route.",
  marietta:
    "East Cobb tree cover and red-clay splash hit siding and concrete differently than open lots. We adjust pretreatment and rinse paths for Marietta streets off Roswell Road, Whitlock, and the historic square. Mention your neighborhood for the right crew pairing.",
  roswell:
    "Roswell mixes heavy canopy near the river with open subdivisions off Holcomb Bridge. We plan water flow away from driveways onto landscaping you care about and keep pressure down on older brick walks. Tell us if you are closer to Alpharetta or Sandy Springs for routing.",
}

function defaultNearbyNote(cityName: string) {
  return `We batch ${cityName} with nearby routes so you get realistic arrival windows. Drop your subdivision or cross streets in the form and we will slot you with the shortest drive time.`
}

function defaultTrust(cityName: string, county: string): string[] {
  return [
    `Licensed and insured team that works ${cityName} and ${county} regularly.`,
    "Soft wash and pressure washing matched to siding, concrete, wood, and roof materials.",
    "Straightforward quotes with a clear scope before we start.",
  ]
}

const TRUST_BY_SLUG: Partial<Record<string, string[]>> = {
  alpharetta: [
    "Windward, Avalon, and Crabapple jobs are a regular part of our week, so we know the HOA expectations and tight lot lines.",
    "Algae on north faces and shaded walks is common here. We soft wash siding and surface clean flatwork without blasting finish or mortar.",
    "Quotes spell out house wash, concrete, deck, and roof options so you pick what fits your street and your timeline.",
  ],
  marietta: [
    "East Cobb shade and clay splash are familiar problems here. We pretreat stains and rinse so runoff does not ruin fresh mulch beds.",
    "Historic square brick and newer vinyl each get different pressure. We protect old mortar and painted trim.",
    "Same crew can often handle house wash plus driveway the same day, which saves you from double booking.",
  ],
  roswell: [
    "River corridor humidity grows mildew fast on decks and siding. We use wood-safe washing and low roof pressure where tree cover is heavy.",
    "Brick walks near downtown and newer siding off Highway 9 both get methods that lift growth without etching.",
    "If you border Alpharetta or Sandy Springs, we route you with the nearest team to cut wait time.",
  ],
}

function heroSubline(cityName: string) {
  return `${cityName} picks up pollen, humidity, and algae like the rest of the metro. We match soft wash and pressure washing to your surfaces and give you a quote you can read before we start.`
}

export function cityNameToSlug(cityName: string): string {
  return cityName.toLowerCase().replace(/,?\s+/g, "-")
}

export function normalizeServiceAreaSlug(slug: string): string {
  return slug.trim().toLowerCase().replace(/[^a-z0-9-]+/g, "").replace(/-+/g, "-")
}

export function slugToCityName(slug: string): string {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

function createServiceAreaContent(
  cityName: string,
  county: string,
  priority: number,
  allSlugs: string[]
): ServiceAreaPageContent {
  const slug = cityNameToSlug(cityName)
  const neighbors = NEIGHBOR_SLUGS[slug] ?? []
  const nearbyAreaSlugs = neighbors.filter((s) => s !== slug && allSlugs.includes(s)).slice(0, 3)
  const fallbackNearby = allSlugs.filter((s) => s !== slug).slice(0, 3)
  const resolvedNearby = nearbyAreaSlugs.length > 0 ? nearbyAreaSlugs : fallbackNearby

  const trustPoints = TRUST_BY_SLUG[slug] ?? defaultTrust(cityName, county)
  const heroAsset = CITY_HERO_BY_SLUG[slug]

  return {
    slug,
    cityName,
    stateCode: "GA",
    county,
    priority,
    hero: {
      headline: `Pressure Washing Services in ${cityName}, Georgia`,
      subheadline: heroSubline(cityName),
    },
    ...(heroAsset
      ? { heroImageSrc: heroAsset.src, heroImageAlt: heroAsset.alt }
      : {}),
    trustPoints,
    localizedServiceCards: cardsForCity(cityName),
    processSteps: processForCity(cityName),
    faqItems: faqForCity(cityName),
    cta: {
      primary: `Get a Free Quote for ${cityName}`,
      secondary: `Call About ${cityName} Service`,
    },
    seo: {
      title: `Pressure Washing in ${cityName}, GA | Pressure Washing Xperts`,
      description: `House washing, roof soft wash, concrete, and storefronts in ${cityName}, GA. Licensed crew, straight quotes, work you can see from the curb.`,
    },
    cityGalleryItemIds: CITY_GALLERY_ITEM_IDS[slug] ?? [11, 12],
    testimonials: getCityTestimonials(slug),
    serviceAvailability:
      SERVICE_AVAILABILITY_BY_SLUG[slug] ??
      `We serve ${cityName} on rotating weekly routes. Most quotes return within one business day. Same-week appointments available when weather allows.`,
    nearbyAreasNote: NEARBY_NOTE_BY_SLUG[slug] ?? defaultNearbyNote(cityName),
    lastUpdatedIso: "2026-04-12",
    contentReviewedLabel: "April 2026",
    nearbyAreaSlugs: resolvedNearby,
  }
}

const allSlugs = CITY_DEFINITIONS.map((c) => cityNameToSlug(c.cityName))

export const serviceAreaContent: ServiceAreaPageContent[] = CITY_DEFINITIONS.map((city) =>
  createServiceAreaContent(city.cityName, city.county, city.priority, allSlugs)
)

export const serviceAreaSlugSet = new Set(serviceAreaContent.map((city) => city.slug))

export function getServiceAreaBySlug(slug: string): ServiceAreaPageContent | undefined {
  const normalizedSlug = normalizeServiceAreaSlug(slug)
  return serviceAreaContent.find((city) => city.slug === normalizedSlug)
}

export function isValidServiceAreaSlug(slug: string): boolean {
  return serviceAreaSlugSet.has(normalizeServiceAreaSlug(slug))
}

export function getServiceAreasForNavigation(): ServiceAreaPageContent[] {
  return [...serviceAreaContent].sort((a, b) => {
    if (a.priority !== b.priority) {
      return a.priority - b.priority
    }

    return a.cityName.localeCompare(b.cityName)
  })
}

export function getTopServiceAreas(limit = 8): ServiceAreaPageContent[] {
  return getServiceAreasForNavigation().slice(0, limit)
}

export function getServiceAreasGroupedByFirstLetter(): Record<string, ServiceAreaPageContent[]> {
  return getServiceAreasForNavigation().reduce<Record<string, ServiceAreaPageContent[]>>((acc, city) => {
    const groupKey = city.cityName.charAt(0).toUpperCase()
    const existingGroup = acc[groupKey] ?? []
    acc[groupKey] = [...existingGroup, city]
    return acc
  }, {})
}
