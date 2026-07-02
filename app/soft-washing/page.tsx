"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"
import { Button } from "@/components/ui/button"
import { Phone, CheckCircle, Droplets } from "lucide-react"
import Link from "next/link"
import { ctaPress } from "@/lib/ctaInteraction"

const softWashSurfaces = [
  { surface: "Roofs (Asphalt Shingles)", detail: "The only safe cleaning method. It removes algae, moss, and black streaks without voiding your warranty." },
  { surface: "House Siding", detail: "Vinyl, hardiplank, wood, and stucco cleaned without forcing water behind boards." },
  { surface: "Painted Surfaces", detail: "Low pressure protects paint from peeling or chipping on wood trim, shutters, and fascia." },
  { surface: "EIFS / Stucco", detail: "Moisture-sensitive cladding cleaned gently without cracking the finish coat." },
  { surface: "Wood Decks & Fences", detail: "Soft washing prep removes mold and algae without raising the grain before staining." },
  { surface: "Screen Enclosures & Lanais", detail: "Delicate screen frames and panels cleaned safely without bending or tearing." },
]

const howItWorks = [
  { step: "1", title: "Inspect the surface", body: "We assess the type of growth, material, and slope before selecting the right cleaning solution and dilution ratio." },
  { step: "2", title: "Apply cleaning solution", body: "Biodegradable detergents are applied at low pressure (under 500 PSI) to kill algae, mold, and bacteria at the cellular level." },
  { step: "3", title: "Dwell and rinse", body: "The solution dwells to break down organic growth, then is rinsed away, taking the staining with it." },
  { step: "4", title: "Spot check & done", body: "We walk the job with you before we leave. Results continue to improve over the following days as residual treatment works." },
]

export default function SoftWashingPage() {
  const goQuote = useGoToHomeQuoteSection()

  return (
    <>
      <Header onOpenQuoteForm={() => goQuote()} />

      <main className="min-h-screen bg-gradient-to-b from-section-light to-white">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-brand-blue-dark to-brand-blue text-white py-14 pt-header-offset">
          <div className="absolute inset-0 bg-hero-pattern opacity-10" />
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-brand-yellow font-semibold text-sm uppercase tracking-wider mb-3">
              Ellenwood, GA &amp; Metro Atlanta
            </p>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-4">
              Professional Soft Washing Services in Ellenwood, GA
            </h1>
            <p className="mx-auto max-w-3xl text-base text-white/80 leading-relaxed mb-8">
              Soft wash near you: low-pressure cleaning with biodegradable solutions that kill algae, mold, and mildew at the root. Safe for roofs, siding, and any surface that can&apos;t handle high-pressure washing.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={() => goQuote()}
                size="lg"
                className="bg-brand-yellow text-brand-blue-dark font-bold hover:bg-brand-yellow-dark shadow-lg"
              >
                Get a Free Soft Washing Estimate
              </Button>
              <a
                href="tel:800-451-7213"
                className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md text-sm font-semibold text-white border border-white/30 hover:bg-white/10 transition-colors ${ctaPress}`}
              >
                <Phone className="size-4" aria-hidden />
                (800) 451-7213
              </a>
            </div>
          </div>
        </section>

        {/* What Is Soft Washing */}
        <section className="py-12 bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-blue/10">
                  <Droplets className="size-8 text-brand-blue" aria-hidden />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-brand-blue-dark sm:text-3xl mb-4">
                  What Is Soft Washing?
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Soft washing uses water pressure under 500 PSI, far below the 1,500 to 3,000 PSI of a standard pressure washer, combined with professional-grade cleaning solutions. The chemistry does the cleaning work, not the force of the water.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  This matters because many surfaces that look dirty aren&apos;t just dirty. They&apos;re colonized by living organisms like algae, mold, mildew, and lichen. High pressure knocks the visible growth off the surface but doesn&apos;t kill the roots, so it grows back faster. Soft washing kills it at the source, so results last 4 to 6 times longer.
                </p>
                <p className="text-sm text-gray-500">
                  Wondering when to use soft washing vs. pressure washing?{" "}
                  <Link href="/about/pressure-vs-soft-washing" className="text-brand-blue hover:underline font-medium">
                    Read our full comparison →
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Surfaces We Soft Wash */}
        <section className="py-12 bg-section-light">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-brand-blue-dark sm:text-3xl">
                Surfaces We Soft Wash
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {softWashSurfaces.map(({ surface, detail }) => (
                <div key={surface} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                  <h3 className="font-bold text-brand-blue-dark text-base mb-2">{surface}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-12 bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-brand-blue-dark sm:text-3xl">
                How Our Soft Washing Process Works
              </h2>
            </div>
            <div className="space-y-4">
              {howItWorks.map(({ step, title, body }) => (
                <div key={step} className="flex gap-4 items-start bg-section-light rounded-xl border border-gray-200 p-5">
                  <div className="flex-shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-yellow text-brand-blue-dark font-bold text-sm">
                    {step}
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-blue-dark text-base mb-1">{title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Services */}
        <section className="py-10 bg-section-light">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg font-bold text-brand-blue-dark mb-4 text-center">Related Services</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link
                href="/roof-cleaning"
                className="flex items-start gap-3 bg-white rounded-xl border border-gray-200 p-4 hover:border-brand-yellow/50 transition-colors"
              >
                <CheckCircle className="size-5 text-brand-blue shrink-0 mt-0.5" aria-hidden />
                <div>
                  <p className="font-semibold text-brand-blue-dark text-sm">Roof Cleaning</p>
                  <p className="text-xs text-gray-500 mt-0.5">Soft wash for asphalt shingles. Removes black streaks and moss safely.</p>
                </div>
              </Link>
              <Link
                href="/power-washing"
                className="flex items-start gap-3 bg-white rounded-xl border border-gray-200 p-4 hover:border-brand-yellow/50 transition-colors"
              >
                <CheckCircle className="size-5 text-brand-blue shrink-0 mt-0.5" aria-hidden />
                <div>
                  <p className="font-semibold text-brand-blue-dark text-sm">Power Washing</p>
                  <p className="text-xs text-gray-500 mt-0.5">High-pressure cleaning for driveways, concrete, and hard surfaces.</p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 bg-brand-blue-dark text-white">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold sm:text-3xl mb-4">
              Schedule Your Soft Washing Service
            </h2>
            <p className="text-white/75 mb-8 text-sm sm:text-base">
              Serving Ellenwood, Stockbridge, Decatur, McDonough, Conyers, and all of Metro Atlanta. Licensed &amp; insured. Free quotes.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={() => goQuote()}
                size="lg"
                className="bg-brand-yellow text-brand-blue-dark font-bold hover:bg-brand-yellow-dark shadow-lg"
              >
                Get a Free Quote
              </Button>
              <a
                href="tel:800-451-7213"
                className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md text-sm font-semibold text-white border border-white/30 hover:bg-white/10 transition-colors ${ctaPress}`}
              >
                <Phone className="size-4" aria-hidden />
                (800) 451-7213
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingCallButton />
    </>
  )
}
