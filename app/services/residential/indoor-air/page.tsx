"use client"


import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { getServiceLeafCopy } from "@/data/service-leaf-meta"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

export default function IndoorAirPage() {
  const leaf = getServiceLeafCopy("indoor-air")

  return (
    <>
      <Header />
      <ServicePageTemplate
        title="Indoor Air Quality"
        description="We clean vents and ductwork so your HVAC circulates less dust and fewer allergens."
        category="Residential"
        benefits={[
          "Cleans air vents, returns & ductwork surfaces",
          "Reduces airborne allergens and dust circulation",
          "Licensed & insured professionals"
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
