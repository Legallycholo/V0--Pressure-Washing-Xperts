"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { getServiceLeafCopy } from "@/data/service-leaf-meta"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

export default function RooftopSkylightCleaningPage() {
  const goQuote = useGoToHomeQuoteSection()
  const leaf = getServiceLeafCopy("rooftop-skylight-cleaning")

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="Rooftop & Skylight Cleaning"
        description="Safe low-pressure cleaning around rooftop HVAC, pads, and skylights to restore light transmission and clear droppings, algae, and debris."
        category="Commercial"
        benefits={[
          "Safe cleaning around rooftop HVAC units and curbs",
          "Restores skylight and glazing light transmission",
          "Low-pressure method for fragile skylight frames"
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
