"use client"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"
import { ServiceCategoryHubTemplate } from "@/components/templates/ServiceCategoryHubTemplate"
import { residentialServices } from "@/data/navigation"

export default function ResidentialServicesHubPage() {

  return (
    <>
      <Header />
      <ServiceCategoryHubTemplate
        categoryLabel="Residential Services"
        title="Residential Pressure Washing Services"
        description="Soft wash and pressure washing for siding, roofs, concrete, decks, and full-property exteriors."
        services={residentialServices}
        contentRevised="April 2026"
      />
      <Footer />
      <FloatingCallButton />
    </>
  )
}
