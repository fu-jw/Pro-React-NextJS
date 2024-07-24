"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { NewPasswordSchema } from "@/schema";
import { getUserByEmail } from "@/data/user";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";

export const newPassword = async (
  data: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return { error: "缺少 Token" };
  }

  const validation = NewPasswordSchema.safeParse(data);

  if (!validation.success) {
    return { error: validation.error };
  }

  const { password } = validation.data;

  const existToken = await getPasswordResetTokenByToken(token);

  if (!existToken) {
    return { error: "无效的 Token" };
  }

  if (
    existToken.expires <
    new Date(new Date().getTime() + 8 * 3600 * 1000)
  ) {
    return { error: "Token 已过期" };
  }

  const user = await getUserByEmail(existToken.email);

  if (!user) {
    return { error: "用户不存在" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
    },
  });

  await db.passwordResetToken.delete({
    where: { id: existToken.id },
  });

  return { success: "密码重置成功" };
};
