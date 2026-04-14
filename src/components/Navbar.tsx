import Link from "next/link";
import React from "react";

export default function Navbar() {
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
            <Link href="/properties" className="text-foreground/80 hover:text-primary-500 transition-colors text-sm font-medium">
              Properties
            </Link>
            <Link href="/saved" className="text-foreground/80 hover:text-primary-500 transition-colors text-sm font-medium">
              Wishlist
            </Link>
            <div className="flex items-center space-x-4 pl-4 border-l border-border/50">
              <Link href="/login" className="text-sm font-medium text-foreground hover:text-primary-500 transition-colors">
                Sign In
              </Link>
              <Link
                href="/register"
                className="text-sm font-medium px-5 py-2.5 rounded-full bg-foreground text-background hover:bg-primary-600 hover:text-white btn-transition shadow-md shadow-foreground/10 hover:shadow-primary-600/25"
              >
                Sign Up
              </Link>
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
