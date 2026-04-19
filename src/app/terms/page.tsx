import React from "react";

export default function TermsPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 animate-fade-in">
      <h1 className="text-4xl font-extrabold text-foreground mb-10 border-b border-border pb-4">Ketentuan Layanan</h1>
      
      <div className="space-y-8 text-foreground/70 leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">1. Penerimaan Ketentuan</h2>
          <p>
            Dengan mengakses atau menggunakan platform HomeByte, Anda setuju untuk terikat oleh Ketentuan Layanan ini. Jika Anda tidak setuju dengan bagian mana pun dari ketentuan ini, Anda tidak diperbolehkan mengakses layanan kami.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">2. Akun Pengguna</h2>
          <p>
            Saat Anda membuat akun di layanan kami, Anda harus memberikan informasi yang akurat, lengkap, dan terkini setiap saat. Kegagalan untuk melakukannya merupakan pelanggaran terhadap Ketentuan, yang dapat berakibat pada penghentian akun Anda secara segera.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">3. Kekayaan Intelektual</h2>
          <p>
            Layanan beserta konten asli, fitur, dan fungsionalitasnya adalah dan akan tetap menjadi milik eksklusif HomeByte dan pemberi lisensinya. Merek dagang dan identitas visual kami tidak boleh digunakan sehubungan dengan produk atau layanan apa pun tanpa persetujuan tertulis sebelumnya dari HomeByte.
          </p>
        </section>
        
        <p className="text-sm mt-10 pt-10 border-t border-border">
          Terakhir diperbarui: {new Date().toLocaleDateString('id-ID')}
        </p>
      </div>
    </div>
  );
}
