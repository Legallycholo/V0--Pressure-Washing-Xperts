"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

export default function TileAndGroutCleaningPage() {
  const goQuote = useGoToHomeQuoteSection()

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="Tile & Grout Cleaning"
        description="Restore kitchens, baths, and tiled floors by lifting grime from grout lines and cleaning tile surfaces properly. Ideal for homeowners tired of dull, darkened grout and hazy tile."
        category="Residential"
        benefits={[
          "Deep clean for porous grout lines",
          "Safe methods for common ceramic and porcelain tile",
          "Improves overall room brightness",
          "Helps protect against rapid re-soiling with proper finish",
          "Discuss sealing options where appropriate",
          "Licensed & insured professionals"
        ]}
        onOpenQuoteForm={() => goQuote()}
        benefitsAside="contactForm"
      />
      <Footer />
      <FloatingCallButton />
    </>
  )
}
