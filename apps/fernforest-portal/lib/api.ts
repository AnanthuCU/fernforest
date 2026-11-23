import type { NewLead, NewOrder } from "@fernforest/shared-types";

// Calls this app's own API routes (app/api/*), so no base URL is needed.
async function postJson(url: string, body: unknown) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

  let response: Response;
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error('Connection timed out. Please check your network and try again.');
    }
    throw new Error('Unable to reach the server. Please check your connection and try again.');
  } finally {
    clearTimeout(timeoutId);
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data.message || `Server responded with status ${response.status}`
    );
  }

  return data;
}

export async function submitLead(payload: NewLead) {
  return postJson('/api/leads', payload);
}

export async function submitOrder(payload: NewOrder) {
  return postJson('/api/orders', payload);
}

