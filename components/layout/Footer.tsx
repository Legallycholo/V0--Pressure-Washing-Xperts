"use client"

import { Fragment } from "react"
import Link from "next/link"
import { Phone, Mail, MapPin, ArrowUp } from "lucide-react"
import {
  commercialServices,
  quickLinks,
  residentialServices,
} from "@/data/navigation"
import { cityNameToSlug, primaryServiceAreaCities } from "@/data/service-areas"
import { SITE_CONTENT_LAST_UPDATED_ISO } from "@/data/site-content-version"
import {
  businessAddress,
  businessHoursRows,
  businessMapsUrl,
  businessPhoneDisplay,
  businessPhoneTel,
} from "@/data/site"
import { formatSiteContentLastUpdatedLabel } from "@/lib/format-site-content-date"
import { ctaPress } from "@/lib/ctaInteraction"
import { RevealGroup, RevealItem } from "@/components/motion/Reveal"

const services = [
  ...residentialServices.slice(0, 4),
  ...commercialServices.slice(0, 3),
]

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-ps-bg border-t-2 border-ps-cyan/30">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <RevealGroup className="grid gap-7 md:grid-cols-2 lg:grid-cols-5" stagger={0.08}>
          {/* Brand Column */}
          <RevealItem className="lg:col-span-1">
            <Link
              href="/"
              className="inline-block mb-4 text-lg font-bold text-white tracking-tight hover:text-brand-yellow transition-colors"
            >
              Pressure Washing Xperts
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              Licensed &amp; insured pressure washing across Metro Atlanta since 2010.
            </p>
            <a
              href={`tel:+1${businessPhoneTel}`}
              className={`inline-flex items-center gap-2 text-ps-cyan transition-colors hover:text-brand-yellow-dark text-glow-cyan ${ctaPress}`}
              aria-label={`Call us now at ${businessPhoneDisplay}`}
            >
              <Phone className="size-5 shrink-0" />
              <span className="font-display text-2xl tracking-wide">{businessPhoneDisplay}</span>
            </a>
          </RevealItem>

          {/* Services Column */}
          <RevealItem>
            <h3 className="text-white font-bold text-base mb-4">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-white/60 text-sm hover:text-brand-yellow transition-colors"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </RevealItem>

          {/* Areas We Serve Column */}
          <RevealItem>
            <h3 className="text-white font-bold text-base mb-4">Areas We Serve</h3>
            <ul className="space-y-3">
              {primaryServiceAreaCities.map((city) => {
                const citySlug = cityNameToSlug(city)
                const cityHref = `/service-areas/${citySlug}`

                return (
                  <li key={cityHref}>
                    <Link
                      href={cityHref}
                      className="text-white/60 text-sm hover:text-brand-yellow transition-colors"
                    >
                      {city}, GA
                    </Link>
                  </li>
                )
              })}
            </ul>
          </RevealItem>

          {/* Quick Links Column */}
          <RevealItem>
            <h3 className="text-white font-bold text-base mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 text-sm hover:text-brand-yellow transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </RevealItem>

          {/* Contact Column */}
          <RevealItem>
            <h3 className="text-white font-bold text-base mb-4">Contact Us</h3>
            <address className="not-italic text-sm text-white/70 leading-relaxed mb-4">
              <p className="font-semibold text-white">Pressure Washing Xperts</p>
            </address>
            <div className="space-y-3">
              <a
                href={`tel:+1${businessPhoneTel}`}
                className={`flex items-center gap-3 rounded-md text-white/60 transition-colors hover:text-brand-yellow hover:bg-white/5 ${ctaPress}`}
              >
                <Phone className="size-5 text-brand-yellow" />
                <span className="text-sm">{businessPhoneDisplay}</span>
              </a>
              <a
                href="mailto:pressurewashingxperts@gmail.com"
                className={`flex items-center gap-3 rounded-md text-white/60 transition-colors hover:text-brand-yellow hover:bg-white/5 ${ctaPress}`}
              >
                <Mail className="size-5 text-brand-yellow" />
                <span className="text-sm break-all">pressurewashingxperts@gmail.com</span>
              </a>
              <a
                href={businessMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-start gap-3 rounded-md text-white/60 transition-colors hover:text-brand-yellow hover:bg-white/5 ${ctaPress}`}
              >
                <MapPin className="size-5 text-brand-yellow mt-0.5 shrink-0" />
                <span className="text-sm">{businessAddress}</span>
              </a>
              <details className="group rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 [&_summary::-webkit-details-marker]:hidden">
                <summary className="cursor-pointer text-sm font-medium text-brand-yellow hover:text-brand-yellow/90 list-none">
                  See business hours
                </summary>
                <div className="mt-3 border-t border-white/10 pt-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-white/50 mb-2">
                    Hours
                  </p>
                  <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-xs text-white/75">
                    {businessHoursRows.map(({ day, hours }) => (
                      <Fragment key={day}>
                        <dt className="text-white/55 whitespace-nowrap">{day}</dt>
                        <dd className="text-white/90 tabular-nums">{hours}</dd>
                      </Fragment>
                    ))}
                  </dl>
                </div>
              </details>
            </div>

            {/* Social media links: add real URLs when available */}
            <div className="mt-4">
              <p className="text-white/40 text-sm mb-2">Follow Us</p>
              <div className="flex gap-3">
                {["FB", "IG", "YT", "TW"].map((social) => (
                  <span
                    key={social}
                    className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white/30 text-xs font-bold"
                    aria-hidden="true"
                  >
                    {social}
                  </span>
                ))}
              </div>
            </div>
          </RevealItem>
        </RevealGroup>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="text-center md:text-left space-y-1">
              <p className="text-white/40 text-sm">
                &copy; {new Date().getFullYear()} Pressure Washing Xperts. All rights reserved.
              </p>
              <p className="text-white/35 text-xs">
                Site content last updated:{" "}
                {formatSiteContentLastUpdatedLabel(SITE_CONTENT_LAST_UPDATED_ISO)}
              </p>
              <p className="text-white/35 text-xs">
                SEO+ Website by{" "}
                <a
                  href="https://www.tanygrowth.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-brand-yellow transition-colors underline-offset-2 hover:underline"
                >
                  tanygrow
                </a>
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-6 gap-y-2">
              <span className="text-white/40 text-sm">★ 5.0 Rated · 32+ Reviews</span>
              <span className="text-white/40 text-sm">Licensed &amp; Insured</span>
              <button
                onClick={scrollToTop}
                className="flex items-center gap-2 text-white/60 hover:text-brand-yellow transition-colors text-sm"
                aria-label="Back to top"
              >
                Back to Top
                <ArrowUp className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
