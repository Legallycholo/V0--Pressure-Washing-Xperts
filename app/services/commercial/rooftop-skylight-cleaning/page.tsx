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
        description="Rooftop HVAC equipment pads, mechanical areas, and skylights collect debris, bird droppings, and algae that reduce light transmission and create maintenance headaches. We clean these areas safely without damaging mechanical components."
        category="Commercial"
        benefits={[
          "Safe cleaning around rooftop HVAC units and curbs",
          "Restores skylight and glazing light transmission",
          "Removes bird droppings, algae & debris buildup",
          "Low-pressure method for fragile skylight frames",
          "Coordination with facility maintenance teams",
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
