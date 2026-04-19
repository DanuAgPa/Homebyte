"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BackButton from "@/components/BackButton";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasi sederhana
    if (!name || !email || !password) return;

    // Ambil data users dari localStorage yang sudah ada (mock DB lokal)
    const existingUsersRaw = localStorage.getItem("homebyte_users");
    const existingUsers = existingUsersRaw ? JSON.parse(existingUsersRaw) : [];

    // Cek apakah email sudah terdaftar
    const isEmailExist = existingUsers.some((u: any) => u.email === email);
    if (isEmailExist) {
      alert("Email sudah terdaftar. Silakan menuju halaman Login.");
      return;
    }

    // Role dummy logic berdasarkan domain / nama admin
    const role = email.toLowerCase().includes("admin") ? "ADMIN" : "USER";

    const newUser = {
      name,
      email,
      password, // Di sistem nyata, password ini harus di-hash (bcrypt)
      role,
      createdAt: new Date().toISOString()
    };

    // Simpan array user baru ke localStorage
    localStorage.setItem("homebyte_users", JSON.stringify([...existingUsers, newUser]));

    // Selesai registrasi, redirect ke login
    alert("Berhasil mendaftar akun! Silakan login untuk memulai.");
    router.push("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] bg-gray-50 px-4 py-8 relative">
      <div className="absolute top-6 left-6 md:top-10 md:left-10">
        <BackButton />
      </div>

      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-gray-100 mt-10 md:mt-0">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-black mb-2 tracking-tight">Buat Akun</h1>
          <p className="text-sm text-gray-500 font-medium">Lengkapi form berikut untuk bergabung dengan HomeByte.</p>
        </div>
        
        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Nama Lengkap</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-5 py-3 rounded-2xl bg-gray-50/50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all text-black font-semibold"
              placeholder="John Doe"
            />
          </div>
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
            className="w-full bg-gradient-to-r from-gray-900 to-black text-white font-bold py-4 rounded-xl hover:scale-[1.03] active:scale-[0.98] transition-transform duration-200 shadow-xl shadow-black/20 mt-2"
          >
            Daftar Sekarang
          </button>
        </form>
        
        <div className="mt-8 text-center text-sm font-medium text-gray-500">
          Sudah mempunyai akun? <Link href="/login" className="text-primary-600 font-bold hover:text-primary-700 hover:underline transition-colors block mt-1">Daftar masuk sekarang</Link>
        </div>
      </div>
    </div>
  );
}
