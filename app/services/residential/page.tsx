"use client"

import { useState } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { ContactFormModal } from "@/components/ContactFormModal"
import { FloatingCallButton } from "@/components/FloatingCallButton"
import { ServiceCategoryHubTemplate } from "@/components/ServiceCategoryHubTemplate"
import { residentialServices } from "@/data/navigation"

export default function ResidentialServicesHubPage() {
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false)

  return (
    <>
      <Header onOpenQuoteForm={() => setIsQuoteFormOpen(true)} />
      <ServiceCategoryHubTemplate
        categoryLabel="Residential Services"
        title="Residential Pressure Washing Services"
        description="Safe and effective exterior cleaning for homes, driveways, decks, roofs, and other residential surfaces."
        services={residentialServices}
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

