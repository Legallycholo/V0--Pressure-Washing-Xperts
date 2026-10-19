"use client"

import type { ComponentType, ReactNode } from "react"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { ContactForm } from "@/components/ContactForm"
import { SectionHeading } from "@/components/sections/SectionHeading"
import {
  businessAddress,
  businessEmail,
  businessHoursSummary,
  businessMapsUrl,
  businessPhoneDisplay,
  businessPhoneTelHref,
} from "@/data/site"

type ContactRow = {
  Icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>
  label: string
  value: ReactNode
  href?: string
  external?: boolean
}

const rows: ContactRow[] = [
  { Icon: Phone, label: "Call or text", value: businessPhoneDisplay, href: businessPhoneTelHref },
  { Icon: Mail, label: "Email", value: businessEmail, href: `mailto:${businessEmail}` },
  { Icon: Clock, label: "Hours", value: businessHoursSummary },
  { Icon: MapPin, label: "Location", value: businessAddress, href: businessMapsUrl, external: true },
]

interface ContactSectionProps {
  /** Use `h1` when this section is the main heading of the page (/contact). */
  headingAs?: "h1" | "h2"
}

export function ContactSection({ headingAs = "h2" }: ContactSectionProps) {
  return (
    <section id="contact" className="scroll-offset-header bg-section-light py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
        <div className="min-w-0 lg:col-span-5">
          <SectionHeading
            as={headingAs}
            align="start"
            eyebrow="Contact us"
            title="Get your free quote"
            description="The fastest way to get pricing is to call. We answer 7 days a week and can often get you on the schedule the same day. Prefer to write? Send the form and we'll call you back."
          />

          <ul className="mt-8 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-white">
            {rows.map(({ Icon, label, value, href, external }) => {
              const content = (
                <>
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent text-brand-blue">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {label}
                    </span>
                    <span className="block font-semibold text-brand-blue-dark [overflow-wrap:anywhere]">{value}</span>
                  </span>
                </>
              )
              return (
                <li key={label}>
                  {href ? (
                    <a
                      href={href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-accent/60"
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 px-5 py-4">{content}</div>
                  )}
                </li>
              )
            })}
          </ul>
        </div>

        <div className="min-w-0 lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
