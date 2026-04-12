"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { getServiceLeafCopy } from "@/data/service-leaf-meta"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

export default function OfficeBuildingsPage() {
  const goQuote = useGoToHomeQuoteSection()
  const leaf = getServiceLeafCopy("office-buildings")

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="Office Building Pressure Washing"
        description="Your building exterior communicates as much about your business as your lobby does. We pressure wash office building facades, parking structures, entryways, and dumpster areas so your property reflects the quality of the tenants inside."
        category="Commercial"
        benefits={[
          "Removes environmental staining from building facades",
          "Parking garage and structure surface cleaning",
          "Entryway, plaza & lobby exterior restoration",
          "Safe for glass, brick, metal & stucco cladding",
          "Night and weekend scheduling available",
          "Licensed & insured for commercial properties"
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
