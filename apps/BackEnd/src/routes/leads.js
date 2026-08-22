const express = require('express');
const { createLead, getAdminLeads } = require('../controllers/leadController');

const router = express.Router();

// POST /api/leads - Create lead
router.post('/leads', createLead);

// GET /api/admin/leads - List all leads
router.get('/admin/leads', getAdminLeads);

module.exports = router;
