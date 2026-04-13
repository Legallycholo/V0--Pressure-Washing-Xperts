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
        description="Fast removal of spray paint, marker, and tagging from brick, concrete, metal, and painted surfaces before stains set."
        category="Commercial"
        benefits={[
          "Fast response to limit stain penetration time",
          "Works on brick, concrete, metal & painted surfaces",
          "Graffiti-specific agents that protect the substrate"
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
