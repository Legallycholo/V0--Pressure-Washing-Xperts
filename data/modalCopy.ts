/** Default quote modal (header, services, FAQ, etc.) */
export const modalCopyDefault = {
  headline: "Get your free estimate",
  subline:
    "Tell us what you need. We usually reply within one business day.",
  badge: "Free estimate",
  submitLabel: "Send my quote request",
  successExtra: null as string | null,
  successLead: "Your quote request was sent successfully.",
  successFollowUp:
    "We usually respond within one business day. You may get a call or text from (800) 451-7213.",
  trustNote:
    "Licensed and insured. Free estimate. We only use your contact info to follow up.",
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
