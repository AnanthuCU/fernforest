const pool = require('../utils/db');

/**
 * Persist a new lead in the database.
 * @param {{ name: string, phone?: string, email?: string }} lead
 * @returns {Promise<Object>} The saved lead row.
 */
async function saveLead({ name, phone, email }) {
  const result = await pool.query(
    `INSERT INTO leads (name, phone, email) VALUES ($1, $2, $3) RETURNING id, name, phone, email, created_at AS "createdAt"`,
    [name.trim(), phone ? phone.trim() : null, email ? email.trim() : null]
  );
  return result.rows[0];
}

/**
 * Retrieve all leads ordered by most recent first.
 * @returns {Promise<Object[]>}
 */
async function getLeads() {
  const result = await pool.query(
    `SELECT id, name, phone, email, created_at AS "createdAt" FROM leads ORDER BY created_at DESC`
  );
  return result.rows;
}

module.exports = {
  saveLead,
  getLeads,
};
