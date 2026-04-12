"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { getServiceLeafCopy } from "@/data/service-leaf-meta"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

export default function BuildingWashingPage() {
  const goQuote = useGoToHomeQuoteSection()
  const leaf = getServiceLeafCopy("building-washing")

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="Commercial Building Washing"
        description="Mold, atmospheric staining, and pollution leave commercial facades looking run down fast. We pressure wash or soft wash office buildings, retail centers, and commercial properties across Metro Atlanta using the method that suits the surface."
        category="Commercial"
        benefits={[
          "Removes mold, mildew & environmental staining",
          "Safe for brick, stucco, EIFS & metal panels",
          "Soft wash or pressure wash by surface type",
          "Enhances tenant satisfaction & curb appeal",
          "Licensed, bonded & insured",
          "Flexible scheduling including nights & weekends"
        ]}
        onOpenQuoteForm={() => goQuote()}
        imageSrc="/commercial-services/commercial-building-parking-storefront.png"
        imageAlt="Commercial building exterior with tan block walls, blue corrugated metal siding, and tall windows"
        {...leaf}
        contentRevised="April 2026"
      />
      <Footer />
      <FloatingCallButton />
    </>
  )
}
