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
        description="Reliable cleaning solutions for storefronts, business properties, parking areas, and high-traffic commercial spaces."
        services={commercialServices}
        onOpenQuoteForm={() => goQuote()}
      />
      <Footer />
      <FloatingCallButton />
    </>
  )
}
