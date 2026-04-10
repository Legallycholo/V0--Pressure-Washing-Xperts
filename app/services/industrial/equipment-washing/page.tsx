"use client"

import { useState } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { ServicePageTemplate } from "@/components/ServicePageTemplate"
import { ContactFormModal } from "@/components/ContactFormModal"
import { FloatingCallButton } from "@/components/FloatingCallButton"

export default function IndustrialEquipmentPage() {
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false)

  return (
    <>
      <Header onOpenQuoteForm={() => setIsQuoteFormOpen(true)} />
      <ServicePageTemplate
        title="Industrial Equipment Washing"
        description="Heavy-duty exterior cleaning for large machinery, equipment, and industrial assets."
        category="Industrial"
        benefits={[
          "Removes grease, oil & industrial residue",
          "Safe for steel, aluminum & coated surfaces",
          "High-pressure & hot water systems available",
          "Helps meet safety & facility inspection standards",
          "On-site service at your location",
          "Licensed, bonded & insured"
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
