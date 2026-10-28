"use client"


import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { SERVICE_NAMES } from "@/data/service-names"
import { getServiceLeafCopy } from "@/data/service-leaf-meta"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"
import { residentialCurbingMedia } from "@/data/residential-service-media"

export default function CurbingPage() {
  const leaf = getServiceLeafCopy("curbing")

  return (
    <>
      <Header />
      <ServicePageTemplate
        serviceName={SERVICE_NAMES["/services/residential/curbing"]}
        description="We clean residential curbs and sidewalks to remove algae, dirt, and traffic staining without damage."
        category="Residential"
        benefits={[
          "Restores concrete curb and sidewalk appearance",
          "Removes algae, dirt & road film from panels",
          "Licensed & insured professionals"
        ]}
        {...residentialCurbingMedia}
        {...leaf}
        contentRevised="April 2026"
      />
      <Footer />
      <FloatingCallButton />
    </>
  )
}
