import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">NextAuth.js API 认证示例</h1>

      <div className="space-y-4">
        <div className="p-4 border rounded">
          <h2 className="text-xl font-semibold mb-2">认证状态</h2>
          {session ? (
            <div>
              <p className="text-green-600">✅ 已登录</p>
              <pre className="mt-2 p-2 bg-gray-100 rounded text-sm overflow-auto">
                {JSON.stringify(session, null, 2)}
              </pre>
            </div>
          ) : (
            <p className="text-red-600">❌ 未登录</p>
          )}
        </div>

        <div className="p-4 border rounded">
          <h2 className="text-xl font-semibold mb-2">API 端点</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <code>GET /api/hello</code> - 公开的 Hello API
            </li>
            <li>
              <code>GET /api/auth/signin</code> - 登录页面
            </li>
            <li>
              <code>GET /api/auth/signout</code> - 登出
            </li>
            <li>
              <code>GET /api/auth/session</code> - 获取 session
            </li>
            <li>
              <code>GET /api/protected</code> - 受保护的 API（需要登录）
            </li>
            <li>
              <code>POST /api/protected</code> - 管理员专用 API
            </li>
          </ul>
        </div>

        <div className="p-4 border rounded">
          <h2 className="text-xl font-semibold mb-2">测试账号</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">用户名</th>
                <th className="text-left p-2">密码</th>
                <th className="text-left p-2">角色</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2">admin</td>
                <td className="p-2">password</td>
                <td className="p-2">admin</td>
              </tr>
              <tr>
                <td className="p-2">user</td>
                <td className="p-2">password</td>
                <td className="p-2">user</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}