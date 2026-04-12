"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

export default function ParkingLotsGaragesPage() {
  const goQuote = useGoToHomeQuoteSection()

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="Parking Lot & Garage Cleaning"
        description="Restore the appearance and safety of your parking areas with professional pressure washing."
        category="Commercial"
        benefits={[
          "Removes oil, grease & tire marks",
          "Deep cleans concrete & asphalt surfaces",
          "Improves safety and curb appeal",
          "Night or weekend scheduling available",
          "Commercial-grade surface cleaning equipment",
          "Serving Metro Atlanta businesses"
        ]}
        onOpenQuoteForm={() => goQuote()}
      />
      <Footer />
      <FloatingCallButton />
    </>
  )
}
