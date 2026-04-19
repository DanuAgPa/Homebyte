"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check cookie
    const checkAuth = () => {
      const matchAuth = document.cookie.match(new RegExp('(^| )auth_session=([^;]+)'));
      const matchRole = document.cookie.match(new RegExp('(^| )user_role=([^;]+)'));
      
      if (matchAuth) {
        setIsLoggedIn(true);
        if (matchRole && matchRole[2] === "ADMIN") {
          setIsAdmin(true);
        }
      }
    };
    
    checkAuth();
  }, []);

  const handleLogout = () => {
    document.cookie = "auth_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setIsLoggedIn(false);
    setIsAdmin(false);
    router.push("/login");
    router.refresh();
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-border transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="group flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-400 flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-105 transition-transform">
                H
              </div>
              <span className="font-bold text-xl tracking-tight text-foreground bg-clip-text">
                HomeByte
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => router.back()} 
              className="text-foreground/80 hover:text-primary-500 transition-colors text-sm font-medium"
            >
              Kembali
            </button>
            <Link href="/properties" className="text-foreground/80 hover:text-primary-500 transition-colors text-sm font-medium">
              Properti
            </Link>
            <Link href="/scm" className="text-foreground/80 hover:text-primary-500 transition-colors text-sm font-medium">
              Proses SCM
            </Link>
            <Link href="/saved" className="text-foreground/80 hover:text-primary-500 transition-colors text-sm font-medium">
              Favorit
            </Link>
            {isAdmin && (
              <Link href="/admin" className="text-red-500 font-bold hover:text-red-600 transition-colors text-sm border border-red-200 px-3 py-1 rounded-full bg-red-50">
                Panel Admin
              </Link>
            )}
            
            <div className="flex items-center space-x-4 pl-4 border-l border-border/50">
              {isLoggedIn ? (
                 <button 
                   onClick={handleLogout}
                   className="text-sm font-bold text-gray-500 hover:text-red-500 transition-colors"
                 >
                   Keluar
                 </button>
              ) : (
                <>
                  <Link href="/login" className="text-sm font-medium text-foreground hover:text-primary-500 transition-colors">
                    Masuk
                  </Link>
                  <Link
                    href="/register"
                    className="text-sm font-medium px-5 py-2.5 rounded-full bg-foreground text-background hover:bg-primary-600 hover:text-white btn-transition shadow-md shadow-foreground/10 hover:shadow-primary-600/25"
                  >
                    Daftar
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button - Stub */}
          <div className="md:hidden flex items-center">
            <button className="p-2 rounded-md text-foreground hover:bg-foreground/5 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
