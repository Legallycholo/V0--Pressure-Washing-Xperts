"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

export default function OdorRemovalPage() {
  const goQuote = useGoToHomeQuoteSection()

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="Odor Removal"
        description="Address stubborn household odors at the source, not just with fragrance. We evaluate soft surfaces and areas where smells linger and recommend a cleaning plan tailored to your home."
        category="Residential"
        benefits={[
          "Targets odor sources, not only masking",
          "Works on carpets, upholstery, and problem zones",
          "Pet- and family-friendly approach",
          "Honest expectations on what can be improved",
          "Coordinated with deep cleaning where needed",
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
