const express = require('express');
const { submitOrder, getAdminOrders } = require('../controllers/orderController');
const requireAdmin = require('../middleware/requireAdmin');

const router = express.Router();

// POST /api/orders - Submit order
router.post('/orders', submitOrder);

// GET /api/admin/orders - List all orders
router.get('/admin/orders', requireAdmin, getAdminOrders);

module.exports = router;
