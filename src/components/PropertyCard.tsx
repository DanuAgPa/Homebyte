"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export interface PropertyData {
  id: string;
  title: string;
  price: number;
  address: string;
  city: string;
  bedrooms: number;
  bathrooms: number;
  areaSquareMeter: number;
  imageUrl: string;
  isFeatured: boolean;
  category: string;
}

export default function PropertyCard({ property }: { property: PropertyData }) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("homebyte_wishlist") || "[]");
    const isCurrentlySaved = savedItems.some((item: PropertyData) => item.id === property.id);
    setIsSaved(isCurrentlySaved);
  }, [property.id]);

  const handleWishlist = () => {
    const savedItems = JSON.parse(localStorage.getItem("homebyte_wishlist") || "[]");
    if (isSaved) {
      const updatedItems = savedItems.filter((item: PropertyData) => item.id !== property.id);
      localStorage.setItem("homebyte_wishlist", JSON.stringify(updatedItems));
      setIsSaved(false);
      alert("Properti dihapus dari Wishlist.");
    } else {
      localStorage.setItem("homebyte_wishlist", JSON.stringify([...savedItems, property]));
      setIsSaved(true);
      alert("Properti berhasil ditambahkan ke Wishlist!");
    }
  };

  return (
    <div className="group relative bg-card text-card-foreground rounded-2xl overflow-hidden glass border border-border shadow-sm card-hover animate-[slideUp_0.5s_ease-out_forwards]">
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {property.isFeatured && (
          <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-gradient-to-r from-accent-500 to-accent-400 text-white text-xs font-bold rounded-full shadow-md uppercase tracking-wider">
            Unggulan
          </div>
        )}
        <div className="absolute top-4 right-4 z-10">
          <button 
            onClick={handleWishlist}
            title="Tambah ke Wishlist"
            className="p-2 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md transition-colors shadow-sm focus:outline-none"
          >
            {/* Heart Icon */}
            <svg className={`w-5 h-5 ${isSaved ? "text-red-500 fill-current" : "text-white"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
        <div className="w-full h-full bg-border relative">
          <Image
            src={property.imageUrl}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold line-clamp-1 leading-tight group-hover:text-primary-600 transition-colors">
            {property.title}
          </h3>
        </div>
        <p className="text-foreground/60 text-sm mb-4 line-clamp-1">{property.address}, {property.city}</p>
        
        <div className="flex items-center gap-4 text-foreground/70 text-sm font-medium mb-4">
          <div className="flex items-center gap-1.5 border border-border/50 px-2 py-1 rounded-lg bg-background/50">
            <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            <span>{property.bedrooms}</span>
          </div>
          <div className="flex items-center gap-1.5 border border-border/50 px-2 py-1 rounded-lg bg-background/50">
            <svg className="w-4 h-4 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
            <span>{property.bathrooms}</span>
          </div>
          <div className="flex items-center gap-1.5 border border-border/50 px-2 py-1 rounded-lg bg-background/50 text-xs">
            <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
            <span>{property.areaSquareMeter} m²</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center border-t border-border pt-4 mt-2">
          <div>
            <p className="text-xs text-foreground/50 uppercase tracking-wider mb-0.5">Harga</p>
            <p className="text-xl font-bold text-primary-600">
              ${property.price.toLocaleString("en-US")}
            </p>
          </div>
          <Link
            href={`/properties/${property.id}`}
            className="text-sm px-4 py-2 bg-primary-50 text-primary-600 hover:bg-primary-600 hover:text-white rounded-xl font-semibold btn-transition"
          >
            Detail
          </Link>
        </div>
      </div>
    </div>
  );
}
