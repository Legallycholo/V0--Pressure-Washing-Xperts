"use client"

import { Button } from "@/components/ui/button"

const features = [
  {
    title: "Licensed & Insured",
    description: "Full coverage that protects your property on every job.",
  },
  {
    title: "15 Years Experience",
    description: "A proven track record of consistent results since 2010.",
  },
  {
    title: "Residential & Commercial",
    description: "The right equipment and technique for any property type.",
  },
]

interface WhyChooseUsProps {
  onOpenQuoteForm: () => void
}

export function WhyChooseUs({ onOpenQuoteForm }: WhyChooseUsProps) {
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

        <div className="mt-8 grid gap-5 md:mt-9 md:grid-cols-3 md:gap-6 lg:mt-10">
          {features.map((feature) => (
            <article key={feature.title} className="rounded-xl border border-border/60 bg-muted/80 px-4 py-5">
              <h3 className="font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </article>
          ))}
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
