"use client"

import { offers } from "@/data/offers"
import type { OfferId } from "@/data/offers"
import { Button } from "@/components/ui/button"

interface OffersProps {
  onOpenQuoteForm: (offerId?: OfferId) => void
}

export function Offers({ onOpenQuoteForm }: OffersProps) {
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

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {offers.map((offer, index) => (
            <article
              key={offer.id}
              className={`relative flex h-full flex-col rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-xl active:scale-[0.99] motion-reduce:hover:scale-100 animate-fade-in-up stagger-${index + 1} ${
                offer.highlight
                  ? "order-first lg:order-none bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white ring-2 ring-brand-yellow"
                  : "bg-white text-foreground shadow-lg"
              }`}
            >
              {offer.highlight && (
                <div className="absolute top-0 right-0 bg-brand-yellow text-brand-blue-dark text-xs font-bold px-3 py-1 rounded-bl-lg z-[1]">
                  BEST VALUE
                </div>
              )}

              {offer.highlight && (
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <div className="absolute top-0 left-0 w-1/3 h-1/2 bg-blue-900" />
                  {[...Array(7)].map((_, i) => (
                    <div
                      key={i}
                      className={`absolute left-0 right-0 h-[7%] ${i % 2 === 0 ? "bg-red-600" : "bg-transparent"}`}
                      style={{ top: `${50 + i * 7}%` }}
                    />
                  ))}
                </div>
              )}

              <div className="relative p-4 sm:p-5 flex flex-col flex-1 min-h-0">
                <div
                  className={`mb-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                    offer.highlight ? "bg-white/20" : "bg-brand-blue/10"
                  }`}
                >
                  <offer.icon
                    className={`size-5 ${offer.highlight ? "text-white" : "text-brand-blue"}`}
                    aria-hidden
                  />
                </div>

                <div
                  className={`text-2xl font-bold mb-2 ${
                    offer.highlight ? "text-brand-yellow" : "text-brand-blue"
                  }`}
                >
                  {offer.discount}
                </div>

                <h3 className="text-base font-bold mb-1.5">{offer.title}</h3>

                <p
                  className={`text-sm leading-relaxed mb-3 ${
                    offer.highlight ? "text-white/80" : "text-muted-foreground"
                  }`}
                >
                  {offer.description}
                </p>

                <small
                  className={`text-sm leading-relaxed block mb-4 ${
                    offer.highlight ? "text-white/80" : "text-muted-foreground"
                  }`}
                >
                  {offer.terms}
                </small>

                <div className="mt-auto pt-0">
                  <Button
                    type="button"
                    onClick={() => onOpenQuoteForm(offer.id)}
                    className={`w-full ${
                      offer.highlight
                        ? "bg-brand-yellow text-brand-blue-dark hover:bg-brand-yellow-dark"
                        : "bg-brand-blue text-white hover:bg-brand-blue-light"
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
