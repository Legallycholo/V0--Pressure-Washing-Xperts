"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Car, Droplets, Fence, Gauge, Home as HomeIcon, Warehouse } from "lucide-react"
import { RevealGroup, RevealItem } from "@/components/motion/Reveal"
import { SectionHeading } from "@/components/sections/SectionHeading"

/**
 * Core services that match the Google Ads keyword set + landing intent.
 * Each card links to the existing residential leaf page or service landing page.
 */
const coreServices = [
  {
    id: "house-washing",
    title: "House Washing",
    description:
      "Soft wash that lifts dirt, mold, and mildew from siding and trim without forcing water behind boards.",
    href: "/services/residential/house-washing",
    Icon: HomeIcon,
  },
  {
    id: "driveway-concrete",
    title: "Driveway & Concrete",
    description:
      "Surface-cleaner washing for driveways, walkways, and patios so oil, algae, and tire marks come up evenly.",
    href: "/services/residential/driveways-sidewalks",
    Icon: Car,
  },
  {
    id: "roof-soft-wash",
    title: "Roof Soft Wash",
    description:
      "Low-pressure roof cleaning that removes black streaks, algae, and moss without harming shingles.",
    href: "/services/residential/roof-soft-washing",
    Icon: Warehouse,
  },
  {
    id: "deck-fence",
    title: "Deck & Fence Cleaning",
    description:
      "Wood, composite, and vinyl cleaned and prepped so stain or sealer goes on evenly and lasts longer.",
    href: "/services/residential/decks-fences",
    Icon: Fence,
  },
  {
    id: "power-washing",
    title: "Power Washing",
    description:
      "High-pressure cleaning for concrete, brick, and other hard surfaces with heavy buildup.",
    href: "/power-washing",
    Icon: Gauge,
  },
  {
    id: "soft-washing",
    title: "Soft Washing",
    description:
      "Biodegradable low-pressure treatment for stucco, painted surfaces, and anything high pressure would damage.",
    href: "/soft-washing",
    Icon: Droplets,
  },
] as const

const propertyTypes = [
  {
    id: "residential",
    title: "Residential",
    description: "Homes, driveways, decks, roofs, and patios.",
    href: "/services/residential",
    imageSrc: "/services/home-residential.png",
    imageAlt: "Residential backyard concrete patio with outdoor seating, grill, and brick home exterior.",
  },
  {
    id: "commercial",
    title: "Commercial",
    description: "Storefronts, lots, building exteriors, and sidewalks.",
    href: "/services/commercial",
    imageSrc: "/services/home-commercial.png",
    imageAlt: "Commercial building with block and metal facade, storefront windows, and parking lot.",
  },
  {
    id: "fleet-washing",
    title: "Fleet Washing",
    description: "Semis, trailers, box trucks, RVs, and service vehicles.",
    href: "/services/commercial/fleet-washing",
    imageSrc: "/services/home-fleet-washing.png",
    imageAlt: "Commercial fleet vehicles, semi-trucks, and service vans washed clean.",
  },
]

export function Services() {
  return (
    <section id="services" className="scroll-offset-header bg-section-light py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our services"
          title="House washing, driveway cleaning & roof soft washing"
          description="Residential, commercial, and fleet cleaning with the right method for every surface."
        />

        <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {coreServices.map(({ id, title, description, href, Icon }) => (
            <RevealItem key={id} as="article">
              <Link
                href={href}
                className="group flex h-full gap-4 rounded-2xl border border-border bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-blue/40 hover:shadow-[0_16px_32px_-20px_rgba(11,34,57,0.35)] sm:flex-col sm:gap-0 sm:p-6"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent text-brand-blue">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div className="flex flex-1 flex-col">
                  <h3 className="text-lg font-semibold text-brand-blue-dark sm:mt-5">{title}</h3>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground sm:mt-2">{description}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-blue sm:mt-5">
                    Learn more
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>

        <h3 className="mt-16 text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Browse by property type
        </h3>
        <RevealGroup className="mt-6 grid gap-4 sm:grid-cols-3">
          {propertyTypes.map((type) => (
            <RevealItem key={type.id}>
              <Link
                href={type.href}
                className="group relative block aspect-[4/3] overflow-hidden rounded-2xl bg-brand-blue-dark"
              >
                <Image
                  src={type.imageSrc}
                  alt={type.imageAlt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-brand-blue-dark/90 via-brand-blue-dark/30 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <p className="flex items-center gap-1.5 text-lg font-semibold">
                    {type.title}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </p>
                  <p className="mt-1 text-sm text-white/80">{type.description}</p>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
