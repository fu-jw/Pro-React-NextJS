import { db } from "@/lib/db";

// 通过邮件获取用户
export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// 通过id获取用户
export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};