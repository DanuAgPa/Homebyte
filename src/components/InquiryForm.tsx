"use client";

import React, { useState, useRef } from "react";
import SaveToWishlistButton from "@/components/SaveToWishlistButton";
import { createInquiryAction } from "@/lib/actions/inquiryActions";

interface InquiryFormProps {
  propertyId: string;
}

export default function InquiryForm({ propertyId }: InquiryFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const message = formData.get("message")?.toString() || "";
    const name = formData.get("name")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const tel = formData.get("tel")?.toString() || "";

    // Memanggil Server Action untuk simpan ke DB
    const result = await createInquiryAction({
      message: `[Property Inquiry] From: ${name} (${email}, Tel: ${tel}) - ${message}`,
      propertyId,
      name,
      email
    });

    if (result.success) {
      setStatus('success');
      formRef.current.reset();
      setTimeout(() => setStatus('idle'), 5000);
    } else {
      setStatus('idle');
      alert("Gagal mengirim pesan: " + result.error);
    }
  };

  return (
    <div className="sticky top-28 glass p-6 rounded-3xl shadow-xl border border-border/50 animate-[slideUp_0.8s_ease-out_forwards]">
      <h3 className="text-xl font-bold text-foreground mb-6">Hubungi Agen</h3>
      <div className="flex items-center mb-6">
        <div className="w-14 h-14 bg-gradient-to-br from-primary-400 to-accent-500 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-md">
          JD
        </div>
        <div className="ml-4">
          <p className="font-bold text-foreground">Jane Doe</p>
          <p className="text-sm text-foreground/60">Agen Real Estat Premium</p>
        </div>
      </div>
      
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input 
            name="name"
            required
            type="text" 
            placeholder="Nama Anda" 
            className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all" 
          />
        </div>
        <div>
          <input 
            name="email"
            required
            type="email" 
            placeholder="Alamat Email" 
            className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all" 
          />
        </div>
        <div>
          <input 
            name="tel"
            required
            type="tel" 
            placeholder="Nomor Telepon" 
            className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all" 
          />
        </div>
        <div>
          <textarea 
            name="message"
            required
            rows={4} 
            placeholder="Saya tertarik dengan properti ini..." 
            className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
          ></textarea>
        </div>
        
        <div className="space-y-4">
          <button 
            type="submit" 
            disabled={status === 'loading'}
            className="w-full py-4 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-600/30 disabled:opacity-70 disabled:cursor-not-allowed btn-transition flex items-center justify-center gap-2"
          >
            {status === 'loading' ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Mengirim...</span>
              </>
            ) : "Kirim Pesan"}
          </button>

          {status === 'success' && (
            <div className="text-center p-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-600 font-medium animate-fade-in shadow-sm">
              ✅ Pesan berhasil terkirim ke agen!
            </div>
          )}

          <SaveToWishlistButton propertyId={propertyId} />
        </div>
      </form>
    </div>
  );
}
