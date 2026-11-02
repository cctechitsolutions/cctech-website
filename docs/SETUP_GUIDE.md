# CCTech platform setup guide

This repository is being migrated gradually from a static website to a managed business platform.

## Current status
- Development branch: `development`
- Production branch: `main` (do not change during development)
- Recovery branch: `backup/pre-cloudflare-migration-2026-11-02`
- Initial database migration: `supabase/migrations/202611020001_initial_schema.sql`
- The migration has been committed but has NOT been applied to a Supabase project or validated against live customer data.

## Accounts required
1. GitHub repository access.
2. Cloudflare account for Pages and DNS.
3. Supabase account for database, authentication and storage.
4. Domain registration account (domain purchase still pending).

## Supabase setup
1. Create a NEW Supabase project for CCTech development.
2. Select a strong unique database password and store it in a password manager.
3. Open the SQL Editor and review the migration before applying it to the empty development project, or use Supabase CLI migrations.
4. Confirm all tables, indexes, triggers, functions and RLS policies are created successfully.
5. In Authentication settings, disable public user sign-ups. Staff accounts should be invited/created by the business administrator.
6. Create the first staff user, then promote that profile to `super_admin` using the SQL Editor while signed in as the project owner.
7. Configure allowed redirect URLs only after the Cloudflare preview and production hostnames are known.
8. Configure automated backups and test a restore procedure before production use.

## Cloudflare Pages setup
1. Create a Pages project connected to this GitHub repository.
2. Set production branch to `main` only when the production migration is approved.
3. Use `development` for preview testing.
4. Current site is plain HTML/CSS/JS at repository root. Do not add a build command until the frontend is migrated to a build-based framework.
5. Set output directory to repository root for the current static site.
6. Do not configure production custom domain/DNS until the domain is purchased and the new deployment is approved.

## Environment variables
The browser may use only the Supabase project URL and publishable/anon key. Never expose:
- Supabase service-role key
- Database password
- Payment gateway secret
- Webhook signing secret

For static pages, client configuration must be injected as public build-time values only after the application integration is implemented. Server-side secrets belong in Supabase Edge Function secrets.

## Important cautions
- Do not import live customer records into development without an approved, secure migration process.
- Do not use the current localStorage admin password as authentication.
- Do not mark an order paid based on a browser redirect or screenshot. Verify the payment provider webhook server-side.
- Public order, repair and AMC forms must call validated server-side functions; do not enable anonymous writes to private business tables.
- Keep the current production website working until all new flows pass acceptance testing.
