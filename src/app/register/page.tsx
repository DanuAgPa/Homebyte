"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerAction } from "@/lib/actions/authActions";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    // Validasi sederhana
    if (!name || !email || !password) {
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    const result = await registerAction(formData);

    if (result.success) {
      alert("Berhasil mendaftar akun! Anda akan diarahkan ke Beranda.");
      router.push("/");
      router.refresh();
    } else {
      setError(result.error || "Gagal mendaftar");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] bg-gray-50 px-4 py-8 relative">

      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-gray-100 mt-10 md:mt-0">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-black mb-2 tracking-tight">Buat Akun</h1>
          <p className="text-sm text-gray-500 font-medium">Lengkapi form berikut untuk bergabung dengan HomeByte.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm font-semibold rounded-2xl animate-fade-in text-center">
            ⚠️ {error}
          </div>
        )}
        
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
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-gray-900 to-black text-white font-bold py-4 rounded-xl hover:scale-[1.03] active:scale-[0.98] transition-transform duration-200 shadow-xl shadow-black/20 mt-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Mendaftarkan...</span>
              </>
            ) : "Daftar Sekarang"}
          </button>
        </form>
        
        <div className="mt-8 text-center text-sm font-medium text-gray-500">
          Sudah mempunyai akun? <Link href="/login" className="text-primary-600 font-bold hover:text-primary-700 hover:underline transition-colors block mt-1">Daftar masuk sekarang</Link>
        </div>
      </div>
    </div>
  );
}
