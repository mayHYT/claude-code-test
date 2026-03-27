import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 受保护的路由路径
const protectedPaths = ["/api/protected", "/dashboard", "/profile"];

// 管理员专用路径
const adminPaths = ["/admin"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 获取 session
  const session = await auth();

  // 检查是否是受保护的路由
  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );
  const isAdminPath = adminPaths.some((path) => pathname.startsWith(path));

  if (isProtectedPath || isAdminPath) {
    if (!session) {
      // 未登录，重定向到登录页面或返回 401
      if (pathname.startsWith("/api/")) {
        return NextResponse.json(
          { error: "Unauthorized", message: "请先登录" },
          { status: 401 }
        );
      }
      const signInUrl = new URL("/auth/signin", request.url);
      signInUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(signInUrl);
    }

    // 检查管理员权限
    if (isAdminPath) {
      const role = (session.user as { role?: string })?.role;
      if (role !== "admin") {
        if (pathname.startsWith("/api/")) {
          return NextResponse.json(
            { error: "Forbidden", message: "需要管理员权限" },
            { status: 403 }
          );
        }
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/protected/:path*",
    "/api/admin/:path*",
    "/dashboard/:path*",
    "/admin/:path*",
    "/profile/:path*",
  ],
};