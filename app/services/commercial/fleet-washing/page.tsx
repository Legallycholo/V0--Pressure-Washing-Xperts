"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

export default function FleetWashingPage() {
  const goQuote = useGoToHomeQuoteSection()

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="Fleet Washing"
        description="Keep your commercial vehicles clean and professional-looking with our on-site fleet washing service."
        category="Commercial"
        benefits={[
          "Cleans trucks, vans & commercial vehicles",
          "On-site service at your facility",
          "Removes road grime, chemicals & buildup",
          "Protects paint, decals & vehicle surfaces",
          "Flexible scheduling for fleets of any size",
          "Available nights & weekends"
        ]}
        onOpenQuoteForm={() => goQuote()}
      />
      <Footer />
      <FloatingCallButton />
    </>
  )
}
