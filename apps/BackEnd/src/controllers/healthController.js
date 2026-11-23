const { checkHealth } = require('../services/healthService');

/**
 * GET /api/health
 */
async function getHealth(req, res, next) {
  try {
    const { dbTime } = await checkHealth();
    res.json({
      status: 'ok',
      message: 'Fernforest backend is running',
      dbTime,
    });
  } catch (error) {
    console.error('Health check DB error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Backend running, DB connection error',
    });
  }
}

module.exports = {
  getHealth,
};
