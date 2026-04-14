import React from "react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 animate-fade-in relative z-10 w-full">
      <div className="absolute inset-0 z-[-1] opacity-20 dark:opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-400 via-background to-background"></div>
      
      <div className="w-full max-w-md glass p-8 sm:p-10 rounded-3xl border border-border shadow-2xl">
        <div className="text-center mb-10">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-400 mx-auto flex items-center justify-center text-white font-bold shadow-lg mb-4">
            H
          </div>
          <h2 className="text-3xl font-extrabold text-foreground">Welcome back</h2>
          <p className="mt-2 text-foreground/60 text-sm">Please sign in to your account</p>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
            <input type="email" required className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all font-medium" placeholder="you@example.com" />
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-foreground">Password</label>
              <a href="#" className="text-xs font-semibold text-primary-600 hover:text-primary-500 transition-colors">Forgot password?</a>
            </div>
            <input type="password" required className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all font-medium" placeholder="••••••••" />
          </div>
          
          <button type="submit" className="w-full py-3.5 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-primary-600/30 hover:scale-[1.02] btn-transition">
            Sign In
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-foreground/60">
          Don't have an account?{" "}
          <Link href="/register" className="font-bold text-primary-600 hover:text-primary-500 transition-colors">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
