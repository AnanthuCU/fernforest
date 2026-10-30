import type { NewLead, NewOrder } from "@fernforest/shared-types";

const DEFAULT_API_BASE_URL = 'http://localhost:4000';

export function getApiBaseUrl() {
  return process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_BASE_URL;
}

async function postJson(path: string, body: unknown) {
  const url = `${getApiBaseUrl()}${path}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(
        data.message || `Server responded with status ${response.status}`
      );
    }

    return data;
  } catch (error: any) {
    if (error.name === 'AbortError') {
      throw new Error('Connection timed out. Please check your network and try again.');
    }
    if (error.message && !error.message.includes('fetch')) {
      throw error;
    }
    throw new Error('Unable to connect to backend server. Please make sure the server is running.');
  }
}

export async function submitLead(payload: NewLead) {
  return postJson('/api/leads', payload);
}

export async function submitOrder(payload: NewOrder) {
  return postJson('/api/orders', payload);
}

