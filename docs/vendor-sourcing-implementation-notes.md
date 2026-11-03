# CCTech vendor sourcing implementation notes

## Current repository baseline
The existing `admin.html` manages the public catalogue (products, categories and services) by writing edits to browser `localStorage` and exporting `database.js`. It is not a shared multi-user database. Do not put customer enquiries, supplier contacts, supplier pricing, quotations, or credentials into `database.js`, Git commits, or browser local storage.

The existing admin page currently renders its dashboard without a verified server-side login. It must not be treated as a secure private portal. Do not add confidential sourcing records to that page until Supabase Auth and Row Level Security are connected and tested.

## Files in this branch
- `vendor-sourcing.html`: interaction prototype only. It uses in-memory sample entries, does not save them, does not contact vendors, and does not send WhatsApp messages.
- `supabase/migrations/001_vendor_sourcing.sql`: initial database schema and row-level policies for staff and supplier portal users. Review and test in a new Supabase project before applying.
- `docs/vendor-sourcing-engine.md`: previously approved full workflow and feature requirements.

## Security model
- CCTech staff authenticate through Supabase Auth and have a `profiles.role='staff'` record.
- Each supplier portal login is linked to one `suppliers.portal_user_id`.
- Suppliers may read only requests assigned to their supplier record and submit/update only their own offers.
- Staff alone can read customer enquiries, compare all offers, manage supplier records, build costs, and prepare/approve customer quotes.
- Customer contact details must be minimized in supplier request messages. Send only what a supplier needs to quote.
- Keep Supabase service-role credentials exclusively in trusted server-side functions/secrets. The browser may use only the anon/publishable key after RLS is verified.
- Do not enable public storage buckets for customer or supplier evidence. Use private buckets and signed URLs after access rules are designed.
- The initial SQL is a foundation, not a production security certification. Test using separate staff and supplier accounts, including negative cross-supplier access tests, before entering real data.

## Zero-spend sequence
1. Keep the current GitHub Pages website and use this branch for development. No domain or paid hosting is required for this stage.
2. Create a Supabase project only if the free tier is currently available and its limits are acceptable. Never upgrade automatically.
3. Apply and test the SQL migration in the Supabase SQL editor; create the first staff profile securely from the dashboard.
4. Connect the front end using Auth + RLS. Never embed service-role keys or secrets in GitHub.
5. Add enquiry, supplier directory, individual RFQ dispatch, offer capture/comparison, project costing, margin rules and customer approval.
6. Keep WhatsApp as a manual click-to-chat / copy-message workflow until an official API budget is approved.
7. Keep NCH Express Invoice as the official invoice system. Integrate via CSV export/import first; do not duplicate tax invoice generation.

## Known limitations / next build work
- The prototype is not connected to Supabase and has no persistent storage.
- The migration does not yet include automatic RFQ dispatch, WhatsApp/email delivery, document upload policies, automated AI extraction, detailed margin-rule tables, or NCH CSV mapping.
- GST rates and margin percentages are not hard-coded. Configure them only after category-specific accounting rules are confirmed.
- Used/refurbished equipment must retain explicit condition, battery health, test status and photo evidence; unknown values must remain unconfirmed.
