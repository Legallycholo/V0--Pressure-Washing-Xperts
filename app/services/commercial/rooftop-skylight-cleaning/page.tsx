"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

export default function RooftopSkylightCleaningPage() {
  const goQuote = useGoToHomeQuoteSection()

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="Rooftop & Skylight Cleaning"
        description="Maximize natural light and maintain a polished building envelope with cleaning for commercial rooftops, skylights, and related glass. Focused on safety, access, and results appropriate for flat roofs and elevated glazing."
        category="Commercial"
        benefits={[
          "Skylights and rooftop glazing that stay clear longer",
          "Suited to offices, retail, and institutional buildings",
          "Mindful of weathering, seals, and access constraints",
          "Improves daylighting and interior appearance",
          "Commercial-scale scheduling and documentation",
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
