"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { ServicePageTemplate } from "@/components/ServicePageTemplate"
import { FloatingCallButton } from "@/components/FloatingCallButton"

export default function DecksFencesPage() {
  const goQuote = useGoToHomeQuoteSection()

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="Decks and Fences"
        description="Restore the natural beauty of your wood decks and fences. Our professional pressure washing removes years of dirt, grime, and weathering to reveal like-new surfaces."
        category="Residential"
        benefits={[
          "Gentle on wood surfaces",
          "Prepares surface for staining/sealing",
          "Removes dirt, mold, and mildew",
          "Extends deck and fence lifespan",
          "Prevents wood rot and decay",
          "Free consultations available"
        ]}
        onOpenQuoteForm={() => goQuote()}
      />
      <Footer />
      <FloatingCallButton />
    </>
  )
}
