'use client';

import { useState } from 'react';

export default function CustomerForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const res = await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, address }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ text: 'Pelanggan berhasil ditambahkan!', type: 'success' });
        setName('');
        setEmail('');
        setPhone('');
        setAddress('');
        // Refresh the page to show new data after 1 second
        setTimeout(() => window.location.reload(), 1000);
      } else {
        setMessage({ text: `Gagal: ${data.error}`, type: 'error' });
      }
    } catch (err) {
      setMessage({ text: 'Terjadi kesalahan jaringan', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Tambah Pelanggan Baru</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap *</label>
            <input required type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Cth: Budi Santoso" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Email *</label>
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Cth: budi@contoh.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Telepon</label>
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Cth: 081234567890" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Pelanggan</label>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Cth: Jl. Melati No. 12, Jakarta" />
          </div>
        </div>
        
        <div className="flex items-center space-x-4 mt-4">
          <button disabled={loading} type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition">
            {loading ? 'Menyimpan...' : 'Simpan Pelanggan'}
          </button>
          
          {message.text && (
            <p className={`text-sm font-medium ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
              {message.text}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
