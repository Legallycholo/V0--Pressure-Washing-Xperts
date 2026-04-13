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
        description="Pressure or soft wash for Metro Atlanta office, retail, and commercial facades—matched to brick, stucco, EIFS, and metal."
        category="Commercial"
        benefits={[
          "Removes mold, mildew & environmental staining",
          "Safe for brick, stucco, EIFS & metal panels",
          "Soft wash or pressure wash by surface type"
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
