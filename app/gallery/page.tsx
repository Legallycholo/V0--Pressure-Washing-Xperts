"use client"

import { Suspense, useState } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Gallery } from "@/components/Gallery"
import { ContactFormModal } from "@/components/ContactFormModal"
import { FloatingCallButton } from "@/components/FloatingCallButton"

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
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Header onOpenQuoteForm={() => setIsQuoteFormOpen(true)} />

      <main className="pt-header-offset">
        <Suspense fallback={<GalleryFallback />}>
          <Gallery variant="full" />
        </Suspense>
      </main>

      <Footer />
      <FloatingCallButton />
      <ContactFormModal isOpen={isQuoteFormOpen} onClose={() => setIsQuoteFormOpen(false)} />
    </div>
  )
}
