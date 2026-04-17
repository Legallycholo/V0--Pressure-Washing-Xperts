"use client"

import Link from "next/link"
import { Phone, Mail, MapPin, ArrowUp } from "lucide-react"
import {
  commercialServices,
  footerTopServiceAreaLinks,
  quickLinks,
  residentialServices,
} from "@/data/navigation"
import { SITE_CONTENT_LAST_UPDATED_ISO } from "@/data/site-content-version"
import { businessAddress, businessMapsUrl, businessPhoneDisplay, businessPhoneTel } from "@/data/site"
import { formatSiteContentLastUpdatedLabel } from "@/lib/format-site-content-date"
import { ctaPress } from "@/lib/ctaInteraction"

const services = [
  ...residentialServices.slice(0, 4),
  ...commercialServices.slice(0, 3),
]

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-section-dark-alt border-t border-white/10">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="inline-block mb-4 text-lg font-bold text-white tracking-tight hover:text-brand-yellow transition-colors"
            >
              Pressure Washing Xperts
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              Licensed & insured pressure washing across Metro Atlanta.
            </p>
          </div>

          {/* Services Column */}
          <div>
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
            <h4 className="text-white font-semibold text-sm mt-4 mb-2">Top Service Areas</h4>
            <ul className="space-y-2">
              {footerTopServiceAreaLinks.map((area) => (
                <li key={area.href}>
                  <Link
                    href={area.href}
                    className="text-white/60 text-sm hover:text-brand-yellow transition-colors"
                  >
                    {area.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
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
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-white font-bold text-base mb-4">Contact Us</h3>
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
            </div>

            {/* Social media links — add real URLs when available */}
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
          </div>
        </div>
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
            </div>
            <div className="flex items-center justify-center md:justify-end gap-6">
              <span className="text-white/40 text-sm">Licensed & Insured</span>
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
