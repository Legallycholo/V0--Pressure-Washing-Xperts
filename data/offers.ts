import type { LucideIcon } from "lucide-react"
import { Calendar, Gift, Percent, Tag } from "lucide-react"

export type OfferId =
  | "first-time"
  | "bundle"
  | "seasonal"
  | "referral"

const OFFER_IDS: OfferId[] = [
  "first-time",
  "bundle",
  "seasonal",
  "referral",
]

export function isOfferId(value: unknown): value is OfferId {
  return typeof value === "string" && OFFER_IDS.includes(value as OfferId)
}

/** Select value when the user is not claiming a specific offer */
export const OFFER_NONE = "none" as const

/** Shown with every offer: final pricing depends on scope and square footage. */
export const OFFER_PRICING_SQFT_DISCLAIMER =
  "Pricing starts at a $250 minimum. Square footage and scope can increase the estimate. Offers are applied after the estimate, and final pricing will not go below $250."

export interface Offer {
  id: OfferId
  icon: LucideIcon
  title: string
  discount: string
  description: string
  terms: string
  highlight: boolean
  /** Higher = premium “largest job” tier; used for upsell (see getPremiumOffer). */
  premiumRank: number
}

export const offers: Offer[] = [
  {
    id: "first-time",
    icon: Gift,
    title: "New Customer Welcome",
    discount: "15% OFF",
    description:
      "New customer? Save 15% on your first exterior cleaning.",
    terms:
      "For first completed jobs only. 15% discount is applied after your square-footage estimate. Cannot combine with other offers.",
    highlight: false,
    premiumRank: 3,
  },
  {
    id: "bundle",
    icon: Tag,
    title: "Curb Appeal Bundle",
    discount: "20% OFF",
    description:
      "Book house washing with another qualifying service in one visit and save 20%.",
    terms:
      "Applies to two or more qualifying services in one scheduled visit. 20% discount is applied after your square-footage estimate. Cannot combine with other offers.",
    highlight: true,
    premiumRank: 4,
  },
  {
    id: "seasonal",
    icon: Calendar,
    title: "Spring & Fall (House Wash + Driveway Bundle)",
    discount: "10% OFF",
    description:
      "Save 10% when you book house wash + driveway in spring or fall.",
    terms:
      "Valid for Mar-May or Sep-Nov combined jobs. 10% discount is applied after your square-footage estimate. Cannot combine with other offers.",
    highlight: false,
    premiumRank: 1,
  },
  {
    id: "referral",
    icon: Percent,
    title: "Refer a Neighbor",
    discount: "$50 EACH",
    description:
      "Refer a neighbor and you both get $50 off a future booking.",
    terms:
      "Your referral must complete a paid service and mention your name. $50 referral credit applies after your estimate on qualifying jobs. Cannot combine with other offers.",
    highlight: false,
    premiumRank: 2,
  },
]

export function getOfferById(id: OfferId): Offer | undefined {
  return offers.find((o) => o.id === id)
}

/** Highest premium tier: default upsell for larger combined jobs (Curb Appeal Bundle). */
export function getPremiumOffer(): Offer {
  return offers.reduce((best, o) => (o.premiumRank > best.premiumRank ? o : best))
}

/**
 * Contact form: why we suggest the bundle instead of framing it as “most expensive.”
 * Benefit-focused and accurate to the offer (combined services, one visit, published savings example).
 */
export const PREMIUM_OFFER_UPSELL_EXPLANATION =
  "Choose the Curb Appeal Bundle when you need more than one surface cleaned. You get 20% off qualifying services in one visit, which is usually the biggest dollar savings."

/** Short line for the bundle action button (under the title). */
export const PREMIUM_OFFER_UPSELL_BUTTON_SUBLINE =
  "20% off qualifying services in one visit."
