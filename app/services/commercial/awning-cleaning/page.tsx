"use client"


import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { SERVICE_NAMES } from "@/data/service-names"
import { getServiceLeafCopy } from "@/data/service-leaf-meta"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

export default function AwningCleaningPage() {
  const leaf = getServiceLeafCopy("awning-cleaning")

  return (
    <>
      <Header />
      <ServicePageTemplate
        serviceName={SERVICE_NAMES["/services/commercial/awning-cleaning"]}
        description="Low-pressure commercial awning cleaning that removes mold, droppings, and film without damaging fabric, vinyl, or metal."
        category="Commercial"
        benefits={[
          "Safe for fabric, vinyl & metal awning types",
          "Removes mold, mildew & bird droppings",
          "Extends awning lifespan with proper cleaning"
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
