import { getPool } from "@/lib/server/db";

// Always run on request so the DB check is live, not cached at build time.
export const dynamic = "force-dynamic";

// GET /api/health
export async function GET() {
  try {
    const result = await getPool().query("SELECT NOW()");
    return Response.json({ status: "ok", message: "Fernforest is running", dbTime: result.rows[0].now });
  } catch (error) {
    console.error("Health check DB error:", error);
    return Response.json(
      { status: "error", message: "App running, DB connection error" },
      { status: 500 }
    );
  }
}
