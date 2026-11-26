"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Address, CustomerProfile, Order } from "@fernforest/shared-types";
import { LogOut, MapPin, Package, User } from "lucide-react";
import { signOut } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { OrdersTab } from "./OrdersTab";
import { AddressesTab } from "./AddressesTab";
import { ProfileTab } from "./ProfileTab";
import { Avatar } from "./Avatar";

export type AccountTab = "orders" | "addresses" | "profile";

const TABS: { id: AccountTab; label: string; icon: typeof Package }[] = [
  { id: "orders", label: "Orders", icon: Package },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "profile", label: "Profile", icon: User },
];

export function AccountView({
  initialTab,
  initialProfile,
  initialAddresses,
  orders,
}: {
  initialTab: AccountTab;
  initialProfile: CustomerProfile;
  initialAddresses: Address[];
  orders: Order[];
}) {
  const router = useRouter();
  const [tab, setTab] = useState<AccountTab>(initialTab);
  const [profile, setProfile] = useState(initialProfile);
  const [addresses, setAddresses] = useState(initialAddresses);
  const [signingOut, setSigningOut] = useState(false);

  const selectTab = (next: AccountTab) => {
    setTab(next);
    // Keep the tab in the URL so reloads and shared links land on it.
    window.history.replaceState(null, "", next === "orders" ? "/account" : `/account?tab=${next}`);
  };

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 bg-cream">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Avatar name={profile.name} image={profile.image} size={56} />
          <div className="min-w-0 flex-1">
            <h1 className="font-serif text-3xl text-forest truncate">Hi, {profile.name.split(" ")[0]}</h1>
            <p className="text-sm text-gray-500 truncate">{profile.email}</p>
          </div>
          <button
            type="button"
            onClick={handleSignOut}
            disabled={signingOut}
            className="hidden sm:inline-flex items-center gap-2 rounded-full border-2 border-parchment px-4 py-2 text-sm font-semibold text-bark hover:border-sage transition-colors disabled:opacity-60"
          >
            <LogOut className="h-4 w-4" /> {signingOut ? "Signing out…" : "Sign out"}
          </button>
        </div>

        {/* Tabs */}
        <div role="tablist" aria-label="Account sections" className="flex gap-1 rounded-full bg-parchment p-1 mb-8 w-full sm:w-fit">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              role="tab"
              type="button"
              aria-selected={tab === id}
              onClick={() => selectTab(id)}
              className={cn(
                "flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-colors",
                tab === id ? "bg-white text-forest shadow-sm" : "text-bark/70 hover:text-forest"
              )}
            >
              <Icon className="h-4 w-4" /> {label}
            </button>
          ))}
        </div>

        <div role="tabpanel" className="animate-fade-in" key={tab}>
          {tab === "orders" && <OrdersTab orders={orders} />}
          {tab === "addresses" && <AddressesTab addresses={addresses} onChange={setAddresses} />}
          {tab === "profile" && <ProfileTab profile={profile} onChange={setProfile} />}
        </div>

        <div className="mt-10 flex items-center justify-between text-sm">
          <Link href="/" className="text-gray-500 hover:text-forest transition-colors">
            ← Back to shop
          </Link>
          <button
            type="button"
            onClick={handleSignOut}
            disabled={signingOut}
            className="sm:hidden inline-flex items-center gap-2 font-semibold text-bark"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
