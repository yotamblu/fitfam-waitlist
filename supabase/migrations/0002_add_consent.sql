-- Proof that the person agreed to be told about the launch (direct-marketing consent) and to the privacy notice.
-- Rows that existed before this column have no consent recorded (null): do not email them without asking again.
alter table public.waitlist_signups
  add column if not exists consent_at timestamptz,
  add column if not exists consent_version text;
