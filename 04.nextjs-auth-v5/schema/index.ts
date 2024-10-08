import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "请输入邮箱",
  }),
  password: z.string().min(1, "请输入密码"),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "请输入邮箱",
  }),
  password: z.string().min(6, "密码最少6位"),
  name: z.string().min(1, "请输入用户名"),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "请输入邮箱",
  }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "密码最少6位",
  }),
});

export const SettingsSchema = z.object({
  name: z.optional(z.string()),
});
