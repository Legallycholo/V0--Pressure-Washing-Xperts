"use client"


import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { getServiceLeafCopy } from "@/data/service-leaf-meta"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

export default function CarpetCleaningPage() {
  const leaf = getServiceLeafCopy("carpet-cleaning")

  return (
    <>
      <Header />
      <ServicePageTemplate
        title="Carpet Cleaning"
        description="Deep cleaning lifts embedded dirt, allergens, and traffic patterns using methods matched to your carpet fiber."
        category="Residential"
        benefits={[
          "Removes deep-set soil and allergens",
          "Safe for common residential carpet types",
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
