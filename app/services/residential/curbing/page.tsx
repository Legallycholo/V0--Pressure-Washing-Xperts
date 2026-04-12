"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { getServiceLeafCopy } from "@/data/service-leaf-meta"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"
import { residentialCurbingMedia } from "@/data/residential-service-media"

export default function CurbingPage() {
  const goQuote = useGoToHomeQuoteSection()
  const leaf = getServiceLeafCopy("curbing")

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="Curbing"
        description="Street-facing curbs, gutters, and sidewalks are the first thing visitors see. We clean residential curbing and sidewalk panels to remove algae, dirt, and traffic staining quickly and without damage."
        category="Residential"
        benefits={[
          "Restores concrete curb and sidewalk appearance",
          "Removes algae, dirt & road film from panels",
          "Improves neighborhood curb appeal before selling",
          "Safe for painted curbs and adjacent landscaping",
          "Quick service, usually completed in under an hour",
          "Licensed & insured professionals"
        ]}
        onOpenQuoteForm={() => goQuote()}
        {...residentialCurbingMedia}
        {...leaf}
        contentRevised="April 2026"
      />
      <Footer />
      <FloatingCallButton />
    </>
  )
}
