"use client"

import { useState } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { ServicePageTemplate } from "@/components/ServicePageTemplate"
import { ContactFormModal } from "@/components/ContactFormModal"
import { FloatingCallButton } from "@/components/FloatingCallButton"

export default function HouseWashingPage() {
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false)

  return (
    <>
      <Header onOpenQuoteForm={() => setIsQuoteFormOpen(true)} />
      <ServicePageTemplate
        title="House Washing Services"
        description="Professional exterior house washing to restore your home's beauty. We use soft washing techniques to safely remove dirt, mold, mildew, and stains without damaging your siding or paint."
        category="Residential"
        benefits={[
          "Soft washing for delicate surfaces",
          "Removes mold, mildew, and algae",
          "Eco-friendly cleaning solutions",
          "Protects your home's exterior",
          "Increases curb appeal",
          "Licensed & insured professionals"
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
