import React from "react";
import Image from "next/image";
import Link from "next/link";

export default async function PropertyDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      <div className="mb-6">
        <Link href="/properties" className="inline-flex items-center text-sm font-medium text-foreground/60 hover:text-primary-600 btn-transition group">
          <svg className="w-4 h-4 mr-1 group-hover:-translate-x-1 btn-transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          Back to listings
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-8">
          <div className="w-full h-[500px] relative rounded-3xl overflow-hidden shadow-2xl animate-[slideUp_0.5s_ease-out_forwards]">
            <Image 
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80" 
              alt="Property" 
              fill 
              className="object-cover"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-4 py-1.5 bg-background/80 backdrop-blur-md rounded-full text-sm font-bold shadow-sm">FOR SALE</span>
              <span className="px-4 py-1.5 bg-gradient-to-r from-accent-500 to-accent-400 text-white rounded-full text-sm font-bold shadow-sm">FEATURED</span>
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
                <span className="text-sm text-foreground/60 uppercase tracking-wide">Bedrooms</span>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div className="flex flex-col items-center min-w-max">
                <span className="text-3xl font-bold text-foreground">6</span>
                <span className="text-sm text-foreground/60 uppercase tracking-wide">Bathrooms</span>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div className="flex flex-col items-center min-w-max">
                <span className="text-3xl font-bold text-foreground">450</span>
                <span className="text-sm text-foreground/60 uppercase tracking-wide">Sq Meters</span>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div className="flex flex-col items-center min-w-max">
                <span className="text-3xl font-bold text-foreground">House</span>
                <span className="text-sm text-foreground/60 uppercase tracking-wide">Type</span>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Description</h3>
              <p className="text-foreground/70 leading-relaxed font-light text-lg">
                This stunning modern glass villa situated in the heart of Beverly Hills offers unparalleled luxury and cutting-edge design. Features include huge floor-to-ceiling panoramic windows, an infinity edge pool overlooking the canyon, state-of-the-art smart home integration, and a master suite complete with his-and-hers spa bathrooms.
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar / Inquiry Form */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 glass p-6 rounded-3xl shadow-xl border border-border/50 animate-[slideUp_0.8s_ease-out_forwards]">
            <h3 className="text-xl font-bold text-foreground mb-6">Contact Agent</h3>
            <div className="flex items-center mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-primary-400 to-accent-500 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-md">
                JD
              </div>
              <div className="ml-4">
                <p className="font-bold text-foreground">Jane Doe</p>
                <p className="text-sm text-foreground/60">Premium Real Estate Agent</p>
              </div>
            </div>
            
            <form className="space-y-4">
              <div>
                <input type="text" placeholder="Your Name" className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all" />
              </div>
              <div>
                <input type="email" placeholder="Email Address" className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all" />
              </div>
              <div>
                <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all" />
              </div>
              <div>
                <textarea rows={4} placeholder="I am interested in this property..." className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"></textarea>
              </div>
              <button type="submit" className="w-full py-4 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-600/30 btn-transition">
                Send Message
              </button>
              <button type="button" className="w-full py-4 glass text-foreground rounded-xl font-bold hover:bg-foreground/5 btn-transition flex justify-center items-center gap-2">
                <svg className="w-5 h-5 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                Save to Wishlist
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
