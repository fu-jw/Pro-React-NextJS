import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import Sidebar from "./Sidebar";

const BaseLayout = ({
  children,
  renderRightPanel = true,
}: {
  children: ReactNode;
  renderRightPanel?: boolean;
}) => {
  // 获取 Kinde-Auth 授权状态，如果未登录，重定向到首页
  const { isAuthenticated } = getKindeServerSession();
  if (!isAuthenticated) {
    return redirect("/");
  }

  return (
    <div className="flex max-w-2xl lg:max-w-7xl">
      {/* 左侧边栏 */}
      <Sidebar />
      {/* 内容 */}
      <div className="w-full lg:w-3/5 flex flex-col border-r">{children}</div>
      {/* 右侧推荐商品 */}
      {renderRightPanel && <p>推荐商品</p>}
    </div>
  );
};

export default BaseLayout;
