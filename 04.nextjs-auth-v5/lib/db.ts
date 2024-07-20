import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}

// 生产阶段如下写法，开发阶段不要！！！
// 因为 NextJS 是热重载的，有任何修改都会重新创建一个新的客户端 
// export const db = new PrismaClient();