"use client";

import { Button } from "@/components/ui/button";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { useState } from "react";

const AuthButtons = () => {
  const [ loading, setLoading ] = useState(false);

  return (
    <div className="flex gap-3 flex-1 md:flex-row flex-col">
      {/* 添加一个小功能：点击按钮后就禁用按钮，防止重复点击 */}
      <RegisterLink className="flex-1" onClick={() => setLoading(true)}>
        <Button className="w-full" variant={"outline"} disabled={loading}>
          注册
        </Button>
      </RegisterLink>

      <LoginLink className="flex-1" onClick={() => setLoading(true)}>
        <Button className="w-full" disabled={loading}>
          登录
        </Button>
      </LoginLink>
    </div>
  );
};

export default AuthButtons;
