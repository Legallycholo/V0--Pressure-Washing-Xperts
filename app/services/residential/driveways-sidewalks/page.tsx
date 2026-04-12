"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { getServiceLeafCopy } from "@/data/service-leaf-meta"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"
import { residentialDrivewaysSidewalksMedia } from "@/data/residential-service-media"

export default function DrivewaySidewalkPage() {
  const goQuote = useGoToHomeQuoteSection()
  const leaf = getServiceLeafCopy("driveways-sidewalks")

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="Driveways and Sidewalks"
        description="Concrete driveways and sidewalks hold oil stains, tire marks, and green algae that make your property look neglected. We use commercial-grade surface cleaners to blast years of buildup off flat concrete in a single visit."
        category="Residential"
        benefits={[
          "Commercial surface cleaner for flat concrete",
          "Removes oil, rust, tire marks & algae",
          "Covers driveways, walkways & steps",
          "Improves traction and appearance",
          "No streaking from inconsistent wand technique",
          "Licensed & insured professionals"
        ]}
        onOpenQuoteForm={() => goQuote()}
        {...residentialDrivewaysSidewalksMedia}
        {...leaf}
        contentRevised="April 2026"
      />
      <Footer />
      <FloatingCallButton />
    </>
  )
}
