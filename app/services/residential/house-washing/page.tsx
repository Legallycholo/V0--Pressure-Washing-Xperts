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
        title="House Washing Near Me — Ellenwood & Atlanta, GA"
        description="Professional exterior house washing in Ellenwood GA and Metro Atlanta. We use soft wash house washing techniques to safely clean vinyl siding, brick, stucco, and painted surfaces — removing mold, mildew, and algae without forcing water behind boards. Residential pressure washing you can trust."
        category="Residential"
        benefits={[
          "Soft wash house washing safe for vinyl, brick & stucco",
          "Removes mold, mildew, algae & weathering stains",
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
