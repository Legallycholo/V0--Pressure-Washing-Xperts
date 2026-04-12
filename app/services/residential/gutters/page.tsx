"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"
import { residentialGuttersMedia } from "@/data/residential-service-media"

export default function GuttersPage() {
  const goQuote = useGoToHomeQuoteSection()

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="Gutter Cleaning Services"
        description="Expert gutter cleaning and maintenance services"
        category="Residential"
        onOpenQuoteForm={() => goQuote()}
        {...residentialGuttersMedia}
      />
      <Footer />
      <FloatingCallButton />
    </>
  )
}
