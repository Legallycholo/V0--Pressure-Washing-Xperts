import type { LucideIcon } from "lucide-react"
import { Gift, Users } from "lucide-react"

export type OfferId = "first-time" | "referral"

const OFFER_IDS: OfferId[] = ["first-time", "referral"]

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
    highlight: true,
  },
  {
    id: "referral",
    icon: Users,
    title: "Refer a Neighbor",
    discount: "$50 EACH",
    description:
      "Refer a neighbor and you both get $50 off a future booking.",
    terms:
      "Your referral must complete a paid service and mention your name. $50 referral credit applies after your estimate on qualifying jobs. Cannot combine with other offers.",
    highlight: false,
  },
]

export function getOfferById(id: OfferId): Offer | undefined {
  return offers.find((o) => o.id === id)
}
