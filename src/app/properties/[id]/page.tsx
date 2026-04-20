import React from "react";
import Image from "next/image";
import InquiryForm from "@/components/InquiryForm";
import BackButton from "@/components/BackButton";

export default async function PropertyDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      <div className="mb-6">
        <BackButton />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-8">
          <div className="w-full h-[500px] relative rounded-3xl overflow-hidden shadow-2xl">
            <Image 
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80" 
              alt="Property" 
              fill 
              className="object-cover"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-4 py-1.5 bg-background/80 backdrop-blur-md rounded-full text-sm font-bold shadow-sm">DIJUAL</span>
              <span className="px-4 py-1.5 bg-gradient-to-r from-accent-500 to-accent-400 text-white rounded-full text-sm font-bold shadow-sm">UNGGULAN</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2">Modern Glass Villa in Beverly Hills</h1>
                <p className="text-lg text-foreground/70 flex items-center">
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  123 Palm Ave, Beverly Hills, CA
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-extrabold text-primary-600">$4,500,000</p>
                <p className="text-sm text-foreground/50">Est. $18k / mo</p>
              </div>
            </div>

            <div className="flex border-y border-border py-6 my-8 overflow-x-auto hide-scrollbar gap-8">
              <div className="flex flex-col items-center min-w-max">
                <span className="text-3xl font-bold text-foreground">5</span>
                <span className="text-sm text-foreground/60 uppercase tracking-wide">Kamar Tidur</span>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div className="flex flex-col items-center min-w-max">
                <span className="text-3xl font-bold text-foreground">6</span>
                <span className="text-sm text-foreground/60 uppercase tracking-wide">Kamar Mandi</span>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div className="flex flex-col items-center min-w-max">
                <span className="text-3xl font-bold text-foreground">450</span>
                <span className="text-sm text-foreground/60 uppercase tracking-wide">Meter Persegi</span>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div className="flex flex-col items-center min-w-max">
                <span className="text-3xl font-bold text-foreground">House</span>
                <span className="text-sm text-foreground/60 uppercase tracking-wide">Tipe</span>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Deskripsi</h3>
              <p className="text-foreground/70 leading-relaxed font-light text-lg">
                Vila kaca modern yang menakjubkan ini terletak di jantung Beverly Hills, menawarkan kemewahan yang tak tertandingi dan desain mutakhir. Fasilitas termasuk jendela panorama raksasa dari lantai ke langit-langit, kolam renang tanpa batas yang menghadap ke lembah, integrasi rumah pintar tercanggih, dan kamar tidur utama yang dilengkapi dengan kamar mandi spa mewah.
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar / Inquiry Form */}
        <div className="lg:col-span-1">
          <InquiryForm propertyId={id} />
        </div>
      </div>
    </div>
  );
}
