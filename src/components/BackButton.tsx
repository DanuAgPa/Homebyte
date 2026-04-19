"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button 
      onClick={() => router.back()}
      className="inline-flex items-center space-x-2 text-gray-600 hover:text-black font-bold transition-all py-2.5 px-5 bg-white border border-gray-200 hover:border-gray-400 hover:shadow-md rounded-xl group"
    >
      <svg className="w-5 h-5 group-hover:-translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
      </svg>
      <span>Kembali</span>
    </button>
  );
}
