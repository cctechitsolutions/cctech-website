import { rupeesToPaise, inr, fulfilmentQuote, choiceMessage } from './sourcing-orders-model.mjs';
const $ = id => document.getElementById(id);
const node = (tag, text) => { const el = document.createElement(tag); el.textContent = text; return el; };
const field = (label, type = 'text') => {
  const el = node('label', label); const input = document.createElement('input'); input.type = type; el.append(input); return { el, input };
};
export function createOrdersWorkspace({ getClient, notify, run }) {
  let enquiries = []; let suppliers = []; let offers = []; let orders = []; let notifications = []; let generation = 0;
  let available = false;
  const enquiry = () => enquiries.find(row => row.id === $('orderEnquiry').value);
  const offer = () => offers.find(row => row.id === $('orderOffer').value);
  function reset() {
    generation++; enquiries = []; suppliers = []; offers = []; orders = []; notifications = []; available = false;
    for (const id of ['orderEnquiry', 'orderOffer', 'replyRequest', 'offerComparison', 'orderList', 'notificationList', 'teamAlerts', 'channelConnections', 'channelQueue']) $(id).replaceChildren();
    for (const id of ['offerForm', 'orderForm', 'workflowSettingsForm']) $(id).reset();
    $('choicePreview').value = ''; $('orderSummary').textContent = '';
    $('orderWorkflowStatus').textContent = 'Sign in to load orders.';
  }
  async function refresh(nextEnquiries, nextSuppliers) {
    const current = ++generation;
    enquiries = nextEnquiries; suppliers = nextSuppliers;
    try {
      const [settings, savedOrders, queued, alerts, channels, outbox] = await Promise.all([getClient().workflowSettings(), getClient().list('sales_orders'), getClient().list('order_notifications'), getClient().list('team_notifications'), getClient().list('channel_connections'), getClient().list('channel_outbox')]);
      if (current !== generation) return;
      available = true; orders = savedOrders; notifications = queued;
      $('reviewUrl').value = settings[0]?.review_url || '';
      $('paymentInstructions').value = settings[0]?.payment_instructions || '';
      $('publicWorkspaceUrl').value = settings[0]?.public_workspace_url || '';
      const isOwner = getClient().session?.profile?.role === 'owner';
      $('workflowSettingsForm').querySelectorAll('input,textarea,button').forEach(el => { el.disabled = !isOwner; });
      renderConnections(channels, alerts, outbox, isOwner);
      $('orderWorkflowStatus').textContent = 'Workspace order tracking is ready. WhatsApp, Facebook and Instagram delivery connections are not activated. Queued messages have not been sent.';
      const selected = $('orderEnquiry').value;
      $('orderEnquiry').replaceChildren(node('option', 'Select customer enquiry')); $('orderEnquiry').firstChild.value = '';
      for (const row of enquiries) { const option = node('option', `${row.customer_name} · ${row.category}`); option.value = row.id; $('orderEnquiry').append(option); }
      if (enquiries.some(row => row.id === selected)) $('orderEnquiry').value = selected;
      renderOrders(); await loadEnquiry();
    } catch {
      if (current !== generation) return;
      available = false;
      $('orderWorkflowStatus').textContent = 'Order workflow is not connected yet. Run supabase/upgrade-workspace.sql in the project SQL Editor, then refresh records.';
    }
  }
  async function reload() { await refresh(enquiries, suppliers); }
  async function loadEnquiry() {
    const current = ++generation; const selected = enquiry();
    offers = []; $('replyRequest').replaceChildren(); $('orderOffer').replaceChildren(); $('offerComparison').replaceChildren();
    $('choicePreview').value = ''; $('orderSummary').textContent = '';
    $('orderMargin').value = '15'; $('orderMarginMode').value = 'percentage';
    $('orderMargin').readOnly = false;
    $('orderBudget').value = selected?.customer_budget ?? '';
    $('orderAddress').value = selected?.customer_requirements?.address || '';
    $('orderQty').value = Number.isSafeInteger(Number(selected?.customer_requirements?.quantity)) && Number(selected?.customer_requirements?.quantity)>0 ? Number(selected.customer_requirements.quantity) : 1;
    $('orderCarrier').value = selected?.requested_fulfilment === 'delivery' ? 'Customer-arranged courier' : '';
    if (['delivery','store_fitting'].includes(selected?.requested_fulfilment)) $('orderRoute').value = selected.requested_fulfilment;
    if (!selected || !available) return;
    const [requests, savedOffers] = await Promise.all([getClient().requestsFor(selected.id), getClient().offersFor(selected.id)]);
    if (current !== generation) return;
    offers = savedOffers.sort((a,b) => (a.unit_price === null ? Infinity : Number(a.unit_price)/(a.gst_treatment === 'GST included' ? 1.18 : 1)) - (b.unit_price === null ? Infinity : Number(b.unit_price)/(b.gst_treatment === 'GST included' ? 1.18 : 1)));
    for (const request of requests) {
      const supplier = suppliers.find(row => row.id === request.supplier_id);
      const option = node('option', supplier?.name || request.supplier_id);
      option.value = request.id; option.dataset.supplier = request.supplier_id; $('replyRequest').append(option);
    }
    if (!requests.length) $('offerComparison').append(node('p', 'Prepare requests for this enquiry under Request vendor prices first.'));
    for (const row of offers) {
      const supplier = suppliers.find(item => item.id === row.supplier_id);
      const card = node('article', ''); card.className = 'record';
      card.append(node('h3', `${supplier?.name || 'Vendor'} · ${row.part_quality || 'Type unconfirmed'}`),
        node('p', `${row.item_description} · ${row.unit_price === null ? 'Price unknown' : inr(Math.round(Number(row.unit_price) * 100))} per unit · Qty ${row.quantity}`),
        node('small', `${row.stock_status} · Fit ${row.compatibility_confirmed ? 'confirmed' : 'unconfirmed'} · GST: ${row.gst_treatment || 'unconfirmed'}`));
      $('offerComparison').append(card);
      if (row.raw_reply) { const original=node('details',''); original.append(node('summary','Original vendor reply'),node('p',row.raw_reply));card.append(original); }
      if (!row.compatibility_confirmed) {
        const exact=field('Exact part / model and configuration for customer quotation');exact.input.value=row.item_description;card.append(exact.el);
        const confirm = node('button', 'I checked this offer matches the requested item / model'); confirm.className = 'secondary';
        confirm.addEventListener('click', () => run(confirm, async () => { await getClient().confirmOfferFit(row.id,exact.input.value); await loadEnquiry(); notify('Offer fit confirmed for quotation review.'); })); card.append(confirm);
      }
      if (row.unit_price !== null && row.compatibility_confirmed && row.stock_status === 'in_stock' && row.part_quality && row.warranty?.trim() && row.currency === 'INR' && ['GST included','GST excluded'].includes(row.gst_treatment)) {
        if (row.offer_valid_until && row.offer_valid_until < new Date().toISOString().slice(0,10)) continue;
        const option = node('option', `${supplier?.name || 'Vendor'} · ${row.part_quality} · ${row.item_description} · ${inr(Math.round(Number(row.unit_price) * 100))}`);
        option.value = row.id; $('orderOffer').append(option);
      }
    }
  }
  function quote(route) {
    const selected = offer(); if (!selected) throw new Error('Save a compatible, available vendor offer first.');
    return fulfilmentQuote({ unitCost: String(selected.unit_price), quantity: Number($('orderQty').value), marginMode: $('orderMarginMode').value, marginValue: $('orderMargin').value,
      vendorTaxTreatment: selected.gst_treatment, fitting: $('orderFitting').value, fulfilment: route, budget: $('orderBudget').value });
  }
  function renderOrders() {
    $('orderList').replaceChildren(); $('notificationList').replaceChildren();
    if (!orders.length) $('orderList').textContent = 'No orders yet.';
    for (const order of orders) {
      const customer = enquiries.find(row => row.id === order.enquiry_id);
      const card = document.createElement('article'); card.className = 'record';
      card.id = `order-${order.id}`;
      card.append(node('h3', `${customer?.customer_name || order.reference} · ${order.quote_status === 'pending' ? 'Awaiting quotation approval' : order.status.replaceAll('_', ' ')}`),
        node('p', `${order.description} · ${order.quality} · ${order.fulfilment === 'delivery' ? `Delivery via ${order.carrier}` : 'Fitting at CCTech store'}`),
        node('p', `Total ${inr(order.total_paise)} · Payment required ${inr(order.advance_paise)} · Verified received ${inr(order.received_paise)} · Remaining ${inr(Number(order.total_paise) - Number(order.received_paise))}`));
      if (order.quote_status === 'pending') {
        const revision = document.createElement('form');
        const typeLabel = node('label', 'Margin type'); const typeSelect = document.createElement('select');
        for (const [value,label] of [['percentage','Percentage'],['fixed','Fixed rupees per unit']]) { const option = node('option',label); option.value=value; typeSelect.append(option); }
        typeSelect.value=order.margin_type; typeLabel.append(typeSelect);
        const value=field('Margin value','number'); value.input.min='0'; value.input.step='0.01'; value.input.required=true; value.input.value=order.margin_value;
        const fitting=field('Total fitting charge for multiple items (₹)','number'); fitting.input.min='0'; fitting.input.step='0.01'; fitting.input.value=Number(order.fitting_paise)/100;
        const revise=node('button','Update pending quotation'); revision.append(typeLabel,value.el);
        if(order.fulfilment==='store_fitting'&&order.quantity>1)revision.append(fitting.el);
        revision.append(revise); revision.addEventListener('submit',event=>{event.preventDefault();run(revise,async()=>{
          await getClient().workflowAction('revise_sales_order',{p_order_id:order.id,p_margin_type:typeSelect.value,p_margin_value:Number(value.input.value),p_fitting:order.fulfilment==='store_fitting'?rupeesToPaise(fitting.input.value):null});
          await reload();notify('Quotation updated. Review its new total before approving.');
        });}); card.append(revision);
        const allow = field('Team accepts a price beyond budget + 5%', 'checkbox');
        if (order.exceeds_budget_limit) card.append(allow.el);
        const approve = node('button', 'Approve quotation and queue customer message');
        approve.addEventListener('click', () => run(approve, async () => {
          await getClient().workflowAction('approve_sales_order', { p_order_id: order.id, p_allow_over_budget: allow.input.checked, p_expected_revision: order.quote_revision });
          await reload(); notify('Quotation approved. Customer message queued once; channel activation is still required.');
        })); card.append(approve);
      }
      if (order.quote_status === 'approved' && Number(order.received_paise) < Number(order.total_paise) && getClient().session?.profile?.role === 'owner') {
        const form = document.createElement('form'); const amount = field('Payment received (₹)', 'number');
        amount.input.min = '0.01'; amount.input.step = '0.01'; amount.input.required = true;
        const reference = field('UPI / bank / cash receipt reference'); reference.input.required = true;
        const checked = field('I checked this payment in my bank, UPI app or cash record', 'checkbox'); checked.input.required = true;
        const save = node('button', 'Record verified payment'); form.append(amount.el, reference.el, checked.el, save);
        form.addEventListener('submit', event => { event.preventDefault(); run(save, async () => {
          if (!checked.input.checked) throw new Error('Verify receipt before recording payment.');
          await getClient().workflowAction('record_order_payment', { p_order_id: order.id, p_amount: rupeesToPaise(amount.input.value), p_reference: reference.input.value.trim() });
          await reload(); notify('Verified payment recorded.');
        }); }); card.append(form);
      }
      let next;
      if (order.status === 'confirmed') next = ['in_progress', 'Start procurement / fitting'];
      if (order.status === 'in_progress') next = order.fulfilment === 'delivery' ? ['dispatched', 'Confirm dispatched'] : ['completed', 'Confirm fitting completed and handed over'];
      if (order.status === 'dispatched') next = ['completed', 'Confirm successful delivery'];
      if (next) {
        const button = node('button', next[1]); button.addEventListener('click', () => run(button, async () => {
          await getClient().workflowAction('advance_order', { p_order_id: order.id, p_status: next[0] }); await reload(); notify('Order status updated.');
        })); card.append(button);
      }
      if (order.status === 'completed' && !notifications.some(row => row.order_id === order.id && row.kind === 'review_request')) {
        const button = node('button', 'Prepare review request'); button.addEventListener('click', () => run(button, async () => {
          await getClient().workflowAction('queue_order_review', { p_order_id: order.id }); await reload(); notify('Review request queued; social messaging is not connected yet.');
        })); card.append(button);
      }
      $('orderList').append(card);
    }
    for (const notice of notifications) {
      const card = document.createElement('article'); card.className = 'record';
      card.append(node('h3', `${notice.kind.replaceAll('_', ' ')} · ${notice.channel} · ${notice.status}`), node('p', notice.message));
      $('notificationList').append(card);
    }
    const target = new URLSearchParams(location.search).get('order');
    if (target && /^[a-f0-9-]{36}$/i.test(target)) document.getElementById(`order-${target}`)?.scrollIntoView({ block: 'center' });
  }
  function renderConnections(channels, alerts, outbox, isOwner) {
    $('teamAlerts').replaceChildren(); $('channelConnections').replaceChildren(); $('channelQueue').replaceChildren();
    for (const alert of alerts) {
      const card = document.createElement('article'); card.className = 'record';
      card.append(node('h3', `${alert.phone} · ${alert.channel} · ${alert.status}`), node('p', alert.message)); $('teamAlerts').append(card);
    }
    for (const channel of channels) {
      const card = document.createElement('article'); card.className = 'record';
      card.append(node('h3', channel.display_name), node('p', channel.connected_at ? (channel.enabled ? 'Connected and enabled' : 'Connected, sending disabled') : 'Not verified / not connected'));
      const form = document.createElement('form'); const id = field('Meta account ID (digits only)'); id.input.value = channel.business_account_id || '';
      id.input.disabled = !isOwner; id.input.required = true; id.input.pattern = '[0-9]+';
      const save = node('button', 'Save account ID; keep sending disabled'); save.disabled = !isOwner;
      form.append(id.el, save); card.append(form); form.addEventListener('submit', event => { event.preventDefault(); run(save, async () => {
        await getClient().saveChannelId(channel.channel, id.input.value.trim()); await reload(); notify('Account ID saved. Meta authorisation and server credentials are still required.');
      }); }); $('channelConnections').append(card);
      if (isOwner && channel.connected_at && !channel.enabled) {
        const enable=node('button','Enable verified channel'); enable.addEventListener('click',()=>run(enable,async()=>{
          await getClient().enableVerifiedChannel(channel.channel);await reload();notify('Verified channel enabled. Server activation still controls actual sending.');
        }));card.append(enable);
      }
    }
    for (const notice of outbox) {
      const card = document.createElement('article'); card.className = 'record';
      card.append(node('h3', `${notice.channel} · ${notice.status}`), node('p', notice.message));
      if (notice.blocked_reason) card.append(node('small', notice.blocked_reason)); $('channelQueue').append(card);
    }
  }
  $('orderEnquiry').addEventListener('change', () => run($('offerForm').querySelector('button'), loadEnquiry));
  $('offerForm').addEventListener('submit', event => {
    event.preventDefault(); const button = event.currentTarget.querySelector('button');
    run(button, async () => {
      const request = $('replyRequest').selectedOptions[0]; if (!request) throw new Error('Select an enquiry with a vendor request first.');
      await getClient().create('supplier_offers', { supplier_request_id: request.value, supplier_id: request.dataset.supplier,
        item_description: $('replyItem').value.trim(), quantity: Number($('replyQty').value), unit_price: rupeesToPaise($('replyPrice').value)/100,
        part_quality: $('replyQuality').value || null, compatibility_confirmed: $('replyFit').checked,
        stock_status: $('replyStock').checked ? 'in_stock' : 'unconfirmed', gst_treatment: $('replyTax').value, warranty: $('replyWarranty').value.trim(),
        raw_reply: $('replyOriginal').value, offer_valid_until: $('replyExpiry').value || null });
      $('offerForm').reset(); await loadEnquiry(); notify('Vendor offer saved.');
    });
  });
  $('previewChoice').addEventListener('click', () => run($('previewChoice'), async () => {
    const selected = offer();
    $('choicePreview').value = choiceMessage({ description: selected?.item_description, quality: selected?.part_quality, carrier: $('orderCarrier').value,
      deliveryQuote: quote('delivery'), storeQuote: quote('store_fitting') });
    notify('Delivery and store-fitting prices prepared for customer choice.');
  }));
  $('orderForm').addEventListener('submit', event => {
    event.preventDefault(); const button = event.currentTarget.querySelector('button[type="submit"]');
    run(button, async () => {
      if (!available || !enquiry() || !offer()) throw new Error('Select a saved enquiry and a confirmed vendor offer.');
      if (!$('customerChoiceConfirmed').checked) throw new Error('Record the customer’s choice before asking for advance.');
      const route = $('orderRoute').value; const expected = quote(route);
      const result = await getClient().workflowAction('prepare_sales_order', { p_enquiry_id: enquiry().id, p_offer_id: offer().id,
        p_quantity: Number($('orderQty').value), p_fulfilment: route, p_margin_type: $('orderMarginMode').value, p_margin_value: Number($('orderMargin').value),
        p_fitting: route === 'store_fitting' ? (Number($('orderQty').value) === 1 ? 60000 : rupeesToPaise($('orderFitting').value)) : null,
        p_budget: $('orderBudget').value ? rupeesToPaise($('orderBudget').value) : null,
        p_carrier: $('orderCarrier').value, p_address: $('orderAddress').value });
      if (Number(result.total_paise) !== expected.totalPaise) throw new Error('Order saved with a changed vendor price. Review the saved order before proceeding.');
      $('orderSummary').textContent = `Order saved. Total ${inr(result.total_paise)}; advance ${inr(result.advance_paise)}. Waiting for owner or staff approval. No customer message sent.`;
      $('customerChoiceConfirmed').checked = false; await reload(); notify('Quotation saved for approval. No customer message is queued before approval.');
    });
  });
  $('workflowSettingsForm').addEventListener('submit', event => {
    event.preventDefault(); const button = event.currentTarget.querySelector('button');
    run(button, async () => {
      const link = $('reviewUrl').value.trim(); if (link && new URL(link).protocol !== 'https:') throw new Error('Use an HTTPS business review link.');
      const publicUrl = $('publicWorkspaceUrl').value.trim();
      if (publicUrl && new URL(publicUrl).protocol !== 'https:') throw new Error('Use an HTTPS hosted workspace URL.');
      await getClient().saveWorkflowSettings({ review_url: link || null, payment_instructions: $('paymentInstructions').value.trim() || null, public_workspace_url: publicUrl || null, updated_at: new Date().toISOString() });
      notify('Review link and payment instructions saved.');
    });
  });
  return { refresh, reset };
}
