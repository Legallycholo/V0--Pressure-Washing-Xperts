"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { getServiceLeafCopy } from "@/data/service-leaf-meta"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

export default function StorefrontsPage() {
  const goQuote = useGoToHomeQuoteSection()
  const leaf = getServiceLeafCopy("storefronts")

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="Storefront Washing"
        description="Storefront glass, metal, painted surfaces, and entries cleaned so your first impression stays sharp."
        category="Commercial"
        benefits={[
          "Removes grime, mold & atmospheric buildup",
          "Safe for glass, metal & painted surfaces",
          "Soft wash method for delicate finishes"
        ]}
        onOpenQuoteForm={() => goQuote()}
        imageSrc="/commercial-services/commercial-building-parking-storefront.png"
        imageAlt="Storefront entrance with dark blue awning and glass windows on a commercial building facade"
        {...leaf}
        contentRevised="April 2026"
      />
      <Footer />
      <FloatingCallButton />
    </>
  )
}
