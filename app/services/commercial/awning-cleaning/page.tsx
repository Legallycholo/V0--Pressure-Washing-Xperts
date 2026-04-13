"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { getServiceLeafCopy } from "@/data/service-leaf-meta"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

export default function AwningCleaningPage() {
  const goQuote = useGoToHomeQuoteSection()
  const leaf = getServiceLeafCopy("awning-cleaning")

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="Awning Cleaning Services"
        description="Low-pressure commercial awning cleaning that removes mold, droppings, and film without damaging fabric, vinyl, or metal."
        category="Commercial"
        benefits={[
          "Safe for fabric, vinyl & metal awning types",
          "Removes mold, mildew & bird droppings",
          "Extends awning lifespan with proper cleaning"
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
