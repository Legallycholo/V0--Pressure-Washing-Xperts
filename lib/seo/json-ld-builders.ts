import type { HomeFaqItem } from "@/data/home-faq"
import {
  businessAddressLines,
  businessAreaServedDescription,
  businessEmail,
  businessLegalName,
  businessPhoneTel,
} from "@/data/site"
import { absoluteUrl } from "@/lib/site-url"

const ORG_ID = (base: string) => `${base}/#organization`
const LOCAL_ID = (base: string) => `${base}/#localbusiness`
const WEBSITE_ID = (base: string) => `${base}/#website`

export function buildGlobalJsonLdGraph(baseUrl: string, logoUrl: string) {
  const street = businessAddressLines[0] ?? ""
  const cityStateZip = businessAddressLines[1] ?? ""
  const localityMatch = cityStateZip.match(/^([^,]+),\s*([A-Z]{2})\s+([\d-]+)$/)
  const addressLocality = localityMatch?.[1]?.trim() ?? "Ellenwood"
  const addressRegion = localityMatch?.[2] ?? "GA"
  const postalCode = localityMatch?.[3] ?? "30294"

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID(baseUrl),
        name: businessLegalName,
        url: baseUrl,
        logo: logoUrl,
        email: businessEmail,
        telephone: `+1${businessPhoneTel}`,
      },
      {
        "@type": "LocalBusiness",
        "@id": LOCAL_ID(baseUrl),
        name: businessLegalName,
        image: logoUrl,
        url: baseUrl,
        telephone: `+1${businessPhoneTel}`,
        email: businessEmail,
        priceRange: "$$",
        parentOrganization: { "@id": ORG_ID(baseUrl) },
        address: {
          "@type": "PostalAddress",
          streetAddress: street,
          addressLocality,
          addressRegion,
          postalCode,
          addressCountry: "US",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 33.6542916,
          longitude: -84.2938419,
        },
        areaServed: {
          "@type": "AdministrativeArea",
          name: businessAreaServedDescription,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "https://schema.org/Monday",
              "https://schema.org/Tuesday",
              "https://schema.org/Wednesday",
              "https://schema.org/Thursday",
              "https://schema.org/Friday",
              "https://schema.org/Saturday",
              "https://schema.org/Sunday",
            ],
            opens: "08:00",
            closes: "22:00",
          },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Exterior Cleaning Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Pressure Washing",
                description: "Professional pressure washing services in Ellenwood, GA and Atlanta. High-pressure cleaning for concrete, driveways, and building exteriors.",
                url: absoluteUrl("/power-washing"),
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Soft Washing",
                description: "Low-pressure soft washing in Ellenwood, GA and Atlanta. Safe chemical treatment for roofs, siding, stucco, and delicate surfaces.",
                url: absoluteUrl("/soft-washing"),
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "House Washing",
                description: "Exterior house washing in Ellenwood, GA and Atlanta. Soft wash removes mold, mildew, and algae from vinyl siding, brick, and stucco.",
                url: absoluteUrl("/services/residential/house-washing"),
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Driveway Cleaning",
                description: "Professional driveway cleaning in Ellenwood, GA and Atlanta. Surface-cleaner pressure washing removes oil stains, dirt, and mildew from concrete.",
                url: absoluteUrl("/services/residential/driveways-sidewalks"),
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Roof Cleaning",
                description: "Safe roof cleaning in Ellenwood, GA and Atlanta. Low-pressure soft wash removes black streaks, algae, and moss without damaging asphalt shingles.",
                url: absoluteUrl("/roof-cleaning"),
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Gutter Cleaning",
                description: "Professional gutter cleaning in Ellenwood, GA and Atlanta. Clears debris and flushes downspouts to keep rainwater moving away from your foundation.",
                url: absoluteUrl("/services/residential/gutters"),
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Power Washing",
                description: "Power washing services in Ellenwood, GA and Atlanta. High-pressure cleaning for driveways, patios, sidewalks, and commercial flatwork.",
                url: absoluteUrl("/power-washing"),
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Residential Pressure Washing",
                description: "Full-service residential pressure washing in Ellenwood, GA and Atlanta. House washing, driveway cleaning, roof cleaning, and soft washing in one visit.",
                url: absoluteUrl("/services/residential/residential-properties"),
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Exterior Cleaning",
                description: "Complete exterior cleaning in Ellenwood, GA and Atlanta. Soft washing, pressure washing, and surface cleaning for residential and commercial properties.",
                url: absoluteUrl("/services/residential"),
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Deck & Fence Cleaning",
                description: "Deck and fence cleaning in Ellenwood, GA and Atlanta. Wood, composite, and vinyl surfaces cleaned and prepped for stain or seal.",
                url: absoluteUrl("/services/residential/decks-fences"),
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Commercial Building Washing",
                description: "Commercial building washing in Ellenwood, GA and Atlanta. Facades, storefronts, and common areas cleaned with soft wash or pressure for your cladding type.",
                url: absoluteUrl("/services/commercial/building-washing"),
              },
            },
          ],
        },
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID(baseUrl),
        url: baseUrl,
        name: businessLegalName,
        publisher: { "@id": ORG_ID(baseUrl) },
      },
    ],
  }
}

export function organizationRef(baseUrl: string) {
  return { "@id": ORG_ID(baseUrl) }
}

export function buildFaqPageJsonLd(items: HomeFaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }
}

export type BreadcrumbItem = { name: string; path: string }

export function buildBreadcrumbListJsonLd(baseUrl: string, items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  }
}

export function buildServiceJsonLd(
  baseUrl: string,
  pathname: string,
  name: string,
  description: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: absoluteUrl(pathname),
    provider: organizationRef(baseUrl),
    areaServed: {
      "@type": "AdministrativeArea",
      name: businessAreaServedDescription,
    },
  }
}

export function defaultLogoAbsoluteUrl(baseUrl: string) {
  return absoluteUrl("/site-tab-icon.png")
}
