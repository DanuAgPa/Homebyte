'use client';

import { useState } from 'react';

export default function EmployeeForm() {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [department, setDepartment] = useState('');
  const [salary, setSalary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, position, departmentName: department, salary: Number(salary) }),
      });

      if (res.ok) {
        alert('Pegawai berhasil ditambahkan!');
        setName('');
        setPosition('');
        setDepartment('');
        setSalary('');
        window.location.reload(); // Refresh the table
      } else {
        const data = await res.json();
        alert(`Gagal: ${data.error}`);
      }
    } catch (err) {
      alert('Terjadi kesalahan koneksi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
      <h2 className="text-xl font-semibold mb-4 text-slate-800">Tambah Pegawai Baru</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
            <input required type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-slate-300 rounded-md p-2 text-sm focus:ring-rose-500 focus:border-rose-500" placeholder="Cth: Budi Santoso" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Departemen/Divisi</label>
            <input required type="text" value={department} onChange={(e) => setDepartment(e.target.value)} className="w-full border border-slate-300 rounded-md p-2 text-sm focus:ring-rose-500 focus:border-rose-500" placeholder="Cth: IT, Marketing, Sales" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Jabatan</label>
            <input required type="text" value={position} onChange={(e) => setPosition(e.target.value)} className="w-full border border-slate-300 rounded-md p-2 text-sm focus:ring-rose-500 focus:border-rose-500" placeholder="Cth: Software Engineer" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Gaji Pokok (Rp)</label>
            <input required type="number" value={salary} onChange={(e) => setSalary(e.target.value)} className="w-full border border-slate-300 rounded-md p-2 text-sm focus:ring-rose-500 focus:border-rose-500" placeholder="Cth: 8000000" />
          </div>
        </div>
        <button disabled={loading} type="submit" className="mt-4 px-4 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700 disabled:opacity-50 transition">
          {loading ? 'Menyimpan...' : 'Simpan Pegawai'}
        </button>
      </form>
    </div>
  );
}
