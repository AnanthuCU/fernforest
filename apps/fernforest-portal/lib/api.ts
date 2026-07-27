const DEFAULT_API_BASE_URL = 'http://localhost:4000';

export function getApiBaseUrl() {
  return process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_BASE_URL;
}

async function postJson(path: string, body: unknown) {
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
}

async function getJson(path: string) {
  const response = await fetch(`${getApiBaseUrl()}${path}`);
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
}

export async function submitLead(payload: Record<string, unknown>) {
  return postJson('/api/leads', payload);
}

export async function submitOrder(payload: Record<string, unknown>) {
  return postJson('/api/orders', payload);
}

export async function getOrders() {
  return getJson('/api/orders');
}

