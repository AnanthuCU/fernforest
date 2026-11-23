import type { NewOrder } from "@fernforest/shared-types";
import { createOrder } from "@/lib/server/orders";

// POST /api/orders — Submit a new order.
export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as Partial<NewOrder>;
  const { name, phone, address, notes, items = [], total = 0 } = body;

  if (!name || !phone || !address) {
    return Response.json(
      { success: false, message: "Name, phone, and address are required" },
      { status: 400 }
    );
  }

  try {
    const order = await createOrder({ name, phone, address, notes, items, total });
    return Response.json({ success: true, order }, { status: 201 });
  } catch (error) {
    console.error("Error saving order:", error);
    return Response.json(
      { success: false, message: "We could not save your order right now. Please try again." },
      { status: 500 }
    );
  }
}
