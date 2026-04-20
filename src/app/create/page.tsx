"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { createPropertyAction } from "@/lib/actions/propertyActions";

export default function CreateListingPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    if (!formRef.current) return;
    const formData = new FormData(formRef.current);

    // Memanggil Server Action untuk simpan Properti ke DB
    const result = await createPropertyAction({
      title: formData.get("title")?.toString() || "",
      description: "Property listed via agent dashboard.", 
      price: parseFloat(formData.get("price")?.toString() || "0"),
      address: formData.get("address")?.toString() || "",
      city: formData.get("city")?.toString() || "",
      category: (formData.get("category")?.toString() || "HOUSE") as any,
      bedrooms: parseInt(formData.get("bedrooms")?.toString() || "0"),
      bathrooms: parseInt(formData.get("bathrooms")?.toString() || "0"),
      areaSquareMeter: parseFloat(formData.get("area")?.toString() || "0"),
      imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80", // Default placeholder
    });

    if (result.success) {
      setStatus('success');
      formRef.current.reset();
      setTimeout(() => setStatus('idle'), 5000);
    } else {
      setStatus('idle');
      alert("Gagal menerbitkan iklan: " + result.error);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-foreground mb-4">Buat Iklan Baru</h1>
        <p className="text-foreground/60 text-lg">Pasang properti di HomeByte untuk menjangkau ribuan calon pembeli.</p>
      </div>

      <div className="glass p-8 sm:p-10 rounded-3xl border border-border shadow-xl">
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
          {/* General Information */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-foreground border-b border-border pb-2">1. Informasi Umum</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">Judul Properti</label>
                <input name="title" required type="text" placeholder="misal: Vila Modern di Pusat Kota" className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all !text-gray-900 placeholder:text-gray-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Kategori</label>
                <select name="category" required className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all appearance-none cursor-pointer !text-gray-900">
                  <option value="HOUSE">Rumah</option>
                  <option value="APARTMENT">Apartemen</option>
                  <option value="LAND">Tanah</option>
                  <option value="COMMERCIAL">Komersial</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Harga</label>
                <input name="price" required type="number" placeholder="450000" className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all !text-gray-900 placeholder:text-gray-400" />
              </div>
            </div>
          </div>

          {/* Location details */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-foreground border-b border-border pb-2">2. Detail Lokasi</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">Alamat</label>
                <input name="address" required type="text" placeholder="Jl. Utama No. 123" className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all !text-gray-900 placeholder:text-gray-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Kota</label>
                <input name="city" required type="text" placeholder="Jakarta, Indonesia" className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all !text-gray-900 placeholder:text-gray-400" />
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-foreground border-b border-border pb-2">3. Spesifikasi Properti</h3>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Kamar Tidur</label>
                <input name="bedrooms" required type="number" min="0" placeholder="3" className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all !text-gray-900 placeholder:text-gray-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Kamar Mandi</label>
                <input name="bathrooms" required type="number" min="0" placeholder="2" className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all !text-gray-900 placeholder:text-gray-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Luas (m²)</label>
                <input name="area" required type="number" min="0" placeholder="150" className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all !text-gray-900 placeholder:text-gray-400" />
              </div>
            </div>
          </div>

          <div className="pt-6 space-y-4">
            <div className="flex gap-4">
              <Link href="/" className="px-8 py-4 bg-background border border-border text-foreground font-bold rounded-xl hover:bg-foreground/5 btn-transition text-center">
                Batal
              </Link>
              <button 
                type="submit" 
                disabled={status === 'loading'}
                className="flex-1 py-4 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 shadow-lg shadow-primary-600/30 disabled:opacity-70 disabled:cursor-not-allowed hover:-translate-y-1 btn-transition flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Menerbitkan...</span>
                  </>
                ) : "Terbitkan Iklan"}
              </button>
            </div>

            {status === 'success' && (
              <div className="text-center p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-600 font-medium animate-fade-in shadow-sm">
                ✅ Iklan berhasil diterbitkan dan sedang dalam proses moderasi!
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
