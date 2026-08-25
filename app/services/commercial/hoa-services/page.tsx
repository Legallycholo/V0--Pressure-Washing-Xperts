"use client"


import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { getServiceLeafCopy } from "@/data/service-leaf-meta"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

export default function HoaServicesPage() {
  const leaf = getServiceLeafCopy("hoa-services")

  return (
    <>
      <Header />
      <ServicePageTemplate
        title="HOA Services"
        description="Entry monuments, sidewalks, pool decks, fences, and common areas cleaned on a schedule that fits your HOA maintenance calendar."
        category="Commercial"
        benefits={[
          "Entry monument, signage & common area cleaning",
          "Pool deck, fence & sidewalk restoration",
          "Recurring maintenance programs for HOA budgets"
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
