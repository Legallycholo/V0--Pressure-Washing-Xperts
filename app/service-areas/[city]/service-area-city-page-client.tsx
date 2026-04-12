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

const CITY_HEADER_UTM_SLUGS = new Set(["alpharetta", "marietta", "roswell"])

export function ServiceAreaCityPageClient({ city }: ServiceAreaCityPageClientProps) {
  const goQuote = useGoToHomeQuoteSection()

  const cityPageUtm = {
    source: "city-page" as const,
    medium: "organic" as const,
    campaign: city.slug,
  }

  const openQuoteWithCityUtm = () => goQuote({ utm: cityPageUtm })
  const headerOpenQuote = CITY_HEADER_UTM_SLUGS.has(city.slug)
    ? openQuoteWithCityUtm
    : () => goQuote()

  return (
    <>
      <Header onOpenQuoteForm={headerOpenQuote} />
      <ServiceAreaPageTemplate city={city} onOpenQuoteForm={openQuoteWithCityUtm} />
      <Footer />
      <FloatingCallButton />
    </>
  )
}

