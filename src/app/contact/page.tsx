"use client";

import React, { useState, useRef } from "react";
import { createInquiryAction } from "@/lib/actions/inquiryActions";

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Mengambil data dari form
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const message = formData.get("message")?.toString() || "";
    const name = formData.get("name")?.toString() || "";
    const email = formData.get("email")?.toString() || "";

    // Memanggil Server Action untuk simpan ke DB
    const result = await createInquiryAction({
      message: `[Contact Form] From: ${name} (${email}) - ${message}`,
      name,
      email
    });

    if (result.success) {
      setStatus('success');
      formRef.current.reset();
      // Reset status sukses setelah 5 detik
      setTimeout(() => setStatus('idle'), 5000);
    } else {
      setStatus('idle');
      alert("Gagal mengirim pesan: " + result.error);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-foreground mb-4">Hubungi Kami</h1>
        <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
          Punya pertanyaan atau ingin bermitra dengan HomeByte? Kirimkan pesan kepada kami dan kami akan menghubungi Anda sesegera mungkin.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="glass p-8 rounded-3xl shadow-lg border border-border h-fit">
          <h3 className="text-2xl font-bold text-foreground mb-6">Kantor Kami</h3>
          <div className="space-y-4 text-foreground/70">
            <p className="flex items-center">
              <span className="font-bold mr-2 text-foreground">Alamat:</span>
              Jl. Silicon Valley No. 123, Suite 400<br/>San Francisco, CA 94107
            </p>
            <p className="flex items-center">
              <span className="font-bold mr-2 text-foreground">Email:</span>
              hello@homebyte.com
            </p>
            <p className="flex items-center">
              <span className="font-bold mr-2 text-foreground">Telepon:</span>
              +1 (555) 123-4567
            </p>
            <p className="flex items-center">
              <span className="font-bold mr-2 text-foreground">Jam Kerja:</span>
              Sen - Jum, 09:00 - 18:00 PST
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="glass p-8 rounded-3xl shadow-lg border border-border">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Nama</label>
              <input 
                name="name"
                required
                type="text" 
                placeholder="Nama Anda" 
                className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <input 
                name="email"
                required
                type="email" 
                placeholder="nama@contoh.com" 
                className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Pesan</label>
              <textarea 
                name="message"
                required
                rows={5} 
                placeholder="Bagaimana kami bisa membantu Anda?" 
                className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all resize-none"
              ></textarea>
            </div>
            
            <div className="space-y-4">
              <button 
                type="submit" 
                disabled={status === 'loading'}
                className="w-full py-4 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-600/30 disabled:opacity-70 disabled:cursor-not-allowed btn-transition flex items-center justify-center gap-2"
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
                <div className="text-center p-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-600 font-medium animate-fade-in">
                  ✅ Pesan berhasil terkirim!
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
