import React from "react";

export default function ContactPage() {
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
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Nama</label>
              <input type="text" placeholder="Nama Anda" className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <input type="email" placeholder="nama@contoh.com" className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Pesan</label>
              <textarea rows={5} placeholder="Bagaimana kami bisa membantu Anda?" className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all resize-none"></textarea>
            </div>
            <button type="submit" className="w-full py-4 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-600/30 btn-transition">
              Kirim Pesan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
