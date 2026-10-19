"use client"

import { RevealGroup, RevealItem } from "@/components/motion/Reveal"
import { SectionHeading } from "@/components/sections/SectionHeading"

const steps = [
  {
    title: "Call or text",
    description: "Reach us 7 days a week. We pick up fast and can usually price the job on the spot.",
  },
  {
    title: "Free on-site quote",
    description: "We look at the property and give you a straight, no-obligation price before any work starts.",
  },
  {
    title: "We show up and clean",
    description: "Our licensed, insured crew arrives on time and walks the finished job with you.",
  },
]

export function WhyChooseUs() {
  return (
    <section id="why-us" aria-labelledby="why-us-heading" className="bg-section-light py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="why-us-heading"
          eyebrow="How it works"
          title="Simple, fast, and hassle-free"
          description="From first call to final walkthrough, you always know what happens next."
        />

        <RevealGroup as="div" className="mt-12 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <RevealItem
              key={step.title}
              as="article"
              className="rounded-2xl border border-border bg-white p-6 sm:p-7"
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-brand-blue text-sm font-bold text-white">
                {index + 1}
              </span>
              <h3 className="mt-5 text-lg font-semibold text-brand-blue-dark">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {step.description}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
