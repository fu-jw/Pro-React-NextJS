import { auth } from "@/auth";
import { UserInfo } from "@/components/user-info";
import { currentUser } from "@/lib/auth";

// 注意：客户端和服务端的区别
const ServerPage = async () => {
  // const session = await auth();
  const user = await currentUser();
  return <UserInfo label="💻Server Page" user={user} />;
};

export default ServerPage;
