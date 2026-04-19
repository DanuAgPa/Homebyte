import React from "react";

export default function AdminDashboardPage() {
  return (
    <div className="w-full animate-fade-in">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-black mb-2">Ikhtisar Panel Admin</h1>
          <p className="text-gray-600 font-medium tracking-wide">Kelola inventaris properti, pendaftar, dan alur SCM Anda hari ini.</p>
        </div>
        <div className="hidden md:flex bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm items-center">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
          <span className="text-sm font-bold text-gray-700">Sistem Berjalan</span>
        </div>
      </div>

      {/* Cards Laporan */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <p className="text-gray-500 font-semibold mb-1">Total Properti</p>
          <div className="text-4xl font-extrabold text-black">128</div>
          <div className="mt-4 flex items-center text-sm text-green-600 font-bold">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            +12 hari ini
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <p className="text-gray-500 font-semibold mb-1">Pengguna Terdaftar</p>
          <div className="text-4xl font-extrabold text-black">3,492</div>
          <div className="mt-4 flex items-center text-sm text-green-600 font-bold">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            +45 minggu ini
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <p className="text-gray-500 font-semibold mb-1">Unit SCM (Tahap Konstruksi)</p>
          <div className="text-4xl font-extrabold text-black">12</div>
          <div className="mt-4 flex items-center text-sm text-orange-500 font-bold">
            Proses Audit Berjalan
          </div>
        </div>
      </div>

      {/* Tabel Data Dummy */}
      <div className="space-y-8">
        
        {/* Tabel 1: Properti */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h3 className="font-bold text-gray-800">Menunggu Terbit (Properti Dummy)</h3>
            <button className="text-sm text-primary-600 font-bold hover:underline">Lihat Semua</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500">
              <thead className="bg-gray-50 text-gray-700 uppercase bg-gray-50/50">
                <tr>
                  <th scope="col" className="px-6 py-4 rounded-tl-xl font-bold">Nama Properti</th>
                  <th scope="col" className="px-6 py-4 font-bold">Kategori</th>
                  <th scope="col" className="px-6 py-4 font-bold">Lokasi</th>
                  <th scope="col" className="px-6 py-4 font-bold">Harga</th>
                  <th scope="col" className="px-6 py-4 rounded-tr-xl font-bold">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">Modern Glass Villa</td>
                  <td className="px-6 py-4 font-medium text-gray-700">HOUSE</td>
                  <td className="px-6 py-4">Beverly Hills, CA</td>
                  <td className="px-6 py-4 font-bold text-gray-700">$4,500,000</td>
                  <td className="px-6 py-4">
                    <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">TERBIT</span>
                  </td>
                </tr>
                <tr className="bg-white border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">Luxury Penthouse</td>
                  <td className="px-6 py-4 font-medium text-gray-700">APARTMENT</td>
                  <td className="px-6 py-4">New York, NY</td>
                  <td className="px-6 py-4 font-bold text-gray-700">$2,100,000</td>
                  <td className="px-6 py-4">
                    <span className="bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1 rounded-full">DRAFT</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Tabel 2: Pendaftar */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h3 className="font-bold text-gray-800">5 Pendaftar Terakhir (User Mockup)</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500">
              <thead className="bg-gray-50 text-gray-700 uppercase bg-gray-50/50">
                <tr>
                  <th scope="col" className="px-6 py-4 font-bold">Nama Lengkap</th>
                  <th scope="col" className="px-6 py-4 font-bold">Email</th>
                  <th scope="col" className="px-6 py-4 font-bold">Role Hak Akses</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">Danu Developer</td>
                  <td className="px-6 py-4">admin@homebyte.com</td>
                  <td className="px-6 py-4">
                    <span className="bg-red-100 text-red-800 text-xs font-bold px-3 py-1 rounded-full border border-red-200">ADMIN</span>
                  </td>
                </tr>
                <tr className="bg-white border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">Jane Smith</td>
                  <td className="px-6 py-4">jane.user@gmail.com</td>
                  <td className="px-6 py-4">
                    <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full border border-gray-200">USER</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}
