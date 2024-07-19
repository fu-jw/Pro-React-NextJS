"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Header } from "@/components/auth/header";
import { Social } from "@/components/auth/social";
import { BackBtn } from "@/components/auth/back-btn";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backBtnLabel: string;
  backBtnHref: string;
  showSocial: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backBtnLabel,
  backBtnHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      {/* 卡片头部信息 */}
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>

      {/* 卡片内容 */}
      <CardContent>{children}</CardContent>

      {/* 社交信息 */}
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}

      {/* 返回按钮 */}
      <CardFooter>
        <BackBtn label={backBtnLabel} href={backBtnHref} />
      </CardFooter>
    </Card>
  );
};
