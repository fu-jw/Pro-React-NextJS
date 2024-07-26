import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const role = await currentRole();

  if (role === UserRole.ADMIN) {
    return new NextResponse(JSON.stringify({ role }), { status: 200 });
  }

  return new NextResponse(null, { status: 403 });
}
