"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"
import { residentialHouseWashingMedia } from "@/data/residential-service-media"

export default function HouseWashingPage() {
  const goQuote = useGoToHomeQuoteSection()

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="House Washing Services"
        description="Professional exterior house washing to restore your home's beauty. We use soft washing techniques to safely remove dirt, mold, mildew, and stains without damaging your siding or paint."
        category="Residential"
        benefits={[
          "Soft washing for delicate surfaces",
          "Removes mold, mildew, and algae",
          "Eco-friendly cleaning solutions",
          "Protects your home's exterior",
          "Increases curb appeal",
          "Licensed & insured professionals"
        ]}
        onOpenQuoteForm={() => goQuote()}
        {...residentialHouseWashingMedia}
      />
      <Footer />
      <FloatingCallButton />
    </>
  )
}
