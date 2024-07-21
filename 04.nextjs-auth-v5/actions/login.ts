"use server";

import * as z from "zod";
import { LoginSchema } from "@/schema";
import { signIn } from "@/auth";
import { defaultLoginRedirect } from "@/routes";
import { AuthError } from "next-auth";

export const login = async (data: z.infer<typeof LoginSchema>) => {
  // console.log(data);
  const validate = LoginSchema.safeParse(data);
  if (!validate.success) {
    return { error: "用户名或密码错误" };
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
        // case "CallbackRouteError":
        //   return { error: "CallbackRouteError" };
        case "CredentialsSignin":
          return { error: "用户名或密码错误" };
        default:
          return { error: "登录失败" };
      }
    }
    throw error;
  }
};
