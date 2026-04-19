import React from "react";
import Link from "next/link";
import PropertyCard, { PropertyData } from "@/components/PropertyCard";
import { searchProperties } from "@/lib/actions/propertyActions";

// Mock data to display before real database is populated
const MOCK_PROPERTIES: PropertyData[] = [
  {
    id: "1",
    title: "Modern Glass Villa in Beverly Hills",
    price: 4500000,
    address: "123 Palm Ave",
    city: "Beverly Hills, CA",
    bedrooms: 5,
    bathrooms: 6,
    areaSquareMeter: 450,
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    isFeatured: true,
    category: "HOUSE"
  },
  {
    id: "2",
    title: "Luxury Penthouse with Skyline View",
    price: 2100000,
    address: "88 Downtown Blvd",
    city: "New York, NY",
    bedrooms: 3,
    bathrooms: 3,
    areaSquareMeter: 220,
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    isFeatured: true,
    category: "APARTMENT"
  },
  {
    id: "3",
    title: "Minimalist Smart Home Retreat",
    price: 1850000,
    address: "450 Pine Lane",
    city: "Austin, TX",
    bedrooms: 4,
    bathrooms: 3,
    areaSquareMeter: 310,
    imageUrl: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
    isFeatured: false,
    category: "HOUSE"
  }
];

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-gray-50">
        <div className="absolute inset-0 w-full h-full opacity-60">
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80" 
            alt="Hero Background" 
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-white/30"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-extrabold text-black tracking-tight mb-6 drop-shadow-sm">
            Temukan <span className="text-primary-600">Rumah Idaman</span> Anda.
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-gray-800 max-w-3xl mx-auto mb-10 font-medium drop-shadow-sm">
            Temukan properti paling premium di lokasi terbaik, dikurasi khusus untuk Anda.
          </p>

          {/* Search Bar Container */}
          <div className="bg-white/90 backdrop-blur-md p-3 md:p-4 rounded-3xl max-w-4xl mx-auto shadow-2xl animate-[slideUp_0.8s_ease-out_forwards] border border-gray-200">
            <form action="/properties" method="GET" className="flex flex-col md:flex-row gap-3">
              <div className="flex-grow flex items-center bg-gray-100/80 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-primary-500 transition-all">
                <svg className="w-5 h-5 text-gray-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input 
                  type="text" 
                  name="query"
                  placeholder="Alamat, Kota, atau Kode Pos" 
                  className="bg-transparent text-black placeholder-gray-500 focus:outline-none w-full font-bold"
                />
              </div>
              <button type="submit" className="bg-gradient-to-r from-primary-600 to-primary-500 text-white font-bold px-8 py-3.5 rounded-2xl hover:scale-105 btn-transition shadow-lg shadow-primary-600/30">
                Cari
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex justify-between items-end mb-10">
          <div className="animate-[slideUp_0.6s_ease-out_forwards]">
            <span className="text-primary-600 font-bold tracking-wider uppercase text-sm mb-2 block">Pilihan terbaik kami</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Properti Unggulan</h2>
          </div>
          <Link href="/properties" className="hidden md:flex items-center text-primary-600 font-semibold hover:text-primary-800 transition-colors group">
            Lihat Semua 
            <svg className="w-5 h-5 ml-1 group-hover:translate-x-1 btn-transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_PROPERTIES.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="w-full bg-gradient-to-br from-primary-900 to-foreground py-16 my-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-8 md:mb-0 max-w-2xl text-center md:text-left">
            <h2 className="text-3xl font-bold text-white mb-4">Siap menjual properti Anda?</h2>
            <p className="text-primary-100 text-lg">Daftarkan properti Anda di HomeByte dan jangkau jutaan calon pembeli di pasar global secara instan.</p>
          </div>
          <div>
            <Link href="/create" className="px-8 py-4 bg-white text-primary-900 font-bold rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1 btn-transition inline-block">
              Buat Iklan
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
