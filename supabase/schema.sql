-- Run this once in your Supabase project: SQL Editor > New query > paste > Run.

-- One row per signed-up user, extending Supabase's built-in auth.users table.
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  full_name text,
  company text,
  created_at timestamp with time zone default now()
);

-- One row per customer's subscription, updated by Stripe/Paystack webhooks.
create table if not exists public.subscriptions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  provider text not null check (provider in ('paystack')),
  provider_customer_id text,
  provider_subscription_id text,
  plan text not null check (plan in ('starter', 'growth', 'enterprise')),
  billing_cycle text check (billing_cycle in ('monthly', 'annual')),
  status text not null default 'inactive' check (status in ('inactive', 'active', 'past_due', 'canceled')),
  current_period_end timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Automatically create a profile row whenever someone signs up.
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Row Level Security: users can only read/edit their own data.
alter table public.profiles enable row level security;
alter table public.subscriptions enable row level security;

create policy "Users can view their own profile"
  on public.profiles for select using (auth.uid() = id);
create policy "Users can update their own profile"
  on public.profiles for update using (auth.uid() = id);

create policy "Users can view their own subscription"
  on public.subscriptions for select using (auth.uid() = user_id);
