"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

/**
 * Server Action: Mengirim pesan/notifikasi ke Admin.
 * Pesan disimpan ke tabel Notification dengan type = "admin".
 */
export async function sendNotificationToAdmin(data: {
  subject: string;
  message: string;
}) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("auth_session")?.value;

    // Ambil email pengirim dari database jika user sudah login
    let senderEmail = "anonymous@guest.com";
    if (userId) {
      const user = await prisma.user.findUnique({
        where: { id: parseInt(userId) },
        select: { email: true },
      });
      if (user) senderEmail = user.email;
    }

    const notification = await prisma.notification.create({
      data: {
        type: "admin",
        subject: data.subject,
        body: data.message,
        senderEmail,
      },
    });

    console.log("Admin Notification created:", notification.id);

    // Revalidate halaman admin agar data baru langsung muncul
    revalidatePath("/admin");
    revalidatePath("/admin/messages");

    return { success: true, id: notification.id };
  } catch (error: any) {
    console.error("Failed to send Admin notification:", error);
    return {
      success: false,
      error: error.message || "Gagal mengirim notifikasi ke Admin",
    };
  }
}

/**
 * Server Action: Mengambil semua notifikasi Admin (untuk dashboard).
 */
export async function getAdminNotifications() {
  try {
    const notifications = await prisma.notification.findMany({
      where: { type: "admin" },
      orderBy: { createdAt: "desc" },
    });

    return { success: true, data: notifications };
  } catch (error: any) {
    console.error("Failed to fetch Admin notifications:", error);
    return {
      success: false,
      error: error.message || "Gagal mengambil notifikasi Admin",
    };
  }
}
