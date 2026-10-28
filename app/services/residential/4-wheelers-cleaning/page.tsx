"use client"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { SERVICE_NAMES } from "@/data/service-names"
import { getServiceLeafCopy } from "@/data/service-leaf-meta"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"
import { residential4WheelersCleaningMedia } from "@/data/residential-service-media"

export default function FourWheelersCleaningPage() {
  const leaf = getServiceLeafCopy("4-wheelers-cleaning")

  return (
    <>
      <Header />
      <ServicePageTemplate
        serviceName={SERVICE_NAMES["/services/residential/4-wheelers-cleaning"]}
        description="Georgia red clay, packed trail mud, and grit wear down your suspension, radiator, and plastics after a weekend on the trails. We use controlled pressure, specialized degreasers, and detail brushes to strip heavy buildup without forcing water into air intakes, electrical connectors, or wheel bearings. Serving Ellenwood, GA and Metro Atlanta."
        category="Residential"
        benefits={[
          "Controlled pressure safe for wiring, bearings & radiator fins",
          "Targeted red clay & grease breakdown on suspension & skid plates",
          "Mobile on-site washing at your home, shop, or trailer before storage"
        ]}
        {...residential4WheelersCleaningMedia}
        {...leaf}
        contentRevised="August 2026"
      />
      <Footer />
      <FloatingCallButton />
    </>
  )
}
