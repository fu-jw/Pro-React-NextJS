"use client";

import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Button } from "@/components/ui/button";
import { settings } from "@/actions/settings";
import { useTransition } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const SettingsPage = () => {
  // const user = useCurrentUser();

  // const onClick = () => {
  //   console.log("登出");
  //   logout();
  // };

  // return (
  //   <div className="bg-white p-10 rounded-xl">
  //     <button onClick={onClick} type="submit">
  //       登出
  //     </button>
  //   </div>
  // );

  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
      settings({
        name: "New Name",
      });
    });
  };

  return (
    <Card className="w-[600px] mx-auto">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">⚙设置</p>
      </CardHeader>
      <CardContent>
        <Button disabled={isPending} onClick={onClick}>更新名字</Button>
      </CardContent>
    </Card>
  );
};

export default SettingsPage;
