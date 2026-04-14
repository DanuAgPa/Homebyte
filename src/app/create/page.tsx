import React from "react";
import Link from "next/link";

export default function CreateListingPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-foreground mb-4">Create New Listing</h1>
        <p className="text-foreground/60 text-lg">Post a property on HomeByte to reach thousands of potential buyers.</p>
      </div>

      <div className="glass p-8 sm:p-10 rounded-3xl border border-border shadow-xl">
        <form className="space-y-8">
          {/* General Information */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-foreground border-b border-border pb-2">1. General Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">Property Title</label>
                <input type="text" placeholder="e.g. Modern Villa in Downtown" className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                <select className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all appearance-none cursor-pointer">
                  <option>House</option>
                  <option>Apartment</option>
                  <option>Land</option>
                  <option>Commercial</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Price ($)</label>
                <input type="number" placeholder="450000" className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all" />
              </div>
            </div>
          </div>

          {/* Location details */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-foreground border-b border-border pb-2">2. Location Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">Address</label>
                <input type="text" placeholder="123 Main Street" className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">City</label>
                <input type="text" placeholder="New York, NY" className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all" />
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-foreground border-b border-border pb-2">3. Property Specifications</h3>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Bedrooms</label>
                <input type="number" min="0" placeholder="3" className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Bathrooms</label>
                <input type="number" min="0" placeholder="2" className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Area (m²)</label>
                <input type="number" min="0" placeholder="150" className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all" />
              </div>
            </div>
          </div>

          <div className="pt-6 flex gap-4">
            <Link href="/" className="px-8 py-4 bg-background border border-border text-foreground font-bold rounded-xl hover:bg-foreground/5 btn-transition text-center">
              Cancel
            </Link>
            <button type="submit" className="flex-1 py-4 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 shadow-lg shadow-primary-600/30 hover:-translate-y-1 btn-transition">
              Publish Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
