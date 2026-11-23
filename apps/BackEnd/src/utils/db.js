const { Pool } = require('pg');
require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });

/**
 * Create a PostgreSQL pool. SSL settings come from the connection string
 * (Neon URLs include `sslmode=require`).
 * @param {string | undefined} connectionString
 */
function createPool(connectionString) {
  if (!connectionString) {
    throw new Error('DATABASE_URL is not set');
  }

  const pool = new Pool({
    connectionString,
    max: parseInt(process.env.DB_POOL_SIZE || '10', 10),
  });

  pool.on('error', (err) => {
    console.error('Unexpected error on idle PostgreSQL client', err);
  });

  return pool;
}

// App traffic uses Neon's pooled connection string.
const pool = createPool(process.env.DATABASE_URL);

module.exports = pool;
module.exports.createPool = createPool;
