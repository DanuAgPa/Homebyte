import React from "react";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import PropertyCard from "@/components/PropertyCard";
import BackButton from "@/components/BackButton";

export default async function SavedPropertiesPage() {
  const cookieStore = await cookies();
  const userIdStr = cookieStore.get("auth_session")?.value;
  
  let savedProperties = [];
  
  if (userIdStr) {
    const saved = await prisma.savedProperty.findMany({
      where: { userId: parseInt(userIdStr) },
      include: { property: true },
      orderBy: { savedAt: 'desc' }
    });
    // Extract the actual property data from the relation
    savedProperties = saved.map(item => item.property);
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <div className="mb-6">
        <BackButton />
      </div>
      <div className="flex items-center gap-3 mb-10 pb-6 border-b border-border">
        <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl text-red-500">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        </div>
        <div>
          <h1 className="text-4xl font-bold text-foreground">Favorit Anda</h1>
          <p className="text-foreground/60 text-lg">Anda memiliki {savedProperties.length} properti yang disimpan.</p>
        </div>
      </div>

      {savedProperties.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-500 mb-2">Wishlist Kosong</h3>
          <p className="text-gray-400">Anda belum memiliki properti yang disimpan.</p>
          {!userIdStr && (
            <p className="text-primary-600 mt-4 font-medium">Silakan login untuk melihat wishlist Anda yang tersimpan.</p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {savedProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
}
