"use client";

import { useRouter } from "next/navigation";

interface LoginBtnProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const LoginBtn = ({
  children,
  mode = "redirect",
  asChild,
}: LoginBtnProps) => {
  const router = useRouter();

  const onclick = () => {
    // console.log("点击了登录按钮");
    router.push("/auth/login");
  };

  if (mode == "modal") {
    return <span>TODO:实现modal</span>;
  }

  return (
    <span onClick={onclick} className="cursor-pointer">
      {children}
    </span>
  );
};
