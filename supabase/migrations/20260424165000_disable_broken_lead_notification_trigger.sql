-- Prevent lead insert failures caused by a missing Supabase helper function
-- referenced by the old webhook trigger implementation.
drop trigger if exists new_lead_notification on public.leads;
drop function if exists public.notify_resend_new_lead();
