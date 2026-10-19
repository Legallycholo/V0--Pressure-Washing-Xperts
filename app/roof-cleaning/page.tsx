"use client"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"
import { CheckCircle, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { RevealGroup, RevealItem } from "@/components/motion/Reveal"
import { CtaBand } from "@/components/sections/CtaBand"
import { PageHero } from "@/components/sections/PageHero"
import { SectionHeading } from "@/components/sections/SectionHeading"

const softWashBenefits = [
  "Removes black streaks (Gloeocapsa magma algae) at the root",
  "Kills moss and lichen without high-pressure damage",
  "Safe for asphalt shingles, no granule loss",
  "Results last longer than pressure washing alone",
  "Protects roof warranty by following manufacturer guidelines",
]

const pressureWashingRisks = [
  "Strips protective granules from asphalt shingles",
  "Forces water under flashing and into the attic",
  "Voids most shingle manufacturer warranties",
  "Breaks down adhesive strips that seal shingles",
  "Can loosen ridge caps and seams",
]

export default function RoofCleaningPage() {

  return (
    <>
      <Header />

      <main className="min-h-screen bg-white">
        <PageHero
          eyebrow="Ellenwood, GA & Metro Atlanta"
          title="Professional Roof Cleaning Services in Ellenwood, GA"
          description="We use low-pressure soft washing, the only method recommended by roofing manufacturers, to safely remove black streaks, algae, moss, and lichen from your roof without causing damage."
        />

        {/* Soft Wash vs Pressure Washing */}
        <section className="py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="Soft wash roof cleaning vs. pressure washing"
              description="Not all roof cleaning is the same. Understanding the difference protects your biggest investment."
              className="mb-10"
            />

            <div className="grid md:grid-cols-2 gap-6">
              {/* Soft Washing */}
              <div className="rounded-2xl border border-green-200 bg-green-50 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="size-8 text-green-600 shrink-0" aria-hidden />
                  <h3 className="text-xl font-bold text-green-800">Soft Wash Roof Cleaning</h3>
                </div>
                <p className="text-sm text-green-900 mb-4 leading-relaxed">
                  Low-pressure application (under 500 PSI) combined with biodegradable cleaning solutions that kill algae, moss, and mold at the root. This is the method endorsed by the ARMA (Asphalt Roofing Manufacturers Association) and most shingle warranties.
                </p>
                <p className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-2">
                  Why it&apos;s right for roofs:
                </p>
                <ul className="space-y-2">
                  {softWashBenefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2 text-sm text-green-900">
                      <CheckCircle className="size-4 text-green-600 shrink-0 mt-0.5" aria-hidden />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pressure Washing */}
              <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="size-8 text-red-600 shrink-0" aria-hidden />
                  <h3 className="text-xl font-bold text-red-800">Pressure Washing a Roof</h3>
                </div>
                <p className="text-sm text-red-900 mb-4 leading-relaxed">
                  High-pressure water (1,500–3,000 PSI) blasts surface stains away but causes serious physical damage to asphalt shingles in the process. Most roofing manufacturers explicitly state that pressure washing voids shingle warranties.
                </p>
                <p className="text-xs font-semibold text-red-700 uppercase tracking-wide mb-2">
                  Risks to your roof:
                </p>
                <ul className="space-y-2">
                  {pressureWashingRisks.map((risk) => (
                    <li key={risk} className="flex items-start gap-2 text-sm text-red-900">
                      <AlertTriangle className="size-4 text-red-500 shrink-0 mt-0.5" aria-hidden />
                      {risk}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="mt-8 text-center text-sm text-muted-foreground">
              At Pressure Washing Xperts we only use soft washing on roofs, never high pressure.{" "}
              <Link href="/about/pressure-vs-soft-washing" className="font-semibold text-brand-blue hover:underline">
                Learn more about soft washing vs. pressure washing →
              </Link>
            </p>
          </div>
        </section>

        {/* What We Remove */}
        <section className="bg-section-light py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading title="What our roof cleaning service removes" className="mb-10" />
            <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Black Streaks", detail: "Caused by Gloeocapsa magma algae, the most common roof stain in Georgia." },
                { label: "Moss & Lichen", detail: "Root systems that lift shingles and hold moisture against the deck." },
                { label: "Mold & Mildew", detail: "Dark patches that accelerate shingle breakdown and look unsightly." },
                { label: "Green Algae", detail: "Thrives in shaded, humid areas common throughout Ellenwood and Atlanta." },
              ].map(({ label, detail }) => (
                <RevealItem key={label} as="article" className="rounded-2xl border border-border bg-white p-6">
                  <h3 className="font-semibold text-brand-blue-dark">{label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{detail}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        <CtaBand
          title="Ready to schedule your roof cleaning?"
          description="Serving Ellenwood, Stockbridge, Decatur, McDonough, Conyers, and all of Metro Atlanta. Licensed & insured. Free quotes."
        />
      </main>

      <Footer />
      <FloatingCallButton />
    </>
  )
}
