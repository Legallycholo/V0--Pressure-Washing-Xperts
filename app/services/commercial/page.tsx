"use client"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"
import { ServiceCategoryHubTemplate } from "@/components/templates/ServiceCategoryHubTemplate"
import { commercialServices } from "@/data/navigation"
import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

export default function CommercialServicesHubPage() {
  const goQuote = useGoToHomeQuoteSection()

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServiceCategoryHubTemplate
        categoryLabel="Commercial Services"
        title="Commercial Pressure Washing Services"
        description="Storefronts, facades, parking areas, fleets, and high-traffic sites kept presentable."
        services={commercialServices}
        onOpenQuoteForm={() => goQuote()}
        contentRevised="April 2026"
      />
      <Footer />
      <FloatingCallButton />
    </>
  )
}
