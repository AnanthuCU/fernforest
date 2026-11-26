import { getProfile, updateProfile } from "@/lib/server/account";
import { jsonError, parseProfileUpdate, readJson, requireUser } from "@/lib/server/accountInput";

// GET /api/account/profile — the signed-in customer's profile.
export async function GET(request: Request) {
  const user = await requireUser(request);
  if (user instanceof Response) return user;

  try {
    const profile = await getProfile(user.id);
    if (!profile) return jsonError("Account not found", 404);
    return Response.json({ success: true, profile });
  } catch (error) {
    console.error("Error loading profile:", error);
    return jsonError("We could not load your profile right now.", 500);
  }
}

// PATCH /api/account/profile — update name and/or phone.
export async function PATCH(request: Request) {
  const user = await requireUser(request);
  if (user instanceof Response) return user;

  const parsed = parseProfileUpdate(await readJson(request));
  if (!parsed.ok) return jsonError(parsed.message, 400);

  try {
    const profile = await updateProfile(user.id, parsed.value);
    if (!profile) return jsonError("Account not found", 404);
    return Response.json({ success: true, profile });
  } catch (error) {
    console.error("Error updating profile:", error);
    return jsonError("We could not save your profile right now.", 500);
  }
}
