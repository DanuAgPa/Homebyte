import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 animate-fade-in">
      <h1 className="text-4xl font-extrabold text-foreground mb-10 border-b border-border pb-4">Kebijakan Privasi</h1>
      
      <div className="space-y-8 text-foreground/70 leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">1. Informasi yang Kami Kumpulkan</h2>
          <p>
            Saat Anda menggunakan HomeByte, kami dapat mengumpulkan informasi pribadi seperti nama, alamat email, nomor telepon, dan data lokasi saat Anda mendaftarkan akun, menyimpan properti, atau mengirimkan pertanyaan kepada agen kami.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">2. Bagaimana Kami Menggunakan Informasi Anda</h2>
          <p>
            Kami menggunakan informasi yang kami kumpulkan untuk mengoperasikan, memelihara, dan menyediakan fitur-fitur platform HomeByte kepada Anda. Kami juga dapat menggunakan informasi Anda untuk berkomunikasi langsung dengan Anda, seperti mengirimkan pembaruan terkait iklan yang Anda simpan.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">3. Keamanan Data</h2>
          <p>
            HomeByte menggunakan pengamanan fisik, manajerial, dan teknis yang wajar secara komersial untuk menjaga integritas dan keamanan informasi pribadi Anda. Namun, kami tidak dapat menjamin bahwa pihak ketiga yang tidak berwenang tidak akan pernah dapat mengalahkan langkah-langkah keamanan kami.
          </p>
        </section>

        <p className="text-sm mt-10 pt-10 border-t border-border">
          Terakhir diperbarui: {new Date().toLocaleDateString('id-ID')}
        </p>
      </div>
    </div>
  );
}
