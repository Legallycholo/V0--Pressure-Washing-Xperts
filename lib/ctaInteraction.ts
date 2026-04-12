/** Shared Tailwind classes for conversion-focused controls (hover lift, press feedback). */

export const ctaPress =
  "transition-transform duration-200 active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100"

/** Dark-section contact rows (phone, email) */
export const contactRowDark =
  "group flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:border-brand-yellow/30 active:scale-[0.99] motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-none"

export const contactIconDark =
  "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110 motion-reduce:group-hover:scale-100"

/** Light cards (hubs, service lists) */
export const hubCardLight =
  "group rounded-lg border border-brand-blue/10 bg-white p-5 sm:p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-blue/40 hover:shadow-md active:scale-[0.99] motion-reduce:hover:translate-y-0"
