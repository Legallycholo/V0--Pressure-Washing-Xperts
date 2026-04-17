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
            opens: "00:00",
            closes: "24:00",
          },
        ],
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
  return absoluteUrl("/icon.svg")
}
