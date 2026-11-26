import type { OrderRequest } from "@fernforest/shared-types";
import { createOrder } from "@/lib/server/orders";
import { getCurrentUser } from "@/lib/server/auth";
import { saveAddressIfNew, setPhoneIfMissing } from "@/lib/server/account";
import { isValidIndianMobile, normalizePhone } from "@/lib/validation";

// POST /api/orders — Submit a new order. Guests can order; a signed-in
// customer's order is linked to their account.
export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as Partial<OrderRequest>;
  const { name, phone, address, notes, items = [], total = 0, saveAddress = false } = body;

  if (!name || !phone || !address) {
    return Response.json(
      { success: false, message: "Name, phone, and address are required" },
      { status: 400 }
    );
  }

  // A session lookup failure must not block the order; save it as a guest order.
  const user = await getCurrentUser(request.headers).catch((error) => {
    console.error("Session lookup failed while placing order:", error);
    return null;
  });

  try {
    const order = await createOrder({ name, phone, address, notes, items, total }, user?.id ?? null);

    if (user) {
      // Remembering details is a convenience; a failure here doesn't fail the order.
      try {
        const cleanPhone = normalizePhone(phone);
        if (isValidIndianMobile(cleanPhone)) {
          await setPhoneIfMissing(user.id, cleanPhone);
          if (saveAddress) {
            await saveAddressIfNew(user.id, {
              label: "Home",
              name: name.trim(),
              phone: cleanPhone,
              address: address.trim(),
              isDefault: false,
            });
          }
        }
      } catch (error) {
        console.error("Order saved, but remembering customer details failed:", error);
      }
    }

    return Response.json({ success: true, order }, { status: 201 });
  } catch (error) {
    console.error("Error saving order:", error);
    return Response.json(
      { success: false, message: "We could not save your order right now. Please try again." },
      { status: 500 }
    );
  }
}
