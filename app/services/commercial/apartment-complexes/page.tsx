"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { getServiceLeafCopy } from "@/data/service-leaf-meta"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

export default function ApartmentComplexesPage() {
  const goQuote = useGoToHomeQuoteSection()
  const leaf = getServiceLeafCopy("apartment-complexes")

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="Apartment Complex Cleaning"
        description="Pressure washing for breezeways, pool decks, dumpster enclosures, parking, and building exteriors across Metro Atlanta multi-family properties."
        category="Commercial"
        benefits={[
          "Handles multi-building and campus-wide properties",
          "Cleans breezeways, pool decks & common areas",
          "Dumpster pad and enclosure degreasing included"
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
