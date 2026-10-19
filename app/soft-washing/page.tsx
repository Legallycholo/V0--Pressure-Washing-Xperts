"use client"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"
import { ArrowRight, Droplets } from "lucide-react"
import Link from "next/link"
import { RevealGroup, RevealItem } from "@/components/motion/Reveal"
import { CtaBand } from "@/components/sections/CtaBand"
import { PageHero } from "@/components/sections/PageHero"
import { SectionHeading } from "@/components/sections/SectionHeading"

const softWashSurfaces = [
  { surface: "Roofs (Asphalt Shingles)", detail: "The only safe cleaning method. It removes algae, moss, and black streaks without voiding your warranty." },
  { surface: "House Siding", detail: "Vinyl, hardiplank, wood, and stucco cleaned without forcing water behind boards." },
  { surface: "Painted Surfaces", detail: "Low pressure protects paint from peeling or chipping on wood trim, shutters, and fascia." },
  { surface: "EIFS / Stucco", detail: "Moisture-sensitive cladding cleaned gently without cracking the finish coat." },
  { surface: "Wood Decks & Fences", detail: "Soft washing prep removes mold and algae without raising the grain before staining." },
  { surface: "Screen Enclosures & Lanais", detail: "Delicate screen frames and panels cleaned safely without bending or tearing." },
]

const howItWorks = [
  { title: "Inspect the surface", body: "We assess the type of growth, material, and slope before selecting the right cleaning solution and dilution ratio." },
  { title: "Apply cleaning solution", body: "Biodegradable detergents are applied at low pressure (under 500 PSI) to kill algae, mold, and bacteria at the cellular level." },
  { title: "Dwell and rinse", body: "The solution dwells to break down organic growth, then is rinsed away, taking the staining with it." },
  { title: "Spot check & done", body: "We walk the job with you before we leave. Results continue to improve over the following days as residual treatment works." },
]

const relatedServices = [
  { href: "/roof-cleaning", title: "Roof Cleaning", body: "Soft wash for asphalt shingles. Removes black streaks and moss safely." },
  { href: "/power-washing", title: "Power Washing", body: "High-pressure cleaning for driveways, concrete, and hard surfaces." },
]

export default function SoftWashingPage() {

  return (
    <>
      <Header />

      <main className="min-h-screen bg-white">
        <PageHero
          eyebrow="Ellenwood, GA & Metro Atlanta"
          title="Professional Soft Washing Services in Ellenwood, GA"
          description="Soft wash near you: low-pressure cleaning with biodegradable solutions that kill algae, mold, and mildew at the root. Safe for roofs, siding, and any surface that can't handle high-pressure washing."
        />

        {/* What Is Soft Washing */}
        <section className="py-14 sm:py-16">
          <div className="mx-auto flex max-w-4xl flex-col items-start gap-8 px-4 sm:px-6 md:flex-row lg:px-8">
            <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-accent">
              <Droplets className="size-7 text-brand-blue" aria-hidden />
            </span>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-brand-blue-dark sm:text-3xl">
                What is soft washing?
              </h2>
              <p className="mt-4 leading-relaxed text-slate-700">
                Soft washing uses water pressure under 500 PSI, far below the 1,500 to 3,000 PSI of a standard pressure washer, combined with professional-grade cleaning solutions. The chemistry does the cleaning work, not the force of the water.
              </p>
              <p className="mt-4 leading-relaxed text-slate-700">
                This matters because many surfaces that look dirty aren&apos;t just dirty. They&apos;re colonized by living organisms like algae, mold, mildew, and lichen. High pressure knocks the visible growth off the surface but doesn&apos;t kill the roots, so it grows back faster. Soft washing kills it at the source, so results last 4 to 6 times longer.
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                Wondering when to use soft washing vs. pressure washing?{" "}
                <Link href="/about/pressure-vs-soft-washing" className="font-semibold text-brand-blue hover:underline">
                  Read our full comparison →
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* Surfaces We Soft Wash */}
        <section className="bg-section-light py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading title="Surfaces we soft wash" />
            <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {softWashSurfaces.map(({ surface, detail }) => (
                <RevealItem key={surface} as="article" className="rounded-2xl border border-border bg-white p-6">
                  <h3 className="font-semibold text-brand-blue-dark">{surface}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{detail}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-14 sm:py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <SectionHeading title="How our soft washing process works" />
            <ol className="mt-10 space-y-3">
              {howItWorks.map(({ title, body }, index) => (
                <li key={title} className="flex items-start gap-4 rounded-2xl border border-border bg-white p-5">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-blue text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-brand-blue-dark">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Related Services */}
        <section className="bg-section-light py-14">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-lg font-bold text-brand-blue-dark">Related services</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {relatedServices.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="group rounded-2xl border border-border bg-white p-5 transition-colors hover:border-brand-blue/40"
                >
                  <p className="flex items-center gap-1.5 font-semibold text-brand-blue-dark">
                    {service.title}
                    <ArrowRight className="size-4 text-brand-blue transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{service.body}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <CtaBand
          title="Schedule your soft washing service"
          description="Serving Ellenwood, Stockbridge, Decatur, McDonough, Conyers, and all of Metro Atlanta. Licensed & insured. Free quotes."
        />
      </main>

      <Footer />
      <FloatingCallButton />
    </>
  )
}
