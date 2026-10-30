import { getApiBaseUrl } from "@/lib/api";

const ALLOWED_RESOURCES = new Set(["leads", "orders"]);

// Proxies admin requests to the backend, adding the admin token on the server
// so it never reaches the browser. Access to this route is gated by middleware.ts.
export async function GET(_request: Request, { params }: { params: { resource: string } }) {
  if (!ALLOWED_RESOURCES.has(params.resource)) {
    return Response.json({ success: false, message: "Not found" }, { status: 404 });
  }

  const token = process.env.ADMIN_API_TOKEN;
  if (!token) {
    return Response.json({ success: false, message: "Admin API is not configured" }, { status: 503 });
  }

  const response = await fetch(`${getApiBaseUrl()}/api/admin/${params.resource}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  return Response.json(await response.json().catch(() => ({})), { status: response.status });
}
