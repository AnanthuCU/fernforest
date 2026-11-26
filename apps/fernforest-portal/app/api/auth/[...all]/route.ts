import { toNextJsHandler } from "better-auth/next-js";
import { getAuth } from "@/lib/server/auth";

// Better Auth endpoints: Google sign-in and callback, session, sign-out.
export const { GET, POST } = toNextJsHandler((request) => getAuth().handler(request));
