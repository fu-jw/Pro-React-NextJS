"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { LoginSchema } from "@/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { login } from "@/actions/login";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

export const LoginForm = () => {
  // 出现 OAuthAccountNotLinked 错误时，在页面给出提示
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "该邮箱已通过其他平台注册，请直接登录"
      : "";

  // 表单状态
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    console.log("登录数据", data);
    // 调用服务端接口
    // 也可以使用 axios.post("/your/api/rout", value)
    // login(data);
    setError("");
    setSuccess("");

    startTransition(() => {
      login(data)
        .then((data) => {
          // setError(data?.error);
          // setSuccess(data?.success);
          // 登录失败
          if (data?.error) {
            form.reset();
            setError(data.error);
          }
          // 登录成功
          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }
          // 2FA 登录
          if (data?.twoFactor) setShowTwoFactor(true);
        })
        .catch((error) => setError(error.message));
    });
  };

  return (
    <CardWrapper
      headerLabel="欢迎回来"
      backBtnLabel="免费注册"
      backBtnHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* 表单信息 */}
          <div className="space-y-4">
            {/* 有 2FA 时的登录框 */}
            {showTwoFactor && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>验证码</FormLabel>

                    <FormControl>
                      <Input
                        disabled={isPending}
                        type="text"
                        placeholder="请输入验证码"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {/* 没有 2FA 时的登录框 */}
            {!showTwoFactor && (
              <>
                {/* 邮箱 */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>邮箱</FormLabel>

                      <FormControl>
                        <Input
                          disabled={isPending}
                          type="email"
                          placeholder="请输入邮箱"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* 密码 */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>密码</FormLabel>

                      <FormControl>
                        <Input
                          disabled={isPending}
                          type="password"
                          placeholder="请输入密码"
                          {...field}
                        />
                      </FormControl>

                      {/* 重置密码按钮 */}
                      <Button
                        size="sm"
                        variant="link"
                        asChild
                        className="px-0 font-normal"
                      >
                        {/* 
                    需要首先在 routes.ts 中配置路由
                    所有请求都会经过 middleware.ts 过滤
                    */}
                        <Link href="/auth/reset" className="text-sm">
                          忘记密码？
                        </Link>
                      </Button>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>

          {/* 错误信息 */}
          <FormError message={error || urlError} />
          {/* 成功信息 */}
          <FormSuccess message={success} />

          {/* 登录按钮 */}
          <Button disabled={isPending} type="submit" className="w-full">
            {showTwoFactor ? "确认" : "登录"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
