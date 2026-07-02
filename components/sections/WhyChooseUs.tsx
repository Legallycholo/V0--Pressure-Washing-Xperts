"use client"

import { Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal"
import { ctaPress } from "@/lib/ctaInteraction"
import { businessPhoneDisplay, businessPhoneTelHref } from "@/data/site"

const steps = [
  {
    number: "01",
    title: "Call or Text",
    description: "Reach us 7 days a week. We pick up fast and give you pricing on the spot.",
  },
  {
    number: "02",
    title: "Free On-Site Quote",
    description: "We assess your property and give you a straight, no-obligation price.",
  },
  {
    number: "03",
    title: "We Show Up & Clean",
    description: "Our licensed, insured crew shows up on time and leaves your property looking like it should.",
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
      className="bg-ps-bg py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.28em] text-ps-cyan">
            How It Works
          </p>
          <h2
            id="why-us-heading"
            className="font-display uppercase tracking-wide text-white text-4xl sm:text-5xl lg:text-6xl"
          >
            Clean in <span className="text-ps-cyan text-glow-cyan">3 Steps</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base text-ps-text-muted">
            No runaround. Just a fast call, a fair quote, and a spotless property.
          </p>
        </Reveal>

        {/* Timeline */}
        <RevealGroup
          stagger={0.2}
          className="relative mt-10 grid gap-8 md:mt-12 md:grid-cols-3 md:gap-6"
        >
          {/* Connector line (desktop) */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-7 hidden border-t-2 border-dashed border-ps-cyan/35 md:block"
          />
          {steps.map((step) => (
            <RevealItem
              key={step.number}
              className="relative flex flex-col items-center text-center md:px-4 max-md:border-l-2 max-md:border-ps-cyan/35 max-md:pl-5 max-md:items-start max-md:text-left"
            >
              <span className="relative z-10 flex h-14 items-center justify-center rounded-full bg-ps-bg px-2 font-display text-5xl leading-none text-ps-cyan text-glow-cyan">
                {step.number}
              </span>
              <h3 className="mt-4 text-lg font-bold text-white">{step.title}</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-ps-text-muted">
                {step.description}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.1} className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className={`animate-cyan-pulse min-w-[220px] bg-ps-cyan px-5 sm:px-8 font-display tracking-wide sm:tracking-widest text-base sm:text-lg text-[#06121f] hover:bg-brand-yellow-dark ${ctaPress}`}
          >
            <a href={businessPhoneTelHref}>
              <Phone className="size-5 shrink-0" aria-hidden />
              CALL {businessPhoneDisplay}
            </a>
          </Button>
          <Button
            type="button"
            onClick={onOpenQuoteForm}
            size="lg"
            variant="outline"
            className={`min-w-[200px] border-2 border-ps-cyan/60 bg-transparent px-8 font-semibold text-ps-cyan hover:bg-ps-cyan/10 hover:text-ps-cyan ${ctaPress}`}
          >
            Get a Free Quote
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
