"use client"

import { useState } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { ServicePageTemplate } from "@/components/ServicePageTemplate"
import { ContactFormModal } from "@/components/ContactFormModal"
import { FloatingCallButton } from "@/components/FloatingCallButton"

export default function DumpsterPadsPage() {
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false)

  return (
    <>
      <Header onOpenQuoteForm={() => setIsQuoteFormOpen(true)} />
      <ServicePageTemplate
        title="Dumpster Pad Cleaning"
        description="Eliminate grease, waste buildup, and odors from your commercial dumpster area."
        category="Commercial"
        benefits={[
          "Removes grease, waste residue & organic buildup",
          "Eliminates foul odors at the source",
          "Pressure washing + commercial degreaser treatment",
          "Helps maintain health code compliance",
          "Scheduled maintenance plans available",
          "Fast, discreet service"
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
