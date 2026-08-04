"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { getServiceLeafCopy } from "@/data/service-leaf-meta"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

export default function WindowCleaningPage() {
  const goQuote = useGoToHomeQuoteSection()
  const leaf = getServiceLeafCopy("window-cleaning")

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="Window Cleaning"
        description="We clean exterior window glass, frames, and screens streak-free, on their own or bundled with a full house wash."
        category="Residential"
        benefits={[
          "Streak-free exterior glass and frames",
          "Screens and sills cleared of pollen and grit",
          "Licensed & insured professionals"
        ]}
        onOpenQuoteForm={() => goQuote()}
        benefitsAside="contactForm"
        {...leaf}
        contentRevised="August 2026"
      />
      <Footer />
      <FloatingCallButton />
    </>
  )
}
