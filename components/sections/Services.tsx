"use client"

import Image from "next/image"
import Link from "next/link"
import {
  Building2,
  ChevronRight,
  Cloud,
  Droplets,
  Fence,
  Home as HomeIcon,
  Phone,
  Square,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal"
import { ctaPress } from "@/lib/ctaInteraction"
import { businessPhoneDisplay, businessPhoneTelHref } from "@/data/site"

/**
 * Core services that match the Google Ads keyword set + landing intent.
 * Each card links to the existing residential/commercial leaf page and offers
 * a "Call for Pricing" action.
 */
const topFiveServices = [
  {
    id: "house-washing",
    title: "House Washing",
    description:
      "Remove dirt, mold, and mildew from your home's exterior safely with soft wash for siding and trim.",
    href: "/services/residential/house-washing",
    Icon: HomeIcon,
  },
  {
    id: "driveway-concrete",
    title: "Driveway & Concrete Cleaning",
    description:
      "Restore your driveway, walkways, and concrete surfaces with surface-cleaner pressure washing.",
    href: "/services/residential/driveways-sidewalks",
    Icon: Square,
  },
  {
    id: "roof-soft-wash",
    title: "Roof Soft Wash",
    description:
      "Safe low-pressure roof cleaning that won't damage shingles — lifts black streaks, algae, and moss.",
    href: "/services/residential/roof-soft-washing",
    Icon: Cloud,
  },
  {
    id: "deck-fence",
    title: "Deck & Fence Cleaning",
    description:
      "Prepare your wood or vinyl deck, railings, and fence for staining or sealing.",
    href: "/services/residential/decks-fences",
    Icon: Fence,
  },
  {
    id: "commercial",
    title: "Commercial Cleaning",
    description:
      "Building exteriors, parking lots, and storefronts cleaned around your schedule and customers.",
    href: "/services/commercial/building-washing",
    Icon: Building2,
  },
  {
    id: "soft-washing",
    title: "Soft Washing",
    description:
      "Low-pressure chemical cleaning for roofs, siding, stucco, and other delicate surfaces.",
    href: "/soft-washing",
    Icon: Droplets,
  },
] as const

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
    id: "power-washing",
    title: "Power Washing",
    subtitle: "High-pressure surface cleaning",
    description:
      "Cleans heavy buildup from concrete, brick, and other hard surfaces.",
    href: "/power-washing",
  },
  {
    id: "soft-washing",
    title: "Soft Washing",
    subtitle: "Low-pressure chemical cleaning",
    description:
      "Low-pressure cleaning for roofs, siding, stucco, and other delicate surfaces.",
    href: "/soft-washing",
  },
  {
    id: "roof-cleaning",
    title: "Roof Cleaning",
    subtitle: "Soft wash for asphalt shingles",
    description:
      "Safe low-pressure treatment that removes black streaks, algae, and moss without damaging your roof.",
    href: "/roof-cleaning",
  },
]

interface ServicesProps {
  onOpenQuoteForm: () => void
}

export function Services({ onOpenQuoteForm }: ServicesProps) {
  return (
    <section id="services" className="py-14 bg-section-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal className="text-center mb-10">
          <p className="text-ps-cyan font-semibold text-sm uppercase tracking-[0.28em] mb-2">
            Our Services
          </p>
          <h2 className="font-display uppercase tracking-wide text-white text-4xl sm:text-5xl lg:text-6xl">
            What We <span className="text-ps-cyan text-glow-cyan">Do</span>
          </h2>
          <p className="mt-3 text-ps-text-muted max-w-2xl mx-auto text-sm sm:text-base">
            Residential and commercial cleaning with the right method for each surface.
          </p>
        </Reveal>

        {/* Core services (Google Ads + SEO alignment) */}
        <RevealGroup className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topFiveServices.map(({ id, title, description, href, Icon }) => (
            <RevealItem
              key={id}
              as="article"
              className="group relative flex h-full flex-col rounded-xl border-l-4 border-ps-cyan bg-ps-bg-alt p-5 ring-1 ring-white/5 transition-all duration-200 hover:-translate-y-1 hover:ring-ps-cyan/40 hover:shadow-[0_12px_30px_-8px_rgba(0,229,255,0.35)]"
            >
              <Link
                href={href}
                aria-label={`${title} pressure washing in Ellenwood, GA and Metro Atlanta`}
                className="flex flex-1 flex-col"
              >
                <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-ps-cyan/15 text-ps-cyan">
                  <Icon className="size-6" aria-hidden />
                </div>
                <h3 className="text-lg font-bold text-white">{title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ps-text-muted">
                  {description}
                </p>
              </Link>
              <a
                href={businessPhoneTelHref}
                className={`mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-ps-cyan transition-colors hover:text-brand-yellow-dark ${ctaPress}`}
                aria-label={`Call ${businessPhoneDisplay} for ${title} pricing`}
              >
                <Phone className="size-4 shrink-0" aria-hidden />
                Call for Pricing
                <ChevronRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
              </a>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Primary Services */}
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
          {primaryServices.map((service, index) => (
            <Link
              key={service.id}
              href={service.href}
              className={`group relative block overflow-hidden rounded-xl animate-fade-in-up stagger-${index + 1}`}
            >
              <div className="absolute inset-0 rounded-xl border border-white/10 transition-colors group-hover:border-ps-cyan/40" />

              <div className="relative p-5 sm:p-6">
                <div className="relative mx-auto mb-3 max-w-lg h-48 overflow-hidden rounded-lg border border-white/10 bg-white/5">
                  <Image
                    src={service.imageSrc}
                    alt={service.imageAlt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index === 0}
                  />
                </div>

                <h3 className="text-xl font-bold text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-ps-text-muted text-sm leading-relaxed mb-3">
                  {service.description}
                </p>

                <span className="inline-flex items-center gap-1 text-ps-cyan font-semibold text-sm">
                  Learn more
                  <ChevronRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Supporting Services */}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {supportingServices.map((service) => (
            <Link
              key={service.id}
              href={service.href}
              className="rounded-xl border border-white/10 bg-ps-bg-alt p-4 sm:p-5 block transition-all duration-200 hover:-translate-y-0.5 hover:border-ps-cyan/50 hover:shadow-[0_10px_24px_-10px_rgba(0,229,255,0.3)]"
            >
              <h3 className="text-lg font-bold text-white">{service.title}</h3>
              <p className="mt-1 text-ps-cyan text-xs uppercase tracking-wide font-semibold">
                {service.subtitle}
              </p>
              <p className="mt-2 text-sm text-ps-text-muted leading-relaxed">{service.description}</p>
            </Link>
          ))}
        </div>

        {/* Section CTA */}
        <div className="mt-10 text-center">
          <p className="text-white/70 mb-4 text-sm sm:text-base">
            Not sure which service you need? Call now for instant pricing.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button
              asChild
              size="lg"
              className={`bg-brand-yellow text-brand-blue-dark font-bold hover:bg-brand-yellow-dark shadow-lg ${ctaPress}`}
            >
              <a href={businessPhoneTelHref}>
                <Phone className="size-5 shrink-0" aria-hidden />
                Call {businessPhoneDisplay} Now
              </a>
            </Button>
            <Button
              onClick={onOpenQuoteForm}
              size="lg"
              variant="outline"
              className={`border-2 border-white/50 bg-transparent text-white font-semibold hover:bg-white/10 hover:text-white ${ctaPress}`}
            >
              Get a Free Estimate
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
