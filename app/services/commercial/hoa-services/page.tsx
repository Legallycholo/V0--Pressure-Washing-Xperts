"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

export default function HoaServicesPage() {
  const goQuote = useGoToHomeQuoteSection()

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="HOA Services"
        description="Comprehensive pressure washing services for homeowner associations"
        category="Commercial"
        onOpenQuoteForm={() => goQuote()}
      />
      <Footer />
      <FloatingCallButton />
    </>
  )
}
