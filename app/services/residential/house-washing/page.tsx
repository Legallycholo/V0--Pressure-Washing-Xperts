"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { getServiceLeafCopy } from "@/data/service-leaf-meta"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"
import { residentialHouseWashingMedia } from "@/data/residential-service-media"

export default function HouseWashingPage() {
  const goQuote = useGoToHomeQuoteSection()
  const leaf = getServiceLeafCopy("house-washing")

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="House Washing Services"
        description="Soft washing for vinyl, hardboard, brick, and painted siding. Safe pressure settings remove mold, mildew, and weathering without damaging your exterior."
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
        {...leaf}
        contentRevised="April 2026"
      />
      <Footer />
      <FloatingCallButton />
    </>
  )
}
