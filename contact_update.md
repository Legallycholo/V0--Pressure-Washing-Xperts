# Contact Form & Lead Submission Consolidation Plan

## Overview
The goal is to simplify the website to use a single unified contact form, removing all other quoting or secondary forms. The data will be saved to Supabase in the `pressure contacts` table and a structured notification will be sent via Resend. After submission, the user will see a thank you message or be redirected to a thank you page.

## 1. Supabase Table Updates (`pressure contacts`)
You will need to manually ensure your Supabase table (`pressure contacts`) exactly matches these columns. **All other columns can be removed/dropped.**

### Required Columns:
- `id` (uuid, primary key)
- `created_at` (timestamp)
- `name` (text)
- `email` (text)
- `phone` (text)
- `city` (text)
- `zip` (text)
- `services` (text or text[])
- `best_time` (text)
- `how_heard` (text)
- `message` (text)
- `approx_sqft` (text)

## 2. API Route Consolidation
- **Delete** `app/api/leads/route.ts` (or any other secondary submission routes).
- **Update** `app/api/contact/route.ts` to be the single source of truth for all form submissions.
- Update the API route to strictly parse and validate only the allowed fields mentioned above.
- Update `lib/supabaseLeads.ts` (or similar database helpers) to only insert these specific columns into the `pressure contacts` table.

## 3. Resend Email Template Update
Update the HTML email template in `app/api/contact/route.ts` to cleanly display the exact fields provided by the user, taking inspiration from the `rays-pressure-washing` repository.

### Proposed Email Layout:
- **Heading**: New Callback/Quote Request
- **Contact Info**: Name, Phone, Email, City, Zip
- **Project Details**: Services Needed, Approx Sqft, Best Time to Call, How Heard, Message

## 4. Frontend Form Updates
- Remove complex quoting flows or multi-step wizards if they exist.
- Update the main `ContactForm` component to include the required fields:
  - Name (Required)
  - Phone (Required)
  - Email (Required)
  - City (Optional/Required based on preference)
  - Zip Code (Optional)
  - Services Needed (Checkboxes or multi-select)
  - Approx Sqft (Text input or dropdown)
  - Best Time to Call (Dropdown)
  - How did you hear about us? (Dropdown/Text)
  - Message/Notes (Textarea)
- Update the form's submit handler to point exclusively to `/api/contact`.

## 5. Thank You Page / State
- **Option A (Redirect)**: Upon a successful `200 OK` response from the API, use `router.push('/thank-you')` to redirect the user to a dedicated success page.
- **Option B (In-place Message)**: Replace the form UI with a beautifully styled "Thank You! We've received your request and will call you back shortly." message.

## Action Items for Implementation
1. Go to the Supabase dashboard and adjust the `pressure contacts` table columns.
2. Refactor `app/api/contact/route.ts` and `lib/supabaseLeads.ts` to match the new schema.
3. Delete obsolete API routes (`api/leads`, etc.).
4. Update the frontend form component(s) to match the new fields.
5. Implement the success redirect/message.
