"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { getServiceLeafCopy } from "@/data/service-leaf-meta"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

export default function GasStationsPage() {
  const goQuote = useGoToHomeQuoteSection()
  const leaf = getServiceLeafCopy("gas-stations")

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="Gas Station Cleaning"
        description="Gas station forecourts, canopies, and fuel islands take a daily beating from fuel spills, tire marks, and foot traffic. We clean the full site from pump island to building exterior so your location meets brand standards and stays safe for customers."
        category="Commercial"
        benefits={[
          "Fuel spill and grease removal from forecourt concrete",
          "Canopy underside and overhead structure cleaning",
          "Rubber mark removal from pump lane surfaces",
          "Reduces slip hazard from organic buildup",
          "Night or early morning scheduling available",
          "Licensed & insured for commercial fuel sites"
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
