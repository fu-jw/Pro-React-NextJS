// import { auth } from "@/auth";
import authConfig from "@/auth.config";
import NextAuth from "next-auth";

import {
  apiAuthRoutes,
  authRoutes,
  defaultLoginRedirect,
  publicRoutes,
} from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  // req.auth
  // const isLogin = !!req.auth; // 登录后为true
  // console.log("是否登录: ", req.auth);
  // console.log("中间件获取的URL: ", req.nextUrl.pathname);

  const { nextUrl } = req;
  const isLogin = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith("apiAuthRoutes");
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLogin) {
      return Response.redirect(new URL(defaultLoginRedirect, nextUrl));
    }
    return;
  }

  if (!isLogin && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }
  return;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
