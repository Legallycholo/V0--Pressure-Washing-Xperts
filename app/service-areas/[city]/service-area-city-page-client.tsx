"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"
import { ServiceAreaPageTemplate } from "@/components/templates/ServiceAreaPageTemplate"
import type { ServiceAreaPageContent } from "@/data/service-areas"

interface ServiceAreaCityPageClientProps {
  city: ServiceAreaPageContent
}

export function ServiceAreaCityPageClient({ city }: ServiceAreaCityPageClientProps) {
  const goQuote = useGoToHomeQuoteSection()
  const openQuote = () => goQuote()

  return (
    <>
      <Header onOpenQuoteForm={openQuote} />
      <ServiceAreaPageTemplate city={city} onOpenQuoteForm={openQuote} />
      <Footer />
      <FloatingCallButton />
    </>
  )
}
