"use client"

import { useState } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { ServicePageTemplate } from "@/components/ServicePageTemplate"
import { ContactFormModal } from "@/components/ContactFormModal"
import { FloatingCallButton } from "@/components/FloatingCallButton"

export default function StorefrontsPage() {
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false)

  return (
    <>
      <Header onOpenQuoteForm={() => setIsQuoteFormOpen(true)} />
      <ServicePageTemplate
        title="Storefront Washing"
        description="Make a strong first impression with a clean, professional-looking storefront."
        category="Commercial"
        benefits={[
          "Removes grime, mold & atmospheric buildup",
          "Safe for glass, metal & painted surfaces",
          "Soft wash method for delicate finishes",
          "Quick turnaround to minimize business disruption",
          "Enhances customer-facing appearance",
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
