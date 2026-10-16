create table if not exists public.members (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  country text not null,
  telegram_id text,
  discord_id text,
  whatsapp text,
  has_upwork boolean not null default false,
  upwork_url text,
  has_linkedin boolean not null default false,
  linkedin_url text,
  message text,
  created_at timestamptz not null default now(),
  constraint members_has_contact check (
    coalesce(telegram_id, '') <> ''
    or coalesce(discord_id, '') <> ''
    or coalesce(whatsapp, '') <> ''
  )
);

alter table public.members enable row level security;
