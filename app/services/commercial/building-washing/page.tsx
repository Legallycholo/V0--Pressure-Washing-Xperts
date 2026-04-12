"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { ServicePageTemplate } from "@/components/ServicePageTemplate"
import { FloatingCallButton } from "@/components/FloatingCallButton"

export default function BuildingWashingPage() {
  const goQuote = useGoToHomeQuoteSection()

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="Commercial Building Washing"
        description="Professional exterior cleaning for offices, retail centers & commercial properties across Metro Atlanta."
        category="Commercial"
        benefits={[
          "Removes mold, mildew & environmental staining",
          "Safe for brick, stucco, EIFS & metal panels",
          "Soft wash or pressure wash by surface type",
          "Enhances tenant satisfaction & curb appeal",
          "Licensed, bonded & insured",
          "Flexible scheduling including nights & weekends"
        ]}
        onOpenQuoteForm={() => goQuote()}
      />
      <Footer />
      <FloatingCallButton />
    </>
  )
}
