"use client"

import { offers, OFFER_PRICING_SQFT_DISCLAIMER } from "@/data/offers"
import { RevealGroup, RevealItem } from "@/components/motion/Reveal"
import { SectionHeading } from "@/components/sections/SectionHeading"
import { cn } from "@/lib/utils"

export function Offers() {
  return (
    <section className="bg-white py-16 sm:py-20" aria-labelledby="offers-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="offers-heading"
          eyebrow="Special offers"
          title="Save on bundles and seasonal service"
          description="Mention an offer when you call or request a callback and we'll apply it to your estimate."
        />

        <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {offers.map((offer) => {
            const Icon = offer.icon
            return (
              <RevealItem
                key={offer.id}
                as="article"
                className={cn(
                  "relative flex h-full flex-col rounded-2xl border bg-white p-6",
                  offer.highlight ? "border-brand-blue ring-1 ring-brand-blue" : "border-border"
                )}
              >
                {offer.highlight ? (
                  <span className="absolute -top-3 left-6 rounded-full bg-brand-blue px-3 py-1 text-xs font-semibold text-white">
                    Best value
                  </span>
                ) : null}
                <Icon className="size-6 text-brand-blue" aria-hidden />
                <p className="mt-4 text-2xl font-bold tracking-tight text-brand-blue-dark">{offer.discount}</p>
                <h3 className="mt-1 font-semibold text-brand-blue-dark">{offer.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{offer.description}</p>
                <p className="mt-4 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
                  {offer.terms}
                </p>
              </RevealItem>
            )
          })}
        </RevealGroup>

        <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-relaxed text-muted-foreground">
          {OFFER_PRICING_SQFT_DISCLAIMER}
        </p>
      </div>
    </section>
  )
}
