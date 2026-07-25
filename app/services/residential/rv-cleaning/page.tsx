"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { getServiceLeafCopy } from "@/data/service-leaf-meta"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"
import { residentialRvCleaningMedia } from "@/data/residential-service-media"

export default function RvCleaningPage() {
  const goQuote = useGoToHomeQuoteSection()
  const leaf = getServiceLeafCopy("rv-cleaning")

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="RV Cleaning Near Me in Ellenwood & Atlanta, GA"
        description="Road film, oxidized fiberglass, and black streaks age the outside; dust, pet hair, and travel grime build up inside. We soft wash the exterior and detail the cabin so your RV is camp-ready inside and out. Serving Ellenwood, GA and Metro Atlanta."
        category="Residential"
        benefits={[
          "Exterior soft wash safe for decals, graphics & fiberglass",
          "Interior cabin cleaning: floors, surfaces & upholstery",
          "Roof, awning & undercarriage rinse included"
        ]}
        onOpenQuoteForm={() => goQuote()}
        {...residentialRvCleaningMedia}
        {...leaf}
        contentRevised="July 2026"
      />
      <Footer />
      <FloatingCallButton />
    </>
  )
}
