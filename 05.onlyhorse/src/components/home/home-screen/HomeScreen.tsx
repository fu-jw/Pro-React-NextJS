import BaseLayout from "@/components/BaseLayout";
import UserProfile from "./UserProfile";
import Posts from "./Posts";
import prisma from "@/db/prisma";
import { getUserProfileAction } from "@/app/update-profile/actions";
import { notFound } from "next/navigation";

const HomeScreen = async () => {
  // 获取admin信息
  const admin = await prisma.user.findUnique({
    where: { email: process.env.ADMIN_EMAIL },
  });
  // 获取当前用户信息
  const user = await getUserProfileAction();
  // 当前用户未授权就直接返回404
  if (!user) return notFound();

  return (
    <BaseLayout>
      <UserProfile />
      <Posts admin={admin!} isSubscribed={user?.isSubscribed} />
    </BaseLayout>
  );
};
export default HomeScreen;
