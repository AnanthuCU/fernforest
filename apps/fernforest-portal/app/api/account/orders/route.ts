import { getOrdersForUser } from "@/lib/server/orders";
import { jsonError, requireUser } from "@/lib/server/accountInput";

// GET /api/account/orders — orders placed while signed in to this account.
export async function GET(request: Request) {
  const user = await requireUser(request);
  if (user instanceof Response) return user;

  try {
    return Response.json({ success: true, orders: await getOrdersForUser(user.id) });
  } catch (error) {
    console.error("Error loading orders:", error);
    return jsonError("We could not load your orders right now.", 500);
  }
}
