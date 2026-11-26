import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/server/auth";
import { safeRedirectPath } from "@/lib/validation";
import { LoginCard } from "@/components/account/LoginCard";

export const metadata: Metadata = {
  title: "Sign in – Fern Forest",
  robots: { index: false },
};

export const dynamic = "force-dynamic";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { next?: string; error?: string };
}) {
  // Never send a signed-in customer back to /login (redirect loop).
  const requested = safeRedirectPath(searchParams.next);
  const next = requested.startsWith("/login") ? "/account" : requested;

  if (await getCurrentUser(headers())) {
    redirect(next);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20 pb-16 bg-cream">
      <LoginCard next={next} hasError={Boolean(searchParams.error)} />
    </div>
  );
}
