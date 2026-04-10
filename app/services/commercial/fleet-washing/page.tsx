"use client"

import { useState } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { ServicePageTemplate } from "@/components/ServicePageTemplate"
import { ContactFormModal } from "@/components/ContactFormModal"
import { FloatingCallButton } from "@/components/FloatingCallButton"

export default function FleetWashingPage() {
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false)

  return (
    <>
      <Header onOpenQuoteForm={() => setIsQuoteFormOpen(true)} />
      <ServicePageTemplate
        title="Fleet Washing"
        description="Keep your commercial vehicles clean and professional-looking with our on-site fleet washing service."
        category="Commercial"
        benefits={[
          "Cleans trucks, vans & commercial vehicles",
          "On-site service at your facility",
          "Removes road grime, chemicals & buildup",
          "Protects paint, decals & vehicle surfaces",
          "Flexible scheduling for fleets of any size",
          "Available nights & weekends"
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
