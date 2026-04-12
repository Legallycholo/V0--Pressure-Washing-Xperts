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
        description="Brick, natural stone, and masonry are porous surfaces that collect mold, efflorescence, and embedded grime over time. We clean and restore masonry without acid etching or high-pressure damage to mortar joints."
        category="Residential"
        benefits={[
          "Safe pressure for brick, stone & mortar joints",
          "Removes efflorescence, mold & green algae",
          "No acid wash methods that damage surface",
          "Restores natural stone color and texture",
          "Covers patios, walkways & retaining walls",
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
