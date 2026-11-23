import { Pool } from "pg";
import { attachDatabasePool } from "@vercel/functions";

// One pool per server instance, reused across requests (and across hot reloads in dev).
// SSL settings come from the connection string (Neon URLs include sslmode).
const globalForDb = globalThis as unknown as { pgPool?: Pool };

function createPool() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }

  const pool = new Pool({ connectionString, max: 5 });
  pool.on("error", (err) => {
    console.error("Unexpected error on idle PostgreSQL client", err);
  });

  // Lets Vercel Fluid compute close idle connections before an instance is suspended.
  attachDatabasePool(pool);
  return pool;
}

export function getPool(): Pool {
  globalForDb.pgPool ??= createPool();
  return globalForDb.pgPool;
}
