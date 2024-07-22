"use server";

import * as z from "zod";
import { LoginSchema } from "@/schema";
import { signIn } from "@/auth";
import { defaultLoginRedirect } from "@/routes";
import { AuthError } from "next-auth";

export const login = async (data: z.infer<typeof LoginSchema>) => {
  // console.log(data);
  const validate = LoginSchema.safeParse(data);
  console.log("字段校验结果：", validate);
  if (!validate.success) {
    return { error: "验证失败" };
  }
  // return { success: "登录成功" };
  const { email, password } = validate.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: defaultLoginRedirect,
    });
  } catch (error) {
    // TODO
    console.log("登录时错误信息：", error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CallbackRouteError":
        case "CredentialsSignin":
          return { error: "用户名或密码错误" };
        default:
          return { error: "登录失败" };
      }
    }
    throw error;
  }
};
