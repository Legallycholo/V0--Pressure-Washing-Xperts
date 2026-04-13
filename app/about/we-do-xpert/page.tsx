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
        <section className="relative bg-gradient-to-br from-brand-blue-dark to-brand-blue text-white py-12 pt-header-offset">
          <div className="absolute inset-0 bg-hero-pattern opacity-10" />
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-4">
                We Do <span className="text-brand-yellow">Xpert</span>
              </h1>
              <p className="mx-auto max-w-3xl text-base sm:text-lg text-white/80 leading-relaxed">
                {navSlogan}
              </p>
            </div>
          </div>
        </section>

        {/* About Content */}
        <section className="py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-7 items-center">
              <div>
                <h2 className="text-2xl font-bold text-brand-blue-dark mb-4">
                  Our Story
                </h2>
                <div className="space-y-3 text-base text-gray-700">
                  <p>
                    Founded on one goal: exceptional results, every time. Our owner brings 14 years of hands-on experience, setting the standard for how the crew approaches every project.
                  </p>
                  <p>
                    Right techniques, eco-friendly solutions, and outcomes you can see from the street.
                  </p>
                </div>
              </div>

              <div className="relative flex min-h-72 flex-col items-center justify-center rounded-lg border border-brand-blue/15 bg-gradient-to-br from-brand-blue/10 to-brand-yellow/10 p-6 text-center shadow-sm">
                <Phone className="size-10 text-brand-blue-dark mb-3" aria-hidden />
                <h3 className="text-lg font-bold text-brand-blue-dark mb-2">
                  Ready to talk?
                </h3>
                <p className="text-gray-600 mb-4 max-w-sm text-pretty text-sm">
                  Call for scheduling, pricing, or what to expect on site—we&apos;re happy to help.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="bg-brand-yellow text-brand-blue-dark font-semibold hover:bg-brand-yellow-dark"
                >
                  <a href="tel:800-451-7213" className={`flex items-center gap-2 ${ctaPress}`}>
                    <Phone className="size-5" aria-hidden />
                    Call Now
                  </a>
                </Button>
                <p className="mt-4 text-sm font-medium text-brand-blue-dark">(800)-451-7213</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-10 bg-section-light">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-brand-blue-dark mb-8 text-center">
              Why Choose Pressure Washing Xperts?
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
              {[
                { title: "Licensed & Insured", desc: "Full coverage for your peace of mind" },
                { title: "Expert Team", desc: "Certified professionals, 14+ years" },
                { title: "Eco-Friendly", desc: "Safe, biodegradable solutions" },
                { title: "Quality Guaranteed", desc: "Satisfaction guarantee on all services" },
                { title: "Competitive Pricing", desc: "Fair pricing, no hidden fees" },
                { title: "Customer First", desc: "Dedicated to exceptional service" },
              ].map((item, index) => (
                <div key={index} className="bg-white p-3 sm:p-4 rounded-lg shadow-md">
                  <CheckCircle2 className="size-6 sm:size-8 text-brand-yellow mb-2" />
                  <h3 className="text-sm sm:text-lg font-semibold text-brand-blue-dark mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-10 bg-gradient-to-br from-brand-blue-dark to-brand-blue text-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold mb-3">
              Ready to Experience the Xpert Difference?
            </h2>
            <p className="text-sm sm:text-base text-white/80 mb-5">
              Free quote—see why we&apos;re the trusted choice.
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
