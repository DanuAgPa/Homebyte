import React from "react";

export default function AboutPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 animate-fade-in">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">Tentang HomeByte</h1>
        <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
          Kami mendefinisikan ulang pengalaman real estat dengan menggabungkan teknologi modern dengan kurasi properti premium.
        </p>
      </div>
      
      <div className="glass p-10 rounded-3xl shadow-xl mt-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">Misi Kami</h2>
        <p className="text-foreground/70 leading-relaxed mb-8">
          Di HomeByte, misi kami adalah memberdayakan pembeli, penjual, dan agen dengan platform yang mulus dan sangat estetik. Kami percaya bahwa menemukan rumah idaman bukan hanya sekadar transaksi; itu harus menjadi sebuah pengalaman.
        </p>

        <h2 className="text-2xl font-bold text-foreground mb-4">Mengapa Memilih Kami?</h2>
        <ul className="list-disc pl-5 space-y-3 text-foreground/70">
          <li><strong>Iklan Premium:</strong> Kami hanya mengkurasi properti terbaik di lokasi-lokasi kelas atas.</li>
          <li><strong>Performa Tinggi:</strong> Dibangun dengan teknologi mutakhir untuk memastikan pengalaman browsing yang sangat cepat.</li>
          <li><strong>Desain Indah:</strong> Antarmuka kami dirancang untuk fokus sepenuhnya pada properti, memberikan sorotan yang layak mereka dapatkan.</li>
        </ul>
      </div>
    </div>
  );
}
