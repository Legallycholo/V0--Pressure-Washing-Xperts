"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { getServiceLeafCopy } from "@/data/service-leaf-meta"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

export default function SolarPanelCleaningPage() {
  const goQuote = useGoToHomeQuoteSection()
  const leaf = getServiceLeafCopy("solar-panel-cleaning")

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="Solar Panel Cleaning"
        description="We rinse panels clear of pollen, dust, and bird droppings using soft-bristle, low-pressure methods that protect the glass and seals."
        category="Residential"
        benefits={[
          "Soft-bristle, low-pressure panel rinsing",
          "Pollen and debris film cleared for better output",
          "Licensed & insured professionals"
        ]}
        onOpenQuoteForm={() => goQuote()}
        benefitsAside="contactForm"
        {...leaf}
        contentRevised="August 2026"
      />
      <Footer />
      <FloatingCallButton />
    </>
  )
}
