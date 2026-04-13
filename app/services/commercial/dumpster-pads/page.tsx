"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { getServiceLeafCopy } from "@/data/service-leaf-meta"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

export default function DumpsterPadsPage() {
  const goQuote = useGoToHomeQuoteSection()
  const leaf = getServiceLeafCopy("dumpster-pads")

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="Dumpster Pad Cleaning"
        description="Pressure washing with commercial degreasers removes grease, food waste, and biological growth so dumpster pads stay sanitary and compliant."
        category="Commercial"
        benefits={[
          "Removes grease, food waste & biological buildup",
          "Commercial degreaser application before wash",
          "Helps maintain health and municipal compliance"
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
