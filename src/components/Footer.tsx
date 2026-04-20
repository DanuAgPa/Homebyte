"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="border-t border-border bg-card/50 glass py-12 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start mb-6 md:mb-0">
            <span className="font-bold text-xl tracking-tight text-foreground/90">
              HomeByte.
            </span>
            <span className="ml-2 mt-1 text-sm text-foreground/60">
              © {new Date().getFullYear()} All rights reserved.
            </span>
          </div>
          <div className="flex justify-center space-x-6">
            {['About', 'Privacy', 'Terms', 'Contact'].map((item) => (
              <Link 
                key={item} 
                href={`/${item.toLowerCase()}`} 
                className="text-sm text-foreground/60 hover:text-primary-500 transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
