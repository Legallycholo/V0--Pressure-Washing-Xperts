"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { getServiceLeafCopy } from "@/data/service-leaf-meta"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

export default function GraffitiRemovalPage() {
  const goQuote = useGoToHomeQuoteSection()
  const leaf = getServiceLeafCopy("graffiti-removal")

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="Graffiti Removal Services"
        description="Graffiti left on your building invites more. We respond quickly to remove spray paint, marker, and tagging from brick, concrete, metal, and painted surfaces before the stain sets and becomes permanent."
        category="Commercial"
        benefits={[
          "Fast response to limit stain penetration time",
          "Works on brick, concrete, metal & painted surfaces",
          "Graffiti-specific agents that protect the substrate",
          "Surface restoration after removal where needed",
          "Discreet service to minimize public attention",
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
