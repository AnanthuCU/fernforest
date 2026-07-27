import { db } from "../../db";
import { orders, orderItems } from "../../db/schema/order.schema";
import { eq, desc, inArray } from "drizzle-orm";

export interface OrderItemInput {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
}

export interface CreateOrderInput {
  name: string;
  phone: string;
  address: string;
  notes?: string;
  total: number;
  items: OrderItemInput[];
}

export const createOrder = async (payload: CreateOrderInput) => {
  const [order] = await db
    .insert(orders)
    .values({
      name: payload.name,
      phone: payload.phone,
      address: payload.address,
      notes: payload.notes,
      total: payload.total,
    })
    .returning();

  if (payload.items.length > 0) {
    await db.insert(orderItems).values(
      payload.items.map((item) => ({
        orderId: order.id,
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
      }))
    );
  }

  return order;
};

export const getAllOrders = async () => {
  const allOrders = await db
    .select()
    .from(orders)
    .orderBy(desc(orders.createdAt));

  if (allOrders.length === 0) return [];

  const orderIds = allOrders.map((o) => o.id);
  const allItems = await db
    .select()
    .from(orderItems)
    .where(inArray(orderItems.orderId, orderIds));

  const itemsByOrderId = new Map<number, typeof allItems>();
  for (const item of allItems) {
    const existing = itemsByOrderId.get(item.orderId) || [];
    existing.push(item);
    itemsByOrderId.set(item.orderId, existing);
  }

  return allOrders.map((order) => ({
    ...order,
    items: itemsByOrderId.get(order.id) || [],
  }));
};

export const getOrderById = async (id: number) => {
  const [order] = await db
    .select()
    .from(orders)
    .where(eq(orders.id, id));

  if (!order) return null;

  const items = await db
    .select()
    .from(orderItems)
    .where(eq(orderItems.orderId, id));

  return { ...order, items };
};

