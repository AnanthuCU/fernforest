import type { NewAddress, ProfileUpdate } from "@fernforest/shared-types";
import { isValidIndianMobile, LIMITS, normalizePhone } from "@/lib/validation";
import { getCurrentUser, type SessionUser } from "./auth";

// Helpers for the /api/account/* route handlers.

export function jsonError(message: string, status: number) {
  return Response.json({ success: false, message }, { status });
}

/** The signed-in customer, or a 401 response to return as-is. */
export async function requireUser(request: Request): Promise<SessionUser | Response> {
  const user = await getCurrentUser(request.headers);
  return user ?? jsonError("Please sign in to continue", 401);
}

type Parsed<T> = { ok: true; value: T } | { ok: false; message: string };

function text(value: unknown): string | undefined {
  return typeof value === "string" ? value.trim() : undefined;
}

export function parseProfileUpdate(body: Record<string, unknown>): Parsed<ProfileUpdate> {
  const update: ProfileUpdate = {};

  if (body.name !== undefined) {
    const name = text(body.name);
    if (!name) return { ok: false, message: "Name is required" };
    if (name.length > LIMITS.name) return { ok: false, message: "Name is too long" };
    update.name = name;
  }

  if (body.phone !== undefined) {
    const phone = body.phone === null ? "" : normalizePhone(text(body.phone) ?? "");
    if (phone && !isValidIndianMobile(phone)) {
      return { ok: false, message: "Enter a valid 10-digit Indian mobile number" };
    }
    update.phone = phone || null;
  }

  return { ok: true, value: update };
}

/** `partial` allows missing fields (PATCH); otherwise name, phone and address are required. */
export function parseAddress(body: Record<string, unknown>, partial: false): Parsed<Required<NewAddress>>;
export function parseAddress(body: Record<string, unknown>, partial: true): Parsed<Partial<NewAddress>>;
export function parseAddress(body: Record<string, unknown>, partial: boolean): Parsed<Partial<NewAddress>> {
  const result: Partial<NewAddress> = {};

  const label = text(body.label);
  if (label !== undefined && label !== "") {
    if (label.length > LIMITS.label) return { ok: false, message: "Label is too long" };
    result.label = label;
  } else if (!partial) {
    result.label = "Home";
  }

  const name = text(body.name);
  if (name) {
    if (name.length > LIMITS.name) return { ok: false, message: "Name is too long" };
    result.name = name;
  } else if (!partial || body.name !== undefined) {
    return { ok: false, message: "Name is required" };
  }

  const phone = text(body.phone);
  if (phone) {
    if (!isValidIndianMobile(phone)) {
      return { ok: false, message: "Enter a valid 10-digit Indian mobile number" };
    }
    result.phone = normalizePhone(phone);
  } else if (!partial || body.phone !== undefined) {
    return { ok: false, message: "Phone number is required" };
  }

  const address = text(body.address);
  if (address) {
    if (address.length > LIMITS.address) return { ok: false, message: "Address is too long" };
    result.address = address;
  } else if (!partial || body.address !== undefined) {
    return { ok: false, message: "Delivery address is required" };
  }

  if (body.isDefault !== undefined) {
    result.isDefault = body.isDefault === true;
  } else if (!partial) {
    result.isDefault = false;
  }

  return { ok: true, value: result };
}

export async function readJson(request: Request): Promise<Record<string, unknown>> {
  const body = await request.json().catch(() => null);
  return body && typeof body === "object" && !Array.isArray(body) ? body : {};
}
