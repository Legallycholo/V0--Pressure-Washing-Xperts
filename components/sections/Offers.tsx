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
      className="py-20 bg-section-light"
      aria-labelledby="offers-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-brand-blue font-semibold text-sm uppercase tracking-wider mb-3">
            Special Offers
          </p>
          <h2
            id="offers-heading"
            className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl text-balance"
          >
            Save on Bundles &amp; Seasonal Service
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
            Pick the promo that fits your job—new customers, multi-service
            visits, spring and fall scheduling, and neighbor referrals.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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

              <div className="relative p-6 flex flex-col flex-1 min-h-0">
                <div
                  className={`mb-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${
                    offer.highlight ? "bg-white/20" : "bg-brand-blue/10"
                  }`}
                >
                  <offer.icon
                    className={`size-6 ${offer.highlight ? "text-white" : "text-brand-blue"}`}
                    aria-hidden
                  />
                </div>

                <div
                  className={`text-3xl font-bold mb-2 ${
                    offer.highlight ? "text-brand-yellow" : "text-brand-blue"
                  }`}
                >
                  {offer.discount}
                </div>

                <h3 className="text-lg font-bold mb-2">{offer.title}</h3>

                <p
                  className={`text-sm leading-relaxed mb-4 ${
                    offer.highlight ? "text-white/80" : "text-muted-foreground"
                  }`}
                >
                  {offer.description}
                </p>

                <small
                  className={`text-xs block mb-4 ${
                    offer.highlight ? "text-white/60" : "text-muted-foreground/70"
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

        <p className="mt-8 text-center text-sm text-muted-foreground max-w-3xl mx-auto">
          Offers cannot be combined. A $250 minimum job total applies before any
          discount. Referral credits are issued after the referred customer
          completes a paid service. Contact us for full terms.
        </p>
      </div>
    </section>
  )
}
