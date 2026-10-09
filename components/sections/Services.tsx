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
import { StackCard, StackCards } from "@/components/motion/StackCards"
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
      "Safe low-pressure roof cleaning that lifts black streaks, algae, and moss without harming shingles.",
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
  {
    id: "fleet-washing",
    title: "Fleet Vehicle Washing",
    description:
      "One truck or a whole fleet: semis, trailers, box trucks, RVs, and service vehicles.",
    href: "/services/commercial/fleet-washing",
    imageSrc: "/services/home-fleet-washing.png",
    imageAlt:
      "Commercial fleet vehicles, semi-trucks, and service vans washed clean.",
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
  onOpenQuoteForm?: () => void
}

export function Services({ onOpenQuoteForm }: ServicesProps = {}) {
  return (
    <section id="services" className="py-14 sm:py-16 lg:py-20 bg-section-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal className="text-center mb-10">
          <p className="text-ps-cyan font-semibold text-sm uppercase tracking-[0.28em] mb-2">
            Our Services
          </p>
          <h2 className="font-display uppercase tracking-wide text-white text-4xl sm:text-5xl lg:text-6xl">
            <span className="text-ps-cyan text-glow-cyan">House Washing</span>, Driveway Cleaning
            {" "}&amp; Roof Soft Washing
          </h2>
          <p className="mt-3 text-ps-text-muted max-w-2xl mx-auto text-sm sm:text-base">
            Residential, commercial, and fleet cleaning with the right method for each surface.
          </p>
        </Reveal>

        {/* Core services: scroll-stacking deck (Google Ads + SEO alignment) */}
        <StackCards className="mx-auto mb-14 max-w-4xl">
          {topFiveServices.map(({ id, title, description, href, Icon }, index) => (
            <StackCard
              key={id}
              index={index}
              isLast={index === topFiveServices.length - 1}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#111D35] to-[#0C1526] ring-1 ring-white/10 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)] transition-colors duration-300 hover:ring-ps-cyan/40"
            >
              <article className="relative p-6 sm:p-8 lg:p-10">
                {/* Oversized index watermark */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-2 right-4 font-display text-[5.5rem] leading-none text-white/[0.04] sm:text-[7rem]"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ps-cyan/50 to-transparent" />

                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-ps-cyan/15 text-ps-cyan ring-1 ring-ps-cyan/25 sm:h-14 sm:w-14">
                    <Icon className="size-6 sm:size-7" aria-hidden />
                  </div>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={href}
                      aria-label={`${title} pressure washing in Ellenwood, GA and Metro Atlanta`}
                      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ps-cyan/70 rounded-md"
                    >
                      <h3 className="font-display text-2xl uppercase tracking-wide text-white sm:text-3xl lg:text-4xl">
                        {title}
                      </h3>
                    </Link>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ps-text-muted sm:text-base">
                      {description}
                    </p>
                    <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
                      <a
                        href={businessPhoneTelHref}
                        className={`inline-flex min-h-[44px] items-center gap-1.5 text-sm font-bold text-ps-cyan transition-colors hover:text-brand-yellow-dark ${ctaPress}`}
                        aria-label={`Call ${businessPhoneDisplay} for ${title} pricing`}
                      >
                        <Phone className="size-4 shrink-0" aria-hidden />
                        Call for Pricing
                      </a>
                      <Link
                        href={href}
                        className="inline-flex min-h-[44px] items-center gap-1 text-sm font-semibold text-white/70 transition-colors hover:text-white"
                      >
                        Learn more
                        <ChevronRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            </StackCard>
          ))}
        </StackCards>

        {/* Primary Services (3 Pillar Cards: Residential, Commercial, Fleet) */}
        <RevealGroup className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.12}>
          {primaryServices.map((service) => (
            <RevealItem key={service.id} as="div">
              <Link
                href={service.href}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#111D35]/80 to-[#0C1526]/80 p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-ps-cyan/50 hover:shadow-[0_12px_32px_-12px_rgba(0,229,255,0.25)]"
              >
                <div className="relative mb-4 h-48 sm:h-52 w-full overflow-hidden rounded-xl border border-white/10 bg-white/5">
                  <Image
                    src={service.imageSrc}
                    alt={service.imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-ps-cyan transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-ps-text-muted text-sm leading-relaxed mb-4">
                      {service.description}
                    </p>
                  </div>

                  <span className="inline-flex items-center gap-1 text-ps-cyan font-semibold text-sm group-hover:text-brand-yellow-dark transition-colors">
                    Learn more
                    <ChevronRight className="size-4 transition-transform duration-200 group-hover:translate-x-1.5" />
                  </span>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>

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
              asChild
              size="lg"
              variant="outline"
              className={`border-2 border-white/50 bg-transparent text-white font-semibold hover:bg-white/10 hover:text-white ${ctaPress}`}
            >
              <Link href="/contact">Request Callback</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
