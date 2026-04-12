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
      <section className="relative pt-header-offset pb-20 overflow-hidden bg-[#0d1b2a]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d1b2a] via-[#1a2c42] to-[#0d1b2a] opacity-90" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand to-brand-light mb-6">
            Our Service Areas
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light leading-relaxed mb-10">
            Pressure Washing Xperts proudly serves homes and businesses across Metro Atlanta and surrounding communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => goQuote()}
              className="bg-brand text-navy px-8 py-4 rounded-lg font-bold text-lg hover:bg-brand-light transition-all transform hover:-translate-y-1 active:scale-[0.98] motion-reduce:transform-none shadow-[0_0_20px_rgba(251,191,36,0.3)] hover:shadow-[0_0_30px_rgba(251,191,36,0.5)]"
            >
              Check My Area
            </button>
            <a 
              href="tel:8004517213" 
              className={`bg-white/10 text-white border-2 border-white/20 px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-navy transition-all ${ctaPress}`}
            >
              Call: (800) 451-7213
            </a>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-24 bg-[#1a2c42]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Communities We Serve
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">
              We bring professional pressure washing equipment and expertise directly to your doorstep. If you don't see your city listed, give us a call!
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {serviceAreas.map((area) => (
              <Link
                key={area.slug}
                href={`/service-areas/${area.slug}`}
                className="bg-navy/50 border border-white/10 rounded-xl p-6 text-center hover:border-brand/40 hover:bg-navy/80 transition-all duration-300 group shadow-lg"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand/10 text-brand mb-4 group-hover:scale-110 transition-transform">
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
      <section className="relative py-20 bg-brand text-navy text-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/10" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
            Ready to Schedule Your Service?
          </h2>
          <p className="text-xl mb-10 opacity-90 font-medium">
            Contact us today for a free, no-obligation estimate on our exterior cleaning services.
          </p>
          <button 
            onClick={() => goQuote()}
            className="bg-navy text-white hover:text-brand px-10 py-4 rounded-xl font-bold text-lg hover:bg-navy-light transition-all transform hover:-translate-y-1 shadow-[0_10px_20px_rgba(13,27,42,0.3)]"
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
