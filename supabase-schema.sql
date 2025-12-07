-- First Flight Lab E-Commerce Schema
-- Run this in the Supabase SQL Editor (https://supabase.com/dashboard/project/bshuikokyyahpwbclbtp/sql)

-- Products table
create table if not exists public.ffl_products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  price integer not null,
  image_url text,
  features text[] default '{}',
  stock integer default 100,
  active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- User profiles
create table if not exists public.ffl_profiles (
  id uuid primary key references auth.users on delete cascade,
  full_name text,
  phone text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Shipping addresses
create table if not exists public.ffl_addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  label text,
  street text not null,
  city text not null,
  state text not null,
  zip text not null,
  country text default 'US',
  is_default boolean default false,
  created_at timestamptz default now()
);

-- Orders
create table if not exists public.ffl_orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users,
  stripe_session_id text unique,
  status text default 'pending',
  subtotal integer not null,
  shipping integer default 799,
  total integer not null,
  shipping_address jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Order items
create table if not exists public.ffl_order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.ffl_orders not null,
  product_id uuid references public.ffl_products not null,
  quantity integer not null,
  price integer not null
);

-- Enable RLS
alter table public.ffl_products enable row level security;
alter table public.ffl_profiles enable row level security;
alter table public.ffl_addresses enable row level security;
alter table public.ffl_orders enable row level security;
alter table public.ffl_order_items enable row level security;

-- RLS Policies
create policy "Products are publicly viewable" on public.ffl_products for select using (active = true);

create policy "Users can view own profile" on public.ffl_profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.ffl_profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on public.ffl_profiles for insert with check (auth.uid() = id);

create policy "Users can view own addresses" on public.ffl_addresses for select using (auth.uid() = user_id);
create policy "Users can insert own addresses" on public.ffl_addresses for insert with check (auth.uid() = user_id);
create policy "Users can update own addresses" on public.ffl_addresses for update using (auth.uid() = user_id);
create policy "Users can delete own addresses" on public.ffl_addresses for delete using (auth.uid() = user_id);

create policy "Users can view own orders" on public.ffl_orders for select using (auth.uid() = user_id);
create policy "Users can insert own orders" on public.ffl_orders for insert with check (auth.uid() = user_id);

create policy "Users can view own order items" on public.ffl_order_items for select using (
  exists (select 1 from public.ffl_orders where ffl_orders.id = order_id and ffl_orders.user_id = auth.uid())
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.ffl_profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Seed products
insert into public.ffl_products (name, slug, description, price, image_url, features, stock, active) values
  (
    'First Flight Lab Jet – Starter Bundle',
    'starter-bundle',
    'Everything you need for your child''s first indoor flight.',
    5999,
    '/products/starter-bundle.png',
    array['1 foam RC jet', 'Beginner-mode controller', '2 rechargeable batteries', 'Mission card pack', '30-day Crash Comfort guarantee'],
    100,
    true
  ),
  (
    'First Flight Lab Jet – Pro Bundle',
    'pro-bundle',
    'Extended flight time and extra protection for serious young pilots.',
    8999,
    '/products/pro-bundle.png',
    array['Everything in Starter Bundle', '4 rechargeable batteries (2 extra)', 'Replacement foam shell', 'Advanced mission card pack', 'Carry case'],
    50,
    true
  ),
  (
    'First Flight Lab – Family Pack',
    'family-pack',
    'Two jets for siblings or parent-child races!',
    14999,
    '/products/family-pack.png',
    array['2 foam RC jets', '2 controllers', '6 rechargeable batteries', '2 replacement foam shells', 'Complete mission card collection', '2 carry cases'],
    25,
    true
  )
on conflict (slug) do nothing;
