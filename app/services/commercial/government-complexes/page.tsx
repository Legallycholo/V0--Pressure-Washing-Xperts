"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { getServiceLeafCopy } from "@/data/service-leaf-meta"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

export default function GovernmentComplexesPage() {
  const goQuote = useGoToHomeQuoteSection()
  const leaf = getServiceLeafCopy("government-complexes")

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="Government Complex Cleaning"
        description="Scheduled washing for courthouses, civic centers, parking, and government-owned buildings—with service records and documentation on request."
        category="Commercial"
        benefits={[
          "Experience with municipal and civic property types",
          "Parking lots, walkways & building exteriors covered",
          "Scheduled maintenance programs with service records"
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
