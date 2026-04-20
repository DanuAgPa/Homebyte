"use client";

import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, LogOut, LayoutGrid, Package, Heart, ShieldCheck, Menu, User } from "lucide-react";
import { logoutAction } from "@/lib/actions/authActions";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const checkAuth = () => {
    const matchAuth = document.cookie.match(new RegExp('(^| )auth_session=([^;]+)'));
    const matchRole = document.cookie.match(new RegExp('(^| )user_role=([^;]+)'));
    const matchName = document.cookie.match(new RegExp('(^| )user_name=([^;]+)'));
    
    if (matchAuth) {
      setIsLoggedIn(true);
      if (matchName) setUserName(decodeURIComponent(matchName[2]));
      if (matchRole && matchRole[2] === "ADMIN") setIsAdmin(true);
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
      setUserName("");
    }
  };

  useEffect(() => {
    checkAuth();

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [pathname]); // Re-run when path changes

  const handleLogout = async () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUserName("");
    setIsDropdownOpen(false);
    await logoutAction();
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-border transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo & Back Button Group */}
          <div className="flex items-center gap-6">
            <Link href="/" className="group flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-105 transition-all duration-300">
                H
              </div>
              <span className="font-bold text-xl tracking-tight text-foreground">
                HomeByte
              </span>
            </Link>

            <div className="h-6 w-[1px] bg-border hidden md:block"></div>

            <button 
              onClick={() => router.back()} 
              className="hidden md:flex items-center gap-1.5 text-foreground/70 hover:text-primary-600 transition-all duration-300 text-sm font-medium group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Kembali</span>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              <Link href="/properties" className="flex items-center gap-1.5 text-foreground/80 hover:text-primary-600 transition-all duration-300 text-sm font-medium">
                <LayoutGrid className="w-4 h-4 opacity-70" />
                Properti
              </Link>
              <Link href="/scm" className="flex items-center gap-1.5 text-foreground/80 hover:text-primary-600 transition-all duration-300 text-sm font-medium">
                <Package className="w-4 h-4 opacity-70" />
                Proses SCM
              </Link>
              <Link href="/saved" className="flex items-center gap-1.5 text-foreground/80 hover:text-primary-600 transition-all duration-300 text-sm font-medium">
                <Heart className="w-4 h-4 opacity-70" />
                Favorit
              </Link>
              {isAdmin && (
                <Link href="/admin" className="flex items-center gap-1.5 text-red-600 font-semibold hover:bg-red-50 transition-all duration-300 text-sm border border-red-100 px-3 py-1.5 rounded-lg bg-red-50/50">
                  <ShieldCheck className="w-4 h-4" />
                  Panel Admin
                </Link>
              )}
            </div>
            
            <div className="flex items-center gap-4 pl-6 border-l border-border">
              {isLoggedIn ? (
                <div className="relative" ref={dropdownRef}>
                  <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-100 transition-all duration-200"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center text-primary-600 shadow-sm">
                      <User className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold text-foreground/80 pr-1">{userName}</span>
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-background border border-border rounded-2xl shadow-2xl py-2 animate-in fade-in zoom-in duration-200 origin-top-right">
                      <div className="px-4 py-2 border-b border-border/50 mb-1">
                        <p className="text-xs font-semibold text-foreground/40 uppercase tracking-wider">Akun Saya</p>
                      </div>
                      
                      <Link 
                        href="/profile/settings"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-foreground/70 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200"
                      >
                        <User className="w-4 h-4" />
                        Pengaturan Profil
                      </Link>
                      
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-all duration-200 border-t border-border/50 mt-1"
                      >
                        <LogOut className="w-4 h-4" />
                        Keluar
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link href="/login" className="text-sm font-medium text-foreground/80 hover:text-primary-600 transition-all duration-300">
                    Masuk
                  </Link>
                  <Link
                    href="/register"
                    className="text-sm font-semibold px-6 py-2.5 rounded-xl bg-foreground text-background hover:bg-primary-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-primary-600/20 active:scale-95"
                  >
                    Daftar
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button className="p-2.5 rounded-xl text-foreground hover:bg-foreground/5 transition-all duration-300">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
