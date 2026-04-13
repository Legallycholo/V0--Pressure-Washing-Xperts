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
        description="We eliminate pet, smoke, mildew, and organic odors at the source in flooring, fabric, and walls—not just masking them."
        category="Residential"
        benefits={[
          "Targets pet, smoke, mildew & organic odors",
          "Treats source material, not just the surface",
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
