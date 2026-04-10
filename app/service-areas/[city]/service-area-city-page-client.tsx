"use client"

import { useState } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { ContactFormModal } from "@/components/ContactFormModal"
import { FloatingCallButton } from "@/components/FloatingCallButton"
import { ServiceAreaPageTemplate } from "@/components/ServiceAreaPageTemplate"
import type { ServiceAreaPageContent } from "@/data/service-areas"

interface ServiceAreaCityPageClientProps {
  city: ServiceAreaPageContent
}

export function ServiceAreaCityPageClient({ city }: ServiceAreaCityPageClientProps) {
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false)

  return (
    <>
      <Header onOpenQuoteForm={() => setIsQuoteFormOpen(true)} />
      <ServiceAreaPageTemplate city={city} onOpenQuoteForm={() => setIsQuoteFormOpen(true)} />
      <Footer />
      <FloatingCallButton />
      <ContactFormModal
        isOpen={isQuoteFormOpen}
        onClose={() => setIsQuoteFormOpen(false)}
      />
    </>
  )
}

