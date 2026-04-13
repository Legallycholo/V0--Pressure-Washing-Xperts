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
        description="Decks, ramps, stairwells, and drives pressure washed to cut oil, rubber, and buildup while keeping access open with off-peak scheduling."
        category="Commercial"
        benefits={[
          "Removes oil, grease & tire marks from deck surfaces",
          "Reduces slip hazard from organic growth",
          "Night and off-peak scheduling to maintain access"
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
