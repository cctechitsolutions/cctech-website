/*
 * Small shared Supabase client bootstrap for the static CCTech site.
 * Include Supabase JS v2 CDN, supabase-config.js, then this file.
 */
(function () {
  const config = window.CCTECH_SUPABASE_CONFIG || {};
  const validUrl = /^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(config.url || "");
  const validKey = typeof config.anonKey === "string" &&
    config.anonKey.length > 20 &&
    !config.anonKey.includes("YOUR_PUBLIC_");
  window.CCTECH_CLOUD = {
    configured: Boolean(validUrl && validKey && window.supabase && window.supabase.createClient),
    client: null,
    error: null
  };
  if (!window.CCTECH_CLOUD.configured) {
    window.CCTECH_CLOUD.error = "Supabase is not configured. Add the project URL and public anon/publishable key in supabase-config.js.";
    return;
  }
  try {
    window.CCTECH_CLOUD.client = window.supabase.createClient(config.url, config.anonKey, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
    });
  } catch (error) {
    window.CCTECH_CLOUD.configured = false;
    window.CCTECH_CLOUD.error = error.message || "Unable to initialize Supabase.";
  }
})();
