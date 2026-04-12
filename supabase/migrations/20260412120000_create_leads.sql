-- Lead capture from site forms (browser inserts via anon key + RLS insert policy).
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  email text not null,
  phone text not null,
  message text,
  city text,
  state text,
  zip text,
  how_heard text,
  selected_offer text,
  submission_type text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  page_path text
);

comment on table public.leads is 'Quote/contact form submissions; RLS on — anon may insert via policy.';

alter table public.leads enable row level security;

create policy "Allow anonymous inserts on leads"
  on public.leads
  for insert
  to anon
  with check (true);
