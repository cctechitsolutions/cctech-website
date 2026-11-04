import { fulfilmentQuote, inr } from './sourcing-orders-model.mjs';
export const PARTS_PRICING = Object.freeze({ defaultMarginPercent: 15, gstPercent: 18, deliveryAdvancePercent: 100, storeAdvancePercent: 50, singleItemFittingPaise: 60000, roundingPaise: 10000 });
export function calculatePartsQuote({ items, pricingMode, vendorTaxTreatment, marginMode = 'percentage', marginValue = '15', replacementChargePaise, budget = '' }) {
  if (!['parts_only','parts_plus_replacement'].includes(pricingMode) || !Array.isArray(items) || items.length !== 1) throw new Error('Use one confirmed offer per quotation; multiple distinct items need team review.');
  const item = items[0];
  if (!Number.isSafeInteger(item.unitCostPaise) || item.unitCostPaise < 0 || item.compatibilityConfirmed !== true || item.available !== true || !['OEM Original','Second Copy','Compatible'].includes(item.quality)) throw new Error('Confirm the part price, fit, stock and type.');
  return fulfilmentQuote({ unitCost: (item.unitCostPaise / 100).toFixed(2), quantity: item.quantity, vendorTaxTreatment, marginMode, marginValue,
    fulfilment: pricingMode === 'parts_only' ? 'delivery' : 'store_fitting', fitting: replacementChargePaise === undefined ? '' : (replacementChargePaise / 100).toFixed(2), budget });
}
export function customerPriceMessage(quote) {
  if (quote.advancePaise + quote.balancePaise !== quote.totalPaise) throw new Error('Invalid quotation totals.');
  return `Your total including 18% GST and rounding is ${inr(quote.totalPaise)}.\nPayment required: ${inr(quote.advancePaise)} (${quote.advancePercent}%).\nBalance: ${inr(quote.balancePaise)}.\n${quote.advancePercent === 100 ? 'Pay your courier directly for delivery.' : 'Pay the balance at the CCTech store.'}`;
}
