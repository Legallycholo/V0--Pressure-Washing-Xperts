"use client"

import Link from "next/link"
import Image from "next/image"
import { Phone, CheckCircle2, ArrowRight, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ServiceAreaPageContent } from "@/data/service-areas"

interface ServiceAreaPageTemplateProps {
  city: ServiceAreaPageContent
  onOpenQuoteForm: () => void
}

export function ServiceAreaPageTemplate({ city, onOpenQuoteForm }: ServiceAreaPageTemplateProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-section-light to-white">
      <section className="relative bg-gradient-to-br from-brand-blue-dark to-brand-blue text-white py-20 pt-header-offset">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" />
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
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-block mb-4 px-4 py-2 bg-brand-yellow text-brand-blue-dark font-semibold rounded-full text-sm">
              Service Area
            </span>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6">
              {city.hero.headline}
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-white/80 leading-relaxed mb-2">
              {city.hero.subheadline}
            </p>
            <p className="mx-auto max-w-3xl text-sm text-white/70 mb-8">
              Serving {city.cityName}, {city.stateCode} in {city.county}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={onOpenQuoteForm}
                size="lg"
                className="bg-brand-yellow text-brand-blue-dark font-semibold hover:bg-brand-yellow-dark"
              >
                {city.ctaPlaceholders.primary}
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-brand-blue-dark"
              >
                <a href="tel:800-451-7213" className="flex items-center gap-2">
                  <Phone className="size-5" />
                  {city.ctaPlaceholders.secondary}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-brand-blue-dark mb-6">
                Trust the Pros in {city.cityName}
              </h2>
              <ul className="space-y-4">
                {city.trustPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="size-6 text-brand-yellow flex-shrink-0 mt-1" />
                    <span className="text-lg text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-96 bg-gradient-to-br from-brand-blue/10 to-brand-yellow/10 rounded-lg flex items-center justify-center">
              <div className="text-center px-6">
                <MapPin className="size-14 text-brand-blue-dark/50 mx-auto mb-4" />
                <p className="text-gray-600 text-sm">{city.heroImagePlaceholder}</p>
                <p className="text-gray-500 text-xs mt-2">{city.cityMapPlaceholder}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-section-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-blue-dark mb-4">
              Localized Services in {city.cityName}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Structured placeholders for city-specific service messaging and final assets.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {city.localizedServiceCards.map((service) => (
              <div key={service.title} className="rounded-xl border border-brand-blue/10 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-brand-blue-dark mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link href={service.href} className="text-brand-blue font-medium hover:text-brand-blue-dark">
                  View Service
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-blue-dark mb-4">Our Process</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {city.processSteps.map((step, index) => (
              <div key={step.title} className="text-center">
                <div className="mx-auto w-16 h-16 bg-brand-yellow text-brand-blue-dark rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold text-brand-blue-dark mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-section-light">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-brand-blue-dark mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {city.faqPlaceholders.map((faq) => (
              <div key={faq.question} className="rounded-lg border border-brand-blue/10 bg-white p-5">
                <h3 className="font-semibold text-brand-blue-dark mb-2">{faq.question}</h3>
                <p className="text-gray-600 text-sm">{faq.answerPlaceholder}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-brand-blue-dark mb-4">
            Nearby Areas We Also Serve
          </h2>
          <div className="flex flex-wrap gap-3 mb-4">
            {city.nearbyAreaSlugs.map((slug) => (
              <Link
                key={slug}
                href={`/service-areas/${slug}`}
                className="rounded-full border border-brand-blue/20 px-4 py-2 text-sm text-brand-blue hover:bg-brand-blue hover:text-white"
              >
                {slug.replace(/-/g, " ")}
              </Link>
            ))}
          </div>
          <p className="text-sm text-gray-500">{city.cityServiceProofPlaceholder}</p>
          <p className="text-sm text-gray-500 mt-1">{city.beforeAfterGalleryPlaceholder}</p>
          <p className="text-sm text-gray-500 mt-1">{city.leadFormPlaceholder}</p>
          <p className="text-sm text-gray-500 mt-1">{city.trackingPlaceholder}</p>
          <p className="text-sm text-gray-500 mt-1">{city.serviceAvailabilityPlaceholder}</p>
          <p className="text-sm text-gray-500 mt-1">{city.lastUpdatedPlaceholder}</p>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-brand-blue-dark to-brand-blue text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Refresh Your {city.cityName} Property?
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Get your free quote today and lock in your preferred service window.
          </p>
          <Button
            onClick={onOpenQuoteForm}
            size="lg"
            className="bg-brand-yellow text-brand-blue-dark font-semibold hover:bg-brand-yellow-dark"
          >
            Get a Free Quote
            <ArrowRight className="ml-2 size-4" />
          </Button>
        </div>
      </section>
    </div>
  )
}

