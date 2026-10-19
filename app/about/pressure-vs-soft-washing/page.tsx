"use client"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { FloatingCallButton } from "@/components/layout/FloatingCallButton"
import { Droplets, Gauge, type LucideIcon } from "lucide-react"
import { CtaBand } from "@/components/sections/CtaBand"
import { PageHero } from "@/components/sections/PageHero"
import { SectionHeading } from "@/components/sections/SectionHeading"

const methods: {
  title: string
  Icon: LucideIcon
  summary: string
  bestFor: string[]
  features: string[]
}[] = [
  {
    title: "Pressure Washing",
    Icon: Gauge,
    summary: "High-pressure water for tough, durable surfaces.",
    bestFor: ["Concrete driveways & sidewalks", "Parking lots & garages", "Brick, stone & heavy-duty hardscapes"],
    features: ["High PSI for stubborn stains", "Fast results on hard surfaces", "Removes deep grime and buildup"],
  },
  {
    title: "Soft Washing",
    Icon: Droplets,
    summary: "Low-pressure cleaning with specialized solutions for delicate surfaces.",
    bestFor: ["House siding & exterior walls", "Roofs & shingles", "Wood decks, fences & painted surfaces"],
    features: [
      "Low PSI with biodegradable solutions",
      "Kills mold, mildew & algae at the root",
      "Long-lasting, surface-safe results",
    ],
  },
]

export default function PressureVsSoftWashingPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-white">
        <PageHero
          title="Pressure Washing vs. Soft Washing"
          description="Understanding the difference between high-pressure washing and low-pressure soft washing protects your home's exterior surfaces from damage while getting the deepest clean."
          showCtas={false}
        />

        {/* Comparison */}
        <section className="py-14 sm:py-16">
          <div className="mx-auto grid max-w-5xl gap-5 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
            {methods.map(({ title, Icon, summary, bestFor, features }) => (
              <article key={title} className="rounded-2xl border border-border bg-white p-6 sm:p-7">
                <div className="flex items-center gap-3">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-accent text-brand-blue">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <h2 className="text-xl font-bold text-brand-blue-dark sm:text-2xl">{title}</h2>
                </div>
                <p className="mt-4 text-slate-700">{summary}</p>
                <h3 className="mt-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Best for</h3>
                <ul className="mt-2 space-y-1.5 text-slate-700">
                  {bestFor.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
                <h3 className="mt-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Features</h3>
                <ul className="mt-2 space-y-1.5 text-slate-700">
                  {features.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* Expert Approach */}
        <section className="bg-section-light py-14 sm:py-16">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <SectionHeading
              title="Our Xpert approach"
              description="We assess each project individually and choose the right method, or a combination, to protect your property and deliver the best results."
            />
            <p className="mt-8 rounded-2xl border border-border bg-white p-6 text-lg font-semibold text-brand-blue-dark">
              &ldquo;The right technique for the right surface, every time.&rdquo;
            </p>
          </div>
        </section>

        <CtaBand
          title="Not sure which method you need?"
          description="Free consultation. We'll recommend the best approach."
        />
      </main>

      <Footer />
      <FloatingCallButton />
    </>
  )
}
