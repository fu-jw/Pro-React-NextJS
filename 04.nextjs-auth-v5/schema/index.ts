import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "请输入邮箱",
  }),
  password: z.string().min(1, "请输入密码"),
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
