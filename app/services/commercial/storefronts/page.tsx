"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

export default function StorefrontsPage() {
  const goQuote = useGoToHomeQuoteSection()

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="Storefront Washing"
        description="Make a strong first impression with a clean, professional-looking storefront."
        category="Commercial"
        benefits={[
          "Removes grime, mold & atmospheric buildup",
          "Safe for glass, metal & painted surfaces",
          "Soft wash method for delicate finishes",
          "Quick turnaround to minimize business disruption",
          "Enhances customer-facing appearance",
          "Licensed & insured professionals"
        ]}
        onOpenQuoteForm={() => goQuote()}
      />
      <Footer />
      <FloatingCallButton />
    </>
  )
}
