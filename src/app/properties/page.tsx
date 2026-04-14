import React from "react";
import PropertyCard, { PropertyData } from "@/components/PropertyCard";

// Using the same mock data for simulation
const MOCK_PROPERTIES: PropertyData[] = [
  { id: "1", title: "Modern Glass Villa in Beverly Hills", price: 4500000, address: "123 Palm Ave", city: "Beverly Hills, CA", bedrooms: 5, bathrooms: 6, areaSquareMeter: 450, imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80", isFeatured: true, category: "HOUSE" },
  { id: "2", title: "Luxury Penthouse with Skyline View", price: 2100000, address: "88 Downtown Blvd", city: "New York, NY", bedrooms: 3, bathrooms: 3, areaSquareMeter: 220, imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80", isFeatured: true, category: "APARTMENT" },
  { id: "3", title: "Minimalist Smart Home Retreat", price: 1850000, address: "450 Pine Lane", city: "Austin, TX", bedrooms: 4, bathrooms: 3, areaSquareMeter: 310, imageUrl: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80", isFeatured: false, category: "HOUSE" },
  { id: "4", title: "Oceanfront Contemporary Estate", price: 6200000, address: "12 Malibu Point", city: "Malibu, CA", bedrooms: 6, bathrooms: 7, areaSquareMeter: 680, imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80", isFeatured: false, category: "HOUSE" },
  { id: "5", title: "Downtown Urban Loft", price: 850000, address: "55 Arts District", city: "Chicago, IL", bedrooms: 1, bathrooms: 2, areaSquareMeter: 120, imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80", isFeatured: false, category: "APARTMENT" },
  { id: "6", title: "Suburban Family Oasis", price: 1250000, address: "77 Oakwood Dr", city: "Dallas, TX", bedrooms: 4, bathrooms: 3, areaSquareMeter: 280, imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80", isFeatured: false, category: "HOUSE" },
];

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; category?: string }>;
}) {
  const { query, category } = await searchParams;

  // Simulate server filtering
  let filteredProperties = MOCK_PROPERTIES;
  if (query) {
    filteredProperties = filteredProperties.filter((p) =>
      p.address.toLowerCase().includes(query.toLowerCase()) || p.city.toLowerCase().includes(query.toLowerCase())
    );
  }
  if (category && category !== "ALL") {
    filteredProperties = filteredProperties.filter((p) => p.category === category);
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          {query ? `Search results for "${query}"` : "All Properties"}
        </h1>
        <p className="text-foreground/60 text-lg">
          {filteredProperties.length} properties found matching your criteria.
        </p>
      </div>

      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="w-full py-20 text-center glass rounded-2xl border-dashed border-2 border-border">
          <svg className="w-16 h-16 mx-auto text-foreground/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
          <h3 className="text-xl font-medium text-foreground mb-2">No properties found</h3>
          <p className="text-foreground/60 mb-6">Try adjusting your search criteria or filters.</p>
          <a href="/properties" className="px-6 py-2.5 bg-primary-600 text-white rounded-full font-medium hover:bg-primary-700 btn-transition shadow-lg shadow-primary-600/30">
            Clear Filters
          </a>
        </div>
      )}
    </div>
  );
}
