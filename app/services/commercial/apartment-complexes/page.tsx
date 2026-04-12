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
        description="Apartment communities have high-visibility common areas that residents judge daily. We pressure wash breezeways, pool decks, dumpster enclosures, parking areas, and building exteriors for multi-family properties across Metro Atlanta."
        category="Commercial"
        benefits={[
          "Handles multi-building and campus-wide properties",
          "Cleans breezeways, pool decks & common areas",
          "Dumpster pad and enclosure degreasing included",
          "Removes mold, atmospheric staining & tire marks",
          "Maintenance programs with recurring scheduling",
          "Licensed, bonded & insured"
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
