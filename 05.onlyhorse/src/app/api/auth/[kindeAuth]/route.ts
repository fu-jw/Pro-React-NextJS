// kind-auth 用于处理授权的文件
// 它会自动创建所需的所有端点，比如：
// api/auth/login
// api/auth/logout
import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";
export const GET = handleAuth();
