"use client"

import { useState } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { ContactFormModal } from "@/components/ContactFormModal"
import { FloatingCallButton } from "@/components/FloatingCallButton"
import { ServiceCategoryHubTemplate } from "@/components/ServiceCategoryHubTemplate"
import { commercialServices } from "@/data/navigation"

export default function CommercialServicesHubPage() {
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false)

  return (
    <>
      <Header onOpenQuoteForm={() => setIsQuoteFormOpen(true)} />
      <ServiceCategoryHubTemplate
        categoryLabel="Commercial Services"
        title="Commercial Pressure Washing Services"
        description="Reliable cleaning solutions for storefronts, business properties, parking areas, and high-traffic commercial spaces."
        services={commercialServices}
        onOpenQuoteForm={() => setIsQuoteFormOpen(true)}
      />
      <Footer />
      <FloatingCallButton />
      <ContactFormModal
        isOpen={isQuoteFormOpen}
        onClose={() => setIsQuoteFormOpen(false)}
      />
    </>
  )
}

