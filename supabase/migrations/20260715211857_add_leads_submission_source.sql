alter table public.leads
  add column submission_source text not null default 'website-form',
  add column desired_timeline text;
