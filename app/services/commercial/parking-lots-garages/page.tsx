"use client"

import { useState } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { ServicePageTemplate } from "@/components/ServicePageTemplate"
import { ContactFormModal } from "@/components/ContactFormModal"
import { FloatingCallButton } from "@/components/FloatingCallButton"

export default function ParkingLotsGaragesPage() {
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false)

  return (
    <>
      <Header onOpenQuoteForm={() => setIsQuoteFormOpen(true)} />
      <ServicePageTemplate
        title="Parking Lot & Garage Cleaning"
        description="Restore the appearance and safety of your parking areas with professional pressure washing."
        category="Commercial"
        benefits={[
          "Removes oil, grease & tire marks",
          "Deep cleans concrete & asphalt surfaces",
          "Improves safety and curb appeal",
          "Night or weekend scheduling available",
          "Commercial-grade surface cleaning equipment",
          "Serving Metro Atlanta businesses"
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
