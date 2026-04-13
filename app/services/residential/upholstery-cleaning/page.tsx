"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { getServiceLeafCopy } from "@/data/service-leaf-meta"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

export default function UpholsteryCleaningPage() {
  const goQuote = useGoToHomeQuoteSection()
  const leaf = getServiceLeafCopy("upholstery-cleaning")

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="Upholstery Cleaning"
        description="Fabric-matched upholstery cleaning removes oils, dander, and odors vacuuming cannot reach, with faster dry times."
        category="Residential"
        benefits={[
          "Safe for most residential upholstery fabrics",
          "Removes body oils, pet dander & embedded soil",
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
