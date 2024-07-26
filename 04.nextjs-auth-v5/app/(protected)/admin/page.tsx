"use client";

import { admin } from "@/actions/admin";
import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCurrentRole } from "@/hooks/use-current-role";
import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";

const AdminPage = () => {
  // 这是客户端写法：
  // const role = useCurrentRole();
  // 这是服务端写法：
  // const role = currentRole();
  ////////////////////////////////////////
  // 服务端写法在 action/admin.ts 

    // 这是服务端写法：
  const onServerActionClick = () => {
    admin().then((data) => {
      if(data.success) {
        toast.success(data.success);
      } else {
        toast.error(data.error);
      }
    })
  };
  
  // 这是客户端写法：
  const onApiRouteClick = () => {
    fetch("/api/admin").then((response) => {
      if (response.ok) {
        // console.log("Admin API Route is working!");
        toast.success("Admin API Route is working!");
      } else {
        // console.log("Admin API Route is not working!");
        toast.error("Admin API Route is not working!");
      }
    });
  };
  return (
    <Card className="w-[600px]">
      <CardHeader className="text-2xl font-semibold text-center">
        <p className="text-2xl font-semibold text-center">🔑Admin</p>
      </CardHeader>

      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="You are an admin!" />
        </RoleGate>
        <div className="flex flex-row items-center justify-between rounded-md border p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only API Route</p>
          <Button onClick={onApiRouteClick}>点击测试</Button>
        </div>

        <div className="flex flex-row items-center justify-between rounded-md border p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only Server Action</p>
          <Button onClick={onServerActionClick}>点击测试</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
