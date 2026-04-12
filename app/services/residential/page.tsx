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
        description="Safe and effective exterior cleaning for homes, driveways, decks, roofs, and other residential surfaces."
        services={residentialServices}
        onOpenQuoteForm={() => goQuote()}
      />
      <Footer />
      <FloatingCallButton />
    </>
  )
}
