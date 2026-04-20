import React from "react";
import prisma from "@/lib/prisma";
import SCMClient from "@/components/SCMClient";
import { checkAdmin } from "@/lib/auth-utils";
import { redirect } from "next/navigation";
import { Package } from "lucide-react";

export default async function AdminSCMPage() {
  const admin = await checkAdmin();
  if (!admin) redirect("/admin");

  // Fetch all SCM Data
  const [suppliers, inventory, shipments, properties] = await Promise.all([
    prisma.supplier.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.inventory.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.shipment.findMany({ 
      include: { property: true },
      orderBy: { createdAt: "desc" } 
    }),
    prisma.property.findMany({ 
      select: { id: true, title: true, city: true },
      orderBy: { createdAt: "desc" } 
    })
  ]);

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Educational Header */}
      <div className="bg-white rounded-[2.5rem] p-10 md:p-14 border border-white shadow-xl shadow-slate-200/50 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform duration-500">
           <Package className="w-48 h-48" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-primary-100 text-primary-600 rounded-2xl">
              <Package className="w-6 h-6" />
            </div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tighter">Layanan SCM</h1>
          </div>
          
          <div className="w-20 h-1.5 bg-primary-500 rounded-full mb-8"></div>

          <p className="text-gray-500 text-lg leading-relaxed max-w-4xl font-medium">
            SCM HomeByte mengelola aliran material dan jasa perawatan (<span className="text-gray-900 font-bold">Perencanaan, Pengadaan, Inventaris, dan Pengiriman</span>) untuk menjaga kualitas unit properti agar tetap prima bagi pelanggan.
          </p>
        </div>
      </div>

      {/* Tabbed Interface Wrapper */}
      <SCMClient 
        initialSuppliers={suppliers} 
        initialInventory={inventory} 
        initialShipments={shipments}
        properties={properties}
      />
    </div>
  );
}
