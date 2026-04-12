"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { getServiceLeafCopy } from "@/data/service-leaf-meta"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"
import { residentialDecksFencesMedia } from "@/data/residential-service-media"

export default function DecksFencesPage() {
  const goQuote = useGoToHomeQuoteSection()
  const leaf = getServiceLeafCopy("decks-fences")

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="Decks and Fences"
        description="Decks and fences take the worst of Georgia's weather. Mold, mildew, and algae build up fast on wood, composite, and vinyl surfaces. We restore the look and extend the life of your outdoor structures without stripping the finish."
        category="Residential"
        benefits={[
          "Safe for wood, composite & vinyl surfaces",
          "Removes mold, algae & weathered gray discoloration",
          "Preserves finish before re-staining or sealing",
          "Cleans fence boards, rails & post bases",
          "Eco-friendly solutions safe for landscaping",
          "Licensed & insured professionals"
        ]}
        onOpenQuoteForm={() => goQuote()}
        {...residentialDecksFencesMedia}
        {...leaf}
        contentRevised="April 2026"
      />
      <Footer />
      <FloatingCallButton />
    </>
  )
}
