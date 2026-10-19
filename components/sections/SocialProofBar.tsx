"use client"

import type { ComponentType, ReactNode } from "react"
import { CalendarDays, Home, ShieldCheck, Star } from "lucide-react"
import { CountUp } from "@/components/motion/CountUp"
import { GOOGLE_REVIEW_COUNT, GOOGLE_REVIEW_RATING } from "@/data/review-summary"

/** Full-width trust strip shown below heroes. Numbers count up on scroll. */
type Stat = {
  Icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>
  value: ReactNode
  label: string
}

const stats: Stat[] = [
  {
    Icon: Home,
    value: <CountUp to={500} suffix="+" />,
    label: "Properties cleaned",
  },
  {
    Icon: Star,
    value: GOOGLE_REVIEW_RATING.toFixed(1),
    label: `Google rating (${GOOGLE_REVIEW_COUNT} reviews)`,
  },
  {
    Icon: CalendarDays,
    value: <CountUp to={16} duration={0.8} />,
    label: "Years in business",
  },
  {
    Icon: ShieldCheck,
    value: "Licensed",
    label: "and fully insured",
  },
]

export function SocialProofBar() {
  return (
    <section aria-label="Pressure Washing Xperts at a glance" className="border-y border-border bg-white">
      <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-6 px-4 py-8 sm:px-6 lg:grid-cols-4 lg:px-8">
        {stats.map(({ Icon, value, label }) => (
          <div key={label} className="flex items-center gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent text-brand-blue">
              <Icon className="size-5" aria-hidden />
            </span>
            <div className="min-w-0">
              <dt className="sr-only">{label}</dt>
              <dd className="text-2xl font-bold leading-none tracking-tight text-brand-blue-dark">{value}</dd>
              <dd className="mt-1 text-sm leading-snug text-muted-foreground">{label}</dd>
            </div>
          </div>
        ))}
      </dl>
    </section>
  )
}
