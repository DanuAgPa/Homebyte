"use client";

import React, { useState, useEffect } from "react";

export default function SaveToWishlistButton({ propertyId }: { propertyId: string }) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("homebyte_wishlist") || "[]");
    const isCurrentlySaved = savedItems.some((item: any) => item.id === propertyId);
    setIsSaved(isCurrentlySaved);
  }, [propertyId]);

  const handleWishlist = () => {
    const savedItems = JSON.parse(localStorage.getItem("homebyte_wishlist") || "[]");
    
    if (isSaved) {
      const updatedItems = savedItems.filter((item: any) => item.id !== propertyId);
      localStorage.setItem("homebyte_wishlist", JSON.stringify(updatedItems));
      setIsSaved(false);
      alert("Properti ini berhasil dihapus dari Favorit.");
    } else {
      // Create mockup property object since full detail is complex just id is sometimes enough
      // in our PropertyCard it saves the whole object. For robust wishlist we could fetch or save dummy.
      const mockProp = { 
        id: propertyId, 
        title: "Property " + propertyId, 
        price: 4500000, 
        address: "Address", 
        city: "City", 
        bedrooms: 5, 
        bathrooms: 6, 
        areaSquareMeter: 450, 
        imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80", 
        isFeatured: true, 
        category: "HOUSE" 
      };
      
      localStorage.setItem("homebyte_wishlist", JSON.stringify([...savedItems, mockProp]));
      setIsSaved(true);
      alert("Properti berhasil ditambahkan ke Favorit!");
    }
  };

  return (
    <button 
      onClick={handleWishlist}
      type="button" 
      className={`w-full py-4 text-foreground rounded-xl font-bold transition-all flex justify-center items-center gap-2 ${isSaved ? 'bg-red-50 hover:bg-red-100 border border-red-200' : 'glass hover:bg-foreground/5'}`}
    >
      <svg className={`w-5 h-5 ${isSaved ? 'text-red-500 fill-current' : 'text-accent-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
      {isSaved ? "Tersimpan di Favorit" : "Simpan ke Favorit"}
    </button>
  );
}
