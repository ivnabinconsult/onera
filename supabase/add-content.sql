-- Run this in Supabase SQL Editor (New query > paste > Run).
-- Adds the content_drafts table for the Content module.

create table if not exists public.content_drafts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  title text not null default 'Untitled draft',
  prompt text,
  body text not null default '',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.content_drafts enable row level security;

create policy "Users manage their own content drafts"
  on public.content_drafts for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
