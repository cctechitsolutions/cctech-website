export function rupeesToPaise(value) {
  if (!/^\d+(?:\.\d{1,2})?$/.test(String(value))) throw new Error('Enter an amount with up to two decimal places.');
  const [whole, fraction = ''] = String(value).split('.');
  const result = Number(whole) * 100 + Number(fraction.padEnd(2, '0'));
  if (!Number.isSafeInteger(result)) throw new Error('Amount is too large.');
  return result;
}
export const inr = paise => (Number(paise) / 100).toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
export function fulfilmentQuote({ unitCost, quantity, marginMode = 'percentage', marginValue = '15', vendorTaxTreatment, fitting, fulfilment, budget = '' }) {
  if (!Number.isSafeInteger(quantity) || quantity < 1) throw new Error('Confirm quantity.');
  if (!['delivery', 'store_fitting'].includes(fulfilment)) throw new Error('Choose delivery or store fitting.');
  if (!['GST included', 'GST excluded'].includes(vendorTaxTreatment)) throw new Error('Confirm whether the vendor price includes 18% GST.');
  const rawCost = rupeesToPaise(unitCost);
  const netUnit = vendorTaxTreatment === 'GST included' ? Math.round(rawCost * 100 / 118) : rawCost;
  const vendorCostPaise = netUnit * quantity;
  const requestedMarginPaise = marginMode === 'percentage' ? Math.round(vendorCostPaise * rupeesToPaise(marginValue) / 10000) :
    marginMode === 'fixed' ? rupeesToPaise(marginValue) * quantity : NaN;
  if (!Number.isSafeInteger(requestedMarginPaise)) throw new Error('Choose a valid margin.');
  const fittingPaise = fulfilment === 'delivery' ? 0 : quantity === 1 ? 60000 : rupeesToPaise(fitting);
  const build = marginPaise => {
    const subtotalPaise = vendorCostPaise + marginPaise + fittingPaise;
    const taxPaise = Math.round(subtotalPaise * 18 / 100);
    const unrounded = subtotalPaise + taxPaise;
    const totalPaise = Math.ceil(unrounded / 10000) * 10000;
    if (!Number.isSafeInteger(totalPaise * 100) || totalPaise <= 0) throw new Error('Check quotation total.');
    const advancePaise = fulfilment === 'delivery' ? totalPaise : totalPaise / 2;
    return { vendorCostPaise, marginPaise, requestedMarginPaise, fittingPaise, deliveryPaise: 0, subtotalPaise, taxPaise,
      roundingPaise: totalPaise - unrounded, totalPaise, advancePaise, balancePaise: totalPaise - advancePaise,
      advancePercent: fulfilment === 'delivery' ? 100 : 50 };
  };
  let quote = build(requestedMarginPaise);
  const budgetPaise = budget === '' ? null : rupeesToPaise(budget);
  if (budgetPaise !== null && quote.totalPaise > budgetPaise) {
    // Reduce profit, never create a negative margin. Account for rounding before
    // deciding whether the result fits the budget or its permitted 5% extension.
    const floorQuote = build(0);
    const target = Math.floor((floorQuote.totalPaise <= budgetPaise ? budgetPaise : budgetPaise * 105 / 100) / 10000) * 10000;
    if (target >= floorQuote.totalPaise) {
      let low = 0, high = requestedMarginPaise;
      while (low < high) {
        const mid = Math.ceil((low + high) / 2);
        if (build(mid).totalPaise <= target) low = mid; else high = mid - 1;
      }
      quote = build(low);
    }
  }
  return { ...quote, marginReduced: quote.marginPaise < requestedMarginPaise, budgetPaise,
    exceedsBudgetLimit: budgetPaise !== null && quote.totalPaise > Math.floor(budgetPaise * 105 / 100), requiresApproval: true };
}
export function choiceMessage({ description, quality, deliveryQuote, storeQuote, carrier = 'Porter / Rapido' }) {
  if (!description || !quality) throw new Error('Confirm the item and type.');
  return `This is Chandrashekar from CCTech IT Solutions.\n\n${description}\nType: ${quality}\n\n1. Part delivery: ${inr(deliveryQuote.totalPaise)}. Pay 100% before dispatch; pay ${carrier} directly for delivery.\n2. Fitting at CCTech store: ${inr(storeQuote.totalPaise)}. Pay 50% advance and the balance at the store.\n\nPrices include 18% GST and rounding. Which option would you like?`;
}
