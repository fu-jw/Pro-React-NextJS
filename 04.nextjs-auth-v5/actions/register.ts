"use server";

import * as z from "zod";
import { RegisterSchema } from "@/schema";

export const register = async (data: z.infer<typeof RegisterSchema>) => {
  // console.log(data);
  const validate = RegisterSchema.safeParse(data);
  if (!validate.success) {
    return { error: "用户名或邮箱已存在" };
  }
  return { success: "邮件已发送" };
};
