"use client"

import type { ReactNode } from "react"
import { CountUp } from "@/components/motion/CountUp"

/**
 * Full-width social-proof strip below the hero. Numbers count up on scroll.
 * Static row on desktop, auto-scrolling marquee on mobile.
 */
type Stat = {
  icon: string
  value: ReactNode
  label: string
}

const stats: Stat[] = [
  {
    icon: "🏠",
    value: <CountUp to={100} suffix="+" />,
    label: "Homes Cleaned",
  },
  {
    icon: "⭐",
    value: <CountUp to={5} decimals={1} duration={1} />,
    label: "Google Rating",
  },
  {
    icon: "📅",
    value: <CountUp to={16} duration={0.8} />,
    label: "Years in Business",
  },
  {
    icon: "✅",
    value: "Licensed",
    label: "& Insured",
  },
  {
    icon: "📞",
    value: "Same-Day",
    label: "Availability",
  },
]

function StatItem({ icon, value, label }: Stat) {
  return (
    <div className="flex items-center gap-3 px-6 sm:px-8 whitespace-nowrap">
      <span className="text-2xl" aria-hidden>
        {icon}
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-2xl sm:text-3xl tracking-wide text-ps-cyan">
          {value}
        </span>
        <span className="mt-1 text-xs sm:text-sm font-medium text-ps-text-muted">
          {label}
        </span>
      </span>
    </div>
  )
}

export function SocialProofBar() {
  return (
    <section
      aria-label="Pressure Washing Xperts at a glance"
      className="border-t border-ps-cyan/30 bg-ps-bg-alt overflow-hidden"
    >
      {/* Desktop: evenly spaced static row */}
      <div className="mx-auto hidden max-w-7xl items-center justify-between px-4 py-6 sm:flex">
        {stats.map((stat, i) => (
          <StatItem key={i} {...stat} />
        ))}
      </div>

      {/* Mobile: auto-scrolling marquee (duplicated for seamless loop) */}
      <div className="sm:hidden py-5">
        <div className="flex w-max animate-ps-marquee">
          {[...stats, ...stats].map((stat, i) => (
            <StatItem key={i} {...stat} />
          ))}
        </div>
      </div>
    </section>
  )
}
