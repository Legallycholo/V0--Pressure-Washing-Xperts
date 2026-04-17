"use client"

import { getOfferById, offers } from "@/data/offers"
import type { OfferId } from "@/data/offers"
import { Button } from "@/components/ui/button"

interface OffersProps {
  onOpenQuoteForm: (offerId?: OfferId) => void
}

export function Offers({ onOpenQuoteForm }: OffersProps) {
  const newCustomerOffer = getOfferById("first-time")
  const gridOffers = offers.filter((o) => o.id !== "first-time")

  return (
    <section
      className="py-12 bg-section-light"
      aria-labelledby="offers-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-9">
          <p className="text-brand-blue font-semibold text-sm uppercase tracking-wider mb-2">
            Special Offers
          </p>
          <h2
            id="offers-heading"
            className="text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl text-balance"
          >
            Save on Bundles &amp; Seasonal Service
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
            Promos for new customers, bundles, seasonal scheduling, and referrals.
          </p>
        </div>

        {newCustomerOffer ? (
          <div className="mb-8 flex justify-center px-1">
            <div
              className="flex w-full max-w-3xl flex-col gap-4 rounded-2xl border border-brand-yellow/50 bg-brand-yellow/15 px-4 py-4 text-brand-blue-dark shadow-sm sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6 sm:py-4"
              role="note"
            >
              <div className="min-w-0 flex-1 text-center sm:text-left">
                <p className="text-sm font-bold text-brand-blue sm:text-base">
                  <span>{newCustomerOffer.discount}</span>
                  <span className="mx-1.5 font-normal text-brand-blue/50">—</span>
                  <span>{newCustomerOffer.title}</span>
                </p>
                <p className="mt-1 text-sm text-balance text-brand-blue/90 sm:text-base">
                  {newCustomerOffer.description}
                </p>
              </div>
              <div className="flex shrink-0 justify-center sm:justify-end">
                <Button
                  type="button"
                  onClick={() => onOpenQuoteForm(newCustomerOffer.id)}
                  className="min-w-[10rem] bg-brand-yellow font-semibold text-brand-blue-dark hover:bg-brand-yellow-dark"
                  aria-label={`Claim Offer: ${newCustomerOffer.title}`}
                >
                  Claim Offer
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
                  {offer.terms}
                </small>

                <div className="mt-auto pt-0">
                  <Button
                    type="button"
                    onClick={() => onOpenQuoteForm(offer.id)}
                    className={`w-full ${
                      offer.highlight
                        ? "bg-brand-yellow text-brand-blue-dark hover:bg-brand-yellow-dark"
                        : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                    }`}
                    aria-label={`Claim Offer: ${offer.title}`}
                  >
                    Claim Offer
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-6 text-center text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto">
          Offers cannot be combined. Minimum job total applies. Call{" "}
          <a
            href="tel:18004517213"
            className="font-semibold text-brand-blue underline-offset-2 hover:underline"
          >
            1-800-451-7213
          </a>{" "}
          for full terms.
        </p>
      </div>
    </section>
  )
}
