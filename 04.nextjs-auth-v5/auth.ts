import NextAuth from "next-auth";
import authConfig from "@/auth.config";
// import GitHub from "next-auth/providers/github";
// import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";

export const { auth, handlers, signIn, signOut } = NextAuth({
  // providers: [GitHub, Google],
  callbacks: {
    session: async ({ session, token }) => {
      console.log("session: ", session);
      console.log("sessionToken: ", token);
      if (token.sub && session.user) {
        // 将 token.sub 赋值给 session.user.id 就可以在客户端获取到用户ID
        session.user.id = token.sub;
      }
      return session;
    },
    jwt: async ({ token, user }) => {
      // token.sub 就是数据库中的用户ID
      // if (user) {
      //   token.sub = user.id;
      // }
      console.log("token: ", token);

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
