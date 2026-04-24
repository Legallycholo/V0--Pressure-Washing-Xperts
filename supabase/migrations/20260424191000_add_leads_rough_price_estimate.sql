alter table public.leads
  add column rough_price_estimate numeric(10,2),
  add column rough_price_version text;

comment on column public.leads.rough_price_estimate is
  'Server-calculated rough quote based on floor, square footage bucket, and selected offer.';

comment on column public.leads.rough_price_version is
  'Pricing ruleset version used to compute rough_price_estimate.';
