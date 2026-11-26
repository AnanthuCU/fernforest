import { deleteAddress, updateAddress } from "@/lib/server/account";
import { jsonError, parseAddress, readJson, requireUser } from "@/lib/server/accountInput";

type Context = { params: { id: string } };

function parseId(raw: string): number | null {
  const id = Number(raw);
  return Number.isInteger(id) && id > 0 ? id : null;
}

// PATCH /api/account/addresses/:id — edit an address or make it the default.
export async function PATCH(request: Request, { params }: Context) {
  const user = await requireUser(request);
  if (user instanceof Response) return user;

  const id = parseId(params.id);
  if (!id) return jsonError("Address not found", 404);

  const parsed = parseAddress(await readJson(request), true);
  if (!parsed.ok) return jsonError(parsed.message, 400);

  try {
    const address = await updateAddress(user.id, id, parsed.value);
    if (!address) return jsonError("Address not found", 404);
    return Response.json({ success: true, address });
  } catch (error) {
    console.error("Error updating address:", error);
    return jsonError("We could not update this address right now.", 500);
  }
}

// DELETE /api/account/addresses/:id
export async function DELETE(request: Request, { params }: Context) {
  const user = await requireUser(request);
  if (user instanceof Response) return user;

  const id = parseId(params.id);
  if (!id) return jsonError("Address not found", 404);

  try {
    const deleted = await deleteAddress(user.id, id);
    if (!deleted) return jsonError("Address not found", 404);
    return Response.json({ success: true });
  } catch (error) {
    console.error("Error deleting address:", error);
    return jsonError("We could not delete this address right now.", 500);
  }
}
