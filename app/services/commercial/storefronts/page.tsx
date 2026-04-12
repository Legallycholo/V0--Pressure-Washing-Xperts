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
        description="Customers make a judgment about your business before they walk through the door. We clean storefront glass, metal, painted surfaces, and entry areas to keep your first impression sharp and consistent."
        category="Commercial"
        benefits={[
          "Removes grime, mold & atmospheric buildup",
          "Safe for glass, metal & painted surfaces",
          "Soft wash method for delicate finishes",
          "Quick turnaround to minimize business disruption",
          "Enhances customer-facing appearance",
          "Licensed & insured professionals"
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
