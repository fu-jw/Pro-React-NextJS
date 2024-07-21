import NextAuth from "next-auth";
import authConfig from "@/auth.config";
// import GitHub from "next-auth/providers/github";
// import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";

export const { auth, handlers, signIn, signOut } = NextAuth({
  // providers: [GitHub, Google],
  ...authConfig,
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
});
