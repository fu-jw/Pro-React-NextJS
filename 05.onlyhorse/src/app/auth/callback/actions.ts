"use server";

import prisma from "@/db/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

// 由 Kinde 管理登陆授权
export async function checkAuthStatus() {
  // 获取当前用户的会话
  const { getUser } = getKindeServerSession();
  // 查询当前用户信息
  const user = await getUser();

  // 未授权直接返回false
  if (!user) return { success: false };

  // 根据当前用户ID查数据库，是否存在
  const existingUser = await prisma.user.findUnique({ where: { id: user.id } });

  // 不存在就注册
  if (!existingUser) {
    await prisma.user.create({
      data: {
        id: user.id,
        email: user.email!,
        name: user.given_name + " " + user.family_name,
        image: user.picture,
      },
    });
  }

  return { success: true };
}
