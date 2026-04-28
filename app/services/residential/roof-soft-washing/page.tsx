"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { getServiceLeafCopy } from "@/data/service-leaf-meta"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

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
      url: "https://pressurewashingxpert.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "2193 Gateway Trl",
        addressLocality: "Ellenwood",
        addressRegion: "GA",
        postalCode: "30294",
        addressCountry: "US",
      },
    },
    url: "https://pressurewashingxpert.com/services/residential/roof-soft-washing",
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="Roof Soft Washing in Ellenwood, GA"
        description="Expert low-pressure soft washing in Ellenwood and Metro Atlanta. We safely remove algae, moss, and black streaks while protecting your asphalt shingles."
        category="Residential"
        benefits={[
          "Low-pressure soft wash safe for asphalt shingles",
          "Kills algae and moss at the root, not just the surface",
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
