"use client"

import { CalendarCheck, Clock, Home, ShieldCheck, Star } from "lucide-react"

/**
 * Social-proof strip rendered directly below the hero. Reinforces the
 * call-first trust signals from the Google Ads copy (5-star, licensed,
 * since 2010, same-day, homes washed).
 */
const trustSignals = [
  {
    Icon: Star,
    title: "5.0 Google Rating",
    detail: "32+ Verified Reviews",
  },
  {
    Icon: ShieldCheck,
    title: "Licensed & Insured",
    detail: "Fully Covered Crews",
  },
  {
    Icon: CalendarCheck,
    title: "Serving Atlanta Since 2010",
    detail: "16 Years of Experience",
  },
  {
    Icon: Clock,
    title: "Same-Day Availability",
    detail: "We Answer 7 Days a Week",
  },
  {
    Icon: Home,
    title: "100+ Homes Washed",
    detail: "Residential & Commercial",
  },
] as const

export function TrustBar() {
  return (
    <section
      aria-label="Why homeowners trust Pressure Washing Xperts"
      className="border-y border-border/60 bg-white"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
        <ul className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3 lg:grid-cols-5">
          {trustSignals.map(({ Icon, title, detail }) => (
            <li
              key={title}
              className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:gap-3 sm:text-left"
            >
              <span className="mb-2 inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-yellow/15 text-brand-blue sm:mb-0">
                <Icon className="size-5" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-bold leading-tight text-brand-blue-dark">
                  {title}
                </span>
                <span className="block text-xs leading-tight text-muted-foreground">
                  {detail}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
