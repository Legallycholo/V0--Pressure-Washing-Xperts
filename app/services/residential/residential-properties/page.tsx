"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

export default function ResidentialPropertiesPage() {
  const goQuote = useGoToHomeQuoteSection()

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="Residential Properties"
        description="Whole-property cleaning coordination for homeowners who want one trusted team across interior and exterior needs. Bundle priorities (from soft surfaces to outdoor areas) into a clear scope and schedule."
        category="Residential"
        benefits={[
          "Single point of contact for multi-area work",
          "Prioritized plan for your home and budget",
          "Residential-focused scheduling and communication",
          "Combines interior specialty cleaning with exterior services",
          "Transparent scope: what we do on each visit",
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
