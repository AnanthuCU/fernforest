import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/server/auth";
import { getProfile, listAddresses } from "@/lib/server/account";
import { getOrdersForUser } from "@/lib/server/orders";
import { AccountView, type AccountTab } from "@/components/account/AccountView";

export const metadata: Metadata = {
  title: "My account – Fern Forest",
  robots: { index: false },
};

export const dynamic = "force-dynamic";

const TABS: AccountTab[] = ["orders", "addresses", "profile"];

export default async function AccountPage({ searchParams }: { searchParams: { tab?: string } }) {
  const user = await getCurrentUser(headers());
  if (!user) {
    redirect("/login?next=/account");
  }

  const [profile, addresses, orders] = await Promise.all([
    getProfile(user.id),
    listAddresses(user.id),
    getOrdersForUser(user.id),
  ]);
  if (!profile) {
    redirect("/login?next=/account");
  }

  const tab = TABS.find((t) => t === searchParams.tab) ?? "orders";

  // Dates are serialized for the client component.
  return (
    // Keyed by tab so navbar links to another tab (same page) reset the view.
    <AccountView
      key={tab}
      initialTab={tab}
      initialProfile={profile}
      initialAddresses={JSON.parse(JSON.stringify(addresses))}
      orders={JSON.parse(JSON.stringify(orders))}
    />
  );
}
