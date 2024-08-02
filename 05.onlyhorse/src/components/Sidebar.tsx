import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Shirt, Home, LayoutDashboard, User } from "lucide-react";
import { getKindeServerSession, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ModeToggle } from "./ModeToggle";

const SIDEBAR_LINKS = [
  {
    icon: Home,
    label: "Home",
    href: "/",
  },
  {
    icon: Shirt,
    label: "Merch",
    href: "/merch",
  },
];

// 左边栏部分
const Sidebar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // const userProfile = await getUserProfileAction();
  const isAdmin = process.env.ADMIN_EMAIL === user?.email;

  return (
    <div className="flex lg:w-1/5 flex-col gap-3 px-2 border-y sticky left-0 top-0 h-screen">
      {/* 头像 */}
      <Link href={"/update-profile"} className="max-w-fit">
        <Avatar className="mt-4 cursor-pointer">
          <AvatarImage src="/user-placeholder.png" className="object-cover" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </Link>
      {/* 导航 */}
      <nav className="flex flex-col gap-3">
        {SIDEBAR_LINKS.map((link, index) => (
          <Link
            href={link.href}
            key={index}
            className="flex gap-2 items-center lg:w-full 
            hover:bg-primary-foreground font-bold hover:text-primary px-2 py-1 
            rounded-full justify-center lg:justify-normal"
          >
            <link.icon className="w-6 h-6" />
            <span className="hidden lg:block">{link.label}</span>
          </Link>
        ))}
        {/* 导航-管理后台 */}
        {isAdmin && (
          <Link
            href={"/dashboard"}
            className="flex w-12 lg:w-full items-center gap-2 hover:bg-primary-foreground font-bold hover:text-primary px-2 py-1 rounded-full justify-center lg:justify-normal"
          >
            <LayoutDashboard className="w-6 h-6" />
            <span className="hidden lg:block">Dashboard</span>
          </Link>
        )}
        {/* 导航-Setting 下拉 */}
        <DropdownMenu>
          <div className="flex w-12 lg:w-full items-center gap-2 hover:bg-primary-foreground font-bold hover:text-primary px-2 py-1 rounded-full justify-center lg:justify-normal">
            <DropdownMenuTrigger className="flex items-center gap-2">
              <User className="w-6 h-6" />
              <span className="hidden lg:block">Setting</span>
            </DropdownMenuTrigger>
          </div>
          {/* 下拉内容 */}
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href={"#"}>
              <DropdownMenuItem>Billing</DropdownMenuItem>
            </Link>
            <LogoutLink>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </LogoutLink>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* 模式切换 */}
        <ModeToggle />
      </nav>
    </div>
  );
};

export default Sidebar;
