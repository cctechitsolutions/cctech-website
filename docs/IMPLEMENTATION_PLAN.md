# CCTech IT Solutions — Implementation Plan

## Repository and release safety
- Production baseline: `main` (unchanged).
- Recovery snapshot: `backup/pre-cloudflare-migration-2026-11-02`.
- Development work: `development`.
- Do not merge to `main` or change production DNS until acceptance testing is complete.

## Target architecture
- GitHub: source control and review.
- Cloudflare Pages: production frontend and preview deployments.
- Supabase: PostgreSQL, Auth, Storage and server-side Edge Functions.
- Payment provider: to be selected; all payment confirmation must be verified server-side using signed webhooks.
- DNS/domain: pending domain purchase and ownership verification.

## Existing site preservation
The current static site and catalogue remain available during migration. Preserve the current pages, brand styling, images, product descriptions, categories, service information and AMC content. Import the current catalogue only after a repeatable export/validation step. Do not silently change prices or original-price fields; flag questionable records for business confirmation.

## Planned modules
1. Public website and product catalogue.
2. Secure staff authentication and role-based admin.
3. Products, categories, stock and stock movements.
4. Customers, enquiries and order management.
5. Quotations, invoices, GST and payment tracking.
6. Repair/service jobs, device history and technician assignment.
7. AMC contracts, assets, visits and renewal reminders.
8. Reports, audit trail and operational settings.

## Security rules
- Disable public staff registration; staff accounts are provisioned by an administrator.
- Never place Supabase service-role keys, payment secrets or webhook secrets in browser code.
- Enable Row Level Security on every exposed business table.
- Public visitors may read active catalogue records only.
- Public order, repair and AMC submissions must use validated server-side functions with rate limiting and spam protection.
- Payment status is not trusted from the browser; verify provider webhooks before marking an order paid.
- Use least-privilege staff roles and log sensitive changes.

## Initial roles
- `super_admin`: all system configuration and access.
- `manager`: products, stock, customers, sales, service and AMC operations.
- `accountant`: quotations, invoices, payments and financial reports.
- `technician`: assigned service jobs and permitted job updates.

## Delivery sequence
### Phase 1 — Foundation
- Preserve the current production baseline.
- Add database schema and environment setup documentation.
- Configure Supabase project, secrets, authentication and RLS.
- Configure Cloudflare Pages preview deployment.

### Phase 2 — Data migration
- Export and validate current product/category/service data.
- Import with legacy IDs retained for traceability.
- Compare row counts, images and key fields before cutover.

### Phase 3 — Admin
- Secure login, role-aware navigation and dashboard.
- Products/inventory, customers, orders, quotations/invoices, service jobs and AMC.

### Phase 4 — Public workflows
- Catalogue and cart.
- Server-created orders and enquiries.
- Service and AMC request submission.
- Customer-facing status and notification workflows where approved.

### Phase 5 — Launch
- Test security, permissions, mobile layout, backups, restore process and business workflows.
- Verify Cloudflare deployment and custom domain.
- Switch production only after explicit owner approval.

## Required owner decisions before production integration
- Purchase and confirm the business domain.
- Create/confirm Cloudflare and Supabase accounts.
- Choose payment gateway (if online payments are required).
- Confirm staff names and role assignments.
- Confirm final business contact details, GST treatment and invoice numbering rules.
