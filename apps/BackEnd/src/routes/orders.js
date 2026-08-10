const express = require('express');
const pool = require('../db');
const router = express.Router();

// POST /api/orders - Submit order
router.post('/orders', async (req, res) => {
  const { name, phone, address, notes, items = [], total = 0 } = req.body;

  if (!name || !phone || !address) {
    return res.status(400).json({
      success: false,
      message: 'Name, phone, and address are required',
    });
  }

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

    return res.status(201).json({
      success: true,
      order: {
        ...order,
        items: insertedItems,
      },
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error saving order:', error);
    return res.status(500).json({
      success: false,
      message: 'We could not save your order right now. Please try again.',
      error: error.message,
    });
  } finally {
    client.release();
  }
});

// GET /api/admin/orders - List all orders
router.get('/admin/orders', async (req, res) => {
  try {
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

    return res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve orders',
    });
  }
});

module.exports = router;
