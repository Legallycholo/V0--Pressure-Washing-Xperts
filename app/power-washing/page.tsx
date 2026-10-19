"use client"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { RevealGroup, RevealItem } from "@/components/motion/Reveal"
import { CtaBand } from "@/components/sections/CtaBand"
import { PageHero } from "@/components/sections/PageHero"
import { SectionHeading } from "@/components/sections/SectionHeading"

const powerWashingSurfaces = [
  { surface: "Driveways & Sidewalks", detail: "Remove oil stains, tire marks, algae, and years of grime from concrete and asphalt." },
  { surface: "Patios & Pool Decks", detail: "Restore concrete, brick, and paver surfaces to look clean and slip-free." },
  { surface: "Decks & Fences", detail: "High-pressure pre-treatment for wood and composite surfaces before staining or sealing." },
  { surface: "Retaining Walls", detail: "Lift moss, algae, and soil staining from block, stone, and poured concrete walls." },
  { surface: "Building Exteriors", detail: "Brick, block, and concrete facades cleaned with pressure matched to the material." },
  { surface: "Parking Areas", detail: "Commercial lots and residential parking pads stripped of rubber buildup and organic film." },
]

const whyChooseUs = [
  "Licensed and insured with verified coverage, not just a claim",
  "15+ years serving Ellenwood and Metro Atlanta",
  "Commercial-grade equipment matched to each surface",
  "No damage guarantee on all power washing jobs",
  "Flexible scheduling including evenings and weekends",
]

export default function PowerWashingPage() {

  return (
    <>
      <Header />

      <main className="min-h-screen bg-white">
        <PageHero
          eyebrow="Ellenwood, GA & Metro Atlanta"
          title="Professional Power Washing Services Near You in Ellenwood, GA"
          description="High-pressure power washing service for driveways, concrete, patios, building exteriors, and commercial surfaces. We match the right pressure and method to every surface for a deep clean that lasts."
        />

        {/* Surfaces We Clean */}
        <section className="py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="Power washing services we offer"
              description="Not every surface needs the same pressure. We use the right PSI for each job so surfaces get clean without damage."
            />
            <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {powerWashingSurfaces.map(({ surface, detail }) => (
                <RevealItem key={surface} as="article" className="rounded-2xl border border-border bg-white p-6">
                  <h3 className="font-semibold text-brand-blue-dark">{surface}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{detail}</p>
                </RevealItem>
              ))}
            </RevealGroup>
            <p className="mt-8 text-center text-sm text-muted-foreground">
              For roofs, siding, and other delicate surfaces, we use low-pressure soft washing instead.{" "}
              <Link href="/soft-washing" className="font-semibold text-brand-blue hover:underline">
                Learn about soft washing →
              </Link>
            </p>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-section-light py-14 sm:py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <SectionHeading title="Why Ellenwood chooses Pressure Washing Xperts" />
            <ul className="mt-10 space-y-3">
              {whyChooseUs.map((point) => (
                <li key={point} className="flex items-start gap-3 rounded-2xl border border-border bg-white p-4">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-blue" aria-hidden />
                  <span className="text-slate-700">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <CtaBand
          title="Request your free power washing quote"
          description="Serving Ellenwood, Stockbridge, Decatur, McDonough, Conyers, and all of Metro Atlanta. Licensed & insured."
        />
      </main>

      <Footer />
      <FloatingCallButton />
    </>
  )
}
