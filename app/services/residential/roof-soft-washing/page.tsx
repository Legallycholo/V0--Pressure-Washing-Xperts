"use client"

import { useState } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { ServicePageTemplate } from "@/components/ServicePageTemplate"
import { ContactFormModal } from "@/components/ContactFormModal"
import { FloatingCallButton } from "@/components/FloatingCallButton"

export default function RoofSoftWashingPage() {
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false)

  return (
    <>
      <Header onOpenQuoteForm={() => setIsQuoteFormOpen(true)} />
      <ServicePageTemplate
        title="Roof Soft Washing"
        description="Specialized soft washing for roofs to safely remove algae, moss, and black streaks. Our low-pressure method protects your shingles while delivering superior cleaning results."
        category="Residential"
        benefits={[
          "Safe for all roof types",
          "Removes algae and moss",
          "Extends roof lifespan",
          "Improves energy efficiency",
          "Low-pressure cleaning method",
          "Manufacturer-approved techniques"
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
