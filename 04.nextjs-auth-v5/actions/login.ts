"use server";

import * as z from "zod";
import { LoginSchema } from "@/schema";

export const login = async (data: z.infer<typeof LoginSchema>) => {
  // console.log(data);
  const validate = LoginSchema.safeParse(data);
  if (!validate.success) {
    return { error: "用户名或密码错误" };
  }
  return { success: "登录成功" };
};
