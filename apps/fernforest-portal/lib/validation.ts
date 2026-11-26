// Shared by the browser forms and the API routes.

/** Strip spaces and dashes so "98765 43210" and "98765-43210" are accepted. */
export function normalizePhone(phone: string): string {
  return phone.replace(/[\s-]/g, "");
}

/** 10-digit Indian mobile number (no +91). */
export function isValidIndianMobile(phone: string): boolean {
  return /^[6-9]\d{9}$/.test(normalizePhone(phone));
}

/** Only allow same-site relative paths as post-login destinations. */
export function safeRedirectPath(path: string | null | undefined, fallback = "/account"): string {
  if (!path || !path.startsWith("/") || path.startsWith("//") || path.includes("\\")) {
    return fallback;
  }
  return path;
}

export const LIMITS = {
  name: 100,
  label: 40,
  address: 500,
} as const;
