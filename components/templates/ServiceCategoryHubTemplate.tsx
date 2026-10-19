"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { NavLinkItem } from "@/data/navigation"
import { CtaBand } from "@/components/sections/CtaBand"
import { PageHero } from "@/components/sections/PageHero"
import { SectionHeading } from "@/components/sections/SectionHeading"
import { SocialProofBar } from "@/components/sections/SocialProofBar"
import { RevealGroup, RevealItem } from "@/components/motion/Reveal"

interface ServiceCategoryHubTemplateProps {
  categoryLabel: string
  title: string
  description: string
  services: NavLinkItem[]
  contentRevised?: string
}

export function ServiceCategoryHubTemplate({
  categoryLabel,
  title,
  description,
  services,
  contentRevised,
}: ServiceCategoryHubTemplateProps) {
  return (
    <main className="min-h-screen bg-white">
      <PageHero eyebrow={categoryLabel} title={title} description={description} />

      <SocialProofBar />

      <section className="bg-section-light py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What we clean"
            title={`Our ${categoryLabel.toLowerCase()}`}
            description="Pick a service to see scope, benefits, and how we approach the job."
          />

          <RevealGroup className="mt-10 grid gap-4 md:grid-cols-2">
            {services.map((service) => (
              <RevealItem key={service.href} as="article">
                <Link
                  href={service.href}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-blue/40 hover:shadow-[0_16px_32px_-20px_rgba(11,34,57,0.35)]"
                >
                  <h3 className="text-lg font-semibold text-brand-blue-dark">{service.label}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {service.summary ??
                      "See how we approach this service, typical surfaces, and how to request a quote."}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-blue">
                    Learn more
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CtaBand
        title="Not sure which service you need?"
        description="Tell us about the property and we'll recommend the right approach."
      />

      {contentRevised ? (
        <p className="px-4 py-4 text-center text-xs text-muted-foreground">
          Content reviewed {contentRevised}
        </p>
      ) : null}
    </main>
  )
}
