const pool = require('../utils/db');

/**
 * Run a lightweight DB health-check query.
 * @returns {{ dbTime: string }}
 */
async function checkHealth() {
  const result = await pool.query('SELECT NOW()');
  return { dbTime: result.rows[0].now };
}

module.exports = {
  checkHealth,
};
