"use client"

import Link from "next/link"
import { ArrowRight, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { NavLinkItem } from "@/data/navigation"
import { hubCardLight, ctaPress } from "@/lib/ctaInteraction"

interface ServiceCategoryHubTemplateProps {
  categoryLabel: string
  title: string
  description: string
  services: NavLinkItem[]
  onOpenQuoteForm: () => void
  contentRevised?: string
}

export function ServiceCategoryHubTemplate({
  categoryLabel,
  title,
  description,
  services,
  onOpenQuoteForm,
  contentRevised,
}: ServiceCategoryHubTemplateProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-section-light to-white">
      <section className="relative bg-gradient-to-br from-brand-blue-dark to-brand-blue text-white py-8 sm:py-12 pt-header-offset">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block mb-2 px-3 py-1 bg-brand-yellow text-brand-blue-dark font-semibold rounded-full text-xs sm:text-sm uppercase tracking-wide">
            {categoryLabel}
          </span>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-5xl mb-3">{title}</h1>
          <p className="mx-auto max-w-2xl text-sm sm:text-base text-white/80 leading-relaxed mb-4">{description}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={onOpenQuoteForm}
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
                Call/Text: (800)-451-7213
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-7">
            <p className="text-brand-blue text-xs font-semibold uppercase tracking-[0.2em]">What We Clean</p>
            <h2 className="mt-2 text-2xl font-bold text-brand-blue-dark sm:text-3xl">Our {categoryLabel}</h2>
            <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Scope, benefits, process, and the fastest way to quote.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
            {services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className={hubCardLight}
              >
                <h3 className="text-base sm:text-lg font-semibold text-brand-blue-dark mb-2">{service.label}</h3>
                <p className="text-sm text-gray-600 mb-3">
                  {service.summary ??
                    "See how we approach this service, typical surfaces, and how to request a quote."}
                </p>
                <span className="inline-flex items-center text-brand-blue font-semibold text-sm">
                  Learn More
                  <ArrowRight className="size-4 ml-1" />
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-7 rounded-xl border border-brand-blue/10 bg-white p-4 sm:p-5 text-center">
            <p className="text-gray-600 text-sm sm:text-base">
              Not sure which service? We&apos;ll recommend the best approach for your property.
            </p>
            <Button
              onClick={onOpenQuoteForm}
              className="mt-4 bg-brand-yellow text-brand-blue-dark font-semibold hover:bg-brand-yellow-dark"
            >
              Request a Free Estimate
            </Button>
          </div>
        </div>
      </section>

      {contentRevised ? (
        <p className="text-center text-xs text-gray-500 py-6 px-4">
          Content reviewed {contentRevised}
        </p>
      ) : null}
    </div>
  )
}

