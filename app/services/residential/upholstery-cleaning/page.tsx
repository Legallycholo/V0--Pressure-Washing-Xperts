"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { getServiceLeafCopy } from "@/data/service-leaf-meta"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

export default function UpholsteryCleaningPage() {
  const goQuote = useGoToHomeQuoteSection()
  const leaf = getServiceLeafCopy("upholstery-cleaning")

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="Upholstery Cleaning"
        description="Sofas, chairs, and fabric headboards collect body oils, pet dander, and odors that vacuuming cannot remove. We clean upholstered furniture using methods that match the fabric type and leave it dry faster."
        category="Residential"
        benefits={[
          "Safe for most residential upholstery fabrics",
          "Removes body oils, pet dander & embedded soil",
          "Faster drying than steam-only methods",
          "Treats visible stains before full upholstery clean",
          "Works on sofas, chairs, cushions & fabric headboards",
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
