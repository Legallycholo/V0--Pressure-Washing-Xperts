"use client"


import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { getServiceLeafCopy } from "@/data/service-leaf-meta"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

export default function GasStationsPage() {
  const leaf = getServiceLeafCopy("gas-stations")

  return (
    <>
      <Header />
      <ServicePageTemplate
        title="Gas Station Cleaning"
        description="Forecourt-to-building cleaning for fuel spills, tire marks, and buildup so your site meets brand standards and stays safer for customers."
        category="Commercial"
        benefits={[
          "Fuel spill and grease removal from forecourt concrete",
          "Canopy underside and overhead structure cleaning",
          "Reduces slip hazard from organic buildup"
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
