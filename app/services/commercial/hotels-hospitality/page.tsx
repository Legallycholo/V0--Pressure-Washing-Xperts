"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { getServiceLeafCopy } from "@/data/service-leaf-meta"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

export default function HotelsHospitalityPage() {
  const goQuote = useGoToHomeQuoteSection()
  const leaf = getServiceLeafCopy("hotels-hospitality")

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="Hotels & Hospitality Cleaning"
        description="Hotel guests form an impression of your property before they reach the front desk. We clean building exteriors, entry drives, pool decks, porte-cocheres, and loading areas so every arrival looks like a property that cares."
        category="Commercial"
        benefits={[
          "Building facade and exterior surface washing",
          "Pool deck, patio & terrace restoration",
          "Entry drive and parking area cleaning",
          "Removes staining from high-traffic entry surfaces",
          "Early morning scheduling to avoid guest impact",
          "Licensed & insured for hospitality properties"
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
