"use server";

import * as z from "zod";
import { RegisterSchema } from "@/schema";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (data: z.infer<typeof RegisterSchema>) => {
  // console.log(data);
  const validate = RegisterSchema.safeParse(data);
  if (!validate.success) {
    return { error: "字段校验失败" };
  }

  // 获取注册数据
  const { name, email, password } = validate.data;
  // 密码hash
  const hashedPassword = await bcrypt.hash(password, 10);
  // 判断用户是否存在(邮箱字段唯一)
  const existUser = await getUserByEmail(email);

  if (existUser) {
    return { error: "用户已存在" };
  }

  // 不存在就创建用户
  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // 发送验证邮件
  const verificationToken = await generateVerificationToken(email);
  if (verificationToken) {
    await sendVerificationEmail(email, verificationToken.token);
  }

  return { success: "验证邮件已发送" };
};
