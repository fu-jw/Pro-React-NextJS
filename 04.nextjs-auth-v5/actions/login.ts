"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { LoginSchema } from "@/schema";
import { getUserByEmail } from "@/data/user";
import { defaultLoginRedirect } from "@/routes";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { sendVerificationEmail, sendTwoFactorTokenEmail } from "@/lib/mail";
import {
  generateVerificationToken,
  generateTwoFactorToken,
} from "@/lib/tokens";

export const login = async (data: z.infer<typeof LoginSchema>) => {
  // console.log(data);
  const validate = LoginSchema.safeParse(data);
  console.log("字段校验结果：", validate);
  if (!validate.success) {
    return { error: "验证失败" };
  }
  // return { success: "登录成功" };
  const { email, password, code } = validate.data;

  const existUser = await getUserByEmail(email);
  if (!existUser || !existUser.email || !existUser.password) {
    return { error: "邮箱不存在" };
  }

  // 验证邮件
  if (!existUser.emailVerified) {
    const varificationToken = await generateVerificationToken(email);
    // 发送验证邮件
    if (varificationToken) {
      await sendVerificationEmail(email, varificationToken.token);
    }
    return { success: "校验邮件已发送" };
  }
  // 验证 2FA
  if (existUser.isTwoFactorAuthEnabled && existUser.email) {
    // 如果存在验证码, 则校验、登录
    if (code) {
      // TODO
      const twoFactorToken = await getTwoFactorTokenByEmail(existUser.email);

      if (!twoFactorToken || twoFactorToken.token != code) {
        return { error: "验证码错误" };
      }

      // 校验过期时间
      if (
        twoFactorToken.expires <
        new Date(new Date().getTime() + 8 * 3600 * 1000)
      ) {
        return { error: "验证码已过期" };
      }

      // 删除 token
      await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
      });

      const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
        existUser.id
      );
      if (twoFactorConfirmation) {
        // 删除 2FA 确认
        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }
      // 确认 2FA
      await db.twoFactorConfirmation.create({
        data: {
          userId: existUser.id,
        },
      });
    } else {
      // 如果存在验证码, 则生成并发送验证码
      const twoFactorToken = await generateTwoFactorToken(existUser.email);
      if (twoFactorToken) {
        await sendTwoFactorTokenEmail(existUser.email, twoFactorToken.token);
      }
      return { twoFactor: true };
    }
  }

  // 登录
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
        case "AccessDenied":
          return { error: "登录受限" };
        default:
          return { error: "登录失败" };
      }
    }
    throw error;
  }
};
