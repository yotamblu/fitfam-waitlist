-- Waitlist signups table.
--
-- Security model: Row Level Security is enabled with NO policies attached.
-- That blocks every request made with the anon/authenticated keys — the only
-- way to read or write this table is the service_role key, which bypasses
-- RLS entirely and is only ever used server-side (see lib/supabase/admin.ts).
-- Never expose the service_role key to the browser.

create table if not exists public.waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  favorite_sport text,
  ip_hash text,
  user_agent text,
  created_at timestamptz not null default now(),
  constraint waitlist_signups_email_format_check
    check (email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$'),
  constraint waitlist_signups_favorite_sport_check
    check (favorite_sport is null or favorite_sport in ('swimming', 'running', 'calisthenics', 'strength'))
);

-- Used by the per-IP rate limiter to count recent signups from the same hashed IP.
create index if not exists waitlist_signups_ip_hash_created_at_idx
  on public.waitlist_signups (ip_hash, created_at desc);

alter table public.waitlist_signups enable row level security;
