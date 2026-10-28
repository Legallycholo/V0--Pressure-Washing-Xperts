"use client"


import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { SERVICE_NAMES } from "@/data/service-names"
import { getServiceLeafCopy } from "@/data/service-leaf-meta"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

export default function DumpsterPadsPage() {
  const leaf = getServiceLeafCopy("dumpster-pads")

  return (
    <>
      <Header />
      <ServicePageTemplate
        serviceName={SERVICE_NAMES["/services/commercial/dumpster-pads"]}
        description="Pressure washing with commercial degreasers removes grease, food waste, and biological growth so dumpster pads stay sanitary and compliant."
        category="Commercial"
        benefits={[
          "Removes grease, food waste & biological buildup",
          "Commercial degreaser application before wash",
          "Helps maintain health and municipal compliance"
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
