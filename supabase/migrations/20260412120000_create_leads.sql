-- Lead capture from site forms (inserts from Next.js API route using service role only).
create table public.leads (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  full_name text not null,
  email text not null,
  phone text not null,
  city text not null,
  state text not null,
  zip text not null,
  message text not null,
  how_heard text not null,
  selected_offer text,
  submission_type text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  page_path text
);

comment on table public.leads is 'Quote/contact form submissions; RLS on with no public policies — use service role from server.';

alter table public.leads enable row level security;
