import type {
  Address,
  CustomerProfile,
  NewAddress,
  NewLead,
  OrderRequest,
  ProfileUpdate,
} from "@fernforest/shared-types";

// Calls this app's own API routes (app/api/*), so no base URL is needed.
async function requestJson(method: string, url: string, body?: unknown) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

  let response: Response;
  try {
    response = await fetch(url, {
      method,
      headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
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
  return requestJson('POST', '/api/leads', payload);
}

export async function submitOrder(payload: OrderRequest) {
  return requestJson('POST', '/api/orders', payload);
}

// Signed-in customer account

export async function fetchProfile(): Promise<CustomerProfile> {
  return (await requestJson('GET', '/api/account/profile')).profile;
}

export async function saveProfile(update: ProfileUpdate): Promise<CustomerProfile> {
  return (await requestJson('PATCH', '/api/account/profile', update)).profile;
}

export async function fetchAddresses(): Promise<Address[]> {
  return (await requestJson('GET', '/api/account/addresses')).addresses;
}

export async function addAddress(address: NewAddress): Promise<Address> {
  return (await requestJson('POST', '/api/account/addresses', address)).address;
}

export async function editAddress(id: number, update: Partial<NewAddress>): Promise<Address> {
  return (await requestJson('PATCH', `/api/account/addresses/${id}`, update)).address;
}

export async function removeAddress(id: number): Promise<void> {
  await requestJson('DELETE', `/api/account/addresses/${id}`);
}
