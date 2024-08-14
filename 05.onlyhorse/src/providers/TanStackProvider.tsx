"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

const queryClient = new QueryClient();
// tanstack 提供状态管理: https://tanstack.com/query/latest/docs/framework/react/quick-start
// 在 layout 中使用
const TanStackProvider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default TanStackProvider;
