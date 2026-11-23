const { createOrder, getOrders } = require('../services/orderService');

/**
 * POST /api/orders — Submit a new order.
 */
async function submitOrder(req, res, next) {
  const { name, phone, address, notes, items = [], total = 0 } = req.body;

  if (!name || !phone || !address) {
    return res.status(400).json({
      success: false,
      message: 'Name, phone, and address are required',
    });
  }

  try {
    const order = await createOrder({ name, phone, address, notes, items, total });
    return res.status(201).json({ success: true, order });
  } catch (error) {
    console.error('Error saving order:', error);
    return res.status(500).json({
      success: false,
      message: 'We could not save your order right now. Please try again.',
    });
  }
}

/**
 * GET /api/admin/orders — List all orders with items.
 */
async function getAdminOrders(req, res, next) {
  try {
    const orders = await getOrders();
    return res.json({ success: true, orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve orders',
    });
  }
}

module.exports = {
  submitOrder,
  getAdminOrders,
};
