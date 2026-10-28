"use client"


import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { SERVICE_NAMES } from "@/data/service-names"
import { getServiceLeafCopy } from "@/data/service-leaf-meta"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"
import { residentialTinyHouseCleaningMedia } from "@/data/residential-service-media"

export default function TinyHouseCleaningPage() {
  const leaf = getServiceLeafCopy("tiny-house-cleaning")

  return (
    <>
      <Header />
      <ServicePageTemplate
        serviceName={SERVICE_NAMES["/services/residential/tiny-house-cleaning"]}
        description="Georgia pollen and humidity build up fast outside; a small footprint means every surface inside shows dust and grime quickly too. We soft wash the exterior and clean the interior top to bottom so your tiny home feels as sharp as it's built. Serving Ellenwood, GA and Metro Atlanta."
        category="Residential"
        benefits={[
          "Exterior soft wash safe for wood, metal & composite siding",
          "Interior deep clean: floors, surfaces & windows",
          "Trailer frame & skirting rinse on wheeled units"
        ]}
        {...residentialTinyHouseCleaningMedia}
        {...leaf}
        contentRevised="July 2026"
      />
      <Footer />
      <FloatingCallButton />
    </>
  )
}
