"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const primaryServices = [
  {
    id: "residential",
    title: "Residential Services",
    description:
      "House, driveway, deck, roof, and patio cleaning.",
    href: "/services/residential",
    imageSrc: "/services/home-residential.png",
    imageAlt:
      "Residential backyard concrete patio with outdoor seating, grill, and brick home exterior.",
  },
  {
    id: "commercial",
    title: "Commercial Services",
    description:
      "Storefront, lot, exterior, and sidewalk cleaning.",
    href: "/services/commercial",
    imageSrc: "/services/home-commercial.png",
    imageAlt:
      "Commercial building with block and metal facade, storefront windows, and parking lot.",
  },
]

const supportingServices = [
  {
    id: "pressure-washing",
    title: "Pressure Washing",
    subtitle: "High-pressure surface cleaning",
    description:
      "Cleans heavy buildup from concrete, brick, and other hard surfaces.",
  },
  {
    id: "soft-washing",
    title: "Soft Washing",
    subtitle: "Low-pressure chemical cleaning",
    description:
      "Low-pressure cleaning for roofs, siding, stucco, and other delicate surfaces.",
  },
]

interface ServicesProps {
  onOpenQuoteForm: () => void
}

export function Services({ onOpenQuoteForm }: ServicesProps) {
  return (
    <section id="services" className="py-12 bg-section-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-9">
          <p className="text-brand-yellow font-semibold text-sm uppercase tracking-wider mb-2">
            What We Offer
          </p>
          <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl text-balance">
            Our Professional Services
          </h2>
          <p className="mt-3 text-white/70 max-w-2xl mx-auto text-sm sm:text-base">
            Residential and commercial cleaning with the right method for each surface.
          </p>
        </div>

        {/* Primary Services */}
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
          {primaryServices.map((service, index) => (
            <Link
              key={service.id}
              href={service.href}
              className={`group relative block overflow-hidden rounded-xl animate-fade-in-up stagger-${index + 1}`}
            >
              <div className="absolute inset-0 rounded-xl border border-white/10" />

              <div className="relative p-5 sm:p-6">
                <div className="relative mx-auto mb-3 max-w-lg h-48 overflow-hidden rounded-lg border border-white/10 bg-white/5">
                  <Image
                    src={service.imageSrc}
                    alt={service.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index === 0}
                  />
                </div>

                <h3 className="text-xl font-bold text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-white/75 text-sm leading-relaxed mb-3">
                  {service.description}
                </p>

                <span className="inline-flex items-center gap-1 text-brand-yellow font-semibold text-sm">
                  Learn more
                  <ChevronRight className="size-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Supporting Services */}
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {supportingServices.map((service) => (
            <div
              key={service.id}
              className="rounded-xl border border-white/15 bg-white/5 p-4 sm:p-5"
            >
              <h3 className="text-lg font-bold text-white">{service.title}</h3>
              <p className="mt-1 text-brand-blue-light text-xs uppercase tracking-wide font-semibold">
                {service.subtitle}
              </p>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Section CTA */}
        <div className="mt-10 text-center">
          <p className="text-white/70 mb-4 text-sm sm:text-base">
            Not sure which service you need?
          </p>
          <Button
            onClick={onOpenQuoteForm}
            size="lg"
            className="bg-brand-yellow text-brand-blue-dark font-bold hover:bg-brand-yellow-dark shadow-lg"
          >
            Request a Free Consultation
          </Button>
        </div>
      </div>
    </section>
  )
}
