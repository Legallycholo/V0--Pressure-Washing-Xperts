"use client"

import Link from "next/link"
import { Phone, Mail, MapPin, Clock, ArrowUp, Star } from "lucide-react"
import {
  commercialServices,
  quickLinks,
  residentialServices,
} from "@/data/navigation"
import { cityNameToSlug, primaryServiceAreaCities } from "@/data/service-areas"
import { SITE_CONTENT_LAST_UPDATED_ISO } from "@/data/site-content-version"
import {
  businessAddress,
  businessEmail,
  businessHoursSummary,
  businessMapsUrl,
  businessPhoneDisplay,
  businessPhoneTelHref,
  navSlogan,
} from "@/data/site"
import { formatSiteContentLastUpdatedLabel } from "@/lib/format-site-content-date"
import { GOOGLE_REVIEW_COUNT, GOOGLE_REVIEW_RATING } from "@/data/review-summary"

const footerServiceHrefs = [
  "/services/residential/house-washing",
  "/roof-cleaning",
  "/power-washing",
  "/soft-washing",
  "/services/residential/driveways-sidewalks",
  "/services/residential/decks-fences",
  "/services/commercial/building-washing",
  "/services/commercial/fleet-washing",
]

const allServices = [...residentialServices, ...commercialServices]
const services = footerServiceHrefs
  .map((href) => allServices.find((service) => service.href === href))
  .filter((service) => service !== undefined)

const linkClass = "text-sm text-white/65 transition-colors hover:text-white"

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-brand-blue-dark text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand + contact */}
          <div className="sm:col-span-2 lg:col-span-4">
            <Link href="/" className="text-lg font-bold tracking-tight text-white">
              Pressure Washing Xperts
            </Link>
            <p className="mt-2 text-sm font-medium text-brand-blue-light">{navSlogan}</p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/65">
              Licensed &amp; insured exterior cleaning across Metro Atlanta since 2010.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              <li>
                <a
                  href={businessPhoneTelHref}
                  className="inline-flex items-center gap-3 font-semibold text-white hover:text-brand-blue-light"
                >
                  <Phone className="size-4 text-brand-blue-light" aria-hidden />
                  {businessPhoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${businessEmail}`}
                  className="inline-flex items-center gap-3 break-all text-white/75 hover:text-white"
                >
                  <Mail className="size-4 shrink-0 text-brand-blue-light" aria-hidden />
                  {businessEmail}
                </a>
              </li>
              <li>
                <a
                  href={businessMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-start gap-3 text-white/75 hover:text-white"
                >
                  <MapPin className="mt-0.5 size-4 shrink-0 text-brand-blue-light" aria-hidden />
                  {businessAddress}
                </a>
              </li>
              <li className="inline-flex items-center gap-3 text-white/75">
                <Clock className="size-4 shrink-0 text-brand-blue-light" aria-hidden />
                {businessHoursSummary}
              </li>
            </ul>
          </div>

          <nav aria-labelledby="footer-services" className="lg:col-span-3">
            <h3 id="footer-services" className="text-sm font-semibold uppercase tracking-wider text-white">
              Services
            </h3>
            <ul className="mt-4 space-y-2.5">
              {services.map((service) => (
                <li key={service.href}>
                  <Link href={service.href} className={linkClass}>
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-areas" className="lg:col-span-3">
            <h3 id="footer-areas" className="text-sm font-semibold uppercase tracking-wider text-white">
              Service Areas
            </h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5">
              {primaryServiceAreaCities.map((city) => (
                <li key={city}>
                  <Link href={`/service-areas/${cityNameToSlug(city)}`} className={linkClass}>
                    {city}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-company" className="lg:col-span-2">
            <h3 id="footer-company" className="text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="border-t border-white/10">
        {/* Extra bottom padding on mobile keeps this row clear of the sticky call bar */}
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 pt-6 pb-24 text-xs text-white/50 sm:px-6 md:flex-row md:items-center md:justify-between md:pb-6 lg:px-8">
          <div className="space-y-1 text-center md:text-left">
            <p>&copy; {new Date().getFullYear()} Pressure Washing Xperts LLC. All rights reserved.</p>
            <p>
              Content updated {formatSiteContentLastUpdatedLabel(SITE_CONTENT_LAST_UPDATED_ISO)} · SEO+ Website by{" "}
              <a
                href="https://www.tanygrowth.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/65 underline-offset-2 hover:text-white hover:underline"
              >
                tanygrow
              </a>
            </p>
          </div>
          <div className="flex items-center justify-center gap-6">
            <Link href="/reviews" className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white">
              <Star className="size-4 fill-amber-400 text-amber-400" aria-hidden />
              {GOOGLE_REVIEW_RATING.toFixed(1)} · {GOOGLE_REVIEW_COUNT} Google reviews
            </Link>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white"
            >
              Back to top
              <ArrowUp className="size-4" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
