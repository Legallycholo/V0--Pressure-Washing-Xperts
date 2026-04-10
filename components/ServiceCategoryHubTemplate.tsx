"use client"

import Link from "next/link"
import { ArrowRight, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { NavLinkItem } from "@/data/navigation"

interface ServiceCategoryHubTemplateProps {
  categoryLabel: string
  title: string
  description: string
  services: NavLinkItem[]
  onOpenQuoteForm: () => void
}

export function ServiceCategoryHubTemplate({
  categoryLabel,
  title,
  description,
  services,
  onOpenQuoteForm,
}: ServiceCategoryHubTemplateProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-section-light to-white">
      <section className="relative bg-gradient-to-br from-brand-blue-dark to-brand-blue text-white py-20 pt-header-offset">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block mb-4 px-4 py-2 bg-brand-yellow text-brand-blue-dark font-semibold rounded-full text-sm uppercase tracking-wide">
            {categoryLabel}
          </span>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6">{title}</h1>
          <p className="mx-auto max-w-3xl text-lg text-white/80 leading-relaxed mb-8">{description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
              <a href="tel:800-451-7213" className="flex items-center gap-2">
                <Phone className="size-5" />
                Call/Text: (800)-451-7213
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-brand-blue text-xs font-semibold uppercase tracking-[0.2em]">What We Clean</p>
            <h2 className="mt-3 text-3xl font-bold text-brand-blue-dark sm:text-4xl">Our {categoryLabel}</h2>
            <p className="mt-3 text-gray-600 max-w-3xl mx-auto">
              Select a service below to view the dedicated service page. This structure is intentionally simple so it can scale as content is added.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-5">
            {services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="rounded-lg border border-brand-blue/10 bg-white p-5 sm:p-6 shadow-sm hover:border-brand-blue/40 hover:shadow-md transition-all"
              >
                <h3 className="text-base sm:text-lg font-semibold text-brand-blue-dark mb-2">{service.label}</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Structured service placeholder page for upcoming content, FAQs, gallery samples, and pricing context.
                </p>
                <span className="inline-flex items-center text-brand-blue font-semibold text-sm">
                  Learn More
                  <ArrowRight className="size-4 ml-1" />
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-10 rounded-xl border border-brand-blue/10 bg-white p-6 sm:p-7 text-center">
            <p className="text-gray-600">
              Need help choosing the right service? We can recommend the best process for your property type.
            </p>
            <Button
              onClick={onOpenQuoteForm}
              className="mt-5 bg-brand-yellow text-brand-blue-dark font-semibold hover:bg-brand-yellow-dark"
            >
              Request a Free Estimate
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

