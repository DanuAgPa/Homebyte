import React from "react";
import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import prisma from "@/lib/prisma";
import { Category } from "@prisma/client";

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; category?: string }>;
}) {
  const queryParams = await searchParams;
  const activeCategory = queryParams.category || "ALL";
  const initialQuery = queryParams.query || "";

  // Prisma Filter Logic
  const properties = await prisma.property.findMany({
    where: {
      AND: [
        activeCategory !== "ALL" ? { category: activeCategory as Category } : {},
        initialQuery
          ? {
              OR: [
                { title: { contains: initialQuery, mode: "insensitive" } },
                { address: { contains: initialQuery, mode: "insensitive" } },
                { city: { contains: initialQuery, mode: "insensitive" } },
              ],
            }
          : {},
      ],
    },
    orderBy: { createdAt: "desc" },
  });

  const categories = [
    { id: "ALL", label: "Semua Tipe" },
    { id: "HOUSE", label: "Rumah" },
    { id: "APARTMENT", label: "Apartemen" },
    { id: "LAND", label: "Tanah" },
    { id: "COMMERCIAL", label: "Komersial" },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          {initialQuery ? `Hasil pencarian untuk "${initialQuery}"` : "Semua Properti"}
        </h1>
        <p className="text-foreground/60 text-lg mb-8">
          Temukan properti idaman Anda. Terdapat {properties.length} hasil yang cocok.
        </p>

        {/* Interactive Filter Menu (Using Links for Server-Side Navigation) */}
        <div className="flex flex-wrap gap-3 pb-4 border-b border-gray-200">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            
            // Build filter URL relatively to avoid breaking Client-side routing
            const params = new URLSearchParams();
            if (initialQuery) params.set("query", initialQuery);
            if (cat.id !== "ALL") params.set("category", cat.id);
            const relativeHref = `/properties${params.toString() ? '?' + params.toString() : ''}`;
            
            return (
              <Link
                key={cat.id}
                href={relativeHref}
                className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${
                  isActive
                    ? "bg-primary-600 text-white shadow-md shadow-primary-600/30 scale-105"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat.label}
              </Link>
            );
          })}
        </div>
      </div>

      {properties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property as any} />
          ))}
        </div>
      ) : (
        <div className="w-full py-20 text-center glass rounded-2xl border-dashed border-2 border-border">
          <svg
            className="w-16 h-16 mx-auto text-foreground/30 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          <h3 className="text-xl font-medium text-foreground mb-2">Tidak ada properti ditemukan</h3>
          <p className="text-foreground/60 mb-6">Oops, kami tidak menemukan properti di kategori ini.</p>
          <Link
            href="/properties"
            className="px-6 py-2.5 bg-primary-600 text-white rounded-full font-medium hover:bg-primary-700 btn-transition shadow-lg shadow-primary-600/30 inline-block"
          >
            Hapus Filter
          </Link>
        </div>
      )}
    </div>
  );
}
