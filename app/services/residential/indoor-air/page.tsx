"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { getServiceLeafCopy } from "@/data/service-leaf-meta"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

export default function IndoorAirPage() {
  const goQuote = useGoToHomeQuoteSection()
  const leaf = getServiceLeafCopy("indoor-air")

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="Indoor Air Quality"
        description="Indoor air quality affects your family's health every day. We remove dust, allergens, and contaminants from air vents, ductwork, and surfaces so your HVAC circulates clean air instead of recycling buildup."
        category="Residential"
        benefits={[
          "Cleans air vents, returns & ductwork surfaces",
          "Reduces airborne allergens and dust circulation",
          "Improves HVAC efficiency after cleaning",
          "Safe for residential HVAC systems",
          "Helps households with allergies or respiratory conditions",
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
