import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized", message: "请先登录" },
      { status: 401 }
    );
  }

  return NextResponse.json({
    message: "这是一个受保护的 API 路由",
    user: {
      name: session.user?.name,
      email: session.user?.email,
      role: (session.user as { role?: string })?.role,
    },
    authenticatedAt: new Date().toISOString(),
  });
}

export async function POST() {
  const session = await auth();

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized", message: "请先登录" },
      { status: 401 }
    );
  }

  // 检查用户角色
  const role = (session.user as { role?: string })?.role;
  if (role !== "admin") {
    return NextResponse.json(
      { error: "Forbidden", message: "需要管理员权限" },
      { status: 403 }
    );
  }

  return NextResponse.json({
    message: "管理员操作成功",
    action: "admin-only-action",
    timestamp: new Date().toISOString(),
  });
}