"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, MapPin, Package, User } from "lucide-react";
import { signOut, useSession } from "@/lib/auth-client";
import { Avatar } from "@/components/account/Avatar";

/** Sign-in link when signed out; avatar with a small menu when signed in. */
export function AccountMenu() {
  const { data: session, isPending } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !menuRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  if (isPending) {
    return <span className="h-9 w-9 rounded-full bg-parchment animate-pulse" aria-hidden="true" />;
  }

  if (!session) {
    const next = pathname && pathname !== "/login" ? pathname : "/account";
    return (
      <Link
        href={`/login?next=${encodeURIComponent(next)}`}
        className="flex items-center gap-2 rounded-full border-2 border-forest/15 px-3 sm:px-4 py-1.5 text-sm font-semibold text-forest hover:border-forest transition-colors"
      >
        <User className="h-4 w-4" />
        <span className="hidden sm:inline">Sign in</span>
      </Link>
    );
  }

  const { user } = session;

  const handleSignOut = async () => {
    setOpen(false);
    await signOut();
    if (pathname?.startsWith("/account")) router.push("/");
    router.refresh();
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Account menu"
        className="flex rounded-full ring-2 ring-transparent hover:ring-sage/50 transition"
      >
        <Avatar name={user.name} image={user.image ?? null} size={36} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-56 rounded-2xl border border-gray-100 bg-white py-2 shadow-lg animate-fade-in"
        >
          <div className="px-4 py-2 border-b border-parchment mb-1">
            <p className="text-sm font-semibold text-forest truncate">{user.name}</p>
            <p className="text-xs text-gray-400 truncate">{user.email}</p>
          </div>
          <MenuLink href="/account" icon={Package} label="My orders" />
          <MenuLink href="/account?tab=addresses" icon={MapPin} label="Addresses" />
          <MenuLink href="/account?tab=profile" icon={User} label="Profile" />
          <button
            type="button"
            role="menuitem"
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-bark hover:bg-cream"
          >
            <LogOut className="h-4 w-4 text-sage" /> Sign out
          </button>
        </div>
      )}
    </div>
  );
}

function MenuLink({ href, icon: Icon, label }: { href: string; icon: typeof User; label: string }) {
  return (
    <Link href={href} role="menuitem" className="flex items-center gap-3 px-4 py-2 text-sm text-bark hover:bg-cream">
      <Icon className="h-4 w-4 text-sage" /> {label}
    </Link>
  );
}
