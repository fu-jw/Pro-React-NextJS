"use server";

import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export const admin = async () => {
  const role = await currentRole();

  if (role === UserRole.ADMIN) {
    return {success:"Admin API Route is working!"}
  } else {
    return {error:"Admin API Route is not working!"}
  }
};
