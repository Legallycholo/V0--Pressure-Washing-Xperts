# IMPROVEMENTS_GENERAL - Contact section, form, and global copy

This document tracks the homepage contact experience, shared business copy, and where it lives in code.

## Canonical copy

| Use | Text |
|-----|------|
| Navbar slogan (top bar) | We don't do "good enough." We do Xpert. |
| Physical address (navbar, footer, contact card) | 2193 Gateway Trl, Ellenwood, GA 30294 |

**Single source in code:** [`data/site.ts`](data/site.ts) - `navSlogan`, `businessAddress`, `businessAddressLines`, `businessMapsUrl`.

## What changed

1. **Header** ([`components/Header.tsx`](components/Header.tsx)) - Top bar uses `navSlogan` and the address from `data/site.ts` (one line on `xl+`, stacked below `xl`).
2. **Footer** ([`components/Footer.tsx`](components/Footer.tsx)) - Map pin row shows the real address and links to Google Maps (`businessMapsUrl`).
3. **Contact section** ([`components/ContactSection.tsx`](components/ContactSection.tsx)) - Right column is an inline quote form (`#contact-form`) with dark styling; the “24-48 Hour / Response Time” badge remains. Left column “Get a Free Quote Today” scrolls to the form and focuses the name field. Location card matches the footer address.
4. **Shared form** ([`components/ContactQuoteForm.tsx`](components/ContactQuoteForm.tsx)) - Same fields and mock submit behavior as before; `variant="modal"` vs `variant="inline"`. The modal ([`components/ContactFormModal.tsx`](components/ContactFormModal.tsx)) is a thin overlay wrapper.
5. **Docs** - Address added under Key Information in [`IMPLEMENTATION_KICKSTART.md`](IMPLEMENTATION_KICKSTART.md).

## Implementation checklist

- [x] Add `data/site.ts` and wire Header, Footer, ContactSection.
- [x] Extract `ContactQuoteForm`; wire `ContactFormModal` + `ContactSection`.
- [x] Style inline form + badge; mobile stacks below info column.
- [x] Update `IMPLEMENTATION_KICKSTART.md` with address.
- [x] Add this file (`IMPROVEMENTS_GENERAL.md`).

## Optional follow-ups

- Align other “Metro Atlanta” marketing strings site-wide if the brand is no longer region-first.
- Footer tagline still says “Where Pressure Meets Xpertise”; update only if marketing wants full alignment with the navbar slogan.
- Backend hookup for form submissions when ready.
