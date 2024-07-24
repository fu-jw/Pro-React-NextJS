"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { ResetSchema } from "@/schema";
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
import { reset } from "@/actions/reset";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

export const ResetForm = () => {
  // 表单状态
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: z.infer<typeof ResetSchema>) => {
    // 调用服务端接口
    // 也可以使用 axios.post("/your/api/rout", value)
    // 注意：use client，该打印会出现在浏览器控制台。
    console.log("重置密码数据", data);
    setError("");
    setSuccess("");

    startTransition(() => {
      reset(data).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    // showSocial 重置密码页面不需要第三方登录
    <CardWrapper
      headerLabel="重置密码"
      backBtnLabel="返回登录"
      backBtnHref="/auth/login"
      showSocial={false}
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
          </div>

          {/* 错误信息 */}
          <FormError message={error} />
          {/* 成功信息 */}
          <FormSuccess message={success} />

          {/* 登录按钮 */}
          <Button disabled={isPending} type="submit" className="w-full">
            重置密码
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
