import AuthScreen from "@/components/home/auth-screen/AuthScreen";
import HomeScreen from "@/components/home/home-screen/HomeScreen";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Home() {
  // const user = false;
  // 通过 Kinde-Auth 获取用户数据
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  // 打印用户数据
  console.log(user);

  return <main>{user ? <HomeScreen /> : <AuthScreen />}</main>;
}
