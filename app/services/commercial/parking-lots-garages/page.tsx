"use client"


import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { SERVICE_NAMES } from "@/data/service-names"
import { getServiceLeafCopy } from "@/data/service-leaf-meta"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

export default function ParkingLotsGaragesPage() {
  const leaf = getServiceLeafCopy("parking-lots-garages")

  return (
    <>
      <Header />
      <ServicePageTemplate
        serviceName={SERVICE_NAMES["/services/commercial/parking-lots-garages"]}
        description="Deep cleaning for asphalt and concrete lots and garages removes oil, tire marks, and organic buildup. Night and weekend scheduling available."
        category="Commercial"
        benefits={[
          "Removes oil, grease & tire marks",
          "Deep cleans concrete & asphalt surfaces",
          "Improves safety and curb appeal"
        ]}
        imageSrc="/commercial-services/commercial-building-parking-storefront.png"
        imageAlt="Asphalt commercial parking lot with white markings and wet pavement next to a building"
        {...leaf}
        contentRevised="April 2026"
      />
      <Footer />
      <FloatingCallButton />
    </>
  )
}
