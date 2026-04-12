"use client"

import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { FloatingCallButton } from "@/components/FloatingCallButton"
import { ServiceCategoryHubTemplate } from "@/components/ServiceCategoryHubTemplate"
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
