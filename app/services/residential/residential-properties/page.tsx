"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { getServiceLeafCopy } from "@/data/service-leaf-meta"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

export default function ResidentialPropertiesPage() {
  const goQuote = useGoToHomeQuoteSection()
  const leaf = getServiceLeafCopy("residential-properties")

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="Residential Properties"
        description="Full exterior cleaning from roof to driveway—one crew, one quote, and one coordinated visit."
        category="Residential"
        benefits={[
          "Roof soft washing, house washing & driveway cleaning",
          "Single visit for multiple exterior surfaces",
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
