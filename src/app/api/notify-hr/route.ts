import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * POST /api/notify-hr
 * 
 * Menerima pesan dan menyimpannya sebagai notifikasi HR di database.
 * 
 * Body:
 * {
 *   subject: string,
 *   message: string,
 *   senderEmail?: string  // opsional, bisa diambil dari session
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { subject, message, senderEmail } = body;

    // Validasi input
    if (!subject || !message) {
      return NextResponse.json(
        { error: "Field 'subject' dan 'message' wajib diisi." },
        { status: 400 }
      );
    }

    // Simpan notifikasi ke database
    const notification = await prisma.notification.create({
      data: {
        type: "hr",
        subject,
        body: message,
        senderEmail: senderEmail || "anonymous@guest.com",
      },
    });

    return NextResponse.json(
      { ok: true, id: notification.id },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating HR notification:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/notify-hr
 * 
 * Mengambil semua notifikasi HR (untuk dashboard).
 */
export async function GET() {
  try {
    const notifications = await prisma.notification.findMany({
      where: { type: "hr" },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ data: notifications }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching HR notifications:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
