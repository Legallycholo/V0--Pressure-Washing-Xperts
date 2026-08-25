"use client"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"
import { ServiceCategoryHubTemplate } from "@/components/templates/ServiceCategoryHubTemplate"
import { commercialServices } from "@/data/navigation"

export default function CommercialServicesHubPage() {

  return (
    <>
      <Header />
      <ServiceCategoryHubTemplate
        categoryLabel="Commercial Services"
        title="Commercial Pressure Washing Services"
        description="Storefronts, facades, parking areas, fleets, and high-traffic sites kept presentable."
        services={commercialServices}
        contentRevised="April 2026"
      />
      <Footer />
      <FloatingCallButton />
    </>
  )
}
