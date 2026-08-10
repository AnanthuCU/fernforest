const express = require('express');
const pool = require('../db');
const router = express.Router();

router.get('/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({
      status: 'ok',
      message: 'Fernforest backend is running',
      dbTime: result.rows[0].now,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Backend running, DB connection error',
      error: error.message,
    });
  }
});

module.exports = router;
