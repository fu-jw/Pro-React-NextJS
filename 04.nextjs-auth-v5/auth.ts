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

  // 配置 pages
  // 当登录时遇到相同邮箱就重定向到 signIn
  // 遇到错误就重定向到 error，避免出现下面的错误页面
  // 解决的错误：To confirm your identity, sign in with the same account you used originally.
  // 错误链接：http://localhost:3000/api/auth/signin?error=OAuthAccountNotLinked
  // 原因：使用第三方登录时，github和Google账号是同一个邮箱
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    // 使用github等第三方登录后邮箱自动校验
    // 第三方注册时已经校验邮箱，此处无需再校验
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    // 点击登录后回调校验邮箱是否已经验证
    async signIn({ user, account }) {
      // 如果不是 credentials，即第三方登录就直接返回true
      if (account?.provider !== "credentials") {
        return true;
      }

      // 根据ID判断用户是否存在
      // 并阻止用户未验证邮箱登录
      const existUser = await getUserById(user.id as string);
      if (!existUser || !existUser.emailVerified) {
        return false;
      }

      // TODO: 添加 2FA
      
      return true;
    },
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
