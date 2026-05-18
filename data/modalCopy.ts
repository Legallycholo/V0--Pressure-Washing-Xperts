/** Default quote modal (header, services, FAQ, etc.) */
export const modalCopyDefault = {
  headline: "Book your free on-site quote",
  subline:
    "We come to your property, look at the job, and give you a straight price — no guessing, no obligation.",
  badge: "Free on-site quote",
  submitLabel: "Request my free on-site quote",
  successExtra: null as string | null,
  successLead: "We'll reach out to schedule your free on-site visit.",
  successFollowUp:
    "We usually call or text within one business day to book your on-site quote. You may hear from us at (800) 451-7213.",
  trustNote:
    "No commitment required. We come to you, assess the job, and give you an exact price.",
}

/** Opened from Special Offers: Claim Offer */
export const modalCopyOfferIntent = {
  ...modalCopyDefault,
  headline: "Claim your offer",
  subline:
    "Send your details and we will confirm your offer when we prepare your estimate.",
  badge: "Special offer",
  submitLabel: "Claim offer & send details",
  successExtra:
    "We will confirm this offer and discount when we contact you, based on posted terms.",
}
