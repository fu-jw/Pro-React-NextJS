"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FcLinux } from "react-icons/fc";
import { defaultLoginRedirect } from "@/routes";

export const Social = () => {

  const onClick = async (provider: "google"|"github") => {
    await signIn(provider, { 
      callbackUrl: defaultLoginRedirect,
     });
  };

  return (
    <div className="flex items-center w-full gap-x-2">
      {/* Google */}
      {/* 为什么同样的配置Google会报错？？？ */}
      <Button size="lg" className="w-full" variant="outline" onClick={() => onClick("google")}>
        <FcGoogle className="h-5 w-5" />
      </Button>

      {/* Github */}
      <Button size="lg" className="w-full" variant="outline" onClick={() => onClick("github")}>
        <FaGithub className="h-5 w-5" />
      </Button>

      <Button size="lg" className="w-full" variant="outline" onClick={() => {}}>
        <FcLinux className="h-6 w-6" />
      </Button>
    </div>
  );
};
