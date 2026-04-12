"use client"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"
import { ServiceCategoryHubTemplate } from "@/components/templates/ServiceCategoryHubTemplate"
import { residentialServices } from "@/data/navigation"
import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

export default function ResidentialServicesHubPage() {
  const goQuote = useGoToHomeQuoteSection()

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServiceCategoryHubTemplate
        categoryLabel="Residential Services"
        title="Residential Pressure Washing Services"
        description="Soft wash and pressure washing for siding, roofs, concrete, decks, and full-property exteriors. One team, clear scope, and results you notice from the street."
        services={residentialServices}
        onOpenQuoteForm={() => goQuote()}
        contentRevised="April 2026"
      />
      <Footer />
      <FloatingCallButton />
    </>
  )
}
