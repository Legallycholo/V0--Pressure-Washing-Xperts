"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { getServiceLeafCopy } from "@/data/service-leaf-meta"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

export default function CommercialRedClayRemovalPage() {
  const goQuote = useGoToHomeQuoteSection()
  const leaf = getServiceLeafCopy("red-clay-removal-commercial")

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="Commercial Red Clay Removal"
        description="Red clay tracked in by vehicles, equipment, and runoff stains concrete, curbs, entries, and building faces. We remove it with chemistry made for iron-rich soil so your property reads maintained, not muddy."
        category="Commercial"
        benefits={[
          "Removes clay tracked by vehicles & equipment",
          "Safe on concrete, brick, stucco & painted surfaces",
          "Recurring plans for sites near active construction"
        ]}
        onOpenQuoteForm={() => goQuote()}
        beforeSrc="/commercial-services/red-clay-removal-before.png"
        afterSrc="/commercial-services/red-clay-removal-after.png"
        beforeAlt="Storefront entry walkway and drive lane coated in tracked-in Georgia red clay from nearby construction"
        afterAlt="Same storefront entry with clean concrete walkway and clear asphalt lot after red clay removal"
        comparisonLabel="commercial red clay removal"
        {...leaf}
        contentRevised="July 2026"
      />
      <Footer />
      <FloatingCallButton />
    </>
  )
}
