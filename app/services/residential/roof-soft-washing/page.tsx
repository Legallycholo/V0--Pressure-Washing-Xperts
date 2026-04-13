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
        description="Low-pressure soft washing removes algae, moss, and black streaks while protecting asphalt shingles."
        category="Residential"
        benefits={[
          "Low-pressure soft wash safe for asphalt shingles",
          "Kills algae and moss at the root, not just the surface",
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
