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
        description="Complete exterior cleaning for residential properties. We handle every surface from roof to driveway so you get one crew, one quote, and one visit instead of coordinating multiple contractors."
        category="Residential"
        benefits={[
          "Roof soft washing, house washing & driveway cleaning",
          "Single visit for multiple exterior surfaces",
          "Consistent technique across all property surfaces",
          "Great for pre-listing prep or spring maintenance",
          "Flexible scheduling for occupied homes",
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
