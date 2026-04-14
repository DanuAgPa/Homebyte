import React from "react";
import PropertyCard, { PropertyData } from "@/components/PropertyCard";

// Mock Saved Data
const MOCK_SAVED_PROPERTIES: PropertyData[] = [
  { id: "1", title: "Modern Glass Villa in Beverly Hills", price: 4500000, address: "123 Palm Ave", city: "Beverly Hills, CA", bedrooms: 5, bathrooms: 6, areaSquareMeter: 450, imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80", isFeatured: true, category: "HOUSE" },
  { id: "3", title: "Minimalist Smart Home Retreat", price: 1850000, address: "450 Pine Lane", city: "Austin, TX", bedrooms: 4, bathrooms: 3, areaSquareMeter: 310, imageUrl: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80", isFeatured: false, category: "HOUSE" },
];

export default function SavedPropertiesPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <div className="flex items-center gap-3 mb-10 pb-6 border-b border-border">
        <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl text-red-500">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        </div>
        <div>
          <h1 className="text-4xl font-bold text-foreground">Your Wishlist</h1>
          <p className="text-foreground/60 text-lg">You have {MOCK_SAVED_PROPERTIES.length} saved properties.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_SAVED_PROPERTIES.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}
