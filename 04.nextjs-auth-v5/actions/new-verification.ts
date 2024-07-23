"use server";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-tokens";

export const newVerification = async (token: string) => {
  const verificationToken = await getVerificationTokenByToken(token);
  if (!verificationToken) {
    return { error: "Token 不存在" };
  }

  if (
    verificationToken.expires < new Date(new Date().getTime() + 8 * 3600 * 1000)
  ) {
    return { error: "Token 已过期" };
  }

  const user = await getUserByEmail(verificationToken.email);
  if (!user) {
    return { error: "用户不存在" };
  }

  await db.user.update({
    where: { id: user.id },
    data: {
      emailVerified: new Date(new Date().getTime() + 8 * 3600 * 1000),
      email: verificationToken.email,
    },
  });

  await db.verificationToken.delete({
    where: { id: verificationToken.id },
  });

  return { success: "邮箱验证成功" };
};
