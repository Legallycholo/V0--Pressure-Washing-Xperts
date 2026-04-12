"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"
import { residentialBrickStoneMasonryMedia } from "@/data/residential-service-media"

export default function BrickStoneMasonryPage() {
  const goQuote = useGoToHomeQuoteSection()

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />
      <ServicePageTemplate
        title="Brick, Stone & Masonry Cleaning"
        description="Professional cleaning for brick, stone, and masonry surfaces"
        category="Residential"
        onOpenQuoteForm={() => goQuote()}
        {...residentialBrickStoneMasonryMedia}
      />
      <Footer />
      <FloatingCallButton />
    </>
  )
}
