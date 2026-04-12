"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { getServiceLeafCopy } from "@/data/service-leaf-meta"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

export default function HoaServicesPage() {
  const goQuote = useGoToHomeQuoteSection()
  const leaf = getServiceLeafCopy("hoa-services")

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="HOA Services"
        description="HOA boards are responsible for the appearance standards their community expects. We clean entry monuments, sidewalks, pool decks, fences, and common area surfaces on a schedule that aligns with your HOA maintenance calendar."
        category="Commercial"
        benefits={[
          "Entry monument, signage & common area cleaning",
          "Pool deck, fence & sidewalk restoration",
          "Recurring maintenance programs for HOA budgets",
          "Safe for landscaping and residential surroundings",
          "Flexible scheduling around community events",
          "Licensed & insured with a consistent crew"
        ]}
        onOpenQuoteForm={() => goQuote()}
        benefitsAside="contactForm"
        {...leaf}
        contentRevised="April 2026"
      />
      <Footer />
      <FloatingCallButton />
    </>
  )
}
