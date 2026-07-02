# Master Checklist: 2026 Modernization

Updated continuously during implementation.

## Global
- [x] One motion voice: cubic-bezier(0.22, 1, 0.36, 1), transform/opacity only
- [x] No em dashes anywhere in user-facing copy
- [x] Section vertical rhythm standardized on homepage
- [x] No new JS dependencies added

## Copywriting
- [x] google_ads_final_template.md: em dashes removed, headlines/descriptions re-verified against limits
- [x] data/marketing-route-seo.ts rewritten (all descriptions, keeps SEO keywords)
- [x] data/home-faq.ts, data/modalCopy.ts humanized
- [x] ContactSection, WhyChooseUs, Services copy humanized
- [x] Service + area page templates (ServicePageTemplate, ServiceAreaPageTemplate)
- [x] Service leaf pages (house-washing, roof-soft-washing, driveways-sidewalks, residential-properties, odor-removal, commercial pages)
- [x] Marketing pages (soft-washing, roof-cleaning, power-washing, about pages, privacy, thank-you)
- [x] Homepage service-areas outro + layout description
- [x] Lead email templates: em dash placeholders -> N/A
- [x] ContactForm success message

## Hero
- [x] Eyebrow no longer duplicates H1
- [x] Trust pills use lucide icons instead of emoji
- [x] Entrance choreography kept (water beam + stagger)

## Navigation
- [x] No changes required (audit: functioning, consistent) - re-verify after other changes

## Services (stacking cards)
- [x] StackCards motion primitive created with reduced-motion fallback
- [x] Core six services render as scroll-stacking cards
- [x] Sticky offsets respect fixed header on mobile and desktop
- [x] Covered cards scale/dim smoothly (scroll-linked, no listeners)
- [x] Primary/supporting cards use viewport Reveal (no mount-time CSS animation)
- [x] Per-card CTA (call) remains one tap on mobile

## Gallery
- [x] Section wrappers use viewport Reveal instead of mount-time animation

## Testimonials
- [x] Swipe/drag works on mobile
- [x] Auto-advance pauses on hover/focus/touch
- [x] aria-live polite announcements
- [x] Badge accent aligned to theme

## Social proof bar
- [x] Emoji replaced with lucide icons

## Contact
- [x] Copy humanized, no em dashes
- [x] Form flow unchanged (no regression)

## Footer
- [x] Copy pass only, no structural change

## Mobile
- [x] Stacking cards comfortable at 375px (offsets, readable while stacked)
- [x] Carousel swipeable
- [x] No horizontal overflow on homepage at 375px
- [x] Tap targets >= 44px maintained

## Accessibility
- [x] prefers-reduced-motion honored by every new animation
- [x] Carousel WCAG 2.2.2 (pause on interaction) addressed
- [x] New cards keep single primary link + sibling tel CTA
- [x] Focus states preserved on all interactive elements

## Motion
- [x] Stacking cards implemented (n8n-inspired, brand-adapted)
- [x] No bounce/spin/gimmicks introduced
- [x] All new transforms GPU-friendly (transform/opacity)

## Performance
- [x] No scroll event listeners added
- [x] Build passes, no bundle bloat (zero new deps)
- [x] Hero LCP path untouched

## SEO
- [x] Keywords preserved through copy rewrites
- [x] Metadata lengths still reasonable after rewrites

## Verification
- [x] pnpm lint green
- [x] pnpm build green
- [x] Zero em dashes confirmed by grep
- [x] Ads template char counts re-verified
- [ ] Committed and pushed to PR #11 branch
