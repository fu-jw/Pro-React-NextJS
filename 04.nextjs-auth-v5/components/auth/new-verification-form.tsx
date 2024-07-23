"use client";

import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { newVerification } from "@/actions/new-verification";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

const NewVerificationForm = () => {
  // 校验结果
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const verifyEmail = useCallback(async () => {
    // 有值就说明已经运行一次
    if (success || error) return;

    if (!token) {
      setError("Token 不存在");
      return;
    }

    await newVerification(token)
      .then((data) => {
        setError(data.error);
        setSuccess(data.success);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [token, error, success]);

  useEffect(() => {
    verifyEmail();
  }, [verifyEmail]);

  return (
    <CardWrapper
      headerLabel="校验邮箱"
      backBtnLabel="返回登录"
      backBtnHref="/auth/login"
      showSocial={false}
    >
      <div className="flex flex-col items-center justify-center">
        {/* 没有消息就显示图标 */}
        {!error && !success && <BeatLoader />}
        {/* 成功就显示成功消息 */}
        <FormSuccess message={success} />
        {/* 没成功就显示失败消息 */}
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};

export default NewVerificationForm;
