import React from "react";
import prisma from "@/lib/prisma";
import AdminUsersTable from "@/components/AdminUsersTable";
import { checkAdmin } from "@/lib/auth-utils";
import { redirect } from "next/navigation";
import { Users, UserPlus } from "lucide-react";

export default async function AdminUsersPage() {
  const admin = await checkAdmin();
  if (!admin) redirect("/admin");

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-orange-100 text-orange-600 rounded-2xl shadow-sm">
              <Users className="w-5 h-5" />
            </div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Manajemen Pengguna</h1>
          </div>
          <p className="text-gray-500 font-medium">Kelola akses, perbarui role, dan awasi pendaftar HomeByte.</p>
        </div>
      </div>

      <AdminUsersTable initialUsers={users} />
    </div>
  );
}
