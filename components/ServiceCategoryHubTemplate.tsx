"use client"

import Link from "next/link"
import Image from "next/image"
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
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block mb-4 px-4 py-2 bg-brand-yellow text-brand-blue-dark font-semibold rounded-full text-sm">
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

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-brand-blue-dark mb-8 text-center">Explore Services</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="rounded-xl border border-brand-blue/10 bg-white p-6 shadow-sm hover:border-brand-blue/40 transition-colors"
              >
                <h3 className="text-lg font-semibold text-brand-blue-dark mb-3">{service.label}</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Placeholder copy for this service overview card. Replace with final service summary.
                </p>
                <span className="inline-flex items-center text-brand-blue font-medium">
                  View Details
                  <ArrowRight className="size-4 ml-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

