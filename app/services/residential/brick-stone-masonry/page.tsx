"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { getServiceLeafCopy } from "@/data/service-leaf-meta"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"
import { residentialBrickStoneMasonryMedia } from "@/data/residential-service-media"

export default function BrickStoneMasonryPage() {
  const goQuote = useGoToHomeQuoteSection()
  const leaf = getServiceLeafCopy("brick-stone-masonry")

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="Brick, Stone & Masonry"
        description="We clean brick, stone, and masonry without acid etching or high-pressure damage to mortar joints."
        category="Residential"
        benefits={[
          "Safe pressure for brick, stone & mortar joints",
          "Removes efflorescence, mold & green algae",
          "Licensed & insured professionals"
        ]}
        onOpenQuoteForm={() => goQuote()}
        {...residentialBrickStoneMasonryMedia}
        {...leaf}
        contentRevised="April 2026"
      />
      <Footer />
      <FloatingCallButton />
    </>
  )
}
