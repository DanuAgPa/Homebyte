import React from "react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50 flex-col md:flex-row">
      {/* Sidebar Admin */}
      <aside className="w-full md:w-64 bg-black text-white p-6 pb-12 shadow-2xl flex-shrink-0 z-10 flex flex-col justify-between">
        <div>
          <div className="mb-10 text-center md:text-left pt-2 border-b border-gray-800 pb-6">
            <h2 className="text-2xl font-extrabold tracking-tight text-white mb-1"><span className="text-primary-500">HomeByte</span></h2>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Admin Workspace</p>
          </div>
          
          <nav className="space-y-2">
            <Link href="/admin" className="block px-4 py-3 rounded-xl bg-gray-900 border border-gray-800 text-primary-400 font-bold hover:bg-gray-800 transition-colors">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                Dashboard
              </div>
            </Link>
            <Link href="#" className="block px-4 py-3 rounded-xl hover:bg-gray-900 text-gray-400 hover:text-white font-medium transition-colors">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                Kelola Properti
              </div>
            </Link>
            <Link href="#" className="block px-4 py-3 rounded-xl hover:bg-gray-900 text-gray-400 hover:text-white font-medium transition-colors">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                Daftar Pengguna
              </div>
            </Link>
            <Link href="#" className="block px-4 py-3 rounded-xl hover:bg-gray-900 text-gray-400 hover:text-white font-medium transition-colors">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" /></svg>
                Pantau SCM
              </div>
            </Link>
          </nav>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-6">
          <Link href="/" className="block px-4 py-3 rounded-xl bg-white text-black font-bold hover:bg-gray-200 transition-colors text-center w-full shadow-lg shadow-white/10">
            Kembali ke Web
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 w-full bg-gray-50 flex flex-col p-4 md:p-10 relative overflow-y-auto">
        <div className="max-w-7xl mx-auto w-full">
           {children}
        </div>
      </main>
    </div>
  );
}
