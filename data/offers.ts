import type { LucideIcon } from "lucide-react"
import { Calendar, Gift, Percent, Tag } from "lucide-react"

export type OfferId = "first-time" | "bundle" | "seasonal" | "referral"

const OFFER_IDS: OfferId[] = ["first-time", "bundle", "seasonal", "referral"]

export function isOfferId(value: unknown): value is OfferId {
  return typeof value === "string" && OFFER_IDS.includes(value as OfferId)
}

/** Select value when the user is not claiming a specific offer */
export const OFFER_NONE = "none" as const

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
    title: "First Time Customer",
    discount: "15% OFF",
    description:
      "New to Pressure Washing Xperts? Enjoy 15% off your first service with us.",
    terms: "Valid for first-time customers only. Cannot be combined with other offers.",
    highlight: false,
  },
  {
    id: "bundle",
    icon: Tag,
    title: "Bundle & Save",
    discount: "20% OFF",
    description:
      "Book multiple services together and save big! Perfect for comprehensive property cleaning.",
    terms: "Minimum 2 services required. $250 minimum spend for discount activation.",
    highlight: true,
  },
  {
    id: "seasonal",
    icon: Calendar,
    title: "Seasonal Special",
    discount: "10% OFF",
    description:
      "Take advantage of our seasonal pricing for spring and fall cleaning services.",
    terms: "Valid during promotional periods. Check availability in your area.",
    highlight: false,
  },
  {
    id: "referral",
    icon: Percent,
    title: "Referral Bonus",
    discount: "$50 OFF",
    description:
      "Refer a friend and you both receive $50 off your next service. Everyone wins!",
    terms: "Referral must complete a service. Discount applied to next booking.",
    highlight: false,
  },
]
