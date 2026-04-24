-- Human-readable square-footage range as shown on the quote form (companion to approx_sqft_estimate slug).
alter table public.leads
  add column approx_sq_footage text null;

comment on column public.leads.approx_sq_footage is
  'Display label for the sq ft range the lead selected (e.g. 1,500–2,500 sq ft).';
