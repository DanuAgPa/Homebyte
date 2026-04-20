import React from "react";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { ArrowRight, Package, Users, Home, Clock, ChevronRight } from "lucide-react";
import { checkAdmin } from "@/lib/auth-utils";
import { redirect } from "next/navigation";

export default async function AdminDashboardPage() {
  const admin = await checkAdmin();
  if (!admin) redirect("/login");

  // Fetch Stats
  const [propCount, userCount, supplierCount, inventoryCount, shipmentCount] = await Promise.all([
    prisma.property.count(),
    prisma.user.count(),
    prisma.supplier.count(),
    prisma.inventory.count(),
    prisma.shipment.count(),
  ]);

  // Fetch Recents
  const [recentUsers, recentProperties, recentShipments] = await Promise.all([
    prisma.user.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.property.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.shipment.findMany({ 
      include: { property: true },
      orderBy: { updatedAt: "desc" }, 
      take: 5 
    }),
  ]);

  return (
    <div className="w-full animate-fade-in space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">Dashboard Overview</h1>
          <p className="text-gray-500 font-medium">Selamat datang, <span className="text-primary-600 font-bold">{admin.email}</span>. Berikut ringkasan platform hari ini.</p>
        </div>
        <div className="flex bg-white px-6 py-3 rounded-2xl border border-primary-50 shadow-sm items-center">
          <div className="w-2.5 h-2.5 bg-green-500 rounded-full mr-3 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
          <span className="text-sm font-black text-gray-700 tracking-wide uppercase">System Healthy</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard 
          title="Unit Properti" 
          value={propCount} 
          icon={<Home className="w-6 h-6 text-primary-600" />}
          bgColor="bg-primary-50"
          link="/admin/properties"
        />
        <StatCard 
          title="Total Pengguna" 
          value={userCount} 
          icon={<Users className="w-6 h-6 text-orange-600" />}
          bgColor="bg-orange-50"
          link="/admin/users"
        />
        <StatCard 
          title="Rantai Pasok (SCM)" 
          value={inventoryCount + shipmentCount} 
          icon={<Package className="w-6 h-6 text-blue-600" />}
          bgColor="bg-blue-50"
          link="/admin/scm"
          footer="Audit & Logistik"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Recent Users List */}
        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-400" />
              Pendaftar Terbaru
            </h3>
            <Link href="/admin/users" className="text-sm font-black text-primary-600 hover:underline flex items-center gap-1 uppercase tracking-widest">
              Kelola <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentUsers.map((u: any) => (
              <div key={u.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center font-bold text-gray-500">{u.name.charAt(0)}</div>
                  <div>
                    <p className="font-bold text-gray-900">{u.name}</p>
                    <p className="text-xs text-gray-400">{u.email}</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${u.role === 'ADMIN' ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-500'}`}>
                  {u.role}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Shipments List (SCM Management) */}
        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Package className="w-5 h-5 text-gray-400" />
              Logistik Terkini
            </h3>
            <Link href="/admin/scm" className="text-sm font-black text-primary-600 hover:underline flex items-center gap-1 uppercase tracking-widest">
              Pantau SCM <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentShipments.length > 0 ? recentShipments.map((s: any) => (
              <div key={s.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold overflow-hidden ${s.status === 'DELIVERED' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 line-clamp-1">{s.property.title}</p>
                    <p className="text-xs text-gray-400 uppercase font-black tracking-tighter">{s.status}</p>
                  </div>
                </div>
                <div className="text-[10px] font-black text-gray-400 uppercase">
                  {new Date(s.estimatedDate).toLocaleDateString('id-ID')}
                </div>
              </div>
            )) : (
              <div className="p-12 text-center text-gray-400 italic">Belum ada aktivitas pengiriman.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, bgColor, footer, link }: any) {
  return (
    <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-125 transition-transform duration-700">
         {icon}
      </div>
      <div className="flex justify-between items-start mb-10">
        <div className={`p-5 ${bgColor} rounded-2xl shadow-inner group-hover:rotate-6 transition-all`}>
          {icon}
        </div>
        {link && (
          <Link href={link} className="p-3 bg-gray-50 hover:bg-gray-900 hover:text-white rounded-2xl text-gray-400 transition-all shadow-sm">
            <ArrowRight className="w-6 h-6" />
          </Link>
        )}
      </div>
      <div>
        <p className="text-gray-400 font-black text-xs uppercase tracking-[0.2em] mb-2">{title}</p>
        <div className="text-6xl font-black text-gray-900 leading-none tracking-tighter">{Intl.NumberFormat('en-US').format(value)}</div>
      </div>
      {footer && (
        <div className="mt-8 pt-8 border-t border-gray-50 flex items-center text-xs text-gray-400 font-bold uppercase tracking-widest">
           {footer}
        </div>
      )}
    </div>
  );
}
