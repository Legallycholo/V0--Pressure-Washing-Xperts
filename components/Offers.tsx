"use client"

import { Tag, Percent, Gift, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

const offers = [
  {
    id: "first-time",
    icon: Gift,
    title: "First Time Customer",
    discount: "15% OFF",
    description: "New to Pressure Washing Xperts? Enjoy 15% off your first service with us.",
    terms: "Valid for first-time customers only. Cannot be combined with other offers.",
    highlight: false,
  },
  {
    id: "bundle",
    icon: Tag,
    title: "Bundle & Save",
    discount: "20% OFF",
    description: "Book multiple services together and save big! Perfect for comprehensive property cleaning.",
    terms: "Minimum 2 services required. $250 minimum spend for discount activation.",
    highlight: true,
  },
  {
    id: "seasonal",
    icon: Calendar,
    title: "Seasonal Special",
    discount: "10% OFF",
    description: "Take advantage of our seasonal pricing for spring and fall cleaning services.",
    terms: "Valid during promotional periods. Check availability in your area.",
    highlight: false,
  },
  {
    id: "referral",
    icon: Percent,
    title: "Referral Bonus",
    discount: "$50 OFF",
    description: "Refer a friend and you both receive $50 off your next service. Everyone wins!",
    terms: "Referral must complete a service. Discount applied to next booking.",
    highlight: false,
  },
]

interface OffersProps {
  onOpenQuoteForm: () => void
}

export function Offers({ onOpenQuoteForm }: OffersProps) {
  return (
    <section className="py-20 bg-section-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-brand-blue font-semibold text-sm uppercase tracking-wider mb-3">
            Special Offers
          </p>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl text-balance">
            Exclusive Deals for You
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
            Take advantage of our special offers and save on professional pressure washing services.
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {offers.map((offer, index) => (
            <div
              key={offer.id}
              className={`relative rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fade-in-up stagger-${index + 1} ${
                offer.highlight
                  ? "bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white ring-2 ring-brand-yellow"
                  : "bg-white text-foreground shadow-lg"
              }`}
              style={{ opacity: 0 }}
            >
              {/* Highlight Badge */}
              {offer.highlight && (
                <div className="absolute top-0 right-0 bg-brand-yellow text-brand-blue-dark text-xs font-bold px-3 py-1 rounded-bl-lg">
                  BEST VALUE
                </div>
              )}

              {/* American Flag Pattern for Bundle Card */}
              {offer.highlight && (
                <div className="absolute inset-0 opacity-10">
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

              <div className="relative p-6">
                {/* Icon */}
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${
                  offer.highlight ? "bg-white/20" : "bg-brand-blue/10"
                }`}>
                  <offer.icon className={`size-6 ${offer.highlight ? "text-white" : "text-brand-blue"}`} />
                </div>

                {/* Discount */}
                <div className={`text-3xl font-bold mb-2 ${
                  offer.highlight ? "text-brand-yellow" : "text-brand-blue"
                }`}>
                  {offer.discount}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold mb-2">
                  {offer.title}
                </h3>

                {/* Description */}
                <p className={`text-sm leading-relaxed mb-4 ${
                  offer.highlight ? "text-white/80" : "text-muted-foreground"
                }`}>
                  {offer.description}
                </p>

                {/* Terms */}
                <p className={`text-xs mb-4 ${
                  offer.highlight ? "text-white/60" : "text-muted-foreground/70"
                }`}>
                  {offer.terms}
                </p>

                {/* CTA Button */}
                <Button
                  onClick={onOpenQuoteForm}
                  className={`w-full ${
                    offer.highlight
                      ? "bg-brand-yellow text-brand-blue-dark hover:bg-brand-yellow-dark"
                      : "bg-brand-blue text-white hover:bg-brand-blue-light"
                  }`}
                >
                  Claim Offer
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Offers cannot be combined. $250 minimum spend required for discount activation. Contact us for full terms and conditions.
        </p>
      </div>
    </section>
  )
}
