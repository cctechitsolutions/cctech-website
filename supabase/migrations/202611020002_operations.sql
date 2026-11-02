-- CCTech additive operational tables: service catalogue, stock ledger, AMC visits and enquiries.
-- Apply only after 202611020001_initial_schema.sql succeeds in the NEW development project.

create table public.service_catalog (
  id uuid primary key default gen_random_uuid(),
  legacy_id integer unique,
  name text not null,
  category text not null,
  description text,
  price numeric(12,2) not null default 0 check (price >= 0),
  image_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.stock_movements (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete restrict,
  movement_type text not null check (movement_type in ('opening','purchase','sale','service_use','return','adjustment')),
  quantity_change integer not null check (quantity_change <> 0),
  reference_type text,
  reference_id uuid,
  notes text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create index stock_movements_product_date_idx
  on public.stock_movements (product_id, created_at desc);

create table public.amc_visits (
  id uuid primary key default gen_random_uuid(),
  contract_id uuid not null references public.amc_contracts(id) on delete cascade,
  visit_number integer not null check (visit_number > 0),
  scheduled_at timestamptz,
  completed_at timestamptz,
  assigned_to uuid references public.profiles(id) on delete set null,
  status text not null default 'scheduled'
    check (status in ('scheduled','in_progress','completed','rescheduled','cancelled')),
  work_performed text,
  findings text,
  next_visit_due timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (contract_id, visit_number)
);

create table public.customer_enquiries (
  id uuid primary key default gen_random_uuid(),
  enquiry_number text not null unique,
  customer_name text not null,
  email text,
  phone text not null,
  subject text not null,
  message text,
  source text not null default 'website',
  status text not null default 'new'
    check (status in ('new','contacted','quoted','converted','closed','spam')),
  assigned_to uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.service_catalog enable row level security;
alter table public.stock_movements enable row level security;
alter table public.amc_visits enable row level security;
alter table public.customer_enquiries enable row level security;

create policy "public_read_active_service_catalog"
on public.service_catalog for select to anon, authenticated
using (is_active = true);

create policy "management_manage_service_catalog"
on public.service_catalog for all to authenticated
using (public.is_management())
with check (public.is_management());

create policy "finance_staff_read_stock_movements"
on public.stock_movements for select to authenticated
using (public.is_finance_or_management());

create policy "management_write_stock_movements"
on public.stock_movements for all to authenticated
using (public.is_management())
with check (public.is_management());

create policy "finance_staff_read_amc_visits"
on public.amc_visits for select to authenticated
using (
  public.is_finance_or_management()
  or assigned_to = (select auth.uid())
);

create policy "management_create_amc_visits"
on public.amc_visits for insert to authenticated
with check (public.is_management());

create policy "management_or_assignee_update_amc_visits"
on public.amc_visits for update to authenticated
using (public.is_management() or assigned_to = (select auth.uid()))
with check (public.is_management() or assigned_to = (select auth.uid()));

create policy "management_delete_amc_visits"
on public.amc_visits for delete to authenticated
using (public.is_management());

create policy "finance_staff_read_enquiries"
on public.customer_enquiries for select to authenticated
using (public.is_finance_or_management());

create policy "management_manage_enquiries"
on public.customer_enquiries for all to authenticated
using (public.is_management())
with check (public.is_management());

-- No anonymous table writes: public forms must call validated Edge Functions.
