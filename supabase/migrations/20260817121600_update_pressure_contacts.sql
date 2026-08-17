ALTER TABLE public.leads RENAME TO "pressure contacts";

ALTER TABLE public."pressure contacts" RENAME COLUMN full_name TO name;
ALTER TABLE public."pressure contacts" RENAME COLUMN approx_sqft_estimate TO approx_sqft;

ALTER TABLE public."pressure contacts" ADD COLUMN services text;
ALTER TABLE public."pressure contacts" ADD COLUMN best_time text;

ALTER TABLE public."pressure contacts" 
  DROP COLUMN IF EXISTS state,
  DROP COLUMN IF EXISTS selected_offer,
  DROP COLUMN IF EXISTS submission_type,
  DROP COLUMN IF EXISTS page_path,
  DROP COLUMN IF EXISTS rough_price_version,
  DROP COLUMN IF EXISTS approx_sq_footage,
  DROP COLUMN IF EXISTS utm_source,
  DROP COLUMN IF EXISTS utm_medium,
  DROP COLUMN IF EXISTS utm_campaign,
  DROP COLUMN IF EXISTS utm_term,
  DROP COLUMN IF EXISTS utm_content,
  DROP COLUMN IF EXISTS gclid,
  DROP COLUMN IF EXISTS device,
  DROP COLUMN IF EXISTS submission_source,
  DROP COLUMN IF EXISTS desired_timeline,
  DROP COLUMN IF EXISTS rough_price_estimate;
