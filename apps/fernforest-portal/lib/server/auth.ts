import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { getPool } from "./db";

// Customer login (Better Auth, Google sign-in only). Users and sessions live in
// the `user` / `session` / `account` / `verification` tables created by
// scripts/migrate.mjs. Admin keeps its separate Basic Auth (middleware.ts).
function createAuth() {
  return betterAuth({
    database: getPool(),
    baseURL: process.env.BETTER_AUTH_URL,
    secret: process.env.BETTER_AUTH_SECRET,
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID ?? "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        prompt: "select_account",
      },
    },
    user: {
      additionalFields: {
        // Google does not share a phone number; customers add it at checkout or
        // on their profile. Not settable through the auth endpoints themselves.
        phone: { type: "string", required: false, input: false },
      },
    },
    session: {
      expiresIn: 60 * 60 * 24 * 30, // 30 days
      updateAge: 60 * 60 * 24, // refresh the expiry at most once a day
      cookieCache: { enabled: true, maxAge: 5 * 60 },
    },
    plugins: [nextCookies()],
  });
}

type Auth = ReturnType<typeof createAuth>;
export type Session = Auth["$Infer"]["Session"];
export type SessionUser = Session["user"];

// Created on first use (not at import) so builds don't need DATABASE_URL, and
// reused across requests and dev hot reloads like the database pool.
const globalForAuth = globalThis as unknown as { auth?: Auth };

export function getAuth(): Auth {
  globalForAuth.auth ??= createAuth();
  return globalForAuth.auth;
}

/** The signed-in customer for this request, or null. */
export async function getCurrentUser(headers: Headers): Promise<SessionUser | null> {
  const session = await getAuth().api.getSession({ headers });
  return session?.user ?? null;
}
