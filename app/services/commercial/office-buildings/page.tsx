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
        description="Facades, parking structures, entryways, and dumpster areas pressure washed so your property matches tenant and visitor expectations."
        category="Commercial"
        benefits={[
          "Removes environmental staining from building facades",
          "Parking garage and structure surface cleaning",
          "Night and weekend scheduling available"
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
