"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { getServiceLeafCopy } from "@/data/service-leaf-meta"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

export default function ParkingDecksPage() {
  const goQuote = useGoToHomeQuoteSection()
  const leaf = getServiceLeafCopy("parking-decks")

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="Parking Deck Cleaning"
        description="Parking structures collect oil, tire rubber, bird droppings, and concrete dust faster than any flat lot. We pressure wash decks, ramps, stairwells, and drive surfaces to improve safety and appearance without shutting down access."
        category="Commercial"
        benefits={[
          "Removes oil, grease & tire marks from deck surfaces",
          "Cleans ramps, stairwells & structural columns",
          "Improves lane marking visibility after cleaning",
          "Reduces slip hazard from organic growth",
          "Night and off-peak scheduling to maintain access",
          "Commercial-grade surface washing equipment"
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
