"use client"


import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { getServiceLeafCopy } from "@/data/service-leaf-meta"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

export default function TileAndGroutCleaningPage() {
  const leaf = getServiceLeafCopy("tile-and-grout-cleaning")

  return (
    <>
      <Header />
      <ServicePageTemplate
        title="Tile & Grout Cleaning"
        description="Hot water extraction and grout-specific detergents deep-clean tile and grout where mopping cannot reach."
        category="Residential"
        benefits={[
          "Hot water extraction for deep grout cleaning",
          "Removes embedded soil, mold & discoloration",
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
