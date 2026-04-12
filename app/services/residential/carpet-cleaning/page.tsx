"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

export default function CarpetCleaningPage() {
  const goQuote = useGoToHomeQuoteSection()

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="Carpet Cleaning"
        description="Deep carpet cleaning for homeowners who want fresher rooms and longer carpet life. We lift embedded dirt, allergens, and traffic patterns using methods suited to your fiber type and home."
        category="Residential"
        benefits={[
          "Removes deep-set soil and allergens",
          "Safe for common residential carpet types",
          "Helps reduce odors trapped in fibers",
          "Improves appearance of high-traffic areas",
          "Extends the life of your carpeting",
          "Licensed & insured professionals"
        ]}
        onOpenQuoteForm={() => goQuote()}
        benefitsAside="contactForm"
      />
      <Footer />
      <FloatingCallButton />
    </>
  )
}
