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
  faqPlaceholders: Array<{
    question: string
    answerPlaceholder: string
  }>
  ctaPlaceholders: {
    primary: string
    secondary: string
  }
  seoPlaceholders: {
    title: string
    description: string
  }
  heroImagePlaceholder: string
  cityMapPlaceholder: string
  beforeAfterGalleryPlaceholder: string
  cityServiceProofPlaceholder: string
  leadFormPlaceholder: string
  trackingPlaceholder: string
  serviceAvailabilityPlaceholder: string
  lastUpdatedPlaceholder: string
  nearbyAreaSlugs: string[]
}

const DEFAULT_LOCALIZED_SERVICE_CARDS = [
  {
    title: "Residential Pressure Washing",
    description: "Placeholder copy for city-specific residential cleaning value proposition.",
    href: "/services/residential/house-washing",
  },
  {
    title: "Commercial Pressure Washing",
    description: "Placeholder copy for city-specific commercial property support.",
    href: "/services/commercial/building-washing",
  },
  {
    title: "Industrial Pressure Washing",
    description: "Placeholder copy for city-specific industrial cleaning needs.",
    href: "/services/industrial/equipment-washing",
  },
]

const DEFAULT_PROCESS_STEPS = [
  {
    title: "Site Review",
    description: "Placeholder process note for a local property assessment in this city.",
  },
  {
    title: "Service Plan",
    description: "Placeholder process note for selecting the right cleaning method.",
  },
  {
    title: "Professional Cleaning",
    description: "Placeholder process note for execution with safety and quality controls.",
  },
  {
    title: "Final Walkthrough",
    description: "Placeholder process note for completion review and next-step guidance.",
  },
]

const DEFAULT_FAQ_PLACEHOLDERS = [
  {
    question: "How often should I schedule pressure washing in this area?",
    answerPlaceholder: "Placeholder answer to be replaced with city-specific guidance.",
  },
  {
    question: "Do you offer soft washing for delicate surfaces?",
    answerPlaceholder: "Placeholder answer for roof and siding cleaning details.",
  },
  {
    question: "What surfaces do you service for commercial properties?",
    answerPlaceholder: "Placeholder answer for localized commercial service scope.",
  },
]

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
): ServiceAreaPageContent {
  const slug = cityNameToSlug(cityName)

  return {
    slug,
    cityName,
    stateCode: "GA",
    county,
    priority,
    hero: {
      headline: `Pressure Washing Services in ${cityName}, Georgia`,
      subheadline:
        `Top-rated residential, commercial, and industrial exterior cleaning for ${cityName} properties.`,
    },
    trustPoints: [
      "Licensed & insured team with local market experience.",
      "Eco-conscious cleaning approach with placeholder chemical program details.",
      "Clear communication and a documented process from quote to completion.",
    ],
    localizedServiceCards: DEFAULT_LOCALIZED_SERVICE_CARDS,
    processSteps: DEFAULT_PROCESS_STEPS,
    faqPlaceholders: DEFAULT_FAQ_PLACEHOLDERS,
    ctaPlaceholders: {
      primary: `Get a Free Quote for ${cityName}`,
      secondary: `Call About ${cityName} Service Availability`,
    },
    seoPlaceholders: {
      title: `Pressure Washing in ${cityName}, GA | Placeholder SEO Title`,
      description:
        `Placeholder SEO description for ${cityName}, Georgia service page. Replace with final localized copy.`,
    },
    heroImagePlaceholder: "TODO: Replace with finalized city hero asset.",
    cityMapPlaceholder: "TODO: Replace with finalized city coverage map or static map image.",
    beforeAfterGalleryPlaceholder: "TODO: Replace with city-specific before/after gallery assets.",
    cityServiceProofPlaceholder: "TODO: Add city-specific review/testimonial proof points.",
    leadFormPlaceholder: "TODO: Connect contact form to database-backed submission flow.",
    trackingPlaceholder: "TODO: Add analytics/UTM tracking strategy for city page CTAs.",
    serviceAvailabilityPlaceholder: "TODO: Define city scheduling windows and response-time details.",
    lastUpdatedPlaceholder: "TODO: Add content revision timestamp policy.",
    nearbyAreaSlugs: [],
  }
}

const seededAreas = CITY_DEFINITIONS.map((city) =>
  createServiceAreaContent(city.cityName, city.county, city.priority),
)

function assignNearbyAreas(areas: ServiceAreaPageContent[]): ServiceAreaPageContent[] {
  return areas.map((area, index) => {
    const nearbyAreaSlugs = areas
      .filter((candidate, candidateIndex) => candidateIndex !== index)
      .slice(0, 3)
      .map((candidate) => candidate.slug)

    return {
      ...area,
      nearbyAreaSlugs,
    }
  })
}

export const serviceAreaContent = assignNearbyAreas(seededAreas)

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

