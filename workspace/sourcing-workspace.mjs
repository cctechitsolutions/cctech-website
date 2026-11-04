import { SourcingClient, CATEGORIES } from './sourcing-client.mjs';
import { sourcingConfig } from './sourcing-config.mjs';
import { normalizePhone, matchSuppliers, buildRfqMessage, whatsappUrl, CUSTOMER_PART_MESSAGE, draftMessage } from './sourcing-rfq.mjs';
import { createOrdersWorkspace } from './sourcing-orders.mjs';
const $ = id => document.getElementById(id);
let client;
let expiryTimer;
let viewGeneration = 0;
let records = { enquiries: [], suppliers: [] };
let rfqGeneration = 0;
const message = (text, error = false) => { $('message').textContent = text; $('message').classList.toggle('error', error); };
const ordersWorkspace = createOrdersWorkspace({ getClient: () => client, notify: message, run });
function lock() {
  ordersWorkspace.reset();
  viewGeneration++;
  clearTimeout(expiryTimer);
  client?.clear();
  $('workspace').hidden = true;
  $('loginPanel').hidden = false;
  $('enquiryList').replaceChildren();
  $('supplierList').replaceChildren();
  $('whatsappInbox').replaceChildren();
  $('whatsappStatus').textContent = 'Official WhatsApp connection is not activated yet.';
  $('identity').textContent = '';
  $('enquiryForm').reset();
  $('supplierForm').reset();
  records = { enquiries: [], suppliers: [] };
  rfqGeneration++;
  $('rfqForm').reset();
  $('rfqEnquiry').replaceChildren();
  $('rfqDetails').textContent = '';
  $('rfqSuppliers').replaceChildren();
  $('rfqList').replaceChildren();
}
function textElement(tag, value) { const el = document.createElement(tag); el.textContent = value; return el; }
function render(target, rows, kind) {
  const list = $(target);
  list.replaceChildren();
  if (!rows.length) { list.textContent = 'No records yet.'; return; }
  for (const row of rows) {
    const article = document.createElement('article'); article.className = 'record';
    article.append(textElement('h3', kind === 'enquiry' ? row.customer_name : row.name));
    if (kind === 'enquiry') {
      article.append(textElement('small', `${row.reference_code || row.id} · ${row.category} · ${row.priority}`),
        textElement('p', row.requirements), textElement('small', `${row.pricing_mode} · ${row.status} · Required by: ${row.required_by || 'Not specified'}`));
    } else {
      article.append(textElement('small', `${row.partner_type} · ${row.active ? 'Active' : 'Inactive'}`),
        textElement('p', row.categories.join(', ')), textElement('small', `Brands: ${row.brands.join(', ') || 'Not specified'} · Areas: ${row.service_areas.join(', ') || 'Not specified'}`));
      const form = document.createElement('form');
      const label = textElement('label', 'WhatsApp number (include country code)');
      const phone = document.createElement('input'); phone.type = 'tel'; phone.autocomplete = 'off';
      phone.value = row.whatsapp_number || ''; phone.placeholder = '919876543210';
      label.append(phone); const save = textElement('button', 'Save WhatsApp number');
      const consentLabel = textElement('label', 'Vendor agrees to receive CCTech sourcing enquiries'); consentLabel.className = 'checkline';
      const consent = document.createElement('input'); consent.type = 'checkbox'; consent.checked = row.enquiry_consent === true; consentLabel.prepend(consent);
      save.type = 'submit'; save.className = 'secondary'; form.append(label, consentLabel, save); article.append(form);
      form.addEventListener('submit', event => {
        event.preventDefault(); run(save, async () => {
          const number = normalizePhone(phone.value);
          try { await client.saveVendorContact(row.id, number, consent.checked); }
          catch (error) { throw new Error(error.message + ' Check that the latest workspace database upgrade was applied.'); }
          row.whatsapp_number = number; phone.value = number || '';
          row.enquiry_consent = consent.checked;
          message('Supplier WhatsApp number saved.');
          await loadRfqSelection(false);
        });
      });
    }
    list.append(article);
  }
}
async function refresh() {
  const generation = viewGeneration;
  const [enquiries, suppliers] = await Promise.all([client.list('enquiries'), client.list('suppliers')]);
  if (generation !== viewGeneration) return;
  records = { enquiries, suppliers };
  render('enquiryList', enquiries, 'enquiry'); render('supplierList', suppliers, 'supplier');
  const selected = $('rfqEnquiry').value;
  $('rfqEnquiry').replaceChildren(textElement('option', enquiries.length ? 'Select a customer enquiry' : 'No customer enquiries saved — create one above first'));
  $('rfqEnquiry').firstChild.value = '';
  $('rfqEnquiry').disabled = enquiries.length === 0;
  for (const enquiry of enquiries) {
    const option = textElement('option', `${enquiry.customer_name} · ${enquiry.category} · ${enquiry.reference_code || enquiry.id}`);
    option.value = enquiry.id; $('rfqEnquiry').append(option);
  }
  if (enquiries.some(enquiry => enquiry.id === selected)) $('rfqEnquiry').value = selected;
  await loadRfqSelection(false);
  await refreshWhatsApp(generation);
  if (generation === viewGeneration) await ordersWorkspace.refresh(enquiries, suppliers);
}

async function refreshWhatsApp(generation) {
  try {
    const messages = await client.list('channel_inbox');
    if (generation !== viewGeneration) return;
    $('whatsappInbox').replaceChildren();
    $('whatsappStatus').textContent = messages.length ? 'Messages received through the official channel connections. Pending messages still require processing.' : 'No incoming messages yet. WhatsApp, Facebook and Instagram must be authorised and connected to the hosted receiver.';
    for (const item of messages) {
      const supplier = item.channel === 'whatsapp' ? records.suppliers.find(row => row.whatsapp_number === item.sender_id) : null;
      const article = document.createElement('article'); article.className = 'record';
      article.append(textElement('h3', `${item.channel} · ${supplier ? `Vendor: ${supplier.name}` : `Customer / contact: ${item.sender_id}`}`),
        textElement('p', item.message_text || `[${item.message_type} message]`), textElement('small', `${item.provider_timestamp} · ${item.processing_status}`));
      $('whatsappInbox').append(article);
    }
  } catch {
    if (generation !== viewGeneration) return;
    $('whatsappInbox').replaceChildren();
    $('whatsappStatus').textContent = 'WhatsApp inbox is not available. Integration setup or reconnection is required.';
  }
}

async function loadRfqSelection(resetRequirement = true) {
  const generation = ++rfqGeneration;
  const enquiry = records.enquiries.find(row => row.id === $('rfqEnquiry').value);
  $('rfqSuppliers').replaceChildren(); $('rfqList').replaceChildren(); $('rfqDetails').textContent = '';
  if (resetRequirement) $('rfqRequirement').value = '';
  if (!enquiry) {
    $('rfqDetails').textContent = records.enquiries.length ? 'Select a saved customer enquiry to find matching vendors.' : 'Your vendors are saved. Now fill in New enquiry above and click Save enquiry. It will then appear in this dropdown.';
    return;
  }
  $('rfqDetails').textContent = `Customer requirement (internal): ${enquiry.requirements}`;
  const matches = matchSuppliers(enquiry, records.suppliers);
  for (const supplier of matches) {
    const label = document.createElement('label'); const check = document.createElement('input');
    check.type = 'checkbox'; check.name = 'supplier_id'; check.value = supplier.id;
    label.append(check, document.createTextNode(`${supplier.name} · ${supplier.partner_type}${supplier.whatsapp_number ? '' : ' · WhatsApp number needed'}`));
    $('rfqSuppliers').append(label);
  }
  if (!matches.length) $('rfqSuppliers').textContent = 'No matching active suppliers. Add a supplier with this category and appropriate partner type.';
  const requests = await client.requestsFor(enquiry.id);
  if (generation !== rfqGeneration) return;
  for (const request of requests) renderRequest(request);
}
function renderRequest(request) {
  const supplier = records.suppliers.find(row => row.id === request.supplier_id);
  const enquiry = records.enquiries.find(row => row.id === $('rfqEnquiry').value);
  const outgoingMessage = enquiry ? draftMessage(request, enquiry, supplier) : request.request_message;
  const article = document.createElement('article'); article.className = 'record';
  article.append(textElement('h3', supplier?.name || 'Supplier outside the loaded directory'), textElement('small', `Status: ${request.status}`), textElement('p', outgoingMessage));
  if (supplier?.whatsapp_number && ['draft', 'sent'].includes(request.status)) {
    const link = textElement('a', 'Review in WhatsApp →');
    link.href = whatsappUrl(supplier.whatsapp_number, outgoingMessage);
    link.target = '_blank'; link.rel = 'noopener noreferrer'; article.append(link);
  } else if (!supplier?.whatsapp_number) article.append(textElement('p', 'Add this supplier’s WhatsApp number in the directory below.'));
  if (request.status === 'draft') {
    const queue = textElement('button', 'Queue automatic vendor enquiry'); queue.className = 'secondary';
    queue.addEventListener('click', () => run(queue, async () => {
      await client.workflowAction('queue_vendor_request', { p_request_id: request.id });
      message('Vendor enquiry queued. Sending remains disabled until the official connection and costs are authorised.');
    })); article.append(queue);
    const sent = textElement('button', 'I sent this in WhatsApp'); sent.className = 'secondary';
    sent.addEventListener('click', () => run(sent, async () => {
      await client.markRequestSent(request.id); await loadRfqSelection(false);
      message('Request marked sent. This is your manual confirmation, not a WhatsApp delivery receipt.');
    })); article.append(sent);
  }
  $('rfqList').append(article);
}
$('rfqEnquiry').addEventListener('change', () => run($('rfqForm').querySelector('button'), () => loadRfqSelection()));
$('rfqForm').addEventListener('submit', event => {
  event.preventDefault(); const button = event.currentTarget.querySelector('button');
  run(button, async () => {
    const enquiry = records.enquiries.find(row => row.id === $('rfqEnquiry').value);
    if (!enquiry) throw new Error('Select a customer enquiry.');
    const ids = new FormData($('rfqForm')).getAll('supplier_id');
    const selected = matchSuppliers(enquiry, records.suppliers).filter(supplier => ids.includes(supplier.id));
    if (!selected.length) throw new Error('Select at least one matching supplier.');
    const prepared = selected.map(supplier => ({ enquiry_id: enquiry.id, supplier_id: supplier.id,
      request_message: buildRfqMessage(enquiry, supplier, $('rfqRequirement').value), status: 'draft' }));
    const existing = await client.requestsFor(enquiry.id);
    const fresh = prepared.filter(request => !existing.some(row => row.supplier_id === request.supplier_id));
    let saved = 0;
    try {
      for (const request of fresh) { await client.create('supplier_requests', request); saved++; }
    } catch {
      await loadRfqSelection(false);
      throw new Error(`${saved} new requests saved before the operation stopped. Review the requests below before retrying.`);
    }
    await loadRfqSelection(false);
    message(`${saved} new requests prepared; ${prepared.length - fresh.length} already existed. Review and send each message in WhatsApp.`);
  });
});
async function run(button, action) {
  button.disabled = true;
  try { await action(); }
  catch (error) {
    if (!client?.session) lock();
    message(error instanceof TypeError ? 'Could not reach Supabase. Check the project URL and your connection.' : error.message, true);
  } finally { button.disabled = false; }
}
for (const category of CATEGORIES) {
  const option = textElement('option', category); $('enquiryCategory').append(option);
  const label = document.createElement('label'); const input = document.createElement('input');
  input.type = 'checkbox'; input.name = 'categories'; input.value = category;
  label.append(input, document.createTextNode(category)); $('supplierCategories').append(label);
}
$('loginForm').addEventListener('submit', event => {
  event.preventDefault(); const form = event.currentTarget; const data = new FormData(form);
  run(form.querySelector('button'), async () => {
    lock();
    client = new SourcingClient(sourcingConfig);
    let user;
    try { user = await client.signIn(data.get('email').trim(), data.get('password')); }
    finally { form.elements.password.value = ''; }
    $('identity').textContent = `Signed in as ${user.email}`;
    $('loginPanel').hidden = true; $('workspace').hidden = false;
    expiryTimer = setTimeout(() => { lock(); message('Session expired. Please sign in again.'); }, client.session.expiresAt - Date.now());
    await refresh(); message('Connected. Enquiries and suppliers are saved in your private database.');
  });
});
$('signOut').addEventListener('click', () => run($('signOut'), async () => {
  const current = client;
  // Hide and clear private records immediately, even if the network is unavailable.
  const pending = current.signOut(); lock();
  try { await pending; message('Signed out.'); }
  catch { message('Signed out on this page. Server logout could not be confirmed.', true); }
}));
$('refresh').addEventListener('click', () => run($('refresh'), async () => { await refresh(); message('Records refreshed.'); }));
$('enquiryForm').addEventListener('submit', event => {
  event.preventDefault(); const form = event.currentTarget;
  run(form.querySelector('button'), async () => {
    const record = Object.fromEntries(new FormData(form));
    record.customer_name = record.customer_name.trim(); record.requirements = record.requirements.trim();
    if (!record.customer_name || !record.requirements) throw new Error('Enter a customer name and requirement.');
    record.required_by ||= null;
    await client.create('enquiries', record); form.reset();
    message('Enquiry saved.');
    try { await refresh(); } catch { message('Enquiry saved. Refresh records to view it.', true); }
  });
});
$('supplierForm').addEventListener('submit', event => {
  event.preventDefault(); const form = event.currentTarget;
  run(form.querySelector('button'), async () => {
    const data = new FormData(form); const split = value => value.split(',').map(x => x.trim()).filter(Boolean);
    const record = { name: data.get('name').trim(), partner_type: data.get('partner_type'), categories: data.getAll('categories'),
      brands: split(data.get('brands')), service_areas: split(data.get('service_areas')), conditions: split(data.get('condition')) };
    if (!record.name || !record.categories.length) throw new Error('Enter a supplier name and select at least one category.');
    await client.create('suppliers', record); form.reset();
    message('Supplier saved.');
    try { await refresh(); } catch { message('Supplier saved. Refresh records to view it.', true); }
  });
});
window.addEventListener('pagehide', lock);
$('customerPartMessage').value = CUSTOMER_PART_MESSAGE;
$('copyCustomerMessage').addEventListener('click', () => run($('copyCustomerMessage'), async () => {
  try {
    await navigator.clipboard.writeText(CUSTOMER_PART_MESSAGE);
    message('Customer message copied. Paste it into WhatsApp, Instagram or Facebook.');
  } catch {
    $('customerPartMessage').focus(); $('customerPartMessage').select();
    message('Message selected. Press Ctrl+C to copy it.');
  }
}));

// Check the actual browser-to-Supabase connection without a password. A shell
// request alone cannot detect browser-only transport failures.
new SourcingClient(sourcingConfig).request('/auth/v1/settings', { authenticated: false })
  .then(() => { if (viewGeneration === 0) message('Supabase connection ready. Sign in with your CCTech staff account.'); })
  .catch(() => { if (viewGeneration === 0) message('This browser could not connect to Supabase. Check your internet connection and reload the page.', true); });
