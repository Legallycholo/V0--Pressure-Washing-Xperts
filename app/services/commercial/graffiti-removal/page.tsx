"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

export default function GraffitiRemovalPage() {
  const goQuote = useGoToHomeQuoteSection()

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="Graffiti Removal Services"
        description="Expert graffiti removal and surface restoration"
        category="Commercial"
        onOpenQuoteForm={() => goQuote()}
        benefitsAside="contactForm"
      />
      <Footer />
      <FloatingCallButton />
    </>
  )
}
