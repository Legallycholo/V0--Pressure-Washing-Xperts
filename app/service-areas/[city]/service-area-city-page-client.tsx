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

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServiceAreaPageTemplate city={city} onOpenQuoteForm={() => goQuote()} />
      <Footer />
      <FloatingCallButton />
    </>
  )
}

