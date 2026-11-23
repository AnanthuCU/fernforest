import type { NewOrder, Order, OrderItem } from "@fernforest/shared-types";
import { getPool } from "./db";

/**
 * Create an order with its items inside a DB transaction.
 */
export async function createOrder({ name, phone, address, notes, items = [], total = 0 }: NewOrder): Promise<Order> {
  const client = await getPool().connect();

  try {
    await client.query("BEGIN");

    const orderResult = await client.query(
      `INSERT INTO orders (name, phone, address, notes, total)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, name, phone, address, notes, total, created_at AS "createdAt"`,
      [name.trim(), phone.trim(), address.trim(), notes ? notes.trim() : null, total]
    );

    const order = orderResult.rows[0];

    const insertedItems: OrderItem[] = [];
    for (const item of items) {
      const itemResult = await client.query(
        `INSERT INTO order_items (order_id, product_id, name, price, quantity, size)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id, product_id AS "productId", name, price, quantity, size`,
        [
          order.id,
          item.productId || "unknown",
          item.name || "Microgreen Item",
          item.price || 0,
          item.quantity || 1,
          item.size || null,
        ]
      );
      insertedItems.push(itemResult.rows[0]);
    }

    await client.query("COMMIT");

    return { ...order, items: insertedItems };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

/**
 * Retrieve all orders with their line items, most recent first.
 */
export async function getOrders(): Promise<Order[]> {
  const pool = getPool();
  const ordersResult = await pool.query(
    `SELECT id, name, phone, address, notes, total, created_at AS "createdAt"
     FROM orders
     ORDER BY created_at DESC`
  );

  const orders: Order[] = ordersResult.rows.map((order) => ({ ...order, items: [] }));
  if (orders.length === 0) {
    return orders;
  }

  const itemsResult = await pool.query(
    `SELECT id, order_id AS "orderId", product_id AS "productId", name, price, quantity, size
     FROM order_items
     WHERE order_id = ANY($1::int[])`,
    [orders.map((o) => o.id)]
  );

  const ordersById = new Map(orders.map((o) => [o.id, o]));
  for (const item of itemsResult.rows) {
    ordersById.get(item.orderId)?.items.push(item);
  }

  return orders;
}
