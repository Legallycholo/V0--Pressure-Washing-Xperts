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
        description="Clogged gutters cause water backup, fascia damage, and foundation erosion. We flush gutters and downspouts, remove debris, and leave your drainage running the way it should."
        category="Residential"
        benefits={[
          "Removes leaves, debris & shingle granule buildup",
          "Flushes downspouts to confirm full drainage",
          "Prevents fascia rot and foundation water damage",
          "Available as standalone or combined with house wash",
          "Safe ladder handling and gutter-safe cleaning method",
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
