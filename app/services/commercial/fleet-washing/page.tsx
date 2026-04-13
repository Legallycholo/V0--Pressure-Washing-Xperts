"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { getServiceLeafCopy } from "@/data/service-leaf-meta"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

export default function FleetWashingPage() {
  const goQuote = useGoToHomeQuoteSection()
  const leaf = getServiceLeafCopy("fleet-washing")

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="Fleet Washing"
        description="Scheduled on-site washing for box trucks, vans, trailers, and service vehicles so your fleet stays clean between routes."
        category="Commercial"
        benefits={[
          "Handles box trucks, vans, trailers & service vehicles",
          "Scheduled fleet programs with consistent turnaround",
          "On-site washing at your lot or facility"
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
