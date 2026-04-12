"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { FloatingCallButton } from "@/components/FloatingCallButton"
import { ServiceAreaPageTemplate } from "@/components/ServiceAreaPageTemplate"
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

