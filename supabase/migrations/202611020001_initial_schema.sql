-- CCTech IT Solutions initial business-system schema
-- Apply to a NEW Supabase project after reviewing this migration.
-- Do not run against any database containing existing production data.

create extension if not exists pgcrypto;

create type public.app_role as enum (
  'super_admin',
  'manager',
  'accountant',
  'technician'
);

create type public.order_status as enum (
  'pending',
  'confirmed',
  'processing',
  'ready',
  'completed',
  'cancelled'
);

create type public.service_status as enum (
  'received',
  'diagnosis',
  'awaiting_approval',
  'approved',
  'in_progress',
  'awaiting_parts',
  'ready_for_delivery',
  'delivered',
  'cancelled'
);

create type public.document_status as enum (
  'draft',
  'sent',
  'accepted',
  'rejected',
  'partially_paid',
  'paid',
  'overdue',
  'cancelled'
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  phone text,
  role public.app_role not null default 'technician',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    'technician'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

create or replace function public.current_app_role()
returns public.app_role
language sql
stable
security definer
set search_path = ''
as $$
  select p.role
  from public.profiles p
  where p.id = (select auth.uid())
    and p.is_active = true
  limit 1;
$$;

create or replace function public.is_management()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(
    public.current_app_role() in ('super_admin', 'manager'),
    false
  );
$$;

create or replace function public.is_finance_or_management()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(
    public.current_app_role() in ('super_admin', 'manager', 'accountant'),
    false
  );
$$;

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  legacy_key text unique,
  name text not null,
  slug text not null unique,
  description text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  legacy_id integer unique,
  sku text unique,
  name text not null,
  description text,
  config text,
  brand text,
  condition text,
  main_category text,
  sub_category text,
  product_type text,
  price numeric(12,2) not null default 0 check (price >= 0),
  original_price numeric(12,2) check (original_price is null or original_price >= 0),
  stock_quantity integer not null default 0 check (stock_quantity >= 0),
  image_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index products_active_category_idx
  on public.products (is_active, main_category, sub_category);
create index products_name_search_idx
  on public.products using gin (to_tsvector('simple', coalesce(name, '') || ' ' || coalesce(brand, '')));

create table public.customers (
  id uuid primary key default gen_random_uuid(),
  customer_code text unique,
  name text not null,
  email text,
  phone text not null,
  alternate_phone text,
  billing_address text,
  shipping_address text,
  gstin text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index customers_phone_idx on public.customers (phone);
create index customers_name_idx on public.customers (name);

create table public.sales_orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  customer_id uuid references public.customers(id) on delete set null,
  customer_name text not null,
  customer_email text,
  customer_phone text not null,
  billing_address text,
  shipping_address text,
  status public.order_status not null default 'pending',
  subtotal numeric(12,2) not null default 0 check (subtotal >= 0),
  discount_amount numeric(12,2) not null default 0 check (discount_amount >= 0),
  tax_amount numeric(12,2) not null default 0 check (tax_amount >= 0),
  total_amount numeric(12,2) not null default 0 check (total_amount >= 0),
  payment_status text not null default 'unpaid'
    check (payment_status in ('unpaid', 'pending', 'partially_paid', 'paid', 'refunded', 'failed')),
  source text not null default 'website',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.sales_order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.sales_orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_name text not null,
  sku text,
  quantity integer not null check (quantity > 0),
  unit_price numeric(12,2) not null check (unit_price >= 0),
  tax_rate numeric(5,2) not null default 0 check (tax_rate >= 0 and tax_rate <= 100),
  line_total numeric(12,2) not null check (line_total >= 0),
  created_at timestamptz not null default now()
);

create index sales_orders_created_idx on public.sales_orders (created_at desc);
create index sales_orders_status_idx on public.sales_orders (status, payment_status);

create table public.service_jobs (
  id uuid primary key default gen_random_uuid(),
  job_number text not null unique,
  customer_id uuid references public.customers(id) on delete set null,
  customer_name text not null,
  customer_phone text not null,
  device_type text not null,
  brand text,
  model text,
  serial_number text,
  accessories_received text,
  reported_issue text not null,
  diagnosis text,
  work_performed text,
  status public.service_status not null default 'received',
  assigned_to uuid references public.profiles(id) on delete set null,
  estimated_cost numeric(12,2) check (estimated_cost is null or estimated_cost >= 0),
  final_cost numeric(12,2) check (final_cost is null or final_cost >= 0),
  received_at timestamptz not null default now(),
  promised_at timestamptz,
  delivered_at timestamptz,
  internal_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index service_jobs_status_idx on public.service_jobs (status, received_at desc);
create index service_jobs_assignee_idx on public.service_jobs (assigned_to, status);

create table public.amc_contracts (
  id uuid primary key default gen_random_uuid(),
  contract_number text not null unique,
  customer_id uuid references public.customers(id) on delete set null,
  customer_name text not null,
  customer_phone text not null,
  customer_email text,
  start_date date not null,
  end_date date not null,
  status text not null default 'draft'
    check (status in ('draft', 'active', 'expired', 'renewed', 'cancelled')),
  asset_count integer not null default 0 check (asset_count >= 0),
  base_amount numeric(12,2) not null default 0 check (base_amount >= 0),
  tax_amount numeric(12,2) not null default 0 check (tax_amount >= 0),
  total_amount numeric(12,2) not null default 0 check (total_amount >= 0),
  scope_of_work text,
  terms text,
  next_visit_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (end_date >= start_date)
);

create table public.amc_assets (
  id uuid primary key default gen_random_uuid(),
  contract_id uuid not null references public.amc_contracts(id) on delete cascade,
  asset_type text not null,
  brand text,
  model text,
  serial_number text,
  location text,
  notes text,
  created_at timestamptz not null default now()
);

create table public.quotes (
  id uuid primary key default gen_random_uuid(),
  quote_number text not null unique,
  customer_id uuid references public.customers(id) on delete set null,
  customer_name text not null,
  customer_email text,
  customer_phone text,
  status public.document_status not null default 'draft',
  issue_date date not null default current_date,
  valid_until date,
  subtotal numeric(12,2) not null default 0 check (subtotal >= 0),
  discount_amount numeric(12,2) not null default 0 check (discount_amount >= 0),
  tax_amount numeric(12,2) not null default 0 check (tax_amount >= 0),
  total_amount numeric(12,2) not null default 0 check (total_amount >= 0),
  terms text,
  notes text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.quote_items (
  id uuid primary key default gen_random_uuid(),
  quote_id uuid not null references public.quotes(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  description text not null,
  hsn_sac text,
  quantity numeric(12,2) not null check (quantity > 0),
  unit_price numeric(12,2) not null check (unit_price >= 0),
  tax_rate numeric(5,2) not null default 18 check (tax_rate >= 0 and tax_rate <= 100),
  line_total numeric(12,2) not null check (line_total >= 0)
);

create table public.invoices (
  id uuid primary key default gen_random_uuid(),
  invoice_number text not null unique,
  quote_id uuid references public.quotes(id) on delete set null,
  customer_id uuid references public.customers(id) on delete set null,
  customer_name text not null,
  customer_email text,
  customer_phone text,
  customer_gstin text,
  billing_address text,
  status public.document_status not null default 'draft',
  issue_date date not null default current_date,
  due_date date,
  subtotal numeric(12,2) not null default 0 check (subtotal >= 0),
  discount_amount numeric(12,2) not null default 0 check (discount_amount >= 0),
  tax_amount numeric(12,2) not null default 0 check (tax_amount >= 0),
  total_amount numeric(12,2) not null default 0 check (total_amount >= 0),
  amount_paid numeric(12,2) not null default 0 check (amount_paid >= 0),
  notes text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.invoice_items (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null references public.invoices(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  description text not null,
  hsn_sac text,
  quantity numeric(12,2) not null check (quantity > 0),
  unit_price numeric(12,2) not null check (unit_price >= 0),
  tax_rate numeric(5,2) not null default 18 check (tax_rate >= 0 and tax_rate <= 100),
  line_total numeric(12,2) not null check (line_total >= 0)
);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid references public.invoices(id) on delete set null,
  order_id uuid references public.sales_orders(id) on delete set null,
  amount numeric(12,2) not null check (amount > 0),
  method text not null,
  status text not null default 'pending'
    check (status in ('pending', 'verified', 'failed', 'refunded')),
  provider_reference text,
  verified_at timestamptz,
  notes text,
  created_at timestamptz not null default now()
);

create table public.audit_logs (
  id bigint generated always as identity primary key,
  actor_id uuid references public.profiles(id) on delete set null,
  action text not null,
  entity_table text not null,
  entity_id text,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- Enable RLS on every exposed table.
alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.customers enable row level security;
alter table public.sales_orders enable row level security;
alter table public.sales_order_items enable row level security;
alter table public.service_jobs enable row level security;
alter table public.amc_contracts enable row level security;
alter table public.amc_assets enable row level security;
alter table public.quotes enable row level security;
alter table public.quote_items enable row level security;
alter table public.invoices enable row level security;
alter table public.invoice_items enable row level security;
alter table public.payments enable row level security;
alter table public.audit_logs enable row level security;

-- Staff profiles: users may read their own profile; only super admins manage roles.
create policy "profile_read_self_or_admin"
on public.profiles for select to authenticated
using (id = (select auth.uid()) or public.current_app_role() = 'super_admin');

create policy "profile_manage_super_admin"
on public.profiles for all to authenticated
using (public.current_app_role() = 'super_admin')
with check (public.current_app_role() = 'super_admin');

-- Public catalogue reads only active categories and products.
create policy "public_read_active_categories"
on public.categories for select to anon, authenticated
using (is_active = true);

create policy "public_read_active_products"
on public.products for select to anon, authenticated
using (is_active = true);

create policy "management_manage_categories"
on public.categories for all to authenticated
using (public.is_management())
with check (public.is_management());

create policy "management_manage_products"
on public.products for all to authenticated
using (public.is_management())
with check (public.is_management());

-- Customer and commercial records are staff-only. Public submissions go through
-- server-side Edge Functions, not direct anonymous table writes.
create policy "finance_staff_read_customers"
on public.customers for select to authenticated
using (public.is_finance_or_management());

create policy "management_write_customers"
on public.customers for all to authenticated
using (public.is_management())
with check (public.is_management());

create policy "finance_staff_read_orders"
on public.sales_orders for select to authenticated
using (public.is_finance_or_management());

create policy "management_write_orders"
on public.sales_orders for all to authenticated
using (public.is_management())
with check (public.is_management());

create policy "finance_staff_read_order_items"
on public.sales_order_items for select to authenticated
using (public.is_finance_or_management());

create policy "management_write_order_items"
on public.sales_order_items for all to authenticated
using (public.is_management())
with check (public.is_management());

create policy "service_staff_read_jobs"
on public.service_jobs for select to authenticated
using (
  public.is_finance_or_management()
  or assigned_to = (select auth.uid())
);

create policy "management_create_jobs"
on public.service_jobs for insert to authenticated
with check (public.is_management());

create policy "management_or_assignee_update_jobs"
on public.service_jobs for update to authenticated
using (public.is_management() or assigned_to = (select auth.uid()))
with check (public.is_management() or assigned_to = (select auth.uid()));

create policy "management_delete_jobs"
on public.service_jobs for delete to authenticated
using (public.is_management());

create policy "finance_staff_read_amc"
on public.amc_contracts for select to authenticated
using (public.is_finance_or_management());

create policy "management_write_amc"
on public.amc_contracts for all to authenticated
using (public.is_management())
with check (public.is_management());

create policy "finance_staff_read_amc_assets"
on public.amc_assets for select to authenticated
using (public.is_finance_or_management());

create policy "management_write_amc_assets"
on public.amc_assets for all to authenticated
using (public.is_management())
with check (public.is_management());

create policy "finance_staff_read_quotes"
on public.quotes for select to authenticated
using (public.is_finance_or_management());

create policy "finance_staff_write_quotes"
on public.quotes for all to authenticated
using (public.is_finance_or_management())
with check (public.is_finance_or_management());

create policy "finance_staff_read_quote_items"
on public.quote_items for select to authenticated
using (public.is_finance_or_management());

create policy "finance_staff_write_quote_items"
on public.quote_items for all to authenticated
using (public.is_finance_or_management())
with check (public.is_finance_or_management());

create policy "finance_staff_read_invoices"
on public.invoices for select to authenticated
using (public.is_finance_or_management());

create policy "finance_staff_write_invoices"
on public.invoices for all to authenticated
using (public.is_finance_or_management())
with check (public.is_finance_or_management());

create policy "finance_staff_read_invoice_items"
on public.invoice_items for select to authenticated
using (public.is_finance_or_management());

create policy "finance_staff_write_invoice_items"
on public.invoice_items for all to authenticated
using (public.is_finance_or_management())
with check (public.is_finance_or_management());

create policy "finance_staff_read_payments"
on public.payments for select to authenticated
using (public.is_finance_or_management());

create policy "finance_staff_write_payments"
on public.payments for all to authenticated
using (public.is_finance_or_management())
with check (public.is_finance_or_management());

create policy "super_admin_read_audit_logs"
on public.audit_logs for select to authenticated
using (public.current_app_role() = 'super_admin');

-- Do not add anonymous INSERT policies to orders, customers, service jobs,
-- payments or AMC tables. Validate and write these through Edge Functions.
