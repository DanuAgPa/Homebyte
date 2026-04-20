"use client";

import React from "react";
import Link from "next/link";
import { LogOut, LayoutDashboard } from "lucide-react";
import { logoutAction } from "@/lib/actions/authActions";

export default function AdminNavbar() {
  const handleLogout = async () => {
    await logoutAction();
  };

  return (
    <header className="sticky top-0 w-full bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 z-40 shadow-sm shrink-0">
      <div className="flex items-center gap-6">
        <Link href="/admin" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center text-white font-bold shadow-md group-hover:scale-105 transition-all">
            H
          </div>
          <span className="font-bold text-lg tracking-tight text-gray-900 hidden sm:block">
            HomeByte
          </span>
        </Link>
        
        <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>
        
        <Link href="/admin" className="hidden sm:flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-primary-600 transition-colors">
          <LayoutDashboard className="w-4 h-4" />
          Dashboard
        </Link>
      </div>

      <div className="flex justify-end flex-1">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-100"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </header>
  );
}
