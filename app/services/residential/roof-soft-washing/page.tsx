"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { getServiceLeafCopy } from "@/data/service-leaf-meta"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"
import { businessSiteHost, businessSiteUrl } from "@/data/site"

export default function RoofSoftWashingPage() {
  const goQuote = useGoToHomeQuoteSection()
  const leaf = getServiceLeafCopy("roof-soft-washing")
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Roof Soft Washing in Ellenwood, GA",
    description:
      "Expert low-pressure soft washing in Ellenwood and Metro Atlanta. We safely remove algae, moss, and black streaks while protecting your asphalt shingles.",
    serviceType: "Roof Cleaning",
    areaServed: {
      "@type": "City",
      name: "Ellenwood, GA",
    },
    provider: {
      "@type": "LocalBusiness",
      name: "Pressure Washing Xperts",
      telephone: "(800) 451-7213",
      url: `https://${businessSiteHost}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: "2193 Gateway Trl",
        addressLocality: "Ellenwood",
        addressRegion: "GA",
        postalCode: "30294",
        addressCountry: "US",
      },
    },
    url: `${businessSiteUrl}/services/residential/roof-soft-washing`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="Roof Cleaning Near Me in Ellenwood & Atlanta, GA"
        description="Safe soft wash roof cleaning removes algae, moss, lichen, and black streaks from asphalt shingles without high-pressure damage. Our roof cleaning near me service covers Ellenwood GA, Atlanta, Alpharetta, McDonough, and surrounding Metro Atlanta areas."
        category="Residential"
        benefits={[
          "Low-pressure soft wash roof cleaning safe for asphalt shingles",
          "Kills algae, moss & lichen at the root, not just the surface",
          "Licensed & insured professionals"
        ]}
        onOpenQuoteForm={() => goQuote()}
        benefitsAside="contactForm"
        {...leaf}
        contentRevised="April 2026"
      />
      <Footer />
      <FloatingCallButton />
    </>
  )
}
