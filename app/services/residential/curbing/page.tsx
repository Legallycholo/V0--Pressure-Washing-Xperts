"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"
import { residentialCurbingMedia } from "@/data/residential-service-media"

export default function CurbingPage() {
  const goQuote = useGoToHomeQuoteSection()

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="Curbing Cleaning Services"
        description="Professional curbing and edging cleaning services"
        category="Residential"
        onOpenQuoteForm={() => goQuote()}
        {...residentialCurbingMedia}
      />
      <Footer />
      <FloatingCallButton />
    </>
  )
}
