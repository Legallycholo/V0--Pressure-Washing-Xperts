/**
 * States shown in contact / quote form state dropdowns site-wide.
 */
export const CONTACT_FORM_STATES = [
  "Alabama",
  "Florida",
  "Georgia",
  "South Carolina",
  "Tennessee",
  "North Carolina",
] as const

export type ContactFormState = (typeof CONTACT_FORM_STATES)[number]
