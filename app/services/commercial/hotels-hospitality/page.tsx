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
        description="Exteriors, entry drives, pool decks, porte-cocheres, and loading areas washed so arrivals match your hospitality standards."
        category="Commercial"
        benefits={[
          "Building facade and exterior surface washing",
          "Pool deck, patio & terrace restoration",
          "Early morning scheduling to avoid guest impact"
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
