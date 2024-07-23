// 所有用户可以访问的路由
export const publicRoutes = ["/", "/auth/new-verification"];

// 用于认证的路由，将被记录在 /settings
export const authRoutes = ["/auth/login", "/auth/register", "/auth/error"];

// 以 /api 开头的认证路由
export const apiAuthRoutes = "/api/auth";

// 登录后默认重定向的路由
export const defaultLoginRedirect = "/settings";
