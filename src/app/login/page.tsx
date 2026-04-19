"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BackButton from "@/components/BackButton";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Ambil data mock users
    const existingUsersRaw = localStorage.getItem("homebyte_users");
    const existingUsers = existingUsersRaw ? JSON.parse(existingUsersRaw) : [];

    // Cari user
    const user = existingUsers.find((u: any) => u.email === email && u.password === password);

    if (!user) {
      alert("Akun tidak ditemukan atau password salah. Jika belum memiliki akun, silakan Mendaftar.");
      return;
    }

    // Set cookie untuk autentikasi sistem Proksi
    document.cookie = "auth_session=active; path=/; max-age=86400"; // 1 hari
    document.cookie = `user_role=${user.role}; path=/; max-age=86400`;

    if (user.role === "ADMIN") {
      router.push("/admin");
    } else {
      router.push("/");
    }
    router.refresh();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] bg-gray-50 px-4 py-8 relative">
      <div className="absolute top-6 left-6 md:top-10 md:left-10">
        <BackButton />
      </div>

      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-black mb-2 tracking-tight">Daftar Masuk</h1>
          <p className="text-sm text-gray-500 font-medium">Buka akses eksklusif inventaris HomeByte.</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3 rounded-2xl bg-gray-50/50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all text-black font-semibold"
              placeholder="nama@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3 rounded-2xl bg-gray-50/50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all text-black font-semibold"
              placeholder="••••••••"
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-primary-600 to-primary-500 text-white font-bold py-4 rounded-xl hover:scale-[1.03] active:scale-[0.98] transition-transform duration-200 shadow-xl shadow-primary-600/30"
          >
            Masuk
          </button>
        </form>
        
        <div className="mt-8 text-center text-sm font-medium text-gray-500">
          Belum mempunyai akun? <Link href="/register" className="text-primary-600 font-bold hover:text-primary-700 hover:underline transition-colors block mt-1">Daftar sekarang</Link>
        </div>
      </div>
    </div>
  );
}
