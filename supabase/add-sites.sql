-- On3ra Sites module migration
-- Run in Supabase SQL editor, then copy to supabase/add-sites.sql in the repo

create table if not exists sites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) not null,
  name text not null,
  domain text,
  subdomain text unique,
  status text default 'draft',        -- draft | published | error
  content jsonb default '{}',         -- builder pages/blocks
  deployment_url text,
  last_checked_at timestamptz,
  uptime_status text,                 -- up | down | unknown
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Keep updated_at fresh on edits
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_sites_updated_at on sites;
create trigger trg_sites_updated_at
before update on sites
for each row execute function set_updated_at();

-- RLS
alter table sites enable row level security;

drop policy if exists "Users can manage their own sites" on sites;
create policy "Users can manage their own sites"
  on sites
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
