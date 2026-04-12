"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { getServiceLeafCopy } from "@/data/service-leaf-meta"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

export default function RoofSoftWashingPage() {
  const goQuote = useGoToHomeQuoteSection()
  const leaf = getServiceLeafCopy("roof-soft-washing")

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="Roof Soft Washing"
        description="Specialized soft washing for roofs to safely remove algae, moss, and black streaks. Our low-pressure method protects your shingles while delivering superior cleaning results."
        category="Residential"
        benefits={[
          "Low-pressure soft wash safe for asphalt shingles",
          "Kills algae and moss at the root, not just the surface",
          "Removes black streak staining (Gloeocapsa magma)",
          "Extends shingle life by eliminating damaging organisms",
          "Manufacturer-compatible cleaning methods",
          "Licensed & insured professionals"
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
