import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "请输入邮箱",
  }),
  password: z.string().min(1, "请输入密码"),
});
