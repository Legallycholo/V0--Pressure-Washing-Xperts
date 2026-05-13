-- Restore previously-dropped UTM columns and add gclid/device for paid-traffic
-- attribution (first-touch UTMs persisted client-side and submitted with leads).
-- page_path already exists from 20260412120000_create_leads.sql; not re-added here.
alter table public.leads
  add column if not exists utm_source text,
  add column if not exists utm_medium text,
  add column if not exists utm_campaign text,
  add column if not exists utm_term text,
  add column if not exists utm_content text,
  add column if not exists gclid text,
  add column if not exists device text;

comment on column public.leads.utm_source   is 'First-touch utm_source (e.g. google)';
comment on column public.leads.utm_medium   is 'First-touch utm_medium (e.g. cpc)';
comment on column public.leads.utm_campaign is 'First-touch utm_campaign (e.g. exact-match)';
comment on column public.leads.utm_term     is 'First-touch utm_term (keyword/match type)';
comment on column public.leads.utm_content  is 'First-touch utm_content (ad/creative)';
comment on column public.leads.gclid        is 'Google Click ID for offline conversion import';
comment on column public.leads.device       is 'Coarse device class captured at submit (Mobile/Tablet/Desktop)';
