"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function registerAction(formData: FormData) {
  // ... existing code ...
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { success: false, error: "Semua field harus diisi" };
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return { success: false, error: "Email sudah terdaftar" };
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const role = email.toLowerCase().includes("admin") ? "ADMIN" : "USER";
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, role },
    });

    const cookieStore = await cookies();
    cookieStore.set("auth_session", user.id.toString(), { path: "/", maxAge: 86400 });
    cookieStore.set("user_role", user.role, { path: "/", maxAge: 86400 });
    cookieStore.set("user_name", user.name, { path: "/", maxAge: 86400 });

    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Register Error:", error);
    return { success: false, error: "Terjadi kesalahan saat pendaftaran" };
  }
}

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) return { success: false, error: "Email dan password wajib diisi" };

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return { success: false, error: "Email atau password salah" };
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return { success: false, error: "Email atau password salah" };

    const cookieStore = await cookies();
    cookieStore.set("auth_session", user.id.toString(), { path: "/", maxAge: 86400 });
    cookieStore.set("user_role", user.role, { path: "/", maxAge: 86400 });
    cookieStore.set("user_name", user.name, { path: "/", maxAge: 86400 });

    revalidatePath("/");
    return { success: true, role: user.role };
  } catch (error: any) {
    console.error("Login Error:", error);
    return { success: false, error: "Terjadi kesalahan saat masuk" };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_session");
  cookieStore.delete("user_role");
  cookieStore.delete("user_name");
  
  revalidatePath("/");
  redirect("/login");
}

export async function updateProfileAction(formData: FormData) {
  try {
    const cookieStore = await cookies();
    const userIdStr = cookieStore.get("auth_session")?.value;
    if (!userIdStr) return { success: false, error: "Unauthorized" };
    
    const userId = parseInt(userIdStr);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const bio = formData.get("bio") as string;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { name, email, phone, bio },
    });

    // Update name cookie if changed
    cookieStore.set("user_name", updatedUser.name, { path: "/", maxAge: 86400 });

    revalidatePath("/");
    revalidatePath("/profile/settings");
    
    return { success: true, user: updatedUser };
  } catch (error: any) {
    console.error("Update Profile Error:", error);
    return { success: false, error: error.message || "Failed to update profile" };
  }
}
