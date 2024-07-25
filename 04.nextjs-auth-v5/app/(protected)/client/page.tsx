"use client";

import { UserInfo } from "@/components/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";

// This is a client component. It won't be server-side rendered in `pages`, so you can use any client-side libraries here.
// 注意：客户端和服务端的区别
const ClientPage = () => {
  const user = useCurrentUser();
  return <UserInfo label="📱Client Page" user={user} />;
};

export default ClientPage;
