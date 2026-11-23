import type { NewLead } from "@fernforest/shared-types";
import { saveLead } from "@/lib/server/leads";

// POST /api/leads — Create a new lead.
export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as Partial<NewLead>;
  const { name, phone, email } = body;

  if (!name || (!phone && !email)) {
    return Response.json(
      { success: false, message: "Name and phone or email are required" },
      { status: 400 }
    );
  }

  try {
    const lead = await saveLead({ name, phone, email });
    return Response.json({ success: true, lead }, { status: 201 });
  } catch (error) {
    console.error("Error saving lead:", error);
    return Response.json(
      { success: false, message: "Unable to save lead right now" },
      { status: 500 }
    );
  }
}
