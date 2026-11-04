export function normalizePhone(value) {
  if (!value?.trim()) return null;
  if (!/^\+?[\d\s()-]+$/.test(value.trim())) throw new Error('Enter a WhatsApp number with country code, for example 919876543210.');
  const number = value.replace(/[+\s()-]/g, '');
  if (!/^[1-9]\d{7,14}$/.test(number)) throw new Error('Enter a WhatsApp number with country code, for example 919876543210.');
  return number;
}
export function matchSuppliers(enquiry, suppliers) {
  return suppliers.filter(supplier => {
    if (!supplier.active || !supplier.categories?.includes(enquiry.category)) return false;
    if (['parts_only', 'complete_equipment'].includes(enquiry.pricing_mode)) return supplier.partner_type !== 'service_partner';
    if (enquiry.pricing_mode === 'amc_on_call') return supplier.partner_type !== 'product_vendor';
    return true;
  });
}
export function buildRfqMessage(enquiry, supplier, requirement) {
  if (!requirement?.trim() || requirement.length > 2000) throw new Error('Enter supplier-facing specifications (up to 2,000 characters).');
  const isPart = enquiry.category === 'Laptop / desktop / parts' && ['parts_only', 'parts_plus_replacement'].includes(enquiry.pricing_mode);
  return `This is Chandrashekar from CCTech IT Solutions.\n\n${requirement.trim()}\n\n${isPart ? 'Which type is available: OEM Original, Second Copy or Compatible?\n' : ''}Please tell me the price.`;
}

export const CUSTOMER_PART_MESSAGE = `This is Chandrashekar from CCTech IT Solutions.

Please send these details:
1. Part needed: display, keyboard, panel, hinges, RAM, SSD, etc.
2. Laptop brand and full model (example: HP ProBook 440 G3).
3. A photo of the model label or old part, if possible.
4. Do you need only the part, or replacement also?`;

// Old unsent drafts use the same short presentation as new requests. Their
// stored original text is retained; already-sent requests are never reformatted.
export function draftMessage(request, enquiry, supplier) {
  const original = request.request_message;
  if (request.status !== 'draft' || !original.startsWith('CCTech IT Solutions — Request for quotation\nReference: ')) return original;
  const start = original.indexOf('\n\n');
  const end = original.lastIndexOf('\n\nQuote ');
  if (start < 0 || end <= start) return original;
  return buildRfqMessage(enquiry, supplier, original.slice(start + 2, end));
}
export function whatsappUrl(number, message) {
  const phone = normalizePhone(number);
  if (!phone) throw new Error('Add the supplier’s WhatsApp number first.');
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
