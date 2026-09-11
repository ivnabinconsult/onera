-- Run this in Supabase SQL Editor (New query > paste > Run).
-- This adds to your existing database — it won't affect profiles/subscriptions.

create table if not exists public.projects (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  name text not null,
  created_at timestamp with time zone default now()
);

create table if not exists public.tasks (
  id uuid default gen_random_uuid() primary key,
  project_id uuid references public.projects on delete cascade not null,
  user_id uuid references auth.users on delete cascade not null,
  title text not null,
  status text not null default 'todo' check (status in ('todo', 'in_progress', 'done')),
  created_at timestamp with time zone default now()
);

alter table public.projects enable row level security;
alter table public.tasks enable row level security;

create policy "Users manage their own projects"
  on public.projects for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users manage their own tasks"
  on public.tasks for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
