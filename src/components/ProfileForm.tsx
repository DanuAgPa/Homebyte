"use client";

import React, { useState } from "react";
import { User, Phone, Mail, FileText, Save, CheckCircle, AlertCircle } from "lucide-react";
import { updateProfileAction } from "@/lib/actions/authActions";

interface ProfileFormProps {
  initialData: {
    name: string;
    email: string;
    phone: string | null;
    bio: string | null;
  };
}

export default function ProfileForm({ initialData }: ProfileFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    
    const formData = new FormData(e.currentTarget);
    const result = await updateProfileAction(formData);

    if (result.success) {
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    } else {
      setStatus('error');
      setErrorMessage(result.error || "Gagal memperbarui profil");
    }
  };

  return (
    <div className="glass rounded-3xl p-8 border border-border shadow-xl">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Nama Lengkap */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-foreground/80 ml-1">
              <User size={16} className="text-primary-600" />
              Nama Lengkap
            </label>
            <input 
              name="name"
              type="text"
              defaultValue={initialData.name}
              placeholder="Nama Lengkap Anda"
              className="w-full px-5 py-4 rounded-2xl bg-background border border-border focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
              required
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-foreground/80 ml-1">
              <Mail size={16} className="text-primary-600" />
              Alamat Email
            </label>
            <input 
              name="email"
              type="email"
              defaultValue={initialData.email}
              placeholder="email@contoh.com"
              className="w-full px-5 py-4 rounded-2xl bg-background border border-border focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
              required
            />
          </div>

          {/* Nomor Telepon */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-foreground/80 ml-1">
              <Phone size={16} className="text-primary-600" />
              Nomor Telepon
            </label>
            <input 
              name="phone"
              type="tel"
              defaultValue={initialData.phone || ""}
              placeholder="+62 812..."
              className="w-full px-5 py-4 rounded-2xl bg-background border border-border focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
            />
          </div>
        </div>

        {/* Bio / Tentang Saya */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-bold text-foreground/80 ml-1">
            <FileText size={16} className="text-primary-600" />
            Bio / Tentang Saya
          </label>
          <textarea 
            name="bio"
            rows={4}
            defaultValue={initialData.bio || ""}
            placeholder="Ceritakan sedikit tentang Anda..."
            className="w-full px-5 py-4 rounded-2xl bg-background border border-border focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none resize-none"
          ></textarea>
        </div>

        {/* Feedback Notifications */}
        {status === 'success' && (
          <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl text-green-600 animate-in fade-in slide-in-from-top-2 duration-300">
            <CheckCircle size={20} />
            <p className="text-sm font-bold">Profil berhasil diperbarui!</p>
          </div>
        )}

        {status === 'error' && (
          <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-600 animate-in fade-in slide-in-from-top-2 duration-300">
            <AlertCircle size={20} />
            <p className="text-sm font-bold">{errorMessage}</p>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <button 
            type="submit"
            disabled={status === 'loading'}
            className="flex items-center gap-2 px-10 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl font-bold shadow-lg shadow-primary-600/20 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-95"
          >
            {status === 'loading' ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Menyimpan...</span>
              </div>
            ) : (
              <>
                <Save size={18} />
                <span>Simpan Perubahan</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
