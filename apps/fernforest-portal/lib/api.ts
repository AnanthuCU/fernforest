const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

async function postJson(path: string, body: unknown) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
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

export async function submitLead(payload: Record<string, unknown>) {
  return postJson('/api/leads', payload);
}

export async function submitOrder(payload: Record<string, unknown>) {
  return postJson('/api/orders', payload);
}
