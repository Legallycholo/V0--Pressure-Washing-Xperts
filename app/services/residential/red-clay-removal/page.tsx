"use client"


import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { getServiceLeafCopy } from "@/data/service-leaf-meta"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"
import { residentialRedClayRemovalMedia } from "@/data/residential-service-media"

export default function RedClayRemovalPage() {
  const leaf = getServiceLeafCopy("red-clay-removal")

  return (
    <>
      <Header />
      <ServicePageTemplate
        title="Red Clay Removal Near Me in Ellenwood & Atlanta, GA"
        description="Georgia red clay stains driveways, siding, brick, and curbs fast. We lift red clay splatter and iron-rich soil staining with detergents and pressure matched to each surface, so the orange tint comes out instead of spreading. Serving Ellenwood, GA and Metro Atlanta."
        category="Residential"
        benefits={[
          "Lifts red clay splatter from siding, brick & concrete",
          "Detergents matched to iron-rich soil stains",
          "Licensed & insured professionals"
        ]}
        {...residentialRedClayRemovalMedia}
        {...leaf}
        contentRevised="July 2026"
      />
      <Footer />
      <FloatingCallButton />
    </>
  )
}
