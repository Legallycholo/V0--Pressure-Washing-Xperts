"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

export default function RoofSoftWashingPage() {
  const goQuote = useGoToHomeQuoteSection()

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="Roof Soft Washing"
        description="Specialized soft washing for roofs to safely remove algae, moss, and black streaks. Our low-pressure method protects your shingles while delivering superior cleaning results."
        category="Residential"
        benefits={[
          "Safe for all roof types",
          "Removes algae and moss",
          "Extends roof lifespan",
          "Improves energy efficiency",
          "Low-pressure cleaning method",
          "Manufacturer-approved techniques"
        ]}
        onOpenQuoteForm={() => goQuote()}
      />
      <Footer />
      <FloatingCallButton />
    </>
  )
}
