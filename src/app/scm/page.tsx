import React from "react";
import Link from "next/link";
import { Package } from "lucide-react";

export default function SCMPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10 md:p-20 relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary-100 text-primary-600 rounded-2xl">
                <Package className="w-6 h-6" />
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-black tracking-tighter">Layanan SCM</h1>
            </div>
            
            <div className="w-20 h-1.5 bg-primary-500 rounded-full mb-10"></div>

            <p className="text-xl text-gray-500 mb-16 font-medium leading-relaxed max-w-3xl">
              Kami memastikan transparansi, efisiensi waktu, dan keunggulan kualitas dari pengadaan bahan baku hingga penyerahan kunci di tangan pelanggan melalui sistem tata kelola modern kami.
            </p>

            <div className="space-y-8">
              {/* 1. Hulu (Upstream) */}
              <div className="flex flex-col md:flex-row gap-6 items-start group">
                <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 text-blue-600 font-extrabold text-2xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg shadow-blue-100/50">1</div>
                <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex-1">
                  <h2 className="text-2xl font-bold text-black mb-1">Tahap Hulu (Upstream)</h2>
                  <h3 className="text-blue-600 font-bold mb-4">Pengadaan Lahan & Pemilihan Supplier</h3>
                  <p className="text-gray-700 leading-relaxed font-medium">
                    Tahap ini fokus pada akuisisi lahan yang strategis beserta kelengkapan legalitas awal perusahaan. Kami menyeleksi supplier bahan bangunan premium (seperti baja, semen, dan interior) secara ketat untuk menjamin durabilitas serta estetik berkualitas tinggi.
                  </p>
                </div>
              </div>

              {/* 2. Internal / Produksi */}
              <div className="flex flex-col md:flex-row gap-6 items-start group">
                <div className="bg-orange-100 w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 text-orange-600 font-extrabold text-2xl group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300 shadow-lg shadow-orange-100/50">2</div>
                <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex-1">
                  <h2 className="text-2xl font-bold text-black mb-1">Tahap Produksi (Internal)</h2>
                  <h3 className="text-orange-600 font-bold mb-4">Konstruksi Proyek Oleh Tim Developer</h3>
                  <p className="text-gray-700 leading-relaxed font-medium">
                    Kontraktor di bawah manajemen developer membangun infrastruktur sesuai grand design arsitek. Proses produksi ditinjau oleh Quality Control harian guna menghindari masalah fatal konstruksi di masa depan dan menjaga timeline penyelesaian yang disiplin.
                  </p>
                </div>
              </div>

              {/* 3. Hilir (Downstream) */}
              <div className="flex flex-col md:flex-row gap-6 items-start group">
                <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 text-green-600 font-extrabold text-2xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg shadow-green-100/50">3</div>
                <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex-1">
                  <h2 className="text-2xl font-bold text-black mb-1">Tahap Hilir (Downstream)</h2>
                  <h3 className="text-green-600 font-bold mb-4">Pemasaran, KPR & Serah Terima</h3>
                  <p className="text-gray-700 leading-relaxed font-medium">
                    Properti disajikan kepada agen maupun website properti kami untuk segera dipasarkan. Melanjutkan kemitraan pembiayaan bank (KPR), kami membimbing Customer melalui proses akad hingga mencapai tujuan akhir rantai pasok yaitu: "Serah Terima Kunci" ke pembeli.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-14 text-center p-8 bg-gray-50 rounded-3xl border border-gray-100">
              <h3 className="text-xl font-bold text-black mb-4">Ingin berkolaborasi secara internal?</h3>
              <Link href="/contact" className="inline-block bg-black text-white font-bold px-10 py-4 rounded-xl hover:bg-gray-800 transition-transform hover:scale-105 shadow-xl shadow-black/20">
                Lakukan Penawaran
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
