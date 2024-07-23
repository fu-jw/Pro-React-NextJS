"use server";

import * as z from "zod";
import { LoginSchema } from "@/schema";
import { signIn } from "@/auth";
import { defaultLoginRedirect } from "@/routes";
import { AuthError } from "next-auth";
import { generateVerificationToken } from "@/lib/tokens";
import { getUserByEmail } from "@/data/user";

export const login = async (data: z.infer<typeof LoginSchema>) => {
  // console.log(data);
  const validate = LoginSchema.safeParse(data);
  console.log("字段校验结果：", validate);
  if (!validate.success) {
    return { error: "验证失败" };
  }
  // return { success: "登录成功" };
  const { email, password } = validate.data;

  const existUser = await getUserByEmail(email);
  if (!existUser || !existUser.email || !existUser.password) {
    return { error: "邮箱不存在" };
  }

  // 此处不再发送邮箱验证，已经在auth.callback.signIn中进行了邮箱判断
  // if (!existUser.emailVerified) {
  //   await generateVerificationToken(email);
  //   return { success: "验证邮件已发送" };
  // }

  try {
    // signIn 是 NextAuthJS 提供的方法，会通过 api/auth/... 登录
    // 在此之前需要进行充分的校验
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
