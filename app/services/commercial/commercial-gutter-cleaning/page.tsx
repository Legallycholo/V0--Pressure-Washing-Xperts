"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { getServiceLeafCopy } from "@/data/service-leaf-meta"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

export default function CommercialGutterCleaningPage() {
  const goQuote = useGoToHomeQuoteSection()
  const leaf = getServiceLeafCopy("commercial-gutter-cleaning")

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="Commercial Gutter Cleaning"
        description="Commercial gutter systems carry far more volume than residential gutters. Blockages cause roof ponding, fascia damage, and interior leaks. We flush and clear commercial gutters and downspouts on a schedule that prevents those problems."
        category="Commercial"
        benefits={[
          "Clears blockages from commercial gutter runs",
          "Flushes downspouts and confirms drainage flow",
          "Prevents roof ponding and fascia deterioration",
          "Available as standalone or with building wash",
          "Documentation of service available on request",
          "Licensed & insured professionals"
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
