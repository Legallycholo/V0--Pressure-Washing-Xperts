"use client"

import { useState } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { ContactFormModal } from "@/components/ContactFormModal"
import { FloatingCallButton } from "@/components/FloatingCallButton"
import { Button } from "@/components/ui/button"
import { Phone, Droplets, Gauge } from "lucide-react"

export default function PressureVsSoftWashingPage() {
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false)

  return (
    <>
      <Header onOpenQuoteForm={() => setIsQuoteFormOpen(true)} />
      
      <main className="min-h-screen bg-gradient-to-b from-section-light to-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-brand-blue-dark to-brand-blue text-white py-20 pt-header-offset">
          <div className="absolute inset-0 bg-hero-pattern opacity-10" />
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6">
                Pressure Washing vs. Soft Washing
              </h1>
              <p className="mx-auto max-w-3xl text-lg text-white/80 leading-relaxed">
                Understanding the difference helps us choose the right method for your property
              </p>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Pressure Washing */}
              <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-brand-blue">
                <div className="flex items-center gap-3 mb-6">
                  <Gauge className="size-12 text-brand-blue" />
                  <h2 className="text-3xl font-bold text-brand-blue-dark">
                    Pressure Washing
                  </h2>
                </div>
                <p className="text-lg text-gray-700 mb-6">
                  High-pressure water cleaning for tough, durable surfaces that can withstand intense cleaning power.
                </p>
                <h3 className="font-semibold text-xl mb-3">Best For:</h3>
                <ul className="space-y-2 text-gray-700 mb-6">
                  <li>• Concrete driveways and sidewalks</li>
                  <li>• Parking lots and garages</li>
                  <li>• Heavy-duty industrial surfaces</li>
                  <li>• Brick and stone (when appropriate)</li>
                  <li>• Remove tough stains and grime</li>
                </ul>
                <h3 className="font-semibold text-xl mb-3">Features:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• High PSI (pounds per square inch)</li>
                  <li>• Effective for stubborn stains</li>
                  <li>• Fast cleaning results</li>
                  <li>• Perfect for hard surfaces</li>
                </ul>
              </div>

              {/* Soft Washing */}
              <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-brand-yellow">
                <div className="flex items-center gap-3 mb-6">
                  <Droplets className="size-12 text-brand-yellow" />
                  <h2 className="text-3xl font-bold text-brand-blue-dark">
                    Soft Washing
                  </h2>
                </div>
                <p className="text-lg text-gray-700 mb-6">
                  Low-pressure cleaning with specialized solutions for delicate surfaces that require gentle care.
                </p>
                <h3 className="font-semibold text-xl mb-3">Best For:</h3>
                <ul className="space-y-2 text-gray-700 mb-6">
                  <li>• House siding and exterior walls</li>
                  <li>• Roofs and shingles</li>
                  <li>• Windows and glass surfaces</li>
                  <li>• Wood decks and fences</li>
                  <li>• Painted or delicate surfaces</li>
                </ul>
                <h3 className="font-semibold text-xl mb-3">Features:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Low PSI with cleaning solutions</li>
                  <li>• Kills mold, mildew, and algae</li>
                  <li>• Safe for all surfaces</li>
                  <li>• Long-lasting results</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Expert Approach */}
        <section className="py-16 bg-section-light">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-brand-blue-dark mb-6">
              Our Xpert Approach
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              At Pressure Washing Xperts, we don't believe in a one-size-fits-all approach. 
              Our trained professionals assess each project individually and use the appropriate 
              method—or combination of methods—to deliver the best results while protecting your property.
            </p>
            <div className="bg-brand-yellow/10 p-6 rounded-lg">
              <p className="text-xl font-semibold text-brand-blue-dark">
                "The right technique for the right surface, every time."
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-brand-blue-dark to-brand-blue text-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Not Sure Which Method You Need?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Contact our experts today for a free consultation and quote.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => setIsQuoteFormOpen(true)}
                size="lg"
                className="bg-brand-yellow text-brand-blue-dark font-semibold hover:bg-brand-yellow-dark"
              >
                Get a Free Quote
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-brand-blue-dark"
              >
                <a href="tel:800-451-7213" className="flex items-center gap-2">
                  <Phone className="size-5" />
                  Call Now
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingCallButton />
      <ContactFormModal
        isOpen={isQuoteFormOpen}
        onClose={() => setIsQuoteFormOpen(false)}
      />
    </>
  )
}
