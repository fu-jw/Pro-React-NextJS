"use client";

import { logout } from "@/actions/logout";

interface LogoutBtnProps {
  children?: React.ReactNode;
}

export const LogoutBtn = ({ children }: LogoutBtnProps) => {
  const onClick = () => {
    logout();
  };

  return (
    <span onClick={onClick} className=" cursor-pointer hover:underline">
      {children}
    </span>
  );
}