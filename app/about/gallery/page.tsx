"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Gallery } from "@/components/Gallery"
import { BeforeAfter } from "@/components/BeforeAfter"
import { ContactFormModal } from "@/components/ContactFormModal"
import { FloatingCallButton } from "@/components/FloatingCallButton"

export default function GalleryPage() {
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Header onOpenQuoteForm={() => setIsQuoteFormOpen(true)} />
      
      <main className="pt-header-offset">
        {/* Page Header */}
        <section className="relative bg-gradient-to-br from-brand-blue-dark via-section-dark to-brand-blue text-white py-16">
          <div className="hero-logo-anchor">
            <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              <Image
                src="/images/logo-new.png"
                alt="Pressure Washing Xperts Logo"
                width={800}
                height={280}
                className="hero-logo-image"
                priority
              />
            </Link>
          </div>
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Our Work Gallery</h1>
            <p className="text-xl text-center text-gray-300 max-w-3xl mx-auto">
              Browse our extensive portfolio of pressure washing projects across residential, commercial, and industrial properties.
            </p>
          </div>
        </section>

        {/* Gallery Section */}
        <Gallery />

        {/* Before & After Section */}
        <BeforeAfter onOpenQuoteForm={() => setIsQuoteFormOpen(true)} />
      </main>

      <Footer />
      <FloatingCallButton />
      <ContactFormModal
        isOpen={isQuoteFormOpen}
        onClose={() => setIsQuoteFormOpen(false)}
      />
    </div>
  )
}
