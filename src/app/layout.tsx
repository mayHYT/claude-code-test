import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NextAuth.js API 示例",
  description: "Next.js 15 App Router 带认证的 API 路由示例",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}