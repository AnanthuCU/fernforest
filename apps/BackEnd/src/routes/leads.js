const express = require('express');
const { createLead, getAdminLeads } = require('../controllers/leadController');
const requireAdmin = require('../middleware/requireAdmin');

const router = express.Router();

// POST /api/leads - Create lead
router.post('/leads', createLead);

// GET /api/admin/leads - List all leads
router.get('/admin/leads', requireAdmin, getAdminLeads);

module.exports = router;
