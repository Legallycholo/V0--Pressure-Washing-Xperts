"use client"


import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { getServiceLeafCopy } from "@/data/service-leaf-meta"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"
import { residentialPostConstructionCleanupMedia } from "@/data/residential-service-media"

export default function PostConstructionCleanupPage() {
  const leaf = getServiceLeafCopy("post-construction-cleanup")

  return (
    <>
      <Header />
      <ServicePageTemplate
        title="Post-Construction Clean Up Near Me in Ellenwood & Atlanta, GA"
        description="New builds and renovations leave window film, paint overspray, drywall dust, and construction grime on siding, brick, driveways, and windows. We clear it off so your home is move-in ready. Serving Ellenwood, GA and Metro Atlanta."
        category="Residential"
        benefits={[
          "Lifts drywall dust, paint overspray & adhesive residue",
          "Safe on new siding, brick & concrete",
          "Move-in-ready results before final walkthrough"
        ]}
        {...residentialPostConstructionCleanupMedia}
        {...leaf}
        contentRevised="July 2026"
      />
      <Footer />
      <FloatingCallButton />
    </>
  )
}
