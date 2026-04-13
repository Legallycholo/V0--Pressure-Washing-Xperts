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
        description="We clean vents and ductwork so your HVAC circulates less dust and fewer allergens."
        category="Residential"
        benefits={[
          "Cleans air vents, returns & ductwork surfaces",
          "Reduces airborne allergens and dust circulation",
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
