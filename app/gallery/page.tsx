"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Suspense } from "react"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Gallery } from "@/components/sections/Gallery"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"

function GalleryFallback() {
  return (
    <section className="bg-section-dark py-20" aria-busy="true" aria-label="Loading gallery">
      <div className="mx-auto max-w-7xl px-4 text-center text-white/60 sm:px-6 lg:px-8">
        Loading gallery…
      </div>
    </section>
  )
}

export default function GalleryPage() {
  const goQuote = useGoToHomeQuoteSection()

  return (
    <div className="min-h-screen bg-background">
      <Header onOpenQuoteForm={() => goQuote()} />

      <main className="pt-header-offset">
        <Suspense fallback={<GalleryFallback />}>
          <Gallery variant="full" />
        </Suspense>
      </main>

      <Footer />
      <FloatingCallButton />
    </div>
  )
}
