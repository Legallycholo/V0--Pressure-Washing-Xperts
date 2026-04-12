"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { getServiceLeafCopy } from "@/data/service-leaf-meta"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

export default function TileAndGroutCleaningPage() {
  const goQuote = useGoToHomeQuoteSection()
  const leaf = getServiceLeafCopy("tile-and-grout-cleaning")

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="Tile & Grout Cleaning"
        description="Grout lines trap dirt and bacteria that mopping does not reach. We deep clean tile and grout with hot water extraction and grout-specific detergents to restore brightness and sanitation to kitchen, bathroom, and entryway floors."
        category="Residential"
        benefits={[
          "Hot water extraction for deep grout cleaning",
          "Removes embedded soil, mold & discoloration",
          "Safe for ceramic, porcelain & natural stone tile",
          "Covers kitchen, bathroom, entryway & laundry areas",
          "Optional grout sealing to protect results",
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
