"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

export default function StainCleaningPage() {
  const goQuote = useGoToHomeQuoteSection()

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="Stain Cleaning"
        description="Spot and stain treatment for carpets, upholstery, and other soft surfaces where spills and marks won’t budge with DIY methods. We identify stain type and fiber-safe options before we treat."
        category="Residential"
        benefits={[
          "Targets specific spots without unnecessary whole-room work",
          "Fiber- and fabric-aware treatment approach",
          "Helps improve appearance after food, pet, and traffic stains",
          "Clear guidance on realistic outcomes",
          "Can pair with full carpet or upholstery cleaning",
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
