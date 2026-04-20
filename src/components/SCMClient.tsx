"use client";

import React, { useState } from "react";
import { 
  Truck, 
  Warehouse, 
  Users, 
  Plus, 
  Edit3, 
  Trash2, 
  Calendar, 
  Star, 
  Package, 
  Info,
  CheckCircle2,
  Clock,
  ArrowRight
} from "lucide-react";
import { 
  createSupplierAction, updateSupplierAction, deleteSupplierAction,
  createInventoryAction, updateInventoryAction, deleteInventoryAction,
  createShipmentAction, updateShipmentAction, deleteShipmentAction
} from "@/lib/actions/scmActions";

type Tab = "suppliers" | "inventory" | "shipments";

export default function SCMClient({ 
  initialSuppliers, initialInventory, initialShipments, properties 
}: any) {
  const [activeTab, setActiveTab] = useState<Tab>("suppliers");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // --- Handlers ---
  const handleOpenAdd = () => {
    setCurrentEdit(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (item: any) => {
    setCurrentEdit(item);
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus data ini?")) return;
    setLoading(true);
    let res;
    if (activeTab === "suppliers") res = await deleteSupplierAction(id);
    else if (activeTab === "inventory") res = await deleteInventoryAction(id);
    else res = await deleteShipmentAction(id);
    
    if (res.success) window.location.reload();
    else alert("Gagal menghapus: " + res.error);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    let res;

    if (activeTab === "suppliers") {
      res = currentEdit ? await updateSupplierAction(currentEdit.id, formData) : await createSupplierAction(formData);
    } else if (activeTab === "inventory") {
      res = currentEdit ? await updateInventoryAction(currentEdit.id, formData) : await createInventoryAction(formData);
    } else {
      res = currentEdit ? await updateShipmentAction(currentEdit.id, formData) : await createShipmentAction(formData);
    }

    if (res.success) {
      setModalOpen(false);
      window.location.reload();
    } else {
      alert("Gagal menyimpan: " + res.error);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-4 p-2 bg-white rounded-2xl border border-gray-100 shadow-sm">
        <TabButton 
          active={activeTab === "suppliers"} 
          onClick={() => setActiveTab("suppliers")}
          icon={<Users className="w-5 h-5" />}
          label="Pemasok (Suppliers)"
        />
        <TabButton 
          active={activeTab === "inventory"} 
          onClick={() => setActiveTab("inventory")}
          icon={<Warehouse className="w-5 h-5" />}
          label="Inventaris (Inventory)"
        />
        <TabButton 
          active={activeTab === "shipments"} 
          onClick={() => setActiveTab("shipments")}
          icon={<Truck className="w-5 h-5" />}
          label="Pengiriman (Shipments)"
        />
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden min-h-[400px]">
        <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 capitalize">{activeTab} Management</h2>
            <p className="text-gray-500 text-sm mt-1">Kelola data {activeTab} untuk operasional properti.</p>
          </div>
          <button 
            onClick={handleOpenAdd}
            className="flex items-center gap-2 px-5 py-3 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 hover:scale-105 transition-all shadow-lg shadow-primary-600/20 active:scale-95"
          >
            <Plus className="w-5 h-5" />
            Tambah Data
          </button>
        </div>

        <div className="overflow-x-auto">
          {activeTab === "suppliers" && (
            <Table 
              headers={["Vendor", "Kategori Jasa", "Rating", "Dibuat Pada"]}
              rows={initialSuppliers.map((s: any) => [
                <div key={s.id} className="font-bold text-gray-900">{s.name}</div>,
                <div key={s.id} className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold inline-block">{s.category}</div>,
                <div key={s.id} className="flex items-center gap-1 text-yellow-500 font-bold"><Star className="w-4 h-4 fill-current"/> {s.rating}/5</div>,
                new Date(s.createdAt).toLocaleDateString('id-ID')
              ])}
              items={initialSuppliers}
              onEdit={handleOpenEdit}
              onDelete={handleDelete}
            />
          )}

          {activeTab === "inventory" && (
            <Table 
              headers={["Nama Barang", "Stok", "Reorder Point", "Status"]}
              rows={initialInventory.map((i: any) => [
                <div key={i.id} className="font-bold text-gray-900">{i.name}</div>,
                <div key={i.id} className="font-medium">{i.stock} Unit</div>,
                <Tooltip key={i.id} text="Batas minimum stok sebelum sistem menyarankan pemesanan ulang ke supplier.">
                  <div className="flex items-center gap-1 text-gray-500 border-b border-dotted border-gray-300 pb-0.5">
                    {i.reorderPoint} Unit <Info className="w-3.5 h-3.5 text-primary-400" />
                  </div>
                </Tooltip>,
                i.stock <= i.reorderPoint ? (
                  <span key={i.id} className="text-red-500 font-bold flex items-center gap-1 text-xs uppercase"><Clock className="w-4 h-4"/> Stok Menipis!</span>
                ) : (
                  <span key={i.id} className="text-green-500 font-bold flex items-center gap-1 text-xs uppercase"><CheckCircle2 className="w-4 h-4"/> Aman</span>
                )
              ])}
              items={initialInventory}
              onEdit={handleOpenEdit}
              onDelete={handleDelete}
            />
          )}

          {activeTab === "shipments" && (
            <Table 
              headers={["Status", "Estimasi Kedatangan", "Tujuan Properti", "Update Terakhir"]}
              rows={initialShipments.map((s: any) => [
                <span key={s.id} className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                  s.status === 'DELIVERED' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
                }`}>{s.status}</span>,
                <div key={s.id} className="flex items-center gap-2 text-gray-700 font-medium">
                  <Calendar className="w-4 h-4 opacity-50" />
                  {new Date(s.estimatedDate).toLocaleDateString('id-ID')}
                </div>,
                <div key={s.id} className="text-sm">
                  <p className="font-bold text-gray-900">{s.property.title}</p>
                  <p className="text-gray-400 text-xs">{s.property.city}</p>
                </div>,
                new Date(s.updatedAt).toLocaleDateString('id-ID')
              ])}
              items={initialShipments}
              onEdit={handleOpenEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>

      {/* Modal Form */}
      {modalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl border border-gray-100 overflow-hidden animate-in zoom-in-95">
            <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
              <h3 className="text-xl font-bold">{currentEdit ? 'Edit' : 'Tambah'} {activeTab}</h3>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-900 transition-colors">
                <Plus className="w-6 h-6 rotate-45" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {activeTab === "suppliers" && (
                <>
                  <Input label="Nama Vendor" name="name" defaultValue={currentEdit?.name} required placeholder="misal: Indobuild Co." />
                  <Input label="Kategori Jasa" name="category" defaultValue={currentEdit?.category} required placeholder="misal: Konstruksi Umum" />
                  <Input label="Rating (1-5)" name="rating" type="number" min="1" max="5" defaultValue={currentEdit?.rating || 5} required />
                </>
              )}
              {activeTab === "inventory" && (
                <>
                  <Input label="Nama Barang" name="name" defaultValue={currentEdit?.name} required placeholder="misal: Cat Dinding Putih" />
                  <Input label="Stok Saat Ini" name="stock" type="number" defaultValue={currentEdit?.stock || 0} required />
                  <Input label="Reorder Point" name="reorderPoint" type="number" defaultValue={currentEdit?.reorderPoint || 10} required 
                         helpText="Sistem akan memberi peringatan jika stok di bawah angka ini." />
                </>
              )}
              {activeTab === "shipments" && (
                <>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700">Tujuan Properti</label>
                    <select name="propertyId" defaultValue={currentEdit?.propertyId} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all !text-gray-900 font-bold">
                      {properties.map((p: any) => (
                        <option key={p.id} value={p.id}>{p.title} - {p.city}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700">Status Pengiriman</label>
                    <select name="status" defaultValue={currentEdit?.status || "PENDING"} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all !text-gray-900 font-bold">
                      <option value="PENDING">PENDING</option>
                      <option value="SHIPPED">SHIPPED</option>
                      <option value="DELIVERED">DELIVERED</option>
                    </select>
                  </div>
                  <Input label="Estimasi Tanggal" name="estimatedDate" type="date" defaultValue={currentEdit?.estimatedDate ? new Date(currentEdit.estimatedDate).toISOString().split('T')[0] : ""} required />
                </>
              )}

              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setModalOpen(false)}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-all"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="flex-1 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 shadow-lg shadow-primary-600/20 disabled:opacity-50 transition-all"
                >
                  {loading ? "Menyimpan..." : "Simpan Data"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Internal UI Components ---

function TabButton({ active, onClick, icon, label }: any) {
  return (
    <button 
      onClick={onClick}
      className={`flex-1 min-w-[200px] flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-bold transition-all ${
        active 
          ? "bg-gray-900 text-white shadow-xl scale-105" 
          : "bg-transparent text-gray-500 hover:bg-gray-50"
      }`}
    >
      {icon}
      <span>{label}</span>
      {active && <ArrowRight className="w-4 h-4 animate-in slide-in-from-left-2" />}
    </button>
  );
}

function Table({ headers, rows, items, onEdit, onDelete }: any) {
  return (
    <table className="w-full text-left">
      <thead>
        <tr className="bg-gray-50/50">
          {headers.map((h: string) => (
            <th key={h} className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">{h}</th>
          ))}
          <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Aksi</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-50">
        {rows.map((row: any[], idx: number) => (
          <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
            {row.map((cell, cIdx) => (
              <td key={cIdx} className="px-8 py-5">{cell}</td>
            ))}
            <td className="px-8 py-5 text-right">
              <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => onEdit(items[idx])} className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-all" title="Edit">
                  <Edit3 className="w-4 h-4" />
                </button>
                <button onClick={() => onDelete(items[idx].id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all" title="Hapus">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        ))}
        {rows.length === 0 && (
          <tr>
            <td colSpan={headers.length + 1} className="px-8 py-20 text-center text-gray-400 italic">
              Belum ada data tersedia.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

function Input({ label, helpText, ...props }: any) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-bold text-gray-700">{label}</label>
      <input 
        {...props} 
        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all !text-gray-900 font-medium placeholder:text-gray-400"
      />
      {helpText && <p className="text-[10px] text-gray-400 italic">{helpText}</p>}
    </div>
  );
}

function Tooltip({ children, text }: { children: React.ReactNode, text: string }) {
  return (
    <div className="relative group/tooltip inline-block">
      {children}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-[10px] font-medium rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none w-48 text-center z-20 shadow-2xl">
        {text}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-900"></div>
      </div>
    </div>
  );
}
