import { createAuthClient } from "better-auth/react";

// Browser-side auth; talks to this app's /api/auth routes.
export const authClient = createAuthClient();

export const { useSession, signOut } = authClient;

export function signInWithGoogle(next: string) {
  return authClient.signIn.social({
    provider: "google",
    callbackURL: next,
    errorCallbackURL: `/login?error=1&next=${encodeURIComponent(next)}`,
  });
}
