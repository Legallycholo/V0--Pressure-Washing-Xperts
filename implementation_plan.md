# Pressure Washing Xperts — Full Implementation Plan
**Generated:** May 12, 2026  
**Scope:** Google Ads fixes + Website tracking + SEO keyword injection + Conversion pipeline  
**Rule:** DO NOT change any existing URL paths. All edits are additive only — no redirects, no slug changes.

---

## AUDIT SUMMARY — What's Wrong Right Now

### Google Ads (5 critical issues found)

| # | Issue | Impact |
|---|-------|--------|
| 1 | Broad Match campaign only has ~9 of 22 required keywords | Missing 13 keywords = missing impressions |
| 2 | "House Washing Services" sitelink is DISAPPROVED — Destination not working | Wasted asset slot, Quality Score hurt |
| 3 | Sitelink pointing to `/contact` which does NOT exist on website | 404 for every click on that sitelink |
| 4 | No conversion action set up — Google has 0 conversion data | Smart Bidding cannot optimize, no ROI data |
| 5 | No UTM parameters on ad destination URLs | Zero attribution — can't tell which leads came from ads |

### Website / Codebase (4 critical issues found)

| # | Issue | Impact |
|---|-------|--------|
| 1 | UTM columns were DROPPED from Supabase (migration `20260424220000`) | Lead source attribution permanently lost |
| 2 | No `gtag('event','conversion')` fires anywhere — not on thank-you page, not in form | Google Ads has no signal to optimize bids |
| 3 | `gclid` (Google Click ID) never captured or stored | Offline conversion import impossible |
| 4 | "How did you hear about us?" has no "Google Ad" option | Manual attribution broken |

---

## SERVICES TO FOCUS ON (Recommendation)

Based on the keyword set (all residential/house-washing intent) and your current stage:

**Priority 1 — Run Ads On These Now:**
- **House Washing** — highest search volume, clearest buyer intent, $250–500 ticket
- **Driveway & Sidewalk Cleaning** — best bundle upsell, highly visual, drives reviews
- **Roof Soft Washing** — highest ticket ($400–700+), low competition, distinct keyword

**Priority 2 — Add to Ads in Month 2 (after conversion data):**
- **Commercial Building Washing** — higher ticket, less competition than residential
- **Storefront & Office Cleaning** — good entry into commercial, repeatable contracts

**Hold for Now:**
- Industrial, fleet, government — not enough site content or case studies yet

---

## PART 1 — GOOGLE ADS FIXES (Do This First, No Code Needed)

### Fix 1A — Add Missing Keywords to Broad Match Campaign

Go to: Campaigns → Lead Campaign — Broad Match → Keywords → + Add keywords

Add these 13 missing keywords (plain text, no brackets):

```
Power washing near me
Pressure washing services near me
House washing near me
Home pressure washing near me
House power washing near me
Home power washing near me
Exterior house washing near me
Pressure washing companies near me
Power washing services
Residential pressure washing services
House washing cost
House pressure washing cost
Power wash house cost
```

### Fix 1B — Fix the Disapproved "House Washing Services" Sitelink

Go to: Assets → find "House Washing Services" sitelink → Edit  
Change the Final URL from whatever it is to:  
`https://www.pressurewashingxpert.com/services/residential/house-washing`

### Fix 1C — Fix ALL Sitelink URLs to Match Real Pages

The website has NO `/contact` page. Update sitelinks to use real URLs:

| Sitelink Label | Correct URL |
|----------------|-------------|
| Get a Free Quote | `https://www.pressurewashingxpert.com/#contact` |
| House Washing Services | `https://www.pressurewashingxpert.com/services/residential/house-washing` |
| Driveway Pressure Wash | `https://www.pressurewashingxpert.com/services/residential/driveways-sidewalks` |
| Roof Soft Washing | `https://www.pressurewashingxpert.com/services/residential/roof-soft-washing` |
| Commercial Cleaning | `https://www.pressurewashingxpert.com/services/commercial/building-washing` |
| Service Areas | `https://www.pressurewashingxpert.com/service-areas` |

### Fix 1D — Add UTM Parameters to ALL Ad Final URLs

For every ad in both campaigns, update the Final URL to include UTM tracking:

**Broad Match campaign URL:**
```
https://www.pressurewashingxpert.com/?utm_source=google&utm_medium=cpc&utm_campaign=broad-match&utm_content=general
```

**Exact Match campaign URL:**
```
https://www.pressurewashingxpert.com/?utm_source=google&utm_medium=cpc&utm_campaign=exact-match&utm_content=general
```

Also add `{gclid}` as a ValueTrack parameter in the tracking template field:
```
{lpurl}?utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&gclid={gclid}
```

### Fix 1E — Set Up Conversion Action in Google Ads

Go to: Goals → Conversions → + New conversion action → Website

Settings:
- Category: Submit lead form
- Conversion name: `Form Submit - Free Quote`
- Value: Use the same value for each conversion → $50 (estimated lead value)
- Count: One (count only one conversion per click)
- Click-through conversion window: 30 days
- Tag setup: Use Google Tag (your AW-18151841356 tag is already on site)

After creating, copy the **Conversion Label** (looks like `AbCdEfGhIjKlMn`).  
You will need to put this in the code in Part 2 below.

---

## PART 2 — WEBSITE CODE CHANGES (Execute in Cursor)

**IMPORTANT:** Copy each prompt below and paste it directly into Cursor Chat. Execute them in order. Do NOT run them all at once.

---

### CURSOR PROMPT 1 — Restore UTM + GCLID to Supabase

```
Create a new Supabase migration file at:
supabase/migrations/20260512000001_restore_utm_and_gclid.sql

Contents:
-- Restore UTM attribution columns and add gclid for Google Ads tracking.
-- These were previously dropped in 20260424220000. Re-adding them is safe (additive only).
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS utm_source text,
  ADD COLUMN IF NOT EXISTS utm_medium text,
  ADD COLUMN IF NOT EXISTS utm_campaign text,
  ADD COLUMN IF NOT EXISTS gclid text;

COMMENT ON COLUMN public.leads.utm_source IS 'UTM source param from ad click (e.g. google)';
COMMENT ON COLUMN public.leads.utm_medium IS 'UTM medium param (e.g. cpc)';
COMMENT ON COLUMN public.leads.utm_campaign IS 'UTM campaign param (e.g. exact-match)';
COMMENT ON COLUMN public.leads.gclid IS 'Google Click ID for offline conversion import';

Do not modify any other migration files or the RLS policies.
Run this migration against the Supabase project.
```

---

### CURSOR PROMPT 2 — Update Lead Types and Builder to Include UTMs + GCLID

```
In lib/submitLead.ts make these ADDITIVE changes only — do not remove any existing fields:

1. Add to the LeadPayload type:
   utm_source?: string
   utm_medium?: string
   utm_campaign?: string
   gclid?: string

2. Add to the LeadInsertRow type:
   utm_source: string | null
   utm_medium: string | null
   utm_campaign: string | null
   gclid: string | null

3. In buildLeadInsertRow(), add these to the returned row object:
   utm_source: payload.utm_source?.trim() || null,
   utm_medium: payload.utm_medium?.trim() || null,
   utm_campaign: payload.utm_campaign?.trim() || null,
   gclid: payload.gclid?.trim() || null,

Do not change any validation logic, price calculation, or other existing fields.
```

---

### CURSOR PROMPT 3 — Update Form to Capture and Pass UTMs + GCLID

```
In components/sections/ContactQuoteForm.tsx, update the handleSubmit function:

1. In the existing URL params block (where utm_source, utm_medium, utm_campaign are already read), 
   ALSO read gclid:
   const gclid = sp.get('gclid') ?? undefined

2. Pass all four values to submitLeadRequest():
   utm_source: utmSource,
   utm_medium: utmMedium,
   utm_campaign: utmCampaign,
   gclid: gclid,

3. Also pass them to trackLeadFormSubmit():
   gclid: gclid,

Apply the same changes to components/sections/Hero.tsx (it has its own inline form with the same handleSubmit pattern).

Do NOT change the form UI, steps, validation, or any other logic.
```

---

### CURSOR PROMPT 4 — Fire Google Ads Conversion on Thank-You Page

```
In app/thank-you/page.tsx, add Google Ads conversion tracking.

This is a "use client" component. Add a useEffect that fires once on mount:

useEffect(() => {
  if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', 'conversion', {
      send_to: 'AW-18151841356/REPLACE_WITH_YOUR_CONVERSION_LABEL',
    })
  }
}, [])

IMPORTANT: Replace REPLACE_WITH_YOUR_CONVERSION_LABEL with the actual conversion label 
from Google Ads Goals → Conversions → your conversion action → Tag setup.

Also add the same conversion fire inside trackLeadFormSubmit() in lib/leadAnalytics.ts 
as a secondary fire for modal form completions that don't redirect to /thank-you:

Add after the existing track() call:
if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
  (window as any).gtag('event', 'conversion', {
    send_to: 'AW-18151841356/REPLACE_WITH_YOUR_CONVERSION_LABEL',
  })
}

Do NOT change any existing UI or layout on the thank-you page.
```

---

### CURSOR PROMPT 5 — Update "How Did You Hear About Us?" Dropdown

```
In components/sections/ContactQuoteForm.tsx, update the howHeardOptions array:

Replace the existing array with:
const howHeardOptions = [
  { value: "google-ad", label: "Google Ad" },
  { value: "search", label: "Google Search (organic)" },
  { value: "referral", label: "Referral / Friends & Family" },
  { value: "nextdoor", label: "Nextdoor" },
  { value: "social", label: "Social Media (Facebook/Instagram)" },
  { value: "ai", label: "AI (ChatGPT, etc.)" },
]

Apply the same update to the howHeardOptions array in components/sections/Hero.tsx.

Also in both files, add auto-detection logic: if utm_medium === 'cpc' or utm_source === 'google' 
AND utm_medium === 'cpc' is present in the URL params on mount, pre-set howHeard to 'google-ad':

In the useEffect or initialization logic, add:
const sp = new URLSearchParams(window.location.search)
if (sp.get('utm_medium') === 'cpc') {
  setFormData(prev => ({ ...prev, howHeard: 'google-ad' }))
}

Do not change the form layout, styling, or step logic.
```

---

### CURSOR PROMPT 6 — SEO Keyword Injection (Homepage + Key Service Pages)

```
IMPORTANT: Do NOT change any URL paths, slugs, or component structure. 
Only update metadata (title, description) and visible text content.

1. In app/(home)/layout.tsx — update buildPublicMetadata call:
   title: "Pressure Washing Xperts | #1 House Washing & Power Washing Near Atlanta, GA"
   description: "Licensed pressure washing & house washing near you in Metro Atlanta. Driveways, roofs, siding & commercial buildings. Free quotes. Call (800)-451-7213."

2. In app/services/residential/house-washing/layout.tsx — update metadata:
   title: "House Washing Near Me | Exterior House Washing Atlanta, GA | Pressure Washing Xperts"
   description: "Professional house washing services near you in Ellenwood & Metro Atlanta. Soft wash removes mold, mildew & stains safely. Licensed & insured. Free estimate."

3. In app/services/residential/driveways-sidewalks/layout.tsx — update metadata:
   title: "Driveway Pressure Washing Near Me | Atlanta Driveway Cleaning | Pressure Washing Xperts"
   description: "Driveway & sidewalk pressure washing in Metro Atlanta. Remove oil stains, algae & dirt. Residential & commercial. Licensed & insured. Get a free quote."

4. In app/services/residential/roof-soft-washing/layout.tsx — update metadata:
   title: "Roof Soft Washing Near Me | Roof Cleaning Atlanta, GA | Pressure Washing Xperts"
   description: "Safe roof soft washing in Metro Atlanta. Removes black streaks, algae & moss without damage. Licensed & insured. Serving Ellenwood, Stockbridge & surrounding areas."

5. In app/services/commercial/building-washing/layout.tsx — update metadata:
   title: "Commercial Pressure Washing Atlanta | Building Washing Services | Pressure Washing Xperts"
   description: "Commercial building washing & exterior cleaning in Metro Atlanta. Storefronts, office buildings & apartment complexes. Licensed & insured. Free commercial quote."

Do not change any page.tsx files, component code, or URL structures.
```

---

### CURSOR PROMPT 7 — Add /contact Route (Redirect to Homepage Contact Section)

```
The Google Ads sitelinks and some external links reference /contact which returns a 404.
Create a simple redirect without breaking any existing pages.

Create file: app/contact/page.tsx

Contents:
import { redirect } from 'next/navigation'

export default function ContactPage() {
  redirect('/#contact')
}

export const metadata = {
  title: 'Contact Pressure Washing Xperts | Free Quote | Metro Atlanta',
  description: 'Get a free pressure washing quote in Metro Atlanta. Call (800)-451-7213 or fill out our quick online form. Licensed & insured.',
}

This creates a /contact URL that immediately redirects to the homepage contact section.
Do NOT create any layout files or change any existing routing.
```

---

## PART 3 — GOOGLE ANALYTICS 4 CONFIGURATION

Do this AFTER the code changes are deployed.

### Step 3A — Link GA4 to Google Ads
1. In GA4: Admin → Product Links → Google Ads Links → Link
2. Select your Google Ads account (Pressure Washing Xperts)
3. Enable "Enable personalized advertising" → Save

### Step 3B — Import Conversion to GA4
1. In Google Ads: Goals → Conversions → + New → Import → Google Analytics 4
2. Import the `generate_lead` event (fires when form submits)
3. This creates a second conversion source as backup

### Step 3C — Create GA4 Conversion Event
1. In GA4: Admin → Events → find `lead_form_submit` (from Vercel Analytics) or `generate_lead`
2. Click "Mark as conversion" toggle → ON
3. This ensures every form submit is counted in GA4 reports

### Step 3D — Enable Auto-Tagging Verification
1. In Google Ads: Settings → Account Settings → Auto-tagging → ON
2. In GA4: Admin → Data Collection → Verify Google Ads linking is active
3. This ensures `gclid` parameters pass correctly between Ads and Analytics

### Step 3E — Set Up Attribution Model
1. In GA4: Admin → Attribution Settings
2. Change to: **Data-driven attribution** (if available) or **Last click** (minimum)
3. Lookback window: 30 days for conversions

---

## PART 4 — KEYWORD SEO INJECTION REFERENCE

These 20 keywords from your Google Ads campaigns should now live in your website metadata and content. The Cursor prompts above handle the metadata. Here's the full mapping for reference:

### Transactional Keywords → Pages They Should Appear On

| Keyword | Primary Page | Secondary Page |
|---------|-------------|----------------|
| pressure washing near me | Homepage | All service pages |
| power washing near me | Homepage | House washing page |
| house washing near me | House washing page | Homepage |
| home pressure washing near me | House washing page | Homepage |
| exterior house washing near me | House washing page | Residential services |
| pressure washing companies near me | Homepage | Service areas pages |
| pressure washing services near me | Residential services | Homepage |
| house pressure washing | House washing page | Driveways page |
| house washing | House washing page | Homepage |
| power wash house | House washing page | — |
| driveway pressure washing | Driveways-sidewalks page | Homepage |
| roof soft washing | Roof soft washing page | Homepage |
| pressure cleaning | Homepage | Commercial pages |
| commercial pressure washing | Commercial building-washing page | — |
| power washing services | Residential services page | Homepage |
| residential pressure washing services | Residential services page | — |
| house washing cost | House washing page (add FAQ) | — |
| house pressure washing cost | House washing page (add FAQ) | — |
| power wash house cost | House washing page (add FAQ) | — |
| pressure washing companies | Homepage | Service areas pages |

---

## PART 5 — ONGOING MANAGEMENT CHECKLIST

### Every Week (takes 15 min)
- [ ] Check Broad Match Search Terms report → add irrelevant terms as negatives
- [ ] Check spend vs daily budget ($2.67 broad / $10.67 exact)
- [ ] Note any new search terms that should become Exact Match keywords

### Every Month
- [ ] Review Supabase leads table — check `utm_source` column to confirm Google Ads attribution working
- [ ] Check Quality Score for each keyword (target: 7+)
- [ ] Pause any keyword with 50+ clicks and 0 conversions
- [ ] Once you hit 30 conversions/month → switch both campaigns to Target CPA bidding
- [ ] Move converting Broad Match terms into the Exact Match campaign

### Budget Scaling Trigger Points
- Getting 5+ leads/month from ads → increase to $500/month ($16.67/day)
- Getting 15+ leads/month from ads → increase to $1,000/month ($33.33/day)
- Cost per lead below $30 → increase budget immediately

---

## EXECUTION ORDER

```
Day 1 (Today):
  [x] Part 1A — Add missing 13 keywords to Broad Match
  [x] Part 1B — Fix disapproved House Washing sitelink URL
  [x] Part 1C — Fix all sitelink URLs
  [x] Part 1D — Add UTM parameters to ad final URLs
  [x] Part 1E — Create conversion action in Google Ads (get the label)

Day 2 (Code in Cursor):
  [ ] Cursor Prompt 1 — Supabase migration (run immediately)
  [ ] Cursor Prompt 2 — Update lead types
  [ ] Cursor Prompt 3 — Update form UTM capture
  [ ] Cursor Prompt 4 — Fire conversion on thank-you page (need label from Day 1)
  [ ] Cursor Prompt 5 — Update how-heard dropdown
  [ ] Cursor Prompt 6 — SEO metadata updates
  [ ] Cursor Prompt 7 — Add /contact redirect
  [ ] Deploy to Vercel and verify thank-you page fires conversion in Google Tag Assistant

Day 3 (Analytics):
  [ ] Part 3A — Link GA4 to Google Ads
  [ ] Part 3B — Import GA4 conversion
  [ ] Part 3C — Mark lead_form_submit as conversion
  [ ] Part 3D — Verify auto-tagging
  [ ] Part 3E — Set attribution model

Day 7:
  [ ] Check first Broad Match search terms report
  [ ] Confirm leads in Supabase are showing utm_source = 'google'
```

---

## FILES CHANGED BY THIS PLAN

```
NEW FILES:
  supabase/migrations/20260512000001_restore_utm_and_gclid.sql
  app/contact/page.tsx

MODIFIED FILES (metadata/copy only — no URL changes):
  lib/submitLead.ts                              (add UTM/gclid fields)
  lib/leadAnalytics.ts                           (add gtag conversion fire)
  app/thank-you/page.tsx                         (add conversion useEffect)
  components/sections/ContactQuoteForm.tsx       (UTM capture + how-heard update)
  components/sections/Hero.tsx                   (UTM capture + how-heard update)
  app/(home)/layout.tsx                          (metadata update)
  app/services/residential/house-washing/layout.tsx        (metadata)
  app/services/residential/driveways-sidewalks/layout.tsx  (metadata)
  app/services/residential/roof-soft-washing/layout.tsx    (metadata)
  app/services/commercial/building-washing/layout.tsx      (metadata)

UNTOUCHED (SEO SAFE — no changes):
  All page.tsx files
  All URL slugs and routing
  All existing JSON-LD schema
  All sitemap entries
  All existing DB columns
  All RLS policies
```
