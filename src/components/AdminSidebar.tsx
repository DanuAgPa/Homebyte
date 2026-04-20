"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Home, 
  Users, 
  Package, 
  Globe,
  LogOut,
  ChevronRight
} from "lucide-react";
import { logoutAction } from "@/lib/actions/authActions";

export default function AdminSidebar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    await logoutAction();
  };

  const menuItems = [
    { name: "Dashboard", href: "/admin", icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: "Kelola Properti", href: "/admin/properties", icon: <Home className="w-5 h-5" /> },
    { name: "Daftar Pengguna", href: "/admin/users", icon: <Users className="w-5 h-5" /> },
    { name: "Pantau SCM", href: "/admin/scm", icon: <Package className="w-5 h-5" /> },
  ];

  return (
    <aside className="w-full md:w-80 bg-gray-900 text-white p-8 shadow-2xl flex-shrink-0 z-10 flex flex-col justify-between border-r border-white/5">
      <div>
        <div className="mb-12 pt-2 border-b border-white/5 pb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-primary-500 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/20">
              <span className="text-black font-black text-xl">H</span>
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tighter text-white">HomeByte</h2>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">Management Space</p>
            </div>
          </div>
        </div>
        
        <nav className="space-y-3">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name}
                href={item.href} 
                className={`group flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 font-bold ${
                  isActive 
                    ? "bg-primary-600 text-white shadow-xl shadow-primary-600/20 translate-x-2" 
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="flex items-center">
                  <span className={`mr-4 transition-transform group-hover:scale-110 ${isActive ? "text-white" : "text-gray-500"}`}>
                    {item.icon}
                  </span>
                  {item.name}
                </div>
                {isActive && <ChevronRight className="w-4 h-4 animate-in slide-in-from-left-2" />}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-12 space-y-4">
        <Link 
          href="/" 
          className="flex items-center justify-center gap-2 w-full px-5 py-4 rounded-2xl bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-all shadow-lg active:scale-95"
        >
          <Globe className="w-4 h-4" />
          Lihat Website
        </Link>
        <button 
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 w-full px-5 py-4 rounded-2xl bg-white/5 text-red-400 font-black text-xs uppercase tracking-widest hover:bg-red-500/10 transition-all"
        >
          <LogOut className="w-4 h-4" />
          Keluar Panel
        </button>
      </div>
    </aside>
  );
}
