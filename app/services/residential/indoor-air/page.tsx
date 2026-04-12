"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

export default function IndoorAirPage() {
  const goQuote = useGoToHomeQuoteSection()

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="Indoor Air Quality"
        description="Support a healthier home environment by reducing dust, dander, and allergens that circulate through your living space. We focus on cleaning approaches that complement good ventilation and HVAC care."
        category="Residential"
        benefits={[
          "Targets dust and allergen reservoirs in the home",
          "Complements regular HVAC filter maintenance",
          "Ideal for allergy-sensitive households",
          "Whole-home assessment mindset",
          "Clear explanation of what we clean and why",
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
