"use client"

import Link from "next/link"
import { offers, OFFER_PRICING_SQFT_DISCLAIMER } from "@/data/offers"
import type { OfferId } from "@/data/offers"
import { businessPhoneDisplay, businessPhoneTelHref } from "@/data/site"
import { Button } from "@/components/ui/button"
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal"
import { cn } from "@/lib/utils"

interface OffersProps {
  onOpenQuoteForm?: (offerId?: OfferId) => void
}

export function Offers({ onOpenQuoteForm }: OffersProps = {}) {
  return (
    <section
      className="py-14 sm:py-16 lg:py-20 bg-ps-bg-alt"
      aria-labelledby="offers-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-9">
          <p className="text-ps-cyan font-semibold text-sm uppercase tracking-[0.28em] mb-2">
            Special Offers
          </p>
          <h2
            id="offers-heading"
            className="font-display uppercase tracking-wide text-white text-4xl sm:text-5xl lg:text-6xl"
          >
            Two Ways to <span className="text-ps-cyan text-glow-cyan">Save</span>
          </h2>
          <p className="mt-3 text-ps-text-muted max-w-2xl mx-auto text-sm sm:text-base">
            A welcome discount on your first job, and a thank-you when you send a neighbor our way.
          </p>
        </Reveal>

        <RevealGroup className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2" stagger={0.1}>
          {offers.map((offer) => {
            const Icon = offer.icon
            return (
              <RevealItem
                key={offer.id}
                as="article"
                className={cn(
                  "relative flex h-full flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-[#1e293b] to-[#0f172a] p-6 text-white sm:p-8",
                  offer.highlight
                    ? "border-2 border-ps-cyan shadow-[0_0_40px_-12px_rgba(0,229,255,0.45)]"
                    : "border border-white/10"
                )}
              >
                <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-ps-cyan/10 blur-3xl" aria-hidden />

                <div className="relative flex items-center gap-3">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-ps-cyan/10 ring-1 ring-ps-cyan/30">
                    <Icon className="size-6 text-ps-cyan" aria-hidden />
                  </span>
                  <h3 className="text-lg font-bold sm:text-xl">{offer.title}</h3>
                </div>

                <p className="relative mt-5 font-display text-5xl tracking-wide text-ps-cyan text-glow-cyan sm:text-6xl">
                  {offer.discount}
                </p>

                <p className="relative mt-3 text-base leading-relaxed text-white/85">
                  {offer.description}
                </p>

                <small className="relative mt-5 block border-t border-white/10 pt-4 text-xs leading-relaxed text-white/55 sm:text-sm">
                  {offer.terms}
                </small>

                <div className="relative mt-auto pt-6">
                  <Button
                    asChild
                    size="lg"
                    className={cn(
                      "w-full font-semibold",
                      offer.highlight
                        ? "bg-ps-cyan text-[#06121f] hover:bg-brand-yellow-dark"
                        : "border-2 border-ps-cyan/60 bg-transparent text-ps-cyan hover:border-ps-cyan hover:bg-ps-cyan/10"
                    )}
                    aria-label={`Claim Offer: ${offer.title}`}
                  >
                    <Link href="/contact">Request Callback</Link>
                  </Button>
                </div>
              </RevealItem>
            )
          })}
        </RevealGroup>

        <p className="mt-6 text-center text-xs sm:text-sm text-ps-text-muted max-w-2xl mx-auto">
          {OFFER_PRICING_SQFT_DISCLAIMER} Offers cannot be combined. Call{" "}
          <a
            href={businessPhoneTelHref}
            className="font-semibold text-ps-cyan underline-offset-2 hover:underline"
          >
            {businessPhoneDisplay}
          </a>{" "}
          for full terms.
        </p>
      </div>
    </section>
  )
}
