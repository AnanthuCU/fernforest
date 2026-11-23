import { getLeads } from "@/lib/server/leads";
import { getOrders } from "@/lib/server/orders";

// GET /api/admin/leads and /api/admin/orders. Access is gated by middleware.ts.
export async function GET(_request: Request, { params }: { params: { resource: string } }) {
  try {
    if (params.resource === "leads") {
      return Response.json({ success: true, leads: await getLeads() });
    }
    if (params.resource === "orders") {
      return Response.json({ success: true, orders: await getOrders() });
    }
    return Response.json({ success: false, message: "Not found" }, { status: 404 });
  } catch (error) {
    console.error(`Error fetching ${params.resource}:`, error);
    return Response.json(
      { success: false, message: `Failed to retrieve ${params.resource}` },
      { status: 500 }
    );
  }
}
