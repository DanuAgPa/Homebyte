import React from "react";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 animate-fade-in relative z-10 w-full">
      <div className="absolute inset-0 z-[-1] opacity-20 dark:opacity-10 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-accent-400 via-background to-background"></div>
      
      <div className="w-full max-w-xl glass p-8 sm:p-10 rounded-3xl border border-border shadow-2xl">
        <div className="text-center mb-10">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-400 mx-auto flex items-center justify-center text-white font-bold shadow-lg mb-4">
            H
          </div>
          <h2 className="text-3xl font-extrabold text-foreground">Create an Account</h2>
          <p className="mt-2 text-foreground/60 text-sm">Join HomeByte and find your dream home</p>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">First Name</label>
              <input type="text" required className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all font-medium" placeholder="John" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Last Name</label>
              <input type="text" required className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all font-medium" placeholder="Doe" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
            <input type="email" required className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all font-medium" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Password</label>
            <input type="password" required className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all font-medium" placeholder="Create a strong password" />
          </div>
          
          <button type="submit" className="w-full py-3.5 bg-gradient-to-r from-accent-500 to-primary-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-primary-600/30 hover:scale-[1.02] btn-transition">
            Sign Up
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-foreground/60">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-primary-600 hover:text-primary-500 transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
