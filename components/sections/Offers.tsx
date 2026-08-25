"use client"

import Link from "next/link"
import {
  getOfferById,
  offers,
  OFFER_PRICING_SQFT_DISCLAIMER,
} from "@/data/offers"
import type { OfferId } from "@/data/offers"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/motion/Reveal"

interface OffersProps {
  onOpenQuoteForm?: (offerId?: OfferId) => void
}

export function Offers({ onOpenQuoteForm }: OffersProps = {}) {
  const newCustomerOffer = getOfferById("first-time")
  const gridOffers = offers.filter((o) => o.id !== "first-time")

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
            Save on Bundles &amp; <span className="text-ps-cyan text-glow-cyan">Seasonal Service</span>
          </h2>
          <p className="mt-3 text-ps-text-muted max-w-2xl mx-auto text-sm sm:text-base">
            Promos for new customers, bundles, seasonal scheduling, and referrals.
          </p>
        </Reveal>

        {newCustomerOffer ? (
          <div className="mb-8 flex justify-center px-1">
            <div
              className="flex w-full max-w-3xl flex-col gap-4 rounded-2xl border border-ps-cyan/40 bg-ps-cyan/10 px-4 py-4 text-white shadow-sm sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6 sm:py-4"
              role="note"
            >
              <div className="min-w-0 flex-1 text-center sm:text-left">
                <p className="text-sm font-bold text-ps-cyan sm:text-base">
                  <span>{newCustomerOffer.discount}</span>
                  <span className="mx-1.5 font-normal text-ps-cyan/60">-</span>
                  <span className="text-white">{newCustomerOffer.title}</span>
                </p>
                <p className="mt-1 text-sm text-balance text-white/85 sm:text-base">
                  {newCustomerOffer.description}
                </p>
                <small className="mt-2 block text-center text-xs leading-relaxed text-ps-text-muted sm:text-left">
                  {newCustomerOffer.terms} {OFFER_PRICING_SQFT_DISCLAIMER}
                </small>
              </div>
              <div className="flex shrink-0 justify-center sm:justify-end">
                <Button
                  asChild
                  className="min-w-[10rem] bg-ps-cyan font-semibold text-[#06121f] hover:bg-brand-yellow-dark"
                  aria-label={`Claim Offer: ${newCustomerOffer.title}`}
                >
                  <Link href="/contact">Request Callback</Link>
                </Button>
              </div>
            </div>
          </div>
        ) : null}

        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gridOffers.map((offer, index) => (
            <article
              key={offer.id}
              className={`relative flex h-full flex-col rounded-xl overflow-hidden animate-fade-in-up stagger-${index + 1} bg-gradient-to-br from-[#1e293b] to-[#0f172a] text-white ${
                offer.highlight
                  ? "order-first lg:order-none border-2 border-brand-yellow"
                  : "border border-white/10"
              }`}
            >
              {offer.highlight && (
                <div className="absolute top-0 right-0 bg-brand-yellow text-brand-blue-dark text-xs font-bold px-3 py-1 rounded-bl-lg z-[1]">
                  BEST VALUE
                </div>
              )}

              <div className="relative p-4 sm:p-5 flex flex-col flex-1 min-h-0">
                <div className="text-2xl font-bold mb-2 text-brand-yellow">
                  {offer.discount}
                </div>

                <h3 className="text-base font-bold mb-1.5 text-white">{offer.title}</h3>

                <p className="text-sm leading-relaxed mb-3 text-white/75">
                  {offer.description}
                </p>

                <small className="text-sm leading-relaxed block mb-4 text-white/60">
                  {offer.terms} {OFFER_PRICING_SQFT_DISCLAIMER}
                </small>

                <div className="mt-auto pt-0">
                  <Button
                    asChild
                    className={`w-full ${
                      offer.highlight
                        ? "bg-brand-yellow text-brand-blue-dark hover:bg-brand-yellow-dark"
                        : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                    }`}
                    aria-label={`Claim Offer: ${offer.title}`}
                  >
                    <Link href="/contact">Request Callback</Link>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-6 text-center text-xs sm:text-sm text-ps-text-muted max-w-2xl mx-auto">
          Pricing starts at a $250 minimum and estimates reflect square footage and
          scope. Offers are applied after the estimate, and final pricing will not go
          below $250. Offers cannot be combined. Call{" "}
          <a
            href="tel:+18004517213"
            className="font-semibold text-ps-cyan underline-offset-2 hover:underline"
          >
            (800) 451-7213
          </a>{" "}
          for full terms.
        </p>
      </div>
    </section>
  )
}
