import React from "react";
import prisma from "@/lib/prisma";
import { checkAdmin } from "@/lib/auth-utils";
import { redirect } from "next/navigation";
import { MessageSquare, Mail, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function AdminMessagesPage() {
  const admin = await checkAdmin();
  if (!admin) redirect("/login");

  // Ambil semua notifikasi (pesan masuk) + inquiry
  const [notifications, inquiries] = await Promise.all([
    prisma.notification.findMany({
      where: { type: "admin" },
      orderBy: { createdAt: "desc" },
    }),
    prisma.inquiry.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { name: true, email: true } },
        property: { select: { title: true } },
      },
    }),
  ]);

  const totalMessages = notifications.length + inquiries.length;

  return (
    <div className="w-full animate-fade-in space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">
            Pesan Masuk
          </h1>
          <p className="text-gray-500 font-medium">
            Total{" "}
            <span className="text-primary-600 font-bold">{totalMessages}</span>{" "}
            pesan dari pengunjung dan calon pembeli.
          </p>
        </div>
        <div className="flex bg-white px-6 py-3 rounded-2xl border border-primary-50 shadow-sm items-center">
          <MessageSquare className="w-5 h-5 text-primary-600 mr-2" />
          <span className="text-sm font-black text-gray-700 tracking-wide uppercase">
            {totalMessages} Pesan
          </span>
        </div>
      </div>

      {/* Notifikasi dari Form Contact & Hubungi Agen */}
      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50 bg-gray-50/30">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary-500" />
            Notifikasi Langsung
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            Pesan yang dikirim dari form Hubungi Kami & Hubungi Agen
          </p>
        </div>

        {notifications.length > 0 ? (
          <div className="divide-y divide-gray-50">
            {notifications.map((n: any) => (
              <div
                key={n.id}
                className="p-6 hover:bg-gray-50/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-primary-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900 text-lg">
                        {n.subject}
                      </p>
                      <p className="text-gray-600 mt-1 leading-relaxed">
                        {n.body}
                      </p>
                      <div className="flex items-center gap-4 mt-3">
                        <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {n.senderEmail}
                        </span>
                        <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(n.createdAt).toLocaleString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-primary-50 text-primary-600 flex-shrink-0">
                    {n.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center text-gray-400 italic">
            Belum ada notifikasi langsung.
          </div>
        )}
      </div>

      {/* Inquiry dari halaman properti */}
      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50 bg-gray-50/30">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-orange-500" />
            Inquiry Properti
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            Pertanyaan dari calon pembeli terkait properti tertentu
          </p>
        </div>

        {inquiries.length > 0 ? (
          <div className="divide-y divide-gray-50">
            {inquiries.map((inq: any) => (
              <div
                key={inq.id}
                className="p-6 hover:bg-gray-50/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-5 h-5 text-orange-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900">
                        {inq.message}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 mt-3">
                        {inq.user && (
                          <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {inq.user.name} ({inq.user.email})
                          </span>
                        )}
                        {inq.property && (
                          <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-bold">
                            {inq.property.title}
                          </span>
                        )}
                        <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(inq.createdAt).toLocaleString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-orange-50 text-orange-600 flex-shrink-0">
                    inquiry
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center text-gray-400 italic">
            Belum ada inquiry properti.
          </div>
        )}
      </div>
    </div>
  );
}
