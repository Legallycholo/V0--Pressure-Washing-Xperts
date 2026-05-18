"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"
import { Button } from "@/components/ui/button"
import { Phone, CheckCircle, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { ctaPress } from "@/lib/ctaInteraction"

const softWashBenefits = [
  "Removes black streaks (Gloeocapsa magma algae) at the root",
  "Kills moss and lichen without high-pressure damage",
  "Safe for asphalt shingles — no granule loss",
  "Results last longer than pressure washing alone",
  "Protects roof warranty by following manufacturer guidelines",
]

const pressureWashingRisks = [
  "Strips protective granules from asphalt shingles",
  "Forces water under flashing and into the attic",
  "Voids most shingle manufacturer warranties",
  "Breaks down adhesive strips that seal shingles",
  "Can loosen ridge caps and seams",
]

export default function RoofCleaningPage() {
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
              Professional Roof Cleaning Services in Ellenwood, GA
            </h1>
            <p className="mx-auto max-w-3xl text-base text-white/80 leading-relaxed mb-8">
              We use low-pressure soft washing — the only method recommended by roofing manufacturers — to safely remove black streaks, algae, moss, and lichen from your roof without causing damage.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={() => goQuote()}
                size="lg"
                className="bg-brand-yellow text-brand-blue-dark font-bold hover:bg-brand-yellow-dark shadow-lg"
              >
                Get a Free Roof Cleaning Estimate
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

        {/* Soft Wash vs Pressure Washing */}
        <section className="py-12 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-brand-blue-dark sm:text-3xl">
                Soft Wash Roof Cleaning vs. Pressure Washing
              </h2>
              <p className="mt-3 text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
                Not all roof cleaning is the same. Understanding the difference protects your biggest investment.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Soft Washing */}
              <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="size-8 text-green-600 shrink-0" aria-hidden />
                  <h3 className="text-xl font-bold text-green-800">Soft Wash Roof Cleaning</h3>
                </div>
                <p className="text-sm text-green-900 mb-4 leading-relaxed">
                  Low-pressure application (under 500 PSI) combined with biodegradable cleaning solutions that kill algae, moss, and mold at the root. This is the method endorsed by the ARMA (Asphalt Roofing Manufacturers Association) and most shingle warranties.
                </p>
                <p className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-2">
                  Why it&apos;s right for roofs:
                </p>
                <ul className="space-y-2">
                  {softWashBenefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2 text-sm text-green-900">
                      <CheckCircle className="size-4 text-green-600 shrink-0 mt-0.5" aria-hidden />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pressure Washing */}
              <div className="bg-red-50 border-2 border-red-400 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="size-8 text-red-600 shrink-0" aria-hidden />
                  <h3 className="text-xl font-bold text-red-800">Pressure Washing a Roof</h3>
                </div>
                <p className="text-sm text-red-900 mb-4 leading-relaxed">
                  High-pressure water (1,500–3,000 PSI) blasts surface stains away but causes serious physical damage to asphalt shingles in the process. Most roofing manufacturers explicitly state that pressure washing voids shingle warranties.
                </p>
                <p className="text-xs font-semibold text-red-700 uppercase tracking-wide mb-2">
                  Risks to your roof:
                </p>
                <ul className="space-y-2">
                  {pressureWashingRisks.map((risk) => (
                    <li key={risk} className="flex items-start gap-2 text-sm text-red-900">
                      <AlertTriangle className="size-4 text-red-500 shrink-0 mt-0.5" aria-hidden />
                      {risk}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="mt-6 text-center text-sm text-gray-500">
              At Pressure Washing Xperts we only use soft washing on roofs — never high-pressure.{" "}
              <Link href="/about/pressure-vs-soft-washing" className="text-brand-blue hover:underline font-medium">
                Learn more about soft washing vs. pressure washing →
              </Link>
            </p>
          </div>
        </section>

        {/* What We Remove */}
        <section className="py-12 bg-section-light">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-brand-blue-dark sm:text-3xl">
                What Our Roof Cleaning Service Removes
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { label: "Black Streaks", detail: "Caused by Gloeocapsa magma algae — the most common roof stain in Georgia." },
                { label: "Moss & Lichen", detail: "Root systems that lift shingles and hold moisture against the deck." },
                { label: "Mold & Mildew", detail: "Dark patches that accelerate shingle breakdown and look unsightly." },
                { label: "Green Algae", detail: "Thrives in shaded, humid areas common throughout Ellenwood and Atlanta." },
              ].map(({ label, detail }) => (
                <div key={label} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                  <h3 className="font-bold text-brand-blue-dark text-base mb-2">{label}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 bg-brand-blue-dark text-white">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold sm:text-3xl mb-4">
              Ready to Schedule Your Roof Cleaning?
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
