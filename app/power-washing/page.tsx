"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"
import { Button } from "@/components/ui/button"
import { Phone, CheckCircle } from "lucide-react"
import Link from "next/link"
import { ctaPress } from "@/lib/ctaInteraction"
import { RevealGroup, RevealItem } from "@/components/motion/Reveal"

const powerWashingSurfaces = [
  { surface: "Driveways & Sidewalks", detail: "Remove oil stains, tire marks, algae, and years of grime from concrete and asphalt." },
  { surface: "Patios & Pool Decks", detail: "Restore concrete, brick, and paver surfaces to look clean and slip-free." },
  { surface: "Decks & Fences", detail: "High-pressure pre-treatment for wood and composite surfaces before staining or sealing." },
  { surface: "Retaining Walls", detail: "Lift moss, algae, and soil staining from block, stone, and poured concrete walls." },
  { surface: "Building Exteriors", detail: "Brick, block, and concrete facades cleaned with pressure matched to the material." },
  { surface: "Parking Areas", detail: "Commercial lots and residential parking pads stripped of rubber buildup and organic film." },
]

const whyChooseUs = [
  "Licensed and insured with verified coverage, not just a claim",
  "15+ years serving Ellenwood and Metro Atlanta",
  "Commercial-grade equipment matched to each surface",
  "No damage guarantee on all power washing jobs",
  "Flexible scheduling including evenings and weekends",
]

export default function PowerWashingPage() {
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
              Professional Power Washing Services Near You in Ellenwood, GA
            </h1>
            <p className="mx-auto max-w-3xl text-base text-white/80 leading-relaxed mb-8">
              High-pressure power washing service for driveways, concrete, patios, building exteriors, and commercial surfaces. We match the right pressure and method to every surface for a deep clean that lasts.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={() => goQuote()}
                size="lg"
                className="bg-brand-yellow text-brand-blue-dark font-bold hover:bg-brand-yellow-dark shadow-lg"
              >
                Request Callback
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

        {/* Surfaces We Clean */}
        <section className="py-12 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-brand-blue-dark sm:text-3xl">
                Power Washing Services We Offer
              </h2>
              <p className="mt-3 text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
                Not every surface needs the same pressure. We use the right PSI for each job so surfaces get clean without damage.
              </p>
            </div>
            <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" stagger={0.07}>
              {powerWashingSurfaces.map(({ surface, detail }) => (
                <RevealItem key={surface} as="article" className="bg-section-light rounded-xl border border-gray-200 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-brand-blue/30 motion-reduce:hover:translate-y-0">
                  <h3 className="font-bold text-brand-blue-dark text-base mb-2">{surface}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{detail}</p>
                </RevealItem>
              ))}
            </RevealGroup>
            <p className="mt-6 text-center text-sm text-gray-500">
              For roofs, siding, and other delicate surfaces, we use low-pressure soft washing instead.{" "}
              <Link href="/soft-washing" className="text-brand-blue hover:underline font-medium">
                Learn about soft washing →
              </Link>
            </p>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-12 bg-section-light">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-brand-blue-dark sm:text-3xl">
                Why Ellenwood Chooses Pressure Washing Xperts
              </h2>
            </div>
            <ul className="space-y-3">
              {whyChooseUs.map((point) => (
                <li key={point} className="flex items-start gap-3 bg-white rounded-xl border border-gray-200 p-4">
                  <CheckCircle className="size-5 text-green-600 shrink-0 mt-0.5" aria-hidden />
                  <span className="text-sm text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 bg-brand-blue-dark text-white">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold sm:text-3xl mb-4">
              Request Your Free Power Washing Quote
            </h2>
            <p className="text-white/75 mb-8 text-sm sm:text-base">
              Serving Ellenwood, Stockbridge, Decatur, McDonough, Conyers, and all of Metro Atlanta. Licensed &amp; insured.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={() => goQuote()}
                size="lg"
                className="bg-brand-yellow text-brand-blue-dark font-bold hover:bg-brand-yellow-dark shadow-lg"
              >
                Request Callback
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
