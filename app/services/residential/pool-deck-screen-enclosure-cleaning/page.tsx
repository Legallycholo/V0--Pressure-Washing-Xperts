"use client"


import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { SERVICE_NAMES } from "@/data/service-names"
import { getServiceLeafCopy } from "@/data/service-leaf-meta"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

export default function PoolDeckScreenEnclosureCleaningPage() {
  const leaf = getServiceLeafCopy("pool-deck-screen-enclosure-cleaning")

  return (
    <>
      <Header />
      <ServicePageTemplate
        serviceName={SERVICE_NAMES["/services/residential/pool-deck-screen-enclosure-cleaning"]}
        description="We clean pool decking, cages, and lanai screens to lift algae, mineral scale, and pollen film without harming mesh or coatings."
        category="Residential"
        benefits={[
          "Algae and mineral scale lifted from decking",
          "Screens cleaned without tearing mesh",
          "Licensed & insured professionals"
        ]}
        benefitsAside="contactForm"
        {...leaf}
        contentRevised="August 2026"
      />
      <Footer />
      <FloatingCallButton />
    </>
  )
}
