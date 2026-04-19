"use client";

import React, { useState, useEffect } from "react";
import PropertyCard, { PropertyData } from "@/components/PropertyCard";
import { useSearchParams } from "next/navigation";

// Menggabungkan mock data, sekarang ditambah kategori COMMERCIAL
const INITIAL_MOCK_PROPERTIES: PropertyData[] = [
  { id: "1", title: "Modern Glass Villa in Beverly Hills", price: 4500000, address: "123 Palm Ave", city: "Beverly Hills, CA", bedrooms: 5, bathrooms: 6, areaSquareMeter: 450, imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80", isFeatured: true, category: "HOUSE" },
  { id: "2", title: "Luxury Penthouse with Skyline View", price: 2100000, address: "88 Downtown Blvd", city: "New York, NY", bedrooms: 3, bathrooms: 3, areaSquareMeter: 220, imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80", isFeatured: true, category: "APARTMENT" },
  { id: "3", title: "Minimalist Smart Home Retreat", price: 1850000, address: "450 Pine Lane", city: "Austin, TX", bedrooms: 4, bathrooms: 3, areaSquareMeter: 310, imageUrl: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80", isFeatured: false, category: "HOUSE" },
  { id: "4", title: "Oceanfront Contemporary Estate", price: 6200000, address: "12 Malibu Point", city: "Malibu, CA", bedrooms: 6, bathrooms: 7, areaSquareMeter: 680, imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80", isFeatured: false, category: "HOUSE" },
  { id: "5", title: "Downtown Urban Loft", price: 850000, address: "55 Arts District", city: "Chicago, IL", bedrooms: 1, bathrooms: 2, areaSquareMeter: 120, imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80", isFeatured: false, category: "APARTMENT" },
  { id: "6", title: "Suburban Family Oasis", price: 1250000, address: "77 Oakwood Dr", city: "Dallas, TX", bedrooms: 4, bathrooms: 3, areaSquareMeter: 280, imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80", isFeatured: false, category: "HOUSE" },
  { id: "7", title: "Premium Retail Space", price: 3400000, address: "912 Market St", city: "San Francisco, CA", bedrooms: 0, bathrooms: 2, areaSquareMeter: 800, imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80", isFeatured: true, category: "COMMERCIAL" },
  { id: "8", title: "Modern Tech Office", price: 5600000, address: "400 Silicon Blvd", city: "San Jose, CA", bedrooms: 0, bathrooms: 4, areaSquareMeter: 1200, imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80", isFeatured: false, category: "COMMERCIAL" },
];

export default function PropertiesPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "ALL";
  const initialQuery = searchParams.get("query") || "";

  // State untuk filter kategori & data
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [properties, setProperties] = useState<PropertyData[]>(INITIAL_MOCK_PROPERTIES);

  // Logika penyaringan dinamis
  useEffect(() => {
    let filtered = INITIAL_MOCK_PROPERTIES;

    if (initialQuery) {
      filtered = filtered.filter((p) =>
        p.address.toLowerCase().includes(initialQuery.toLowerCase()) || 
        p.city.toLowerCase().includes(initialQuery.toLowerCase())
      );
    }

    if (activeCategory !== "ALL") {
      filtered = filtered.filter((p) => p.category === activeCategory);
    }

    setProperties(filtered);
  }, [activeCategory, initialQuery]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          {initialQuery ? `Hasil pencarian untuk "${initialQuery}"` : "Semua Properti"}
        </h1>
        <p className="text-foreground/60 text-lg mb-8">
          Temukan properti idaman Anda. Terdapat {properties.length} hasil yang cocok.
        </p>

        {/* Interactive Filter Menu */}
        <div className="flex flex-wrap gap-3 pb-4 border-b border-gray-200">
          {[
            { id: "ALL", label: "Semua Tipe" },
            { id: "HOUSE", label: "Rumah" },
            { id: "APARTMENT", label: "Apartemen" },
            { id: "COMMERCIAL", label: "Komersial" }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-primary-600 text-white shadow-md shadow-primary-600/30 scale-105"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {properties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="w-full py-20 text-center glass rounded-2xl border-dashed border-2 border-border">
          <svg className="w-16 h-16 mx-auto text-foreground/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
          <h3 className="text-xl font-medium text-foreground mb-2">Tidak ada properti ditemukan</h3>
          <p className="text-foreground/60 mb-6">Oops, kami tidak menemukan properti di kategori ini.</p>
          <button 
            onClick={() => setActiveCategory("ALL")}
            className="px-6 py-2.5 bg-primary-600 text-white rounded-full font-medium hover:bg-primary-700 btn-transition shadow-lg shadow-primary-600/30"
          >
            Hapus Filter
          </button>
        </div>
      )}
    </div>
  );
}
