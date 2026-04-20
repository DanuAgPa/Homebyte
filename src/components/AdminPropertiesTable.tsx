"use client";

import React, { useState } from "react";
import { Edit3, Trash2, Home, MapPin, Tag, Plus, X, Layers } from "lucide-react";
import { deletePropertyAction, updatePropertyAction } from "@/lib/actions/propertyActions";

export default function AdminPropertiesTable({ initialProperties }: { initialProperties: any[] }) {
  const [properties, setProperties] = useState(initialProperties || []);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentProperty, setCurrentProperty] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus iklan properti ini secara permanen?")) return;
    setLoading(true);
    const res = await deletePropertyAction(id);
    if (res.success) window.location.reload();
    else alert("Error: " + res.error);
    setLoading(false);
  };

  const handleEdit = (prop: any) => {
    setCurrentProperty(prop);
    setEditModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      price: parseFloat(formData.get("price") as string),
      address: formData.get("address") as string,
      city: formData.get("city") as string,
      category: formData.get("category") as any,
      bedrooms: parseInt(formData.get("bedrooms") as string),
      bathrooms: parseInt(formData.get("bathrooms") as string),
      areaSquareMeter: parseFloat(formData.get("areaSquareMeter") as string),
      imageUrl: formData.get("imageUrl") as string,
    };

    const res = await updatePropertyAction(currentProperty.id, data);
    if (res.success) {
      setEditModalOpen(false);
      window.location.reload();
    } else {
      alert("Error: " + res.error);
    }
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500">
          <thead className="bg-gray-50/80 text-gray-400 uppercase text-[11px] tracking-widest font-extrabold border-b border-gray-100">
            <tr>
              <th className="px-8 py-5">Detail Unit Properti</th>
              <th className="px-8 py-5">Kategori</th>
              <th className="px-8 py-5">Lokasi & Kota</th>
              <th className="px-8 py-5">Harga Pasar</th>
              <th className="px-8 py-5 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {properties.length > 0 ? properties.map((prop) => (
              <tr key={prop.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gray-100 overflow-hidden shadow-sm ring-1 ring-gray-200">
                      <img src={prop.imageUrl} alt={prop.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-base">{prop.title}</p>
                      <div className="flex gap-2 text-[10px] text-gray-400 font-bold uppercase mt-1">
                        <span>{prop.bedrooms} Bed</span>
                        <span>•</span>
                        <span>{prop.bathrooms} Bath</span>
                        <span>•</span>
                        <span>{prop.areaSquareMeter} m²</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-50 text-blue-600 text-[10px] font-black tracking-widest uppercase border border-blue-100">
                    <Layers className="w-3 h-3" />
                    {prop.category}
                  </div>
                </td>
                <td className="px-8 py-6">
                   <div className="space-y-1">
                     <p className="text-gray-700 font-bold">{prop.city}</p>
                     <div className="flex items-center gap-1 text-gray-400 text-xs">
                        <MapPin className="w-3 h-3" />
                        {prop.address}
                     </div>
                   </div>
                </td>
                <td className="px-8 py-6">
                  <div className="text-lg font-black text-primary-600">
                    Rp {prop.price.toLocaleString('id-ID')}
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => handleEdit(prop)}
                      disabled={loading}
                      className="p-2 text-primary-600 hover:bg-primary-50 rounded-xl transition-all"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(prop.id)}
                      disabled={loading}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={5} className="px-8 py-20 text-center text-gray-400 italic text-lg">
                  Belum ada iklan properti yang terdaftar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Property Modal */}
      {editModalOpen && currentProperty && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) setEditModalOpen(false);
          }}
        >
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] shadow-2xl border border-gray-100 flex flex-col animate-in zoom-in-95">
            <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center rounded-t-3xl shrink-0">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-primary-600" />
                Edit Detail Properti
              </h3>
              <button 
                type="button"
                onClick={(e) => { e.preventDefault(); setEditModalOpen(false); }} 
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="overflow-y-auto p-8 rounded-b-3xl">
              <form onSubmit={handleSave} className="grid grid-cols-2 gap-6">
              <div className="col-span-2 space-y-1.5">
                <label className="text-sm font-bold text-gray-700 tracking-wide">Judul Properti</label>
                <input name="title" defaultValue={currentProperty.title} required className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-primary-100 focus:border-primary-300 outline-none transition-all !text-gray-900 font-medium placeholder:text-gray-400" />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700 tracking-wide">Kategori</label>
                <select name="category" defaultValue={currentProperty.category} className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-primary-100 focus:border-primary-300 transition-all !text-gray-900 font-medium">
                  <option value="HOUSE">Rumah</option>
                  <option value="APARTMENT">Apartemen</option>
                  <option value="LAND">Tanah</option>
                  <option value="COMMERCIAL">Komersial</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700 tracking-wide">Harga Properti</label>
                <input name="price" type="number" defaultValue={currentProperty.price ?? ''} required className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-primary-100 focus:border-primary-300 transition-all font-bold !text-gray-900 placeholder:text-gray-400" />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700 tracking-wide">Alamat Lengkap</label>
                <input name="address" defaultValue={currentProperty.address} required className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-primary-100 focus:border-primary-300 transition-all !text-gray-900 font-medium placeholder:text-gray-400" />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700 tracking-wide">Kota</label>
                <input name="city" defaultValue={currentProperty.city} required className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-primary-100 focus:border-primary-300 transition-all !text-gray-900 font-medium placeholder:text-gray-400" />
              </div>

              <div className="space-y-1.5">
                 <label className="text-sm font-bold text-gray-700 tracking-wide">Bedrooms</label>
                 <input name="bedrooms" type="number" defaultValue={currentProperty.bedrooms ?? ''} required className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-primary-100 focus:border-primary-300 transition-all !text-gray-900 font-medium placeholder:text-gray-400" />
              </div>

              <div className="space-y-1.5">
                 <label className="text-sm font-bold text-gray-700 tracking-wide">Bathrooms</label>
                 <input name="bathrooms" type="number" defaultValue={currentProperty.bathrooms ?? ''} required className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-primary-100 focus:border-primary-300 transition-all !text-gray-900 font-medium placeholder:text-gray-400" />
              </div>

              <div className="space-y-1.5">
                 <label className="text-sm font-bold text-gray-700 tracking-wide">Luas (m²)</label>
                 <input name="areaSquareMeter" type="number" defaultValue={currentProperty.areaSquareMeter ?? ''} required className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-primary-100 focus:border-primary-300 transition-all !text-gray-900 font-medium placeholder:text-gray-400" />
              </div>

              <div className="col-span-2 space-y-1.5">
                 <label className="text-sm font-bold text-gray-700 tracking-wide">URL Gambar Properti</label>
                 <input name="imageUrl" defaultValue={currentProperty.imageUrl} required className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-primary-100 focus:border-primary-300 transition-all !text-gray-900 font-medium placeholder:text-gray-400" />
              </div>

              <div className="col-span-2 space-y-1.5">
                 <label className="text-sm font-bold text-gray-700 tracking-wide">Deskripsi Lengkap</label>
                 <textarea name="description" rows={4} defaultValue={currentProperty.description} required className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-primary-100 focus:border-primary-300 transition-all !text-gray-900 font-medium placeholder:text-gray-400 resize-none" />
              </div>

              <div className="col-span-2 pt-6 flex gap-4">
                <button 
                  type="button" 
                  onClick={() => setEditModalOpen(false)}
                  className="flex-1 py-4 bg-gray-100 text-gray-700 font-black rounded-2xl hover:bg-gray-200 border border-gray-200 transition-all uppercase tracking-widest text-xs"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="flex-1 py-4 bg-primary-600 text-white font-black rounded-2xl hover:bg-primary-700 shadow-xl shadow-primary-600/20 disabled:opacity-50 transition-all uppercase tracking-widest text-xs"
                >
                  {loading ? "Sinkronisasi..." : "Simpan Perubahan"}
                </button>
              </div>
             </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
