"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { getServiceLeafCopy } from "@/data/service-leaf-meta"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"
import { residentialGuttersMedia } from "@/data/residential-service-media"

export default function GuttersPage() {
  const goQuote = useGoToHomeQuoteSection()
  const leaf = getServiceLeafCopy("gutters")

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="Gutters"
        description="We clear debris, flush gutters and downspouts, and restore drainage to help prevent fascia and foundation damage."
        category="Residential"
        benefits={[
          "Removes leaves, debris & shingle granule buildup",
          "Flushes downspouts to confirm full drainage",
          "Licensed & insured professionals"
        ]}
        onOpenQuoteForm={() => goQuote()}
        {...residentialGuttersMedia}
        {...leaf}
        contentRevised="April 2026"
      />
      <Footer />
      <FloatingCallButton />
    </>
  )
}
