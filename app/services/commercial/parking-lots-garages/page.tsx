"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { getServiceLeafCopy } from "@/data/service-leaf-meta"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

export default function ParkingLotsGaragesPage() {
  const goQuote = useGoToHomeQuoteSection()
  const leaf = getServiceLeafCopy("parking-lots-garages")

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="Parking Lot & Garage Cleaning"
        description="Oil stains, tire marks, and organic buildup on parking surfaces create both appearance and liability problems. We deep clean asphalt and concrete parking lots and garages using commercial surface cleaning equipment with night or weekend scheduling."
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
        imageSrc="/commercial-services/commercial-building-parking-storefront.png"
        imageAlt="Asphalt commercial parking lot with white markings and wet pavement next to a building"
        {...leaf}
        contentRevised="April 2026"
      />
      <Footer />
      <FloatingCallButton />
    </>
  )
}
