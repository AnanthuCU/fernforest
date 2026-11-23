const { createPool } = require('./db');

async function migrate() {
  // Schema changes use the direct (unpooled) connection; fall back to the pooled one.
  const pool = createPool(process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL);
  console.log('Running database migrations...');
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Leads table
    await client.query(`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        phone TEXT,
        email TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    // Orders table
    await client.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        address TEXT NOT NULL,
        notes TEXT,
        total NUMERIC(10,2) NOT NULL DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    // Order Items table
    await client.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id SERIAL PRIMARY KEY,
        order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
        product_id TEXT NOT NULL,
        name TEXT NOT NULL,
        price NUMERIC(10,2) NOT NULL,
        quantity INTEGER NOT NULL DEFAULT 1,
        size TEXT
      );
    `);

    await client.query('COMMIT');
    console.log('Database migrations completed successfully!');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

if (require.main === module) {
  migrate();
}

module.exports = migrate;
