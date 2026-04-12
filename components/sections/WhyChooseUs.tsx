"use client"

import type { LucideIcon } from "lucide-react"
import {
  CheckCircle,
  Clock,
  FileText,
  FlaskConical,
  GraduationCap,
  Leaf,
  Shield,
  Star,
  Users,
  Wrench,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const features: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: CheckCircle,
    title: "Quality workmanship",
    description: "Consistent results on every job, from small homes to large commercial sites.",
  },
  {
    icon: FlaskConical,
    title: "Safe cleaning methods",
    description: "Soft wash and pressure washing chosen for your surfaces and environment.",
  },
  {
    icon: FileText,
    title: "Clear estimates",
    description: "Straightforward quotes so you know what to expect before we start.",
  },
  {
    icon: Wrench,
    title: "Professional equipment",
    description: "Commercial-grade tools maintained for reliable, effective cleaning.",
  },
  {
    icon: Users,
    title: "Experienced crew",
    description: "A team that shows up on time and treats your property with respect.",
  },
  {
    icon: GraduationCap,
    title: "Trained technicians",
    description: "Technicians trained on proper techniques and safety best practices.",
  },
  {
    icon: Shield,
    title: "Licensed & insured",
    description: "Coverage that protects you and your property while we work.",
  },
  {
    icon: Leaf,
    title: "Eco-conscious options",
    description: "Biodegradable solutions where appropriate for plants and pets.",
  },
  {
    icon: Star,
    title: "Customer satisfaction",
    description: "We aim to earn your referral with every project we complete.",
  },
  {
    icon: Clock,
    title: "Reliable scheduling",
    description: "We work with your timeline and communicate if anything changes.",
  },
]

interface WhyChooseUsProps {
  onOpenQuoteForm: () => void
}

export function WhyChooseUs({ onOpenQuoteForm }: WhyChooseUsProps) {
  const firstColumn = features.slice(0, 5)
  const secondColumn = features.slice(5, 10)

  return (
    <section
      id="why-us"
      aria-labelledby="why-us-heading"
      className="animate-fade-in-up bg-section-light py-10 sm:py-12 lg:py-14"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-4xl text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-blue-light">
            Trust the Xperts
          </p>
          <h2
            id="why-us-heading"
            className="text-balance text-2xl font-bold uppercase tracking-tight text-brand-blue-dark sm:text-3xl lg:text-4xl"
          >
            Why choose us?
          </h2>
          <p className="mt-3 text-base font-semibold uppercase tracking-wide text-foreground sm:text-lg">
            Experience, safety &amp; quality you can count on
          </p>
        </header>

        <div className="mt-8 grid gap-3 md:mt-9 md:grid-cols-2 md:gap-4 lg:mt-10">
          <ul className="flex list-none flex-col gap-3 p-0" aria-label="Reasons to choose us, part one">
            {firstColumn.map((feature) => (
              <li key={feature.title}>
                <article className="flex gap-3 rounded-xl border border-border/60 bg-muted/80 px-3 py-3 sm:px-4 sm:py-4">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-brand-blue/10 text-brand-blue">
                    <feature.icon className="size-4" aria-hidden />
                  </div>
                  <div className="min-w-0 text-left">
                    <h3 className="font-semibold text-foreground">{feature.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
          <ul className="flex list-none flex-col gap-3 p-0" aria-label="Reasons to choose us, part two">
            {secondColumn.map((feature) => (
              <li key={feature.title}>
                <article className="flex gap-3 rounded-xl border border-border/60 bg-muted/80 px-3 py-3 sm:px-4 sm:py-4">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-brand-blue/10 text-brand-blue">
                    <feature.icon className="size-4" aria-hidden />
                  </div>
                  <div className="min-w-0 text-left">
                    <h3 className="font-semibold text-foreground">{feature.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex justify-center md:mt-9 lg:mt-10">
          <Button
            type="button"
            onClick={onOpenQuoteForm}
            size="lg"
            className="min-w-[200px] bg-brand-yellow px-8 font-bold uppercase tracking-wide text-brand-blue-dark hover:bg-brand-yellow-dark text-base"
          >
            Get started today
          </Button>
        </div>
      </div>
    </section>
  )
}
