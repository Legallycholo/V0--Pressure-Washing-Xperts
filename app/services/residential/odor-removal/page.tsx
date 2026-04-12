"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { getServiceLeafCopy } from "@/data/service-leaf-meta"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

export default function OdorRemovalPage() {
  const goQuote = useGoToHomeQuoteSection()
  const leaf = getServiceLeafCopy("odor-removal")

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="Odor Removal"
        description="Some odors do not go away with surface cleaning. Pet accidents, smoke, mildew, and organic waste embed into flooring, fabric, and walls. We treat and eliminate odors at the source rather than masking them."
        category="Residential"
        benefits={[
          "Targets pet, smoke, mildew & organic odors",
          "Treats source material, not just the surface",
          "Safe for carpets, upholstery & hard surfaces",
          "No heavy perfume masking agents",
          "Residential and commercial applications",
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
