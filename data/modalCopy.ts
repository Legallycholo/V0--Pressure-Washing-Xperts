/** Default quote modal (header, services, FAQ, etc.) */
export const modalCopyDefault = {
  headline: "Request a callback",
  subline:
    "Tell us what needs cleaning and we will help confirm the scope and next available time.",
  badge: "Ready to get scheduled",
  submitLabel: "Request my callback",
  successExtra: null as string | null,
  successLead: "We received your callback request.",
  successFollowUp:
    "We usually call or text within one business day to confirm the job and next available time. You may hear from us at (800) 451-7213.",
  trustNote:
    "Tell us what you need cleaned and we will take it from there.",
}

/** Opened from Special Offers: Claim Offer */
export const modalCopyOfferIntent = {
  ...modalCopyDefault,
  headline: "Claim your offer",
  subline:
    "Send your details and we will confirm the service and scheduling details when we call.",
  badge: "Special offer",
  submitLabel: "Claim offer & send details",
  successExtra:
    "We will confirm this offer and discount when we contact you, based on posted terms.",
}
