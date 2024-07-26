"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { SettingsSchema } from "@/schema";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";

export const settings = async (value: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();
  if (!user) {
    return {
      error: "权限不足",
    };
  }

  const dbUser = await getUserById(user.id as string);
  if (!dbUser) {
    return {
      error: "权限不足",
    };
  }

  // 更新用户数据
  await db.user.update({
    where: { id: user.id },
    data: { ...value },
  });

  return { success: "数据更新成功" };
};
