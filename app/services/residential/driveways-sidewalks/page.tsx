"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { ServicePageTemplate } from "@/components/ServicePageTemplate"
import { FloatingCallButton } from "@/components/FloatingCallButton"

export default function DrivewaySidewalkPage() {
  const goQuote = useGoToHomeQuoteSection()

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="Driveways and Sidewalks"
        description="Professional pressure washing for concrete driveways, sidewalks, and walkways. Remove oil stains, tire marks, dirt, and grime to restore your property's curb appeal."
        category="Residential"
        benefits={[
          "Removes oil stains and tire marks",
          "Eliminates slippery algae buildup",
          "Restores original appearance",
          "Prevents surface deterioration",
          "Increases property value",
          "Safe for all concrete surfaces"
        ]}
        onOpenQuoteForm={() => goQuote()}
      />
      <Footer />
      <FloatingCallButton />
    </>
  )
}
