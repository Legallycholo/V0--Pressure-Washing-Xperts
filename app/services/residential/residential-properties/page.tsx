"use client"


import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { SERVICE_NAMES } from "@/data/service-names"
import { getServiceLeafCopy } from "@/data/service-leaf-meta"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

export default function ResidentialPropertiesPage() {
  const leaf = getServiceLeafCopy("residential-properties")

  return (
    <>
      <Header />
      <ServicePageTemplate
        serviceName={SERVICE_NAMES["/services/residential/residential-properties"]}
        description="Full-service residential pressure washing near you in Ellenwood GA and Metro Atlanta. One crew handles house washing, driveway cleaning, roof cleaning, gutter cleaning, and soft washing, all in one coordinated visit. Home pressure washing done right."
        category="Residential"
        benefits={[
          "Roof soft washing, house washing & driveway cleaning in one visit",
          "Residential power washing for all exterior surfaces",
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
