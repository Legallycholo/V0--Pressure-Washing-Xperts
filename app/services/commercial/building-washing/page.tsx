"use client"

import { useState } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { ServicePageTemplate } from "@/components/ServicePageTemplate"
import { ContactFormModal } from "@/components/ContactFormModal"
import { FloatingCallButton } from "@/components/FloatingCallButton"

export default function BuildingWashingPage() {
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false)

  return (
    <>
      <Header onOpenQuoteForm={() => setIsQuoteFormOpen(true)} />
      <ServicePageTemplate
        title="Commercial Building Washing"
        description="Professional exterior cleaning for offices, retail centers & commercial properties across Metro Atlanta."
        category="Commercial"
        benefits={[
          "Removes mold, mildew & environmental staining",
          "Safe for brick, stucco, EIFS & metal panels",
          "Soft wash or pressure wash by surface type",
          "Enhances tenant satisfaction & curb appeal",
          "Licensed, bonded & insured",
          "Flexible scheduling including nights & weekends"
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
