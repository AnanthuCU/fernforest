import { NextResponse, type NextRequest } from "next/server";

// HTTP Basic Auth for the admin dashboard and its API proxy.
// Credentials come from ADMIN_USER / ADMIN_PASSWORD; without them admin is locked.
export function middleware(request: NextRequest) {
  const user = process.env.ADMIN_USER;
  const password = process.env.ADMIN_PASSWORD;

  if (user && password) {
    const header = request.headers.get("authorization") ?? "";
    const [scheme, encoded] = header.split(" ");

    if (scheme === "Basic" && encoded) {
      const [givenUser, ...rest] = atob(encoded).split(":");
      if (givenUser === user && rest.join(":") === password) {
        return NextResponse.next();
      }
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Fernforest admin"' },
  });
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
