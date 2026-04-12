"use client"
import { useGoToHomeQuoteSection } from "@/hooks/useGoToHomeQuoteSection"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Phone } from "lucide-react"
import { ctaPress } from "@/lib/ctaInteraction"
import { navSlogan } from "@/data/site"

export default function WeDoXpertPage() {
  const goHomeQuote = useGoToHomeQuoteSection()

  return (
    <>
      <Header onOpenQuoteForm={() => goHomeQuote({ target: "contact" })} />
      
      <main className="min-h-screen bg-gradient-to-b from-section-light to-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-brand-blue-dark to-brand-blue text-white py-20 pt-header-offset">
          <div className="absolute inset-0 bg-hero-pattern opacity-10" />
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6">
                We Do <span className="text-brand-yellow">Xpert</span>
              </h1>
              <p className="mx-auto max-w-3xl text-lg sm:text-xl text-white/80 leading-relaxed">
                {navSlogan}
              </p>
            </div>
          </div>
        </section>

        {/* About Content */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-brand-blue-dark mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 text-lg text-gray-700">
                  <p>
                    Pressure Washing Xperts was founded with a simple mission: to provide exceptional pressure washing services that exceed customer expectations every time. Our owner brings 14 years of hands-on experience in pressure washing, setting the standard for how we approach every job.
                  </p>
                  <p>
                    Our team of certified professionals brings that expertise to every project, from single-family homes to multi-site commercial work.
                  </p>
                  <p>
                    We believe in using the right techniques and eco-friendly solutions to deliver outstanding results while protecting your property and the environment.
                  </p>
                </div>
              </div>

              <div className="relative h-96 bg-gradient-to-br from-brand-blue/10 to-brand-yellow/10 rounded-lg flex items-center justify-center">
                <p className="text-gray-500 text-sm px-6 text-center">Brand Story Image Placeholder</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-section-light">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-brand-blue-dark mb-12 text-center">
              Why Choose Pressure Washing Xperts?
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Licensed & Insured", desc: "Fully licensed and insured for your peace of mind" },
                { title: "Expert Team", desc: "Certified professionals with years of experience" },
                { title: "Eco-Friendly", desc: "Environmentally safe cleaning solutions" },
                { title: "Quality Guaranteed", desc: "100% satisfaction guarantee on all services" },
                { title: "Competitive Pricing", desc: "Fair, transparent pricing with no hidden fees" },
                { title: "Customer First", desc: "Dedicated to exceptional customer service" },
              ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <CheckCircle2 className="size-10 text-brand-yellow mb-4" />
                  <h3 className="text-xl font-semibold text-brand-blue-dark mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-brand-blue-dark to-brand-blue text-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Experience the Xpert Difference?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Contact us today for a free quote and see why we're the trusted choice for pressure washing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
