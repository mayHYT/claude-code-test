import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

export const config: NextAuthConfig = {
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Demo user - 在生产环境中应该查询数据库
        if (
          credentials?.username === "admin" &&
          credentials?.password === "password"
        ) {
          return {
            id: "1",
            name: "Admin User",
            email: "admin@example.com",
            role: "admin",
          };
        }
        if (
          credentials?.username === "user" &&
          credentials?.password === "password"
        ) {
          return {
            id: "2",
            name: "Normal User",
            email: "user@example.com",
            role: "user",
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { role?: string }).role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(config);