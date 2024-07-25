import NextAuth, { type DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import { UserRole } from "@/prisma/client";

export type ExtendedUser = DefaultSession["user"] & {
  // 可以在这里添加扩展字段，在session中出现
  role: UserRole;
  isTwoFactorEnabled: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

// declare module "next-auth/jwt" {
//   interface JWT {
//     role: "USER" | "ADMIN";
//   }
// }
