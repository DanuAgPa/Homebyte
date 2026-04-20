import React from "react";
import prisma from "@/lib/prisma";
import AdminPropertiesTable from "@/components/AdminPropertiesTable";
import { checkAdmin } from "@/lib/auth-utils";
import { redirect } from "next/navigation";
import { Home, Plus } from "lucide-react";
import Link from "next/link";

export default async function AdminPropertiesPage() {
  const admin = await checkAdmin();
  if (!admin) redirect("/admin");

  const properties = await prisma.property.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-primary-100 text-primary-600 rounded-2xl shadow-sm">
              <Home className="w-5 h-5" />
            </div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Katalog Properti</h1>
          </div>
          <p className="text-gray-500 font-medium">Tambah unit baru, edit harga, atau hapus listing properti HomeByte.</p>
        </div>
        
        <Link 
          href="/create"
          className="flex items-center gap-2 px-6 py-3.5 bg-gray-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-black/10 active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Listing Baru
        </Link>
      </div>

      <AdminPropertiesTable initialProperties={properties} />
    </div>
  );
}
