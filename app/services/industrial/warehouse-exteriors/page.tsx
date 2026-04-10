"use client"

import { useState } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { ServicePageTemplate } from "@/components/ServicePageTemplate"
import { ContactFormModal } from "@/components/ContactFormModal"
import { FloatingCallButton } from "@/components/FloatingCallButton"

export default function WarehouseExteriorsPage() {
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false)

  return (
    <>
      <Header onOpenQuoteForm={() => setIsQuoteFormOpen(true)} />
      <ServicePageTemplate
        title="Warehouse Exterior Washing"
        description="Professional large-scale exterior cleaning for warehouses, distribution centers, and industrial facilities."
        category="Industrial"
        benefits={[
          "Cleans large building facades & dock areas",
          "Removes mold, algae & environmental staining",
          "Safe for metal panels, concrete block & masonry",
          "Soft wash or high-pressure by surface type",
          "Commercial-grade equipment handles any scale",
          "Serving Metro Atlanta industrial properties"
        ]}
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
