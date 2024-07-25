import crypto from "crypto";
import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import { getVerificationTokenByEmail } from "@/data/verification-tokens";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";

export const generatePasswordResetToken = async (email: string) => {
  // 生成UUID
  const token = uuidv4();
  // 设置过期时间:1小时
  // 东八区：+8小时
  const expires = new Date(
    new Date().getTime() + 1000 * 3600 + 8 * 60 * 60 * 1000
  );

  // 判断是否存在该邮箱的重置token，如果存在就删除
  const existToken = await getPasswordResetTokenByEmail(email);

  if (existToken) {
    await db.passwordResetToken.delete({
      where: {
        id: existToken.id,
      },
    });
  }

  // 创建重置token
  try {
    const passwordResetToken = await db.passwordResetToken.create({
      data: {
        token,
        expires,
        email,
      },
    });
    return passwordResetToken;
  } catch (error) {
    console.log("生成重置token失败：", error);
    return null;
  }
};

export const generateVerificationToken = async (email: string) => {
  // 生成UUID
  const token = uuidv4();
  // 设置过期时间:1小时
  // 东八区：+8小时
  const expires = new Date(
    new Date().getTime() + 1000 * 3600 + 8 * 60 * 60 * 1000
  );

  // 判断是否存在该邮箱的验证token，如果存在就删除
  const existToken = await getVerificationTokenByEmail(email);

  if (existToken) {
    await db.verificationToken.delete({
      where: {
        id: existToken.id,
      },
    });
  }

  // 创建验证token
  try {
    const verificationToken = await db.verificationToken.create({
      data: {
        token,
        expires,
        email,
      },
    });
    return verificationToken;
  } catch (error) {
    console.log("生成验证token失败：", error);
    return null;
  }
};

export const generateTwoFactorToken = async (email: string) => {
  // 生成6位随机数
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  // 设置过期时间:1小时
  // 东八区：+8小时
  const expires = new Date(
    new Date().getTime() + 1000 * 3600 + 8 * 60 * 60 * 1000
  );

  // 判断是否存在该邮箱的验证token，如果存在就删除
  const existToken = await getTwoFactorTokenByEmail(email);

  if (existToken) {
    await db.twoFactorToken.delete({
      where: {
        id: existToken.id,
      },
    });
  }

  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      token,
      expires,
      email,
    },
  });

  return twoFactorToken;
};
