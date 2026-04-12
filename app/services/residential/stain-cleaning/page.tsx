"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { getServiceLeafCopy } from "@/data/service-leaf-meta"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

export default function StainCleaningPage() {
  const goQuote = useGoToHomeQuoteSection()
  const leaf = getServiceLeafCopy("stain-cleaning")

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="Stain Cleaning"
        description="Rust, oil, paint, and organic stains on driveways, patios, and walkways are stubborn. We use targeted stain treatment products and pressure washing together to remove the stain without damaging the underlying surface."
        category="Residential"
        benefits={[
          "Treats rust, oil, paint & organic staining",
          "Surface-specific products to avoid substrate damage",
          "Works on concrete, pavers, brick & stone",
          "Better results than pressure washing alone",
          "Stain pre-treatment before full surface wash",
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
