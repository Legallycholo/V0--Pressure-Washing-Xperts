"use client"

import Link from "next/link"
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
    title: "Ready-to-Book Service",
    description: "We assess your property and give you a straight, no-obligation price.",
  },
  {
    number: "03",
    title: "We Show Up & Clean",
    description: "Our licensed, insured crew shows up on time and leaves your property looking like it should.",
  },
]

interface WhyChooseUsProps {
  onOpenQuoteForm?: () => void
}

export function WhyChooseUs({ onOpenQuoteForm }: WhyChooseUsProps = {}) {
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
            Simple, Fast, and{" "}
            <span className="text-ps-cyan text-glow-cyan">Hassle-Free</span>
          </h2>
          <p className="mt-3 text-base text-ps-text-muted sm:text-lg">
            From first contact to final walkthrough, we keep things simple and clear.
          </p>
        </Reveal>

        {/* Timeline */}
        <RevealGroup
          as="div"
          stagger={0.12}
          className="mt-12 grid gap-6 md:grid-cols-3"
        >
          {steps.map((step) => (
            <RevealItem
              key={step.number}
              as="article"
              className="relative flex flex-col rounded-2xl border border-white/10 bg-ps-bg-alt p-6 sm:p-7 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-1 hover:border-ps-cyan/40 hover:shadow-[0_20px_50px_-15px_rgba(0,229,255,0.2)]"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-4xl sm:text-5xl text-ps-cyan/80">
                  {step.number}
                </span>
                <span className="h-2 w-2 rounded-full bg-ps-cyan shadow-[0_0_12px_#00e5ff]" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-white sm:text-2xl">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ps-text-muted sm:text-base">
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
            asChild
            size="lg"
            variant="outline"
            className={`min-w-[200px] border-2 border-ps-cyan/60 bg-transparent px-8 font-semibold text-ps-cyan hover:bg-ps-cyan/10 hover:text-ps-cyan ${ctaPress}`}
          >
<<<<<<< HEAD
            <Link href="/contact">Request Callback</Link>
=======
            Request Callback
>>>>>>> origin/main
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
