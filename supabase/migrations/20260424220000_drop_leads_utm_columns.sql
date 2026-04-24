-- UTM params were never populated in practice; attribution stays on page_path + submission_type.
alter table public.leads
  drop column if exists utm_source,
  drop column if exists utm_medium,
  drop column if exists utm_campaign;
