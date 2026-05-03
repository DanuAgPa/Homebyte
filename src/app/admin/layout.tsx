import React from "react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminNavbar from "@/components/AdminNavbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-area flex bg-gray-50 flex-col md:flex-row min-h-screen">
      <AdminSidebar />

      {/* Main Content Area */}
      <main className="flex-1 w-full bg-gray-50 flex flex-col relative h-screen overflow-y-auto">
        <AdminNavbar />
        <div className="p-4 md:p-10 max-w-7xl mx-auto w-full pb-20">
           {children}
        </div>
      </main>
    </div>
  );
}
