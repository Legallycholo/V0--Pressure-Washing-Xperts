"use client"


import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { getServiceLeafCopy } from "@/data/service-leaf-meta"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

export default function CommercialPostConstructionCleanupPage() {
  const leaf = getServiceLeafCopy("post-construction-cleanup-commercial")

  return (
    <>
      <Header />
      <ServicePageTemplate
        title="Commercial Post-Construction Clean Up"
        description="Dust, drywall residue, paint overspray, adhesive, and window film left behind by builders and subs read as unfinished to tenants and buyers. We clear it from concrete, glass, and facades so the site is ready for turnover."
        category="Commercial"
        benefits={[
          "Removes construction dust & debris from concrete, glass & facades",
          "Safe on new paint, glass & finished surfaces",
          "Turnover-ready scheduling for GCs and developers"
        ]}
        beforeSrc="/commercial-services/post-construction-cleanup-before.png"
        afterSrc="/commercial-services/post-construction-cleanup-after.png"
        beforeAlt="Newly built commercial site with construction dust, debris, and window film on entries and facade"
        afterAlt="Same commercial site with clean entries, glass, and facade after post-construction clean up"
        comparisonLabel="commercial post-construction clean up"
        {...leaf}
        contentRevised="July 2026"
      />
      <Footer />
      <FloatingCallButton />
    </>
  )
}
