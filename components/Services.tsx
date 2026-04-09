"use client"

import { useState } from "react"
import { Home, Building2, Factory, Droplets, TreePine, Warehouse, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const services = [
  {
    id: "residential",
    icon: Home,
    title: "Residential Cleaning",
    description: "Complete home exterior cleaning including siding, decks, patios, and driveways. Restore your home's curb appeal.",
    features: ["House Washing", "Deck & Patio Cleaning", "Driveway Cleaning", "Fence Cleaning"],
  },
  {
    id: "commercial",
    icon: Building2,
    title: "Commercial Cleaning",
    description: "Professional cleaning services for storefronts, office buildings, parking lots, and commercial properties.",
    features: ["Building Exteriors", "Parking Lots", "Sidewalks", "Signage Cleaning"],
  },
  {
    id: "industrial",
    icon: Factory,
    title: "Industrial Cleaning",
    description: "Heavy-duty cleaning for warehouses, manufacturing facilities, and industrial equipment.",
    features: ["Warehouse Floors", "Equipment Cleaning", "Loading Docks", "Graffiti Removal"],
  },
  {
    id: "roof",
    icon: Droplets,
    title: "Roof Cleaning",
    description: "Safe soft washing techniques to remove algae, moss, and stains without damaging your roof.",
    features: ["Soft Wash Method", "Algae & Moss Removal", "Stain Treatment", "Gutter Cleaning"],
  },
  {
    id: "landscape",
    icon: TreePine,
    title: "HOA & Community",
    description: "Comprehensive cleaning services for homeowner associations and community common areas.",
    features: ["Common Areas", "Pool Decks", "Clubhouses", "Community Signs"],
  },
  {
    id: "masonry",
    icon: Warehouse,
    title: "Masonry & Stone",
    description: "Specialized cleaning for brick, stone, concrete, and other masonry surfaces.",
    features: ["Brick Cleaning", "Stone Restoration", "Concrete Sealing", "Efflorescence Removal"],
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
            From residential homes to industrial facilities, we provide comprehensive pressure washing solutions tailored to your needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
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
              <div className="relative p-6 sm:p-8">
                {/* Image Placeholder */}
                <div className="mb-6 h-40 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 overflow-hidden">
                  <div className="text-white/30 text-sm text-center">
                    <service.icon className="size-12 mx-auto mb-2 opacity-50" />
                    <span>Service Image</span>
                  </div>
                </div>

                {/* Icon */}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-yellow text-brand-blue-dark">
                  <service.icon className="size-6" />
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-yellow transition-colors">
                  {service.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Features List */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-white/60 text-sm">
                      <ChevronRight className="size-4 text-brand-yellow" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Learn More Link */}
                <button
                  onClick={onOpenQuoteForm}
                  className="flex items-center gap-1 text-brand-yellow font-medium text-sm hover:gap-2 transition-all"
                >
                  Get a Quote
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
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
