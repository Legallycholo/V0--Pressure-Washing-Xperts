"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { getServiceLeafCopy } from "@/data/service-leaf-meta"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"
import { residentialDrivewaysSidewalksMedia } from "@/data/residential-service-media"

export default function DrivewaySidewalkPage() {
  const goQuote = useGoToHomeQuoteSection()
  const leaf = getServiceLeafCopy("driveways-sidewalks")
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Driveway & Sidewalk Pressure Washing in Ellenwood, GA",
    description:
      "Professional driveway and sidewalk pressure washing in Ellenwood and Metro Atlanta, removing algae, tire marks, and surface buildup for safer, brighter concrete.",
    serviceType: "Driveway and Sidewalk Pressure Washing",
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
    url: "https://pressurewashingxpert.com/services/residential/driveways-sidewalks",
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="Driveway & Sidewalk Pressure Washing in Ellenwood, GA"
        description="Expert driveway and sidewalk pressure washing in Ellenwood and Metro Atlanta that removes algae, tire marks, and deep surface buildup in a single visit."
        category="Residential"
        benefits={[
          "Commercial surface cleaner for flat concrete",
          "Removes oil, rust, tire marks & algae",
          "Licensed & insured professionals"
        ]}
        onOpenQuoteForm={() => goQuote()}
        {...residentialDrivewaysSidewalksMedia}
        beforeSrc="/before-after/driveway-before.png"
        afterSrc="/before-after/driveway-after.png"
        beforeAlt="Dirty concrete driveway covered in dark algae and tire marks before pressure washing in Ellenwood, GA"
        afterAlt="Bright, clean concrete driveway after professional surface cleaning and pressure washing in Ellenwood, GA"
        comparisonLabel="Driveway Surface Cleaning Results"
        {...leaf}
        contentRevised="April 2026"
      />
      <Footer />
      <FloatingCallButton />
    </>
  )
}
