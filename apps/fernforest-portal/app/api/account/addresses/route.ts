import { createAddress, listAddresses } from "@/lib/server/account";
import { jsonError, parseAddress, readJson, requireUser } from "@/lib/server/accountInput";

const MAX_ADDRESSES = 10;

// GET /api/account/addresses — the signed-in customer's saved addresses (default first).
export async function GET(request: Request) {
  const user = await requireUser(request);
  if (user instanceof Response) return user;

  try {
    return Response.json({ success: true, addresses: await listAddresses(user.id) });
  } catch (error) {
    console.error("Error loading addresses:", error);
    return jsonError("We could not load your addresses right now.", 500);
  }
}

// POST /api/account/addresses — save a new address.
export async function POST(request: Request) {
  const user = await requireUser(request);
  if (user instanceof Response) return user;

  const parsed = parseAddress(await readJson(request), false);
  if (!parsed.ok) return jsonError(parsed.message, 400);

  try {
    const existing = await listAddresses(user.id);
    if (existing.length >= MAX_ADDRESSES) {
      return jsonError(`You can save up to ${MAX_ADDRESSES} addresses.`, 400);
    }
    const address = await createAddress(user.id, parsed.value);
    return Response.json({ success: true, address }, { status: 201 });
  } catch (error) {
    console.error("Error saving address:", error);
    return jsonError("We could not save this address right now.", 500);
  }
}
