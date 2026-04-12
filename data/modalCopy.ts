/** Default quote modal (header, services, FAQ, etc.) */
export const modalCopyDefault = {
  headline: "Get your free estimate",
  subline:
    "Tell us what you need—we usually reply within one business day. No obligation.",
  badge: "Free estimate",
  submitLabel: "Send my quote request",
  successExtra: null as string | null,
  successLead: "Your quote request was sent successfully.",
  successFollowUp:
    "We typically respond within one business day. You may receive a call or text from (800) 451-7213.",
  trustNote:
    "Licensed and insured. Free estimate, no obligation. We use your contact info only to follow up on this request.",
}

/** Opened from Special Offers — Claim Offer */
export const modalCopyOfferIntent = {
  ...modalCopyDefault,
  headline: "Claim your offer",
  subline:
    "Send your details and we'll confirm eligibility and apply the offer when we prepare your estimate.",
  badge: "Special offer",
  submitLabel: "Claim offer & send details",
  successExtra:
    "We'll confirm this offer and any discount when we contact you, subject to posted terms.",
}
