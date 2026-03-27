import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const name = searchParams.get("name") || "World";

  return NextResponse.json({
    message: `Hello, ${name}!`,
    timestamp: new Date().toISOString(),
    endpoints: {
      auth: "/api/auth/signin",
      protected: "/api/protected",
      session: "/api/auth/session",
    },
    demoCredentials: {
      admin: { username: "admin", password: "password" },
      user: { username: "user", password: "password" },
    },
  });
}