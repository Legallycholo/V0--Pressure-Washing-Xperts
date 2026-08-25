"use client"


import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { getServiceLeafCopy } from "@/data/service-leaf-meta"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

export default function GovernmentComplexesPage() {
  const leaf = getServiceLeafCopy("government-complexes")

  return (
    <>
      <Header />
      <ServicePageTemplate
        title="Government Complex Cleaning"
        description="Scheduled washing for courthouses, civic centers, parking, and government-owned buildings, with service records and documentation on request."
        category="Commercial"
        benefits={[
          "Experience with municipal and civic property types",
          "Parking lots, walkways & building exteriors covered",
          "Scheduled maintenance programs with service records"
        ]}
        benefitsAside="contactForm"
        {...leaf}
        contentRevised="April 2026"
      />
      <Footer />
      <FloatingCallButton />
    </>
  )
}
