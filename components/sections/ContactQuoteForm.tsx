"use client"

import { ContactForm } from "@/components/ContactForm"
import { modalCopyDefault } from "@/data/modalCopy"

export type QuoteFormCopy = typeof modalCopyDefault

export interface ContactQuoteFormProps {
  variant?: "modal" | "inline"
  copy?: QuoteFormCopy
  showOfferSelect?: boolean
  initialOfferId?: string
  className?: string
  successRedirectHref?: string
}

/** All page forms intentionally render the homepage's canonical contact form. */
export function ContactQuoteForm({
  className,
  successRedirectHref,
}: ContactQuoteFormProps) {
  return <ContactForm className={className} successRedirectHref={successRedirectHref} />
}
