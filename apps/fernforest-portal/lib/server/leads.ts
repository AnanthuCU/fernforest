import type { Lead, NewLead } from "@fernforest/shared-types";
import { getPool } from "./db";

/**
 * Persist a new lead in the database.
 */
export async function saveLead({ name, phone, email }: NewLead): Promise<Lead> {
  const result = await getPool().query(
    `INSERT INTO leads (name, phone, email) VALUES ($1, $2, $3) RETURNING id, name, phone, email, created_at AS "createdAt"`,
    [name.trim(), phone ? phone.trim() : null, email ? email.trim() : null]
  );
  return result.rows[0];
}

/**
 * Retrieve all leads ordered by most recent first.
 */
export async function getLeads(): Promise<Lead[]> {
  const result = await getPool().query(
    `SELECT id, name, phone, email, created_at AS "createdAt" FROM leads ORDER BY created_at DESC`
  );
  return result.rows;
}
