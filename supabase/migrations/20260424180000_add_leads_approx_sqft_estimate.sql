-- Rough square-footage bucket from quote/contact forms (website).
alter table public.leads
  add column approx_sqft_estimate text null;

comment on column public.leads.approx_sqft_estimate is
  'Rough total-area bucket from the site (e.g. under_1500). Nullable for legacy rows; new submissions use a required range.';
