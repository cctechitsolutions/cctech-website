import { sourcingConfig } from './sourcing-config.mjs';
const button = document.getElementById('completeOrder');
const result = document.getElementById('completionResult');
const token = new URLSearchParams(location.hash.slice(1)).get('token');
if (!token || token.length !== 72) { button.disabled = true; result.textContent = 'Open the completion link sent with your CCTech order.'; }
button.addEventListener('click', async () => {
  button.disabled = true;
  try {
    const response = await fetch(`${sourcingConfig.url}/rest/v1/rpc/complete_customer_order`, { method: 'POST',
      headers: { apikey: sourcingConfig.key, 'Content-Type': 'application/json' }, body: JSON.stringify({ p_token: token }),
      redirect: 'error', credentials: 'omit', cache: 'no-store' });
    if (!response.ok) throw new Error('Completion could not be confirmed. The link may be expired or the order may not be ready. Please contact CCTech.');
    const order = await response.json();
    result.textContent = `Thank you. Order ${order.reference} is completed.`;
    history.replaceState(null, '', location.pathname);
  } catch (error) { result.textContent = error instanceof TypeError ? 'Connection failed. Please try again.' : error.message; button.disabled = false; }
});
