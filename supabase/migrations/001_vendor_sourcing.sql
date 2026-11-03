-- CCTech IT Solutions: secure vendor-sourcing foundation
-- Apply only after creating the Supabase project and configuring Auth.
-- No service-role key belongs in browser code. Keep customer/vendor data out of GitHub Pages files.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('staff','supplier')),
  display_name text,
  created_at timestamptz not null default now()
);

create table if not exists public.suppliers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  partner_type text not null check (partner_type in ('product_vendor','service_partner','hybrid')),
  categories text[] not null default '{}',
  brands text[] not null default '{}',
  service_areas text[] not null default '{}',
  conditions text[] not null default '{}',
  portal_user_id uuid unique references auth.users(id) on delete set null,
  active boolean not null default true,
  reliability_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  reference_code text unique,
  customer_name text not null,
  customer_contact text,
  source_channel text not null check (source_channel in ('whatsapp','website','phone','email','walk_in','social','other')),
  category text not null,
  pricing_mode text not null check (pricing_mode in ('parts_only','parts_plus_replacement','complete_equipment','installation_project','amc_on_call')),
  priority text not null default 'normal' check (priority in ('normal','urgent','critical')),
  requirements text not null,
  required_by date,
  status text not null default 'new',
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.enquiry_items (
  id uuid primary key default gen_random_uuid(),
  enquiry_id uuid not null references public.enquiries(id) on delete cascade,
  description text not null,
  brand text,
  model text,
  quantity numeric(12,2) not null default 1 check (quantity > 0),
  condition_required text,
  specifications jsonb not null default '{}'::jsonb
);

create table if not exists public.supplier_requests (
  id uuid primary key default gen_random_uuid(),
  enquiry_id uuid not null references public.enquiries(id) on delete cascade,
  supplier_id uuid not null references public.suppliers(id),
  request_message text not null,
  status text not null default 'draft' check (status in ('draft','sent','responded','declined','expired','cancelled')),
  sent_at timestamptz,
  response_due_at timestamptz,
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now(),
  unique(enquiry_id,supplier_id)
);

create table if not exists public.supplier_offers (
  id uuid primary key default gen_random_uuid(),
  supplier_request_id uuid not null references public.supplier_requests(id) on delete cascade,
  supplier_id uuid not null references public.suppliers(id),
  item_description text not null,
  quantity numeric(12,2) not null default 1 check (quantity > 0),
  unit_price numeric(14,2) check (unit_price >= 0),
  currency text not null default 'INR',
  gst_treatment text,
  stock_status text not null default 'unconfirmed',
  condition text not null default 'unconfirmed',
  warranty text,
  delivery_terms text,
  offer_valid_until date,
  evidence_notes text,
  evidence_confirmed boolean not null default false,
  raw_reply text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.project_cost_lines (
  id uuid primary key default gen_random_uuid(),
  enquiry_id uuid not null references public.enquiries(id) on delete cascade,
  line_type text not null check (line_type in ('material','labour','configuration','transport','amc','other')),
  description text not null,
  quantity numeric(12,2) not null default 1 check (quantity > 0),
  unit_cost numeric(14,2) not null default 0 check (unit_cost >= 0),
  supplier_offer_id uuid references public.supplier_offers(id),
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.customer_quotes (
  id uuid primary key default gen_random_uuid(),
  enquiry_id uuid not null references public.enquiries(id) on delete cascade,
  quote_reference text unique,
  status text not null default 'draft' check (status in ('draft','internal_review','approved','sent','accepted','rejected','expired')),
  subtotal numeric(14,2) not null default 0,
  gst_amount numeric(14,2) not null default 0,
  total numeric(14,2) not null default 0,
  margin_rule_snapshot jsonb not null default '{}'::jsonb,
  approved_by uuid references auth.users(id),
  approved_at timestamptz,
  sent_at timestamptz,
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now()
);

create table if not exists public.customer_quote_lines (
  id uuid primary key default gen_random_uuid(),
  quote_id uuid not null references public.customer_quotes(id) on delete cascade,
  description text not null,
  quantity numeric(12,2) not null default 1 check (quantity > 0),
  unit_price numeric(14,2) not null default 0 check (unit_price >= 0),
  gst_rate numeric(6,3),
  line_type text not null default 'material'
);

create or replace function public.is_cctech_staff()
returns boolean language sql stable security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles p
    where p.user_id = auth.uid() and p.role = 'staff'
  );
$$;

alter table public.profiles enable row level security;
alter table public.suppliers enable row level security;
alter table public.enquiries enable row level security;
alter table public.enquiry_items enable row level security;
alter table public.supplier_requests enable row level security;
alter table public.supplier_offers enable row level security;
alter table public.project_cost_lines enable row level security;
alter table public.customer_quotes enable row level security;
alter table public.customer_quote_lines enable row level security;

create policy "Users can read own profile" on public.profiles
for select to authenticated using (user_id = auth.uid());
create policy "Staff can manage profiles" on public.profiles
for all to authenticated using (public.is_cctech_staff()) with check (public.is_cctech_staff());

create policy "Staff manage suppliers" on public.suppliers
for all to authenticated using (public.is_cctech_staff()) with check (public.is_cctech_staff());
create policy "Supplier reads own profile" on public.suppliers
for select to authenticated using (portal_user_id = auth.uid());

create policy "Staff manage enquiries" on public.enquiries
for all to authenticated using (public.is_cctech_staff()) with check (public.is_cctech_staff());
create policy "Staff manage enquiry items" on public.enquiry_items
for all to authenticated using (public.is_cctech_staff()) with check (public.is_cctech_staff());

create policy "Staff manage supplier requests" on public.supplier_requests
for all to authenticated using (public.is_cctech_staff()) with check (public.is_cctech_staff());
create policy "Supplier reads assigned requests" on public.supplier_requests
for select to authenticated using (
  exists (select 1 from public.suppliers s where s.id = supplier_id and s.portal_user_id = auth.uid())
);
create policy "Supplier updates assigned request status" on public.supplier_requests
for update to authenticated using (
  exists (select 1 from public.suppliers s where s.id = supplier_id and s.portal_user_id = auth.uid())
) with check (
  exists (select 1 from public.suppliers s where s.id = supplier_id and s.portal_user_id = auth.uid())
);

create policy "Staff manage supplier offers" on public.supplier_offers
for all to authenticated using (public.is_cctech_staff()) with check (public.is_cctech_staff());
create policy "Supplier reads own offers" on public.supplier_offers
for select to authenticated using (
  exists (select 1 from public.suppliers s where s.id = supplier_id and s.portal_user_id = auth.uid())
);
create policy "Supplier submits own offers" on public.supplier_offers
for insert to authenticated with check (
  exists (
    select 1 from public.supplier_requests r
    join public.suppliers s on s.id = r.supplier_id
    where r.id = supplier_request_id and r.supplier_id = supplier_id
      and s.portal_user_id = auth.uid()
  )
);
create policy "Supplier updates own offers" on public.supplier_offers
for update to authenticated using (
  exists (select 1 from public.suppliers s where s.id = supplier_id and s.portal_user_id = auth.uid())
) with check (
  exists (
    select 1 from public.supplier_requests r
    join public.suppliers s on s.id = r.supplier_id
    where r.id = supplier_request_id and r.supplier_id = supplier_id
      and s.portal_user_id = auth.uid()
  )
);

create policy "Staff manage project cost lines" on public.project_cost_lines
for all to authenticated using (public.is_cctech_staff()) with check (public.is_cctech_staff());
create policy "Staff manage customer quotes" on public.customer_quotes
for all to authenticated using (public.is_cctech_staff()) with check (public.is_cctech_staff());
create policy "Staff manage customer quote lines" on public.customer_quote_lines
for all to authenticated using (public.is_cctech_staff()) with check (public.is_cctech_staff());

grant usage on schema public to authenticated;
grant select, insert, update, delete on public.profiles, public.suppliers, public.enquiries,
 public.enquiry_items, public.supplier_offers, public.project_cost_lines,
 public.customer_quotes, public.customer_quote_lines to authenticated;
-- Suppliers may change only the response status on an assigned RFQ, not its scope or contents.
grant select, insert, delete on public.supplier_requests to authenticated;
grant update (status) on public.supplier_requests to authenticated;
