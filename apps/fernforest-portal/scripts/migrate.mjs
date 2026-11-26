// Creates the database tables. Run with: npm run migrate (from the repo root).
// Schema changes use the direct (unpooled) Neon connection; fall back to the pooled one.
import pg from "pg";

const connectionString = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;
if (!connectionString) {
  console.error("DATABASE_URL_UNPOOLED or DATABASE_URL must be set");
  process.exit(1);
}

const client = new pg.Client({ connectionString });

try {
  console.log("Running database migrations...");
  await client.connect();
  await client.query("BEGIN");

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

  // Customer login (Better Auth). Table and column names are Better Auth's
  // defaults, so they are quoted camelCase; "phone" is our additional field.
  await client.query(`
    CREATE TABLE IF NOT EXISTS "user" (
      "id" TEXT PRIMARY KEY,
      "name" TEXT NOT NULL,
      "email" TEXT NOT NULL UNIQUE,
      "emailVerified" BOOLEAN NOT NULL DEFAULT FALSE,
      "image" TEXT,
      "phone" TEXT,
      "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await client.query(`
    CREATE TABLE IF NOT EXISTS "session" (
      "id" TEXT PRIMARY KEY,
      "expiresAt" TIMESTAMPTZ NOT NULL,
      "token" TEXT NOT NULL UNIQUE,
      "ipAddress" TEXT,
      "userAgent" TEXT,
      "userId" TEXT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
      "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE INDEX IF NOT EXISTS session_user_id_idx ON "session"("userId");
  `);

  await client.query(`
    CREATE TABLE IF NOT EXISTS "account" (
      "id" TEXT PRIMARY KEY,
      "accountId" TEXT NOT NULL,
      "providerId" TEXT NOT NULL,
      "userId" TEXT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
      "accessToken" TEXT,
      "refreshToken" TEXT,
      "idToken" TEXT,
      "accessTokenExpiresAt" TIMESTAMPTZ,
      "refreshTokenExpiresAt" TIMESTAMPTZ,
      "scope" TEXT,
      "password" TEXT,
      "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE INDEX IF NOT EXISTS account_user_id_idx ON "account"("userId");
  `);

  await client.query(`
    CREATE TABLE IF NOT EXISTS "verification" (
      "id" TEXT PRIMARY KEY,
      "identifier" TEXT NOT NULL,
      "value" TEXT NOT NULL,
      "expiresAt" TIMESTAMPTZ NOT NULL,
      "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE INDEX IF NOT EXISTS verification_identifier_idx ON "verification"("identifier");
  `);

  // Saved delivery addresses for signed-in customers
  await client.query(`
    CREATE TABLE IF NOT EXISTS customer_addresses (
      id SERIAL PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
      label TEXT NOT NULL DEFAULT 'Home',
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      address TEXT NOT NULL,
      is_default BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
    CREATE INDEX IF NOT EXISTS customer_addresses_user_id_idx ON customer_addresses(user_id);
    CREATE UNIQUE INDEX IF NOT EXISTS customer_addresses_one_default_idx
      ON customer_addresses(user_id) WHERE is_default;
  `);

  // Orders placed while signed in belong to that customer; guest orders stay NULL.
  await client.query(`
    ALTER TABLE orders ADD COLUMN IF NOT EXISTS user_id TEXT REFERENCES "user"("id") ON DELETE SET NULL;
    CREATE INDEX IF NOT EXISTS orders_user_id_idx ON orders(user_id);
  `);

  await client.query("COMMIT");
  console.log("Database migrations completed successfully!");
} catch (error) {
  await client.query("ROLLBACK").catch(() => {});
  console.error("Migration failed:", error);
  process.exitCode = 1;
} finally {
  await client.end();
}
