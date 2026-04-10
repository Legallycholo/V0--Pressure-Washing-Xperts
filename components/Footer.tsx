"use client"

import Image from "next/image"
import Link from "next/link"
import { Phone, Mail, MapPin, ArrowUp } from "lucide-react"

const services = [
  "Residential Cleaning",
  "Commercial Cleaning",
  "Industrial Cleaning",
  "Roof Cleaning",
  "Driveway & Patio",
  "HOA & Community",
  "Masonry & Stone",
]

const quickLinks = [
  { href: "#services", label: "Services" },
  { href: "#gallery", label: "Gallery" },
  { href: "#why-us", label: "Why Choose Us" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
]

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-section-dark-alt border-t border-white/10">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/images/logo-new.png"
                alt="Pressure Washing Xperts Logo"
                width={400}
                height={140}
                className="h-24 w-auto object-contain"
              />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Professional pressure washing services for residential, commercial, and industrial properties. 
              Licensed & Insured. Where Pressure Meets Xpertise.
            </p>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    href="#services"
                    className="text-white/60 text-sm hover:text-brand-yellow transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
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
            <h3 className="text-white font-bold text-lg mb-6">Contact Us</h3>
            <div className="space-y-4">
              <a
                href="tel:800-451-7213"
                className="flex items-center gap-3 text-white/60 hover:text-brand-yellow transition-colors"
              >
                <Phone className="size-5 text-brand-yellow" />
                <span className="text-sm">(800)-451-7213</span>
              </a>
              <a
                href="mailto:pressurewashingxperts@gmail.com"
                className="flex items-center gap-3 text-white/60 hover:text-brand-yellow transition-colors"
              >
                <Mail className="size-5 text-brand-yellow" />
                <span className="text-sm break-all">pressurewashingxperts@gmail.com</span>
              </a>
              <div className="flex items-start gap-3 text-white/60">
                <MapPin className="size-5 text-brand-yellow mt-0.5" />
                <span className="text-sm">Serving Your Local Area</span>
              </div>
            </div>

            {/* Social Media Placeholder */}
            <div className="mt-6">
              <p className="text-white/40 text-sm mb-3">Follow Us</p>
              <div className="flex gap-3">
                {/* Placeholder social icons */}
                {["FB", "IG", "YT", "TW"].map((social) => (
                  <div
                    key={social}
                    className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white/40 text-xs font-bold hover:bg-brand-yellow hover:text-brand-blue-dark transition-colors cursor-pointer"
                  >
                    {social}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-white/40 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} Pressure Washing Xperts. All rights reserved.
            </p>
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
