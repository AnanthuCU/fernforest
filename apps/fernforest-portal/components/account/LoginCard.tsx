"use client";

import { useState } from "react";
import { Leaf } from "lucide-react";
import { signInWithGoogle } from "@/lib/auth-client";

export function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.1V7.06H2.18A11 11 0 0 0 1 12c0 1.77.43 3.45 1.18 4.94l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
    </svg>
  );
}

export function LoginCard({ next, hasError }: { next: string; hasError: boolean }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(hasError);

  const handleClick = async () => {
    setLoading(true);
    setError(false);
    const { error: signInError } = await signInWithGoogle(next);
    // On success the browser is already navigating to Google.
    if (signInError) {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-3xl border border-gray-100 p-8 sm:p-10 text-center shadow-sm animate-fade-in">
      <div className="mx-auto h-14 w-14 rounded-full bg-lime/20 flex items-center justify-center mb-5">
        <Leaf className="h-7 w-7 text-sage" />
      </div>
      <h1 className="font-serif text-3xl text-forest mb-2">Welcome to Fern Forest</h1>
      <p className="text-sm text-gray-500 mb-8">
        Sign in to save your delivery details, reorder faster and see your order history.
      </p>

      {error && (
        <p role="alert" className="mb-5 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
          We couldn&apos;t sign you in with Google. Please try again.
        </p>
      )}

      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 rounded-full border-2 border-parchment bg-white px-6 py-3.5 text-sm font-semibold text-bark hover:border-sage hover:bg-cream transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="h-5 w-5 rounded-full border-2 border-sage border-t-transparent animate-spin" />
        ) : (
          <GoogleIcon className="h-5 w-5" />
        )}
        {loading ? "Redirecting to Google…" : "Continue with Google"}
      </button>

      <p className="mt-6 text-xs text-gray-400">
        You can still check out as a guest without an account.
      </p>
    </div>
  );
}
