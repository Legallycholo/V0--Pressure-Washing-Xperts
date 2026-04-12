"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

export default function CommercialGutterCleaningPage() {
  const goQuote = useGoToHomeQuoteSection()

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="Commercial Gutter Cleaning"
        description="Gutter systems for large buildings, complexes, and multi-tenant properties need routine clearing to prevent overflow, staining, and water damage. We handle scale and access challenges common on commercial sites."
        category="Commercial"
        benefits={[
          "Built for multi-story and large footprints",
          "Reduces overflow and facade staining risks",
          "Maintenance plans for property managers",
          "Coordination with facility schedules",
          "Addresses debris load from trees and roofs",
          "Licensed & insured professionals"
        ]}
        onOpenQuoteForm={() => goQuote()}
        benefitsAside="contactForm"
      />
      <Footer />
      <FloatingCallButton />
    </>
  )
}
