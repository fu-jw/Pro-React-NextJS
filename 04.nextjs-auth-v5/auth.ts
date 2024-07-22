import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { UserRole } from "@prisma/client";
// import GitHub from "next-auth/providers/github";
// import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";

export const { auth, handlers, signIn, signOut } = NextAuth({
  // providers: [GitHub, Google],
  callbacks: {
    // 注释该方法，后续使用github、google登录
    // async signIn({ user }) {
    //   console.log("signIn: ", user);
    //   // user.id! : 说明ID一定非空
    //   // 或者 as string 可以在编译时避免错误提示，但如果不是string就会出现运行时错误！！
    //   const existUser = await getUserById(user.id as string);
    //   if (!existUser || !existUser.emailVerified) {
    //     return false;
    //   }
    //   return true;
    // },
    session: async ({ session, token }) => {
      console.log("session: ", session);
      console.log("sessionToken: ", token);
      if (token.sub && session.user) {
        // 将 token.sub 赋值给 session.user.id 就可以在客户端获取到用户ID
        session.user.id = token.sub;
      }

      // 获取用户角色并添加到 session.user.role
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      return session;
    },
    jwt: async ({ token, user }) => {
      // token.sub 就是数据库中的用户ID
      if (user) {
        token.sub = user.id;
      }
      console.log("token: ", token);

      // 获取用户角色并添加到 token.role
      // 此处token没有role值，上面sessionToken中可以获取role值
      // 方便后续客户端根据角色处理
      if (token.sub) {
        const user = await getUserById(token.sub);
        if (user) {
          token.role = user.role;
        }
      }

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
