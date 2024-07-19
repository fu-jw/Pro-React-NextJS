"use client";

import * as z from "zod";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { LoginSchema } from "@/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

export const LoginForm = () => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    console.log(data);
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
            {/* 邮箱 */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>邮箱</FormLabel>

                  <FormControl>
                    <Input type="email" placeholder="请输入邮箱" {...field} />
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
                      type="password"
                      placeholder="请输入密码"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* 错误信息:用户名或密码错误 */}
          <FormError message="" />
          {/* 错误信息:邮件已发送 */}
          <FormSuccess message="" />

          {/* 登录按钮 */}
          <Button type="submit" className="w-full">
            登录
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
