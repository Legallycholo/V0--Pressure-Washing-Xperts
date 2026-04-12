"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

export default function ApartmentComplexesPage() {
  const goQuote = useGoToHomeQuoteSection()

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="Apartment Complex Cleaning"
        description="Comprehensive pressure washing for apartment communities"
        category="Commercial"
        onOpenQuoteForm={() => goQuote()}
      />
      <Footer />
      <FloatingCallButton />
    </>
  )
}
