"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

export default function BuildingWashingPage() {
  const goQuote = useGoToHomeQuoteSection()

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="Commercial Building Washing"
        description="Professional exterior cleaning for offices, retail centers & commercial properties across Metro Atlanta."
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
      />
      <Footer />
      <FloatingCallButton />
    </>
  )
}
