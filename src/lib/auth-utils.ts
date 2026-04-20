"use server";

import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

export async function checkAdmin() {
  const cookieStore = await cookies();
  const userIdStr = cookieStore.get("auth_session")?.value;
  if (!userIdStr) return null;
  
  const user = await prisma.user.findUnique({
    where: { id: parseInt(userIdStr) },
    select: { email: true, role: true }
  });

  if (user?.email === "admin@gmail.com" && user?.role === "ADMIN") {
    return user;
  }
  return null;
}
