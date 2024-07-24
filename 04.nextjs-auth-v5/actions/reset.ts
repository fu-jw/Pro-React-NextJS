"use server";

import * as z from "zod";
import { ResetSchema } from "@/schema";
import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";

export const reset = async (data: z.infer<typeof ResetSchema>) => {
  const validate = ResetSchema.safeParse(data);
  console.log("字段校验结果：", validate);
  if (!validate.success) {
    return { error: "请检查邮箱格式" };
  }

  const { email } = data;

  const existUser = await getUserByEmail(email);
  if (!existUser) {
    return { error: "邮箱不存在，请先注册" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  console.log("生成Token", passwordResetToken);
  if (!passwordResetToken) {
    return { error: "生成Token失败" };
  }

  await sendPasswordResetEmail(email, passwordResetToken.token);

  return { success: "重置密码邮件已发送，请查收" };
};
