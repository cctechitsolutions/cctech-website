// No SDK, paid service, or persistent browser token storage is required.
export function validateConfig(url, key) {
  const parsed = new URL(url);
  if (parsed.protocol !== 'https:' || !/^[a-z0-9-]+\.supabase\.co$/.test(parsed.hostname) || parsed.pathname !== '/' || parsed.search || parsed.hash || parsed.username || parsed.password || parsed.port) {
    throw new Error('Enter your HTTPS Supabase project URL.');
  }
  if (!/^sb_publishable_[A-Za-z0-9_-]+$/.test(key)) throw new Error('Use a publishable key beginning sb_publishable_. Never enter a secret key.');
  return { url: parsed.origin, key };
}

export class SourcingClient {
  constructor(config, fetcher = (...args) => globalThis.fetch(...args)) {
    this.config = validateConfig(config.url, config.key);
    this.fetcher = fetcher;
    this.session = null;
  }
  clear() { this.session = null; }
  async request(path, { method = 'GET', body, authenticated = true } = {}) {
    if (authenticated && !this.session) throw new Error('Please sign in.');
    if (authenticated && Date.now() >= this.session.expiresAt) {
      this.clear();
      throw new Error('Session expired. Please sign in again.');
    }
    const headers = { apikey: this.config.key, 'Content-Type': 'application/json' };
    if (authenticated) headers.Authorization = `Bearer ${this.session.access_token}`;
    if (path.startsWith('/rest/') && ['POST', 'PATCH'].includes(method)) headers.Prefer = 'return=representation';
    const response = await this.fetcher(this.config.url + path, {
      method, headers, body: body === undefined ? undefined : JSON.stringify(body),
      cache: 'no-store', credentials: 'omit', redirect: 'error',
    });
    if (!response.ok) {
      if (response.status === 401) this.clear();
      // Do not display server errors that might echo business data or credentials.
      throw new Error(response.status === 401 ? 'Sign-in failed or session expired. Please sign in again.' :
        response.status === 403 ? 'Access denied. Check staff permissions.' :
        'Request failed. Check the connection, migrations and entered values.');
    }
    return response.status === 204 ? null : response.json();
  }
  async signIn(email, password) {
    this.clear();
    try {
      const result = await this.request('/auth/v1/token?grant_type=password', {
        method: 'POST', authenticated: false, body: { email, password },
      });
      if (!result.access_token || !result.user?.id || !(result.expires_in > 0)) throw new Error('Invalid sign-in response.');
      this.session = { access_token: result.access_token, user: result.user, expiresAt: Date.now() + result.expires_in * 1000 };
      const profiles = await this.request(`/rest/v1/profiles?select=role&user_id=eq.${encodeURIComponent(result.user.id)}`);
      if (profiles.length !== 1 || !['staff','owner'].includes(profiles[0].role)) throw new Error('This workspace requires an approved CCTech staff account.');
      this.session.profile = profiles[0];
      return result.user;
    } catch (error) { this.clear(); throw error; }
  }
  async signOut() {
    try { if (this.session) await this.request('/auth/v1/logout', { method: 'POST' }); }
    finally { this.clear(); }
  }
  list(table) {
    if (!['enquiries', 'suppliers', 'supplier_requests', 'whatsapp_messages', 'channel_inbox', 'channel_connections', 'channel_outbox', 'team_notifications', 'sales_orders', 'order_notifications'].includes(table)) throw new Error('Unsupported record type.');
    const order = table === 'channel_connections' ? 'channel.asc' : 'created_at.desc';
    return this.request(`/rest/v1/${table}?select=*&order=${order}&limit=100`);
  }
  create(table, record) {
    if (!['enquiries', 'suppliers', 'supplier_requests', 'supplier_offers'].includes(table)) throw new Error('Unsupported record type.');
    const body = { ...record };
    if (['enquiries', 'supplier_requests'].includes(table)) body.created_by = this.session?.user.id;
    return this.request(`/rest/v1/${table}`, { method: 'POST', body });
  }
  updateSupplierPhone(id, number) {
    return this.request(`/rest/v1/suppliers?id=eq.${encodeURIComponent(id)}`, { method: 'PATCH', body: { whatsapp_number: number } });
  }
  saveVendorContact(id, number, consent) {
    return this.request(`/rest/v1/suppliers?id=eq.${encodeURIComponent(id)}`, { method: 'PATCH', body: { whatsapp_number: number, enquiry_consent: consent } });
  }
  saveChannelId(channel, id) {
    if (!['whatsapp','facebook','instagram'].includes(channel) || !/^\d+$/.test(id)) throw new Error('Enter the Meta account ID, using digits only.');
    return this.request(`/rest/v1/channel_connections?channel=eq.${channel}`, { method: 'PATCH', body: { business_account_id: id, enabled: false, connected_at: null, updated_at: new Date().toISOString() } });
  }
  enableVerifiedChannel(channel) {
    if (!['whatsapp','facebook','instagram'].includes(channel)) throw new Error('Unsupported channel.');
    return this.request(`/rest/v1/channel_connections?channel=eq.${channel}`, { method: 'PATCH', body: { enabled: true, updated_at: new Date().toISOString() } });
  }
  requestsFor(enquiryId) {
    return this.request(`/rest/v1/supplier_requests?select=*&enquiry_id=eq.${encodeURIComponent(enquiryId)}&order=created_at.desc`);
  }
  markRequestSent(id) {
    return this.request(`/rest/v1/supplier_requests?id=eq.${encodeURIComponent(id)}`, { method: 'PATCH', body: { status: 'sent' } });
  }
  offersFor(enquiryId) {
    return this.request(`/rest/v1/supplier_offers?select=*,supplier_requests!inner(enquiry_id)&supplier_requests.enquiry_id=eq.${encodeURIComponent(enquiryId)}&order=unit_price.asc`);
  }
  confirmOfferFit(id, description) {
    if (!description?.trim()) throw new Error('Confirm the exact part / model description.');
    return this.request(`/rest/v1/supplier_offers?id=eq.${encodeURIComponent(id)}`, { method: 'PATCH', body: { compatibility_confirmed: true, item_description: description.trim() } });
  }
  workflowSettings() { return this.request('/rest/v1/workflow_settings?select=*&id=eq.true'); }
  saveWorkflowSettings(record) {
    return this.request('/rest/v1/workflow_settings?id=eq.true', { method: 'PATCH', body: record });
  }
  workflowAction(name, args) {
    if (!['prepare_sales_order', 'revise_sales_order', 'approve_sales_order', 'queue_vendor_request', 'record_order_payment', 'advance_order', 'queue_order_review'].includes(name)) throw new Error('Unsupported workflow action.');
    return this.request(`/rest/v1/rpc/${name}`, { method: 'POST', body: args });
  }
}

export const CATEGORIES = ['Laptop / desktop / parts', 'Used / refurbished equipment', 'Servers / storage', 'Networking', 'CCTV / security', 'UPS / power backup', 'Batteries', 'Peripherals / accessories', 'AMC / IT support', 'Repair / data recovery', 'Access control / biometric', 'IT infrastructure / server room', 'Software / licensing', 'Installation / onsite project', 'Buyback / e-waste'];
