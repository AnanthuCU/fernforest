const express = require('express');
const pool = require('../db');
const router = express.Router();

// POST /api/leads - Create lead
router.post('/leads', async (req, res) => {
  const { name, phone, email } = req.body;

  if (!name || (!phone && !email)) {
    return res.status(400).json({
      success: false,
      message: 'Name and phone or email are required',
    });
  }

  try {
    const result = await pool.query(
      `INSERT INTO leads (name, phone, email) VALUES ($1, $2, $3) RETURNING id, name, phone, email, created_at AS "createdAt"`,
      [name.trim(), phone ? phone.trim() : null, email ? email.trim() : null]
    );

    return res.status(201).json({
      success: true,
      lead: result.rows[0],
    });
  } catch (error) {
    console.error('Error saving lead:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to save lead right now',
      error: error.message,
    });
  }
});

// GET /api/admin/leads - List all leads
router.get('/admin/leads', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, phone, email, created_at AS "createdAt" FROM leads ORDER BY created_at DESC`
    );

    return res.json({
      success: true,
      leads: result.rows,
    });
  } catch (error) {
    console.error('Error fetching leads:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve leads',
    });
  }
});

module.exports = router;
