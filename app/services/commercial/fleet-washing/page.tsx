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
        description="Clean vehicles reflect a company that takes its work seriously. We wash commercial fleets including box trucks, service vehicles, trailers, and vans on a schedule that keeps your brand looking sharp between routes."
        category="Commercial"
        benefits={[
          "Handles box trucks, vans, trailers & service vehicles",
          "Removes road grime, diesel exhaust & bug debris",
          "Scheduled fleet programs with consistent turnaround",
          "On-site washing at your lot or facility",
          "Safe for vehicle graphics, decals & painted surfaces",
          "Licensed & insured professionals"
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
