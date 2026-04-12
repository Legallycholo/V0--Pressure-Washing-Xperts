"use client"

import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import Link from "next/link"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"
import { MapPin } from "lucide-react"
import { getServiceAreasForNavigation } from "@/data/service-areas"
import { ctaPress } from "@/lib/ctaInteraction"

export default function ServiceAreasPage() {
  const goQuote = useGoToHomeQuoteSection()

  const serviceAreas = getServiceAreasForNavigation()

  return (
    <div className="min-h-screen bg-navy flex flex-col">
      <Header onOpenQuoteForm={() => goQuote()} />
      
      {/* Hero Section */}
      <section className="relative pt-header-offset pb-12 overflow-hidden bg-[#0d1b2a]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d1b2a] via-[#1a2c42] to-[#0d1b2a] opacity-90" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand to-brand-light mb-4">
            Our Service Areas
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto font-light leading-relaxed mb-6">
            Homes and businesses across Metro Atlanta and the nearby towns we list below. Pick your city or send a quote and we will confirm the route.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button 
              onClick={() => goQuote()}
              className="bg-brand text-navy px-6 py-3 rounded-lg font-bold text-base hover:bg-brand-light transition-all transform hover:-translate-y-1 active:scale-[0.98] motion-reduce:transform-none shadow-[0_0_20px_rgba(251,191,36,0.3)] hover:shadow-[0_0_30px_rgba(251,191,36,0.5)]"
            >
              Check My Area
            </button>
            <a 
              href="tel:8004517213" 
              className={`bg-white/10 text-white border-2 border-white/20 px-6 py-3 rounded-lg font-bold text-base hover:bg-white hover:text-navy transition-all ${ctaPress}`}
            >
              Call: (800) 451-7213
            </a>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-14 bg-[#1a2c42]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-9">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Communities We Serve
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto text-base">
              We roll up with the right gear for your surfaces. Do not see your town? Call and we will tell you if the next route covers you.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {serviceAreas.map((area) => (
              <Link
                key={area.slug}
                href={`/service-areas/${area.slug}`}
                className="bg-navy/50 border border-white/10 rounded-xl p-4 text-center hover:border-brand/40 hover:bg-navy/80 transition-all duration-300 group shadow-lg"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand/10 text-brand mb-3 group-hover:scale-110 transition-transform">
                  <MapPin size={24} />
                </div>
                <h3 className="text-lg font-semibold text-white group-hover:text-brand transition-colors">
                  {area.cityName}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner Section */}
      <section className="relative py-12 bg-brand text-navy text-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/10" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-4">
            Want a number for your property?
          </h2>
          <p className="text-lg mb-6 opacity-90 font-medium">
            Free quote, clear scope, no pressure to book on the spot.
          </p>
          <button 
            onClick={() => goQuote()}
            className="bg-navy text-white hover:text-brand px-8 py-3 rounded-xl font-bold text-base hover:bg-navy-light transition-all transform hover:-translate-y-1 shadow-[0_10px_20px_rgba(13,27,42,0.3)]"
          >
            Get a Free Quote
          </button>
        </div>
      </section>

      <Footer />
      <FloatingCallButton />
    </div>
  )
}
