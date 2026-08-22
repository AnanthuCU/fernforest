const pool = require('../utils/db');

/**
 * Create an order with its items inside a DB transaction.
 * @param {{ name: string, phone: string, address: string, notes?: string, items?: Array, total?: number }} orderData
 * @returns {Promise<Object>} The saved order with items.
 */
async function createOrder({ name, phone, address, notes, items = [], total = 0 }) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const orderResult = await client.query(
      `INSERT INTO orders (name, phone, address, notes, total)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, name, phone, address, notes, total, created_at AS "createdAt"`,
      [name.trim(), phone.trim(), address.trim(), notes ? notes.trim() : null, total]
    );

    const order = orderResult.rows[0];

    const insertedItems = [];
    for (const item of items) {
      const itemResult = await client.query(
        `INSERT INTO order_items (order_id, product_id, name, price, quantity, size)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id, product_id AS "productId", name, price, quantity, size`,
        [
          order.id,
          item.productId || item.id || 'unknown',
          item.name || 'Microgreen Item',
          item.price || 0,
          item.quantity || 1,
          item.size || null,
        ]
      );
      insertedItems.push(itemResult.rows[0]);
    }

    await client.query('COMMIT');

    return { ...order, items: insertedItems };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

/**
 * Retrieve all orders with their line items, most recent first.
 * @returns {Promise<Object[]>}
 */
async function getOrders() {
  const ordersResult = await pool.query(
    `SELECT id, name, phone, address, notes, total, created_at AS "createdAt"
     FROM orders
     ORDER BY created_at DESC`
  );

  const orders = ordersResult.rows;

  if (orders.length > 0) {
    const orderIds = orders.map((o) => o.id);
    const itemsResult = await pool.query(
      `SELECT id, order_id AS "orderId", product_id AS "productId", name, price, quantity, size
       FROM order_items
       WHERE order_id = ANY($1::int[])`,
      [orderIds]
    );

    const itemsByOrder = {};
    for (const item of itemsResult.rows) {
      if (!itemsByOrder[item.orderId]) {
        itemsByOrder[item.orderId] = [];
      }
      itemsByOrder[item.orderId].push(item);
    }

    for (const order of orders) {
      order.items = itemsByOrder[order.id] || [];
    }
  }

  return orders;
}

module.exports = {
  createOrder,
  getOrders,
};
