"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Home, Building2, Droplets, Sparkles, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const primaryServices = [
  {
    id: "residential",
    icon: Home,
    title: "Residential Services",
    description:
      "House washing, driveway cleaning, deck restoration, roof soft washing, and patio cleaning.",
    href: "/services/residential",
    imageSrc: "/services/home-residential.png",
    imageAlt:
      "Residential backyard concrete patio with outdoor seating, grill, and brick home exterior.",
    imageLabel: "Residential service image",
  },
  {
    id: "commercial",
    icon: Building2,
    title: "Commercial Services",
    description:
      "Storefronts, parking lots, building exteriors, sidewalks, and high-traffic common areas.",
    href: "/services/commercial",
    imageSrc: "/services/home-commercial.png",
    imageAlt:
      "Commercial building with block and metal facade, storefront windows, and parking lot.",
    imageLabel: "Commercial service image",
  },
]

const supportingServices = [
  {
    id: "pressure-washing",
    icon: Sparkles,
    title: "Pressure Washing",
    subtitle: "High-pressure surface cleaning",
    description:
      "Removes deep grime and buildup from concrete, brick, and other durable surfaces.",
  },
  {
    id: "soft-washing",
    icon: Droplets,
    title: "Soft Washing",
    subtitle: "Low-pressure chemical cleaning",
    description:
      "A gentle approach for roofs, siding, stucco, and other delicate surfaces.",
  },
]

interface ServicesProps {
  onOpenQuoteForm: () => void
}

export function Services({ onOpenQuoteForm }: ServicesProps) {
  const [hoveredService, setHoveredService] = useState<string | null>(null)

  return (
    <section id="services" className="py-20 bg-section-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-brand-yellow font-semibold text-sm uppercase tracking-wider mb-3">
            What We Offer
          </p>
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl text-balance">
            Our Professional Services
          </h2>
          <p className="mt-4 text-white/70 max-w-2xl mx-auto text-lg">
            We focus on two core lines—residential curb appeal and commercial first impressions—with the right mix of pressure and soft washing for each surface.
          </p>
        </div>

        {/* Primary Services */}
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
          {primaryServices.map((service, index) => (
            <div
              key={service.id}
              className={`group relative rounded-xl overflow-hidden transition-all duration-300 cursor-pointer animate-fade-in-up stagger-${index + 1}`}
              style={{ opacity: 0 }}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
            >
              {/* Card Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm" />
              <div className="absolute inset-0 border border-white/10 rounded-xl" />
              
              {/* Hover Effect */}
              <div 
                className={`absolute inset-0 bg-brand-yellow/10 transition-opacity duration-300 ${
                  hoveredService === service.id ? "opacity-100" : "opacity-0"
                }`} 
              />

              {/* Content */}
              <div className="relative p-7 sm:p-9">
                <div className="relative mb-4 h-44 overflow-hidden rounded-lg border border-white/10 bg-white/5 sm:h-48">
                  {"imageSrc" in service && service.imageSrc ? (
                    <Image
                      src={service.imageSrc}
                      alt={service.imageAlt ?? service.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-center text-sm text-white/30">
                      <div>
                        <service.icon className="mx-auto mb-2 size-12 opacity-50" />
                        <span>{service.imageLabel}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-brand-blue-light/20 text-brand-blue-light">
                  <service.icon className="size-6" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-brand-yellow transition-colors">
                  {service.title}
                </h3>
                <p className="text-white/75 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                <Link
                  href={service.href}
                  className="inline-flex items-center gap-1 text-brand-yellow font-semibold text-sm hover:gap-2 transition-all"
                >
                  Learn More
                  <ChevronRight className="size-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Supporting Services */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {supportingServices.map((service) => (
            <div
              key={service.id}
              className="rounded-xl border border-white/15 bg-white/5 p-6 sm:p-7"
            >
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md bg-brand-blue-light/15 text-brand-blue-light">
                <service.icon className="size-5" />
              </div>
              <h3 className="text-xl font-bold text-white">{service.title}</h3>
              <p className="mt-1 text-brand-blue-light text-xs uppercase tracking-wide font-semibold">
                {service.subtitle}
              </p>
              <p className="mt-3 text-sm text-white/70 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Section CTA */}
        <div className="mt-16 text-center">
          <p className="text-white/70 mb-6">
            {"Not sure which service you need? Let us help you find the right solution."}
          </p>
          <Button
            onClick={onOpenQuoteForm}
            size="lg"
            className="bg-brand-yellow text-brand-blue-dark font-bold hover:bg-brand-yellow-dark"
          >
            Request a Free Consultation
          </Button>
        </div>
      </div>
    </section>
  )
}
