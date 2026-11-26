import type { Address, CustomerProfile, NewAddress, ProfileUpdate } from "@fernforest/shared-types";
import type { PoolClient } from "pg";
import { getPool } from "./db";

// Every query here is scoped by the signed-in user's id; callers pass the id
// from the session, never from the request body.

const ADDRESS_COLUMNS = `id, label, name, phone, address, is_default AS "isDefault", created_at AS "createdAt"`;

export async function getProfile(userId: string): Promise<CustomerProfile | null> {
  const result = await getPool().query(
    `SELECT id, name, email, image, phone FROM "user" WHERE id = $1`,
    [userId]
  );
  return result.rows[0] ?? null;
}

export async function updateProfile(userId: string, update: ProfileUpdate): Promise<CustomerProfile | null> {
  const result = await getPool().query(
    `UPDATE "user"
     SET name = COALESCE($2, name),
         phone = CASE WHEN $3::boolean THEN $4 ELSE phone END,
         "updatedAt" = NOW()
     WHERE id = $1
     RETURNING id, name, email, image, phone`,
    [userId, update.name ?? null, update.phone !== undefined, update.phone ?? null]
  );
  return result.rows[0] ?? null;
}

/** Fill in the profile phone from a checkout, only if the customer has none yet. */
export async function setPhoneIfMissing(userId: string, phone: string): Promise<void> {
  await getPool().query(
    `UPDATE "user" SET phone = $2, "updatedAt" = NOW() WHERE id = $1 AND (phone IS NULL OR phone = '')`,
    [userId, phone]
  );
}

export async function listAddresses(userId: string): Promise<Address[]> {
  const result = await getPool().query(
    `SELECT ${ADDRESS_COLUMNS} FROM customer_addresses
     WHERE user_id = $1
     ORDER BY is_default DESC, created_at DESC`,
    [userId]
  );
  return result.rows;
}

async function withTransaction<T>(fn: (client: PoolClient) => Promise<T>): Promise<T> {
  const client = await getPool().connect();
  try {
    await client.query("BEGIN");
    const value = await fn(client);
    await client.query("COMMIT");
    return value;
  } catch (error) {
    await client.query("ROLLBACK").catch(() => {});
    throw error;
  } finally {
    client.release();
  }
}

export async function createAddress(userId: string, input: Required<NewAddress>): Promise<Address> {
  return withTransaction(async (client) => {
    // The first saved address becomes the default.
    const existing = await client.query(
      `SELECT COUNT(*)::int AS count FROM customer_addresses WHERE user_id = $1`,
      [userId]
    );
    const makeDefault = input.isDefault || existing.rows[0].count === 0;

    if (makeDefault) {
      await client.query(`UPDATE customer_addresses SET is_default = FALSE WHERE user_id = $1`, [userId]);
    }

    const result = await client.query(
      `INSERT INTO customer_addresses (user_id, label, name, phone, address, is_default)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING ${ADDRESS_COLUMNS}`,
      [userId, input.label, input.name, input.phone, input.address, makeDefault]
    );
    return result.rows[0];
  });
}

/** Save a checkout address unless the customer already has the same one. */
export async function saveAddressIfNew(userId: string, input: Required<NewAddress>): Promise<void> {
  const duplicate = await getPool().query(
    `SELECT 1 FROM customer_addresses
     WHERE user_id = $1 AND name = $2 AND phone = $3 AND address = $4
     LIMIT 1`,
    [userId, input.name, input.phone, input.address]
  );
  if (duplicate.rowCount === 0) {
    await createAddress(userId, input);
  }
}

export async function updateAddress(
  userId: string,
  addressId: number,
  input: Partial<NewAddress>
): Promise<Address | null> {
  return withTransaction(async (client) => {
    if (input.isDefault) {
      await client.query(`UPDATE customer_addresses SET is_default = FALSE WHERE user_id = $1`, [userId]);
    }

    const result = await client.query(
      `UPDATE customer_addresses
       SET label = COALESCE($3, label),
           name = COALESCE($4, name),
           phone = COALESCE($5, phone),
           address = COALESCE($6, address),
           is_default = CASE WHEN $7::boolean THEN TRUE ELSE is_default END
       WHERE id = $1 AND user_id = $2
       RETURNING ${ADDRESS_COLUMNS}`,
      [
        addressId,
        userId,
        input.label ?? null,
        input.name ?? null,
        input.phone ?? null,
        input.address ?? null,
        input.isDefault === true,
      ]
    );
    // Nothing matched: roll back so another address doesn't lose its default.
    if (result.rowCount === 0) {
      throw new AddressNotFoundError();
    }
    return result.rows[0];
  }).catch((error) => {
    if (error instanceof AddressNotFoundError) return null;
    throw error;
  });
}

/** Returns false if the address doesn't exist or belongs to someone else. */
export async function deleteAddress(userId: string, addressId: number): Promise<boolean> {
  return withTransaction(async (client) => {
    const deleted = await client.query(
      `DELETE FROM customer_addresses WHERE id = $1 AND user_id = $2 RETURNING is_default AS "isDefault"`,
      [addressId, userId]
    );
    if (deleted.rowCount === 0) return false;

    // Removing the default promotes the most recent remaining address.
    if (deleted.rows[0].isDefault) {
      await client.query(
        `UPDATE customer_addresses SET is_default = TRUE
         WHERE id = (SELECT id FROM customer_addresses WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1)`,
        [userId]
      );
    }
    return true;
  });
}

class AddressNotFoundError extends Error {}
