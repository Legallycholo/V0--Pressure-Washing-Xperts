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
        description="We remove mold, mildew, and algae from wood, composite, and vinyl decks and fences without stripping the finish."
        category="Residential"
        benefits={[
          "Safe for wood, composite & vinyl surfaces",
          "Removes mold, algae & weathered gray discoloration",
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
