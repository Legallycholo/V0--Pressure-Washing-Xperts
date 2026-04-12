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
        description="Dumpster enclosures and concrete pads accumulate grease, food waste, and biological growth that create odors and health violations. We pressure wash dumpster pads with commercial-grade degreasers so the area stays compliant and sanitary."
        category="Commercial"
        benefits={[
          "Removes grease, food waste & biological buildup",
          "Commercial degreaser application before wash",
          "Eliminates odors at the source, not just the surface",
          "Helps maintain health and municipal compliance",
          "Recurring service programs available",
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
