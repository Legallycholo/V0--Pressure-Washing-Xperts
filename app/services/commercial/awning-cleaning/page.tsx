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
        description="Fabric, vinyl, and metal awnings collect mold, bird droppings, and environmental film quickly. We clean commercial awnings with low-pressure methods that remove buildup without damaging the material or pulling stitching."
        category="Commercial"
        benefits={[
          "Safe for fabric, vinyl & metal awning types",
          "Removes mold, mildew & bird droppings",
          "Restores color without fading from high pressure",
          "Extends awning lifespan with proper cleaning",
          "Quick service to minimize business disruption",
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
