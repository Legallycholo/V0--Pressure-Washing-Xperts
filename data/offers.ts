import type { LucideIcon } from "lucide-react"
import { Calendar, Gift, Percent, Tag } from "lucide-react"

export type OfferId = "first-time" | "bundle" | "seasonal" | "referral"

const OFFER_IDS: OfferId[] = ["first-time", "bundle", "seasonal", "referral"]

export function isOfferId(value: unknown): value is OfferId {
  return typeof value === "string" && OFFER_IDS.includes(value as OfferId)
}

/** Select value when the user is not claiming a specific offer */
export const OFFER_NONE = "none" as const

const standardTerms =
  "Cannot be combined with other offers. $250 minimum job total required for discount to apply."

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
    terms: `New customers only, first completed job. ${standardTerms}`,
    highlight: false,
  },
  {
    id: "bundle",
    icon: Tag,
    title: "Curb Appeal Bundle",
    discount: "20% OFF",
    description:
      "Book house washing together with driveway, sidewalk, deck, or another qualifying service on the same visit.",
    terms: `At least two qualifying services on one scheduled visit. ${standardTerms}`,
    highlight: true,
  },
  {
    id: "seasonal",
    icon: Calendar,
    title: "Spring & Fall Refresh",
    discount: "10% OFF",
    description:
      "Plan ahead for peak pollen and leaf season—lock in savings during our spring (Mar–May) and fall (Sep–Nov) windows.",
    terms: `Valid for jobs scheduled in March–May or September–November. ${standardTerms}`,
    highlight: false,
  },
  {
    id: "referral",
    icon: Percent,
    title: "Refer a Neighbor",
    discount: "$50 EACH",
    description:
      "Share us with a friend. When they complete a paid service, you both receive $50 off a future booking.",
    terms: `Referral must mention you and complete a paid service. Credits apply to your next qualifying job. ${standardTerms}`,
    highlight: false,
  },
]
