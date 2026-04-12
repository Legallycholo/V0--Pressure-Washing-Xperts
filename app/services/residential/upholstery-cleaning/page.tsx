"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

export default function UpholsteryCleaningPage() {
  const goQuote = useGoToHomeQuoteSection()

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="Upholstery Cleaning"
        description="Refresh sofas, sectionals, chairs, and other upholstered pieces so they look and feel cleaner for everyday living. We work with fabric-appropriate methods to lift soil and odors."
        category="Residential"
        benefits={[
          "Fabric-aware cleaning for common upholstery types",
          "Reduces embedded dirt and body oils",
          "Helps with pet and household odors",
          "Extends furniture life with proper care",
          "Ideal before gatherings or seasonal deep cleans",
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
