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
    title: "New Customer Welcome",
    discount: "15% OFF",
    description:
      "First time hiring Pressure Washing Xperts? Save on your first residential or commercial exterior cleaning.",
    terms:
      "New customers only, first completed job. Example: 15% off a $230 house wash saves you $34.50. Cannot be combined with other offers. Minimum job total applies.",
    highlight: false,
  },
  {
    id: "bundle",
    icon: Tag,
    title: "Curb Appeal Bundle",
    discount: "20% OFF",
    description:
      "Book house washing together with driveway, sidewalk, deck, or another qualifying service on the same visit.",
    terms:
      "At least two qualifying services on one scheduled visit. Example: house wash + driveway ($230 + $235 = $465) at 20% off saves you $93. Cannot be combined with other offers. Minimum job total applies.",
    highlight: true,
  },
  {
    id: "seasonal",
    icon: Calendar,
    title: "Spring & Fall Refresh",
    discount: "10% OFF",
    description:
      "Plan ahead for peak pollen and leaf season: lock in savings during our spring (Mar-May) and fall (Sep-Nov) windows.",
    terms:
      "Valid for jobs scheduled in March-May or September-November. Example: 10% off a $230 house wash saves you $23. Cannot be combined with other offers. Minimum job total applies.",
    highlight: false,
  },
  {
    id: "referral",
    icon: Percent,
    title: "Refer a Neighbor",
    discount: "$50 EACH",
    description:
      "Share us with a friend. When they complete a paid service, you both receive $50 off a future booking.",
    terms:
      "Referral must mention you and complete a paid service. $50 credit applies to your next qualifying job (e.g., toward a $230 house wash or $235 driveway clean). Cannot be combined with other offers. Minimum job total applies.",
    highlight: false,
  },
]
