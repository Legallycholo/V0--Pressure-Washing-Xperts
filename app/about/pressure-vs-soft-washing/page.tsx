"use client"
import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"
import { Button } from "@/components/ui/button"
import { Phone, Droplets, Gauge } from "lucide-react"
import { ctaPress } from "@/lib/ctaInteraction"

export default function PressureVsSoftWashingPage() {
  const goHomeQuote = useGoToHomeQuoteSection()

  return (
    <>
      <Header onOpenQuoteForm={() => goHomeQuote({ target: "contact" })} />
      
      <main className="min-h-screen bg-gradient-to-b from-section-light to-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-brand-blue-dark to-brand-blue text-white py-12 pt-header-offset">
          <div className="absolute inset-0 bg-hero-pattern opacity-10" />
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-4">
                Pressure Washing vs. Soft Washing
              </h1>
              <p className="mx-auto max-w-3xl text-base text-white/80 leading-relaxed">
                Understanding the difference helps us choose the right method for your property
              </p>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-5">
              {/* Pressure Washing */}
              <div className="bg-white p-4 sm:p-5 rounded-lg shadow-lg border-2 border-brand-blue">
                <div className="flex items-center gap-3 mb-3">
                  <Gauge className="size-8 sm:size-10 text-brand-blue" />
                  <h2 className="text-xl sm:text-2xl font-bold text-brand-blue-dark">
                    Pressure Washing
                  </h2>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  High-pressure water for tough, durable surfaces.
                </p>
                <h3 className="font-semibold text-base mb-2">Best For:</h3>
                <ul className="space-y-1.5 text-gray-700 mb-3 text-sm">
                  <li>• Concrete driveways & sidewalks</li>
                  <li>• Parking lots & garages</li>
                  <li>• Brick, stone & heavy-duty hardscapes</li>
                </ul>
                <h3 className="font-semibold text-base mb-2">Features:</h3>
                <ul className="space-y-1.5 text-gray-700 text-sm">
                  <li>• High PSI for stubborn stains</li>
                  <li>• Fast results on hard surfaces</li>
                  <li>• Removes deep grime and buildup</li>
                </ul>
              </div>

              {/* Soft Washing */}
              <div className="bg-white p-4 sm:p-5 rounded-lg shadow-lg border-2 border-brand-yellow">
                <div className="flex items-center gap-3 mb-3">
                  <Droplets className="size-8 sm:size-10 text-brand-yellow" />
                  <h2 className="text-xl sm:text-2xl font-bold text-brand-blue-dark">
                    Soft Washing
                  </h2>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Low-pressure cleaning with specialized solutions for delicate surfaces.
                </p>
                <h3 className="font-semibold text-base mb-2">Best For:</h3>
                <ul className="space-y-1.5 text-gray-700 mb-3 text-sm">
                  <li>• House siding & exterior walls</li>
                  <li>• Roofs & shingles</li>
                  <li>• Wood decks, fences & painted surfaces</li>
                </ul>
                <h3 className="font-semibold text-base mb-2">Features:</h3>
                <ul className="space-y-1.5 text-gray-700 text-sm">
                  <li>• Low PSI with biodegradable solutions</li>
                  <li>• Kills mold, mildew & algae at the root</li>
                  <li>• Long-lasting, surface-safe results</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Expert Approach */}
        <section className="py-10 bg-section-light">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-brand-blue-dark mb-4">
              Our Xpert Approach
            </h2>
            <p className="text-sm sm:text-base text-gray-700 mb-4">
              We assess each project individually and choose the right method—or combination—to protect your property and deliver the best results.
            </p>
            <div className="bg-brand-yellow/10 p-4 rounded-lg">
              <p className="text-lg font-semibold text-brand-blue-dark">
                "The right technique for the right surface, every time."
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-10 bg-gradient-to-br from-brand-blue-dark to-brand-blue text-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold mb-3">
              Not Sure Which Method You Need?
            </h2>
            <p className="text-sm sm:text-base text-white/80 mb-5">
              Free consultation—we&apos;ll recommend the best approach.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={() => goHomeQuote({ target: "contact" })}
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
                <a href="tel:800-451-7213" className={`flex items-center gap-2 ${ctaPress}`}>
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
    </>
  )
}
