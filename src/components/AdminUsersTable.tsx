"use client";

import React, { useState } from "react";
import { Trash2, ShieldAlert, Mail, Phone, Calendar, UserCheck, ShieldOff } from "lucide-react";
import { deleteUserAction, toggleUserRoleAction } from "@/lib/actions/authActions";

export default function AdminUsersTable({ initialUsers }: { initialUsers: any[] }) {
  const [users, setUsers] = useState(initialUsers || []);
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus pengguna ini secara permanen?")) return;
    setLoading(true);
    const res = await deleteUserAction(id);
    if (res.success) window.location.reload();
    else alert("Error: " + res.error);
    setLoading(false);
  };

  const handleToggleRole = async (id: number) => {
    setLoading(true);
    const res = await toggleUserRoleAction(id);
    if (res.success) window.location.reload();
    else alert("Error: " + res.error);
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500">
          <thead className="bg-gray-50/80 text-gray-400 uppercase text-[11px] tracking-widest font-extrabold border-b border-gray-100">
            <tr>
              <th className="px-8 py-5">Nama Lengkap</th>
              <th className="px-8 py-5">Kontak & Email</th>
              <th className="px-8 py-5">Role</th>
              <th className="px-8 py-5">Tgl Bergabung</th>
              <th className="px-8 py-5 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {users.length > 0 ? users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center font-black text-sm shadow-sm ring-1 ring-primary-100">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-base">{user.name}</p>
                      <p className="text-[10px] text-gray-400 uppercase tracking-tighter font-bold">User ID: #{user.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6 space-y-1">
                  <div className="flex items-center gap-2 text-gray-700 font-medium whitespace-nowrap">
                    <Mail className="w-3.5 h-3.5 text-gray-300" />
                    {user.email}
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-xs">
                    <Phone className="w-3.5 h-3.5 text-gray-300" />
                    {user.phone || "No Phone"}
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black tracking-wider uppercase border border-current ${
                    user.role === 'ADMIN' 
                      ? 'bg-red-50 text-red-600 border-red-100 shadow-[0_0_10px_rgba(220,38,38,0.1)]' 
                      : 'bg-green-50 text-green-600 border-green-100'
                  }`}>
                    <ShieldAlert className={`w-3 h-3 ${user.role === 'ADMIN' ? 'animate-pulse' : 'hidden'}`} />
                    {user.role}
                  </div>
                </td>
                <td className="px-8 py-6 text-gray-400 font-medium">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 opacity-40" />
                    {new Date(user.createdAt).toLocaleDateString('id-ID')}
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => handleToggleRole(user.id)}
                      disabled={user.email === 'admin@gmail.com' || loading}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-all"
                      title={user.role === 'ADMIN' ? "Jadikan User Biasa" : "Jadikan Admin"}
                    >
                      {user.role === 'ADMIN' ? <ShieldOff className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                    </button>
                    <button 
                      onClick={() => handleDelete(user.id)}
                      disabled={user.email === 'admin@gmail.com' || loading}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      title="Hapus Pengguna"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={5} className="px-8 py-20 text-center">
                  <p className="text-gray-400 italic text-lg">Belum ada pengguna terdaftar.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
