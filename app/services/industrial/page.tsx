"use client"

import { useState } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { ContactFormModal } from "@/components/ContactFormModal"
import { FloatingCallButton } from "@/components/FloatingCallButton"
import { ServiceCategoryHubTemplate } from "@/components/ServiceCategoryHubTemplate"
import { industrialServices } from "@/data/navigation"

export default function IndustrialServicesHubPage() {
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false)

  return (
    <>
      <Header onOpenQuoteForm={() => setIsQuoteFormOpen(true)} />
      <ServiceCategoryHubTemplate
        categoryLabel="Industrial Services"
        title="Industrial Pressure Washing"
        description="Explore industrial service placeholders organized into a repeatable structure for content rollout."
        services={industrialServices}
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

