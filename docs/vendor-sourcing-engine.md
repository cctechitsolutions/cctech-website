# CCTech IT Solutions — Vendor Sourcing & Service Partner Engine

Status: approved functional design; implementation branch only. This document does not change the live website or production data.

## Operating model

Use a hybrid sourcing model:
- Product vendors quote equipment/materials, stock, condition, warranty and delivery.
- Approved service partners can quote labour, installation, configuration, onsite work and AMC separately.
- CCTech owns the customer relationship, final supplier selection, margin, labour pricing, final quotation and customer approval.
- Vendor offers and other vendors' identities/prices are private. A vendor sees only its own invitation and response.
- Customer quotation sending is manual/owner-approved by default.

## Enquiry-to-order workflow

1. Capture an enquiry from WhatsApp Business Platform, website form, phone/social lead or manual admin entry.
2. Create a unique enquiry/ticket ID; preserve original message and attachments.
3. Classify the request into one or more categories and extract line items. Mark uncertain fields for human review.
4. Match only active vendors/partners by category, subcategory, brand, new/used/refurbished capability, service area and response status.
5. Send each matched supplier an individual request. Do not create a shared vendor group or expose recipient lists.
6. Collect natural-language WhatsApp replies and a structured response form. Normalize price, GST, stock/quantity, condition, warranty, delivery, validity, photos and notes.
7. Compare offers on total landed cost, fit/specification, condition evidence, warranty, stock, delivery and supplier performance. Never select on price alone.
8. CCTech reviews the recommendation, applies configured margin and labour/project charges, and approves the customer quotation.
9. Send the combined customer quote/PDF through the approved channel; record acceptance/rejection/expiry.
10. After acceptance, create a purchase order for selected vendor(s), then track procurement, delivery, installation/service completion and warranty.
11. Hand approved invoice details to NCH Express Invoice using a version-verified CSV workflow initially; do not create a competing invoice ledger.
12. Reconcile payment status and schedule warranty, AMC and customer follow-ups.

## Supported categories

1. Laptop/desktop products and spare parts
2. Used/refurbished laptops, desktops, workstations, servers, monitors, docks and parts
3. Servers and storage
4. Networking and structured cabling
5. CCTV and security
6. UPS and power backup
7. Batteries
8. Peripherals and accessories
9. AMC and IT support
10. Repairs and technical services, including data recovery
11. Access control and biometric systems
12. IT infrastructure projects and server rooms
13. Software and licensing
14. Installation and onsite projects
15. Buyback and authorised e-waste coordination

Categories must support subcategories, brands, service areas and multiple tags. A supplier can be both a product vendor and a service partner.

## Project and quote support

A single enquiry/quotation may contain multiple goods and services. Support bundles such as CCTV projects with cameras, NVR, storage, PoE switches, cable, accessories, installation, configuration and transport. Each line must separately record quantity, unit, vendor cost, labour, configuration, transport, margin, tax code/rate, customer price and notes. Allow multiple vendors to fulfil one project.

Pricing modes:
- Parts only: vendor cost + margin; no replacement/labour fee.
- Parts + replacement: vendor cost + margin + configured replacement labour.
- Complete equipment: cost + margin; installation/configuration only when requested.
- Installation/project: materials + labour + configuration + transport + margin.
- AMC/on-call: partner cost + CCTech service charge/margin.

Margins are configurable by category and pricing mode, with fixed amount, percentage, hybrid defaults and per-quote override. Do not hard-code illustrative margin percentages or a universal GST rate. Tax codes/rates must be configured and reviewed by the owner/accountant.

## Used equipment evidence

For used laptops/desktops: brand/model, CPU/generation, RAM, storage, display, battery health (laptops), condition grade, quantity, warranty, test status, photos and supplier declaration.

For workstations/servers: CPU, RAM type/capacity, storage, RAID/controller, PSU, GPU where relevant, condition, warranty, test status, photos and supplier declaration.

Preserve original vendor statements and images. AI extraction must distinguish verified facts from vendor claims and must not infer condition or battery health from an image.

## Vendor and partner records

Store business name, contact person, WhatsApp number, email, location/service area, categories/subcategories, brands, new/used/refurbished capabilities, GST details, warranty terms, response SLA, active status, notes and performance history. Keep vendor credentials and internal notes private.

## Security and privacy requirements

- Supabase Auth for owner/admin/staff and separate supplier portal identities.
- Enforce row-level security (RLS) on every tenant-sensitive table.
- Suppliers can read only their own supplier profile, invitation, response and uploaded files.
- Supplier A must never be able to query Supplier B's response, contact details or pricing.
- Customer contact data is shared with a supplier only when required for fulfilment and explicitly approved.
- WhatsApp access tokens, Supabase service-role keys and AI keys must stay in server-side secrets; never in public GitHub Pages JavaScript.
- Use server-side functions/webhooks for WhatsApp messaging, supplier matching, quote generation and privileged writes.
- Audit log for status changes, supplier selection, margin overrides, quote approval and outbound messages.
- Rate limits, validation, file type/size checks, signed private file URLs, backups and retention rules.
- Use official WhatsApp Business Platform only. Respect template approval and customer-service-window rules.

## Core data model (initial)

- customers
- enquiries
- enquiry_messages
- enquiry_attachments
- categories / subcategories
- vendors
- vendor_categories
- service_partners
- sourcing_requests
- sourcing_request_recipients
- vendor_responses
- vendor_response_items
- projects
- project_lines
- pricing_rules
- quotations
- quotation_lines
- quotation_approvals
- purchase_orders
- purchase_order_lines
- service_jobs
- job_assignments
- invoices_external (NCH reference/import status only)
- payments
- audit_events
- notification_jobs

All supplier response and quote data must be scoped to the relevant enquiry and supplier. Store currency as INR paise/integer minor units where practical; store tax code/rate explicitly.

## Admin modules

Owner dashboard, enquiries, customers, vendors, service partners, category management, sourcing requests, response comparison, project costing, pricing rules, customer quotations, purchase orders, service jobs, AMC, technician assignments, NCH export/import, payment tracking, reports and audit log.

Supplier-facing experience: secure magic-link/OTP sign-in, invitation detail, quote response form, photo/document upload, clarification thread and response history. WhatsApp reply parsing is an additional input channel, not the only source of truth.

## Integration and deployment plan

- Preserve the existing GitHub repository and public pages.
- Keep this feature isolated behind a feature flag until tested.
- Move production hosting to Cloudflare Pages only after domain/DNS and deployment configuration are confirmed.
- Use Supabase for database, auth, private storage and server-side functions.
- Connect official WhatsApp Business Platform after business number, Meta app, webhook and template configuration are available.
- Start NCH integration with a tested CSV mapping for the user's installed NCH Express Invoice version. No duplicate invoicing.
- Test with synthetic customers/vendors first; then pilot with a small, approved vendor group. No real vendor broadcasts until the owner enables them.

## Delivery phases

1. Repository and security audit; identify existing admin/data flows and prevent public exposure of secrets.
2. Supabase schema, RLS policies, auth roles, storage buckets and migrations.
3. Vendor/partner management and category/subcategory matching.
4. Enquiry intake, ticketing and manual sourcing requests.
5. Vendor response portal and WhatsApp integration.
6. Offer comparison, project costing, configurable margin/tax and approval workflow.
7. Customer quotation/PDF, PO, service tracking and NCH CSV handoff.
8. Reporting, reminders, audit, pilot and production rollout.

## Required owner configuration before live operation

- Official WhatsApp Business number and Meta Business/API setup.
- Supabase project and production secrets (never commit secrets).
- Domain/DNS and Cloudflare account/project.
- NCH Express Invoice version and a sample exported/import template.
- Vendor and service-partner contact list with categories and consent to receive sourcing requests.
- Owner-approved category margins, labour rates, tax codes and quote terms.
