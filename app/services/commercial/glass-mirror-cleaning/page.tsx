"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

export default function GlassMirrorCleaningPage() {
  const goQuote = useGoToHomeQuoteSection()

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="Glass & Mirror Cleaning"
        description="Crystal-clear glass and mirrors for offices, storefronts, and lobbies where first impressions matter. We remove fingerprints, film, and environmental buildup on interior and exterior-facing glass."
        category="Commercial"
        benefits={[
          "Storefront and entry glass that invites customers in",
          "Interior partitions, doors, and mirrored surfaces",
          "Streak-aware methods for professional results",
          "Flexible scheduling around business hours",
          "Scales from single suites to multi-story facades",
          "Licensed & insured professionals"
        ]}
        onOpenQuoteForm={() => goQuote()}
        benefitsAside="contactForm"
      />
      <Footer />
      <FloatingCallButton />
    </>
  )
}
